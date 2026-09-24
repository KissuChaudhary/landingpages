import React from 'react';
import { Crosshair } from './ui/Crosshair';
import { Search, Sparkles, ArrowUpRight, Quote } from 'lucide-react';

export const NewSeoSection: React.FC = () => {
  return (
    <section className="bg-white border-b border-zinc-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Copy Side */}
            <div className="order-2 lg:order-1">
                 <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest border border-zinc-200 px-3 py-1">
                        03 // The New Google
                    </span>
                 </div>
                 
                 <h2 className="font-serif text-4xl md:text-5xl text-zinc-950 mb-6 leading-tight">
                    Rank in the <br/> "AI Overviews" Era.
                 </h2>
                 
                 <p className="text-zinc-600 text-lg leading-relaxed mb-8 font-light">
                    Google isn't just looking for keywords anymore. It’s looking for <span className="text-zinc-900 font-medium">answers</span>. 
                    Our agent researches live data to create the deep, fact-heavy content that AI Search loves to cite.
                 </p>

                 <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 border-t border-zinc-100 pt-6">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-zinc-900"></div>
                        <span>Optimized for SGE</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-zinc-900"></div>
                        <span>Perplexity Ready</span>
                    </div>
                 </div>
            </div>

            {/* Visual Side: AI Overview Mockup */}
            <div className="order-1 lg:order-2 relative">
                <Crosshair className="-top-3 -right-3" />
                <Crosshair className="-bottom-3 -left-3" />
                
                {/* Search Bar - Technical Style */}
                <div className="bg-white border border-zinc-200 p-4 flex items-center gap-4 mb-6 max-w-md mx-auto lg:mx-0 shadow-sm">
                    <Search size={18} className="text-zinc-400" />
                    <span className="font-serif text-zinc-700 italic">"How to optimize content for AI search?"</span>
                </div>

                {/* AI Result Card - Sharp Frame */}
                <div className="bg-zinc-50 border border-zinc-200 p-6 md:p-8 relative">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-400"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-400"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-400"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-400"></div>

                    <div className="flex items-center justify-between mb-6 border-b border-zinc-200 pb-4">
                        <div className="flex items-center gap-2">
                            <Sparkles size={16} className="text-zinc-900" />
                            <span className="text-xs font-bold text-zinc-900 uppercase tracking-wide font-mono">AI Overview</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400">GENERATING ANSWER...</span>
                    </div>
                    
                    <p className="font-serif text-lg leading-relaxed text-zinc-800 mb-8">
                        To optimize for AI search (GEO), focus on authority and data density. Unlike traditional SEO, AI engines prioritize content that directly answers questions with verifiable facts...
                    </p>

                    {/* Sources Carousel - Square Cards */}
                    <div className="flex gap-4 overflow-hidden">
                        {/* Your Article (Winner) */}
                        <div className="bg-white border border-zinc-900 shadow-md p-4 w-56 shrink-0 relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-zinc-900"></div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-5 h-5 bg-zinc-100 flex items-center justify-center font-serif font-bold text-[10px] border border-zinc-200">A</div>
                                <span className="text-[10px] font-bold text-zinc-900 truncate uppercase tracking-wider">YourBrand.com</span>
                            </div>
                            <p className="text-[10px] text-zinc-500 line-clamp-2 leading-relaxed font-mono">
                                &gt;&gt; The definitive guide to Generative Engine Optimization strategies for 2024...
                            </p>
                        </div>
                        
                        {/* Competitor (Loser) */}
                        <div className="bg-zinc-100 border border-zinc-200 p-4 w-56 shrink-0 opacity-50 grayscale">
                             <div className="flex items-center gap-2 mb-3">
                                <div className="w-5 h-5 bg-zinc-200"></div>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Competitor.io</span>
                            </div>
                            <p className="text-[10px] text-zinc-400 line-clamp-2 font-mono">
                                &gt;&gt; 5 tips for better SEO keywords and meta tags...
                            </p>
                        </div>
                    </div>

                    {/* Cursor Graphic */}
                    <div className="absolute bottom-16 left-1/3 w-4 h-4 pointer-events-none z-10">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="black" stroke="white" strokeWidth="2"/>
                        </svg>
                        <div className="absolute left-4 top-4 bg-zinc-900 text-white text-[9px] px-2 py-1 font-mono whitespace-nowrap border border-white">
                            CITATION #1
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};