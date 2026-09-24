import React from 'react';
import { Navbar, Footer } from './components/Layout';
import { BentoGrid } from './components/BentoGrid';
import { ProblemSolution } from './components/ProblemSolution';
import { ComparisonTable } from './components/ComparisonTable';
import { Bot, Cpu, Layers, GitBranch, Sparkles, ArrowRight, Fingerprint, Globe, FileCheck } from 'lucide-react';
import { ActionButton } from './components/ActionButton';
import { Crosshair } from './components/Crosshair';
import { PixelBackground } from './components/ui/PixelBackground';

const App: React.FC = () => {
  return (
    // OUTER FRAME: Dark Theme Pad
    <div className="min-h-screen bg-[#050505] p-3 md:p-8 font-sans selection:bg-zinc-700 selection:text-white flex flex-col items-center">
      
      {/* MAIN INTERFACE BOX */}
      <div className="relative w-full max-w-[1400px] bg-background border border-border shadow-2xl shadow-black flex flex-col">
        
        <Crosshair className="-top-3 -left-3" />
        <Crosshair className="-top-3 -right-3" />
        <Crosshair className="-bottom-3 -left-3" />
        <Crosshair className="-bottom-3 -right-3" />

        {/* ROW 1: NAVBAR */}
        <div className="relative z-20 bg-background">
            <Navbar />
            <Crosshair className="-bottom-3 -left-3" />
            <Crosshair className="-bottom-3 -right-3" />
        </div>

        {/* ROW 2: HERO SECTION (Centered, No Visual, Gradient Text BG) */}
        <div className="relative border-b border-border overflow-hidden bg-black min-h-[800px] flex flex-col justify-center">
            {/* New Pixel Background - Dense, Blue/Cyan, Fast */}
            <PixelBackground />

            {/* Radial Gradient Overlay: Darkens the center for text readability without a "box" */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.4)_50%,rgba(0,0,0,0)_100%)] pointer-events-none z-0" />
            
            {/* Vignette at the bottom to blend into next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>

            <section className="relative z-20 px-6 md:px-12 flex flex-col items-center text-center max-w-4xl mx-auto pt-20 pb-32">
                
                {/* Badge */}
                <div className="inline-block mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-950/80 px-4 py-1.5 text-xs font-mono text-zinc-400 backdrop-blur-md">
                        <span className="bg-zinc-800 border border-zinc-700 text-zinc-200 px-1.5 py-0.5 rounded-[2px] text-[10px] font-bold tracking-wider">v2.4</span>
                        <span className="text-zinc-300">Autonomous Multi-Agent Workflow Engine</span>
                    </div>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-zinc-100 mb-8 leading-[1.05] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                    Get agentic AI to <br/>
                    work on your <br/>
                    <span className="text-zinc-300">workflows</span>
                </h1>

                {/* Subtitle */}
                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    Automate repetitive tasks and focus on what matters most. Less friction, more flow.
                </p>

                {/* CTA Button */}
                <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                     <ActionButton variant="primary" className="px-10 py-5 text-base">
                        Get Started
                     </ActionButton>
                </div>
            </section>

            {/* Trusted By Footer (Inside Hero) */}
            <div className="absolute bottom-0 left-0 w-full z-20 border-t border-zinc-800/80 bg-zinc-950/90 backdrop-blur-sm py-8">
                <div className="w-full px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Fake Logos using Fonts */}
                    <div className="flex items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                         <span className="font-serif text-2xl text-zinc-300 font-bold tracking-tighter">Pipelinx.co</span>
                         <span className="font-sans text-xl text-zinc-300 font-black tracking-tight">Ephicient®</span>
                         <span className="font-mono text-xl text-zinc-300 font-bold">DUNHA</span>
                    </div>

                    <div className="text-left md:text-right max-w-xs">
                        <p className="text-xs font-mono text-zinc-500 leading-snug">
                            POWERING TECHNICAL TEAMS ACROSS 500+ ENTERPRISE REPOSITORIES.
                        </p>
                    </div>
                </div>
            </div>
            
            <Crosshair className="-bottom-3 -left-3" />
            <Crosshair className="-bottom-3 -right-3" />
        </div>

        {/* ROW 4: PROBLEM & SOLUTION */}
        <div className="relative">
             <ProblemSolution />
             <Crosshair className="-bottom-3 -left-3" />
             <Crosshair className="-bottom-3 -right-3" />
        </div>

        {/* ROW 5: HOW IT WORKS (PROTOCOL) */}
        <div className="relative border-b border-border bg-black text-white">
            {/* 1. Full-Width Section Header */}
            <div className="w-full px-6 md:px-12 lg:px-16 pt-20 md:pt-28 pb-16 border-b border-zinc-800/80">
                <div className="max-w-4xl">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                            // [ 02.0 ] THE PROTOCOL
                        </span>
                        <span className="h-px w-12 bg-zinc-800 hidden sm:inline-block" />
                    </div>
                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-zinc-100 leading-[1.08] mb-6 tracking-tight">
                        Three steps to <span className="text-zinc-400">Autonomous Authority.</span>
                    </h2>
                    <p className="text-zinc-400 text-base sm:text-lg font-normal leading-relaxed max-w-2xl">
                        From deep Style DNA ingestion to recursive citation mapping, our autonomous pipeline replaces manual research and brittle prompt engineering.
                    </p>
                </div>
            </div>

            {/* 2. Full-Width Phase Header Row */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 border-b border-zinc-800/80 bg-zinc-950/80">
                <div className="px-6 md:px-10 lg:px-12 py-3.5 border-b md:border-b-0 md:border-r border-zinc-800/80 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-medium">
                        // 01: Ingestion Pipeline
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 bg-zinc-900/80 border border-zinc-800 px-2 py-0.5 rounded-xs">
                        STYLE_DNA
                    </span>
                </div>
                <div className="px-6 md:px-10 lg:px-12 py-3.5 border-b md:border-b-0 md:border-r border-zinc-800/80 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-medium">
                        // 02: Recursive Crawler
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 bg-zinc-900/80 border border-zinc-800 px-2 py-0.5 rounded-xs">
                        LIVE_WEB
                    </span>
                </div>
                <div className="px-6 md:px-10 lg:px-12 py-3.5 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-medium">
                        // 03: Synthesis Chain
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 bg-zinc-900/80 border border-zinc-800 px-2 py-0.5 rounded-xs">
                        MULTI_AGENT
                    </span>
                </div>
            </div>

            {/* 3. Full-Width 3-Step Columns touching left and right vertical frame lines */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3">
                
                {/* STEP 1 */}
                <div className="relative p-8 md:p-10 lg:p-12 group hover:bg-zinc-900/15 transition-all border-b md:border-b-0 md:border-r border-zinc-800/80 flex flex-col justify-between">
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700 opacity-60"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-700 opacity-60 md:hidden"></div>

                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <span className="font-mono text-xs font-medium text-zinc-400 tracking-wider">STEP_01</span>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 bg-zinc-900/80 border border-zinc-800 px-2 py-0.5 rounded-xs">
                                PHASE_INGEST
                            </span>
                        </div>

                        <div className="mb-6 w-10 h-10 rounded-xs border border-zinc-800 bg-zinc-900/70 flex items-center justify-center text-zinc-300 group-hover:border-zinc-700 transition-colors">
                            <Fingerprint size={20} strokeWidth={1.75} />
                        </div>

                        <h3 className="text-lg md:text-xl text-zinc-100 font-medium mb-2.5 tracking-tight group-hover:text-white transition-colors">
                            Ingest & Analyze
                        </h3>
                        <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                            We don't just ask for a topic. We ingest your previous 50 articles, mapping sentence structure, vocabulary density, and formatting patterns to build a "Style DNA" profile.
                        </p>
                    </div>

                    <div className="mt-8 pt-5 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500">
                        <span>METRIC: 99.2% STYLE FIDELITY</span>
                        <span className="text-zinc-400 font-mono">ONLINE</span>
                    </div>
                </div>

                {/* STEP 2 */}
                <div className="relative p-8 md:p-10 lg:p-12 group hover:bg-zinc-900/15 transition-all border-b md:border-b-0 md:border-r border-zinc-800/80 flex flex-col justify-between">
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700 opacity-60 md:hidden"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-700 opacity-60 md:hidden"></div>
                    
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <span className="font-mono text-xs font-medium text-zinc-400 tracking-wider">STEP_02</span>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 bg-zinc-900/80 border border-zinc-800 px-2 py-0.5 rounded-xs">
                                PHASE_CRAWL
                            </span>
                        </div>

                        <div className="mb-6 w-10 h-10 rounded-xs border border-zinc-800 bg-zinc-900/70 flex items-center justify-center text-zinc-300 group-hover:border-zinc-700 transition-colors">
                            <Globe size={20} strokeWidth={1.75} />
                        </div>

                        <h3 className="text-lg md:text-xl text-zinc-100 font-medium mb-2.5 tracking-tight group-hover:text-white transition-colors">
                            Live Recursive Research
                        </h3>
                        <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                            The agent browses live URLs to gather current 2025/2026 data. It cross-references claims against multiple authoritative sources, discarding hallucinations and building a verified citation map.
                        </p>
                    </div>

                    <div className="mt-8 pt-5 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500">
                        <span>DEPTH: 5-HOP RECURSION</span>
                        <span className="text-zinc-400 font-mono">VERIFIED</span>
                    </div>
                </div>

                {/* STEP 3 */}
                <div className="relative p-8 md:p-10 lg:p-12 group hover:bg-zinc-900/15 transition-all flex flex-col justify-between">
                    {/* Corner Accents */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-700 opacity-60"></div>
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700 opacity-60 md:hidden"></div>

                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <span className="font-mono text-xs font-medium text-zinc-400 tracking-wider">STEP_03</span>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 bg-zinc-900/80 border border-zinc-800 px-2 py-0.5 rounded-xs">
                                PHASE_SYNTH
                            </span>
                        </div>

                        <div className="mb-6 w-10 h-10 rounded-xs border border-zinc-800 bg-zinc-900/70 flex items-center justify-center text-zinc-300 group-hover:border-zinc-700 transition-colors">
                            <FileCheck size={20} strokeWidth={1.75} />
                        </div>

                        <h3 className="text-lg md:text-xl text-zinc-100 font-medium mb-2.5 tracking-tight group-hover:text-white transition-colors">
                            Iterative Drafting
                        </h3>
                        <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                            Writing happens in loops. The agent drafts Section A, reviews it against the Style DNA, and then drafts Section B using Section A as context. No disjointed paragraphs.
                        </p>
                    </div>

                    <div className="mt-8 pt-5 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500">
                        <span>OUTPUT: PRODUCTION READY</span>
                        <span className="text-zinc-400 font-mono">OPTIMAL</span>
                    </div>
                </div>

            </div>

            {/* 4. Bottom Protocol Summary Bar */}
            <div className="w-full px-6 md:px-12 lg:px-16 py-5 border-t border-zinc-800/80 bg-zinc-950/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                    <span className="inline-block size-1.5 rounded-full bg-zinc-500" />
                    <span>SYS_PIPELINE: 3-STAGE RECURSIVE RUNTIME — COMPILED FOR NEXT.JS 15</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <span className="text-zinc-500">STATUS:</span>
                    <span className="text-zinc-300 font-medium">OPERATIONAL</span>
                </div>
            </div>

            <Crosshair className="-bottom-3 -left-3" />
            <Crosshair className="-bottom-3 -right-3" />
        </div>

        {/* ROW 6: BENTO GRID */}
        <div className="relative border-b border-border bg-black text-white">
            {/* 1. Full-Width Section Header */}
            <div className="w-full px-6 md:px-12 lg:px-16 pt-20 md:pt-28 pb-16 border-b border-zinc-800/80">
                <div className="max-w-4xl">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                            // [ 03.0 ] THE ENGINE ARCHITECTURE
                        </span>
                        <span className="h-px w-12 bg-zinc-800 hidden sm:inline-block" />
                    </div>
                    <h2 className="font-serif text-4xl sm:text-5xl text-zinc-100 leading-[1.1] mb-6 tracking-tight">
                        The "Black Box" Opened.
                    </h2>
                    <p className="text-zinc-400 text-base sm:text-lg font-normal leading-relaxed max-w-2xl">
                        Most AI tools are single-prompt wrappers. AgenWrite is a transparent pipeline of specialized autonomous nodes working in concert.
                    </p>
                </div>
            </div>

            {/* 2. Full-Width Shared-Border Bento Matrix */}
            <BentoGrid />

            <Crosshair className="-bottom-3 -left-3" />
            <Crosshair className="-bottom-3 -right-3" />
        </div>

        {/* ROW 7: COMPARISON */}
        <div className="relative border-b border-border bg-black text-white">
            {/* 1. Full-Width Section Header */}
            <div className="w-full px-6 md:px-12 lg:px-16 pt-20 md:pt-28 pb-16 border-b border-zinc-800/80">
                <div className="max-w-4xl">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                            // [ 04.0 ] SPECIFICATION MATRIX
                        </span>
                        <span className="h-px w-12 bg-zinc-800 hidden sm:inline-block" />
                    </div>
                    <h2 className="font-serif text-4xl sm:text-5xl text-zinc-100 leading-[1.1] mb-6 tracking-tight">
                        System Architecture vs. Wrappers
                    </h2>
                    <p className="text-zinc-400 text-base sm:text-lg font-normal leading-relaxed max-w-2xl">
                        Empirical benchmark comparing unified multi-stage autonomous pipelines against legacy single-prompt wrappers.
                    </p>
                </div>
            </div>

            {/* 2. Full-Width Comparison Matrix */}
            <ComparisonTable />

            <Crosshair className="-bottom-3 -left-3" />
            <Crosshair className="-bottom-3 -right-3" />
        </div>

        {/* ROW 8: FINAL CTA */}
        <div className="relative border-b border-border py-28 px-6 md:px-12 lg:px-16 text-center bg-black overflow-hidden">
            {/* Subtle architectural background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b20_1px,transparent_1px),linear-gradient(to_bottom,#18181b20_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-zinc-800 bg-zinc-950/90 rounded-full mb-8">
                    <span className="size-1.5 rounded-full bg-zinc-400" />
                    <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                        // [ 05.0 ] DEPLOYMENT RUNTIME
                    </span>
                </div>

                <div className="w-12 h-12 border border-zinc-800 bg-zinc-900/90 rounded-[2px] flex items-center justify-center mb-8 text-zinc-300">
                    <Sparkles size={20} className="text-zinc-200" strokeWidth={1.75} />
                </div>

                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-zinc-100 mb-6 tracking-tight">
                    Ready to scale your authority?
                </h2>

                <p className="text-zinc-400 mb-10 text-base md:text-lg font-light max-w-xl leading-relaxed">
                    Join 4,000+ technical teams using the Snowball Method to automate high-fidelity content pipelines.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <ActionButton variant="primary" className="px-8 py-4 text-xs font-mono uppercase tracking-wider" showArrow>
                        Start Free Trial
                    </ActionButton>
                    <ActionButton variant="secondary" className="px-8 py-4 text-xs font-mono uppercase tracking-wider">
                        Book Technical Demo
                    </ActionButton>
                </div>
            </div>

            <Crosshair className="-bottom-3 -left-3" />
            <Crosshair className="-bottom-3 -right-3" />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default App;