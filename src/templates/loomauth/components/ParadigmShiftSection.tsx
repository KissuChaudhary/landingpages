import React from 'react';
import { Archive, ArrowRight, SearchX, Sparkles, TrendingDown, TrendingUp, MousePointer2, MessageSquare, Target, ShieldAlert, KeyRound, Fingerprint } from 'lucide-react';

const ParadigmShiftSection = () => {
  return (
    <section className="py-24 bg-white border-b border-ink relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
            
            {/* Header Block */}
            <div className="flex flex-col md:flex-row gap-12 md:items-end justify-between mb-20">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-ink text-white font-mono text-xs font-bold tracking-widest uppercase mb-6 shadow-brutalist-sm">
                        <Archive size={12} />
                        Security Shift
                    </div>
                    <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] text-ink">
                        Passwords <br/>
                        <span className="italic font-light text-ink/70">are dead.</span>
                    </h2>
                </div>
                <div className="max-w-sm">
                    <p className="font-mono text-sm text-ink/70 leading-relaxed border-l-2 border-red-500 pl-6">
                        <span className="font-bold text-red-600 block mb-1">CRITICAL ALERT:</span>
                        81% of hacking-related breaches leverage either stolen and/or weak passwords. It's time to upgrade.
                    </p>
                </div>
            </div>

            {/* Comparison Chassis */}
            <div className="w-full border border-ink shadow-brutalist flex flex-col">
                
                {/* Protocol Header */}
                <div className="flex border-b border-ink bg-[#f5f5f5]">
                    <div className="flex-1 p-3 border-r border-ink flex items-center justify-between opacity-50">
                        <span className="font-mono text-[10px] uppercase tracking-widest hidden sm:inline">PROTOCOL: AUTH_LEGACY</span>
                        <span className="font-mono text-[10px] uppercase tracking-widest sm:hidden">LEGACY</span>
                        <div className="px-1.5 py-0.5 border border-ink/20 text-[8px] font-mono uppercase bg-gray-200 text-ink/50">Deprecated</div>
                    </div>
                    <div className="flex-1 p-3 flex items-center justify-between bg-white">
                         <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-signal hidden sm:inline">PROTOCOL: LOOM_SECURE</span>
                         <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-signal sm:hidden">LOOM_SECURE</span>
                         <div className="px-1.5 py-0.5 border border-signal/20 text-[8px] font-mono uppercase bg-signal/5 text-signal font-bold animate-pulse">Active</div>
                    </div>
                </div>

                {/* Main Split View */}
                <div className="flex flex-col md:flex-row h-auto min-h-[500px]">
                    
                    {/* LEFT SIDE: The Graveyard (Passwords) */}
                    <div className="flex-1 bg-[#f0f0f0] relative p-6 md:p-12 flex flex-col border-b md:border-b-0 md:border-r border-ink overflow-hidden group/old">
                        {/* Background Noise */}
                        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'}}></div>

                        <div className="relative z-10 flex-1 flex flex-col justify-center opacity-60 grayscale group-hover/old:grayscale-0 transition-all duration-500">
                             {/* Mock Login Form */}
                             <div className="bg-white p-6 shadow-sm border border-ink/10 mb-8 max-w-md mx-auto w-full rotate-1 group-hover/old:rotate-0 transition-transform">
                                <div className="space-y-3">
                                    <div className="h-8 bg-gray-100 border border-ink/10 rounded-sm"></div>
                                    <div className="h-8 bg-gray-100 border border-ink/10 rounded-sm flex items-center px-2">
                                        <div className="text-[10px] tracking-[4px]">••••••••••</div>
                                    </div>
                                    <div className="h-8 bg-ink/10 rounded-sm w-full"></div>
                                </div>
                                <div className="mt-4 text-center">
                                    <span className="text-red-500 font-mono text-[10px] font-bold">INCORRECT PASSWORD</span>
                                </div>
                             </div>

                             {/* Metrics of Failure */}
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto w-full">
                                <div className="border border-dashed border-ink/30 p-5 bg-ink/5">
                                    <div className="flex items-center gap-2 text-ink/40 mb-3">
                                        <KeyRound size={14} />
                                        <span className="font-mono text-[9px] uppercase tracking-wider">Method</span>
                                    </div>
                                    <div className="font-serif text-lg text-ink/40 line-through decoration-ink/20 decoration-2">Email + Pass</div>
                                </div>
                                <div className="border border-dashed border-ink/30 p-5 bg-ink/5">
                                    <div className="flex items-center gap-2 text-ink/40 mb-3">
                                        <TrendingDown size={14} />
                                        <span className="font-mono text-[9px] uppercase tracking-wider">Result</span>
                                    </div>
                                    <div className="font-serif text-lg text-ink/40">Churn at Login</div>
                                </div>
                             </div>
                        </div>

                        {/* Deprecated Stamp */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-ink/10 text-ink/10 font-mono font-bold text-5xl md:text-6xl uppercase p-8 -rotate-12 pointer-events-none whitespace-nowrap z-0">
                            UNSAFE
                        </div>
                    </div>


                    {/* RIGHT SIDE: The Future (Loom) */}
                    <div className="flex-1 bg-white relative p-6 md:p-12 flex flex-col group/new">
                         
                         <div className="relative z-10 flex-1 flex flex-col justify-center">
                             {/* Mock Success */}
                             <div className="bg-white p-6 shadow-brutalist border border-ink mb-12 max-w-md mx-auto w-full scale-100 group-hover/new:scale-105 transition-transform duration-500">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-sm bg-signal flex items-center justify-center text-white">
                                            <Fingerprint size={14} fill="currentColor" />
                                        </div>
                                        <span className="font-mono text-xs font-bold">LOOM IDENTITY</span>
                                    </div>
                                    <span className="font-mono text-[9px] text-ink/40">SECURE_ID: #9942X</span>
                                </div>
                                
                                <p className="font-serif text-lg leading-relaxed mb-4 text-center py-4">
                                    "Welcome back, <span className="bg-signal/10 px-1 font-bold text-ink border-b-2 border-signal">Alex</span>."
                                </p>

                                <div className="bg-[#fafafa] border border-ink/5 p-3 rounded-sm flex justify-between items-center">
                                    <span className="text-[10px] font-mono text-green-600 font-bold uppercase">Authentication Verified</span>
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                </div>
                             </div>

                             {/* Metrics of Success */}
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto w-full">
                                {/* Card 1 */}
                                <div className="border border-ink p-5 bg-[#fffdf5] shadow-[4px_4px_0px_0px_#1a1a1a] relative group/card transition-transform hover:-translate-y-1">
                                    <div className="flex items-center gap-2 text-signal mb-3">
                                         <ShieldAlert size={14} strokeWidth={2.5} />
                                        <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Security</span>
                                    </div>
                                    <div className="font-serif text-xl md:text-2xl font-bold text-ink leading-none">
                                        Zero <br/> Knowledge
                                    </div>
                                </div>
                                {/* Card 2 */}
                                <div className="border border-ink p-5 bg-[#fffdf5] shadow-[4px_4px_0px_0px_#1a1a1a] relative group/card transition-transform hover:-translate-y-1">
                                    <div className="flex items-center gap-2 text-signal mb-3">
                                        <TrendingUp size={14} strokeWidth={2.5} />
                                        <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Conversion</span>
                                    </div>
                                    <div className="font-serif text-xl md:text-2xl font-bold text-ink leading-none">
                                        Instant <br/> Access
                                    </div>
                                </div>
                             </div>
                        </div>

                        {/* Floating Background Element */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-signal/5 rounded-full blur-3xl pointer-events-none"></div>
                    </div>

                </div>

                {/* Footer Analysis Bar - Mobile Optimized */}
                <div className="border-t border-ink bg-ink text-white p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 text-xs font-mono">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <span className="opacity-50 uppercase tracking-widest">Breach_Analysis:</span>
                        <span className="border-l-0 md:border-l border-white/20 pl-0 md:pl-4">
                             Credential stuffing attacks are <span className="text-red-400">up 62% YoY</span>.
                        </span>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
                        <span className="opacity-50 uppercase tracking-widest whitespace-nowrap">Loom Adoption:</span>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                             <div className="flex-1 md:w-32 h-2 bg-white/10 border border-white/20 rounded-full overflow-hidden">
                                <div className="h-full w-[15%] bg-signal animate-pulse"></div>
                            </div>
                            <span className="text-signal font-bold whitespace-nowrap">EARLY STAGE</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </section>
  );
};

export default ParadigmShiftSection;