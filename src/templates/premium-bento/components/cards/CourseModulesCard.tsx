'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import CardWrapper from './CardWrapper';

const modules = [
  "Week 06 Module",
  "Week 07 Module",
  "Week 08 Module",
  "Week 01 Module",
  "Week 02 Module",
];

export default function CourseModulesCard() {
  const [activeIndex, setActiveIndex] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % modules.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CardWrapper title="Course modules released weekly as you progress">
      <div className="relative w-full max-w-[220px] flex flex-col gap-1.5">
        {/* Vertical fade masks */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#F9FAFB] to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#F9FAFB] to-transparent z-20 pointer-events-none" />

        {modules.map((mod, idx) => {
          const isActive = idx === activeIndex;
          
          return (
            <div key={mod} className="relative flex items-center h-12 px-2">
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="active-module-container"
                    className="absolute inset-0 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-50 flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  >
                    <div className="w-1 h-4 bg-red-500 rounded-full ml-3" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    initial={{ scale: 0, x: -20 }}
                    animate={{ scale: 1, x: -45 }}
                    exit={{ scale: 0, x: -20 }}
                    className="absolute left-0 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/20 z-30"
                  >
                    <span className="text-white text-[8px] font-bold">You</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative z-10 flex items-center justify-between w-full pl-6 pr-2">
                <span className={`text-[11px] font-semibold transition-colors duration-500 ${isActive ? 'text-gray-900' : 'text-gray-300'}`}>
                  {mod}
                </span>
                
                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-green-500' : 'bg-gray-100 opacity-40'}`}>
                  <Check className={`w-3 h-3 ${isActive ? 'text-white' : 'text-gray-400'}`} strokeWidth={4} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </CardWrapper>
  );
}
