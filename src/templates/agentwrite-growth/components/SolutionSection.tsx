import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  ScanSearch, 
  Fingerprint, 
  Tags, 
  ImageIcon, 
  Sparkles, 
  Layers, 
  MousePointer2,
  FileText,
  Activity,
  Check,
  Globe,
  ArrowUpRight,
  Search,
  Database
} from 'lucide-react';

const SolutionSection: React.FC = () => {
  // State to trigger animation loops
  const [animationKey, setAnimationKey] = useState(0);

  // Restart animations every 8 seconds to create a clean loop
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 8000); 
    return () => clearInterval(interval);
  }, []);

  const marqueeItems = [
    { icon: <Fingerprint size={16} />, label: "Brand Voice Extraction" },
    { icon: <ScanSearch size={16} />, label: "Competitor Gap Analysis" },
    { icon: <Tags size={16} />, label: "SEO Meta Generation" },
    { icon: <ImageIcon size={16} />, label: "Auto-Featured Images" },
    { icon: <Sparkles size={16} />, label: "Human-Like Flow" },
    { icon: <Layers size={16} />, label: "Bulk Generation" },
    { icon: <Fingerprint size={16} />, label: "Brand Voice Extraction" },
    { icon: <ScanSearch size={16} />, label: "Competitor Gap Analysis" },
    { icon: <Tags size={16} />, label: "SEO Meta Generation" },
    { icon: <ImageIcon size={16} />, label: "Auto-Featured Images" },
    { icon: <Sparkles size={16} />, label: "Human-Like Flow" },
    { icon: <Layers size={16} />, label: "Bulk Generation" },
  ];

  return (
    <section className="w-full bg-[#F0EEE9] py-24 px-4 md:px-8 flex flex-col items-center overflow-hidden relative">
      
      {/* Background decoration: "Solution" pattern */}
      <div className="absolute top-20 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden text-[8rem] md:text-[12rem] font-black leading-none whitespace-nowrap z-0">
        AUTHORITY RANKING GROWTH CITATIONS
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-20 relative z-10 flex flex-col items-center">
        
        {/* Brutalist Badge */}
        <div className="inline-block bg-white border-2 border-black px-5 py-2 text-xs font-bold uppercase tracking-widest mb-8 hard-shadow-sm -rotate-2 hover:rotate-0 transition-transform cursor-default">
           <div className="flex items-center gap-2">
             <BrainCircuit size={16} className="text-[#EAB308]" />
             The Solution
           </div>
        </div>

        <h2 className="font-serif-display text-4xl md:text-6xl font-bold leading-[1.1] mb-6 text-[#1A1A1A]">
          We write for Modern AI <br />
          <span className="relative inline-block">
            <span className="relative z-10 italic">Search and Humans.</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-[#EAB308]/40 -z-0 skew-x-12"></span>
          </span>
        </h2>
        
        <p className="font-sans-tech text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Explore the content engine that drives traffic and engagement automatically.
          <br className="hidden md:block"/> No fluff. Just answers.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 z-10 relative">
        
        {/* Card 1: Strategic Content Mapping */}
        <div className="group bg-white border-2 border-black hard-shadow p-0 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
          <div className="p-8 pb-4 flex-grow">
            {/* Standardized Icon Box */}
            <div className="w-10 h-10 bg-gray-50 border-2 border-black flex items-center justify-center mb-6 hard-shadow-sm group-hover:bg-[#EAB308] transition-colors">
               <ScanSearch size={20} className="text-black" />
            </div>
            <h3 className="font-serif-display text-2xl font-bold mb-3">Strategic Content Mapping</h3>
            <p className="font-sans-tech text-sm text-gray-600 leading-relaxed">
              We don't just write; we plan. Our system conducts deep competitor research to identify real content gaps before a single word is generated.
            </p>
          </div>
          
          {/* ANIMATION 1: Gap Analysis Scanner (Colors: Gold Scan / Pink Alert) */}
          <div className="bg-gray-50 border-t-2 border-black h-[220px] relative overflow-hidden flex items-center justify-center p-6">
             {/* Background Grid */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px] opacity-40"></div>

             {/* Container for the UI Sequence */}
             <div className="relative w-full max-w-[260px] h-[160px] flex items-center justify-center" key={animationKey}>
                
                {/* PHASE 1: Search UI */}
                <div className="absolute inset-0 flex flex-col justify-center items-center z-20 search-ui-anim">
                    <div className="w-full bg-white border-2 border-black hard-shadow-sm rounded-sm p-2 flex flex-col gap-2">
                        <div className="w-full h-8 bg-gray-50 border border-gray-200 flex items-center px-3 gap-2">
                            <Search size={12} className="text-gray-400" />
                            <span className="text-[10px] font-mono text-gray-800">SaaS Pricing Models</span>
                        </div>
                        <div className="w-full bg-black text-white h-8 flex items-center justify-center text-[10px] font-bold tracking-wider relative overflow-hidden btn-click-target">
                            Analyze Market
                            {/* Button Click Ripple Effect */}
                            <div className="absolute inset-0 bg-[#EAB308] opacity-0 btn-ripple-anim"></div>
                        </div>
                    </div>
                </div>

                {/* Cursor Animation Layer */}
                <div className="absolute inset-0 z-30 pointer-events-none">
                    <div className="cursor-path-anim opacity-0 absolute bottom-0 right-0">
                         <MousePointer2 size={24} fill="black" className="text-white drop-shadow-md" />
                    </div>
                </div>

                {/* PHASE 2: Radar UI */}
                <div className="absolute inset-0 flex items-center justify-center z-10 radar-ui-anim opacity-0 scale-90">
                    <div className="relative w-32 h-32">
                        {/* Radar Circles */}
                        <div className="absolute inset-0 border border-gray-300 rounded-full opacity-50"></div>
                        <div className="absolute inset-4 border border-gray-300 rounded-full opacity-50"></div>
                        <div className="absolute inset-8 border border-gray-300 rounded-full opacity-50"></div>
                        <div className="absolute inset-0 border-r border-gray-200"></div>
                        <div className="absolute inset-0 border-b border-gray-200"></div>
                        
                        {/* Scanning Sector (Gold) */}
                        <div className="absolute inset-0 rounded-full radar-scan-anim" style={{ background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(234, 179, 8, 0.2) 360deg)' }}></div>

                        {/* Gap Found Dot (Pink Alert) */}
                        <div className="absolute top-8 left-8 w-3 h-3 bg-[#FF6B8B] rounded-full border-2 border-white shadow-sm gap-dot-anim opacity-0"></div>

                        {/* Tooltip */}
                        <div className="absolute -top-4 -right-12 bg-white border border-gray-200 p-2 hard-shadow-sm rounded-sm gap-tooltip-anim opacity-0 z-40">
                             <div className="text-[8px] font-bold text-gray-400 uppercase mb-0.5">GAP DETECTED</div>
                             <div className="text-[10px] font-bold text-black leading-none whitespace-nowrap">Enterprise Plans</div>
                        </div>
                    </div>
                </div>

             </div>
          </div>
        </div>

        {/* Card 2: Authentic Brand Voice */}
        <div className="group bg-white border-2 border-black hard-shadow p-0 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
          <div className="p-8 pb-4 flex-grow">
            {/* Standardized Icon Box */}
            <div className="w-10 h-10 bg-gray-50 border-2 border-black flex items-center justify-center mb-6 hard-shadow-sm group-hover:bg-[#FF6B8B] transition-colors">
               <Fingerprint size={20} className="text-black" />
            </div>
            <h3 className="font-serif-display text-2xl font-bold mb-3">Authentic Brand Voice</h3>
            <p className="font-sans-tech text-sm text-gray-600 leading-relaxed">
              We extract your unique brand tone to create human-like, authentic writing that LLMs love and readers trust.
            </p>
          </div>

          {/* ANIMATION 2: Extraction -> Calibration Flow (Colors: Pink = Human) */}
          <div className="bg-gray-100 border-t-2 border-black h-[220px] relative overflow-hidden flex items-center justify-center px-4" key={animationKey}>
             
             {/* Main Flex Container */}
             <div className="flex items-center justify-between w-full max-w-[280px]">
                
                {/* 1. SOURCE (Left) */}
                <div className="flex flex-col items-center gap-2 relative z-10">
                   <div className="w-14 h-14 bg-white border-2 border-black hard-shadow-sm rounded-lg flex items-center justify-center relative source-pulse-anim">
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF6B8B] rounded-full border border-white"></div>
                      <Fingerprint size={24} className="text-black" />
                   </div>
                   <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Source</span>
                </div>

                {/* 2. FLOW (Middle) */}
                <div className="flex-grow h-12 relative mx-2 flex items-center overflow-hidden">
                   {/* Track */}
                   <div className="absolute w-full h-[2px] bg-gray-300 top-1/2 -translate-y-1/2"></div>
                   
                   {/* Moving Particles (Pink) */}
                   <div className="absolute top-1/2 -translate-y-1/2 w-full h-4 flex items-center gap-4 particle-stream-anim opacity-0">
                      {[...Array(6)].map((_, i) => (
                         <div key={i} className="w-2 h-2 bg-[#FF6B8B] rounded-full shadow-sm"></div>
                      ))}
                   </div>
                </div>

                {/* 3. CALIBRATION ENGINE (Right) */}
                <div className="flex flex-col items-center gap-2 relative z-10">
                   <div className="h-14 w-16 flex items-center justify-center gap-[3px]">
                      {/* Animated Bars */}
                      {[...Array(5)].map((_, i) => (
                         <div 
                           key={i} 
                           className={`w-2 rounded-full transition-colors duration-500 bar-calibrate-anim-${i}`}
                         ></div>
                      ))}
                   </div>
                   <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">AI Voice</span>
                   
                   {/* 4. VALIDATION BADGE (Green Verified) */}
                   <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#10B981] text-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded-sm shadow-md whitespace-nowrap badge-pop-anim opacity-0">
                      Tone: Authentic
                   </div>
                </div>

             </div>

          </div>
        </div>

        {/* Card 3: Quality Articles */}
        <div className="group bg-white border-2 border-black hard-shadow p-0 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
          <div className="p-8 pb-4 flex-grow">
            {/* Standardized Icon Box */}
            <div className="w-10 h-10 bg-gray-50 border-2 border-black flex items-center justify-center mb-6 hard-shadow-sm group-hover:bg-[#10B981] transition-colors">
               <Activity size={20} className="text-black" />
            </div>
            <h3 className="font-serif-display text-2xl font-bold mb-3">Quality Articles</h3>
            <p className="font-sans-tech text-sm text-gray-600 leading-relaxed">
              We write deep, authoritative articles that satisfy human readers with complete answers and that quality is exactly what modern search engines reward.
            </p>
          </div>

          {/* ANIMATION 3: SERP & Growth Background (Colors: Emerald = Success) */}
          <div className="bg-gray-50 border-t-2 border-black h-[220px] relative overflow-hidden flex items-center justify-center p-6" key={animationKey}>
             
             {/* BACKGROUND GRAPH: Rises behind everything */}
             <div className="absolute inset-0 z-0 opacity-60">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 220">
                   <defs>
                      <linearGradient id="chartBgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                         <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
                         <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                      </linearGradient>
                   </defs>
                   {/* Area Fill */}
                   <path 
                      d="M0 220 C 120 200, 180 150, 400 20 L 400 220 Z" 
                      fill="url(#chartBgGradient)" 
                      className="chart-fill-anim opacity-0"
                   />
                   {/* Line */}
                   <path 
                      d="M0 220 C 120 200, 180 150, 400 20" 
                      fill="none" 
                      stroke="#10B981" 
                      strokeWidth="5" 
                      className="chart-line-anim"
                      strokeDasharray="1000"
                      strokeDashoffset="1000"
                   />
                </svg>
             </div>

             {/* FOREGROUND SERP CARD */}
             <div className="relative z-10 w-full max-w-[260px] bg-white p-3 border border-gray-200 shadow-xl rounded-sm serp-slide-anim opacity-0 translate-y-4">
                <div className="flex items-center gap-2 mb-1">
                   <div className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Globe size={10} className="text-gray-400" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[8px] text-gray-800">agentwrite.ai</span>
                      <span className="text-[8px] text-[#10B981] truncate">https://agentwrite.ai/blog/aeo-optimization</span>
                   </div>
                </div>
                <div className="text-xs text-[#1a0dab] font-serif hover:underline cursor-pointer mb-0.5 font-medium leading-tight">
                   The Complete Guide to AEO Optimization in 2024
                </div>
                <div className="text-[9px] text-gray-600 leading-snug">
                   Stop optimizing for keywords. Learn how to structure content for answer engines like Perplexity...
                </div>

                {/* Validation Stamp */}
                <div className="absolute -top-3 -right-3 bg-[#10B981] text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rotate-12 shadow-lg border-2 border-white stamp-anim opacity-0 scale-150 z-20">
                   High Authority
                </div>
             </div>

          </div>
        </div>

      </div>

      {/* Marquee Section */}
      <div className="w-full border-y-2 border-black bg-white py-4 overflow-hidden relative z-20">
        <div className="flex w-max animate-marquee">
          {marqueeItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 px-6 py-2 mx-4 bg-gray-50 border border-gray-200 rounded-full min-w-max text-sm font-bold text-gray-600 hover:bg-gray-100 hover:border-black hover:text-black transition-colors cursor-default">
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </div>
      
      {/* GLOBAL CSS ANIMATIONS */}
      <style>{`
        /* Marquee */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        /* --- CARD 1: 3-STAGE SEARCH ANIMATION --- */
        .search-ui-anim {
           animation: fadeOutUI 8s ease-in-out infinite;
        }
        .radar-ui-anim {
           animation: fadeInUI 8s ease-in-out infinite;
        }
        .cursor-path-anim {
           animation: cursorClickFlow 8s ease-in-out infinite;
        }
        .btn-ripple-anim {
           animation: btnRipple 8s ease-out infinite;
        }
        .radar-scan-anim {
           animation: radarSpin 2s linear infinite;
        }
        .gap-dot-anim {
           animation: gapDotReveal 8s ease-out infinite;
        }
        .gap-tooltip-anim {
           animation: gapTooltipReveal 8s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
        }

        @keyframes cursorClickFlow {
           0% { transform: translate(50px, 100px); opacity: 0; }
           15% { transform: translate(50px, 100px); opacity: 1; }
           30% { transform: translate(40px, -20px); opacity: 1; } /* Position over button */
           35% { transform: translate(40px, -20px) scale(0.9); } /* Click press */
           40% { transform: translate(40px, -20px) scale(1); opacity: 1; }
           45% { transform: translate(40px, -20px); opacity: 0; } /* Fade out with UI */
           100% { transform: translate(40px, -20px); opacity: 0; }
        }

        @keyframes btnRipple {
           0%, 35% { opacity: 0; }
           36% { opacity: 0.5; }
           45% { opacity: 0; }
           100% { opacity: 0; }
        }

        @keyframes fadeOutUI {
           0%, 45% { opacity: 1; transform: scale(1); }
           50% { opacity: 0; transform: scale(0.9); }
           95% { opacity: 0; transform: scale(0.9); }
           100% { opacity: 1; transform: scale(1); } /* Reset */
        }

        @keyframes fadeInUI {
           0%, 45% { opacity: 0; transform: scale(1.1); }
           50% { opacity: 1; transform: scale(1); }
           90% { opacity: 1; transform: scale(1); }
           95% { opacity: 0; transform: scale(1.1); } /* Reset */
           100% { opacity: 0; }
        }

        @keyframes radarSpin {
           0% { transform: rotate(0deg); }
           100% { transform: rotate(360deg); }
        }

        @keyframes gapDotReveal {
           0%, 65% { opacity: 0; transform: scale(0); }
           70% { opacity: 1; transform: scale(1.2); }
           75% { opacity: 1; transform: scale(1); }
           100% { opacity: 1; transform: scale(1); }
        }

        @keyframes gapTooltipReveal {
           0%, 70% { opacity: 0; transform: translateY(10px) scale(0.9); }
           75% { opacity: 1; transform: translateY(0) scale(1); }
           100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* --- CARD 2: EXTRACTION FLOW --- */
        .source-pulse-anim { animation: sourcePulse 8s infinite; }
        .particle-stream-anim { animation: streamFlow 8s linear infinite; }
        .badge-pop-anim { animation: badgePop 8s ease-out infinite; }
        
        .bar-calibrate-anim-0 { animation: calibrateBar 8s infinite; animation-delay: 0.0s; }
        .bar-calibrate-anim-1 { animation: calibrateBar 8s infinite; animation-delay: 0.1s; }
        .bar-calibrate-anim-2 { animation: calibrateBar 8s infinite; animation-delay: 0.2s; }
        .bar-calibrate-anim-3 { animation: calibrateBar 8s infinite; animation-delay: 0.3s; }
        .bar-calibrate-anim-4 { animation: calibrateBar 8s infinite; animation-delay: 0.4s; }

        @keyframes sourcePulse {
           0%, 10% { transform: scale(1); border-color: black; }
           15%, 35% { transform: scale(1.05); border-color: #FF6B8B; } /* Pink Active */
           40%, 100% { transform: scale(1); border-color: black; }
        }

        @keyframes streamFlow {
           0%, 10% { opacity: 0; transform: translateX(-20px); }
           15% { opacity: 1; transform: translateX(0); } /* Start Flow */
           40% { opacity: 1; transform: translateX(40px); } /* End Flow */
           45%, 100% { opacity: 0; transform: translateX(40px); }
        }

        @keyframes calibrateBar {
           0%, 20% { height: 20%; background-color: #d1d5db; } /* Grey Static */
           25% { height: 60%; background-color: #9ca3af; } /* Jitter */
           30% { height: 30%; background-color: #9ca3af; }
           35% { height: 80%; background-color: #FF6B8B; } /* Pink Transition */
           40% { height: 50%; background-color: #FF6B8B; } /* Smooth Wave */
           45% { height: 90%; background-color: #FF6B8B; }
           50%, 80% { height: 50%; background-color: #FF6B8B; } /* Stable Human */
           90%, 100% { height: 20%; background-color: #d1d5db; } /* Reset */
        }

        @keyframes badgePop {
           0%, 45% { opacity: 0; transform: translate(-50%, 10px) scale(0.8); }
           50% { opacity: 1; transform: translate(-50%, 0) scale(1.1); }
           55%, 85% { opacity: 1; transform: translate(-50%, 0) scale(1); }
           90%, 100% { opacity: 0; transform: translate(-50%, 0) scale(1); }
        }

        /* --- CARD 3: SERP & GROWTH --- */
        .serp-slide-anim {
           animation: slideUp 8s cubic-bezier(0.22, 1, 0.36, 1) infinite;
           animation-delay: 0s;
        }
        .stamp-anim {
           animation: stampDown 8s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
           animation-delay: 1.5s;
        }
        .chart-line-anim {
           animation: drawLine 8s ease-out infinite;
           animation-delay: 1.8s; /* Start drawing after stamp */
        }
        .chart-fill-anim {
           animation: fadeInFill 8s ease-out infinite;
           animation-delay: 2.2s;
        }

        @keyframes slideUp {
           0% { transform: translateY(20px); opacity: 0; }
           10% { transform: translateY(0); opacity: 1; }
           90% { transform: translateY(0); opacity: 1; }
           100% { transform: translateY(-10px); opacity: 0; }
        }
        @keyframes stampDown {
           0%, 18% { transform: scale(2) rotate(12deg); opacity: 0; }
           20%, 85% { transform: scale(1) rotate(12deg); opacity: 1; }
           90%, 100% { opacity: 0; }
        }
        @keyframes drawLine {
           0% { stroke-dashoffset: 1000; opacity: 1; }
           30%, 80% { stroke-dashoffset: 0; opacity: 1; }
           100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes fadeInFill {
           0% { opacity: 0; }
           10%, 80% { opacity: 1; }
           100% { opacity: 0; }
        }

      `}</style>

    </section>
  );
};

export default SolutionSection;