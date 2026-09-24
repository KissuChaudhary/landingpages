import React from 'react';
import { Sparkles } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="bg-white/90 backdrop-blur-md border border-white/50 shadow-lg rounded-full px-6 py-3 flex items-center justify-between gap-8 max-w-2xl w-full">
        <div className="flex items-center gap-2 font-bold text-slate-800 text-lg">
          <div className="bg-slate-900 text-white p-1.5 rounded-lg">
            <Sparkles size={16} />
          </div>
          SkyWrite
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
          <a href="#demo" className="hover:text-slate-900 transition-colors">Live Demo</a>
          <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
        </div>

        <button className="bg-slate-900 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-slate-700 transition-all hover:scale-105 shadow-md">
          Get Started
        </button>
      </nav>
    </div>
  );
};

export default Navbar;