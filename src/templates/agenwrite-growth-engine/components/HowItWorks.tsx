import React from 'react';
import { Quote, Map, Layers, FileCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="w-full px-4 relative z-10 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          <span className="text-accent-600 font-bold tracking-widest uppercase text-xs mb-4">How it works</span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-stone-900 tracking-tighter mb-6">
            A Proven System for <br /> Compounding Organic Traffic
          </h2>
          <p className="text-lg sm:text-xl text-stone-500 max-w-2xl leading-relaxed">
            Clear answers, real authority, and content that compounds designed for modern AI search and human readers.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-20">
          
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-stone-300 -z-10"></div>
          <div className="hidden md:block absolute bottom-12 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-stone-300 -z-10"></div>

          {/* Step 01 */}
          <div className="group relative h-full">
            {/* Outer Container Layer */}
            <div className="h-full bg-stone-200/40 p-1.5 rounded-[2.5rem] border border-stone-200/40 transition-colors duration-300 hover:bg-stone-200/60">
              {/* Inner White Card */}
              <div className="h-full bg-white rounded-[2rem] p-8 shadow-sm border border-stone-100/50 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-stone-900/5 group-hover:-translate-y-1">
                
                {/* Icon & Number Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-900 border border-stone-200 shadow-inner group-hover:scale-105 transition-transform duration-500">
                     <Map className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-6xl font-extrabold text-stone-100 font-sans tracking-tighter select-none transition-colors duration-500 group-hover:text-stone-200/80">
                    01
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-stone-900 uppercase tracking-wide mb-4 pr-4">
                  We Map The Questions That Matter
                </h3>
                <p className="text-stone-500 text-[15px] leading-relaxed">
                  We start by understanding your category the way AI systems and real users do. What questions already exist. What’s over-covered. What’s missing entirely. This becomes the foundation for every decision that follows.
                </p>
              </div>
            </div>
          </div>

          {/* Step 02 */}
          <div className="group relative h-full">
            {/* Outer Container Layer */}
            <div className="h-full bg-stone-200/40 p-1.5 rounded-[2.5rem] border border-stone-200/40 transition-colors duration-300 hover:bg-stone-200/60">
               {/* Inner White Card */}
               <div className="h-full bg-white rounded-[2rem] p-8 shadow-sm border border-stone-100/50 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-stone-900/5 group-hover:-translate-y-1">
                 
                {/* Icon & Number Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-900 border border-stone-200 shadow-inner group-hover:scale-105 transition-transform duration-500">
                     <Layers className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-6xl font-extrabold text-stone-100 font-sans tracking-tighter select-none transition-colors duration-500 group-hover:text-stone-200/80">
                    02
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-stone-900 uppercase tracking-wide mb-4 pr-4">
                  We Build A Strategy That Compounds
                </h3>
                <p className="text-stone-500 text-[15px] leading-relaxed">
                  Not everything should be written now. We decide what comes first, what supports it, and what unlocks authority later. Each topic earns the right for the next one to exist.
                </p>
              </div>
            </div>
          </div>

          {/* Step 03 */}
          <div className="group relative h-full">
            {/* Outer Container Layer */}
            <div className="h-full bg-stone-200/40 p-1.5 rounded-[2.5rem] border border-stone-200/40 transition-colors duration-300 hover:bg-stone-200/60">
              {/* Inner White Card */}
              <div className="h-full bg-white rounded-[2rem] p-8 shadow-sm border border-stone-100/50 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-stone-900/5 group-hover:-translate-y-1">
                
                 {/* Icon & Number Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-900 border border-stone-200 shadow-inner group-hover:scale-105 transition-transform duration-500">
                     <FileCheck className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-6xl font-extrabold text-stone-100 font-sans tracking-tighter select-none transition-colors duration-500 group-hover:text-stone-200/80">
                    03
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-stone-900 uppercase tracking-wide mb-4 pr-4">
                  We Deliver Answer-First Content
                </h3>
                <p className="text-stone-500 text-[15px] leading-relaxed">
                  Once the strategy is clear, execution becomes simple. Articles are written to fully resolve the question, match your brand voice, and publish cleanly without friction.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Philosophy Block */}
        <div className="relative">
          <div className="absolute inset-0 bg-stone-900 rounded-[2.5rem] rotate-1 opacity-5"></div>
          <div className="relative bg-stone-900 rounded-[2.5rem] p-8 sm:p-12 text-center overflow-hidden">
             
             {/* Background Decoration */}
             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
                  style={{
                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}>
             </div>

             <Quote className="w-10 h-10 text-stone-600 mx-auto mb-6 fill-current opacity-50" />
             
             <p className="text-xl sm:text-3xl font-medium text-stone-200 max-w-4xl mx-auto leading-relaxed tracking-tight">
               "This is not only content automation for speed. It’s a system designed to earn visibility, trust, and long-term growth."
             </p>

          </div>
        </div>

      </div>
    </section>
  );
};