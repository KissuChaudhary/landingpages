import React from 'react';
import { Database, FileText, Activity, Lock, Cpu, Network } from 'lucide-react';

const MiniCable = ({ d, opacity = 1 }: { d: string, opacity?: number }) => (
  <g opacity={opacity}>
    <path d={d} fill="none" stroke="#1a1a1c" strokeWidth="6" strokeLinecap="round" />
    <path d={d} fill="none" stroke="#3a3a3c" strokeWidth="4" strokeLinecap="round" />
    <path d={d} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeLinecap="round" transform="translate(0, -0.5)" />
    <path d={d} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1" strokeLinecap="round" transform="translate(0, 0.5)" />
  </g>
);

export default function ProblemSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-32 relative z-20">
      <div className="flex flex-col items-center text-center mb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-xs font-mono mb-8 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          SYSTEM_BOTTLENECKS_DETECTED
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
          Intelligence is <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-400 to-gray-600">fragmented.</span>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl">
          Building enterprise AI means wrestling with disconnected tools, fragile data pipelines, and unpredictable latency. The legacy infrastructure wasn't built for the generative era.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Data Silos */}
        <div className="node-panel rounded-2xl p-1.5 flex flex-col relative overflow-hidden group">
          <div className="h-56 w-full bg-[#050505] rounded-xl border border-white/5 shadow-[inset_0_0_20px_rgba(0,0,0,1)] relative overflow-hidden mb-6 flex items-center justify-center">
             {/* Scanline overlay */}
             <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-20" />
             {/* Vignette */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] pointer-events-none z-20" />
             
             <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
               <defs>
                 <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
                   <feGaussianBlur stdDeviation="4" result="blur" />
                   <feComposite in="SourceGraphic" in2="blur" operator="over" />
                 </filter>
                 <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                   <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.05)" />
                 </pattern>
               </defs>
               <rect width="100%" height="100%" fill="url(#grid)" />

               {/* Cables */}
               <MiniCable d="M 150 100 C 150 60, 100 60, 80 60" />
               <MiniCable d="M 150 100 C 150 60, 200 60, 220 60" />
               <MiniCable d="M 150 100 C 150 160, 150 160, 150 160" />

               {/* Error pulses on traces */}
               <circle cx="115" cy="75" r="3" fill="#f97316" filter="url(#glow-orange)" className="animate-pulse" />
               <circle cx="185" cy="75" r="3" fill="#f97316" filter="url(#glow-orange)" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
               <circle cx="150" cy="130" r="3" fill="#f97316" filter="url(#glow-orange)" className="animate-pulse" style={{ animationDelay: '0.6s' }} />

               {/* Central Core (Failing) */}
               <rect x="130" y="80" width="40" height="40" rx="8" fill="#0a0a0c" stroke="#3a3a3c" strokeWidth="2" />
               <foreignObject x="130" y="80" width="40" height="40">
                 <div className="w-full h-full flex items-center justify-center"><Cpu className="w-5 h-5 text-gray-600" /></div>
               </foreignObject>

               {/* Nodes */}
               <rect x="40" y="40" width="40" height="40" rx="8" fill="#121214" stroke="#2a2a2c" strokeWidth="2" />
               <foreignObject x="40" y="40" width="40" height="40">
                 <div className="w-full h-full flex items-center justify-center"><Database className="w-5 h-5 text-gray-400" /></div>
               </foreignObject>

               <rect x="220" y="40" width="40" height="40" rx="8" fill="#121214" stroke="#2a2a2c" strokeWidth="2" />
               <foreignObject x="220" y="40" width="40" height="40">
                 <div className="w-full h-full flex items-center justify-center"><FileText className="w-5 h-5 text-gray-400" /></div>
               </foreignObject>

               <rect x="130" y="140" width="40" height="40" rx="8" fill="#121214" stroke="#2a2a2c" strokeWidth="2" />
               <foreignObject x="130" y="140" width="40" height="40">
                 <div className="w-full h-full flex items-center justify-center"><Activity className="w-5 h-5 text-gray-400" /></div>
               </foreignObject>
             </svg>
          </div>

          <div className="px-6 pb-8 pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-white">Siloed Data</h3>
              <span className="font-mono text-[10px] text-gray-600 tracking-widest">ERR_01</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
              Structured databases, unstructured documents, and real-time streams live in isolated environments, making unified context impossible for LLMs.
            </p>
          </div>
        </div>

        {/* Card 2: Fragile Pipelines */}
        <div className="node-panel rounded-2xl p-1.5 flex flex-col relative overflow-hidden group">
          <div className="h-56 w-full bg-[#050505] rounded-xl border border-white/5 shadow-[inset_0_0_20px_rgba(0,0,0,1)] relative overflow-hidden mb-6 flex items-center justify-center">
             <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-20" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] pointer-events-none z-20" />
             
             <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
               <defs>
                 <filter id="glow-orange-2" x="-20%" y="-20%" width="140%" height="140%">
                   <feGaussianBlur stdDeviation="4" result="blur" />
                   <feComposite in="SourceGraphic" in2="blur" operator="over" />
                 </filter>
                 <pattern id="grid-2" width="20" height="20" patternUnits="userSpaceOnUse">
                   <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.05)" />
                 </pattern>
               </defs>
               <rect width="100%" height="100%" fill="url(#grid-2)" />

               {/* Left side (Healthy) */}
               <MiniCable d="M 0 85 L 120 85" />
               <MiniCable d="M 0 100 L 120 100" />
               <MiniCable d="M 0 115 L 120 115" />

               {/* Data flowing on left */}
               <path d="M 0 85 L 115 85" stroke="#f97316" strokeWidth="2" strokeDasharray="10 20" className="animate-[dash_1s_linear_infinite]" opacity="0.6" />
               <path d="M 0 100 L 115 100" stroke="#f97316" strokeWidth="2" strokeDasharray="10 20" className="animate-[dash_1.5s_linear_infinite]" opacity="0.6" />
               <path d="M 0 115 L 115 115" stroke="#f97316" strokeWidth="2" strokeDasharray="10 20" className="animate-[dash_1.2s_linear_infinite]" opacity="0.6" />

               {/* Stuck Data Packets */}
               <circle cx="115" cy="85" r="2" fill="#f97316" filter="url(#glow-orange-2)" className="animate-pulse" />
               <circle cx="115" cy="100" r="2" fill="#f97316" filter="url(#glow-orange-2)" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
               <circle cx="115" cy="115" r="2" fill="#f97316" filter="url(#glow-orange-2)" className="animate-pulse" style={{ animationDelay: '0.4s' }} />

               {/* The Bottleneck Node */}
               <foreignObject x="110" y="60" width="80" height="80">
                 <div className="w-full h-full flex items-center justify-center relative">
                   {/* Main block */}
                   <div className="w-16 h-16 rounded-xl bg-gradient-to-b from-[#1a1a1c] to-[#0a0a0c] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_5px_15px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center relative z-10">
                     <Network className="w-6 h-6 text-gray-400 mb-2" />
                     {/* Error Bar */}
                     <div className="w-8 h-1 bg-gray-800 rounded-full overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]">
                       <div className="w-full h-full bg-orange-500 animate-pulse shadow-[0_0_5px_#f97316]" />
                     </div>
                   </div>
                   
                   {/* Blocked Output Port */}
                   <div className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-10 bg-[#0a0a0c] border border-orange-500/50 rounded-r shadow-[0_0_10px_rgba(249,115,22,0.2)] flex items-center justify-center z-0">
                     <div className="w-0.5 h-6 bg-orange-500 rounded-full animate-pulse" />
                   </div>
                 </div>
               </foreignObject>

               {/* Right side (Dead) */}
               <MiniCable d="M 185 85 L 300 85" opacity={0.2} />
               <MiniCable d="M 185 100 L 300 100" opacity={0.2} />
               <MiniCable d="M 185 115 L 300 115" opacity={0.2} />
             </svg>
          </div>

          <div className="px-6 pb-8 pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-white">Brittle Infrastructure</h3>
              <span className="font-mono text-[10px] text-gray-600 tracking-widest">ERR_02</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
              Stitching together disparate AI models and data sources results in fragile pipelines that break at scale and introduce unacceptable latency.
            </p>
          </div>
        </div>

        {/* Card 3: Security */}
        <div className="node-panel rounded-2xl p-1.5 flex flex-col relative overflow-hidden group">
          <div className="h-56 w-full bg-[#050505] rounded-xl border border-white/5 shadow-[inset_0_0_20px_rgba(0,0,0,1)] relative overflow-hidden mb-6 flex items-center justify-center">
             <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-20" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] pointer-events-none z-20" />
             
             <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
               <defs>
                 <filter id="glow-orange-3" x="-20%" y="-20%" width="140%" height="140%">
                   <feGaussianBlur stdDeviation="4" result="blur" />
                   <feComposite in="SourceGraphic" in2="blur" operator="over" />
                 </filter>
                 <pattern id="grid-3" width="20" height="20" patternUnits="userSpaceOnUse">
                   <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.05)" />
                 </pattern>
               </defs>
               <rect width="100%" height="100%" fill="url(#grid-3)" />

               {/* Background Cables */}
               <MiniCable d="M 0 100 L 300 100" opacity={0.5} />
               <MiniCable d="M 150 0 L 150 200" opacity={0.5} />

               <g transform="translate(150, 100)">
                 {/* Outer Ring */}
                 <circle cx="0" cy="0" r="60" fill="#0a0a0c" stroke="#2a2a2c" strokeWidth="2" />
                 <circle cx="0" cy="0" r="60" fill="none" stroke="#3a3a3c" strokeWidth="2" strokeDasharray="4 8" className="animate-[spin_20s_linear_infinite]" />
                 
                 {/* Middle Ring (Warning) */}
                 <circle cx="0" cy="0" r="45" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="20 10 5 10" className="animate-[spin_15s_linear_infinite_reverse]" filter="url(#glow-orange-3)" opacity="0.8" />
                 
                 {/* Inner Ring */}
                 <circle cx="0" cy="0" r="30" fill="#121214" stroke="#3a3a3c" strokeWidth="2" />
                 <circle cx="0" cy="0" r="30" fill="none" stroke="#4a4a4c" strokeWidth="2" strokeDasharray="10 5" className="animate-[spin_10s_linear_infinite]" />

                 {/* Center Chip */}
                 <rect x="-16" y="-16" width="32" height="32" rx="6" fill="#050505" stroke="#3a3a3c" strokeWidth="2" />
                 <foreignObject x="-12" y="-12" width="24" height="24">
                   <div className="w-full h-full flex items-center justify-center"><Lock className="w-4 h-4 text-gray-500" /></div>
                 </foreignObject>

                 {/* Warning Callout */}
                 <g transform="translate(30, -40)">
                   <path d="M 0 0 L 20 -20 L 80 -20" stroke="#f97316" strokeWidth="1" fill="none" opacity="0.8" />
                   <rect x="25" y="-27" width="50" height="14" rx="2" fill="#f97316" opacity="0.15" />
                   <text x="30" y="-17" fill="#f97316" fontSize="8" fontFamily="monospace" letterSpacing="1">UNVERIFIED</text>
                 </g>
               </g>
             </svg>
          </div>

          <div className="px-6 pb-8 pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-white">The Black Box Dilemma</h3>
              <span className="font-mono text-[10px] text-gray-600 tracking-widest">ERR_03</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
              Deploying AI at the edge or on-premise while maintaining strict security, compliance, and auditability is a logistical nightmare.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
