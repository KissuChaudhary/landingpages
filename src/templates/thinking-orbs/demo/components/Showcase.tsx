import React, { useState } from 'react';
import type { OrbSize, OrbState } from '../../src';
import { ThinkingOrb } from '../../src';
import { CopyButton } from './CopyButton';

const STATES: OrbState[] = [
  'working', 'searching', 'solving', 'listening',
  'connecting', 'weaving', 'composing', 'breathing',
  'shaping', 'synthesizing', 'transmitting', 'gathering',
  'resolving', 'reasoning', 'aligning', 'sparking',
  'resonating', 'indexing', 'folding', 'drifting',
  'focusing', 'syncing', 'processing', 'assisting'
];

function OrbDetail({ state, onBack }: { state: OrbState; onBack: () => void }) {
  const [speed, setSpeed] = useState(1);
  const [size, setSize] = useState<OrbSize>(64);
  const [tab, setTab] = useState<'react' | 'cli' | 'raw'>('react');
  const [rawCode, setRawCode] = useState<string>('Loading source code...');

  React.useEffect(() => {
    fetch('/registry/thinking-orb.tsx')
      .then(res => res.text())
      .then(text => setRawCode(text))
      .catch(() => setRawCode('// Failed to load source code.'));
  }, []);

  const reactCode = `import { ThinkingOrb } from '@/templates/thinking-orbs/components/ui/thinking-orb';

export default function AgentStatus() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-zinc-900 border border-white/10">
      <ThinkingOrb 
        state="${state}" 
        size={${size}}${speed !== 1 ? `\n        speed={${speed.toFixed(2)}}` : ''}
      />
      <span className="text-sm font-medium text-zinc-300">
        Agent is ${state}...
      </span>
    </div>
  );
}`;

  const cliCode = `npx shadcn@latest add https://your-domain.com/registry/thinking-orb.json`;

  const codeToCopy = tab === 'react' ? reactCode : tab === 'cli' ? cliCode : rawCode;

  return (
    <div className="w-full flex flex-col animate-in fade-in zoom-in-[0.98] duration-500 mt-4">
      <button 
        onClick={onBack}
        className="self-start flex items-center gap-2 text-[13px] font-medium text-(--text-muted) hover:text-(--title-color) transition-colors mb-10 group"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1"><path d="m15 18-6-6 6-6"/></svg>
        Back to Library
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        {/* Preview Column */}
        <div className="col-span-1 lg:col-span-6 flex flex-col gap-4">
          <div className="w-full aspect-[4/3] bg-(--panel-bg) rounded-[24px] border border-white/[0.04] flex items-center justify-center relative overflow-hidden">
             {/* Subtle dot grid background */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none" />
             
             <div className="relative z-10 transition-transform duration-700 ease-in-out" style={{ transform: `scale(${size === 64 ? 2 : 3})` }}>
               <ThinkingOrb state={state} size={size} speed={speed} style={{ width: size === 64 ? 64 : 32, height: size === 64 ? 64 : 32 }} />
             </div>
          </div>
        </div>

        {/* Config & Code Column */}
        <div className="col-span-1 lg:col-span-6 flex flex-col gap-8">
          <div>
            <h2 className="text-3xl font-light text-(--title-color) capitalize tracking-tight mb-2">{state}</h2>
            <p className="text-sm text-(--subtitle-color) opacity-80 leading-relaxed">Configure the animation parameters and copy the snippet for your project.</p>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-medium text-(--text-muted) uppercase tracking-widest">Detail Size</label>
              <div className="flex items-center gap-2 p-1 rounded-[14px] bg-black/20 border border-white/5 w-fit">
                {[20, 64].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s as OrbSize)}
                    className={`px-6 py-2 text-[13px] font-medium rounded-xl transition-colors ${
                      size === s 
                        ? 'bg-white/10 text-white' 
                        : 'bg-transparent text-(--text-muted) hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {s}px
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex items-center justify-between text-[10px] font-medium text-(--text-muted) uppercase tracking-widest">
                <span>Speed Multiplier</span>
                <span className="tabular-nums text-(--text)">{speed.toFixed(2)}x</span>
              </label>
              <input 
                type="range" 
                min="0.25" 
                max="3" 
                step="0.05" 
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer focus:outline-none"
              />
            </div>
          </div>

          {/* Code Block */}
          <div className="flex flex-col border border-white/5 rounded-[16px] overflow-hidden bg-black/20 mt-2">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-5">
                <button 
                  onClick={() => setTab('react')}
                  className={`text-[13px] font-medium transition-colors ${tab === 'react' ? 'text-zinc-200' : 'text-zinc-600 hover:text-zinc-400'}`}
                >
                  Usage
                </button>
                <button 
                  onClick={() => setTab('cli')}
                  className={`text-[13px] font-medium transition-colors ${tab === 'cli' ? 'text-zinc-200' : 'text-zinc-600 hover:text-zinc-400'}`}
                >
                  CLI Installation
                </button>
                <button 
                  onClick={() => setTab('raw')}
                  className={`text-[13px] font-medium transition-colors ${tab === 'raw' ? 'text-zinc-200' : 'text-zinc-600 hover:text-zinc-400'}`}
                >
                  thinking-orb.tsx
                </button>
              </div>
              <CopyButton text={codeToCopy} />
            </div>
            <div className="p-5 overflow-x-auto bg-black/40 h-[180px]">
              <pre className="text-[13px] leading-relaxed font-[Roboto_Mono,monospace] text-zinc-300">
                <code>{codeToCopy}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Showcase() {
  const [selectedState, setSelectedState] = useState<OrbState | null>(null);

  if (selectedState) {
    return <OrbDetail state={selectedState} onBack={() => setSelectedState(null)} />;
  }

  return (
    <div className="w-full flex flex-col animate-in fade-in duration-1000 mt-2">
      <div className="mb-8 max-w-lg">
        <h3 className="text-2xl font-light text-(--title-color) tracking-tight">Component Library</h3>
        <p className="text-sm text-(--subtitle-color) mt-3 leading-relaxed opacity-80">Select any state below to view its configuration and copy the usage snippet directly into your project.</p>
      </div>

      {/* Grid Section */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
         {STATES.map(state => (
            <div 
              key={state} 
              onClick={() => setSelectedState(state)}
              className="bg-(--panel-bg) hover:bg-white/[0.04] transition-colors duration-400 rounded-[24px] p-6 flex flex-col items-center justify-center aspect-square group cursor-pointer border border-white/[0.02] hover:border-white/[0.08]"
            >
               <div className="transition-transform duration-700 ease-out group-hover:scale-110 flex items-center justify-center w-[64px] h-[64px]">
                 <ThinkingOrb state={state} size={64} speed={1} style={{ width: 64, height: 64 }} />
               </div>
               <div className="mt-8 text-[11px] text-(--text-muted) tracking-widest uppercase font-medium group-hover:text-(--text) transition-colors duration-300">{state}</div>
            </div>
         ))}
      </section>
    </div>
  );
}
