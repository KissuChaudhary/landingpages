'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import CardWrapper from './CardWrapper';

export default function LiveCohortCard() {
  return (
    <CardWrapper title="8 weeks of live weekly cohort training with Oscar and Lauren">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Avatars and Live Pill */}
        <div className="relative flex items-center justify-center gap-10 mb-8">
          {/* Red connectors */}
          <svg className="absolute inset-0 w-full h-full -z-0" style={{ overflow: 'visible' }}>
            <path d="M 25% 20 Q 50% 45, 50% 45" fill="none" stroke="#FECACA" strokeWidth="1" />
            <path d="M 75% 20 Q 50% 45, 50% 45" fill="none" stroke="#FECACA" strokeWidth="1" />
          </svg>

          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-lg z-10">
            <Image src="https://picsum.photos/seed/oscar/200/200" alt="Oscar" fill className="object-cover" />
          </div>
          
          <motion.div 
            className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white px-2.5 py-1 rounded-full shadow-sm border border-red-50 z-20"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="text-[9px] font-bold text-gray-800">Live</span>
          </motion.div>

          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-lg z-10">
            <Image src="https://picsum.photos/seed/lauren/200/200" alt="Lauren" fill className="object-cover" />
          </div>
        </div>

        {/* Video Player Mockup */}
        <div className="relative w-full flex flex-col items-center gap-2">
          {/* Active Player */}
          <div className="w-[85%] bg-white rounded-2xl p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border-2 border-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shrink-0 shadow-sm">
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-white border-b-[4px] border-b-transparent ml-0.5" />
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="h-1.5 bg-gray-100 rounded-full w-3/4" />
              <div className="h-1 bg-gray-50 rounded-full w-1/2" />
            </div>
            <div className="text-[9px] text-gray-400 font-medium pr-1">Week 04</div>
          </div>

          {/* Faded upcoming weeks with gradient mask */}
          <div className="w-[85%] opacity-40 space-y-2">
            <div className="bg-white/50 rounded-2xl p-2.5 border-2 border-white/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-1.5 bg-gray-100 rounded-full w-3/4" />
              </div>
              <div className="text-[9px] text-gray-400 font-medium pr-1">Week 05</div>
            </div>
          </div>
          
          {/* Bottom fade mask */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#F9FAFB] to-transparent pointer-events-none" />
        </div>
      </div>
    </CardWrapper>
  );
}
