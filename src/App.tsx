import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Star, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const CONFIG = {
  friendName: "Altar",
  message: "Geriye dönüp bakıyorum da...\nAramızda kilometreler olsa da aslında hep yan yanaydık. Ne yaşarsak yaşayalım ekranın diğer ucunda o sağlam bağı hiç koparmadık.\n\nKulaklıkları takıp sabahlara kadar süren o bitmeyen sohbetler, beraber sırt sırta verip taşıdığımız oyunlar, birbirimize attığımız mesajlar... Belki karşılıklı aynı masada kahve içemedik ama en gerçek dostluğu biz kurduk.\n\nSeninle koridoru tuttuğumuz gibi hayatta da birbirimizin sırtını kolladık. Büyüdük, değiştik ama o saf bağımız hiç değişmedi.\n\nYeni yaşın sana umduğundan da güzel anılar, bol kahkaha, sıfır dert ve her şeyin en iyisini getirsin. İyi ki doğdun dostum.",
  
  // Resimlerin Yolları - SİTEYE YÜKLEDİĞİNDE BURADAKİ İSİMLERLE EŞLEŞECEK
  memories: [
    {
      img: "/resim1.jpg", 
      fallback: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
      caption: "Yine taşıdığımız efsane maçlardan biri... MVP Noxaris!"
    },
    {
      img: "/resim2.jpg",
      fallback: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600&auto=format&fit=crop",
      caption: "Mesafe sadece bir sayıdan ibaret."
    }
  ],
  postScript: "Not: Bir gün o GG mesajını yan yana yazacağız!",
  senderName: "Ahmet"
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const triggerConfetti = () => {
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#A78BFA', '#818CF8', '#C084FC', '#E879F9', '#ffffff'] // Elegant purples/blues
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#A78BFA', '#818CF8', '#C084FC', '#E879F9', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleOpen = () => {
    setIsOpen(true);
    triggerConfetti();
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#030305] text-[#F3F4F6] overflow-hidden flex items-center justify-center p-3 sm:p-6 font-sans selection:bg-[#A78BFA] selection:text-white">
      
      {/* Elegant Ambient Background */}
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
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // smooth spring-like ease
            className="w-full max-w-[600px] relative z-10"
          >
            {/* Elegant Glass Card */}
            <div className="bg-[#0f0f13]/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 relative w-full h-[90dvh] sm:h-auto sm:max-h-[85vh] flex flex-col overflow-hidden">
              
              {/* Header Gradient Line */}
              <div className="h-1 w-full bg-gradient-to-r from-[#818CF8] via-[#C084FC] to-[#E879F9]"></div>

              {/* Scrollable Content */}
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

                {/* Match Highlight Memories */}
                <div className="mb-12 space-y-6">
                  {CONFIG.memories.map((photo, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + (index * 0.2), duration: 0.8 }}
                      className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 p-2"
                    >
                      <div className="relative rounded-xl overflow-hidden aspect-video bg-black/50">
                        {/* Fallback pattern to show if image is missing */}
                        <img 
                          src={photo.img} 
                          onError={(e) => {
                            // If the actual image fails to load, use a beautiful placeholder
                            e.currentTarget.src = photo.fallback;
                          }}
                          alt="Anı" 
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-white/90 font-light text-sm flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#C084FC]" />
                          {photo.caption}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <p className="text-xs text-white/30 text-center italic mt-2">
                    (Görseller otomatik yüklenmezse diye çok hoş yer tutucular koydum, ama senin attığın resimleri senin yüklemen gerekiyor)
                  </p>
                </div>

                {/* Footer Notes */}
                <div className="bg-white/5 rounded-2xl p-5 border border-white/5 mb-8">
                  <p className="text-sm font-light text-white/60 italic border-l-2 border-[#818CF8] pl-4">
                    {CONFIG.postScript}
                  </p>
                </div>

                {/* Sign-off */}
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
