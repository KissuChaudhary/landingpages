'use client';

import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export function Showcase() {
  return (
    <section id="showcase" className="relative z-10 w-full max-w-[1000px] mx-auto px-6 py-20 pb-32">
      <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">

        {/* Text Content - Left Side */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 text-left"
        >
          <h2 className="font-bebas text-[40px] md:text-[56px] font-black uppercase text-brand-text-dark tracking-[1.5px] leading-[1] mb-6">
            ELIMINATE <br />
            <span className="text-brand-gray-title">THE NOISE.</span>
          </h2>
          <p className="font-inter text-[13px] leading-[22px] font-[800] tracking-[0.5px] text-[#B2B2B2] uppercase mb-8 max-w-[400px]">
            YOUR BEST IDEAS DON'T HAPPEN IN CLUTTERED INTERFACES. WE STRIPPED AWAY EVERYTHING BUT THE ESSENTIALS SO YOU CAN THINK CLEARLY.
          </p>

          <div className="flex flex-col gap-4">
            {['MARKDOWN SUPPORT', 'INSTANT CLOUD SYNC', 'DISTRACTION-FREE TYPING'].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-[32px] h-[32px] bg-brand-pill-bg rounded-[10px] border-[2px] border-white shadow-[0_2px_8px_rgba(189,189,189,0.12)] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} className="text-brand-blue" />
                </div>
                <span className="font-bebas text-[20px] text-[#555] tracking-wide pt-1">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Visual - Right Side */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex-1 w-full"
        >
          <div className="w-full bg-brand-pill-bg rounded-[24px] border-[4px] border-white shadow-[0_4px_12px_rgba(189,189,189,0.12)] p-[32px] relative overflow-hidden">
            {/* Note Header */}
            <div className="flex items-center gap-3 mb-[24px]">
              <div className="h-[28px] px-3 bg-white rounded-full border-[2px] border-[#E8E8E8] shadow-[0_2px_8px_rgba(189,189,189,0.12)] flex items-center justify-center">
                <span className="font-inter text-[10px] font-[800] text-[#B2B2B2] uppercase tracking-wider">TODAY</span>
              </div>
              <div className="h-[28px] px-3 bg-brand-blue/10 rounded-full flex items-center justify-center">
                <span className="font-inter text-[10px] font-[800] text-brand-blue uppercase tracking-wider">PRODUCTIVITY</span>
              </div>
            </div>

            {/* Note Title */}
            <h3 className="font-bebas text-[36px] text-[#555] leading-none tracking-wide mb-[16px]">
              THE FUTURE OF NOTE TAKING
            </h3>

            {/* Note Body */}
            <div className="space-y-[16px]">
              <p className="font-inter text-[14px] text-[#777] leading-relaxed font-medium">
                A workspace that actually breathes. No sidebars fighting for attention, no popups. Just you and your thoughts.
              </p>
              
              {/* To-Do Items inside Note */}
              <div className="space-y-[10px] pt-2">
                <div className="flex items-center gap-3 bg-white p-[14px] rounded-[16px] border-[3px] border-white shadow-[0_2px_8px_rgba(189,189,189,0.08)]">
                  <div className="w-[20px] h-[20px] rounded-[6px] border-[2px] border-[#D0D0D0]"></div>
                  <span className="font-inter text-[13px] text-[#555] font-semibold">Redesign the hero section</span>
                </div>
                
                <div className="flex items-center gap-3 bg-white p-[14px] rounded-[16px] border-[3px] border-white shadow-[0_2px_8px_rgba(189,189,189,0.08)]">
                  <div className="w-[20px] h-[20px] rounded-[6px] bg-brand-blue flex items-center justify-center">
                     <CheckCircle2 size={14} className="text-white" />
                  </div>
                  <span className="font-inter text-[13px] text-[#B2B2B2] line-through font-semibold">Eliminate the noise</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
