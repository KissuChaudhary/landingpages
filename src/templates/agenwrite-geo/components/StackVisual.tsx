import React from 'react';
import { RefreshCw, Zap, CheckCircle2 } from 'lucide-react';

interface StackCardProps {
  children: React.ReactNode;
  label: string;
  className?: string;
  brackets?: ('tl' | 'tr' | 'bl' | 'br')[];
  showArrow?: boolean;
}

const DashedArrow = () => (
  <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center h-8 w-6 z-10">
    <svg width="16" height="32" viewBox="0 0 16 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 0V26" stroke="#52525B" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M8 26L12 22M8 26L4 22" stroke="#52525B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const StackCard: React.FC<StackCardProps> = ({ children, label, className = '', brackets = [], showArrow = false }) => {
  return (
    <div className={`relative bg-zinc-900 border border-zinc-800 shadow-sm p-5 md:p-6 ${className}`}>
      {/* Label */}
      <div className="absolute top-0 right-0 p-3">
        <span className="text-zinc-600 font-mono text-[10px] tracking-widest font-bold">...</span>
      </div>
      
      <div className="mb-4">
         <span className="font-mono text-[10px] font-medium text-zinc-500 uppercase tracking-widest">
           {label}
         </span>
      </div>

      {children}

      {/* Brackets - White/Light for contrast against dark card */}
      {brackets.includes('tl') && (
        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-zinc-500"></div>
      )}
      {brackets.includes('tr') && (
        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-zinc-500"></div>
      )}
      {brackets.includes('bl') && (
        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-zinc-500"></div>
      )}
      {brackets.includes('br') && (
        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-zinc-500"></div>
      )}

      {/* Connecting Arrow */}
      {showArrow && <DashedArrow />}
    </div>
  );
};

export const StackVisual: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center py-8 perspective-[1000px]">
      {/* The Tray - Dark Mode */}
      <div 
        className="relative bg-zinc-950 border border-zinc-800 p-6 md:p-10 w-full max-w-[440px] shadow-2xl shadow-black"
        style={{
          transform: 'rotateX(5deg) rotateY(-5deg) rotateZ(1.5deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Layer 1: Input */}
        <div className="relative mb-8 z-30">
            {/* Dark Orange Hatch Pattern Background - Offset */}
            <div 
                className="absolute top-2 -left-2 w-full h-full -z-10 border border-orange-900/30" 
                style={{
                  backgroundImage: 'repeating-linear-gradient(-45deg, #1c1917, #1c1917 2px, transparent 2px, transparent 6px)',
                  backgroundColor: '#0c0a09' // Stone 950
                }}
            ></div>

            <StackCard 
                label="INPUT LAYER" 
                brackets={['tl', 'tr']} 
                showArrow
            >
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-white">
                        <RefreshCw size={16} className="text-zinc-500" />
                        <span className="font-bold text-base">Data Infrastructure</span>
                    </div>
                    <p className="font-sans text-xs text-zinc-400 leading-relaxed pl-6">
                        Collection, storage, transformation
                    </p>
                </div>
            </StackCard>
        </div>

        {/* Layer 2: Processing */}
        <div className="relative mb-8 z-20">
            <StackCard 
                label="PROCESSING LAYER" 
                brackets={['bl', 'br']} 
                showArrow
                className="border-zinc-700"
            >
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-white">
                        <Zap size={16} className="text-zinc-500" />
                        <span className="font-bold text-base">Intelligence Engine</span>
                    </div>
                    <p className="font-sans text-xs text-zinc-400 leading-relaxed pl-6">
                        Querying, reasoning, vectorizing
                    </p>
                </div>
            </StackCard>
        </div>

        {/* Layer 3: Output */}
        <div className="relative z-10">
             <StackCard 
                label="OUTPUT LAYER" 
                brackets={['tl', 'bl']}
            >
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-white">
                        <CheckCircle2 size={16} className="text-zinc-500" />
                        <span className="font-bold text-base">Product Delivery</span>
                    </div>
                    <p className="font-sans text-xs text-zinc-400 leading-relaxed pl-6">
                        APIs, interfaces, outcomes
                    </p>
                </div>
            </StackCard>
        </div>

        {/* Footer Metrics */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-zinc-800 text-[10px] font-mono font-medium tracking-wide">
            <span className="text-blue-500">
                End-to-end latency: 34ms
            </span>
            <span className="text-green-500">
                99.99% uptime
            </span>
        </div>

      </div>
    </div>
  );
};