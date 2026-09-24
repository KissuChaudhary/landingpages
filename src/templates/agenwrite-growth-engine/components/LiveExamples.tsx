import React from 'react';
import { ArrowUpRight, Globe, Zap } from 'lucide-react';

const examples = [
  {
    domain: "launchdirectories.com",
    title: "How to Promote Your Chrome Extension Online",
    category: "SaaS Growth"
  },
  {
    domain: "bringback.pro",
    title: "Can You Animate Photos of Deceased Relatives Safely?",
    category: "AI Technology"
  },
  {
    domain: "flipaeo.com",
    title: "The Complete Guide to AI SEO & AEO in 2026",
    category: "Marketing"
  },
  {
    domain: "unrealshot.com",
    title: "How to Use AI Headshots to Level Up Your Resume",
    category: "Career"
  }
];

export const LiveExamples: React.FC = () => {
  return (
    <section className="w-full px-4 relative z-10 py-24 bg-[#f2f2f0] overflow-hidden">
      {/* Background Decor - Dot Grid */}
       <div className="absolute inset-0 z-0 pointer-events-none opacity-40" 
            style={{
              backgroundImage: 'radial-gradient(#d6d3d1 1.5px, transparent 1.5px)',
              backgroundSize: '32px 32px'
            }}>
       </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900 text-white mb-8 shadow-xl shadow-stone-900/10 border border-stone-800">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest">Live Production Articles</span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-extrabold text-stone-900 tracking-tighter mb-6">
            Proof, not promises.
          </h2>
          <p className="text-xl text-stone-500 max-w-2xl leading-relaxed">
            See what our engine writes when you're not looking. Full articles published on real domains, untouched by humans.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {examples.map((item, idx) => (
            <a 
              key={idx} 
              href="#" 
              className="group relative bg-white rounded-[2.5rem] p-2 border border-stone-200 transition-all duration-500 hover:shadow-2xl hover:shadow-stone-900/5 hover:-translate-y-1 hover:border-stone-300"
            >
              {/* Inner Container */}
              <div className="h-full bg-stone-50/50 rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between border border-stone-100 group-hover:bg-white transition-colors duration-500">
                
                {/* Top Row: Domain Pill */}
                <div className="flex items-start justify-between mb-8">
                    {/* Domain Badge */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white rounded-full border border-stone-200 shadow-sm group-hover:border-stone-300 transition-colors">
                        <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200/50 overflow-hidden">
                            <img src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=32`} className="w-3 h-3 opacity-60" alt="" />
                        </div>
                        <span className="font-mono text-xs text-stone-500 font-medium tracking-tight">
                            {item.domain}
                        </span>
                    </div>

                    {/* Category Tag */}
                    <span className="hidden sm:block px-3 py-1 rounded-md bg-stone-100 text-stone-500 text-[10px] font-bold uppercase tracking-wider border border-stone-200/50">
                        {item.category}
                    </span>
                </div>

                {/* Title */}
                <div className="mb-10">
                   <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-[1.1] tracking-tight group-hover:text-black transition-colors">
                     {item.title}
                   </h3>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between mt-auto pt-8 border-t border-stone-200/60 border-dashed">
                    <div className="flex items-center gap-2 text-stone-400">
                        <Globe className="w-4 h-4" />
                        <span className="text-xs font-medium">Live on web</span>
                    </div>

                    <div className="flex items-center gap-2 pl-4 pr-3 py-1.5 rounded-full bg-stone-100 text-stone-600 group-hover:bg-stone-900 group-hover:text-white transition-all duration-300">
                        <span className="text-[11px] font-bold uppercase tracking-wide">Read Now</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                </div>

              </div>
            </a>
          ))}
        </div>

        {/* CTA - Matched to Hero Primary Button */}
        <div className="flex justify-center">
            <button className="group relative h-14 pl-8 pr-6 bg-stone-900 text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-stone-900/20 active:scale-[0.98]">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-100 pointer-events-none"></div>
              <div className="flex items-center gap-3 font-semibold text-[15px]">
                <span>Create Articles Like This</span>
                <div className="w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 bg-white text-stone-900 group-hover:bg-stone-800 group-hover:text-white">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </button>
        </div>

      </div>
    </section>
  );
};
