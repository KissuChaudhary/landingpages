import React, { useState } from 'react';
import { Zap, ArrowRight, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="bg-white/90 backdrop-blur-md shadow-framer border border-white/20 rounded-full px-2 py-2 flex items-center justify-between w-full max-w-[90%] md:max-w-2xl lg:max-w-3xl transition-all duration-300">
        
        {/* Logo */}
        <div className="flex items-center gap-2 pl-2 md:pl-4 pr-4">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
            <Zap size={16} fill="currentColor" className="text-white" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-kinetik-black">Kinetik</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pr-1">
          {/* Desktop Contact Button */}
          <button className="hidden md:flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all group">
            Contact us
            <div className="bg-white/20 rounded-full p-0.5 group-hover:translate-x-0.5 transition-transform">
              <ArrowRight size={12} />
            </div>
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Menu
            <div className="bg-white/20 rounded-full p-1">
              {isMenuOpen ? <X size={14} /> : <Menu size={14} />}
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-white rounded-3xl p-4 shadow-framer-xl md:hidden flex flex-col gap-2 border border-gray-100 animate-in fade-in slide-in-from-top-2">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              className="p-3 hover:bg-gray-50 rounded-xl text-center font-medium text-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="h-px bg-gray-100 my-1"></div>
          <button className="w-full bg-black text-white py-3 rounded-xl font-medium">
            Contact us
          </button>
        </div>
      )}
    </div>
  );
};