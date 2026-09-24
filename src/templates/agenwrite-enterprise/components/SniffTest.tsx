import React from 'react';
import { Crosshair } from './ui/Crosshair';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export const SniffTest: React.FC = () => {
  return (
    <section className="border-b border-zinc-200 bg-zinc-50/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest border border-zinc-200 bg-white px-3 py-1 rounded-full">
            The Sniff Test
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-zinc-950 mt-6 mb-4">
            Your readers can smell "Generic AI."
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg font-light">
            Standard AI content is fluffy, repetitive, and kills your brand authority. We fixed that.
          </p>
        </div>

        {/* The Split Screen Diff Viewer */}
        <div className="border border-zinc-200 bg-white shadow-sm grid grid-cols-1 md:grid-cols-2 relative">
          <Crosshair className="-top-3 -left-3" />
          <Crosshair className="-top-3 -right-3" />
          <Crosshair className="-bottom-3 -left-3" />
          <Crosshair className="-bottom-3 -right-3" />

          {/* LEFT: The Others (Generic) */}
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-zinc-200 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-zinc-200"></div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                THE OTHERS (GPT-4)
              </span>
              <div className="flex items-center gap-2 bg-red-50 text-red-600 px-2 py-1 rounded-[2px] border border-red-100">
                <AlertTriangle size={12} />
                <span className="font-mono text-[10px] font-bold">DETECTED AS AI</span>
              </div>
            </div>

            <p className="font-serif text-xl leading-relaxed text-zinc-400">
              "<span className="bg-red-50 text-red-400 decoration-wavy underline decoration-red-200">In the rapidly evolving landscape</span> of digital marketing, it is <span className="bg-red-50 text-red-400 decoration-wavy underline decoration-red-200">paramount to delve into</span> the transformative potential of synergy..."
            </p>

            <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center gap-2 text-red-400 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              <span>Zero Information Gain</span>
            </div>
          </div>

          {/* RIGHT: AgenWrite Way */}
          <div className="p-8 md:p-12 bg-white relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-zinc-900"></div>

             <div className="flex justify-between items-center mb-8">
              <span className="font-mono text-[10px] font-bold text-zinc-900 uppercase tracking-widest">
                AGENWRITE WAY
              </span>
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-2 py-1 rounded-[2px] border border-green-100">
                <CheckCircle2 size={12} />
                <span className="font-mono text-[10px] font-bold">100% HUMAN SCORE</span>
              </div>
            </div>

            <p className="font-serif text-xl leading-relaxed text-zinc-900">
              "<span className="bg-green-50 decoration-green-200 underline decoration-1 underline-offset-4">Google’s March update changed the game.</span> If you aren't optimizing for 'Answers', you're losing traffic. Here's the data..."
            </p>

             <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center gap-2 text-green-600 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-green-600"></span>
              <span>Brand Voice Match</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};