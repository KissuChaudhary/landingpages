import React from 'react';
import { Terminal, ToggleRight, ShieldCheck, ArrowRight, Check, Command } from 'lucide-react';

const HowItWorksSection = () => {
  return (
    <section className="py-24 md:py-32 bg-paper relative border-b border-ink overflow-hidden">
        {/* Background Grid - made more subtle */}
        <div className="absolute inset-0 bg-grid-pattern bg-[length:20px_20px] opacity-[0.07] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
            {/* Section Header - Aligned with PainSection */}
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
                <div className="max-w-3xl">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-signal flex items-center gap-2">
                            <Terminal size={14} />
                            Developer Experience
                        </span>
                        <span className="h-px w-12 bg-signal/30"></span>
                    </div>
                    <h2 className="font-serif text-5xl md:text-6xl font-medium leading-[0.95] text-ink mb-6">
                        Three steps to <br />
                        <span className="italic">
                            production.
                        </span>
                    </h2>
                </div>
                <div className="max-w-sm">
                     <p className="font-mono text-xs md:text-sm text-ink/70 leading-relaxed border-l-2 border-signal pl-4">
                        We abstracted the complexity so you can focus on your product. Eliminate weeks of boilerplate with a single package.
                    </p>
                </div>
            </div>

            {/* Steps Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                
                {/* Connecting Line (Desktop) - Made sharper */}
                <div className="hidden md:block absolute top-[40%] left-0 w-full h-px bg-ink/10 -translate-y-1/2 z-0"></div>

                {/* Step 1: Install */}
                <div className="relative z-10 bg-white border border-ink shadow-brutalist p-8 flex flex-col h-full group hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-10 h-10 bg-ink text-white flex items-center justify-center font-mono font-bold text-lg mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                        01
                    </div>
                    
                    {/* Visual Asset: Clean Terminal */}
                    <div className="bg-ink rounded-sm p-4 mb-8 font-mono text-xs text-white overflow-hidden relative shadow-inner min-h-[100px] flex flex-col justify-center">
                         <div className="flex gap-1.5 absolute top-3 left-3 opacity-30">
                            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        </div>
                        <div className="mt-4 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-signal">➜</span>
                                <span className="opacity-90">npm i @loomauth/sdk</span>
                            </div>
                            <div className="text-ink/40 flex items-center gap-2">
                                <div className="w-2 h-2 border border-white/20 border-t-white rounded-full animate-spin"></div>
                                <span>Resolving packages...</span>
                            </div>
                        </div>
                    </div>

                    <h3 className="font-serif text-2xl font-bold mb-3">Install the SDK</h3>
                    <p className="font-mono text-xs text-ink/60 leading-relaxed mt-auto">
                        Pull LoomAuth into your project. Fully typed, zero-config, and compatible with Next.js, Remix, and SvelteKit.
                    </p>
                </div>

                {/* Step 2: Configure */}
                <div className="relative z-10 bg-white border border-ink shadow-brutalist p-8 flex flex-col h-full group hover:-translate-y-1 transition-transform duration-300">
                     <div className="w-10 h-10 bg-white border border-ink text-ink flex items-center justify-center font-mono font-bold text-lg mb-8 shadow-[4px_4px_0px_0px_#1a1a1a]">
                        02
                    </div>

                    {/* Visual Asset: Enterprise Toggles */}
                    <div className="border border-ink/10 bg-[#fafafa] p-4 mb-8 rounded-sm shadow-inner min-h-[100px] flex flex-col justify-center gap-3">
                        <div className="flex items-center justify-between pb-3 border-b border-ink/5">
                            <div className="flex items-center gap-2">
                                <Command size={12} className="text-ink/40" />
                                <span className="font-mono text-xs font-bold text-ink">Google Workspace</span>
                            </div>
                            <div className="w-8 h-4 bg-ink rounded-full relative p-0.5 cursor-pointer">
                                <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                            </div>
                        </div>
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Command size={12} className="text-ink/40" />
                                <span className="font-mono text-xs font-bold text-ink">GitHub Enterprise</span>
                            </div>
                             <div className="w-8 h-4 bg-ink rounded-full relative p-0.5 cursor-pointer">
                                <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                            </div>
                        </div>
                    </div>

                    <h3 className="font-serif text-2xl font-bold mb-3">Connect Providers</h3>
                    <p className="font-mono text-xs text-ink/60 leading-relaxed mt-auto">
                        Toggle on enterprise connections in the dashboard. No complex OAuth flows or callback URLs to manage manually.
                    </p>
                </div>

                {/* Step 3: Secure */}
                <div className="relative z-10 bg-white border border-ink shadow-brutalist p-8 flex flex-col h-full group hover:-translate-y-1 transition-transform duration-300">
                     <div className="w-10 h-10 bg-signal text-white flex items-center justify-center font-mono font-bold text-lg mb-8 shadow-[4px_4px_0px_0px_#1a1a1a]">
                        03
                    </div>

                    {/* Visual Asset: Clean Auth State */}
                    <div className="bg-[#fffdf5] border border-ink p-4 mb-8 relative overflow-hidden flex items-center gap-4 min-h-[100px]">
                        <div className="w-10 h-10 bg-ink border border-ink flex items-center justify-center text-white font-mono font-bold">
                            AD
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="font-serif font-bold text-sm text-ink truncate">admin@corp.com</span>
                            <div className="flex items-center gap-1.5 mt-1">
                                 <div className="w-1.5 h-1.5 rounded-full bg-signal"></div>
                                 <span className="text-[9px] font-mono text-ink/50 uppercase tracking-wide">Session_Active</span>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 p-2 opacity-10">
                             <ShieldCheck size={40} />
                        </div>
                    </div>

                    <h3 className="font-serif text-2xl font-bold mb-3">Secure in 5 lines</h3>
                    <p className="font-mono text-xs text-ink/60 leading-relaxed mt-auto">
                         Wrap your application in the <span className="font-bold text-ink bg-ink/5 px-1 rounded-sm">&lt;LoomProvider /&gt;</span> to secure your routes instantly.
                    </p>
                </div>

            </div>
        </div>
    </section>
  );
};

export default HowItWorksSection;