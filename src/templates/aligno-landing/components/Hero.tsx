import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { FlowingEnergy } from './FlowingEnergy';

const HorizontalLine = () => (
  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.2] to-transparent" />
);

const VerticalLine = ({ className, gradient = "none" }: { className?: string, gradient?: "top" | "bottom" | "none" }) => {
    let bgClass = "bg-white/[0.1]";
    if (gradient === "top") bgClass = "bg-gradient-to-b from-transparent to-white/[0.2]";
    if (gradient === "bottom") bgClass = "bg-gradient-to-b from-white/[0.2] to-transparent";

    return <div className={`absolute w-[1px] ${bgClass} ${className}`} />;
};

const GridLines = ({ width, gradient = "none" }: { width: string, gradient?: "top" | "bottom" | "none" }) => (
    <div className={`absolute inset-y-0 left-1/2 -translate-x-1/2 ${width} pointer-events-none`}>
        <VerticalLine className="left-0 inset-y-0" gradient={gradient} />
        <VerticalLine className="right-0 inset-y-0" gradient={gradient} />
    </div>
);

// Replaced ParticleButton with CrystalButton - No jumping particles, just premium lighting
const CrystalButton = () => {
    return (
        <div className="relative group z-20 cursor-pointer">
            {/* Ambient background glow behind button (Static) */}
            <div className="absolute -inset-1 bg-gradient-to-b from-[#ffdac2]/20 to-transparent rounded-full blur-md opacity-20 group-hover:opacity-40 transition duration-500" />
            
            <button className="
                relative px-8 py-3.5 
                bg-[#050505] rounded-full 
                text-white text-sm font-medium tracking-wide font-sans
                border border-white/10
                group-hover:border-[#ffdac2]/50
                shadow-[0_0_20px_rgba(0,0,0,0.5)]
                hover:shadow-[0_0_25px_rgba(255,218,194,0.15)]
                transition-all duration-300
                overflow-hidden
                flex items-center gap-2
            ">
                {/* Subtle sheen effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <span className="relative z-10 text-white/90 group-hover:text-white transition-colors">
                    Buy Template
                </span>
                <ArrowRight className="w-4 h-4 text-[#ffdac2] relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
        </div>
    );
};

const Hero: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Calculate progress: 0 at top, 1 after scrolling 400px
      const progress = Math.min(1, scrollY / 400);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate rotation: Starts at 20deg, ends at 0deg
  const rotateX = 20 - (scrollProgress * 20);
  // Calculate scale: Starts at 0.95, ends at 1
  const scale = 0.95 + (scrollProgress * 0.05);
  // Calculate opacity: Starts at 0.8, ends at 1
  const opacity = 0.8 + (scrollProgress * 0.2);

  return (
    <section className="relative mt-6 w-full min-h-screen flex flex-col items-center justify-start bg-[#030303] overflow-hidden selection:bg-[#ffdac2] selection:text-black">
      
      {/* --- Ambient Background Effects & Lighting --- */}
      
      {/* 1. Global soft ambient glow (Wide coverage) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[1000px] bg-[radial-gradient(circle_at_top,_rgba(255,218,194,0.03)_0%,_transparent_70%)] pointer-events-none z-0" />

      {/* 2. The "Light Blob" - Illuminating the content area */}
      <div className="absolute top-[180px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(255,170,110,0.15)_0%,_transparent_60%)] blur-[80px] pointer-events-none z-0 mix-blend-screen" />

      {/* Star Field */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30">
        <div className="absolute top-[10%] left-[15%] w-[1.5px] h-[1.5px] bg-white rounded-full opacity-60" />
        <div className="absolute top-[20%] left-[85%] w-[1.5px] h-[1.5px] bg-white rounded-full opacity-40" />
        <div className="absolute top-[45%] left-[10%] w-[1.5px] h-[1.5px] bg-white rounded-full opacity-30" />
        <div className="absolute top-[35%] right-[20%] w-[1px] h-[1px] bg-white rounded-full opacity-50" />
      </div>

      {/* --- Main Grid Content --- */}
      <div className="relative z-10 w-full flex flex-col items-center mt-2 md:mt-24">
        
        {/* Row 1: Top Spacer */}
        <div className="w-full flex justify-center h-6 md:h-8 relative">
             <HorizontalLine />
             <GridLines width="w-[340px] md:w-[740px]" gradient="top" />
             <GridLines width="w-[280px] md:w-[580px]" gradient="top" />
        </div>

        {/* Row 2: Badge */}
        <div className="w-full flex justify-center relative">
            <HorizontalLine />
            <GridLines width="w-[340px] md:w-[740px]" />
            <GridLines width="w-[280px] md:w-[580px]" />

            <div className="w-[280px] md:w-[580px] py-6 md:py-8 flex flex-col items-center justify-center relative z-10">
                 {/* Badge Content */}
                 <div className="relative flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] shadow-[0_0_20px_rgba(255,218,194,0.1)]">
                    <Sparkles className="w-3.5 h-3.5 text-[#ffdac2]" />
                    <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-t from-[#ffccbf] to-[#ffceb0] tracking-wide">
                      NEW AI FEATURE
                    </span>
                 </div>
            </div>
        </div>

        {/* Row 3: Heading */}
        <div className="w-full flex justify-center relative">
             <HorizontalLine />
             <GridLines width="w-[340px] md:w-[740px]" />
             <GridLines width="w-[280px] md:w-[580px]" />

             {/* The Container for Heading */}
            <div className="w-[280px] md:w-[580px] py-10 md:py-16 flex flex-col items-center justify-center relative z-10">
                 
                 {/* Diamonds at the 4 corners */}
                 <div className="absolute -top-[3px] -left-[3px] w-[6px] h-[6px] bg-[#feb995] rotate-45 z-20 shadow-[0_0_10px_rgba(254,185,149,0.5)]" />
                 <div className="absolute -top-[3px] -right-[3px] w-[6px] h-[6px] bg-[#feb995] rotate-45 z-20 shadow-[0_0_10px_rgba(254,185,149,0.5)]" />
                 <div className="absolute -bottom-[3px] -left-[3px] w-[6px] h-[6px] bg-[#feb995] rotate-45 z-20 shadow-[0_0_10px_rgba(254,185,149,0.5)]" />
                 <div className="absolute -bottom-[3px] -right-[3px] w-[6px] h-[6px] bg-[#feb995] rotate-45 z-20 shadow-[0_0_10px_rgba(254,185,149,0.5)]" />
                 
                 {/* Heading Content */}
                 <h1 className="relative z-10 text-4xl md:text-7xl leading-[1.1] md:leading-[0.9] font-normal tracking-[-0.02em] text-[#ffcec2] font-sans mix-blend-screen text-center select-none">
                    Grow Your Band in AI Search
                 </h1>
            </div>
        </div>

        {/* Row 4: Subheading/Description */}
        <div className="w-full flex justify-center relative">
            <HorizontalLine />
            <GridLines width="w-[340px] md:w-[740px]" />
            <GridLines width="w-[280px] md:w-[580px]" />

            <div className="w-[280px] md:w-[580px] py-6 md:py-10 flex flex-col items-center justify-center relative z-10">
                 <div className="absolute -bottom-[3px] -left-[3px] w-[6px] h-[6px] bg-[#feb995]/50 rotate-45 z-20" />
                 <div className="absolute -bottom-[3px] -right-[3px] w-[6px] h-[6px] bg-[#feb995]/50 rotate-45 z-20" />

                 <p className="relative z-10 max-w-sm text-center text-sm md:text-xl font-sans font-light leading-relaxed text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/50">
                    Prioritise What Matters - Streamline Your Workflow and Focus on What Drives Success!
                 </p>
            </div>
        </div>

        {/* CTA Area */}
        <div className="w-full flex justify-center pt-8 pb-16 md:pt-12 md:pb-20 relative">
             <GridLines width="w-[340px] md:w-[740px]" gradient="bottom" />
             <GridLines width="w-[280px] md:w-[580px]" gradient="bottom" />
             <CrystalButton />
             
             {/* THE FLOWING ENERGY COMPONENT - Placed here to originate from button */}
             <FlowingEnergy />
        </div>

        {/* --- Image Dashboard Preview (Angled & Animated) --- */}
        <div className="relative w-full max-w-6xl px-4 perspective-[2000px] mb-20 z-10 -mt-[2px]">
            <div 
                className="relative w-full rounded-2xl border border-[#ffdac2] shadow-[0_0_15px_rgba(255,218,194,0.3),inset_0_0_10px_rgba(255,218,194,0.1)] hover:shadow-[0_0_25px_rgba(255,218,194,0.6),inset_0_0_20px_rgba(255,218,194,0.2)] bg-[#050505] overflow-hidden transition-all duration-300 ease-out will-change-transform"
                style={{
                    transform: `rotateX(${rotateX}deg) scale(${scale})`,
                    opacity: opacity
                }}
            >
                {/* Image Container */}
                <div className="relative w-full aspect-[16/10] md:aspect-[21/9] bg-[#050505]">
                    {/* Placeholder Dark Dashboard Image - Updated for "pure dark" aesthetic */}
                    <img 
                        src="https://flipaeo.com/screenshot.png" 
                        alt="Dark Mode Dashboard Interface" 
                        className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    {/* Inner Shadow/Vignette for depth */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
                    
                    {/* Top Shine Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                </div>
                
                {/* Outer Glow Effect on Hover (Optional, adds nice interactive feel) */}
                <div className="absolute -inset-4 bg-primary/5 opacity-0 hover:opacity-100 blur-2xl transition-opacity duration-700 pointer-events-none" />
            </div>

            {/* Bottom Fade to blend dashboard into page bg */}
            <div className="absolute -bottom-10 left-0 right-0 h-40 bg-gradient-to-t from-[#030303] via-[#030303] to-transparent z-20 pointer-events-none" />
        </div>

      </div>
    </section>
  );
};

export default Hero;