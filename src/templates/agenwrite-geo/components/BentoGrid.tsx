import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { FileSearch, GitBranch, Quote, Check } from 'lucide-react';

const waveData = [
  { val: 20 }, { val: 40 }, { val: 30 }, { val: 70 }, { val: 40 }, { val: 60 }, { val: 30 }, { val: 50 }, { val: 20 }, { val: 40 }
];

export const BentoGrid: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800/80 bg-black">
      
      {/* Node 01: The Snowball Method */}
      <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between relative group hover:bg-zinc-900/20 transition-colors">
        <div>
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 px-2 py-0.5 border border-zinc-800 bg-zinc-950">
              NODE_01 // COHERENCE_ENGINE
            </span>
            <span className="size-1.5 rounded-full bg-zinc-500" />
          </div>

          <div className="w-9 h-9 border border-zinc-800 bg-zinc-900/90 rounded-[2px] flex items-center justify-center mb-6 text-zinc-300 group-hover:text-zinc-100 group-hover:border-zinc-700 transition-colors">
            <GitBranch size={18} strokeWidth={1.75} />
          </div>

          <h3 className="text-xl font-medium text-zinc-100 mb-3 tracking-tight">
            The Snowball Method
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed font-normal">
            Standard AI forgets paragraph 1 by paragraph 5. The recursive coherence loop analyzes preceding sections to preserve context and momentum across long-form documents.
          </p>
        </div>
        
        <div className="mt-10 pt-6 border-t border-zinc-850 border-zinc-800/60">
          <div className="flex justify-between items-end mb-3">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              Coherence Fidelity
            </span>
            <span className="text-xl font-mono font-medium text-zinc-200">
              98.4%
            </span>
          </div>
          <div className="h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={waveData}>
                <defs>
                  <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4d4d8" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#d4d4d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="val" stroke="#a1a1aa" strokeWidth={1.5} fill="url(#waveGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Node 02: Deep Research Agent */}
      <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between relative group hover:bg-zinc-900/20 transition-colors">
        <div>
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 px-2 py-0.5 border border-zinc-800 bg-zinc-950">
              NODE_02 // KNOWLEDGE_SYNTHESIS
            </span>
            <span className="size-1.5 rounded-full bg-zinc-500" />
          </div>

          <div className="w-9 h-9 border border-zinc-800 bg-zinc-900/90 rounded-[2px] flex items-center justify-center mb-6 text-zinc-300 group-hover:text-zinc-100 group-hover:border-zinc-700 transition-colors">
            <FileSearch size={18} strokeWidth={1.75} />
          </div>

          <h3 className="text-xl font-medium text-zinc-100 mb-3 tracking-tight">
            Deep Research Agent
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed font-normal mb-8">
            Scrapes live documentation, verifies citations across primary sources, and generates structured fact sheets before the authoring phase initiates.
          </p>
        </div>

        <div className="bg-zinc-950/70 border border-zinc-800/80 p-4 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-[2px] bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-300 shrink-0">
              <Check size={10} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-mono text-zinc-300">Resolving Primary Sources...</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-[2px] bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-300 shrink-0">
              <Check size={10} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-mono text-zinc-300">Cross-Verifying Numerical Claims...</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-[2px] bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-300 shrink-0">
              <Check size={10} strokeWidth={2.5} />
            </div>
            <span className="text-xs font-mono text-zinc-300">Eliminating Generic Platitudes...</span>
          </div>
          <div className="flex items-center gap-3 opacity-40">
            <div className="w-4 h-4 rounded-[2px] border border-zinc-700 shrink-0" />
            <span className="text-xs font-mono text-zinc-500">Compiling Verified Fact Table...</span>
          </div>
        </div>
      </div>

      {/* Node 03: The Style Thief */}
      <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between relative group hover:bg-zinc-900/20 transition-colors">
        <div>
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 px-2 py-0.5 border border-zinc-800 bg-zinc-950">
              NODE_03 // TONE_FIDELITY
            </span>
            <span className="size-1.5 rounded-full bg-zinc-500" />
          </div>

          <div className="w-9 h-9 border border-zinc-800 bg-zinc-900/90 rounded-[2px] flex items-center justify-center mb-6 text-zinc-300 group-hover:text-zinc-100 group-hover:border-zinc-700 transition-colors">
            <Quote size={18} strokeWidth={1.75} />
          </div>

          <h3 className="text-xl font-medium text-zinc-100 mb-3 tracking-tight">
            The Style Thief
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed font-normal mb-8">
            Extracts structural cadence, sentence entropy, and vocabulary fingerprints from your top-performing publications rather than generic prompt adjectives.
          </p>
        </div>

        <div className="mt-auto space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono uppercase text-zinc-500">
              <span>Standard GPT Tone</span>
              <span className="text-zinc-300 font-medium">Bespoke Voice (99.2%)</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
              <div className="h-full bg-zinc-300 w-[99.2%] rounded-full" />
            </div>
          </div>
          
          <div className="p-3.5 bg-zinc-950/70 border border-zinc-800/80 text-xs font-mono text-zinc-400 leading-relaxed">
            <span className="text-zinc-500 font-semibold block mb-1">// SYSTEM_DIAGNOSTIC:</span>
            "Fingerprint calibrated: Short declarative syntax, low passive voice, rigorous empirical citations."
          </div>
        </div>
      </div>

    </div>
  );
};