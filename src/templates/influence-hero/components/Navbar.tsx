import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ShareIcon } from './Icons';
import { NavLink } from '../types';

const navLinks: NavLink[] = [
  { label: 'About', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Contact', href: '#' },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/70 backdrop-blur-md border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-105">
              <ShareIcon className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-neutral-900">Influence</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <button className="flex items-center gap-2 bg-white border border-gray-200 text-neutral-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md">
              <img 
                src="https://picsum.photos/32/32?random=99" 
                alt="Avatar" 
                className="w-6 h-6 rounded-full object-cover" 
              />
              Book a call
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-neutral-600 hover:text-neutral-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full left-0 animate-fade-in-down">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-3 py-3 text-base font-medium text-neutral-700 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-100">
               <button className="w-full flex justify-center items-center gap-2 bg-neutral-900 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-neutral-800 transition-colors">
                <img 
                  src="https://picsum.photos/32/32?random=99" 
                  alt="Avatar" 
                  className="w-6 h-6 rounded-full object-cover border-2 border-white/20" 
                />
                Book a call
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
