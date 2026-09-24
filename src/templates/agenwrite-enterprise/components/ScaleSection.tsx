import React from 'react';
import { ActionButton } from './ui/ActionButton';

export const ScaleSection: React.FC = () => {
  return (
    <section className="bg-white py-24 px-6 md:px-12 border-b border-zinc-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left: Copy */}
        <div>
             <div className="mb-6">
                <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest border border-zinc-200 px-3 py-1">
                    05 // Scale & ROI
                </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-zinc-950 mb-6 leading-tight">
                Scale your traffic, <br/> not your headcount.
            </h2>
            <p className="text-zinc-600 text-lg leading-relaxed mb-8 font-light">
                Agencies charge per word. Freelancers ghost you. AgenWrite gives you an infinite content engine for the price of a gym membership.
            </p>
            <ActionButton variant="primary" showArrow>
                Start your content engine
            </ActionButton>
        </div>

        {/* Right: Chart Visual - Technical & Sharp */}
        <div className="bg-zinc-50 border border-zinc-200 p-8 md:p-12 relative">
             {/* Tech accents */}
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-900"></div>
             <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-900"></div>
             <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-900"></div>
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-900"></div>
             
             <div className="space-y-8 font-mono text-sm relative z-10">
                
                {/* Bar 1 */}
                <div className="space-y-2 group">
                    <div className="flex justify-between text-zinc-500 text-[10px] uppercase tracking-widest">
                        <span>Marketing Agency</span>
                        <span>$4,000/mo</span>
                    </div>
                    <div className="h-10 w-full bg-zinc-200 relative border border-zinc-300">
                        <div className="absolute inset-0 flex items-center px-4 text-zinc-500 font-bold text-xs">4 Articles</div>
                    </div>
                </div>

                {/* Bar 2 */}
                <div className="space-y-2 group">
                    <div className="flex justify-between text-zinc-500 text-[10px] uppercase tracking-widest">
                        <span>Freelancers</span>
                        <span>$1,500/mo</span>
                    </div>
                    <div className="h-10 w-[60%] bg-zinc-300 relative border border-zinc-400">
                         <div className="absolute inset-0 flex items-center px-4 text-zinc-600 font-bold text-xs">Quality Varies</div>
                    </div>
                </div>

                {/* Bar 3 (Winner) */}
                <div className="space-y-2">
                    <div className="flex justify-between text-zinc-900 text-[10px] uppercase tracking-widest font-bold">
                        <span>AgenWrite</span>
                        <span>$49/mo</span>
                    </div>
                    <div className="h-12 w-full bg-zinc-900 relative border border-black shadow-lg shadow-zinc-900/10">
                         {/* Technical Stripe Pattern */}
                         <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ffffff 10px, #ffffff 11px)' }}></div>
                         <div className="absolute inset-0 flex items-center px-4 text-white font-bold tracking-wider">UNLIMITED GROWTH</div>
                    </div>
                </div>

             </div>
        </div>

      </div>
    </section>
  );
};