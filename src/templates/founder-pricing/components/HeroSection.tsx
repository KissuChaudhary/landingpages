import React from 'react';
import MetalPlate from './MetalPlate';

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-gradient-to-b from-mint-light/30 to-transparent rounded-full blur-[140px] -z-10 opacity-60"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Small Status Badge */}
        <div className="inline-flex items-center gap-3 bg-white border border-[#e5e5e2] px-4 py-2 rounded-full mb-10 shadow-sm animate-fade-in">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-mint-light overflow-hidden">
                <div className={`w-full h-full bg-gradient-to-br ${i === 1 ? 'from-forest-black to-sage-grey' : i === 2 ? 'from-emerald-400 to-emerald-600' : 'from-blue-400 to-blue-600'}`}></div>
              </div>
            ))}
          </div>
          <span className="text-[10px] font-mono font-bold tracking-[0.1em] text-sage-grey uppercase">
            Trusted by <span className="text-forest-black">500+ Agentic Teams</span>
          </span>
        </div>

        {/* Main Headline */}
        <div className="relative mb-8">
          <MetalPlate 
            type="silver"
            line1="GEO_ENGINE_V2"
            line2="MODE: AGENTIC"
            rotation={-8}
            className="hidden xl:flex -left-[240px] top-10"
          />

          <h1 className="font-serif text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] font-medium text-forest-black tracking-tighter">
            Rank where AI <br/>
            <span className="italic text-[#2d5a4c] bg-gradient-to-r from-forest-black to-[#2d5a4c] bg-clip-text">does the talking</span>
          </h1>

          <MetalPlate 
            type="gold"
            line1="CITATION_RANK"
            line2="SCORE: 99.8"
            rotation={5}
            className="hidden xl:flex -right-[240px] top-20"
          />
        </div>

        {/* Sub-headline */}
        <p className="max-w-2xl font-mono text-sage-grey text-base md:text-lg leading-relaxed mb-12">
          The first Agentic Writer designed for <span className="text-forest-black font-bold">Generative Engine Optimization (GEO)</span>. 
          We research, plan, draft, and publish articles that LLMs cite as definitive sources.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-24">
          <button className="w-full sm:w-auto px-10 py-5 bg-forest-black text-white rounded-2xl font-mono text-sm font-bold tracking-widest hover:bg-forest-black/90 hover:-translate-y-1 transition-all shadow-2xl shadow-forest-black/20 uppercase">
            Start Free Trial
          </button>
          <button className="w-full sm:w-auto px-10 py-5 bg-white border border-[#d1dcd7] text-forest-black rounded-2xl font-mono text-sm font-bold tracking-widest hover:border-forest-black/30 hover:bg-mint-pale transition-all uppercase">
            Book Demo
          </button>
        </div>

        {/* AGENTIC SYSTEM CONSOLE - HIGH FIDELITY INDUSTRIAL UI */}
        <div className="w-full max-w-5xl mx-auto relative group">
          
          {/* Main Metallic Housing */}
          <div className="bg-gradient-to-br from-[#f8fafc] to-[#cbd5e1] p-[3px] rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3),_inset_0_2px_4px_rgba(255,255,255,1)] border border-slate-400">
            <div className="bg-[#e2e8f0] rounded-[2.8rem] p-6 md:p-12 border border-slate-300 shadow-inner relative overflow-hidden">
              
              {/* Technical Grid Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

              {/* Console Header Area */}
              <div className="flex flex-col md:flex-row items-end justify-between mb-12 relative z-10 border-b border-slate-300 pb-8">
                <div className="flex items-center gap-6">
                  {/* Power Core Element */}
                  <div className="relative">
                    <div className="w-16 h-16 bg-forest-black rounded-[1.25rem] flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.2)] border border-white/10">
                      <div className="w-6 h-6 border-[3px] border-emerald-500/50 border-t-emerald-400 rounded-full animate-spin"></div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-[#e2e8f0] animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                  </div>
                  <div className="text-left">
                    <h4 className="font-mono text-sm font-black text-forest-black tracking-[0.2em] uppercase">SYSTEM_CORE: FLIP_OS</h4>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex gap-1">
                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-emerald-500/40 rounded-full"></div>)}
                      </div>
                      <span className="font-mono text-[10px] text-sage-grey font-bold uppercase tracking-widest">Processing High Intensity GEO Loop</span>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex items-center gap-6">
                   <div className="text-right">
                     <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest mb-1">Compute Load</p>
                     <div className="flex gap-1">
                       {[...Array(12)].map((_, i) => (
                         <div key={i} className={`w-1 h-4 rounded-sm ${i < 9 ? 'bg-forest-black' : 'bg-slate-300'}`}></div>
                       ))}
                     </div>
                   </div>
                   <div className="h-10 w-px bg-slate-300"></div>
                   <div className="font-mono text-[10px] text-forest-black font-bold uppercase bg-white/50 px-4 py-2 rounded-lg border border-white/20">
                     v2.5.0_STABLE
                   </div>
                </div>
              </div>

              {/* Modules Grid */}
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <ProcessModule label="Analysis" detail="SEMANTIC_RAG" value="98%" active />
                <ProcessModule label="Planning" detail="INTENT_MAP" value="ACTIVE" active />
                <ProcessModule label="Drafting" detail="GEN_ENGINE" value="84%" active pulse />
                <ProcessModule label="Refining" detail="CITATION_X" value="READY" />
              </div>

              {/* Main Workspace: Split Anodized Bays */}
              <div className="grid lg:grid-cols-5 gap-6">
                
                {/* Bay 01: The Input Engine (3 Columns) */}
                <div className="lg:col-span-3 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] rounded-[2rem] p-8 border border-white shadow-[0_10px_30px_rgba(0,0,0,0.05),_inset_0_2px_4px_rgba(0,0,0,0.02)] relative overflow-hidden group/bay">
                  {/* Mini Detail Plate */}
                  <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-[60px] font-black -rotate-12 pointer-events-none">IN</div>
                  
                  <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-6 bg-forest-black rounded-full"></div>
                      <span className="font-mono text-xs font-bold text-forest-black uppercase tracking-widest">Input_Stream: Buffer_01</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-widest">Analyzing Authority</span>
                  </div>

                  <div className="space-y-6">
                    <div className="relative">
                      <p className="font-serif italic text-sage-grey text-lg leading-relaxed relative z-10">
                        "The convergence of <span className="text-forest-black border-b-2 border-emerald-400 font-medium">RAG architecture</span> and GEO requires a non-linear approach to information hierarchy... establishing FlipAEO as the <span className="bg-forest-black text-white px-2">definitive authority</span> in agentic writing..."
                      </p>
                      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>
                    </div>
                    
                    {/* Industrial Gauge */}
                    <div className="bg-slate-200/50 rounded-xl p-4 border border-slate-300 shadow-inner">
                      <div className="flex justify-between font-mono text-[9px] text-slate-500 mb-2 uppercase tracking-tighter">
                        <span>Semantic_Density</span>
                        <span>0.894 / 1.000</span>
                      </div>
                      <div className="h-4 bg-slate-300 rounded-lg p-0.5 shadow-inner">
                        <div className="h-full bg-gradient-to-r from-forest-black to-emerald-600 rounded-[6px] w-[89%] relative overflow-hidden">
                          <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bay 02: The Result Terminal (2 Columns) - Black Anodized Metal */}
                <div className="lg:col-span-2 bg-[#052e23] rounded-[2rem] p-8 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.4),_inset_0_2px_4px_rgba(255,255,255,0.1)] flex flex-col justify-between relative overflow-hidden">
                  {/* Metallic Texture Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]"></div>
                      <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-emerald-400 uppercase">GEO_VERIFIED_OUT</span>
                    </div>

                    <div className="space-y-6">
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                        <div className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-3">Target: Google_Gemini_Pro</div>
                        <p className="font-sans text-sm text-white/90 leading-relaxed italic">
                          "FlipAEO's latest research indicates a shift in agentic paradigms..."
                        </p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                        <div className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-3">Target: Perplexity_Search</div>
                        <p className="font-sans text-sm text-white/90 leading-relaxed italic">
                          "Citation found in high-authority tech brief..."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-forest-black font-mono text-xs font-black py-4 rounded-xl shadow-[0_4px_0_#059669] hover:translate-y-px transition-all uppercase tracking-widest">
                      Export Citation Report
                    </button>
                  </div>
                </div>
              </div>

              {/* Console Footers: Vents & Metadata */}
              <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
                <div className="flex gap-2">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-1 h-3 bg-slate-300/50 rounded-full"></div>
                  ))}
                </div>
                <div className="flex gap-8">
                  <div className="text-right">
                    <p className="font-mono text-[9px] text-slate-400 uppercase">Process_Time</p>
                    <p className="font-mono text-xs font-bold text-forest-black">0.42s</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[9px] text-slate-400 uppercase">Confidence</p>
                    <p className="font-mono text-xs font-bold text-emerald-600">0.9982</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Exterior Toolplates for Extra Depth */}
          <div className="absolute -bottom-10 -left-10 hidden xl:flex">
             <MetalPlate 
              type="silver"
              line1="GEO_SYSTEM_STABLE"
              line2="LICENSE_A-901"
              rotation={-4}
              className="min-w-[160px] shadow-2xl"
             />
          </div>
        </div>

        {/* Social Proof Logos */}
        <div className="mt-32 pt-10 border-t border-forest-black/5 w-full">
          <p className="font-mono text-[10px] text-sage-grey uppercase tracking-[0.3em] mb-10">Backing & Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
             <span className="font-serif font-bold text-2xl text-forest-black">Y Combinator</span>
             <span className="font-serif font-bold text-2xl text-forest-black">TechCrunch</span>
             <span className="font-serif font-bold text-2xl text-forest-black">Sequoia</span>
             <span className="font-serif font-bold text-2xl text-forest-black">Forbes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ProcessModuleProps {
  label: string;
  detail: string;
  value?: string;
  active?: boolean;
  pulse?: boolean;
}

