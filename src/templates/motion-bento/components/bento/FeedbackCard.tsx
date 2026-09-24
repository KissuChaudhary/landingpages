"use client";
import { motion } from "motion/react";

export function FeedbackCard() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-between">
       <div className="relative w-full flex-1 mt-4 border border-gray-100 rounded-2xl bg-gray-50/50 p-2 overflow-hidden">
          {/* Fake Video Player */}
          <div className="w-full h-24 bg-white border border-gray-100 rounded-xl mb-2 flex flex-col shadow-sm">
             <div className="flex items-center gap-1.5 p-2 border-b border-gray-50">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <div className="w-16 h-1 bg-gray-200 rounded-full" />
             </div>
             <div className="flex-1 bg-rose-50/50 m-2 rounded-lg border border-rose-100/50" />
          </div>
          {/* Fake Comments */}
          <div className="flex gap-2 mb-2 px-1">
             <div className="w-6 h-6 rounded-full bg-gray-200 shrink-0" />
             <div className="flex-1">
                <div className="w-1/2 h-1.5 bg-gray-200 rounded-full mb-1.5" />
                <div className="w-full h-8 bg-white border border-gray-100 rounded-lg shadow-sm" />
             </div>
          </div>

          {/* Cursors */}
          <motion.div
             animate={{ x: [0, 60, 30, 0], y: [0, 30, -10, 0] }}
             transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
             className="absolute top-12 left-10 z-20 flex flex-col items-start"
          >
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md -rotate-12">
                <path d="M5.5 3.21V20.8C5.5 21.45 6.27 21.8 6.76 21.36L11.44 17.15C11.62 16.99 11.86 16.9 12.11 16.9H18.5C19.05 16.9 19.5 16.45 19.5 15.9V3.21C19.5 2.66 19.05 2.21 18.5 2.21H6.5C5.95 2.21 5.5 2.66 5.5 3.21Z" fill="#ef4444" stroke="white" strokeWidth="2"/>
             </svg>
             <div className="bg-rose-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full ml-3 -mt-1 shadow-sm">
                Oscar Gracie
             </div>
          </motion.div>

          <motion.div
             animate={{ x: [100, 40, 80, 100], y: [80, 50, 90, 80] }}
             transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
             className="absolute top-0 left-0 z-20 flex flex-col items-start"
          >
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md -rotate-12">
                <path d="M5.5 3.21V20.8C5.5 21.45 6.27 21.8 6.76 21.36L11.44 17.15C11.62 16.99 11.86 16.9 12.11 16.9H18.5C19.05 16.9 19.5 16.45 19.5 15.9V3.21C19.5 2.66 19.05 2.21 18.5 2.21H6.5C5.95 2.21 5.5 2.66 5.5 3.21Z" fill="#ef4444" stroke="white" strokeWidth="2"/>
             </svg>
             <div className="bg-rose-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full ml-3 -mt-1 shadow-sm">
                Lauren Brenner
             </div>
          </motion.div>
       </div>

       <div className="mt-6 text-center">
          <p className="text-sm font-medium text-gray-800 leading-snug">Personalized feedback on your content and channel strategy</p>
       </div>
    </div>
  )
}
