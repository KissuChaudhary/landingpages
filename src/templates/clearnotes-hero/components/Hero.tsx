'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export function Hero() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-[140px] pb-[80px]">
      
      {/* Trust Badge */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="flex items-center gap-2.5 bg-brand-pill-bg h-[40px] px-2 pr-[14px] rounded-[18px] border-[4px] border-white shadow-[0_4px_12px_rgba(189,189,189,0.12)] mb-[30px]"
      >
        {/* Avatars */}
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white bg-gray-200">
            <Image src="https://picsum.photos/seed/avatar1/100/100" alt="User 1" width={24} height={24} referrerPolicy="no-referrer" />
          </div>
          <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white bg-gray-300">
            <Image src="https://picsum.photos/seed/avatar2/100/100" alt="User 2" width={24} height={24} referrerPolicy="no-referrer" />
          </div>
          <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white bg-gray-400">
            <Image src="https://picsum.photos/seed/avatar3/100/100" alt="User 3" width={24} height={24} referrerPolicy="no-referrer" />
          </div>
        </div>
        <div className="font-bebas text-[11px] text-[#777] uppercase tracking-wide flex items-center mt-0.5">
          TRUSTED BY <span className="text-brand-blue ml-1">10,000+</span><span className="ml-1">USERS</span>
        </div>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="font-bebas text-[48px] md:text-[64px] font-black uppercase leading-[0.95] tracking-[2px] flex flex-col items-center"
      >
        <span className="text-brand-blue max-w-[570px] inline-block">
          TURN SCATTERED THOUGHTS
        </span>
        <span className="text-brand-gray-title mt-[12px]">
          INTO CLEAR NOTES
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="mt-[18px] max-w-[380px] font-inter text-[13px] leading-[15px] font-[800] tracking-[0.5px] text-[#B2B2B2] uppercase text-center"
      >
        CAPTURE IDEAS, ORGANIZE INFORMATION, AND KEEP EVERYTHING IN ONE PLACE DESIGNED FOR FOCUSED THINKING.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="mt-[22px] flex flex-wrap items-center justify-center gap-[8px]"
      >
        <button className="w-[112px] h-[48px] border-[4px] border-brand-blue rounded-[13px] bg-white font-bebas text-[16px] text-[#555] uppercase tracking-wide hover:bg-brand-blue hover:text-white transition-colors pt-0.5">
          GET STARTED
        </button>
        <button className="w-[110px] h-[48px] border-[4px] border-[#BEBEBE] rounded-[13px] bg-white font-bebas text-[16px] text-[#555] uppercase tracking-wide hover:bg-[#BEBEBE] hover:text-white transition-colors pt-0.5">
          LEARN MORE
        </button>
      </motion.div>

    </div>
  );
}
