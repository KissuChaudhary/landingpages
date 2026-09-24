"use client";
import { motion } from "motion/react";
import { Bot, CheckSquare, Sparkles } from "lucide-react";

export function WeeklyTasksCard() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-between">
       <div className="relative w-full flex-1 flex flex-col items-center justify-center mt-2">
          {/* Central Icon */}
          <div className="w-14 h-14 rounded-full bg-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/30 mb-6 z-10">
             <Bot className="w-7 h-7 text-white" />
          </div>

          {/* Swapping Pills */}
          <div className="relative w-full h-20 flex justify-center">
             <motion.div
                animate={{ y: [0, 36, 36, 0, 0], scale: [1, 0.9, 0.9, 1, 1], opacity: [1, 0.5, 0.5, 1, 1], zIndex: [20, 10, 10, 20, 20] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-0 bg-white border border-gray-100 shadow-sm rounded-full px-4 py-2 flex items-center gap-2"
             >
                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                   <CheckSquare className="w-3 h-3" />
                </div>
                <span className="text-xs font-semibold text-gray-700">Weekly tasks</span>
             </motion.div>

             <motion.div
                animate={{ y: [36, 0, 0, 36, 36], scale: [0.9, 1, 1, 0.9, 0.9], opacity: [0.5, 1, 1, 0.5, 0.5], zIndex: [10, 20, 20, 10, 10] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-0 bg-white border border-gray-100 shadow-sm rounded-full px-4 py-2 flex items-center gap-2"
             >
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500">
                   <Sparkles className="w-3 h-3" strokeWidth={2.5} />
                </div>
                <span className="text-xs font-semibold text-gray-700">AI-powered tools</span>
             </motion.div>

             {/* Cursor */}
             <motion.div
                animate={{ x: [30, -10, -10, 30, 30], y: [20, 10, 40, 50, 20], scale: [1, 0.9, 1, 0.9, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-2 left-1/2 z-30"
             >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
                   <path d="M5.5 3.21V20.8C5.5 21.45 6.27 21.8 6.76 21.36L11.44 17.15C11.62 16.99 11.86 16.9 12.11 16.9H18.5C19.05 16.9 19.5 16.45 19.5 15.9V3.21C19.5 2.66 19.05 2.21 18.5 2.21H6.5C5.95 2.21 5.5 2.66 5.5 3.21Z" fill="#ef4444" stroke="white" strokeWidth="2"/>
                </svg>
             </motion.div>
          </div>
       </div>

       <div className="mt-6 text-center">
          <p className="text-sm font-medium text-gray-800 leading-snug">Weekly tasks and AI-powered tools to implement faster</p>
       </div>
    </div>
  )
}
