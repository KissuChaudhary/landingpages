import React from 'react';

export const Navbar: React.FC = () => (
  <nav className="w-full bg-black/90 backdrop-blur-md border-b border-border h-20 flex items-center justify-between px-6 md:px-12 lg:px-16 z-50">
    {/* Left: Logo */}
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 bg-zinc-100 rounded-[2px] flex items-center justify-center">
        <div className="w-2 h-2 bg-black rounded-full"></div>
      </div>
      <span className="font-bold tracking-tight text-xl text-zinc-100 font-sans">AgenWrite</span>
    </div>
    
    {/* Center: Nav Links */}
    <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-zinc-400">
      <a href="#" className="hover:text-zinc-100 transition-colors">Methodology</a>
      <a href="#" className="hover:text-zinc-100 transition-colors">Architecture</a>
      <a href="#" className="hover:text-zinc-100 transition-colors">Benchmarks</a>
      <a href="#" className="hover:text-zinc-100 transition-colors">Enterprise</a>
    </div>

    {/* Right: CTA & Login */}
    <div className="flex items-center gap-6">
      <button className="hidden md:block text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-zinc-100 transition-colors">
        Log in
      </button>
      <button className="bg-zinc-100 hover:bg-white text-black text-xs font-mono font-bold px-5 py-2.5 rounded-[2px] uppercase tracking-wider transition-all">
        Start Ranking
      </button>
    </div>
  </nav>
);

export const Footer: React.FC = () => (
  <footer className="w-full bg-black text-white border-t border-border flex flex-col">
    {/* Top Full-Width Daemon Command Row */}
    <div className="w-full px-6 md:px-12 lg:px-16 py-12 md:py-16 border-b border-zinc-800/80 bg-zinc-950 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 border border-zinc-800 bg-zinc-900/90 rounded-[2px] flex items-center justify-center text-zinc-300 font-mono text-sm font-bold shrink-0">
          &gt;_
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="size-1.5 rounded-full bg-zinc-400" />
            <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
              SYSTEM_DAEMON // STANDBY
            </p>
          </div>
          <p className="text-base text-zinc-200 font-medium">
            Deploy your autonomous agentic authoring runtime.
          </p>
        </div>
      </div>

      {/* Terminal Input Box */}
      <div className="flex items-stretch w-full sm:w-auto">
        <div className="bg-black border border-zinc-800 text-zinc-400 font-mono text-xs px-4 py-3 min-w-[240px] sm:min-w-[300px] flex items-center">
          <span className="text-zinc-500 mr-2">$</span>
          <span className="text-zinc-300">enter_target_domain...</span>
          <span className="w-1.5 h-3.5 bg-zinc-400 ml-1.5 animate-pulse inline-block" />
        </div>
        <button className="bg-zinc-200 hover:bg-white text-black font-mono text-xs font-bold px-6 py-3 uppercase tracking-wider transition-colors whitespace-nowrap">
          Initialize
        </button>
      </div>
    </div>

    {/* Bottom Metadata Audit Bar */}
    <div className="w-full px-6 md:px-12 lg:px-16 py-6 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-zinc-500 bg-black gap-4">
      <p>© 2025 AGENWRITE SYSTEMS INC. // CORE PROTOCOL v2.4</p>
      <div className="flex gap-8">
        <a href="#" className="hover:text-zinc-300 transition-colors uppercase tracking-wider">
          PRIVACY_PROTOCOL
        </a>
        <a href="#" className="hover:text-zinc-300 transition-colors uppercase tracking-wider">
          TERMS_OF_USE
        </a>
        <a href="#" className="hover:text-zinc-300 transition-colors uppercase tracking-wider">
          STATUS_PAGE
        </a>
      </div>
    </div>
  </footer>
);