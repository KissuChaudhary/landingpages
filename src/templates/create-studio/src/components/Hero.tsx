import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const yImage = useTransform(scrollY, [0, 1000], [0, 150]);
  const yTextTop = useTransform(scrollY, [0, 1000], [0, 50]);
  const yTextBottom = useTransform(scrollY, [0, 1000], [0, -50]);
  const xLeft = useTransform(scrollY, [0, 1000], [0, -30]);
  const xRight = useTransform(scrollY, [0, 1000], [0, 30]);
  const scaleText = useTransform(scrollY, [0, 1000], [1, 1.05]);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit', second: '2-digit' });
  };

  return (
    <section className="relative w-full h-screen min-h-[800px] md:min-h-[900px] overflow-hidden pt-20 md:pt-0">
      {/* Background Image */}
      <motion.div 
        style={{ y: yImage }}
        className="absolute inset-0 z-0 flex items-center justify-center opacity-70 md:opacity-100"
      >
        <div className="relative w-full h-[70vh] md:h-[90vh] max-w-6xl mx-auto">
          {/* A portrait placeholder with a floral/blue vibe */}
          <img 
            src="https://images.unsplash.com/photo-1518796745738-41048802f99a?q=80&w=2669&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center md:object-contain mask-image-gradient"
          />
        </div>
      </motion.div>

      {/* Left Markers */}
      <div className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-[15vh] z-20 font-mono text-[10px] text-white/40 tracking-widest">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>— // 00.01°</motion.div>
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>— // 00.02°</motion.div>
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>— // 00.03°</motion.div>
      </div>

      {/* Main Content Container */}
      <div className="absolute inset-0 z-10 w-full max-w-[1600px] mx-auto px-6 md:px-16 pointer-events-none">
        
        {/* Top Left Text */}
        <motion.div 
          style={{ y: yTextTop, x: xLeft }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-[15%] md:top-[20%] left-6 md:left-24 max-w-[280px] md:max-w-[400px] pointer-events-auto"
        >
          <h2 className="text-3xl md:text-5xl lg:text-[56px] font-medium leading-[1.1] tracking-tight">
            Digital experiences that connect, scale and perform<span className="text-brand-orange">.</span>
          </h2>
        </motion.div>

        {/* Top Right Text */}
        <motion.div 
          style={{ y: yTextTop, x: xRight }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-[15%] md:top-[20%] right-6 md:right-24 text-right flex flex-col items-end pointer-events-auto"
        >
          <div className="text-6xl md:text-8xl lg:text-[120px] font-bold text-brand-orange tracking-tighter leading-none mb-2 md:mb-4">
            120+
          </div>
          <div className="font-mono text-[10px] md:text-xs tracking-widest uppercase leading-relaxed max-w-[220px]">
            Quietly making noise for brands worldwide
          </div>
          <div className="mt-6 flex items-center justify-end gap-2 opacity-90">
            <div className="w-4 h-4 bg-white rounded-sm skew-x-12"></div>
            <span className="font-bold text-lg tracking-wide">Blackwell</span>
          </div>
        </motion.div>

        {/* Center Huge Text */}
        <motion.div 
          style={{ scale: scaleText }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-30"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18vw] md:text-[14vw] lg:text-[12vw] font-bold tracking-tighter leading-none flex items-center justify-center"
          >
            <span className="text-brand-orange">Create</span>
            <span className="text-white">\Studio</span>
          </motion.h1>
        </motion.div>

        {/* Bottom Left Text & Buttons */}
        <motion.div 
          style={{ y: yTextBottom, x: xLeft }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-[10%] left-6 md:left-24 flex flex-col gap-6 pointer-events-auto"
        >
          <div className="font-mono text-[10px] md:text-xs tracking-widest uppercase leading-relaxed max-w-[320px] text-white/90">
            <p>A design studio trusted by startups and leading brands.</p>
            <p className="mt-2">We create stories people remember.</p>
          </div>
          
          <div className="w-8 h-[1px] bg-white/30"></div>
          
          <div className="font-mono text-[10px] md:text-xs tracking-widest uppercase text-white/70">
            <p>Our Time {formatTime(time)}</p>
            <p>UTC-8 Los Angeles</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button className="bg-brand-orange hover:bg-white hover:text-brand-orange transition-colors duration-300 text-white px-8 py-3.5 rounded-xl text-sm font-medium tracking-wide flex items-center gap-2 group">
              SEE WORK <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-[#E5E5E5] hover:bg-white transition-colors duration-300 text-black px-8 py-3.5 rounded-xl text-sm font-medium tracking-wide flex items-center gap-2 group">
              LET'S CHAT <ArrowRight size={16} className="text-brand-orange group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Bottom Right Showreel */}
        <motion.div 
          style={{ y: yTextBottom, x: xRight }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute bottom-[10%] right-6 md:right-24 pointer-events-auto"
        >
          <div className="flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-white/60 mb-4">
            <span>Showreel</span>
            <div className="flex-1 h-[1px] bg-white/20 mx-4"></div>
            <span>\\2025</span>
          </div>
          
          <div className="relative w-[280px] md:w-[360px] aspect-[16/9] bg-zinc-900 rounded-2xl overflow-hidden group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
              alt="Showreel thumbnail" 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                 <Play size={24} className="ml-1" />
               </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2 font-mono text-[9px] tracking-widest uppercase text-white/60">
            <span className="text-brand-orange text-sm">❦</span> BEST DIGITAL CAMPAIGN, WOBBLY AWARDS
          </div>
        </motion.div>

      </div>
    </section>
  );
}
