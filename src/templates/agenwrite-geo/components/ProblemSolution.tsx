import React from 'react';
import { Hexagon, X, ArrowRight } from 'lucide-react';

export const ProblemSolution: React.FC = () => {
  return (
    <section className="w-full bg-black text-white border-b border-border">
      {/* 1. Header Section - Spans edge-to-edge with bottom border touching vertical container lines */}
      <div className="w-full px-6 md:px-12 lg:px-16 pt-20 md:pt-28 pb-16 border-b border-zinc-800/80">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
              // [ 01.0 ] ARCHITECTURAL SHIFT
            </span>
            <span className="h-px w-12 bg-zinc-800 hidden sm:inline-block" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-zinc-100 leading-[1.08] mb-6 tracking-tight">
            Beyond rigid automation.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-normal leading-relaxed max-w-2xl">
            Traditional workflows break under pressure. The Fuse Agentic Layer is designed to adapt, reason, and scale without constant supervision.
          </p>
        </div>
      </div>

      {/* 2. Column Headers - Full-width row touching left and right vertical container lines */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 border-b border-zinc-800/80 bg-zinc-950/80">
        {/* Left Column Header */}
        <div className="px-6 md:px-12 lg:px-16 py-4 border-b md:border-b-0 md:border-r border-zinc-800/80 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-medium">
            // Traditional Automation
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 bg-zinc-900/80 border border-zinc-800 px-2 py-0.5 rounded-xs">
            LEGACY
          </span>
        </div>

        {/* Right Column Header */}
        <div className="px-6 md:px-12 lg:px-16 py-4 flex items-center justify-between bg-zinc-950/80">
          <div className="flex items-center gap-2.5">
            <span className="inline-block size-1.5 rounded-full bg-zinc-300" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-200 font-medium">
              // The Fuse Agentic Layer
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-300 bg-zinc-900 border border-zinc-700/60 px-2 py-0.5 rounded-xs font-medium">
            AUTONOMOUS
          </span>
        </div>
      </div>

      {/* 3. Comparison Rows - Each row spans edge-to-edge touching left & right vertical container lines */}
      <div className="w-full">
        {/* ROW 1 */}
        <div className="group grid grid-cols-1 md:grid-cols-2 border-b border-zinc-800/80 transition-colors duration-200 hover:bg-zinc-900/15">
          {/* Left (Old) */}
          <div className="p-6 md:p-12 lg:p-14 border-b md:border-b-0 md:border-r border-zinc-800/80 flex flex-col justify-center relative">
            <div className="md:hidden font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-3 border-b border-zinc-800 pb-1 inline-block self-start">
              Traditional
            </div>
            <div className="flex items-start gap-5">
              <div className="mt-1 w-7 h-7 rounded-xs border border-zinc-800 bg-zinc-900/60 flex items-center justify-center shrink-0 text-zinc-500">
                <X size={13} strokeWidth={1.75} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-medium text-zinc-300 mb-2 tracking-tight group-hover:text-zinc-200 transition-colors">
                  Rigid, "If-This-Then-That" logic
                </h3>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-normal max-w-lg">
                  Linear scripts that fail when encountering edge cases, unexpected schema changes, or variable inputs.
                </p>
              </div>
            </div>
          </div>

          {/* Right (New) */}
          <div className="p-6 md:p-12 lg:p-14 flex flex-col justify-center relative bg-zinc-950/30">
            <div className="md:hidden font-mono text-[10px] uppercase tracking-widest text-zinc-300 mb-3 border-b border-zinc-800 pb-1 inline-block self-start">
              Fuse Agentic
            </div>

            <div className="relative z-10 flex items-start gap-5">
              <div className="mt-1 w-7 h-7 rounded-xs border border-zinc-700/80 bg-zinc-900/90 flex items-center justify-center shrink-0 text-zinc-200">
                <Hexagon size={13} strokeWidth={1.75} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-medium text-zinc-100 mb-2 tracking-tight">
                  Adaptive reasoning and self-correction
                </h3>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-normal max-w-lg">
                  Agents that evaluate execution outcomes in real-time, diagnose anomalies, and retry strategies dynamically until the goal is met.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="group grid grid-cols-1 md:grid-cols-2 border-b border-zinc-800/80 transition-colors duration-200 hover:bg-zinc-900/15">
          {/* Left (Old) */}
          <div className="p-6 md:p-12 lg:p-14 border-b md:border-b-0 md:border-r border-zinc-800/80 flex flex-col justify-center relative">
            <div className="md:hidden font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-3 border-b border-zinc-800 pb-1 inline-block self-start">
              Traditional
            </div>
            <div className="flex items-start gap-5">
              <div className="mt-1 w-7 h-7 rounded-xs border border-zinc-800 bg-zinc-900/60 flex items-center justify-center shrink-0 text-zinc-500">
                <X size={13} strokeWidth={1.75} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-medium text-zinc-300 mb-2 tracking-tight group-hover:text-zinc-200 transition-colors">
                  Breaks when formats change
                </h3>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-normal max-w-lg">
                  Hardcoded selectors, brittle APIs, and fragile regex dependencies that shatter with minor website or payload updates.
                </p>
              </div>
            </div>
          </div>

          {/* Right (New) */}
          <div className="p-6 md:p-12 lg:p-14 flex flex-col justify-center relative bg-zinc-950/30">
            <div className="md:hidden font-mono text-[10px] uppercase tracking-widest text-zinc-300 mb-3 border-b border-zinc-800 pb-1 inline-block self-start">
              Fuse Agentic
            </div>

            <div className="relative z-10 flex items-start gap-5">
              <div className="mt-1 w-7 h-7 rounded-xs border border-zinc-700/80 bg-zinc-900/90 flex items-center justify-center shrink-0 text-zinc-200">
                <Hexagon size={13} strokeWidth={1.75} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-medium text-zinc-100 mb-2 tracking-tight">
                  Understands context and unstructured data
                </h3>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-normal max-w-lg">
                  Uses semantic understanding to process messy documents, multimodal inputs, PDFs, and varying web layouts without brittle rules.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3 */}
        <div className="group grid grid-cols-1 md:grid-cols-2 border-b border-zinc-800/80 transition-colors duration-200 hover:bg-zinc-900/15">
          {/* Left (Old) */}
          <div className="p-6 md:p-12 lg:p-14 border-b md:border-b-0 md:border-r border-zinc-800/80 flex flex-col justify-center relative">
            <div className="md:hidden font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-3 border-b border-zinc-800 pb-1 inline-block self-start">
              Traditional
            </div>
            <div className="flex items-start gap-5">
              <div className="mt-1 w-7 h-7 rounded-xs border border-zinc-800 bg-zinc-900/60 flex items-center justify-center shrink-0 text-zinc-500">
                <X size={13} strokeWidth={1.75} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-medium text-zinc-300 mb-2 tracking-tight group-hover:text-zinc-200 transition-colors">
                  Requires constant developer upkeep
                </h3>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-normal max-w-lg">
                  Every change requires a Jira ticket, a human engineer to diagnose stack traces, and continuous deployment cycles.
                </p>
              </div>
            </div>
          </div>

          {/* Right (New) */}
          <div className="p-6 md:p-12 lg:p-14 flex flex-col justify-center relative bg-zinc-950/30">
            <div className="md:hidden font-mono text-[10px] uppercase tracking-widest text-zinc-300 mb-3 border-b border-zinc-800 pb-1 inline-block self-start">
              Fuse Agentic
            </div>

            <div className="relative z-10 flex items-start gap-5">
              <div className="mt-1 w-7 h-7 rounded-xs border border-zinc-700/80 bg-zinc-900/90 flex items-center justify-center shrink-0 text-zinc-200">
                <Hexagon size={13} strokeWidth={1.75} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-medium text-zinc-100 mb-2 tracking-tight">
                  Learns and scales with your workflow
                </h3>
                <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-normal max-w-lg">
                  As your team provides feedback, the agentic layer refines its execution graphs automatically with zero manual scripting required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Footer Bar - Full-width touching left and right vertical container lines */}
      <div className="w-full px-6 md:px-12 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-950/70">
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
          <span className="inline-block size-1.5 rounded-full bg-zinc-500" />
          <span>BENCHMARK PROTOCOL: FUSE AGENTIC ENGINE V3.2 — EVALUATED ACROSS 500+ WORKFLOWS</span>
        </div>
        <button className="group flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-colors px-3.5 py-1.5 rounded-xs border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700">
          <span>View Documentation</span>
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform text-zinc-500 group-hover:text-zinc-300" />
        </button>
      </div>
    </section>
  );
};