import React from 'react';
import { ArrowRight, Wand2, Play, BarChart3, Scissors, Layers } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 px-6 w-full overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px]" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center z-10">
        
        {/* Trusted Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full pl-1 pr-4 py-1 mb-8 shadow-sm hover:shadow-md transition-all cursor-default animate-fade-in-up">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <img 
                key={i}
                src={`https://picsum.photos/seed/creator${i}/64/64`} 
                alt="User" 
                className="w-7 h-7 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-600">Trusted by 100+ Top Creators</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] mb-8 text-slate-900 max-w-4xl">
          Video Edits That <br className="hidden md:block" />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-600">
            Scale Your Flow
            {/* Floating Icon */}
            <div className="absolute -top-6 -right-8 md:-right-12 hidden md:flex w-10 h-10 md:w-14 md:h-14 bg-white border border-slate-100 rounded-2xl rotate-12 items-center justify-center text-brand-orange shadow-xl shadow-orange-500/20 animate-float">
              <Wand2 size={24} className="md:w-7 md:h-7" />
            </div>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-10 max-w-2xl font-medium mx-auto">
          Stop wrestling with timelines. We turn your raw footage into retention-optimized masterpieces that grow your channel while you sleep.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
          <button className="group flex items-center gap-3 bg-slate-900 text-white pl-8 pr-2 py-2 rounded-full font-semibold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 hover:scale-105 active:scale-95">
            Start Your Project
            <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 transition-transform group-hover:rotate-[-45deg]">
              <ArrowRight size={20} strokeWidth={2.5} />
            </span>
          </button>
          <button className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all">
            <Play size={18} fill="currentColor" className="opacity-50" />
            View Showreel
          </button>
        </div>

        {/* Bottom Visual: 3D App Interface Mockup */}
        <div className="relative w-full max-w-5xl perspective-1000 group">
          {/* Main Interface Window */}
          <div className="relative bg-slate-900 rounded-xl md:rounded-2xl border border-slate-800 shadow-2xl shadow-slate-900/50 overflow-hidden transform transition-transform duration-700 hover:rotate-x-2 md:rotate-x-6 hover:scale-[1.01]">
            
            {/* Window Header */}
            <div className="h-10 bg-slate-950 border-b border-slate-800 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto text-xs font-mono text-slate-500 opacity-50">CreatorFlow Studio v2.0</div>
            </div>

            {/* Interface Body */}
            <div className="flex h-[300px] md:h-[500px]">
              
              {/* Sidebar */}
              <div className="w-16 md:w-64 bg-slate-900 border-r border-slate-800 p-4 hidden md:flex flex-col gap-4">
                <div className="h-8 w-3/4 bg-slate-800 rounded-md animate-pulse" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer">
                      <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-500">
                        {i === 1 ? <Layers size={14} /> : i === 2 ? <Scissors size={14} /> : <BarChart3 size={14} />}
                      </div>
                      <div className="h-2 w-20 bg-slate-800 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 bg-slate-950 p-4 md:p-6 flex flex-col gap-4 md:gap-6 relative">
                
                {/* Video Preview Area */}
                <div className="flex-1 bg-slate-900 rounded-lg border border-slate-800 relative overflow-hidden group-hover:border-brand-orange/30 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                     <Play size={48} className="text-slate-700 fill-slate-700 opacity-50" />
                  </div>
                  
                  {/* Floating Analytics Overlay */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-lg flex flex-col gap-1">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Retention</div>
                    <div className="text-lg font-bold text-green-400">84.2%</div>
                  </div>
                </div>

                {/* Timeline Area */}
                <div className="h-24 md:h-32 bg-slate-900 rounded-lg border border-slate-800 p-3 md:p-4 flex flex-col gap-2 relative overflow-hidden">
                  {/* Time Markers */}
                  <div className="flex justify-between text-[10px] text-slate-600 font-mono mb-1">
                    <span>00:00</span>
                    <span>00:15</span>
                    <span>00:30</span>
                    <span>00:45</span>
                  </div>
                  
                  {/* Tracks */}
                  <div className="space-y-1.5">
                    <div className="h-6 md:h-8 bg-brand-orange/20 rounded border border-brand-orange/30 w-full relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-1/3 bg-brand-orange/40" />
                      <div className="absolute inset-y-0 left-1/2 w-1/4 bg-brand-orange/40" />
                    </div>
                    <div className="h-6 md:h-8 bg-blue-500/10 rounded border border-blue-500/20 w-3/4" />
                  </div>

                  {/* Playhead */}
                  <div className="absolute top-0 bottom-0 left-1/3 w-0.5 bg-red-500 z-10 shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                    <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-red-500 rotate-45" />
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Decorative Glow Behind Interface */}
          <div className="absolute -inset-4 bg-brand-orange/20 blur-3xl -z-10 rounded-[3rem] opacity-40" />
        </div>

      </div>
    </section>
  );
}