import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const CallToAction = () => {
  return (
    <section className="w-full bg-[#030303] py-20 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0A0A0A] px-6 py-20 md:px-20 md:py-24 text-center group">
                
                {/* --- Background Effects --- */}
                
                {/* 1. Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
                
                {/* 2. Shiny Blob Effect - Top Left */}
                <div className={cn(
                    "absolute w-[450px] h-[450px] rounded-full pointer-events-none transition-all duration-700 ease-in-out opacity-25 group-hover:opacity-45 mix-blend-screen",
                    "bg-gradient-to-br from-[#ff552e] via-[#ff8f70] to-[#ffdac2] blur-[100px]",
                    "-top-[150px] -left-[150px]"
                )} />

                {/* 3. Top Down Shine */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
                
                {/* 4. Central Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity duration-1000" />

                {/* --- Content --- */}
                <div className="relative z-10 space-y-8 flex flex-col items-center">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FFDAC2] animate-pulse" />
                        <span className="text-xs font-medium text-white/80 tracking-wide">14-DAY FREE TRIAL</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-sans text-white tracking-tight leading-[1.1] max-w-4xl">
                        Ready to <span className="font-serif italic text-[#FFDAC2]">Transform</span> Your<br className="hidden md:block" /> Workflow?
                    </h2>
                    
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
                        Join thousands of high-performing teams who have switched to Aligno. Experience clarity, speed, and precision like never before.
                    </p>

                    <div className="flex flex-col md:flex-row items-center gap-4 pt-6 w-full md:w-auto">
                        {/* Primary Button - Matches Pro Plan Button Style */}
                        <button className="w-full md:w-auto px-10 py-4 rounded-full bg-gradient-to-b from-[#FFDAC2] to-[#E6A88A] text-white font-semibold shadow-[0_4px_20px_rgba(255,218,194,0.3),inset_0_1px_0_rgba(255,255,255,0.4)] hover:shadow-[0_6px_25px_rgba(255,218,194,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] hover:translate-y-[-1px] transition-all duration-300 flex items-center justify-center gap-2">
                            Get Started Now
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        {/* Secondary Button - Matches Free Plan Button Style */}
                        <button className="w-full md:w-auto px-10 py-4 rounded-full border border-white/10 bg-[#1A1A1A] text-white font-medium hover:bg-white/10 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden group/btn flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50" />
                            <span className="relative z-10">Book a Demo</span>
                        </button>
                    </div>
                    
                    <p className="text-white/30 text-sm font-light">No credit card required • Cancel anytime</p>
                </div>
            </div>
        </div>
    </section>
  );
};

export default CallToAction;