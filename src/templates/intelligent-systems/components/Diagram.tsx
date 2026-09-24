import React from 'react';
import { Cpu } from 'lucide-react';

const Cable = ({ d, opacity = 1 }: { d: string, opacity?: number }) => (
  <g filter="url(#cable-shadow)" opacity={opacity}>
    <path d={d} fill="none" stroke="#1a1a1c" strokeWidth="12" strokeLinecap="round" />
    <path d={d} fill="none" stroke="#3a3a3c" strokeWidth="8" strokeLinecap="round" />
    <path d={d} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" transform="translate(0, -1)" />
    <path d={d} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeLinecap="round" transform="translate(0, 1)" />
  </g>
);

const DataFlow = ({ d }: { d: string }) => (
  <path d={d} fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="6 12" opacity="0.6" strokeLinecap="round">
    <animate attributeName="stroke-dashoffset" from="18" to="0" dur="1s" repeatCount="indefinite" />
  </path>
);

function HardwareNode({ 
  x, y, width, height, text, portPosition 
}: { 
  x: number, y: number, width: number, height: number, text: string, portPosition: 'left' | 'right' 
}) {
  return (
    <foreignObject x={x} y={y} width={width} height={height} className="overflow-visible">
      <div className="w-full h-full flex items-center justify-center">
        <div className="node-panel w-full h-full rounded-xl flex items-center justify-center relative">
          {portPosition === 'right' && (
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-10 bg-[#1a1a1c] border border-black rounded-sm inner-shadow-dark flex flex-col justify-evenly py-1 items-center z-10">
               <div className="w-2 h-0.5 bg-black rounded-full" />
               <div className="w-2 h-0.5 bg-black rounded-full" />
               <div className="w-2 h-0.5 bg-black rounded-full" />
            </div>
          )}
          {portPosition === 'left' && (
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-10 bg-[#1a1a1c] border border-black rounded-sm inner-shadow-dark flex flex-col justify-evenly py-1 items-center z-10">
               <div className="w-2 h-0.5 bg-black rounded-full" />
               <div className="w-2 h-0.5 bg-black rounded-full" />
               <div className="w-2 h-0.5 bg-black rounded-full" />
            </div>
          )}
          <span className="font-mono text-[11px] text-gray-300 whitespace-pre-line leading-tight text-center">
            {text}
          </span>
        </div>
      </div>
    </foreignObject>
  );
}

export default function Diagram() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-16 relative z-20 px-4">
      {/* Scalable SVG Container */}
      <div className="w-full relative aspect-[1000/400]">
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="cable-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000" floodOpacity="0.8" />
            </filter>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Left Cables */}
          <Cable d="M 220 90 C 300 90, 320 150, 400 150" />
          <Cable d="M 220 200 C 300 200, 320 200, 400 200" />
          <Cable d="M 220 310 C 300 310, 320 250, 400 250" />

          {/* Right Cables */}
          <Cable d="M 600 150 C 680 150, 700 140, 780 140" />
          <Cable d="M 600 250 C 680 250, 700 260, 780 260" />

          {/* Data Flows */}
          <DataFlow d="M 220 90 C 300 90, 320 150, 400 150" />
          <DataFlow d="M 220 200 C 300 200, 320 200, 400 200" />
          <DataFlow d="M 220 310 C 300 310, 320 250, 400 250" />
          <DataFlow d="M 600 150 C 680 150, 700 140, 780 140" />
          <DataFlow d="M 600 250 C 680 250, 700 260, 780 260" />

          {/* Left Nodes */}
          <HardwareNode x={20} y={60} width={200} height={60} text={`Structured\nData`} portPosition="right" />
          <HardwareNode x={20} y={170} width={200} height={60} text={`Unstructured\nData`} portPosition="right" />
          <HardwareNode x={20} y={280} width={200} height={60} text={`Real-time\nStreams`} portPosition="right" />

          {/* Center Core */}
          <foreignObject x="400" y="100" width="200" height="200" className="overflow-visible">
            <div className="w-full h-full rounded-2xl node-panel flex flex-col items-center justify-center relative">
              {/* Left Ports */}
              <div className="absolute -left-2 top-[30px] w-4 h-10 bg-[#1a1a1c] border border-black rounded-sm inner-shadow-dark flex flex-col justify-evenly py-1 items-center z-10">
                 <div className="w-2 h-0.5 bg-black rounded-full" />
                 <div className="w-2 h-0.5 bg-black rounded-full" />
                 <div className="w-2 h-0.5 bg-black rounded-full" />
              </div>
              <div className="absolute -left-2 top-[80px] w-4 h-10 bg-[#1a1a1c] border border-black rounded-sm inner-shadow-dark flex flex-col justify-evenly py-1 items-center z-10">
                 <div className="w-2 h-0.5 bg-black rounded-full" />
                 <div className="w-2 h-0.5 bg-black rounded-full" />
                 <div className="w-2 h-0.5 bg-black rounded-full" />
              </div>
              <div className="absolute -left-2 top-[130px] w-4 h-10 bg-[#1a1a1c] border border-black rounded-sm inner-shadow-dark flex flex-col justify-evenly py-1 items-center z-10">
                 <div className="w-2 h-0.5 bg-black rounded-full" />
                 <div className="w-2 h-0.5 bg-black rounded-full" />
                 <div className="w-2 h-0.5 bg-black rounded-full" />
              </div>

              {/* Right Ports */}
              <div className="absolute -right-2 top-[30px] w-4 h-10 bg-[#1a1a1c] border border-black rounded-sm inner-shadow-dark flex flex-col justify-evenly py-1 items-center z-10">
                 <div className="w-2 h-0.5 bg-black rounded-full" />
                 <div className="w-2 h-0.5 bg-black rounded-full" />
                 <div className="w-2 h-0.5 bg-black rounded-full" />
              </div>
              <div className="absolute -right-2 top-[130px] w-4 h-10 bg-[#1a1a1c] border border-black rounded-sm inner-shadow-dark flex flex-col justify-evenly py-1 items-center z-10">
                 <div className="w-2 h-0.5 bg-black rounded-full" />
                 <div className="w-2 h-0.5 bg-black rounded-full" />
                 <div className="w-2 h-0.5 bg-black rounded-full" />
              </div>

              {/* Subtle circuit traces */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                <path d="M 20 100 L 70 100 M 130 100 L 180 100 M 100 20 L 100 70 M 100 130 L 100 180" stroke="#4a4a4c" strokeWidth="2" strokeLinecap="round" />
                <rect x="70" y="70" width="60" height="60" rx="12" fill="none" stroke="#4a4a4c" strokeWidth="2" />
              </svg>

              {/* The Processor Socket (recessed) */}
              <div className="w-24 h-24 rounded-xl bg-[#0a0a0c] border-y border-white/5 border-x border-black shadow-[inset_0_4px_12px_rgba(0,0,0,1)] flex items-center justify-center relative z-10 mb-4">
                {/* The Processor Die (elevated, glossy) */}
                <div className="w-16 h-16 rounded-lg bg-gradient-to-b from-[#2a2a2c] to-[#161618] border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.8)] flex items-center justify-center relative overflow-hidden">
                  {/* Diagonal shine */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50" />
                  <Cpu className="w-8 h-8 text-gray-300" strokeWidth={1.5} />
                </div>
              </div>

              <span className="font-mono text-[13px] text-gray-200 tracking-wide relative z-10">AI Core</span>
              <div className="flex items-center gap-2 mt-1.5 relative z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
                <span className="text-gray-500 text-[9px] font-mono tracking-widest uppercase">Processing</span>
              </div>
            </div>
          </foreignObject>

          {/* Right Nodes */}
          <HardwareNode x={780} y={110} width={200} height={60} text={`Global\nDeployment`} portPosition="left" />
          <HardwareNode x={780} y={230} width={200} height={60} text={`Secure\nVault`} portPosition="left" />
        </svg>
      </div>
    </div>
  );
}
