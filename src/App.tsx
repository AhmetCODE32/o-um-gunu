import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Star, Shield, Lock, Unlock, Terminal, Database } from 'lucide-react';
import confetti from 'canvas-confetti';
import { logSpyTerm, getSpyLogs } from './firebase';

const CONFIG = {
  friendName: "Doğukan",
  message: "Geriye dönüp bakıyorum da...\nAramızda kilometreler olsa da aslında hep yan yanaydık. Ne yaşarsak yaşayalım ekranın diğer ucunda o sağlam bağı hiç koparmadık.\n\nKulaklıkları takıp sabahlara kadar süren o bitmeyen sohbetler, beraber sırt sırta verip taşıdığımız oyunlar, birbirimize attığımız mesajlar... Belki karşılıklı aynı masada kahve içemedik ama en gerçek dostluğu biz kurduk.\n\nSeninle koridoru tuttuğumuz gibi hayatta da birbirimizin sırtını kolladık. Büyüdük, değiştik ama o saf bağımız hiç değişmedi.\n\nYeni yaşın sana umduğundan da güzel anılar, bol kahkaha, sıfır dert ve her şeyin en iyisini getirsin. İyi ki doğdun dostum.",
  
  rulesTitle: "Yazılı Olmayan Kurallarımız",
  rules: [
    "Aramızdaki kilometreler sadece oyundaki ping'e yansır, dostluğumuza asla.",
    "Oyun ne kadar kötü giderse gitsin, koridor ve sırdaşlık asla terk edilmez.",
    "Gerçek hayatta da dijital dünyada da her zaman birbirimizin 'MVP'siyiz."
  ],
  
  secretMessage: "Senin gibi bir dost (ve harika bir duo) bulmak kolay değil. Nice beraber taşıyacağımız yeni yaşlara! GG WP!",
  senderName: "Ahmet"
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [easterEgg, setEasterEgg] = useState<string | null>(null);
  const [isRedAlert, setIsRedAlert] = useState(false);
  const [showMobileInput, setShowMobileInput] = useState(false);
  const [mobileInputValue, setMobileInputValue] = useState('');
  
  // Spy Logs
  const [spyLogs, setSpyLogs] = useState<{ id: string, term: string, date: Date }[] | null>(null);
  const [showSpyModal, setShowSpyModal] = useState(false);

  // Ekranda klavye vuruşlarını göstermek için state
  const [typedBuffer, setTypedBuffer] = useState('');
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sırları tetikleyen ana fonksiyon
  const keyBufferRef = useRef('');

  const checkSecretCodes = (text: string) => {
    const buffer = text.slice(-20).toUpperCase();

    if (buffer.includes("AHMETADMIN")) {
      getSpyLogs().then(logs => {
        setSpyLogs(logs);
        setShowSpyModal(true);
      });
      return true;
    } else if (buffer.includes("AHMET")) {
      setEasterEgg("🤍 En iyi dostun her zaman kalacak.");
      setIsRedAlert(false);
      triggerConfetti(true);
      return true;
    } else if (buffer.includes("DOGUKAN") || buffer.includes("DOĞUKAN")) {
      setEasterEgg("🏴‍☠️ NEDEN HAZİNEMİ ÇALIYON?");
      setIsRedAlert(true);
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#EF4444', '#B91C1C', '#7F1D1D', '#ffffff']
      });
      return true;
    } else if (buffer.includes("KARDES") || buffer.includes("KARDEŞ")) {
      setEasterEgg("🤝 Kan bağımız yok ama can bağımız var!");
      setIsRedAlert(false);
      triggerConfetti(true);
      return true;
    } else if (buffer.includes("KAHVE")) {
      setEasterEgg("☕ O içemediğimiz kahvelerin hatrına!");
      setIsRedAlert(false);
      triggerConfetti(true);
      return true;
    } else if (buffer.includes("GELECEK")) {
      setEasterEgg("🚀 Birlikte yazılacak daha çok anı var!");
      setIsRedAlert(false);
      triggerConfetti(true);
      return true;
    } else if (buffer.includes("SIFRE") || buffer.includes("ŞİFRE")) {
      setEasterEgg("🔑 Asıl şifre yıllardır sarsılmayan dostluğumuz.");
      setIsRedAlert(false);
      triggerConfetti(true);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Input açıkken (mobil gizli mod) global eylemi yoksay
      if (document.activeElement?.tagName === 'INPUT') return;

      if (e.key === 'Enter') {
        if (keyBufferRef.current.length > 2) {
          logSpyTerm(keyBufferRef.current);
        }
        keyBufferRef.current = "";
        setTypedBuffer("");
        return;
      }

      // Sadece harfleri ve tekil tuşları al (Shift vs. yoksay)
      if (e.key.length !== 1) return;

      // Türkçe ve İngilizce karakterleri büyük harfe çevir
      const char = e.key.toLocaleUpperCase('tr-TR');
      
      keyBufferRef.current = (keyBufferRef.current + char).slice(-20);
      setTypedBuffer(keyBufferRef.current);
      
      const isMatched = checkSecretCodes(keyBufferRef.current);
      if (isMatched) {
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        keyBufferRef.current = "";
        setTypedBuffer("");
        return;
      }
      
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        if (keyBufferRef.current.length > 2) {
          logSpyTerm(keyBufferRef.current);
        }
        keyBufferRef.current = "";
        setTypedBuffer("");
      }, 3000); // 3 saniye basılmazsa kaydet ve sil
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMobileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setMobileInputValue(val);
    const char = val.toLocaleUpperCase('tr-TR');
    
    const isMatched = checkSecretCodes(char);
    if (isMatched) {
      setMobileInputValue("");
      setShowMobileInput(false);
    }
  };

  // Otomatik gizle
  useEffect(() => {
    if (easterEgg) {
      const timer = setTimeout(() => {
        setEasterEgg(null);
        setIsRedAlert(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [easterEgg]);

  const triggerConfetti = (isSecret = false) => {
    const duration = isSecret ? 2 * 1000 : 4 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: isSecret ? 15 : 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: isSecret ? 0.6 : 0.8 },
        colors: isSecret ? ['#FDE047', '#E879F9', '#ffffff'] : ['#A78BFA', '#818CF8', '#C084FC', '#E879F9', '#ffffff']
      });
      confetti({
        particleCount: isSecret ? 15 : 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: isSecret ? 0.6 : 0.8 },
        colors: isSecret ? ['#FDE047', '#E879F9', '#ffffff'] : ['#A78BFA', '#818CF8', '#C084FC', '#E879F9', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleOpen = () => {
    setIsOpen(true);
    triggerConfetti(false);
  };

  const handleUnlockSecret = () => {
    setSecretUnlocked(true);
    triggerConfetti(true);
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#030305] text-[#F3F4F6] overflow-hidden flex items-center justify-center p-3 sm:p-6 font-sans selection:bg-[#A78BFA] selection:text-white">
      
      {/* Gizli Tuş Vuruşu Bildirimi (Neler yazıldığını gösteren Ghost/HUD efekti) */}
      <AnimatePresence>
        {typedBuffer && !showMobileInput && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[90] pointer-events-none"
          >
            <div className="bg-[#0f0f13]/80 border border-white/10 px-4 py-2 rounded-lg backdrop-blur-md shadow-2xl">
              <span className="font-mono text-[#A78BFA]/70 tracking-[0.3em] font-bold text-sm">
                {typedBuffer}
                <span className="animate-pulse">_</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gizli Easter Egg Bildirimi */}
      <AnimatePresence>
        {easterEgg && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className={`fixed top-0 left-1/2 z-[100] bg-[#0f0f13]/90 border px-6 py-4 rounded-xl backdrop-blur-md w-max max-w-[90vw] text-center transition-colors duration-500 ${
              isRedAlert 
                ? 'border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.4)]' 
                : 'border-[#A78BFA] shadow-[0_0_30px_rgba(167,139,250,0.4)]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Terminal className={`w-5 h-5 animate-pulse ${isRedAlert ? 'text-red-500' : 'text-[#A78BFA]'}`} />
              <span className={`font-medium tracking-widest text-sm sm:text-base ${isRedAlert ? 'text-red-100' : 'text-[#F3F4F6]'}`}>
                {easterEgg}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`absolute top-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full opacity-10 blur-[120px] pointer-events-none transition-colors duration-1000 ${isRedAlert ? 'bg-red-600' : 'bg-[#818CF8]'}`}></div>
      <div className={`absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full opacity-10 blur-[120px] pointer-events-none transition-colors duration-1000 ${isRedAlert ? 'bg-red-800' : 'bg-[#E879F9]'}`}></div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center z-10 w-full max-w-md px-6 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#818CF8]/20 to-[#E879F9]/20 border border-white/10 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(129,140,248,0.2)] backdrop-blur-md">
              <Sparkles className="text-[#A78BFA] w-8 h-8" />
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-light tracking-wide text-white mb-4">
              Özel Bir Anı
            </h1>
            
            <p className="text-white/50 text-sm sm:text-base font-light mb-12 tracking-wide leading-relaxed">
              Senin için hazırlanan bu kutlamayı açmak için yıldıza dokun.
            </p>

            <motion.button
              onClick={handleOpen}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group bg-white/5 border border-white/10 hover:bg-white/10 w-full py-4 rounded-xl text-sm font-medium tracking-widest uppercase transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#818CF8]/20 to-[#E879F9]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 text-white/90 flex items-center justify-center gap-2">
                Hedi̇yeyi̇ Görüntüle
              </span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
            className="w-full max-w-[600px] relative z-10"
          >
            <div className={`bg-[#0f0f13]/80 backdrop-blur-2xl rounded-3xl shadow-2xl border transition-colors duration-500 relative w-full h-[90dvh] sm:h-auto sm:max-h-[85vh] flex flex-col overflow-hidden ${isRedAlert ? 'border-red-500/30' : 'border-white/10'}`}>
              
              <div className={`h-1 w-full bg-gradient-to-r transition-colors duration-500 ${isRedAlert ? 'from-red-600 via-red-500 to-red-600' : 'from-[#818CF8] via-[#C084FC] to-[#E879F9]'}`}></div>

              <div className="p-6 sm:p-10 overflow-y-auto overscroll-contain flex-1 custom-scrollbar">
                
                <div className="flex items-center gap-3 mb-8 opacity-60">
                  <Heart className="w-5 h-5 text-[#E879F9]" />
                  <span className="text-xs uppercase tracking-[0.2em] font-medium">Doğum Gününe Özel</span>
                </div>

                <h2 className="text-4xl sm:text-5xl font-light text-white mb-8">
                  İyi ki doğdun,<br />
                  <span className="font-semibold bg-gradient-to-r from-[#818CF8] to-[#E879F9] bg-clip-text text-transparent">
                    {CONFIG.friendName}
                  </span>
                </h2>

                <div className="text-white/70 font-light leading-relaxed text-base sm:text-lg whitespace-pre-line space-y-4 mb-12">
                  {CONFIG.message}
                </div>

                <div className="mb-12 space-y-4">
                  <div className="flex items-center gap-3 mb-6 opacity-80">
                    <Shield className="w-5 h-5 text-[#818CF8]" />
                    <span className="text-sm tracking-widest text-[#818CF8] uppercase font-medium">{CONFIG.rulesTitle}</span>
                  </div>
                  
                  {CONFIG.rules.map((rule, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (idx * 0.15), duration: 0.6 }}
                      className="flex items-start gap-4 p-4 sm:p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#818CF8]/20 to-[#E879F9]/20 flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/5">
                        <span className="text-white/80 font-bold text-sm">{idx + 1}</span>
                      </div>
                      <p className="text-white/70 font-light leading-relaxed text-sm sm:text-base">
                        {rule}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mb-12">
                  {!secretUnlocked ? (
                    <motion.button 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      onClick={handleUnlockSecret}
                      className="w-full py-6 sm:py-8 bg-gradient-to-r from-[#818CF8]/5 to-[#E879F9]/5 border border-[#818CF8]/30 rounded-2xl flex flex-col items-center justify-center gap-3 hover:from-[#818CF8]/10 hover:to-[#E879F9]/10 transition-all group cursor-pointer"
                    >
                      <Lock className="text-[#818CF8] w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span className="text-[#818CF8] text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">
                        Gizli Paketi Aç
                      </span>
                    </motion.button>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="w-full p-6 sm:p-8 bg-gradient-to-br from-[#818CF8]/10 to-[#E879F9]/10 border border-[#E879F9]/30 rounded-2xl text-center shadow-[0_0_30px_rgba(232,121,249,0.15)]"
                    >
                      <Unlock className="text-[#E879F9] w-6 h-6 mx-auto mb-4" />
                      <p className="text-white font-medium text-base sm:text-lg mb-2">
                        Hedef Kilitlendi: {CONFIG.friendName}
                      </p>
                      <p className="text-white/80 font-light text-sm sm:text-base leading-relaxed italic">
                        "{CONFIG.secretMessage}"
                      </p>
                    </motion.div>
                  )}
                </div>

                <div className="flex justify-between items-end pt-6 border-t border-white/10">
                  <div className="flex flex-col">
                    <span className="text-white/40 text-xs tracking-widest uppercase mb-1">Gönderen Dostun</span>
                    <span className="font-medium text-2xl text-white">
                      {CONFIG.senderName}
                    </span>
                  </div>
                  
                  <div className="relative">
                    <Star 
                      onClick={() => setShowMobileInput(true)}
                      className="text-white/20 w-8 h-8 cursor-pointer hover:text-white/40 transition-colors" 
                      fill="currentColor" 
                    />
                    
                    <AnimatePresence>
                      {showMobileInput && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: 10 }}
                          className="absolute bottom-10 right-0 w-[200px]"
                        >
                          <input
                            type="text"
                            autoFocus
                            value={mobileInputValue}
                            onChange={handleMobileInputChange}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                if (mobileInputValue.length > 2) logSpyTerm(mobileInputValue);
                                setMobileInputValue("");
                                setShowMobileInput(false);
                              }
                            }}
                            placeholder="Gizli Şifre?"
                            onBlur={() => {
                              if (mobileInputValue.length > 2) logSpyTerm(mobileInputValue);
                              setShowMobileInput(false);
                            }}
                            className="w-full bg-black/60 backdrop-blur-md border border-[#818CF8]/30 rounded-lg py-2 px-3 text-white placeholder-white/30 focus:outline-none focus:border-[#E879F9]/60 uppercase tracking-widest text-xs shadow-xl"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </div>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>

      {/* SPY MODAL (Ajan Ekranı) */}
      <AnimatePresence>
        {showSpyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <div className="bg-[#0f0f13] border border-red-500/30 rounded-2xl w-full max-w-lg p-6 h-[80vh] flex flex-col shadow-[0_0_50px_rgba(239,68,68,0.2)]">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3 text-red-500">
                  <Database className="w-5 h-5 animate-pulse" />
                  <h3 className="font-bold tracking-widest text-sm uppercase">Ajan Kayıtları</h3>
                </div>
                <button 
                  onClick={() => setShowSpyModal(false)} 
                  className="text-white/40 hover:text-white text-xs tracking-widest font-medium uppercase transition-colors"
                >
                  KAPAT [X]
                </button>
              </div>
              <div className="overflow-y-auto flex-1 space-y-3 custom-scrollbar pr-2">
                {spyLogs && spyLogs.length > 0 ? (
                  spyLogs.map(log => (
                    <div key={log.id} className="bg-red-500/5 border border-red-500/10 p-4 rounded-xl flex justify-between items-center gap-4">
                      <span className="text-red-100 font-mono tracking-widest text-sm break-all">{log.term}</span>
                      <span className="text-red-500/50 text-[10px] whitespace-nowrap">
                        {log.date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })} - {log.date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' })}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-white/30 text-center py-10 font-mono text-sm tracking-widest">Hiçbir veri bulunamadı.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
