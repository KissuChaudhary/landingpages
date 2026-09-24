'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section id="cta" className="relative z-10 w-full max-w-[1000px] mx-auto px-6 py-12 pb-12">
      {/* CTA Box */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-brand-pill-bg rounded-[32px] border-[4px] border-white shadow-[0_8px_32px_rgba(189,189,189,0.12)] p-12 md:p-20 flex flex-col items-center text-center relative overflow-hidden"
      >
        <h2 className="font-bebas text-[48px] md:text-[64px] font-black uppercase text-brand-text-dark tracking-[1.5px] leading-[1] mb-6">
          READY TO <span className="text-brand-blue">FOCUS?</span>
        </h2>
        
        <p className="font-inter text-[13px] leading-[22px] font-[800] tracking-[0.5px] text-[#B2B2B2] uppercase mb-10 max-w-[480px]">
          STOP FIGHTING YOUR TOOLS. START CAPTURING YOUR BEST IDEAS. DOWNLOAD TODAY AND EXPERIENCE PURE PRODUCTIVITY.
        </p>
        
        <button className="h-[56px] px-8 border-[4px] border-brand-blue rounded-[16px] bg-white font-bebas text-[20px] text-[#555] uppercase tracking-wide hover:bg-brand-blue hover:text-white transition-colors flex items-center justify-center gap-2 group pt-[4px] shadow-sm">
          <span>GET STARTED FOR FREE</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform mb-[4px]" />
        </button>
      </motion.div>

      {/* Simple Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-24 pt-8 border-t-[4px] border-[#F0F0F0] flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="font-bebas text-[24px] text-brand-text-dark tracking-widest flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-brand-blue mr-1"></div>
          NOISE<span className="text-[#B2B2B2]">LESS</span>
        </div>
        
        <div className="flex items-center gap-6 md:gap-10">
          {['Twitter', 'GitHub', 'Privacy', 'Terms'].map((link) => (
            <a key={link} href="#" className="font-inter text-[11px] font-[900] text-[#B2B2B2] hover:text-brand-blue uppercase tracking-widest transition-colors">
              {link}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
