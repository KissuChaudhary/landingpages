import React from 'react';
import { Zap, ArrowRight, Play, Cpu, Search, Database, Globe, Fingerprint, Box, Star, BookOpen } from 'lucide-react';

const LOGOS = [
  { name: 'Next.js', icon: <Zap size={18} /> },
  { name: 'React', icon: <Cpu size={18} /> },
  { name: 'Node.js', icon: <Box size={18} /> },
  { name: 'Python', icon: <Database size={18} /> },
  { name: 'Go', icon: <Globe size={18} /> },
  { name: 'Svelte', icon: <Fingerprint size={18} /> },
  { name: 'Vue', icon: <Search size={18} /> },
];

const Hero = () => {
  return (
    <section className="relative pt-32 md:pt-48 min-h-screen flex flex-col items-center justify-start overflow-hidden pb-0">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-white via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-200/30 to-yellow-200/30 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-4 relative z-10 flex flex-col items-center text-center mb-12 flex-1 justify-center">
        
        {/* Top Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-ink shadow-brutalist-sm rounded-none transition-transform hover:-translate-y-0.5 cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-signal"></span>
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink/80">
            LoomAuth v2.0 is live
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.95] tracking-tight mb-8 max-w-6xl">
          Stop building auth. <br className="hidden md:block" /> <span className="italic text-signal font-light">Start shipping features.</span>
        </h1>

        {/* Subtitle */}
        <p className="font-mono text-sm md:text-base text-ink/70 max-w-2xl mb-10 leading-relaxed">
          The open-source authentication layer designed for modern frameworks. Drop in 5 lines of code and secure your app instantly.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-16">
            <button className="group relative px-8 py-4 bg-ink text-white font-mono font-bold text-sm tracking-wide shadow-brutalist hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-3">
                GET API KEYS
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white border border-ink text-ink font-mono font-bold text-sm tracking-wide shadow-brutalist hover:bg-paper hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                READ DOCUMENTATION
            </button>
        </div>

        {/* --- SOCIAL PROOF: AVATAR STACK --- */}
        <div className="flex flex-col items-center gap-6 mb-24 animate-float-slow">
            {/* Avatars */}
            <div className="flex items-center -space-x-4 pl-4">
                {[11, 32, 5, 12, 54].map((imgId, i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-cream bg-gray-200 overflow-hidden shadow-sm relative transition-transform hover:-translate-y-2 hover:scale-110 hover:z-20 z-10 duration-300 cursor-pointer">
                         <img 
                            src={`https://i.pravatar.cc/150?img=${imgId}`} 
                            alt={`Founder ${i+1}`}
                            className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                        />
                    </div>
                ))}
                 <div className="w-12 h-12 rounded-full border-2 border-cream bg-ink text-white flex items-center justify-center font-mono text-xs font-bold shadow-sm relative z-20 cursor-default">
                    +2k
                </div>
            </div>

            {/* Rating */}
            <div className="flex flex-col items-center gap-3">
                 <div className="flex gap-1.5 text-signal">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                    ))}
                </div>
                <div className="text-center">
                    <span className="font-serif italic font-medium text-lg text-ink block leading-none mb-1">
                        "The standard for modern auth."
                    </span>
                    <span className="font-mono text-[10px] text-ink/40 uppercase tracking-widest flex items-center justify-center gap-2">
                        <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                        Trusted by 10,000+ Developers
                    </span>
                </div>
            </div>
        </div>

      </div>

      {/* Marquee Stripe - Full Edge-to-Edge Width */}
      <div className="w-full border-y border-ink bg-white py-6 relative z-20 overflow-hidden mt-auto">
          {/* Wrapper for animation */}
          <div className="flex w-max animate-marquee">
            {/* 
              We render the list of logos twice.
              The animation moves the container -50% to the left.
              When it hits -50%, it snaps back to 0 (which looks identical to -50%), creating a seamless loop.
            */}
            {[0, 1].map((setIndex) => (
              <div key={setIndex} className="flex items-center gap-16 md:gap-32 px-8 md:px-16">
                {LOGOS.map((logo, i) => (
                  <div key={i} className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                    <div className="text-signal">{logo.icon}</div>
                    <span className="font-mono text-sm md:text-base font-bold uppercase tracking-widest text-ink whitespace-nowrap">
                      {logo.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
      </div>

    </section>
  );
};

export default Hero;