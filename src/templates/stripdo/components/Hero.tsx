import React from 'react';
import { ArrowRight, Wand2 } from 'lucide-react';
import TestimonialCard from './TestimonialCard';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-24 px-6 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-0 items-start">
      
      {/* Left Content */}
      <div className="flex flex-col items-start max-w-2xl z-10 pt-4 md:pt-10">
        
        {/* Trusted Badge */}
        <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full pl-1 pr-4 py-1 mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <img 
                key={i}
                src={`https://picsum.photos/seed/user${i}/64/64`} 
                alt="User" 
                className="w-7 h-7 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-700">Trusted By 100+ Creators</span>
        </div>

        {/* Headline */}
        <div className="relative">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-slate-900">
            Video Edits <br/>
            <span className="relative inline-block">
              That <span className="text-brand-orange">Stand Out!</span>
              {/* Floating Magic Icon */}
              <div className="absolute -top-4 -right-16 hidden md:flex w-12 h-12 bg-brand-orange rounded-xl rotate-12 items-center justify-center text-white shadow-lg shadow-orange-500/40 animate-float">
                <Wand2 size={24} />
              </div>
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-10 max-w-lg font-medium">
          Hook faster. Edit smarter. Grow your audience with scroll-stopping YouTube videos.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-start gap-3">
          <button className="group flex items-center gap-3 bg-slate-900 text-white pl-8 pr-2 py-2 rounded-full font-semibold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 hover:scale-[1.02] active:scale-95">
            Book a Call
            <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 transition-transform group-hover:rotate-[-45deg]">
              <ArrowRight size={20} strokeWidth={2.5} />
            </span>
          </button>
          <span className="text-sm text-slate-400 font-medium ml-4">No pressure, just possibilities.</span>
        </div>
      </div>

      {/* Right Content - Visuals */}
      {/* Moved down slightly with pt-16/pt-28. Centered on mobile. */}
      <div className="relative h-[450px] md:h-[600px] w-full flex items-start justify-center lg:justify-center pt-16 md:pt-28">
        {/* Background Blob for depth */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 bg-orange-100/50 rounded-full blur-3xl -z-10"></div>
        
        {/* Floating Cards Container - Responsive Max Width */}
        <div className="relative w-full max-w-[320px] md:max-w-[450px]">
          
          {/* Card 1 - Tomas */}
          <div className="absolute top-0 right-0 md:right-12 z-10 w-full md:w-[340px] transition-transform hover:z-30 hover:scale-105 duration-300">
            <TestimonialCard 
              handle="@tomas" 
              avatar="https://picsum.photos/seed/tomas/100/100"
              content="Bestest Edit in 48 hours."
              variant="rotate-neg"
            />
          </div>

          {/* Card 2 - Mark */}
          <div className="absolute top-36 md:top-40 right-0 md:right-0 w-full md:w-[360px] transition-transform hover:z-30 hover:scale-105 duration-300">
            <TestimonialCard 
              handle="@mark_locus" 
              avatar="https://picsum.photos/seed/mark/100/100"
              content="This edit boosted my retention rate by 35%!"
              variant="rotate-pos"
            />
          </div>

        </div>
      </div>
    </section>
  );
}