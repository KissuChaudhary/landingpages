import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto w-full">
      <div className="relative bg-[#0F172A] rounded-[48px] overflow-hidden px-6 py-32 md:py-40 text-center flex flex-col items-center justify-center isolate shadow-2xl">
        
        {/* Background Gradient & Particles */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B] to-[#0F172A] pointer-events-none"></div>
        <div className="absolute inset-0 pointer-events-none opacity-50">
            <div className="absolute top-12 left-12 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse"></div>
            <div className="absolute top-24 right-32 w-1 h-1 bg-white/30 rounded-full"></div>
            <div className="absolute bottom-16 left-1/4 w-1 h-1 bg-white/20 rounded-full"></div>
            <div className="absolute top-1/2 right-12 w-1.5 h-1.5 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-1/3 right-1/4 w-0.5 h-0.5 bg-white/40 rounded-full"></div>
            <div className="absolute top-1/4 left-1/3 w-0.5 h-0.5 bg-white/30 rounded-full"></div>
            <div className="absolute bottom-8 right-1/3 w-1 h-1 bg-white/20 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="relative z-30 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight">
                Ready to Level Up?
            </h2>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed font-medium">
                Whether it’s a one-off edit or a full channel transformation, we’re ready when you are. Let’s talk ideas.
            </p>
            
            <button className="group flex items-center gap-3 bg-white text-slate-900 pl-8 pr-2 py-2 rounded-full font-bold text-lg hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 mx-auto shadow-xl shadow-white/5">
                Book a Call
                <span className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center text-white transition-transform group-hover:rotate-[-45deg]">
                    <ArrowRight size={20} strokeWidth={2.5} />
                </span>
            </button>
        </div>

        {/* Floating Pills - Responsive Positioning */}
        
        {/* Top Left: "From meh to wow!" */}
        <div className="absolute top-[15%] left-[5%] md:left-[10%] transform -rotate-12 hover:scale-110 transition-transform cursor-default z-20 hidden sm:block">
            <div className="bg-[#1E293B] text-slate-300 px-4 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl border border-white/5 shadow-xl font-bold text-xs md:text-sm tracking-wide whitespace-nowrap">
                From meh to wow!
            </div>
        </div>

        {/* Bottom Left: "No Editor? No Problem" */}
        <div className="absolute bottom-[20%] left-[2%] md:left-[8%] transform rotate-6 hover:scale-110 transition-transform cursor-default z-20 hidden sm:block">
             <div className="bg-brand-orange text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl shadow-xl shadow-orange-500/20 font-bold text-xs md:text-sm tracking-wide whitespace-nowrap">
                No Editor? No Problem
            </div>
        </div>

        {/* Top Right: "Low Views? Fixed" */}
        <div className="absolute top-[20%] right-[5%] md:right-[8%] transform rotate-12 hover:scale-110 transition-transform cursor-default z-20 hidden sm:block">
             <div className="bg-[#1E293B] text-slate-300 px-4 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl border border-white/5 shadow-xl font-bold text-xs md:text-sm tracking-wide whitespace-nowrap">
                Low Views? Fixed
            </div>
        </div>

        {/* Mid Right: "Watch Time Wins" (Closer to center) */}
        <div className="absolute bottom-[35%] right-[10%] md:right-[20%] transform -rotate-6 hover:scale-110 transition-transform cursor-default z-20 hidden sm:block">
            <div className="bg-[#1E293B] text-slate-300 px-4 py-2 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl border border-white/5 shadow-xl font-bold text-xs md:text-sm tracking-wide whitespace-nowrap">
                Watch Time Wins
            </div>
        </div>

        {/* Bottom Right: "Conversion Boost" (Outer) */}
         <div className="absolute bottom-[12%] right-[2%] md:right-[10%] transform -rotate-12 hover:scale-110 transition-transform cursor-default z-20 hidden sm:block">
             <div className="bg-brand-orange text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl shadow-xl shadow-orange-500/20 font-bold text-xs md:text-sm tracking-wide whitespace-nowrap">
                Conversion Boost
            </div>
        </div>

      </div>
    </section>
  )
}