const ProcessModule: React.FC<ProcessModuleProps> = ({ label, detail, value, active = false, pulse = false }) => (
  <div className={`
    group relative p-5 rounded-2xl border transition-all duration-500 overflow-hidden
    ${active 
      ? 'bg-gradient-to-b from-white to-slate-50 border-white shadow-[0_10px_20px_-10px_rgba(0,0,0,0.1)]' 
      : 'bg-slate-200/50 border-slate-300 opacity-40'}
  `}>
    {/* Inner Bevel */}
    <div className="absolute inset-[1px] rounded-[15px] border border-white/50 pointer-events-none"></div>
    
    <div className="flex items-center justify-between mb-3 relative z-10">
      <span className="font-mono text-[10px] font-black text-forest-black tracking-widest uppercase">{label}</span>
      <div className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-500' : 'bg-slate-300'} ${pulse ? 'animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]' : ''}`}></div>
    </div>
    
    <div className="flex justify-between items-end relative z-10">
      <p className="font-mono text-[9px] text-sage-grey tracking-tight uppercase max-w-[70%]">{detail}</p>
      {value && <span className="font-mono text-[10px] font-bold text-forest-black">{value}</span>}
    </div>

    {/* Module Vent Detail */}
    <div className="absolute bottom-1 right-3 flex gap-0.5 opacity-20 group-hover:opacity-40 transition-opacity">
       {[1,2,3].map(i => <div key={i} className="w-0.5 h-1.5 bg-forest-black rounded-full"></div>)}
    </div>
  </div>
);

export default HeroSection;