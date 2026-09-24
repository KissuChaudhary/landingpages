import React from 'react';
import { 
  BarChart3,
  Search,
  GitCommit,
  Sparkles,
  Check,
  ArrowRight,
  ChevronRight,
  MoreHorizontal,
  Zap,
  AlertCircle,
  TrendingUp,
  Files
} from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  return (
    <section className="w-full px-4 relative z-10 py-12 sm:py-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <h2 className="text-4xl sm:text-6xl font-extrabold text-stone-900 tracking-tight mb-6">
            We write for Humans and <br/> Modern AI Search.
          </h2>
          <p className="text-lg sm:text-xl text-stone-500 max-w-2xl mx-auto">
            FlipAEO doesn't just write articles. We reverse-engineer how AI models think to put your brand inside the answer.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1: Visibility/Gaps - UI: Keyword Opportunity Table */}
          <div className="group flex flex-col h-full bg-[#f0fff9] border border-[#9eedcdb8] rounded-[2.5rem] p-2 hover:shadow-lg transition-shadow duration-500 overflow-hidden">
            <div className="px-6 pt-6 pb-8 relative z-10">
              <h3 className="font-semibold text-stone-900 text-xl leading-tight mb-3">CLEAR VISIBILITY INTO WHERE YOU NEED TO WIN</h3>
              <p className="text-stone-500 text-[15px] leading-relaxed font-normal">
                We analyze how AI search engines answer questions in your category and build the strategy to fill the gaps where your brand is missing.
              </p>
            </div>
            
            <div className="bg-white rounded-[2rem] border border-[#9eedcdb8]/30 relative h-[320px] sm:h-[400px] overflow-hidden bg-stone-50/30 flex items-center justify-center">
               
               {/* UI Mockup: Data Table */}
               <div className="w-[85%] max-w-[380px] bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                  {/* Table Header */}
                  <div className="px-4 py-3 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                     <div className="flex gap-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                        <span className="w-24">Topic</span>
                        <span className="w-16">Volume</span>
                        <span>Authority Status</span>
                     </div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-stone-100 text-sm">
                     {/* Row 1: Competitor Owned */}
                     <div className="px-4 py-3.5 flex items-center justify-between group/row hover:bg-stone-50 transition-colors">
                        <div className="flex items-center gap-3 w-24 shrink-0">
                           <span className="text-stone-600 font-medium truncate">Enterprise SEO</span>
                        </div>
                        <div className="w-16 text-stone-400 text-xs shrink-0">12.5k</div>
                        <div className="flex items-center gap-2 flex-1 justify-end">
                           <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                              <span className="text-[9px] font-bold">C</span>
                           </div>
                           <span className="text-[11px] text-stone-400">Competitor</span>
                        </div>
                     </div>

                     {/* Row 2: Competitor Owned */}
                     <div className="px-4 py-3.5 flex items-center justify-between group/row hover:bg-stone-50 transition-colors">
                        <div className="flex items-center gap-3 w-24 shrink-0">
                           <span className="text-stone-600 font-medium truncate">Programmatic</span>
                        </div>
                        <div className="w-16 text-stone-400 text-xs shrink-0">8.2k</div>
                        <div className="flex items-center gap-2 flex-1 justify-end">
                           <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                              <span className="text-[9px] font-bold">C</span>
                           </div>
                           <span className="text-[11px] text-stone-400">Competitor</span>
                        </div>
                     </div>

                     {/* Row 3: THE OPPORTUNITY (Hero) */}
                     <div className="px-4 py-4 flex items-center justify-between bg-[#f0fff9] relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#9eedcdb8]"></div>
                        <div className="flex items-center gap-3 w-24 shrink-0 relative z-10">
                           <span className="text-stone-900 font-bold truncate">AI Strategy</span>
                        </div>
                        <div className="w-16 text-stone-500 text-xs font-medium shrink-0 relative z-10">22.4k</div>
                        <div className="flex items-center gap-2 flex-1 justify-end relative z-10">
                           <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#9eedcdb8] text-white tracking-wide shadow-sm">
                              UNCLAIMED GAP
                           </span>
                        </div>
                     </div>

                     {/* Row 4: Another Opp */}
                     <div className="px-4 py-3.5 flex items-center justify-between group/row hover:bg-stone-50 transition-colors opacity-60">
                        <div className="flex items-center gap-3 w-24 shrink-0">
                           <span className="text-stone-600 font-medium truncate">LLM Optimization</span>
                        </div>
                        <div className="w-16 text-stone-400 text-xs shrink-0">4.1k</div>
                        <div className="flex items-center gap-2 flex-1 justify-end">
                             <div className="w-2 h-2 rounded-full bg-[#9eedcdb8]"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Card 2: Competitor Exploitation - UI: Audit Scanner */}
          <div className="group flex flex-col h-full bg-[#f0fff9] border border-[#9eedcdb8] rounded-[2.5rem] p-2 hover:shadow-lg transition-shadow duration-500 overflow-hidden">
            <div className="px-6 pt-6 pb-8 relative z-10">
              <h3 className="font-semibold text-stone-900 text-xl leading-tight mb-3">WE ANALYZE YOUR COMPETITORS AND EXPLOIT THEM</h3>
              <p className="text-stone-500 text-[15px] leading-relaxed font-normal">
               Your competitors aren’t winning by publishing more. They’re winning by answering better questions. We exploit their content gaps.
              </p>
            </div>
            
            <div className="bg-white rounded-[2rem] border border-[#5d686]/30 relative h-[320px] sm:h-[400px] flex items-center justify-center bg-stone-50/30 overflow-hidden">
               
               {/* UI Mockup: Scanner Card */}
               <div className="w-[85%] max-w-[360px] bg-white rounded-xl shadow-sm border border-stone-200 p-6 relative">
                  
                  {/* URL Bar */}
                  <div className="flex items-center gap-3 bg-stone-50 rounded-lg p-2 border border-stone-100 mb-6">
                     <div className="w-6 h-6 bg-white rounded border border-stone-200 flex items-center justify-center">
                        <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" className="w-3 h-3 opacity-50 grayscale" alt="" />
                     </div>
                     <div className="flex-1 text-xs text-stone-400 font-mono truncate">
                        competitor.com/blog/ai-marketing-guide
                     </div>
                     <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
                  </div>

                  {/* Analysis Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                     <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                           <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                           <span className="text-[10px] font-bold text-red-600 uppercase">Weakness</span>
                        </div>
                        <div className="text-sm font-bold text-stone-900">Generic Content</div>
                        <div className="text-[10px] text-stone-500 leading-tight mt-1">
                           Detected 85% likely AI-generated text.
                        </div>
                     </div>
                     
                     <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                           <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                           <span className="text-[10px] font-bold text-red-600 uppercase">Missing</span>
                        </div>
                        <div className="text-sm font-bold text-stone-900">Zero Data</div>
                        <div className="text-[10px] text-stone-500 leading-tight mt-1">
                           No original research or citations found.
                        </div>
                     </div>
                  </div>

                  {/* Action Button */}
                  <div className="w-full py-2.5 bg-stone-900 rounded-lg flex items-center justify-center gap-2 text-white shadow-lg shadow-stone-900/10 cursor-pointer hover:bg-black transition-colors">
                     <Zap className="w-3.5 h-3.5 fill-current" />
                     <span className="text-xs font-bold uppercase tracking-wide">Generate Superior Asset</span>
                  </div>

               </div>
            </div>
          </div>

          {/* Card 3: Authority Strategy - UI: Node Graph (Exact Screenshot Match) */}
          <div className="group flex flex-col h-full bg-[#f0fff9] border border-[#9eedcdb8] rounded-[2.5rem] p-2 hover:shadow-lg transition-shadow duration-500 overflow-hidden">
            <div className="px-6 pt-6 pb-8 relative z-10">
              <h3 className="font-semibold text-stone-900 text-xl leading-tight mb-3">AUTHORITY-BUILDING CONTENT STRATEGY</h3>
              <p className="text-stone-500 text-[15px] leading-relaxed font-normal">
                Every article is part of a connected system. Topics are ordered intentionally to compound trust. Nothing random.
              </p>
            </div>
            
            {/* Visual Container - Dot Grid Background */}
            <div className="bg-white rounded-[2rem] border border-[#9eedcdb8]/30 relative h-[320px] sm:h-[400px] overflow-hidden">
               {/* Dot Pattern */}
               <div className="absolute inset-0" 
                    style={{
                      backgroundImage: 'radial-gradient(#e5e7eb 1.5px, transparent 1.5px)',
                      backgroundSize: '24px 24px'
                    }}>
               </div>
               
               {/* Graph Container */}
               <div className="absolute inset-0 flex items-center justify-center">
                   
                   {/* Connections (SVG Lines) */}
                   <svg className="absolute w-full h-full overflow-visible pointer-events-none z-0">
                       {/* Line to Cluster A (Top Right) */}
                       <path 
                          d="M50% 50% Q 70% 50% 70% 35%" 
                          fill="none" 
                          stroke="#e7e5e4" 
                          strokeWidth="2" 
                       />
                       {/* Line to Cluster B (Bottom Right) */}
                       <path 
                          d="M50% 50% Q 65% 50% 65% 75%" 
                          fill="none" 
                          stroke="#e7e5e4" 
                          strokeWidth="2"
                          strokeDasharray="4 4"
                       />
                   </svg>

                   {/* Elements Wrapper to allow absolute positioning relative to center */}
                   <div className="relative w-full h-full">
                       
                       {/* Cluster A (Top Right) */}
                       <div className="absolute top-[28%] right-[15%] bg-white border border-[#9eedcdb8] rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm z-10 transform transition-transform hover:scale-105 cursor-default">
                          <div className="w-2 h-2 rounded-full bg-[#9eedcdb8]"></div>
                          <span className="text-sm font-bold text-stone-900">Cluster A</span>
                       </div>

                       {/* Central Pillar Node */}
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                          <div className="bg-[#1c1917] rounded-xl px-6 py-4 shadow-xl shadow-stone-900/20 flex items-center gap-4 min-w-[240px]">
                             {/* Icon Left */}
                             <div className="text-stone-400">
                                <GitCommit className="w-5 h-5 rotate-90" />
                             </div>
                             
                             {/* Text Content */}
                             <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-0.5">Pillar Page</span>
                                <span className="text-lg font-bold text-white">AI Strategy</span>
                             </div>

                             {/* Connection Point Right */}
                             <div className="ml-auto relative flex items-center">
                                <div className="w-3 h-3 rounded-full bg-[#9eedcdb8] ring-4 ring-[#1c1917]"></div>
                             </div>
                          </div>
                       </div>

                       {/* Cluster B (Bottom Right) */}
                       <div className="absolute bottom-[18%] right-[25%] bg-white border border-[#9eedcdb8] rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm z-10 transform transition-transform hover:scale-105 cursor-default">
                          <div className="w-2 h-2 rounded-full bg-[#9eedcdb8]"></div>
                          <span className="text-sm font-bold text-stone-900">Cluster B</span>
                       </div>

                       {/* Percentage Badge (Bottom Corner) */}
                       <div className="absolute bottom-6 right-6 bg-white border border-stone-200 rounded-full px-4 py-1.5 shadow-sm">
                          <span className="text-xs font-mono text-stone-500">100% Coverage</span>
                       </div>

                   </div>
               </div>
            </div>
          </div>

          {/* Card 4: Answer Quality - UI: The Perfect Answer Structure */}
          <div className="group flex flex-col h-full bg-[#f0fff9] border border-[#9eedcdb8] rounded-[2.5rem] p-2 hover:shadow-lg transition-shadow duration-500 overflow-hidden">
            <div className="px-6 pt-6 pb-8 relative z-10">
              <h3 className="font-semibold text-stone-900 text-xl leading-tight mb-3">ARTICLES THAT ACTUALLY ANSWER QUESTIONS</h3>
              <p className="text-stone-500 text-[15px] leading-relaxed font-normal">
                Most AI content reads like a Wikipedia summary. Ours explains. Built to resolve real user questions with clarity humans trust.
              </p>
            </div>
            
            <div className="bg-white rounded-[2rem] border border-[#9eedcdb8]/30 relative h-[320px] sm:h-[400px] overflow-hidden bg-stone-50/30 flex items-center justify-center">
               
               {/* UI Mockup: Answer Component */}
               <div className="w-[85%] max-w-[360px] bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                  
                  {/* Fake Browser Top */}
                  <div className="h-2 bg-[#9eedcdb8] w-full"></div>
                  
                  <div className="p-5">
                     {/* Query */}
                     <div className="flex items-start gap-3 mb-5">
                        <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                           <span className="text-xs font-bold text-stone-500">Q</span>
                        </div>
                        <div className="bg-stone-50 rounded-lg rounded-tl-none px-3 py-2 text-sm font-medium text-stone-700 w-full">
                           How do I optimize for GEO?
                        </div>
                     </div>

                     {/* Answer Block */}
                     <div className="relative pl-4 border-l-2 border-[#9eedcdb8]">
                        <div className="flex items-center gap-2 mb-2">
                           <Sparkles className="w-3.5 h-3.5 text-[#9eedcdb8] fill-current" />
                           <span className="text-[10px] font-bold text-[#9eedcdb8] uppercase tracking-wide">Optimized Answer</span>
                        </div>
                        
                        <div className="space-y-2">
                           {/* Skeleton Text representing structured answer */}
                           <div className="h-2.5 w-full bg-stone-100 rounded"></div>
                           <div className="h-2.5 w-[92%] bg-stone-100 rounded"></div>
                           <div className="h-2.5 w-[98%] bg-stone-100 rounded"></div>
                        </div>

                        {/* Citations / Sources */}
                        <div className="mt-4 flex gap-2">
                           <div className="px-2 py-1 bg-stone-50 border border-stone-100 rounded text-[10px] font-medium text-stone-500 flex items-center gap-1">
                              <Files className="w-3 h-3" />
                              Data Source A
                           </div>
                           <div className="px-2 py-1 bg-stone-50 border border-stone-100 rounded text-[10px] font-medium text-stone-500 flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              Trend Data
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Trust Signal Footer */}
                  <div className="bg-[#f0fff9] border-t border-[#9eedcdb8]/10 px-5 py-3 flex items-center justify-between">
                     <span className="text-[10px] font-bold text-stone-400 uppercase">Citation Probability</span>
                     <span className="text-xs font-bold text-[#9eedcdb8]">High (92%)</span>
                  </div>
               </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
