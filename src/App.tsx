import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Star, Shield, Lock, Unlock } from 'lucide-react';
import confetti from 'canvas-confetti';

const CONFIG = {
  friendName: "Altar",
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
      
      <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-[#818CF8] opacity-10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-[#E879F9] opacity-10 blur-[120px] pointer-events-none"></div>

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
            <div className="bg-[#0f0f13]/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 relative w-full h-[90dvh] sm:h-auto sm:max-h-[85vh] flex flex-col overflow-hidden">
              
              <div className="h-1 w-full bg-gradient-to-r from-[#818CF8] via-[#C084FC] to-[#E879F9]"></div>

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
                  <Star className="text-white/20 w-8 h-8" fill="currentColor" />
                </div>

              </div>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
