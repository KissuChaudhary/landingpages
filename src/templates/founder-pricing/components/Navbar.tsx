import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${scrolled ? 'pt-4' : 'pt-8'}`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl border border-forest-black/5 shadow-soft-xl' : 'bg-transparent'}`}>
        
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-forest-black rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="text-white font-serif font-bold text-xl">F</span>
          </div>
          <span className="font-serif font-bold text-xl tracking-tight text-forest-black">FlipAEO</span>
          <span className="hidden md:block font-mono text-[9px] px-1.5 py-0.5 rounded border border-forest-black/10 text-sage-grey ml-1">v2.5_PRO</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {['Product', 'Solutions', 'GEO Guide', 'Pricing'].map((item) => (
            <a key={item} href="#" className="font-sans text-sm font-medium text-sage-grey hover:text-forest-black transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-forest-black transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:block font-mono text-xs font-bold text-forest-black hover:opacity-70 transition-opacity">
            LOGIN
          </button>
          <button className="bg-forest-black text-white px-5 py-2.5 rounded-xl font-mono text-xs font-bold tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-forest-black/10 uppercase">
            Start Writing
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;