'use client';

import { motion } from 'motion/react';
import { Check, Folder } from 'lucide-react';
import CardWrapper from './CardWrapper';

export default function BonusMaterialCard() {
  return (
    <CardWrapper title="Bonus material on systemizing your workflow">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Center Folder */}
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="relative z-20"
        >
          <div className="w-20 h-20 bg-red-500 rounded-2xl shadow-2xl shadow-red-500/40 flex items-center justify-center relative overflow-hidden border-4 border-white">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-red-600 opacity-30" />
            <Folder className="w-10 h-10 text-white fill-white/20 relative z-10" />
          </div>
        </motion.div>

        {/* Floating Tags */}
        <FloatingTag text="Templates" delay={0} x={-75} y={-60} rotate={-12} duration={6} />
        <FloatingTag text="Scripts" delay={1.2} x={65} y={-70} rotate={18} duration={7} />
        <FloatingTag text="Workflows" delay={2.5} x={-55} y={60} rotate={8} duration={5.5} />
        <FloatingTag text="Guides" delay={0.8} x={75} y={45} rotate={-10} duration={6.5} />

        {/* Floating Red Cylinders */}
        <FloatingWand delay={0} x={-100} y={20} rotate={45} duration={7} />
        <FloatingWand delay={2} x={100} y={-20} rotate={-35} duration={6} />
      </div>
    </CardWrapper>
  );
}

function FloatingTag({ text, delay, x, y, rotate, duration }: any) {
  return (
    <motion.div
      className="absolute z-10 bg-white border-2 border-white shadow-[0_4px_15px_rgba(0,0,0,0.04)] rounded-full px-4 py-2 flex items-center gap-2"
      initial={{ x, y, rotate }}
      animate={{ 
        y: [y - 12, y + 12, y - 12],
        x: [x - 6, x + 6, x - 6],
        rotate: [rotate - 6, rotate + 6, rotate - 6]
      }}
      transition={{ repeat: Infinity, duration, delay, ease: "easeInOut" }}
    >
      <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
        <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />
      </div>
      <span className="text-[11px] font-bold text-gray-700">{text}</span>
    </motion.div>
  );
}

function FloatingWand({ delay, x, y, rotate, duration }: any) {
  return (
    <motion.div
      className="absolute z-0 w-4 h-16 bg-gradient-to-b from-red-400 to-red-600 rounded-full shadow-lg border-2 border-white/20"
      initial={{ x, y, rotate }}
      animate={{ 
        y: [y - 20, y + 20, y - 20],
        rotate: [rotate - 15, rotate + 15, rotate - 15]
      }}
      transition={{ repeat: Infinity, duration, delay, ease: "easeInOut" }}
    />
  );
}
