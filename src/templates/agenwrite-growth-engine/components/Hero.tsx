import React from 'react';
import { FeatureTicker } from './FeatureTicker';
import { ArrowRight, PlayCircle, Zap, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative z-10 flex flex-col items-center text-center">
      
      {/* Full Width Background Pattern */}
      {/* Positioned absolutely to break out of parent container padding and width constraints */}
      <div
        className="absolute top-[-160px] left-[50%] -translate-x-1/2 w-[100vw] h-[140%] min-h-[800px] z-0 pointer-events-none"
        style={{
           backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 3px, #e4e4e7 3px, #e4e4e7 4px)",
           // Mask to fade out the pattern at the bottom smoothly
           maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
           WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
        }}
      />

      {/* Content Container (Restricted Width) */}
      <div className="max-w-4xl mx-auto relative z-10">
          <FeatureTicker />
          
          <h1 className="text-4xl sm:text-7xl font-extrabold text-stone-900 tracking-tighter leading-[1.15] sm:leading-[1.1] mb-8">
            Don’t just rank <br></br> <span className="text-stone-500">Be the Source AI cites.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            FlipAEO is an Strategic Content Engine designed for Generative Engine Optimization (GEO). We analyze your brand, competitors, and visibility gaps to decide what content should exist, what should come next, and what actually moves authority forward before it ever writes a word.
          </p>

          {/* Modern CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 justify-center mb-12">
            
           {/* Primary Button */}
            <button className="group relative h-14 pl-8 pr-6 bg-stone-900 text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-stone-900/20 active:scale-[0.98]">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-100 pointer-events-none"></div>
              <div className="flex items-center gap-3 font-semibold text-[15px]">
                <span>Build My Growth Strategy</span>
                {/* CHANGED: Started with white/dark text, hovers to stone-800/white text */}
                <div className="w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 bg-white text-stone-900 group-hover:bg-stone-800 group-hover:text-white">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </button>

            {/* Secondary Button */}
            <button className="group h-14 pl-2 pr-8 bg-white text-stone-600 rounded-full border border-stone-200 transition-all duration-300 hover:border-stone-300 hover:text-stone-900 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3">
              {/* CHANGED: Started with accent colors, hovers to stone-100/stone-500 */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 bg-accent-50 text-accent-600 group-hover:bg-stone-100 group-hover:text-stone-500">
                 <PlayCircle className="w-5 h-5" />
              </div>
              <span className="font-semibold text-[15px]">See the engine</span>
            </button>

          </div>

          {/* SOCIAL PROOF / TRUST SIGNALS */}
          <div className="flex flex-col items-center gap-3 animate-fade-in-up">

            {/* Avatar Stack + Rating - Minimal Layout */}
            <div className="flex items-center gap-4">

              {/* Avatar Stack */}
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-[3px] border-[#f2f2f0] bg-white overflow-hidden hover:-translate-y-0.5 transition-transform relative z-0 hover:z-10">
                    <img
                      src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i + 42}`}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Rating & Count */}
              <div className="flex flex-col items-start">
                <div className="flex gap-0.5 mb-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className="w-3.5 h-3.5 text-accent-500 fill-accent-500" />
                  ))}
                </div>
                <span className="font-semibold text-sm text-stone-900 uppercase tracking-tight">
                  90+ Articles created
                </span>
              </div>
            </div>

            {/* Micro-Copy - Simple Text */}
            <p className="text-xs text-stone-500 font-medium tracking-wide">
              Cancel anytime <span className="text-stone-300 mx-1">·</span> 14-day guarantee
            </p>
          </div>
      </div>
    </section>
  );
};