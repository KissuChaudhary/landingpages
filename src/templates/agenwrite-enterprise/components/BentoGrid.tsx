import React from 'react';
import { Frame } from './ui/Frame';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { FileSearch, Sparkles, Fingerprint, Check } from 'lucide-react';

const waveData = [
  { val: 20 }, { val: 40 }, { val: 30 }, { val: 70 }, { val: 40 }, { val: 60 }, { val: 30 }, { val: 50 }, { val: 20 }, { val: 40 }
];

export const BentoGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 w-full">
      
      {/* Box A: The Human Engine (Large Square) */}
      <Frame className="col-span-1 md:col-span-1 md:row-span-2 min-h-[300px]" label="Human_Engine">
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="w-10 h-10 bg-zinc-100 border border-zinc-200 flex items-center justify-center mb-4">
                <Sparkles size={20} className="text-zinc-900" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">Zero "AI Slop"</h3>
            <p className="text-sm text-muted leading-relaxed">
              Most AI writes like a robot. Our agent uses semantic variance and perplexity modulation to mimic human cadence. 
            </p>
          </div>
          
          <div className="mt-8">
            <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-mono text-muted uppercase">Human Pass Rate</span>
                <span className="text-2xl font-mono font-medium text-primary">98.4%</span>
            </div>
            <div className="h-16 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={waveData}>
                    <defs>
                        <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#18181B" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#18181B" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="val" stroke="#18181B" strokeWidth={1.5} fill="url(#waveGradient)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Frame>

      {/* Box B: The Research Agent (Tall) */}
      <Frame className="col-span-1 md:col-span-1 md:row-span-2" label="Research_Node">
        <div className="flex flex-col h-full">
            <div className="w-10 h-10 bg-zinc-100 border border-zinc-200 flex items-center justify-center mb-4">
                <FileSearch size={20} className="text-zinc-900" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">Deep Research</h3>
            <p className="text-sm text-muted leading-relaxed mb-6">
                The agent browses the live web, reads top 10 results, and parses PDFs before writing a single word.
            </p>
            
            <div className="bg-zinc-50 border border-border p-4 flex-1 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-sm bg-green-100 border border-green-200 flex items-center justify-center text-green-700">
                        <Check size={10} />
                    </div>
                    <span className="text-xs font-mono text-zinc-700">Validating Source Authorities...</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-sm bg-green-100 border border-green-200 flex items-center justify-center text-green-700">
                        <Check size={10} />
                    </div>
                    <span className="text-xs font-mono text-zinc-700">Cross-referencing Stats...</span>
                </div>
                 <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-sm bg-green-100 border border-green-200 flex items-center justify-center text-green-700">
                        <Check size={10} />
                    </div>
                    <span className="text-xs font-mono text-zinc-700">Filtering Generic Content...</span>
                </div>
                 <div className="flex items-center gap-3 opacity-50">
                    <div className="w-4 h-4 rounded-sm border border-zinc-300"></div>
                    <span className="text-xs font-mono text-zinc-500">Synthesizing Unique Insight...</span>
                </div>
            </div>
        </div>
      </Frame>

      {/* Box C: The Brand Guard (Wide) */}
      <Frame className="col-span-1 md:col-span-1 md:row-span-2" label="Context_Awareness">
         <div className="flex flex-col h-full">
            <div className="w-10 h-10 bg-zinc-100 border border-zinc-200 flex items-center justify-center mb-4">
                <Fingerprint size={20} className="text-zinc-900" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">Brand Clone</h3>
            <p className="text-sm text-muted leading-relaxed mb-8">
               Upload your previous blogs. We analyze your sentence structure and vocabulary to clone your voice.
            </p>
            
            <div className="mt-auto space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono uppercase text-muted">
                        <span>Generic AI</span>
                        <span>Your Brand</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden border border-zinc-200">
                        <div className="h-full bg-zinc-900 w-[85%] rounded-full"></div>
                    </div>
                </div>
                
                 <div className="p-3 bg-zinc-50 border border-border text-xs font-mono text-zinc-600 italic">
                    "Style match: 99.2%. Detected witty tone and short sentence preference."
                 </div>
            </div>
         </div>
      </Frame>

    </div>
  );
};