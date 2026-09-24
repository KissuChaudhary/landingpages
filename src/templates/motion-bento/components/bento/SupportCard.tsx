"use client";
import { motion } from "motion/react";

export function SupportCard() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-between">
       <div className="relative w-full h-40 mt-4 overflow-hidden mask-y-fade flex flex-col justify-end gap-3 pb-2">
          <motion.div
             animate={{ y: [20, 0], opacity: [0, 1] }}
             transition={{ repeat: Infinity, duration: 4, repeatDelay: 1 }}
             className="flex items-end gap-2 self-start w-[85%]"
          >
             <div className="w-6 h-6 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-gray-500">Q</div>
             <div className="bg-gray-50 border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm p-3 w-full">
                <div className="w-full h-1.5 bg-gray-200 rounded-full mb-2" />
                <div className="w-2/3 h-1.5 bg-gray-200 rounded-full" />
             </div>
          </motion.div>

          <motion.div
             animate={{ y: [20, 0], opacity: [0, 1] }}
             transition={{ repeat: Infinity, duration: 4, repeatDelay: 1, delay: 2 }}
             className="flex items-end gap-2 self-end w-[85%] flex-row-reverse"
          >
             <div className="w-6 h-6 rounded-full bg-rose-500 flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-white shadow-md shadow-rose-500/30">A</div>
             <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-br-sm p-3 w-full">
                <div className="w-full h-1.5 bg-rose-100 rounded-full mb-2" />
                <div className="w-4/5 h-1.5 bg-rose-100 rounded-full" />
             </div>
          </motion.div>
       </div>

       <div className="mt-6 text-center">
          <p className="text-sm font-medium text-gray-800 leading-snug">Unlimited support and Q&A from the creator success team</p>
       </div>
    </div>
  )
}
