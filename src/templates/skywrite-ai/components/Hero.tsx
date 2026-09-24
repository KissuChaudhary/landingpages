import React from 'react';
import { ArrowRight, FileText, Search, Zap, Bot } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-4 overflow-hidden">
      
      {/* Decorative background elements (Clouds/Icons) */}
      <div className="absolute top-20 left-10 text-white/40 animate-bounce duration-[3000ms]">
        <FileText size={64} />
      </div>
      <div className="absolute top-40 right-20 text-white/40 animate-bounce duration-[4000ms]">
        <Search size={56} />
      </div>
      <div className="absolute top-1/2 left-20 text-blue-400/20 hidden lg:block">
         <Bot size={120} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/50 shadow-sm text-sm font-semibold text-blue-800 mb-6">
          <Zap size={14} className="fill-current" />
          <span>V2.0 Now Available: Perplexity & Gemini Ranking Support</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
          SEO Content that <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Actually Sounds Human</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop publishing robotic fluff. SkyWrite researches your topic, analyzes competitors, and writes authentic articles that rank in the era of AI Search.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#demo" className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-bold px-8 py-4 rounded-full shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-1 hover:shadow-2xl flex items-center gap-2">
            Try it for free
            <ArrowRight size={20} />
          </a>
          <button className="bg-white hover:bg-slate-50 text-slate-800 text-lg font-bold px-8 py-4 rounded-full shadow-lg transition-all hover:-translate-y-1 border border-slate-200">
            View generated samples
          </button>
        </div>
      </div>

      {/* Main Visual - The "Window" into the app */}
      <div className="mt-20 max-w-5xl mx-auto relative">
        <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border-4 border-white/50">
           <div className="bg-slate-50 rounded-[2rem] border border-slate-200 overflow-hidden relative min-h-[400px] md:min-h-[500px]">
              {/* Fake UI Header */}
              <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                 </div>
                 <div className="bg-slate-100 text-slate-400 text-xs px-3 py-1 rounded-full font-mono">
                    skywrite-editor.v2
                 </div>
                 <div className="w-16"></div>
              </div>

              {/* Fake UI Body */}
              <div className="p-8 grid-pattern h-full relative">
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-10"></div>
                 
                 <div className="max-w-2xl mx-auto text-center mt-12 md:mt-20">
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-serif italic">
                      "It's like hiring a senior editor <br/> who works 24/7."
                    </h3>
                    <div className="inline-block bg-white px-6 py-3 rounded-xl shadow-md border border-slate-100 text-slate-600 mt-6 transform -rotate-2">
                       Generated 4,500 words in 2 minutes
                    </div>
                 </div>

                 {/* Floating Cards simulating the app */}
                 <div className="absolute bottom-[-50px] left-10 md:left-20 bg-white p-4 rounded-2xl shadow-lg border border-slate-100 w-64 rotate-3 animate-pulse">
                    <div className="h-2 w-12 bg-blue-100 rounded mb-3"></div>
                    <div className="h-2 w-full bg-slate-100 rounded mb-2"></div>
                    <div className="h-2 w-3/4 bg-slate-100 rounded"></div>
                 </div>

                 <div className="absolute bottom-[-20px] right-10 md:right-32 bg-white p-4 rounded-2xl shadow-lg border border-slate-100 w-56 -rotate-3">
                    <div className="flex items-center gap-2 mb-2">
                       <div className="bg-green-100 text-green-700 p-1 rounded">
                          <Zap size={12} />
                       </div>
                       <span className="text-xs font-bold text-slate-700">SEO Score: 98/100</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-green-500 w-[98%] h-full"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;