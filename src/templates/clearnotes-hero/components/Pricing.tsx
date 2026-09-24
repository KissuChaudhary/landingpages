'use client';

import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export function Pricing() {
  return (
    <section id="pricing" className="relative z-10 w-full max-w-[1000px] mx-auto px-6 py-20 pb-32">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <h2 className="font-bebas text-[36px] md:text-[48px] font-black uppercase text-brand-text-dark tracking-[1.5px] leading-none">
          SIMPLE PRICING.<br />
          <span className="text-brand-gray-title">NO NOISE.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mx-auto">
        {/* Free Plan */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-brand-pill-bg rounded-[24px] border-[4px] border-white shadow-[0_4px_12px_rgba(189,189,189,0.12)] p-8 md:p-10 flex flex-col"
        >
          <h3 className="font-bebas text-[24px] text-[#555] tracking-wide mb-2">LOCAL ONLY</h3>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="font-bebas text-[48px] text-brand-text-dark leading-none">$0</span>
            <span className="font-inter text-[12px] font-bold text-[#B2B2B2] uppercase tracking-wider">/ FOREVER</span>
          </div>
          <p className="font-inter text-[13px] text-[#777] font-medium mb-8 leading-relaxed">
            Perfect for capturing quick thoughts offline. Your data stays entirely on your device.
          </p>
          <div className="space-y-4 mb-10 flex-grow">
            {['Unlimited local notes', 'Markdown support', 'Distraction-free UI'].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white border-[2px] border-[#E8E8E8] flex items-center justify-center shrink-0">
                  <Check size={12} className="text-[#B2B2B2]" strokeWidth={3} />
                </div>
                <span className="font-inter text-[13px] text-[#555] font-semibold">{feature}</span>
              </div>
            ))}
          </div>
          <button className="w-full h-[48px] border-[4px] border-white rounded-[13px] bg-[#E8E8E8] font-bebas text-[16px] text-[#777] uppercase tracking-wide hover:bg-[#D0D0D0] transition-colors pt-0.5 shadow-sm">
            DOWNLOAD FREE
          </button>
        </motion.div>

        {/* Pro Plan */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="bg-brand-pill-bg rounded-[24px] border-[4px] border-white shadow-[0_4px_12px_rgba(189,189,189,0.12)] p-8 md:p-10 flex flex-col relative"
        >
          {/* Recommended Badge */}
          <div className="absolute top-0 right-8 -translate-y-1/2 bg-brand-blue text-white px-4 py-1.5 rounded-full font-inter text-[10px] font-[900] uppercase tracking-widest shadow-[0_4px_10px_rgba(0,112,243,0.2)] border-[2px] border-white">
            RECOMMENDED
          </div>
          
          <h3 className="font-bebas text-[24px] text-brand-blue tracking-wide mb-2">CLOUD PRO</h3>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="font-bebas text-[48px] text-brand-text-dark leading-none">$4</span>
            <span className="font-inter text-[12px] font-bold text-[#B2B2B2] uppercase tracking-wider">/ MONTH</span>
          </div>
          <p className="font-inter text-[13px] text-[#777] font-medium mb-8 leading-relaxed">
            The ultimate focused workspace with instant, secure cloud sync across all your devices.
          </p>
          <div className="space-y-4 mb-10 flex-grow">
            {['Everything in Local', 'Instant Cloud Sync', 'Cross-platform access', 'Version history'].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-blue border-[2px] border-white shadow-sm flex items-center justify-center shrink-0">
                  <Check size={12} className="text-white" strokeWidth={3} />
                </div>
                <span className="font-inter text-[13px] text-[#333] font-bold">{feature}</span>
              </div>
            ))}
          </div>
          <button className="w-full h-[48px] border-[4px] border-brand-blue rounded-[13px] bg-white font-bebas text-[16px] text-[#555] uppercase tracking-wide hover:bg-brand-blue hover:text-white transition-colors pt-0.5 shadow-sm">
            START PRO TRIAL
          </button>
        </motion.div>
      </div>
    </section>
  );
}
