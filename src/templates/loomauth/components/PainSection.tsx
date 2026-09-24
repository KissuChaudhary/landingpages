import React from 'react';
import { EyeOff, Activity, Target, AlertTriangle, Lock, ServerCrash, Bug } from 'lucide-react';

const PainSection = () => {
  return (
    <section className="py-24 md:py-32 bg-cream relative overflow-hidden border-b border-ink">
      {/* Subtle background noise/grid inherited from body, adding a specific accent here */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-signal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
            <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-signal flex items-center gap-2">
                        <AlertTriangle size={14} />
                        Tech Debt Audit
                    </span>
                    <span className="h-px w-12 bg-signal/30"></span>
                </div>
                <h2 className="font-serif text-5xl md:text-6xl font-medium leading-[0.95] text-ink mb-6">
                    Home-grown auth is <br />
                    <span className="italic">
                        quietly killing
                    </span> your velocity.
                </h2>
            </div>
            <div className="max-w-sm">
                 <p className="font-mono text-xs md:text-sm text-ink/70 leading-relaxed border-l-2 border-signal pl-4">
                    You’re building login forms instead of core features. Security standards change monthly, and maintaining your own auth stack is a full-time job.
                </p>
            </div>
        </div>

        {/* The 3 Silent Killers - Contiguous Grid Layout */}
        <div className="w-full border border-ink bg-white shadow-brutalist flex flex-col md:flex-row">
            
            {/* CARD 1: Security Holes */}
            <div className="group flex-1 border-b md:border-b-0 md:border-r border-ink p-8 hover:bg-paper transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Lock size={120} />
                </div>
                
                <div className="flex justify-between items-start mb-12">
                    <div className="font-mono text-[10px] uppercase tracking-widest border border-ink/20 px-2 py-1 bg-white text-ink/50">
                        Risk_001
                    </div>
                    <div className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center text-ink group-hover:bg-signal group-hover:text-white transition-colors">
                        <EyeOff size={16} />
                    </div>
                </div>

                <h3 className="font-serif text-2xl font-bold mb-3 pr-8">Hidden Vulnerabilities</h3>
                <p className="font-mono text-xs leading-relaxed text-ink/60 mb-6">
                    One missed edge case in your JWT implementation and your entire database is exposed. Security is binary: you are either 100% secure or you are compromised.
                </p>

                <div className="mt-auto inline-flex items-center gap-2 text-[10px] font-mono font-bold text-red-600 bg-red-50 px-2 py-1 border border-red-100">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
                    CRITICAL EXPOSURE
                </div>
            </div>

            {/* CARD 2: Maintenance */}
            <div className="group flex-1 border-b md:border-b-0 md:border-r border-ink p-8 hover:bg-paper transition-colors relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <ServerCrash size={120} />
                </div>

                <div className="flex justify-between items-start mb-12">
                    <div className="font-mono text-[10px] uppercase tracking-widest border border-ink/20 px-2 py-1 bg-white text-ink/50">
                        Risk_002
                    </div>
                    <div className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center text-ink group-hover:bg-signal group-hover:text-white transition-colors">
                        <Activity size={16} />
                    </div>
                </div>

                <h3 className="font-serif text-2xl font-bold mb-3">Maintenance Hell</h3>
                <p className="font-mono text-xs leading-relaxed text-ink/60 mb-6">
                    OAuth APIs break. Tokens expire. Compliance rules change. Every minute you spend fixing login bugs is a minute you aren't shipping value to your users.
                </p>

                <div className="mt-auto inline-flex items-center gap-2 text-[10px] font-mono font-bold text-orange-600 bg-orange-50 px-2 py-1 border border-orange-100">
                    <span className="w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
                    VELOCITY DRAG
                </div>
            </div>

            {/* CARD 3: UX Friction */}
            <div className="group flex-1 p-8 hover:bg-paper transition-colors relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Bug size={120} />
                </div>

                <div className="flex justify-between items-start mb-12">
                    <div className="font-mono text-[10px] uppercase tracking-widest border border-ink/20 px-2 py-1 bg-white text-ink/50">
                        Risk_003
                    </div>
                    <div className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center text-ink group-hover:bg-signal group-hover:text-white transition-colors">
                        <Target size={16} />
                    </div>
                </div>

                <h3 className="font-serif text-2xl font-bold mb-3">Conversion Killer</h3>
                <p className="font-mono text-xs leading-relaxed text-ink/60 mb-6">
                    Complex sign-up flows kill conversion. LoomAuth provides optimized, passwordless flows that users love, increasing sign-ups by up to 40%.
                </p>

                <div className="mt-auto inline-flex items-center gap-2 text-[10px] font-mono font-bold text-ink/60 bg-gray-50 px-2 py-1 border border-gray-200">
                    <span className="w-1.5 h-1.5 bg-ink/40 rounded-full"></span>
                    LOST REVENUE
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default PainSection;