import React from 'react';
import { cn } from '../lib/utils';
import { ArrowUpRight, Zap, ArrowRight, Github, Slack, Figma, Layers } from 'lucide-react';

interface CardWrapperProps {
  children?: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ 
  children, 
  className, 
  noPadding = false 
}) => (
  <div className={cn(
    "relative overflow-hidden rounded-3xl bg-[#0A0A0A] border border-white/10 group transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]",
    className
  )}>
    {/* Noise Texture */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
    
    {/* Subtle Gradient Glow from Top */}
    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
    
    <div className={cn("relative z-10 h-full", noPadding ? "p-0" : "p-6 md:p-8")}>
      {children}
    </div>
  </div>
);

// --- Custom Components for Inner Content ---

const IntegrationsGraphic = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center p-8 pb-16">
            <div className="relative w-full h-full max-w-[240px] max-h-[160px] flex items-center justify-center">
                
                {/* Connecting Lines (Behind) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                    {/* Center to Top Left */}
                    <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="white" strokeWidth="1" />
                    {/* Center to Top Right */}
                    <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="white" strokeWidth="1" />
                    {/* Center to Bottom */}
                    <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="white" strokeWidth="1" />
                    
                    {/* Connection Dots on lines */}
                    <circle cx="35%" cy="35%" r="2" fill="white" />
                    <circle cx="65%" cy="35%" r="2" fill="white" />
                    <circle cx="50%" cy="67%" r="2" fill="white" />
                </svg>

                {/* 1. Peripheral Node: GitHub (Top Left) */}
                <div className="absolute top-0 left-0 p-2.5 rounded-xl bg-[#1A1A1A] border border-white/10 shadow-lg flex items-center justify-center z-10 group/node hover:border-white/30 transition-colors">
                    <Github className="w-5 h-5 text-white/70" />
                </div>

                {/* 2. Peripheral Node: Slack (Top Right) */}
                <div className="absolute top-0 right-0 p-2.5 rounded-xl bg-[#1A1A1A] border border-white/10 shadow-lg flex items-center justify-center z-10 group/node hover:border-white/30 transition-colors">
                    <Slack className="w-5 h-5 text-white/70" />
                </div>

                {/* 3. Peripheral Node: Figma (Bottom Center) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 p-2.5 rounded-xl bg-[#1A1A1A] border border-white/10 shadow-lg flex items-center justify-center z-10 group/node hover:border-white/30 transition-colors">
                    <Figma className="w-5 h-5 text-white/70" />
                </div>
            </div>
        </div>
    )
}

const AnalyticsChart = () => {
  // Mock Data for the chart
  const bars = [40, 65, 50, 85, 60, 75, 50]; 
  
  return (
    <div className="relative w-full h-full flex flex-col justify-end mt-4">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
        <div className="w-full h-[1px] bg-white border-t border-dashed border-white/50" />
        <div className="w-full h-[1px] bg-white border-t border-dashed border-white/50" />
        <div className="w-full h-[1px] bg-white border-t border-dashed border-white/50" />
      </div>

      {/* Bars & Line Container - Increased height to 180px for taller card */}
      <div className="relative h-[180px] w-full flex items-end justify-between gap-2 md:gap-4 px-2">
        {bars.map((height, i) => {
           // Highlight the 4th bar (index 3)
           const isActive = i === 3;
           return (
             <div key={i} className="relative w-full flex flex-col justify-end group/bar">
                {/* Tooltip on Hover */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-2 py-1 rounded-md text-[10px] opacity-0 group-hover/bar:opacity-100 transition-opacity">
                    {height}%
                </div>
                
                {/* The Bar */}
                <div 
                  className={cn(
                    "w-full rounded-t-sm transition-all duration-700 ease-out",
                    isActive 
                        ? "bg-gradient-to-t from-[#FF8F70] to-[#FFDAC2] shadow-[0_0_15px_rgba(255,218,194,0.4)]" 
                        : "bg-white/10 hover:bg-white/20"
                  )}
                  style={{ height: `${height}%` }}
                />
             </div>
           )
        })}
        
        {/* SVG Line Overlay */}
        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" preserveAspectRatio="none">
             <path 
                d="M 5 100 C 20 80, 40 60, 55 70 S 90 20, 110 25 S 150 60, 170 50 S 210 30, 230 60"
                fill="none"
                stroke="#FFDAC2"
                strokeWidth="2"
                strokeOpacity="0.5"
                className="drop-shadow-lg"
                vectorEffect="non-scaling-stroke" 
             />
             {/* Gradient Area under line */}
             <path 
                d="M 5 100 C 20 80, 40 60, 55 70 S 90 20, 110 25 S 150 60, 170 50 S 210 30, 230 60 V 200 H 5 Z"
                fill="url(#chartGradient)"
                opacity="0.2"
                vectorEffect="non-scaling-stroke"
             />
             <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFDAC2" />
                    <stop offset="100%" stopColor="transparent" />
                </linearGradient>
             </defs>
        </svg>
      </div>
      
      {/* X-Axis Labels */}
      <div className="flex justify-between w-full mt-4 px-2 text-[10px] md:text-xs text-muted-foreground font-mono uppercase tracking-wider">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span className="text-[#FFDAC2] font-bold">Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  )
}

