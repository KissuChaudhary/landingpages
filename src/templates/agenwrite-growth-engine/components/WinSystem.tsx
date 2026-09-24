import React from 'react';
import { Search, Sliders, Check, FileText, BarChart, ArrowRight, Zap, TrendingUp, ShieldCheck, Quote, Link, Lock, Calendar, MousePointer2, AlertCircle } from 'lucide-react';

export const WinSystem: React.FC = () => {
  return (
    <section className="w-full px-4 relative z-10 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-24 sm:mb-32">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-stone-200 bg-white shadow-sm mb-6">
             <span className="w-1.5 h-1.5 rounded-full bg-stone-900"></span>
             <span className="text-[11px] font-bold text-stone-900 uppercase tracking-widest">The Engine</span>
          </div>
          <h2 className="text-5xl sm:text-7xl font-extrabold text-stone-900 tracking-tighter mb-8 leading-[0.95]">
            HOW WE MAKE YOU <br />
            <span className="text-stone-400">WIN MODERN AI SEARCH</span>
          </h2>
          <p className="text-xl text-stone-500 max-w-2xl leading-relaxed">
            A focused system that removes guesswork. Every feature exists to answer one question: "What needs to exist for this brand to be the authority?"
          </p>
        </div>

        <div className="flex flex-col gap-32">

          {/* FEATURE 01: INTELLIGENCE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            {/* Text Side */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-stone-200 text-stone-900 text-sm font-bold shadow-sm">01</span>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Category Intelligence</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6 tracking-tight">
                We Find The "Information Void"
              </h3>
              <p className="text-lg text-stone-600 leading-relaxed mb-8">
                Most brands write what everyone else is writing. We analyze the search landscape to find the specific questions your competitors have failed to answer properly.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Competitor Gap Analysis",
                  "User Intent Mapping",
                  "Opportunity Scoring"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-stone-800">
                    <div className="w-5 h-5 rounded-full bg-stone-200 flex items-center justify-center">
                      <Check className="w-3 h-3 text-stone-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* UI Side */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative rounded-[2.5rem] bg-stone-200/50 p-3 border border-stone-200/50 backdrop-blur-sm shadow-stone-900/5 group hover:border-stone-300 transition-colors duration-500">
                 
                 {/* Inner Mockup Container */}
                 <div className="bg-stone-50 rounded-[2rem] overflow-hidden relative min-h-[400px] flex items-center justify-center p-8 border border-stone-100">
                    
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 z-0 opacity-[0.03]" 
                         style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                    </div>

                    {/* MOCKUP: Topic Analysis List (Clear, No Floating Badges) */}
                    <div className="relative w-full max-w-[340px]">
                        <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-stone-200 overflow-hidden">
                            
                            {/* Header */}
                            <div className="px-5 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Topic Analysis</span>
                                <div className="flex gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-stone-300"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-stone-300"></div>
                                </div>
                            </div>
                            
                            {/* List Content */}
                            <div className="p-3 space-y-1">
                                {/* Saturated Item 1 */}
                                <div className="flex items-center justify-between p-3 rounded-lg opacity-50">
                                    <span className="text-sm font-medium text-stone-600">"Best AI Tools"</span>
                                    <div className="px-2 py-1 bg-stone-100 rounded text-[10px] font-bold text-stone-400">
                                        Saturated
                                    </div>
                                </div>

                                {/* THE VOID (High Contrast Card) */}
                                <div className="bg-stone-900 rounded-xl p-5 shadow-xl shadow-stone-900/10 relative overflow-hidden group my-2">
                                    {/* Subtle internal glow */}
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent-500/10 rounded-full blur-2xl -translate-y-12 translate-x-12"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-5">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Opportunity Found</span>
                                                <span className="text-sm font-bold text-white leading-tight">"Strategic AI Workflows"</span>
                                            </div>
                                            <div className="w-6 h-6 rounded-full bg-accent-600 flex items-center justify-center shrink-0 shadow-lg shadow-accent-600/20">
                                                <Zap className="w-3.5 h-3.5 text-white fill-current" />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {/* Demand Metric */}
                                            <div>
                                                <div className="flex justify-between text-[10px] mb-1.5">
                                                    <span className="text-stone-400 font-medium">Search Volume</span>
                                                    <span className="text-white font-bold">High</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-stone-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-white w-[90%]"></div>
                                                </div>
                                            </div>

                                            {/* Supply Metric (The Void) */}
                                            <div>
                                                <div className="flex justify-between text-[10px] mb-1.5">
                                                    <span className="text-stone-400 font-medium">Competitor Answers</span>
                                                    <span className="text-accent-500 font-bold">Zero Found</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-stone-800 rounded-full overflow-hidden">
                                                    {/* Empty bar visualizes the void */}
                                                    <div className="h-full bg-stone-800 w-0"></div> 
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse"></div>
                                            <span className="text-[10px] font-medium text-stone-400 uppercase tracking-wide">Information Void Detected</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Saturated Item 2 */}
                                <div className="flex items-center justify-between p-3 rounded-lg opacity-50">
                                    <span className="text-sm font-medium text-stone-600">"What is LLM?"</span>
                                    <div className="px-2 py-1 bg-stone-100 rounded text-[10px] font-bold text-stone-400">
                                        Saturated
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                 </div>
              </div>
            </div>
          </div>

          {/* FEATURE 02: BRAND VOICE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
             {/* UI Side (Left on Desktop) */}
             <div className="lg:col-span-7 order-1">
              <div className="relative rounded-[2.5rem] bg-white border border-stone-200 p-3 shadow-xl shadow-stone-900/5 group hover:border-stone-300 transition-colors duration-500">
                
                {/* Inner Mockup Container */}
                <div className="bg-stone-50 rounded-[2rem] overflow-hidden relative min-h-[400px] flex items-center justify-center p-8 border border-stone-100">
                  
                  {/* MOCKUP: Voice Settings Panel */}
                  <div className="relative w-full max-w-[320px]">
                     
                     {/* Background Card */}
                     <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-stone-200 p-1">
                        <div className="bg-stone-50/50 rounded-xl p-5 border border-stone-100/50">
                            
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center text-white">
                                    <Sliders className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-bold text-stone-900 uppercase tracking-widest">Voice DNA</span>
                            </div>

                            <div className="space-y-4">
                                {/* Toggle Row 1 */}
                                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                                    <span className="text-xs font-semibold text-stone-700">Sentence Variance</span>
                                    <div className="w-9 h-5 bg-stone-900 rounded-full relative cursor-pointer">
                                        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                    </div>
                                </div>
                                {/* Toggle Row 2 */}
                                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                                    <span className="text-xs font-semibold text-stone-700">Jargon Filter</span>
                                    <div className="w-9 h-5 bg-stone-900 rounded-full relative cursor-pointer">
                                        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                    </div>
                                </div>
                                {/* Toggle Row 3 */}
                                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-stone-200 shadow-sm opacity-50">
                                    <span className="text-xs font-semibold text-stone-500">Emoji Usage</span>
                                    <div className="w-9 h-5 bg-stone-200 rounded-full relative cursor-pointer">
                                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                     </div>

                     {/* Floating "Matched" Bubble */}
                     <div className="absolute -top-4 -right-2 bg-white px-4 py-2 rounded-xl border border-stone-200 shadow-xl flex items-center gap-3">
                         <div className="relative">
                            <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 overflow-hidden">
                                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" alt="User" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                <Check className="w-2 h-2 text-white stroke-[3]" />
                            </div>
                         </div>
                         <div className="flex flex-col">
                             <span className="text-[9px] font-bold text-stone-400 uppercase">Analysis</span>
                             <span className="text-xs font-bold text-stone-900">100% Match</span>
                         </div>
                     </div>

                  </div>

                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="lg:col-span-5 order-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-stone-200 text-stone-900 text-sm font-bold shadow-sm">02</span>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Consistency Engine</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6 tracking-tight">
                Your Brand Voice, Locked In.
              </h3>
              <p className="text-lg text-stone-600 leading-relaxed mb-8">
                No generic AI fluff. We extract your brand's unique "DNA"—sentence structure, vocabulary, and pacing—so every article sounds exactly like your best writer.
              </p>

              <ul className="space-y-4">
                {[
                   "Style & Tone Extraction",
                   "Vocabulary Whitelisting",
                   "Formatting Consistency"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-stone-800">
                    <div className="w-5 h-5 rounded-full bg-stone-200 flex items-center justify-center">
                      <Check className="w-3 h-3 text-stone-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FEATURE 03: RESEARCH */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            {/* Text Side */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-stone-200 text-stone-900 text-sm font-bold shadow-sm">03</span>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Deep Research</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6 tracking-tight">
                Fact-Checked, Not Hallucinated.
              </h3>
              <p className="text-lg text-stone-600 leading-relaxed mb-8">
                We don't just summarize the top 3 results. Our agents hunt for primary sources, statistics, and expert quotes to build arguments that AI models (and humans) trust.
              </p>

              <ul className="space-y-4">
                {[
                   "Primary Source Verification",
                   "Data & Statistic Hunting",
                   "Live Citation Management"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-stone-800">
                    <div className="w-5 h-5 rounded-full bg-stone-200 flex items-center justify-center">
                      <Check className="w-3 h-3 text-stone-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* UI Side */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative rounded-[2.5rem] bg-white border border-stone-200 p-3 shadow-xl shadow-stone-900/5 group hover:border-stone-300 transition-colors duration-500">
                
                {/* Inner Mockup Container */}
                <div className="bg-stone-50 rounded-[2rem] overflow-hidden relative min-h-[400px] flex items-center justify-center p-8 border border-stone-100">
                   
                   {/* MOCKUP: Connected Claims */}
                   <div className="relative w-full max-w-sm flex flex-col items-center">
                      
                      {/* Central Statement Card */}
                      <div className="relative z-10 bg-white rounded-xl shadow-lg border border-stone-200 p-5 w-full">
                          <div className="flex items-start gap-3">
                              <Quote className="w-5 h-5 text-stone-300 fill-current shrink-0" />
                              <div className="space-y-2">
                                  <p className="text-sm font-serif text-stone-800 leading-relaxed">
                                      "Traffic from AI overviews has increased by <span className="bg-yellow-100 px-1 rounded text-stone-900 font-semibold">42% year-over-year</span> for optimized domains."
                                  </p>
                              </div>
                          </div>
                      </div>

                      {/* Connecting Line */}
                      <div className="h-8 w-px border-l border-dashed border-stone-300 my-1"></div>

                      {/* Source Card (Floating below) */}
                      <div className="relative z-10 bg-stone-900 rounded-xl shadow-xl p-4 w-[90%] flex items-center justify-between group cursor-pointer hover:scale-[1.02] transition-transform">
                          <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-stone-800 flex items-center justify-center text-white font-bold border border-stone-700">
                                  S
                              </div>
                              <div className="flex flex-col">
                                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Source Verified</span>
                                  <span className="text-xs font-bold text-white">Search Engine Journal, Q4 Report</span>
                              </div>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-stone-900">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                      </div>

                      {/* Background Decor Elements */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-stone-200/30 rounded-full blur-3xl -z-0"></div>

                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* FEATURE 04: SEMANTIC LINKING (Redesigned) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
             {/* UI Side (Left on Desktop) */}
             <div className="lg:col-span-7 order-1">
              <div className="relative rounded-[2.5rem] bg-white border border-stone-200 p-3 shadow-xl shadow-stone-900/5 group hover:border-stone-300 transition-colors duration-500">
                
                {/* Inner Mockup Container */}
                <div className="bg-stone-50 rounded-[2rem] overflow-hidden relative min-h-[400px] flex items-center justify-center p-8 border border-stone-100">
                  
                  {/* MOCKUP: Smart Contextual Linking */}
                  <div className="relative w-full max-w-[440px]">
                     
                     {/* 1. Context Card (Back) */}
                     <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm absolute top-0 left-0 right-12 opacity-40 transform scale-95 origin-bottom-left -z-10">
                        <div className="h-2 w-1/3 bg-stone-200 rounded mb-4"></div>
                        <div className="space-y-2">
                           <div className="h-2 w-full bg-stone-100 rounded"></div>
                           <div className="h-2 w-full bg-stone-100 rounded"></div>
                        </div>
                     </div>

                     {/* 2. Main Article Card */}
                     <div className="bg-white rounded-xl border border-stone-200 p-8 shadow-md relative z-10">
                         {/* Header */}
                         <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
                            <div className="flex items-center gap-2">
                               <FileText className="w-4 h-4 text-stone-400" />
                               <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">Drafting...</span>
                            </div>
                            <span className="text-[10px] font-mono text-stone-300">ID: #8821</span>
                         </div>

                         {/* Content Body */}
                         <div className="space-y-3">
                            <div className="h-2.5 w-full bg-stone-100 rounded-full"></div>
                            <div className="h-2.5 w-[90%] bg-stone-100 rounded-full"></div>
                            
                            {/* The Sentence with Highlight */}
                            <div className="flex items-center flex-wrap gap-x-2 gap-y-2 py-1">
                               <div className="h-2.5 w-24 bg-stone-100 rounded-full"></div>
                               <div className="h-2.5 w-12 bg-stone-100 rounded-full"></div>
                               
                               {/* Highlighted Term */}
                               <div className="relative group cursor-default">
                                  <div className="px-2 py-1 bg-stone-900 rounded text-white text-[11px] font-bold shadow-lg shadow-stone-900/20 flex items-center gap-2">
                                     Topical Authority
                                     <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                  </div>
                                  
                                  {/* Connector Line (Vertical down to card) */}
                                  <div className="absolute left-1/2 -translate-x-1/2 top-full h-8 w-px bg-stone-900"></div>
                               </div>

                               <div className="h-2.5 w-32 bg-stone-100 rounded-full"></div>
                            </div>

                            <div className="h-2.5 w-[85%] bg-stone-100 rounded-full"></div>
                         </div>
                     </div>

                     {/* 3. The "Smart Suggestion" Card (Bottom) */}
                     <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-[90%] bg-stone-900 rounded-xl p-4 shadow-xl shadow-stone-900/20 border border-stone-700 z-20 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-stone-800 border border-stone-700 flex items-center justify-center shrink-0">
                               <Link className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex flex-col">
                               <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-0.5">Link Recommendation</span>
                               <span className="text-sm font-bold text-white truncate max-w-[160px] sm:max-w-xs">
                                  "Pillar: Modern SEO Strategy"
                               </span>
                            </div>
                         </div>
                         
                         {/* Action */}
                         <div className="hidden sm:flex flex-col items-end gap-1">
                            <div className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-[10px] font-bold border border-green-500/30">
                               High Relevance
                            </div>
                         </div>
                     </div>

                  </div>

                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="lg:col-span-5 order-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-stone-200 text-stone-900 text-sm font-bold shadow-sm">04</span>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Semantic Linking</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6 tracking-tight">
                Semantic Internal Linking
              </h3>
              <p className="text-lg text-stone-600 leading-relaxed mb-8">
                Every article knows why it exists and what it supports. We connect content by intent and meaning, not random links or SEO templates. Nothing published stands alone.
              </p>
            </div>
          </div>

          {/* FEATURE 05: INSTANT CREDIBILITY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            {/* Text Side */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-stone-200 text-stone-900 text-sm font-bold shadow-sm">05</span>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Trust Engine</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6 tracking-tight">
                Instant Credibility & Trust
              </h3>
              <p className="text-lg text-stone-600 leading-relaxed mb-8">
                Every important claim is backed by real sources. Not after publishing, not manually. Authority is part of the content, not an afterthought.
              </p>
            </div>

            {/* UI Side */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative rounded-[2.5rem] bg-white border border-stone-200 p-3 shadow-xl shadow-stone-900/5 group hover:border-stone-300 transition-colors duration-500">
                 
                 {/* Inner Mockup Container */}
                 <div className="bg-stone-50 rounded-[2rem] overflow-hidden relative min-h-[400px] flex items-center justify-center p-8 border border-stone-100">
                    
                    {/* MOCKUP: Editor View */}
                    <div className="bg-white w-full max-w-[380px] rounded-xl shadow-sm border border-stone-200 overflow-hidden relative">
                        
                        {/* Editor Header */}
                        <div className="h-8 bg-stone-50 border-b border-stone-100 flex items-center px-4 gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-stone-300"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-stone-300"></div>
                        </div>

                        {/* Editor Content */}
                        <div className="p-6 font-serif text-stone-800 leading-relaxed text-sm">
                           <p className="mb-4 text-stone-400">
                               The rise of generative engines has shifted user behavior significantly...
                           </p>
                           <p>
                               Most notably, zero-click searches have risen dramatically.
                               {/* Highlighted Text */}
                               <span className="bg-blue-100 text-stone-900 px-0.5 relative inline-block mx-1 rounded-sm selection-highlight">
                                  According to Statista (2024), 58.6% of searches now end without a click.
                                  
                                  {/* Tooltip Popover (Floating above) */}
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[220px] bg-stone-900 rounded-lg shadow-xl p-3 z-20 flex flex-col gap-2">
                                      {/* Tooltip Arrow */}
                                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-stone-900 rotate-45"></div>
                                      
                                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                          <span className="text-[10px] font-bold text-stone-400 uppercase">Verified Source</span>
                                          <div className="flex items-center gap-1 bg-green-500/20 px-1.5 py-0.5 rounded border border-green-500/30">
                                              <ShieldCheck className="w-2.5 h-2.5 text-green-400" />
                                              <span className="text-[9px] font-bold text-green-400">Trusted</span>
                                          </div>
                                      </div>
                                      <div className="flex flex-col gap-0.5">
                                          <span className="text-xs font-bold text-white">statista.com/stats/market-share...</span>
                                          <span className="text-[10px] text-stone-500">Domain Authority: 92</span>
                                      </div>
                                  </div>
                               </span>
                               This indicates a fundamental change in SEO strategy.
                           </p>
                           {/* Fake Cursor */}
                           <div className="inline-block w-0.5 h-4 bg-stone-900 animate-pulse align-middle ml-0.5"></div>
                        </div>
                    </div>

                 </div>
              </div>
            </div>
          </div>

          {/* FEATURE 06: CONTENT PLAN */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
             {/* UI Side (Left on Desktop) */}
             <div className="lg:col-span-7 order-1">
              <div className="relative rounded-[2.5rem] bg-white border border-stone-200 p-3 shadow-xl shadow-stone-900/5 group hover:border-stone-300 transition-colors duration-500">
                
                {/* Inner Mockup Container */}
                <div className="bg-stone-50 rounded-[2rem] overflow-hidden relative min-h-[400px] flex items-center justify-center p-8 border border-stone-100">
                  
                  {/* MOCKUP: Timeline Dependency */}
                  <div className="w-full max-w-[340px] relative">
                     
                     {/* Timeline Line */}
                     <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-stone-200"></div>

                     {/* Item 1: Active/Done */}
                     <div className="relative flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-stone-900 border-4 border-stone-50 flex items-center justify-center shrink-0 z-10 shadow-sm">
                           <Check className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex justify-between items-center">
                           <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Week 01</span>
                              <span className="text-sm font-bold text-stone-900">Core Definitions</span>
                           </div>
                           <span className="px-2 py-1 rounded bg-stone-100 text-[10px] font-bold text-stone-500">Published</span>
                        </div>
                     </div>

                     {/* Item 2: In Progress */}
                     <div className="relative flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-white border-4 border-stone-50 flex items-center justify-center shrink-0 z-10 shadow-sm ring-2 ring-stone-900">
                           <div className="w-2.5 h-2.5 rounded-full bg-stone-900 animate-pulse"></div>
                        </div>
                        <div className="flex-1 bg-white p-4 rounded-xl border-2 border-stone-900 shadow-lg shadow-stone-900/5 flex justify-between items-center transform scale-105">
                           <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-accent-600 uppercase tracking-wide flex items-center gap-1">
                                 <Zap className="w-3 h-3" /> Unlocked
                              </span>
                              <span className="text-sm font-bold text-stone-900">Cluster Expansion</span>
                           </div>
                           <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
                              <MousePointer2 className="w-4 h-4 text-stone-900" />
                           </div>
                        </div>
                     </div>

                     {/* Item 3: Locked */}
                     <div className="relative flex items-center gap-4 opacity-60">
                        <div className="w-10 h-10 rounded-full bg-stone-200 border-4 border-stone-50 flex items-center justify-center shrink-0 z-10">
                           <Lock className="w-4 h-4 text-stone-500" />
                        </div>
                        <div className="flex-1 bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex justify-between items-center">
                           <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">Week 04</span>
                              <span className="text-sm font-bold text-stone-500">Authority Consolidation</span>
                           </div>
                        </div>
                     </div>

                  </div>

                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="lg:col-span-5 order-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-stone-200 text-stone-900 text-sm font-bold shadow-sm">06</span>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Authority Roadmap</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6 tracking-tight">
                30-Day Authority-Driven Content Plan
              </h3>
              <p className="text-lg text-stone-600 leading-relaxed mb-8">
                We do not ask "What should we write this month?" We decide what comes first, what unlocks the next article, and what should wait. This is how authority compounds instead of stalling.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};