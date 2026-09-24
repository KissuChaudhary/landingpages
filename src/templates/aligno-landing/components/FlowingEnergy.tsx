import React from 'react';

export const FlowingEnergy = () => {
  return (
    <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-20 md:h-24 z-0 pointer-events-none opacity-80">
      <svg
        viewBox="0 0 1000 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="energy-gradient" x1="500" y1="0" x2="500" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFDAC2" stopOpacity="0" />
            <stop offset="20%" stopColor="#FFDAC2" stopOpacity="1" />
            <stop offset="80%" stopColor="#FF8F70" stopOpacity="1" />
            <stop offset="100%" stopColor="#FF8F70" stopOpacity="0" />
          </linearGradient>
          
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 
          Strands:
          Origin: 500, 0 (Top Center)
          Destinations: Distributed along y=150 (Bottom Edge)
        */}
        
        {/* Group 1: Outer Left */}
        <Path d="M500 0 C500 40 200 60 150 150" delay={0} duration={3} />
        
        {/* Group 2: Mid Left */}
        <Path d="M500 0 C500 50 350 70 300 150" delay={1.5} duration={4} />
        
        {/* Group 3: Inner Left */}
        <Path d="M500 0 C500 60 450 80 420 150" delay={0.5} duration={2.5} />
        
        {/* Group 4: Center (Straight down) */}
        <Path d="M500 0 C500 80 500 100 500 150" delay={2} duration={3} />
        
        {/* Group 5: Inner Right */}
        <Path d="M500 0 C500 60 550 80 580 150" delay={0.8} duration={2.8} />
        
        {/* Group 6: Mid Right */}
        <Path d="M500 0 C500 50 650 70 700 150" delay={1.2} duration={4.2} />
        
        {/* Group 7: Outer Right */}
        <Path d="M500 0 C500 40 800 60 850 150" delay={0.3} duration={3.5} />

        {/* Landing Pads (Where energy hits the dashboard) at y=150 */}
        <circle cx="150" cy="150" r="2" fill="#FFDAC2" opacity="0.5" />
        <circle cx="300" cy="150" r="2" fill="#FFDAC2" opacity="0.5" />
        <circle cx="420" cy="150" r="2" fill="#FFDAC2" opacity="0.5" />
        <circle cx="500" cy="150" r="2" fill="#FFDAC2" opacity="0.5" />
        <circle cx="580" cy="150" r="2" fill="#FFDAC2" opacity="0.5" />
        <circle cx="700" cy="150" r="2" fill="#FFDAC2" opacity="0.5" />
        <circle cx="850" cy="150" r="2" fill="#FFDAC2" opacity="0.5" />

      </svg>
      
      <style>{`
        @keyframes flow {
          0% { stroke-dashoffset: 1000; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const Path = ({ d, delay, duration }: { d: string, delay: number, duration: number }) => {
  return (
    <>
      {/* Background Dim Path (The "Wire") */}
      <path 
        d={d} 
        stroke="rgba(255, 218, 194, 0.1)" 
        strokeWidth="1" 
        fill="none"
      />
      
      {/* Foreground Glowing Energy Pulse */}
      <path
        d={d}
        stroke="url(#energy-gradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="100 900" 
        filter="url(#glow)"
        style={{
          animation: `flow ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
        }}
      />
    </>
  )
}