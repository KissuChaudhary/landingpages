import React from 'react';
import { ArrowRight, Check, Sparkles, Send } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-center mt-12 md:mt-16 relative">
      
      {/* Centered Content Wrapper */}
      <div className="w-full max-w-[1200px] flex flex-col items-center relative z-10 px-4 md:px-8">
        
        {/* Top Badge: Value Prop Indicator */}
        <div className="mb-6 flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-black hard-shadow-sm rotate-[-1deg] hover:rotate-0 transition-transform cursor-default">
          <div className="w-2 h-2 bg-[#FF6B8B] rounded-full animate-pulse"></div>
          <span className="text-xs font-bold tracking-widest uppercase">
            Waitlist Open: Batch #3
          </span>
        </div>

        {/* Headline - Sophisticated & High Impact */}
        <h1 className="font-serif-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-center text-[#1A1A1A] mb-8 max-w-5xl mx-auto z-10">
          Write articles that <span className="italic">answer engines</span> actually choose.
        </h1>

        {/* Subheadline & Description */}
        <p className="font-sans-tech text-lg md:text-xl text-center max-w-2xl mx-auto leading-relaxed text-gray-700 mb-10">
          Stop optimizing for 2010's SEO. AgentWrite helps you craft authority-driven, 
          answer-based content that <strong>Perplexity</strong>, <strong>SearchGPT</strong>, and <strong>Gemini</strong> cite as the source of truth.
        </p>

        {/* Conversion Area: Email Form */}
        <div className="w-full max-w-md mx-auto mb-16 relative z-20">
          <div className="flex flex-col gap-2">
            <form className="flex w-full hard-shadow transition-transform hover:-translate-y-0.5">
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="flex-grow h-14 pl-6 pr-4 bg-white border-2 border-black border-r-0 text-black placeholder:text-gray-400 focus:outline-none focus:bg-gray-50 font-medium"
              />
              <button className="h-14 px-6 md:px-8 bg-[#EAB308] border-2 border-black text-sm font-bold hover:bg-[#dca600] transition-colors flex items-center gap-2 whitespace-nowrap">
                JOIN LIST <ArrowRight size={16} strokeWidth={3} />
              </button>
            </form>
            <div className="flex justify-center gap-6 mt-3 text-[10px] md:text-xs font-bold uppercase tracking-wide text-gray-500">
              <span className="flex items-center gap-1"><Check size={12} /> 30-Day Strategy</span>
              <span className="flex items-center gap-1"><Check size={12} /> No Credit Card</span>
            </div>
          </div>
        </div>

        {/* Main Visual: The "Agent" Editor Window */}
        <div className="relative w-full flex items-center justify-center">
          
          {/* Decorative Elements around frame */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-black/5 -z-10"></div>
          
          {/* The Frame */}
          <div className="relative w-full max-w-5xl bg-[#FDFDFD] border-2 border-black p-0 hard-shadow z-10 flex flex-col">
            
            {/* Window Header */}
            <div className="w-full border-b-2 border-black h-10 flex items-center justify-between px-3 bg-[#F0EEE9]">
               <div className="flex items-center gap-2">
                  {/* Traffic Lights */}
                  <div className="flex gap-1.5 border-r-2 border-black pr-3 mr-1">
                    <div className="w-3 h-3 bg-white border border-black rounded-sm"></div>
                    <div className="w-3 h-3 bg-black border border-black rounded-sm"></div>
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-800">
                    AGENT_WRITE_V1.0.exe
                  </span>
               </div>
               <div className="text-[10px] font-mono opacity-60">
                  AEO_MODE: ACTIVE
               </div>
            </div>

            {/* Window Content (Split View Idea) */}
            <div className="relative w-full aspect-[16/10] md:aspect-[2/1] bg-white overflow-hidden flex flex-col md:flex-row">
              
              {/* Sidebar (Tools) - Hidden on small mobile */}
              <div className="hidden md:flex flex-col w-64 border-r-2 border-black bg-gray-50 p-4 gap-4">
                 <div className="space-y-3">
                    <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">Analysis Sources</div>
                    {['Perplexity_Index', 'Google_SGE', 'OpenAI_Search', 'Gemini_Ultra'].map((tool) => (
                      <div key={tool} className="flex items-center gap-2 text-xs font-bold border-2 border-gray-200 bg-white p-2 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        {tool}
                      </div>
                    ))}
                 </div>
                 
                 <div className="mt-auto p-3 bg-[#EAB308]/10 border-2 border-black border-dashed">
                    <div className="text-[10px] font-bold leading-tight">
                      SCORE PREDICTION:
                    </div>
                    <div className="text-3xl font-serif-display font-bold">98/100</div>
                 </div>
              </div>

              {/* Main Editor Area */}
              <div className="flex-grow p-6 md:p-10 relative font-mono text-sm md:text-base overflow-hidden">
                
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-50 pointer-events-none"></div>

                <div className="relative z-10 max-w-2xl">
                   <div className="inline-block px-2 py-1 bg-black text-white text-xs font-bold mb-4">DRAFTING...</div>
                   
                   <h2 className="text-2xl md:text-3xl font-bold mb-6 font-serif-display">
                     Why Traditional SEO is Dying
                   </h2>
                   
                   <div className="space-y-4 text-gray-600">
                      <p>
                        <span className="text-[#FF6B8B] font-bold">{`>`}</span> The shift from <span className="bg-yellow-100 px-1 border border-black/10">keywords</span> to <span className="bg-yellow-100 px-1 border border-black/10">intent</span> is complete.
                      </p>
                      <p>
                        <span className="text-[#FF6B8B] font-bold">{`>`}</span> Answer engines don't want 2,000 words of fluff. They want direct, structured data they can synthesize.
                      </p>
                      <p>
                        <span className="text-[#FF6B8B] font-bold">{`>`}</span> AgentWrite restructures your content graph to be machine-readable first, human-loved second.
                      </p>
                      <p className="flex items-center gap-2 text-black font-bold animate-pulse">
                        <span className="w-2 h-4 bg-black block"></span>
                      </p>
                   </div>
                </div>
                
                {/* Floating UI Element inside the editor */}
                <div className="absolute bottom-6 right-6 bg-white border-2 border-black p-4 hard-shadow-sm max-w-[200px] hidden md:block">
                   <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-500">
                      <Sparkles size={12} className="text-[#FF6B8B]" />
                      AI SUGGESTION
                   </div>
                   <p className="text-xs leading-tight font-medium">
                     Add a structured data table comparing AEO vs SEO to increase citation probability by 40%.
                   </p>
                </div>

              </div>
            </div>
          </div>

          {/* Decorative 'Under' element to give depth */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-dots opacity-20 hidden md:block"></div>
        </div>

      </div>
      
      {/* Social Proof Strip - Full Width */}
      <div className="mt-16 mb-8 w-full border-y-2 border-black py-4 bg-white relative z-20">
        <div className="max-w-[1200px] mx-auto flex flex-wrap justify-center md:justify-between items-center gap-8 px-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Simple text logos for aesthetic matching */}
           <span className="font-black text-lg tracking-tighter">PERPLEXITY</span>
           <span className="font-black text-lg tracking-tighter">OPENAI</span>
           <span className="font-black text-lg tracking-tighter">GOOGLE DEEPMIND</span>
           <span className="font-black text-lg tracking-tighter">ANTHROPIC</span>
           <span className="font-black text-lg tracking-tighter">MISTRAL</span>
        </div>
      </div>

    </section>
  );
};

export default Hero;