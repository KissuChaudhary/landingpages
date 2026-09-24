'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = ['FEATURES', 'BENEFITS', 'INTEGRATIONS', 'PRICING'];

export function TopNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden md:flex absolute top-[30px] left-1/2 -translate-x-1/2 bg-brand-pill-bg h-[44px] items-center justify-center rounded-[18px] border-[4px] border-white px-[22px] gap-[24px] shadow-[0_4px_12px_rgba(189,189,189,0.12)] z-50"
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="font-bebas text-[15px] text-[#777] uppercase tracking-wide hover:text-brand-blue transition-colors"
          >
            {item}
          </a>
        ))}
      </motion.nav>

      {/* Mobile Navigation Toggle */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="md:hidden absolute top-[20px] right-[20px] z-50"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-brand-pill-bg p-2.5 rounded-[18px] border-[4px] border-white shadow-[0_4px_12px_rgba(189,189,189,0.12)] text-[#777] focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-[80px] right-[20px] left-[20px] bg-brand-pill-bg rounded-[18px] border-[4px] border-white shadow-[0_8px_24px_rgba(189,189,189,0.12)] flex flex-col p-4 gap-4 z-50"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="font-bebas text-[18px] text-[#777] uppercase tracking-wide hover:text-brand-blue transition-colors text-center py-2"
              >
                {item}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
