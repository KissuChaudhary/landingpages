import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Feather } from 'lucide-react';

const navLinks = [
  { name: 'Services', href: '#' },
  { name: 'Process', href: '#' },
  { name: 'Works', href: '#' },
  { name: 'Pricing', href: '#' },
  { name: 'Reviews', href: '#' },
  { name: 'FAQ', href: '#' },
  { name: 'Blog', href: '#' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer">
          <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
            <Feather size={18} strokeWidth={2.5} />
          </div>
          <span>CreatorFlow</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex">
          <button className="group flex items-center gap-2 bg-slate-900 text-white pl-5 pr-1 py-1.5 rounded-full font-medium text-sm hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/20">
            Contact
            <span className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-slate-900 transition-transform group-hover:rotate-[-45deg]">
              <ArrowRight size={14} strokeWidth={2.5} />
            </span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden flex items-center justify-center w-10 h-10 bg-[#0F172A] text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-lg font-medium text-slate-700 py-2 border-b border-slate-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="mt-4 w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl font-medium shadow-lg">
            Contact Us
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </nav>
  );
}