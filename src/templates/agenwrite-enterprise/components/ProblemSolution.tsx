import React from 'react';
import { AlertTriangle, Ghost, BarChart3, Network, Ban, Trophy, Search, MessageSquare, FileWarning, RefreshCw, Scan, Fingerprint, X, Check } from 'lucide-react';

interface TechCardProps {
  children: React.ReactNode;
  className?: string;
}

const TechCard: React.FC<TechCardProps> = ({ children, className = '' }) => (
  <div className={`relative bg-white border border-zinc-200 p-8 md:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-200/50 group overflow-hidden ${className}`}>
    {/* Refined Corner Accents - Premium & Subtle */}
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-zinc-200 group-hover:border-zinc-400 transition-colors"></div>
    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-zinc-200 group-hover:border-zinc-400 transition-colors"></div>
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-zinc-200 group-hover:border-zinc-400 transition-colors"></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zinc-200 group-hover:border-zinc-400 transition-colors"></div>
    
    {children}
  </div>
);

export const ProblemSolution: React.FC = () => {
  return (
    <section className="bg-zinc-50 border-b border-zinc-200 relative overflow-hidden">
      {/* Premium Grainy Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(#A1A1AA 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>

      <div className="px-6 md:px-12 py-24 relative z-10 w-full max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
           <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest border border-zinc-200 bg-white px-3 py-1 rounded-full shadow-sm">
                  System Diagnostics
              </span>
              <div className="h-px w-12 bg-zinc-300"></div>
           </div>
           <h2 className="font-serif text-4xl md:text-6xl text-zinc-900 leading-[1.05]">
              Why your current stack <br/> is failing.
           </h2>
        </div>

        {/* BENTO GRID - 3 Columns, 3 Rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            
            {/* --- ROW 1 --- */}

            {/* TILE 1: IDENTITY ERROR (Wide - Span 2) - PREMIUM TEXT COMPARISON */}
            <TechCard className="md:col-span-2 flex flex-col justify-between">
                <div className="flex flex-col md:flex-row gap-8 lg:gap-16 h-full items-start">
                    <div className="flex-1 relative z-10 py-2">
                        <div className="flex items-center gap-2 mb-4 text-red-600 bg-red-50 border border-red-100 px-3 py-1.5 inline-flex rounded-full shadow-sm">
                            <AlertTriangle size={14} />
                            <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Identity Crisis</span>
                        </div>
                        <h3 className="font-serif text-3xl text-zinc-900 mb-4">
                           Your content sounds like <span className="italic text-zinc-400">everyone else.</span>
                        </h3>
                        <p className="text-zinc-600 text-base leading-relaxed max-w-md">
                            Every AI tool writes the same article. Google sees it. ChatGPT sees it. Your brand becomes invisible because nothing you publish has a unique fingerprint.
                        </p>
                    </div>

                    {/* Visual: Premium Document Comparison */}
                    <div className="w-full md:w-[420px] h-[260px] bg-white border border-zinc-200 relative overflow-hidden flex flex-col shadow-sm rounded-xl">
                         
                         {/* Interface Header */}
                         <div className="h-9 bg-zinc-50 border-b border-zinc-200 flex items-center px-4 justify-between z-20">
                            <div className="flex gap-6 text-[9px] font-mono font-bold uppercase tracking-widest">
                                 <div className="flex items-center gap-2 text-zinc-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-300"></div>
                                    Standard LLM
                                 </div>
                                 <div className="flex items-center gap-2 text-zinc-900">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                    AgenWrite
                                 </div>
                            </div>
                         </div>

                         {/* Split Comparison View */}
                         <div className="flex-1 flex relative">
                            
                            {/* Left: Generic AI */}
                            <div className="w-1/2 p-6 border-r border-zinc-100 bg-zinc-50/20 text-zinc-400 font-serif text-[10px] leading-[1.8] italic relative">
                                 <p className="mb-4">
                                    "In the <span className="bg-red-50 text-red-700/60 px-0.5 rounded-[2px] decoration-red-100/50 underline decoration-wavy underline-offset-2">rapidly evolving landscape</span> of digital synergy, it is paramount to <span className="bg-red-50 text-red-700/60 px-0.5 rounded-[2px] decoration-red-100/50 underline decoration-wavy underline-offset-2">delve deep</span> into the transformative potential of..."
                                 </p>
                                 <p>
                                     "...holistic paradigms that <span className="bg-red-50 text-red-700/60 px-0.5 rounded-[2px] decoration-red-100/50 underline decoration-wavy underline-offset-2">revolutionize</span> integration."
                                 </p>
                                 
                                 <div className="absolute bottom-4 left-6 flex items-center gap-1.5 text-red-400/70">
                                     <AlertTriangle size={10} />
                                     <span className="font-mono text-[8px] uppercase tracking-wide font-medium">Generic Pattern</span>
                                 </div>
                            </div>

                            {/* Right: Human Insight */}
                            <div className="w-1/2 p-6 bg-white text-zinc-700 font-sans text-[10px] leading-[1.8] font-medium relative">
                                 <p className="mb-4">
                                     "Our Q3 data from <span className="bg-emerald-50 text-emerald-800 px-0.5 rounded-[2px] border-b border-emerald-100">500+ campaigns</span> shows a clear trend: speed wins."
                                 </p>
                                 <p>
                                     "Unlike the industry standard, we found that <span className="bg-emerald-50 text-emerald-800 px-0.5 rounded-[2px] border-b border-emerald-100">direct implementation</span> outperforms planning by 3x."
                                 </p>

                                 <div className="absolute bottom-4 left-6 flex items-center gap-1.5 text-emerald-600/80">
                                     <Check size={10} strokeWidth={3} />
                                     <span className="font-mono text-[8px] uppercase tracking-wide font-medium">Unique Insight</span>
                                 </div>
                            </div>

                         </div>
                    </div>
                </div>
            </TechCard>

            {/* TILE 2: VISIBILITY ZERO (Tall - Row Span 2) */}
            <TechCard className="md:col-span-1 md:row-span-2 flex flex-col">
                <div className="flex items-center gap-2 mb-6 text-zinc-400 bg-zinc-50 border border-zinc-200 px-3 py-1.5 inline-flex rounded-full w-fit">
                    <Ghost size={14} />
                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Visibility: None</span>
                </div>

                <div className="flex-1 mb-8 flex flex-col justify-end">
                     {/* Visual: Chat Interface (High Fidelity) */}
                     <div className="bg-white border border-zinc-200 shadow-sm p-4 w-full flex flex-col gap-4 rounded-xl relative overflow-hidden h-[280px]">
                        
                        {/* Status Bar */}
                        <div className="flex justify-between items-center border-b border-zinc-100 pb-2 mb-1">
                             <div className="flex gap-1">
                                 <div className="w-2 h-2 rounded-full bg-zinc-200"></div>
                                 <div className="w-2 h-2 rounded-full bg-zinc-200"></div>
                             </div>
                             <span className="text-[9px] font-mono text-zinc-400 uppercase">AI Search V4</span>
                        </div>

                        {/* User Bubble */}
                        <div className="self-end bg-zinc-900 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-md max-w-[85%]">
                            <p className="text-[11px] font-medium leading-relaxed">"Best tools for enterprise seo automation?"</p>
                        </div>

                        {/* AI Bubble */}
                        <div className="self-start w-full mt-2">
                             <div className="flex items-center gap-2 mb-2">
                                <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <MessageSquare size={10} className="text-indigo-600" />
                                </div>
                                <span className="text-[10px] font-bold text-zinc-900">Perplexity</span>
                            </div>
                            <div className="bg-zinc-50 border border-zinc-100 rounded-xl rounded-tl-sm p-4 w-full">
                                <p className="text-[11px] text-zinc-500 mb-3">Here are the top recommended tools based on recent reviews:</p>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between bg-white p-2 rounded-md border border-zinc-200 shadow-sm">
                                        <span className="text-[10px] font-bold text-zinc-700">HubSpot</span>
                                        <span className="text-[9px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded">High Authority</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-white p-2 rounded-md border border-zinc-200 shadow-sm">
                                        <span className="text-[10px] font-bold text-zinc-700">Semrush</span>
                                        <span className="text-[9px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded">Popular</span>
                                    </div>
                                    {/* The Empty Slot */}
                                    <div className="flex items-center justify-between bg-red-50/50 p-2 rounded-md border border-dashed border-red-200 opacity-0 group-hover:opacity-100 transition-all duration-700">
                                        <span className="text-[10px] font-bold text-red-400 italic">Your Brand</span>
                                        <span className="text-[9px] text-red-500 font-bold uppercase">Not Found</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>

                <h3 className="font-serif text-2xl text-zinc-900 mb-3">
                   AI search doesn’t mention you.
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                    You can write 100 blogs, but if ChatGPT, Claude, and Gemini never mention your product, you simply don’t exist.
                </p>
            </TechCard>


            {/* --- ROW 2 --- */}

            {/* TILE 3: NO TRAFFIC (Span 1) */}
            <TechCard className="md:col-span-1">
                 <div className="flex items-center gap-2 mb-4 text-zinc-400 font-mono text-[10px] uppercase tracking-widest font-bold">
                    <BarChart3 size={12} />
                    <span>Metric Failure</span>
                </div>
                <h3 className="font-serif text-xl text-zinc-900 mb-3">
                   Impressions but zero clicks.
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed mb-6">
                    Generic AI tools ignore real opportunities. Wrong topics, wrong intent.
                </p>
                {/* Visual: High-Fi Graph */}
                <div className="h-28 w-full relative border border-zinc-100 bg-zinc-50/50 rounded-lg p-4 overflow-hidden">
                    <div className="absolute inset-0 flex items-end justify-between px-2 pb-2 opacity-20">
                        <div className="w-px h-full bg-zinc-300"></div>
                        <div className="w-px h-full bg-zinc-300"></div>
                        <div className="w-px h-full bg-zinc-300"></div>
                        <div className="w-px h-full bg-zinc-300"></div>
                    </div>
                    {/* SVG Chart */}
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
                        {/* Shadow Path */}
                        <path d="M0,40 Q25,35 50,15 T100,0 V50 H0 Z" fill="url(#grad1)" opacity="0.1" />
                        <path d="M0,40 Q25,35 50,15 T100,0" fill="none" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="4 4" />
                        
                        {/* Flatline Path */}
                        <path d="M0,45 L100,45" fill="none" stroke="#ef4444" strokeWidth="2" className="drop-shadow-sm" />
                        
                        {/* Tooltip */}
                        <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                             <rect x="60" y="30" width="35" height="14" rx="2" fill="#ef4444" />
                             <text x="77.5" y="39" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">0 CLICKS</text>
                             <circle cx="50" cy="45" r="2" fill="white" stroke="#ef4444" strokeWidth="1" />
                        </g>
                        
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#000000" stopOpacity="1" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </TechCard>

            {/* TILE 4: NO PLAN (Span 1) */}
            <TechCard className="md:col-span-1">
                 <div className="flex items-center gap-2 mb-4 text-zinc-400 font-mono text-[10px] uppercase tracking-widest font-bold">
                    <Network size={12} />
                    <span>Strategy Void</span>
                </div>
                <h3 className="font-serif text-xl text-zinc-900 mb-3">
                   Writing without a plan.
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed mb-6">
                    Random blogs don't compound. Competitors win because they publish the right articles.
                </p>
                 {/* Visual: Disconnected Nodes High-Fi */}
                <div className="h-28 relative w-full bg-zinc-50/50 rounded-lg border border-zinc-100 flex items-center justify-center p-4">
                    <div className="flex items-center gap-6 opacity-50 group-hover:opacity-100 transition-opacity">
                         <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-sm">
                                <span className="font-bold text-xs text-zinc-900">A</span>
                            </div>
                            <div className="w-1 h-3 bg-zinc-200"></div>
                         </div>
                         
                         <div className="flex flex-col items-center justify-center">
                             <X size={16} className="text-red-400 mb-1" />
                             <div className="h-px w-10 bg-red-200 border-b border-dashed border-red-400"></div>
                         </div>

                         <div className="flex flex-col items-center gap-2">
                             <div className="w-10 h-10 rounded-full bg-white border border-dashed border-zinc-300 flex items-center justify-center">
                                <span className="font-bold text-xs text-zinc-300">B</span>
                            </div>
                             <div className="w-1 h-3 bg-zinc-200 opacity-30"></div>
                         </div>
                    </div>
                </div>
            </TechCard>


            {/* --- ROW 3 --- */}

            {/* TILE 5: COMPETITORS (Span 2) */}
            <TechCard className="md:col-span-2">
                 <div className="flex flex-col md:flex-row gap-8 h-full justify-between items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-4 text-zinc-400 font-mono text-[10px] uppercase tracking-widest font-bold">
                            <Trophy size={12} />
                            <span>Rank Deficit</span>
                        </div>
                        <h3 className="font-serif text-2xl text-zinc-900 mb-3">
                        Competitors own your keyword.
                        </h3>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-6 max-w-sm">
                            Your product solves a real problem, but they dominate the search. You stay on page 3 forever.
                        </p>
                    </div>

                    {/* Visual: Market Share Bar (Detailed) */}
                    <div className="w-full md:w-80 bg-white border border-zinc-200 p-6 shadow-sm rounded-lg flex flex-col justify-center gap-5 relative">
                         
                        {/* Competitor Bar - Expands */}
                        <div className="w-full">
                            <div className="flex justify-between text-[10px] font-bold text-zinc-900 mb-2">
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-zinc-800"></span>
                                    Competitor Corp
                                </span>
                                <span>85% Share</span>
                            </div>
                            <div className="h-8 bg-zinc-100 w-full rounded-md overflow-hidden relative border border-zinc-200">
                                <div className="absolute top-0 left-0 h-full bg-zinc-800 w-[60%] group-hover:w-[85%] transition-all duration-1000 flex items-center overflow-hidden">
                                     <div className="w-full h-full opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, #fff 5px, #fff 6px)' }}></div>
                                </div>
                            </div>
                        </div>

                         {/* Your Bar - Shrinks */}
                        <div className="w-full">
                            <div className="flex justify-between text-[10px] font-medium text-zinc-500 mb-2">
                                <span className="flex items-center gap-2">
                                     <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                     You
                                </span>
                                <span className="text-red-500 font-bold">1% Share</span>
                            </div>
                             <div className="h-8 bg-zinc-50 w-full rounded-md border border-zinc-200 overflow-hidden relative">
                                <div className="absolute top-0 left-0 h-full bg-red-100 w-[30%] group-hover:w-[1%] transition-all duration-1000"></div>
                            </div>
                        </div>

                    </div>
                 </div>
            </TechCard>

             {/* TILE 6: BLOATWARE (Span 1) */}
             <TechCard className="md:col-span-1">
                 <div className="flex items-center gap-2 mb-4 text-zinc-400 font-mono text-[10px] uppercase tracking-widest font-bold">
                    <Ban size={12} />
                    <span>Bloatware</span>
                </div>
                <h3 className="font-serif text-xl text-zinc-900 mb-3">
                   'Content', not growth.
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed mb-6">
                    One-click tools generate noise, not results. Just trash that hurts your authority.
                </p>
                 {/* Visual: Detailed Machine */}
                <div className="h-28 flex items-center justify-between px-4 bg-zinc-50 border border-zinc-200 rounded-lg relative overflow-hidden">
                    {/* Machine */}
                    <div className="z-10 flex flex-col items-center">
                        <div className="p-3 bg-white border border-zinc-300 rounded-full shadow-sm relative">
                            <RefreshCw size={18} className="text-zinc-600 animate-spin" style={{ animationDuration: '3s' }} />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                    </div>

                    {/* Paper Trail */}
                    <div className="flex-1 h-px bg-zinc-300 mx-3 relative overflow-visible">
                         <div className="absolute w-4 h-5 bg-white border border-zinc-300 shadow-sm top-[-10px] left-0 animate-[moveRight_1.5s_linear_infinite] flex items-center justify-center">
                             <div className="w-2 h-px bg-zinc-200"></div>
                         </div>
                    </div>

                    {/* Bin */}
                    <div className="z-10 flex flex-col items-center">
                         <div className="w-8 h-10 border-2 border-zinc-300 border-t-0 rounded-b-md bg-zinc-200/50 flex items-end justify-center pb-1">
                            <div className="w-4 h-1 bg-zinc-400 rounded-full"></div>
                         </div>
                         <span className="text-[8px] font-bold text-zinc-400 mt-1 uppercase">Bin</span>
                    </div>
                </div>
            </TechCard>

        </div>
      </div>
      
      {/* Inline Styles for Keyframes */}
      <style>{`
        @keyframes scanDown {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 120%; opacity: 0; }
        }
        @keyframes moveRight {
            0% { left: 0; opacity: 1; transform: rotate(0deg) scale(0.8); }
            50% { transform: rotate(5deg) scale(0.8); }
            100% { left: 80%; opacity: 0; transform: rotate(45deg) scale(0.5); }
        }
        @keyframes draw {
            to { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
};