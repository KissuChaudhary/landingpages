import React, { useState, useEffect } from 'react';
import { ScanFace, Fingerprint, Bot, AlertTriangle, CheckCircle2, Timer, PauseCircle, PlayCircle, ShieldAlert, ShieldCheck } from 'lucide-react';

const TuringTestSection = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Automated Loop Logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIsRevealed((prev) => !prev);
    }, 5000); 

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-24 bg-cream border-b border-ink relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
            
            {/* Header Block */}
            <div className="flex flex-col md:flex-row gap-12 md:items-end justify-between mb-20">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-ink text-white font-mono text-xs font-bold tracking-widest uppercase mb-6 shadow-brutalist-sm">
                        <ShieldCheck size={12} />
                        Live Diagnostics
                    </div>
                    <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] text-ink">
                        Pass the SOC2 <br/>
                        <span className="italic font-light text-ink/70">Security Audit.</span>
                    </h2>
                </div>
                <div className="max-w-sm">
                    <p className="font-mono text-sm text-ink/70 leading-relaxed border-l-2 border-signal pl-6">
                        We engineer authentication flows that pass the strictest enterprise security standards. Watch the live diagnostic below.
                    </p>
                </div>
            </div>

            {/* The Interaction Unit - With Hover Pause */}
            <div 
                className="w-full bg-white border border-ink shadow-brutalist flex flex-col group/panel"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                
                {/* Control Deck (Toolbar) */}
                <div className="h-14 border-b border-ink bg-[#f5f5f5] flex items-center justify-between px-6 relative overflow-hidden">
                    
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="flex gap-1.5">
                            <div className={`w-2.5 h-2.5 rounded-full border border-ink/40 transition-colors duration-600 ${!isPaused ? 'bg-signal animate-pulse' : 'bg-ink/20'}`}></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-ink/20 border border-ink/40"></div>
                        </div>
                        <span className="font-mono text-[10px] text-ink/40 tracking-widest uppercase border-l border-ink/10 pl-4 py-1 flex items-center gap-2">
                            AUDIT_SUBJECT_ID: #8821A
                            {isPaused && <span className="text-signal font-bold">[PAUSED]</span>}
                        </span>
                    </div>

                    {/* Status Indicator */}
                    <div className="flex items-center gap-3 relative z-10">
                         <span className="font-mono text-[10px] font-bold uppercase hidden md:block text-ink/60">
                            {isRevealed ? 'STATUS: VULNERABILITY_DETECTED' : 'STATUS: AUDIT_IN_PROGRESS'}
                         </span>
                         <div className="h-8 bg-white border border-ink shadow-[2px_2px_0px_0px_#1a1a1a] flex items-center gap-2 px-3 transition-all">
                            {isPaused ? <PauseCircle size={14} className="text-signal" /> : <Timer size={14} className="animate-spin-slow" />}
                            <span className="font-mono text-xs font-bold uppercase tracking-wider">
                                {isPaused ? 'Resume' : 'Auto-Cycle'}
                            </span>
                         </div>
                    </div>
                </div>

                {/* The Split View Content */}
                <div className="flex flex-col md:flex-row">
                    
                    {/* LEFT PANEL: Custom Auth (The 'Bad' Result) */}
                    <div className={`
                        flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-ink relative transition-colors duration-1000 ease-in-out
                        ${isRevealed ? 'bg-[#f0f0f0]' : 'bg-white'}
                    `}>
                        {/* Header Label */}
                        <div className="flex justify-between items-center mb-8 h-8">
                            <div className="font-mono text-[10px] uppercase tracking-widest border border-ink/20 px-2 py-1 bg-white text-ink/50">
                                Stack_A
                            </div>
                            <div className={`flex items-center gap-2 text-red-600 font-mono text-xs font-bold transition-opacity duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
                                <ShieldAlert size={14} /> CUSTOM IMPLEMENTATION
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="relative">
                            <p className={`font-mono text-sm leading-relaxed transition-all duration-1000 ease-in-out ${isRevealed ? 'text-ink/40 blur-[0.5px]' : 'text-ink/80'}`}>
                                1. User logs in with weak password.<br/>
                                2. Session stored in localStorage.<br/>
                                3. No CSRF protection on API.<br/>
                                4. Database password stored in plain text.
                            </p>
                            
                            {/* Overlay Stamp */}
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out ${isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                                <div className="border-4 border-red-600/40 text-red-600/40 font-mono font-bold text-4xl uppercase p-4 -rotate-12 whitespace-nowrap">
                                    FAILED
                                </div>
                            </div>
                        </div>

                        {/* Analysis Footer */}
                        <div className={`mt-12 pt-6 border-t border-ink/10 transition-all duration-1000 ease-in-out ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                             <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-[10px] text-ink/40 uppercase">Compliance_Score</span>
                                <div className="w-32 h-2 bg-ink/5 rounded-full overflow-hidden">
                                    <div className="h-full w-[12%] bg-red-500"></div>
                                </div>
                             </div>
                             <div className="flex items-center gap-2 text-red-600 font-mono text-[10px]">
                                <AlertTriangle size={12} />
                                <span>DETECTED: XSS Vulnerability, No Salt</span>
                             </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: LoomAuth (The 'Good' Result) */}
                    <div className="flex-1 p-8 md:p-12 relative bg-white group">
                         {/* Header Label */}
                         <div className="flex justify-between items-center mb-8 h-8">
                            <div className="font-mono text-[10px] uppercase tracking-widest border border-ink/20 px-2 py-1 bg-white text-ink/50">
                                Stack_B
                            </div>
                            <div className={`flex items-center gap-2 text-signal font-mono text-xs font-bold transition-all duration-1000 ease-in-out ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                                <ShieldCheck size={14} /> LOOM ENGINE
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="relative">
                             <p className="font-serif text-2xl md:text-3xl text-ink leading-tight mb-4 transition-colors duration-1000">
                                "Security isn't a feature; it's the foundation. <span className={`transition-colors duration-1000 ${isRevealed ? 'bg-signal/20 text-signal' : ''}`}>Zero-Trust</span> architecture ensures every request is authenticated, authorized, and audited."
                            </p>
                        </div>

                        {/* Analysis Footer */}
                         <div className={`mt-12 pt-6 border-t border-ink/10 transition-all duration-1000 ease-in-out ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                             <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-[10px] text-ink/40 uppercase">Compliance_Score</span>
                                <div className="w-32 h-2 bg-ink/5 rounded-full overflow-hidden">
                                    <div className="h-full w-[100%] bg-signal"></div>
                                </div>
                             </div>
                             <div className="flex items-center gap-2 text-green-600 font-mono text-[10px]">
                                <CheckCircle2 size={12} />
                                <span>PASSED: SOC2 Type II Compliant</span>
                             </div>
                        </div>

                        {/* Decorative 'Active' Indicator line on right edge */}
                        <div className={`absolute top-0 right-0 bottom-0 w-1 bg-signal transition-opacity duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}></div>
                    </div>

                </div>
            </div>
            
        </div>
    </section>
  );
};

export default TuringTestSection;