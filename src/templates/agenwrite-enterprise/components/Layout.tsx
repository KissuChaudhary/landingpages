import React from 'react';

export const Navbar: React.FC = () => (
  // Navbar is now a static grid row with a bottom border
  <nav className="w-full bg-white border-b border-zinc-200 h-20 flex items-center justify-between px-6 md:px-12">
    
    {/* Left: Logo */}
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 bg-zinc-950 rounded-[2px] flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
      <span className="font-bold tracking-tight text-xl text-zinc-950">AgenWrite</span>
    </div>
    
    {/* Center: Nav Links */}
    <div className="hidden md:flex items-center gap-10 text-sm font-medium text-zinc-600">
      <a href="#" className="hover:text-zinc-950 transition-colors">Methodology</a>
      <a href="#" className="hover:text-zinc-950 transition-colors">Features</a>
      <a href="#" className="hover:text-zinc-950 transition-colors">Pricing</a>
      <a href="#" className="hover:text-zinc-950 transition-colors">Enterprise</a>
    </div>

    {/* Right: CTA & Login */}
    <div className="flex items-center gap-8">
      <button className="hidden md:block text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors">Log in</button>
      <button className="bg-zinc-950 text-white text-xs font-bold px-6 py-3 rounded-[4px] uppercase tracking-wide hover:bg-zinc-800 transition-all shadow-sm">
        Start Ranking
      </button>
    </div>
  </nav>
);

export const Footer: React.FC = () => (
  <footer className="bg-zinc-950 text-white py-24 px-6 border-t border-zinc-200">
    <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block p-6 border border-zinc-800 bg-zinc-900/50 rounded-lg mb-12 shadow-2xl backdrop-blur-sm relative overflow-hidden">
             {/* Decorative scanline */}
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent animate-pulse"></div>

             <div className="flex flex-col md:flex-row items-center gap-6 text-left">
                <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                   <span className="text-emerald-500 animate-pulse text-xl">●</span>
                </div>
                <div>
                    <p className="font-mono text-sm text-zinc-400 mb-1">SYSTEM STATUS: READY</p>
                    <p className="text-lg text-white font-medium">
                        Deploy your agentic writer today.
                    </p>
                </div>
             </div>
             <div className="mt-8 flex gap-0">
                <div className="bg-black border-y border-l border-zinc-700 text-zinc-400 font-mono text-xs px-4 py-3 flex-1 text-left min-w-[200px] flex items-center">
                    <span className="text-emerald-500 mr-2">$</span>
                    {`enter_website_url..._`}
                </div>
                <button className="bg-white border border-white text-black font-mono text-xs font-bold px-6 py-3 uppercase hover:bg-zinc-200 transition-colors">
                    Initialize
                </button>
             </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 font-mono mt-12 border-t border-zinc-900 pt-8">
             <p>© 2024 AGENWRITE SYSTEMS INC.</p>
             <div className="flex gap-8 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">PRIVACY_PROTOCOL</a>
                <a href="#" className="hover:text-white transition-colors">TERMS_OF_USE</a>
                <a href="#" className="hover:text-white transition-colors">STATUS_PAGE</a>
             </div>
        </div>
    </div>
  </footer>
);