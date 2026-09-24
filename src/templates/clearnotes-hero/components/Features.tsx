'use client';

import { motion } from 'motion/react';
import { Zap, Layers, Focus } from 'lucide-react';

const features = [
  {
    icon: <Zap size={24} className="text-brand-blue" />,
    title: 'LIGHTNING CAPTURE',
    description: 'NEVER LOSE A THOUGHT. JOT DOWN IDEAS IN MILLISECONDS BEFORE THEY VANISH.'
  },
  {
    icon: <Layers size={24} className="text-brand-blue" />,
    title: 'SMART ORGANIZATION',
    description: 'TAGS AND FOLDERS THAT GET OUT OF YOUR WAY, KEEPING YOUR WORKSPACE CLUTTER-FREE.'
  },
  {
    icon: <Focus size={24} className="text-brand-blue" />,
    title: 'DEEP FOCUS MODE',
    description: 'MINIMALIST UI THAT FADES INTO THE BACKGROUND SO YOU CAN CONCENTRATE ON WRITING.'
  }
];

export function Features() {
  return (
    <section id="features" className="relative z-10 w-full max-w-[1000px] mx-auto px-6 py-20">
      
      {/* Section Header */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <h2 className="font-bebas text-[36px] md:text-[48px] font-black uppercase text-brand-text-dark tracking-[1.5px] leading-none">
          EVERYTHING YOU NEED.<br />
          <span className="text-brand-gray-title">NOTHING YOU DON'T.</span>
        </h2>
      </motion.div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
            className="flex flex-col items-center text-center bg-brand-pill-bg rounded-[24px] border-[4px] border-white shadow-[0_4px_12px_rgba(189,189,189,0.12)] p-8 hover:-translate-y-1 transition-transform duration-300"
          >
            {/* Icon Wrapper */}
            <div className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-6">
              {feature.icon}
            </div>
            
            {/* Content */}
            <h3 className="font-bebas text-[22px] font-bold text-[#555] uppercase tracking-wide mb-3">
              {feature.title}
            </h3>
            <p className="font-inter text-[12px] leading-[18px] font-[800] tracking-[0.5px] text-[#B2B2B2] uppercase">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
