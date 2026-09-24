import React from 'react';
import { Layers, GitMerge, ShieldCheck, Database, Cpu, Globe, Zap, Lock } from 'lucide-react';

export default function SolutionSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-32 relative z-20">
      <div className="flex flex-col items-center text-center mb-24">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
          A complete toolchain for the <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">AI lifecycle.</span>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl">
          Stop stitching together fragmented tools. Our platform provides a unified architecture for building, deploying, and governing intelligent systems at scale.
        </p>
      </div>

      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent hidden md:block" />

        <div className="space-y-12">
          {/* Layer 1: Infrastructure */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center group">
            <div className="md:col-span-1 flex justify-center relative">
              <div className="w-4 h-4 rounded-full bg-[#1a1a1c] border border-gray-600 z-10 group-hover:border-emerald-500 group-hover:bg-emerald-500/20 transition-colors" />
            </div>
            <div className="md:col-span-4">
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                <Database className="w-6 h-6 text-gray-500" />
                Unified Data Plane
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Connect to any data source—Snowflake, S3, or Postgres. We handle the chunking, embedding, and vectorization automatically, keeping your knowledge base in sync with real-time data.
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="node-panel rounded-xl p-6 border border-white/5 bg-[#0a0a0c] relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s] duration-0 group-hover:animate-[shine_3s_infinite]" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-xs text-gray-500 mb-2 font-mono">SOURCE</div>
                    <div className="text-white font-medium">Unstructured</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <Zap className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-xs text-gray-500 mb-2 font-mono">VECTOR STORE</div>
                    <div className="text-white font-medium">Indexed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Layer 2: Orchestration */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center group">
            <div className="md:col-span-1 flex justify-center relative">
              <div className="w-4 h-4 rounded-full bg-[#1a1a1c] border border-gray-600 z-10 group-hover:border-orange-500 group-hover:bg-orange-500/20 transition-colors" />
            </div>
            <div className="md:col-span-4">
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                <GitMerge className="w-6 h-6 text-gray-500" />
                Model Orchestration
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Chain together LLMs, tools, and logic. Swap models (GPT-4, Claude, Llama) with a single line of config. Built-in memory management and prompt caching reduce latency and cost.
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="node-panel rounded-xl p-6 border border-white/5 bg-[#0a0a0c] relative overflow-hidden">
                 <div className="flex items-center justify-between gap-4">
                   <div className="flex-1 p-3 rounded bg-white/5 border border-white/5 text-center">
                     <span className="text-sm text-gray-300">User Input</span>
                   </div>
                   <div className="w-8 h-px bg-gray-600" />
                   <div className="flex-1 p-3 rounded bg-orange-500/10 border border-orange-500/30 text-center relative">
                     <span className="text-sm text-orange-200">Reasoning Engine</span>
                     <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                   </div>
                   <div className="w-8 h-px bg-gray-600" />
                   <div className="flex-1 p-3 rounded bg-white/5 border border-white/5 text-center">
                     <span className="text-sm text-gray-300">Tool Action</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Layer 3: Governance */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center group">
            <div className="md:col-span-1 flex justify-center relative">
              <div className="w-4 h-4 rounded-full bg-[#1a1a1c] border border-gray-600 z-10 group-hover:border-blue-500 group-hover:bg-blue-500/20 transition-colors" />
            </div>
            <div className="md:col-span-4">
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-gray-500" />
                Enterprise Governance
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Full observability into every step. Track token usage, latency, and costs. Enforce PII redaction and policy checks before any data leaves your secure environment.
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="node-panel rounded-xl p-6 border border-white/5 bg-[#0a0a0c] relative overflow-hidden">
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-gray-500 border-b border-white/5 pb-2">
                    <span>TIMESTAMP</span>
                    <span>EVENT</span>
                    <span>STATUS</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>10:42:01.230</span>
                    <span>PII_SCAN_DETECTED</span>
                    <span className="text-emerald-500">BLOCKED</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>10:42:01.450</span>
                    <span>MODEL_INFERENCE</span>
                    <span className="text-blue-500">COMPLETE</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>10:42:02.100</span>
                    <span>TOOL_EXECUTION</span>
                    <span className="text-blue-500">SUCCESS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
