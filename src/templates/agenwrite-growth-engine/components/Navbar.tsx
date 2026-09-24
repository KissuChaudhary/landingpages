import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      {/* Outer Gray Container matching FeatureTicker style */}
      <div className="w-full max-w-md sm:max-w-3xl bg-stone-200/50 p-2 rounded-full border border-stone-200/50 backdrop-blur-sm shadow-sm">
        {/* Inner White Container */}
        <nav className="bg-white rounded-full px-6 py-3 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-accent-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              F
            </div>
            <span className="font-semibold text-stone-900 tracking-tight">FlipAEO</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
            <a href="#strategy" className="hover:text-black transition-colors">Strategy</a>
            <a href="#process" className="hover:text-black transition-colors">Process</a>
            <a href="#results" className="hover:text-black transition-colors">Results</a>
          </div>

          <button 
            onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-black text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-stone-800 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Join Waitlist
          </button>
        </nav>
      </div>
    </div>
  );
};