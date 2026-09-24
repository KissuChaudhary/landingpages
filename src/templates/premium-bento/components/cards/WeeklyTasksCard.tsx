'use client';

import { motion } from 'motion/react';
import { Bot, Check, MousePointer2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import CardWrapper from './CardWrapper';

export default function WeeklyTasksCard() {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: 60, y: 120 });

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      if (step === 0) {
        setCursorPos({ x: 40, y: 30 }); // Move to item 1
      } else if (step === 1) {
        setCheckedItems([0]); // Click item 1
      } else if (step === 2) {
        setCursorPos({ x: 40, y: 80 }); // Move to item 2
      } else if (step === 3) {
        setCheckedItems([0, 1]); // Click item 2
      } else if (step === 4) {
        setCursorPos({ x: 100, y: 140 }); // Move away
      } else if (step === 5) {
        setCheckedItems([]); // Reset
      }
      step = (step + 1) % 6;
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <CardWrapper title="Weekly tasks and AI-powered tools to implement faster">
      <div className="relative w-full flex flex-col items-center">
        {/* Floating Icon */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="w-16 h-16 bg-red-500 rounded-full shadow-xl shadow-red-500/30 flex items-center justify-center mb-10 z-10 border-4 border-white"
        >
          <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        {/* Checklist */}
        <div className="w-44 space-y-3 relative">
          {['Weekly tasks', 'AI-powered tools'].map((text, idx) => {
            const isChecked = checkedItems.includes(idx);
            return (
              <div key={idx} className="bg-white border-2 border-white shadow-[0_4px_15px_rgba(0,0,0,0.03)] rounded-2xl p-3 flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-500 ${isChecked ? 'bg-green-500 border-green-500' : 'border-gray-200'}`}>
                  {isChecked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Check className="w-3 h-3 text-white" strokeWidth={4} />
                    </motion.div>
                  )}
                </div>
                <span className={`text-[11px] font-semibold transition-all duration-500 ${isChecked ? 'text-gray-300' : 'text-gray-700'}`}>
                  {text}
                </span>
              </div>
            );
          })}

          {/* Animated Cursor */}
          <motion.div
            className="absolute z-20 pointer-events-none"
            animate={{ x: cursorPos.x, y: cursorPos.y }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <MousePointer2 className="w-5 h-5 text-red-500 fill-red-500 drop-shadow-lg" style={{ transform: 'rotate(-15deg)' }} />
          </motion.div>
        </div>
      </div>
    </CardWrapper>
  );
}
