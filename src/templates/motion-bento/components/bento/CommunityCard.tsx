"use client";
import { motion } from "motion/react";

export function CommunityCard() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-between">
       <div className="relative w-full flex-1 flex items-center justify-center mt-4">
          {/* Tracks */}
          <div className="absolute w-36 h-36 rounded-full border border-dashed border-gray-200" />
          <div className="absolute w-20 h-20 rounded-full border border-dashed border-gray-200" />

          {/* Center You */}
          <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold text-[10px] shadow-lg shadow-rose-500/30 z-20">
             You
          </div>

          {/* Orbiting Avatars */}
          <motion.div
             animate={{ rotate: 360 }}
             transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
             className="absolute w-36 h-36 z-10"
          >
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://picsum.photos/seed/user1/100/100" alt="User" className="w-full h-full object-cover" />
             </div>
             <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://picsum.photos/seed/user2/100/100" alt="User" className="w-full h-full object-cover" />
             </div>
          </motion.div>

          <motion.div
             animate={{ rotate: -360 }}
             transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
             className="absolute w-20 h-20 z-10"
          >
             <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://picsum.photos/seed/user3/100/100" alt="User" className="w-full h-full object-cover" />
             </div>
             <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://picsum.photos/seed/user4/100/100" alt="User" className="w-full h-full object-cover" />
             </div>
          </motion.div>
       </div>

       <div className="mt-6 text-center">
          <p className="text-sm font-medium text-gray-800 leading-snug">Access to private community of entrepreneurs</p>
       </div>
    </div>
  )
}
