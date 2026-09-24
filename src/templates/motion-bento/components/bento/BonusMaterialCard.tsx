"use client";
import { motion } from "motion/react";
import { Folder, Check } from "lucide-react";

export function BonusMaterialCard() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-between">
       <div className="relative w-full flex-1 flex items-center justify-center mt-4">
          {/* Center Folder */}
          <motion.div
             animate={{ y: [-5, 5, -5] }}
             transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
             className="z-20"
          >
             <Folder className="w-20 h-20 text-rose-500 fill-rose-500 drop-shadow-xl" />
          </motion.div>

          {/* Floating Pills */}
          <motion.div
             animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
             transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
             className="absolute top-2 left-4 bg-white border border-gray-100 shadow-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 z-10"
          >
             <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500">
                <Check className="w-2.5 h-2.5" strokeWidth={3} />
             </div>
             <span className="text-[10px] font-semibold text-gray-700">Templates</span>
          </motion.div>

          <motion.div
             animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }}
             transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
             className="absolute top-6 right-2 bg-white border border-gray-100 shadow-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 z-10"
          >
             <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500">
                <Check className="w-2.5 h-2.5" strokeWidth={3} />
             </div>
             <span className="text-[10px] font-semibold text-gray-700">Scripts</span>
          </motion.div>

          <motion.div
             animate={{ y: [-8, 8, -8], rotate: [-3, 3, -3] }}
             transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1.5 }}
             className="absolute bottom-10 right-4 bg-white border border-gray-100 shadow-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 z-10"
          >
             <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500">
                <Check className="w-2.5 h-2.5" strokeWidth={3} />
             </div>
             <span className="text-[10px] font-semibold text-gray-700">Guides</span>
          </motion.div>

          <motion.div
             animate={{ y: [8, -8, 8], rotate: [3, -3, 3] }}
             transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 2 }}
             className="absolute bottom-2 left-8 bg-white border border-gray-100 shadow-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 z-10"
          >
             <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500">
                <Check className="w-2.5 h-2.5" strokeWidth={3} />
             </div>
             <span className="text-[10px] font-semibold text-gray-700">Workflows</span>
          </motion.div>

          {/* Floating Wands */}
          <motion.div
             animate={{ y: [-15, 15, -15], rotate: [45, 55, 45] }}
             transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.2 }}
             className="absolute bottom-6 left-0 w-2 h-12 bg-rose-500 rounded-full shadow-lg shadow-rose-500/40 z-0"
          >
             <div className="w-full h-3 bg-white/30 rounded-t-full" />
          </motion.div>

          <motion.div
             animate={{ y: [15, -15, 15], rotate: [-45, -55, -45] }}
             transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.8 }}
             className="absolute bottom-8 right-0 w-2 h-12 bg-rose-500 rounded-full shadow-lg shadow-rose-500/40 z-0"
          >
             <div className="w-full h-3 bg-white/30 rounded-t-full" />
          </motion.div>
       </div>

       <div className="mt-6 text-center">
          <p className="text-sm font-medium text-gray-800 leading-snug">Bonus material on systemizing your workflow</p>
       </div>
    </div>
  )
}
