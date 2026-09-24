'use client';

import { motion } from 'motion/react';
import { MousePointer2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import CardWrapper from './CardWrapper';

export default function PersonalizedFeedbackCard() {
  const [oscarPos, setOscarPos] = useState({ x: 140, y: 60 });
  const [laurenPos, setLaurenPos] = useState({ x: 40, y: 130 });
  const [activeElement, setActiveElement] = useState<string | null>(null);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      if (step === 0) {
        setOscarPos({ x: 180, y: 30 }); // Move to video
        setActiveElement('video');
      } else if (step === 1) {
        setLaurenPos({ x: 80, y: 100 }); // Move to title
        setActiveElement('title');
      } else if (step === 2) {
        setOscarPos({ x: 150, y: 120 }); // Move to description
        setActiveElement('desc');
      } else if (step === 3) {
        setLaurenPos({ x: 30, y: 150 }); // Move away
        setActiveElement(null);
      }
      step = (step + 1) % 4;
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <CardWrapper title="Personalized feedback on your content and channel strategy">
      <div className="relative w-[260px] h-[200px] bg-white border-2 border-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-4 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-4 bg-red-500 rounded flex items-center justify-center">
            <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[4px] border-l-white border-b-[3px] border-b-transparent ml-0.5" />
          </div>
          <div className="h-2 w-16 bg-gray-100 rounded-full" />
          <div className="flex-1" />
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-gray-100" />
            <div className="w-2 h-2 rounded-full bg-gray-100" />
          </div>
        </div>

        {/* Video Box */}
        <motion.div 
          className="w-full h-24 rounded-xl border-2 transition-all duration-500"
          animate={{ 
            borderColor: activeElement === 'video' ? '#EF4444' : '#F3F4F6',
            backgroundColor: activeElement === 'video' ? '#FEF2F2' : '#F9FAFB',
            boxShadow: activeElement === 'video' ? '0 0 20px rgba(239, 68, 68, 0.1)' : 'none'
          }}
        />

        {/* Title & Profile */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 shrink-0" />
          <div className="flex-1 space-y-2.5 pt-1">
            <motion.div 
              className="h-2.5 rounded-full w-3/4 transition-colors duration-500"
              animate={{ backgroundColor: activeElement === 'title' ? '#FCA5A5' : '#F3F4F6' }}
            />
            <motion.div 
              className="h-2 rounded-full w-full transition-colors duration-500"
              animate={{ backgroundColor: activeElement === 'desc' ? '#FCA5A5' : '#F3F4F6' }}
            />
          </div>
        </div>

        {/* Cursors */}
        <Cursor name="Oscar Gracie" pos={oscarPos} color="bg-red-500" />
        <Cursor name="Lauren Brenner" pos={laurenPos} color="bg-red-600" />
      </div>
    </CardWrapper>
  );
}

function Cursor({ name, pos, color }: { name: string, pos: {x: number, y: number}, color: string }) {
  return (
    <motion.div
      className="absolute z-30 pointer-events-none"
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <MousePointer2 className={`w-4 h-4 text-red-500 fill-red-500`} style={{ transform: 'rotate(-15deg)' }} />
      <div className={`${color} text-white text-[9px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ml-3 mt-1 shadow-md`}>
        {name}
      </div>
    </motion.div>
  );
}
