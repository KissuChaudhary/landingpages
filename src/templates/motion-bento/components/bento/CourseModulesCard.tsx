"use client";
import { motion } from "motion/react";
import { Check } from "lucide-react";

export function CourseModulesCard() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-between">
       <div className="relative w-full h-40 mt-4 overflow-hidden mask-y-fade flex items-center">
          {/* Static "You" badge */}
          <div className="absolute left-0 z-20 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm shadow-rose-500/20">
             You
          </div>
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-100 z-0" />

          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="flex flex-col gap-3 w-full pl-12 z-10"
          >
             {[...Array(10)].map((_, i) => {
                const isActive = i % 5 === 2;
                return (
                   <div key={i} className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-300 ${isActive ? 'bg-white shadow-sm border-gray-100 scale-105' : 'bg-gray-50/50 border-transparent opacity-40'}`}>
                      <span className={`text-xs font-semibold ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>Week 0{i % 5 + 1} Module</span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isActive ? 'bg-emerald-100 text-emerald-500' : 'bg-gray-200 text-white'}`}>
                         <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                   </div>
                );
             })}
          </motion.div>
       </div>

       <div className="mt-6 text-center">
          <p className="text-sm font-medium text-gray-800 leading-snug">Course modules released weekly as you progress</p>
       </div>
    </div>
  )
}