const SprintList = () => (
    <div className="flex flex-col gap-3 w-full">
        {[
            { label: "Design System", status: "Done" },
            { label: "Hero Animation", status: "In Progress" },
            { label: "Mobile Responsive", status: "Pending" },
        ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-colors group/item">
                <div className="flex items-center gap-3">
                    {/* Status Indicator Logic */}
                    <div className={cn(
                        "w-2.5 h-2.5 rounded-full", 
                        item.status === "Done" ? "bg-[#FFDAC2] shadow-[0_0_8px_rgba(255,218,194,0.5)]" : 
                        item.status === "In Progress" ? "border-[1.5px] border-[#FFDAC2] bg-transparent" :
                        "bg-white/20"
                    )} />
                    
                    <span className={cn(
                        "text-sm font-medium transition-colors",
                        item.status === "Pending" ? "text-white/40" : "text-white/80"
                    )}>
                        {item.label}
                    </span>
                </div>
                
                {/* Arrow only visible on hover */}
                <div className="opacity-0 group-hover/item:opacity-100 transition-opacity transform group-hover/item:translate-x-1 duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-white/60" />
                </div>
            </div>
        ))}
    </div>
)

// --- Premium Global Network Visualization (Replaces Globe) ---
const GlobalNetwork = () => {
    return (
        <div className="absolute inset-x-0 bottom-0 h-[300px] w-full select-none pointer-events-none overflow-hidden flex items-end justify-center perspective-1000">
            
            {/* Ambient Glow */}
            <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FFDAC2]/10 blur-[100px] rounded-full mix-blend-screen" />

            {/* Layered Cards Container */}
            <div className="relative w-full max-w-[500px] h-[240px] flex justify-center items-end" style={{ transformStyle: 'preserve-3d' }}>
                
                {/* Back Card */}
                <div className="absolute bottom-[-20px] w-[70%] h-[180px] bg-white/[0.02] border border-white/5 rounded-t-3xl shadow-2xl transform translate-y-[-40px] scale-90 opacity-50 backdrop-blur-sm" />
                
                {/* Middle Card */}
                <div className="absolute bottom-[-10px] w-[85%] h-[200px] bg-white/[0.04] border border-white/10 rounded-t-3xl shadow-2xl transform translate-y-[-20px] scale-95 opacity-80 backdrop-blur-md" />

                {/* Front Active Card */}
                <div className="relative w-[100%] h-[220px] bg-[#111111]/90 backdrop-blur-xl border border-white/10 rounded-t-3xl shadow-2xl overflow-hidden flex flex-col transform translate-y-0">
                    
                    {/* Header bar */}
                    <div className="h-12 border-b border-white/5 flex items-center px-6 gap-3 bg-white/[0.02]">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        </div>
                        <div className="ml-auto flex -space-x-2">
                            <div className="w-7 h-7 rounded-full border-2 border-[#111111] bg-[#FFDAC2] flex items-center justify-center text-[10px] text-black font-bold z-20">S</div>
                            <div className="w-7 h-7 rounded-full border-2 border-[#111111] bg-[#34D399] flex items-center justify-center text-[10px] text-black font-bold z-10">K</div>
                            <div className="w-7 h-7 rounded-full border-2 border-[#111111] bg-white/10 flex items-center justify-center text-[10px] text-white font-medium z-0">+3</div>
                        </div>
                    </div>
                    
                    {/* Content Area */}
                    <div className="flex-1 p-6 relative">
                        {/* Skeleton lines */}
                        <div className="space-y-5 opacity-50">
                            <div className="h-5 w-1/3 bg-white/10 rounded-md" />
                            <div className="space-y-3">
                                <div className="h-2.5 w-full bg-white/5 rounded-md" />
                                <div className="h-2.5 w-5/6 bg-white/5 rounded-md" />
                                <div className="h-2.5 w-4/6 bg-white/5 rounded-md" />
                            </div>
                        </div>

                        {/* Cursor 1 - Sarah */}
                        <div className="absolute top-12 left-[20%] animate-float-cursor-1">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FFDAC2] drop-shadow-md transform -rotate-12">
                                <path d="M5.65376 21.3113L3.10604 3.47353C2.86438 1.78166 4.71536 0.58913 6.18206 1.4897L21.0506 10.613C22.4578 11.4764 22.3168 13.5658 20.8163 14.2255L14.4716 17.0141C14.1568 17.1525 13.8887 17.381 13.7042 17.6713L10.3683 22.9213C9.53932 24.2259 7.55169 23.9515 7.12579 22.476L5.65376 21.3113Z" fill="currentColor"/>
                            </svg>
                            <div className="mt-1 ml-4 px-2.5 py-1 bg-[#FFDAC2] text-black text-[10px] font-bold rounded-full shadow-lg w-max tracking-wide">
                                Sarah
                            </div>
                        </div>

                        {/* Cursor 2 - Kenji */}
                        <div className="absolute top-24 right-[25%] animate-float-cursor-2">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#34D399] drop-shadow-md transform -rotate-12">
                                <path d="M5.65376 21.3113L3.10604 3.47353C2.86438 1.78166 4.71536 0.58913 6.18206 1.4897L21.0506 10.613C22.4578 11.4764 22.3168 13.5658 20.8163 14.2255L14.4716 17.0141C14.1568 17.1525 13.8887 17.381 13.7042 17.6713L10.3683 22.9213C9.53932 24.2259 7.55169 23.9515 7.12579 22.476L5.65376 21.3113Z" fill="currentColor"/>
                            </svg>
                            <div className="mt-1 ml-4 px-2.5 py-1 bg-[#34D399] text-black text-[10px] font-bold rounded-full shadow-lg w-max tracking-wide">
                                Kenji
                            </div>
                        </div>
                    </div>
                    
                    {/* Bottom Fade for the card content */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#111111] to-transparent pointer-events-none" />
                </div>
            </div>

            <style>{`
                @keyframes float-cursor-1 {
                    0%, 100% { transform: translate(0px, 0px); }
                    33% { transform: translate(40px, -20px); }
                    66% { transform: translate(-15px, 25px); }
                }
                @keyframes float-cursor-2 {
                    0%, 100% { transform: translate(0px, 0px); }
                    33% { transform: translate(-30px, 20px); }
                    66% { transform: translate(25px, -15px); }
                }
                .animate-float-cursor-1 {
                    animation: float-cursor-1 8s ease-in-out infinite;
                }
                .animate-float-cursor-2 {
                    animation: float-cursor-2 9s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};


const BentoGrid = () => {
  return (
    <section className="w-full bg-[#030303] py-20 px-4 md:py-32 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 space-y-4">
            <h2 className="text-3xl md:text-5xl font-sans text-white tracking-tight">
                Master Your <span className="font-serif italic text-[#FFDAC2]">Workflow</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
                Experience a suite of powerful features designed to streamline your process, from analytics to global collaboration.
            </p>
        </div>

        {/* 
            BENTO GRID LAYOUT 
            Desktop: 3 Columns.
            Row 1: Analytics (1 Col) & Global (2 Cols) -> Equal Height (e.g., 400px)
            Row 2: Integrations (1 Col) & Sprint (2 Cols) -> Equal Height (e.g., 280px)
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. ANALYTICS CARD (Col 1, Row 1) */}
            <CardWrapper className="md:col-span-1 md:h-[400px] flex flex-col justify-between">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="p-2 rounded-lg bg-white/5 w-fit">
                            <ArrowUpRight className="w-4 h-4 text-[#FFDAC2]" />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold border border-white/10 px-2 py-0.5 rounded-full">Live Data</span>
                    </div>
                    
                    <div className="pt-4">
                        <h3 className="text-xl text-white font-medium">Advance Analytics</h3>
                        <p className="text-sm text-white/50 mt-1">Unlock valuable insights.</p>
                    </div>
                </div>

                <div className="w-full grow flex items-end">
                    <AnalyticsChart />
                </div>
            </CardWrapper>

            {/* 2. GLOBAL CARD (Col 2 & 3, Row 1) */}
            {/* Replaced Heavy 3D Globe with Lightweight GlobalNetwork Component */}
            <CardWrapper className="md:col-span-2 md:h-[400px] flex flex-col items-center justify-start pt-12 md:pt-16 relative overflow-hidden">
                 {/* Text Content */}
                 <div className="relative z-30 max-w-2xl mx-auto text-center px-6 space-y-4">
                     <h3 className="text-2xl md:text-3xl text-white font-medium tracking-tight">Real-Time Global Collaboration</h3>
                     <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
                         Collaborate seamlessly with teams across the globe. Stay connected and work together in real time.
                     </p>
                 </div>

                 {/* The New Premium Lightweight Network Visual */}
                 <GlobalNetwork />
                 
            </CardWrapper>

            {/* 4. SPRINT CARD (Col 2 & 3, Row 2) */}
            <CardWrapper className="md:col-span-2 md:h-[280px] flex flex-col justify-center">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 h-full">
                    
                    {/* Left Side: Header */}
                    <div className="space-y-4 md:max-w-[30%]">
                         <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-[#FFDAC2]/10 w-fit">
                                <Zap className="w-4 h-4 text-[#FFDAC2]" />
                            </div>
                            <span className="text-sm font-medium text-[#FFDAC2]/80">On Track</span>
                        </div>
                        <div>
                            <h3 className="text-xl text-white font-medium mb-2">Sprint Planning</h3>
                            <p className="text-sm text-white/50">Manage your sprints efficiently with our tracking tools.</p>
                        </div>
                    </div>

                    {/* Right Side: List */}
                    <div className="flex-1 md:pl-8 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0">
                         <SprintList />
                    </div>

                </div>
            </CardWrapper>

            {/* 3. INTEGRATIONS CARD (Col 1, Row 2) */}
            <CardWrapper noPadding className="md:col-span-1 md:h-[280px] group flex flex-col">
                {/* Top Half: Graphic Area */}
                <div className="relative h-[60%] w-full overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
                    <IntegrationsGraphic />
                </div>
                
                {/* Bottom Half: Content */}
                <div className="relative z-10 p-6 pt-0 grow flex flex-col justify-center">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg text-white font-medium">Seamless Integrations</h3>
                            <ArrowUpRight className="w-4 h-4 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-sm text-white/50 leading-relaxed">
                            Connect Aligno with your favorite tools.
                        </p>
                    </div>
                </div>
            </CardWrapper>

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;