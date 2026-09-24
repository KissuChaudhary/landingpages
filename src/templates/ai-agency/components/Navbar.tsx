import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-6 flex justify-center">
      <div className="w-full max-w-7xl flex items-center justify-between">
        {/* Left: Logo */}
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src="https://picsum.photos/seed/logo/48/48" alt="Logo" className="w-full h-full object-cover" />
        </div>

        {/* Center: Nav Links + Button in Pill */}
        <div className="liquid-glass rounded-full p-1.5 flex items-center gap-6 pl-8">
          <div className="flex items-center gap-6 text-sm font-medium text-white/90">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#" className="hover:text-white transition-colors">Services</a>
            <a href="#" className="hover:text-white transition-colors">Work</a>
            <a href="#" className="hover:text-white transition-colors">Process</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <button className="bg-white text-black rounded-full px-5 py-2.5 text-sm font-medium flex items-center gap-1 hover:bg-white/90 transition-colors">
            Get Started
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right spacer to keep center pill truly centered if needed, or just flex-between */}
        <div className="w-12 h-12 hidden md:block" />
      </div>
    </nav>
  );
}
