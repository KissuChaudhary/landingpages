import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PricingSection from './components/PricingSection';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#fdfdfd]">
      <Navbar />
      <main>
        <HeroSection />
        <div className="py-24 bg-white relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-black/10 to-transparent"></div>
          <PricingSection />
        </div>
      </main>
      
      {/* Simple Footer */}
      <footer className="bg-forest-black py-20 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white font-serif font-bold text-xl">F</span>
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-white">FlipAEO</span>
          </div>
          <div className="font-mono text-white/40 text-[10px] tracking-[0.2em] uppercase">
            © 2025 FlipAEO Systems Inc. All rights reserved.
          </div>
          <div className="flex gap-8">
            {['Twitter', 'LinkedIn', 'API'].map(link => (
              <a key={link} href="#" className="font-mono text-[10px] text-white/60 hover:text-white transition-colors uppercase tracking-widest">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;