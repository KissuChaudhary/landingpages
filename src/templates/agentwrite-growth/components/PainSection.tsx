import React from 'react';
import { AlertTriangle, Copy, Search, MousePointer2, Map, TrendingDown, X } from 'lucide-react';

const PainSection: React.FC = () => {
  return (
    <section className="w-full bg-white border-y-2 border-black py-24 px-4 md:px-8 flex flex-col items-center relative">
      <style>{`
        @keyframes scan-vertical {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(140px); opacity: 0; }
        }
        .animate-scan-vertical {
          animation: scan-vertical 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
      
      <div className="max-w-[1300px] w-full">
        
        {/* Header - Clean & Direct */}
        <div className="mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-black bg-red-50 text-red-600 px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6">
            <AlertTriangle size={14} />
            Diagnostic Report
          </div>
          <h2 className="font-serif-display text-5xl md:text-6xl font-bold leading-[0.95] mb-6 text-black tracking-tight">
            Your content strategy <br />
            is <span className="italic text-gray-400">invisible.</span>
          </h2>
          <p className="font-sans-tech text-lg text-gray-600 max-w-2xl">
            Founders are publishing into a void. Here is the forensic analysis of why your current AI writing stack is failing.
          </p>
        </div>

        {/* 5-TILE CLEAN BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">

          {/* TILE 1: Sameness - Span 7 */}
          <div className="md:col-span-7 bg-white border-2 border-black p-8 md:p-10 flex flex-col justify-between hover:bg-gray-50 transition-colors duration-300">
             <div className="flex justify-between items-start mb-6">
               <div className="w-10 h-10 bg-black text-white flex items-center justify-center">
                 <Copy size={20} />
               </div>
             </div>
             
             <h3 className="font-bold text-2xl mb-4 font-serif-display">Your content sounds like everyone else</h3>
             <p className="text-gray-600 text-sm leading-relaxed max-w-lg font-medium mb-8">
               Every AI tool writes the same article. Google sees it. ChatGPT sees it. Users feel it in 3 seconds. Your brand becomes invisible because nothing you publish has a real “you” in it.
             </p>

             {/* Visual: Homogeneity Scan */}
             <div className="w-full bg-gray-100 border border-gray-200 h-24 flex items-center justify-center gap-1 overflow-hidden relative">
                {/* A sea of identical gray blocks */}
                {[...Array(12)].map((_, i) => (
                   <div key={i} className="w-8 h-12 bg-gray-300 rounded-sm opacity-50"></div>
                ))}
                {/* The "You" block is missing/same */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="bg-white px-3 py-1 text-[10px] font-bold border border-black shadow-sm uppercase">
                      0% Differentiation
                   </div>
                </div>
             </div>
          </div>

          {/* TILE 2: AI Search Invisibility - Span 5 */}
          <div className="md:col-span-5 bg-white border-2 border-black p-8 md:p-10 flex flex-col justify-between hover:bg-gray-50 transition-colors duration-300">
             <div>
               <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                 <Search size={20} className="text-black" />
               </div>
               <h3 className="font-bold text-2xl mb-4 font-serif-display">AI search doesn’t mention you at all</h3>
               <p className="text-gray-600 text-sm leading-relaxed font-medium mb-8">
                 You can write 100 blogs but if ChatGPT, Claude, Gemini never mention your product… you don’t exist.
               </p>
             </div>
             
             {/* Visual: Diagnostic Scanner (New Modern Design) */}
             <div className="relative w-full h-32 bg-[#FAFAFA] border border-black/10 flex flex-col items-center justify-center overflow-hidden">
                
                {/* Technical Grid Background */}
                <div className="absolute inset-0 z-0 opacity-[0.07]" 
                     style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
                </div>

                {/* Status Badge */}
                <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 bg-white border border-gray-200 shadow-sm z-20">
                   <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                   <span className="text-[7px] font-bold tracking-widest uppercase text-gray-500">Indexing Error</span>
                </div>

                {/* Content Container - The "Index" */}
                <div className="relative z-10 w-3/4 flex flex-col gap-2.5">
                  
                  {/* Competitor 1: High Visibility */}
                  <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-black shadow-[0_0_4px_rgba(0,0,0,0.3)]"></div>
                     <div className="h-2 flex-grow bg-gray-800 rounded-sm shadow-sm"></div>
                     <div className="text-[7px] font-mono font-bold text-gray-400">REF_01</div>
                  </div>

                  {/* Competitor 2: High Visibility */}
                  <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-black shadow-[0_0_4px_rgba(0,0,0,0.3)]"></div>
                     <div className="h-2 w-[85%] bg-gray-600 rounded-sm shadow-sm"></div>
                     <div className="text-[7px] font-mono font-bold text-gray-400">REF_02</div>
                  </div>

                  {/* You: The Void / Glitch */}
                  <div className="flex items-center gap-3 mt-1">
                     <div className="w-1.5 h-1.5 rounded-full border border-red-500 bg-transparent"></div>
                     <div className="h-6 flex-grow border border-dashed border-red-300 bg-red-50/30 rounded-sm flex items-center justify-center relative overflow-hidden">
                        {/* Internal Scan Glitch */}
                        <div className="absolute inset-0 bg-red-100/30 animate-pulse"></div>
                        <span className="relative z-10 text-[8px] font-bold text-red-500 tracking-[0.2em] uppercase">Not Found</span>
                     </div>
                     <div className="text-[7px] font-mono font-bold text-red-500">ERR_404</div>
                  </div>

                </div>

                {/* Scanning Bar Animation (The "AI Eye") */}
                <div className="absolute top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-black/10 to-transparent animate-scan-vertical z-20 pointer-events-none"></div>
             </div>
          </div>

          {/* TILE 3: Zero Clicks - Span 4 */}
          <div className="md:col-span-4 bg-white border-2 border-black p-8 flex flex-col justify-between hover:bg-gray-50 transition-colors duration-300">
             <div>
                <div className="mb-6 opacity-40">
                   <MousePointer2 size={24} />
                </div>
                <h3 className="font-bold text-xl mb-4 font-serif-display">Google impressions but zero clicks</h3>
                <p className="text-gray-600 text-xs leading-relaxed font-medium mb-6">
                   You are almost ranking… but never actually getting traffic. Wrong topics. Wrong angles. Wrong search intent.
                </p>
             </div>

             {/* Visual: Data Table */}
             <div className="mt-auto border-t border-gray-200 pt-4">
                <div className="flex justify-between items-end mb-2">
                   <span className="text-[10px] uppercase font-bold text-gray-400">Impressions</span>
                   <span className="text-lg font-mono font-bold text-gray-400">12,405</span>
                </div>
                <div className="flex justify-between items-end">
                   <span className="text-[10px] uppercase font-bold text-red-600">Clicks</span>
                   <span className="text-3xl font-mono font-bold text-red-600">0</span>
                </div>
             </div>
          </div>

          {/* TILE 4: No Plan - Span 4 */}
          <div className="md:col-span-4 bg-white border-2 border-black p-8 flex flex-col justify-between hover:bg-gray-50 transition-colors duration-300">
             <div>
                <div className="mb-6 opacity-40">
                   <Map size={24} />
                </div>
                <h3 className="font-bold text-xl mb-4 font-serif-display">Writing without a plan = wasted months</h3>
                <p className="text-gray-600 text-xs leading-relaxed font-medium mb-6">
                   You publish random blogs. Your keyword strategy doesn’t compound. You never build topical authority.
                </p>
             </div>

             {/* Visual: Scatter Plot */}
             <div className="h-16 w-full border-l border-b border-gray-300 relative">
                {/* Random dots representing no strategy */}
                <div className="absolute left-[10%] top-[40%] w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                <div className="absolute left-[30%] top-[70%] w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                <div className="absolute left-[60%] top-[20%] w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                <div className="absolute left-[80%] top-[60%] w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                <div className="absolute bottom-[-15px] left-0 w-full text-center text-[8px] uppercase font-bold text-gray-400">
                   No Topical Authority
                </div>
             </div>
          </div>

          {/* TILE 5: Content vs Growth - Span 4 */}
          <div className="md:col-span-4 bg-white border-2 border-black p-8 flex flex-col justify-between hover:bg-gray-50 transition-colors duration-300">
             <div>
                <div className="mb-6 opacity-40">
                   <TrendingDown size={24} />
                </div>
                <h3 className="font-bold text-xl mb-4 font-serif-display">One-click AI tools give you ‘content’, not growth</h3>
                <p className="text-gray-600 text-xs leading-relaxed font-medium mb-6">
                   These tools generate articles. They don’t generate results. No research. No brand voice. Just noise.
                </p>
             </div>

             {/* Visual: Volume vs ROI */}
             <div className="flex items-end gap-4 h-16 border-b border-gray-200 pb-1">
                <div className="flex-1 flex flex-col justify-end h-full">
                   <div className="w-full bg-gray-200 h-[90%] relative group">
                      <span className="absolute -top-4 left-0 text-[8px] font-bold text-gray-400">CONTENT</span>
                   </div>
                </div>
                <div className="flex-1 flex flex-col justify-end h-full">
                   <div className="w-full bg-red-100 h-[10%] relative border-t-2 border-red-500">
                      <span className="absolute -top-4 left-0 text-[8px] font-bold text-red-500">RESULTS</span>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PainSection;