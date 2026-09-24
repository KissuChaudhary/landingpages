"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Pricing', href: '#' },
  { name: 'Templates', href: '#' },
  { name: 'Showcase', href: '#' },
  { name: 'Blog', href: '#' },
];

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navStyle = {
    border: '1px solid #C5D4D8',
    background: scrolled || isOpen ? 'rgba(250, 252, 253, 0.98)' : 'rgba(242, 248, 250, 0.94)',
    boxShadow: 'inset 0 2px 3px rgba(255, 255, 255, 0.96), inset 0 -2px 9px rgba(166, 188, 196, 0.33), inset 0 0 0 6px rgba(255, 255, 255, 0.42), 0 2px 0 rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
  };

  const menuBgStyle = {
    background: 'rgba(246, 250, 252, 0.73)',
    border: '1px solid #C5D4D8',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 1px 0 rgba(255, 255, 255, 0.5)'
  };

  const buttonStyle = {
    backgroundColor: '#56B6C6',
    boxShadow: 'inset 0 -1px 0 rgba(40, 110, 120, 0.18), 0 1px 0 rgba(255, 255, 255, 0.45)',
  };

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white/40 backdrop-blur-sm z-[90] md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="fixed top-4 md:top-6 left-0 right-0 z-[100] flex justify-center w-full px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          layout
          style={{ ...navStyle, borderRadius: isOpen ? '28px' : '999px' }}
          className="w-full max-w-[960px] pointer-events-auto overflow-hidden relative"
        >
          {/* Inner ring for the prompt-box look */}
          <div className="absolute inset-[5px] rounded-[inherit] bg-white/30 z-0 pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_0_rgba(184,203,211,0.35)]" />

          {/* Main Top Bar */}
          <div className="relative z-10 flex items-center justify-between px-3 md:px-5 py-3 md:py-3.5">
            {/* Brand Logo */}
            <a href="#" className="flex items-center gap-2.5 font-extrabold text-[#2C3132] text-[18px] md:text-[20px] tracking-tight ml-2">
              <div className="w-[26px] h-[18px] relative">
                <div className="absolute inset-0 bg-[#56B6C6] rounded-full [clip-path:polygon(0_50%,34%_0,100%_0,55%_33%,87%_70%,37%_100%)] top-[2px]"></div>
                <div className="absolute bottom-0 left-[3px] w-[14px] h-[7px] bg-[#41A1B2] rounded-full"></div>
              </div>
              drawgle
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2 px-2 py-1.5  z-10">
              {links.map((link, index) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative px-4 py-1.5 text-[14px] font-bold text-[#62575b] transition-colors hover:text-[#2C3132] z-10 rounded-full"
                >
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/70 rounded-full -z-10 shadow-[0_1px_3px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1)]"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Button (Desktop) & Mobile Toggle */}
            <div className="flex items-center">
              <a 
                href="https://app.drawgle.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={buttonStyle}
                className="hidden md:flex items-center justify-center h-[34px] px-4 rounded-full text-white text-[14px] font-bold transition-transform hover:-translate-y-[1px] active:translate-y-[1px]"
              >
                Dashboard
              </a>

              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-[#3c3636] border border-[#ded7cc] shadow-[inset_0_-1px_2px_rgba(155,135,119,0.15),0_4px_9px_rgba(64,48,35,0.08)] outline-none active:scale-95 transition-all"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X size={20} strokeWidth={2.5} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu size={20} strokeWidth={2.5} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile Menu Content */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 md:hidden px-6 pb-6 pt-2"
              >
                <div className="flex flex-col gap-2 pt-4 border-t border-[#C5D4D8]/50">
                  {links.map((link, i) => (
                    <motion.a 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      key={link.name} 
                      href={link.href} 
                      className="text-[17px] font-bold text-[#62575b] hover:text-[#2C3132] transition-colors py-3"
                    >
                      {link.name}
                    </motion.a>
                  ))}
                  <motion.a 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={buttonStyle}
                    href="https://app.drawgle.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-3 flex items-center justify-center h-[48px] rounded-full text-white text-[16px] font-bold active:scale-[0.98] transition-transform w-full"
                  >
                    Dashboard
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
}
