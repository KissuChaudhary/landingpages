"use client";
import { motion } from "motion/react";
import { Play } from "lucide-react";

export function LiveCohortCard() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-between">
       {/* Top part: Avatars and Live badge */}
       <div className="relative w-full flex justify-center items-center mt-6">
          {/* Connection lines */}
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-12" overflow="visible">
             <path d="M 0 0 Q 32 24 64 24 T 128 0" fill="none" stroke="#fecdd3" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
          <div className="flex gap-12 z-10">
             <div className="w-12 h-12 rounded-full bg-gray-200 border-4 border-white shadow-sm overflow-hidden">
                <img src="https://picsum.photos/seed/oscar/100/100" alt="Oscar" className="w-full h-full object-cover" />
             </div>
             <div className="w-12 h-12 rounded-full bg-gray-200 border-4 border-white shadow-sm overflow-hidden">
                <img src="https://picsum.photos/seed/lauren/100/100" alt="Lauren" className="w-full h-full object-cover" />
             </div>
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full px-3 py-1 shadow-sm border border-gray-100 flex items-center gap-1.5 z-20">
             <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
             <span className="text-[10px] font-semibold text-gray-700 uppercase tracking-wider">Live</span>
          </div>
       </div>

       {/* Scrolling list */}
       <div className="relative w-full h-28 mt-8 overflow-hidden mask-y-fade">
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="flex flex-col gap-2.5 w-full"
          >
             {/* Duplicate list for seamless scrolling */}
             {[1, 2, 3, 4, 1, 2, 3, 4].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50/80 rounded-2xl p-2.5 border border-gray-100/50">
                   <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 shrink-0">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                   </div>
                   <div className="flex-1 flex flex-col gap-1.5">
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                         <div className="w-1/3 h-full bg-gray-300 rounded-full" />
                      </div>
                   </div>
                   <span className="text-[10px] font-medium text-gray-400 shrink-0">Week 0{item}</span>
                </div>
             ))}
          </motion.div>
       </div>

       {/* Text content */}
       <div className="mt-6 text-center">
          <p className="text-sm font-medium text-gray-800 leading-snug">8 weeks of live weekly cohort training with Oscar and Lauren</p>
       </div>
    </div>
  )
}
