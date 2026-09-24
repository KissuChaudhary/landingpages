'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/templates/magnetic-grid/lib/utils';

type AuroraMeshBackgroundProps = React.ComponentProps<'div'> & {
  colors?: string[];
  speed?: 'slow' | 'normal' | 'fast';
};

function AuroraMeshBackground({
  colors = ['#4f46e5', '#0ea5e9', '#d946ef'],
  speed = 'normal',
  className,
  children,
  ...props
}: AuroraMeshBackgroundProps) {
  const durationMap = {
    slow: 25,
    normal: 15,
    fast: 8,
  };

  const baseDuration = durationMap[speed] || 15;

  return (
    <div
      className={cn('relative size-full overflow-hidden bg-[#020202]', className)}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden blur-[120px] opacity-60 mix-blend-screen pointer-events-none">
        {/* Blob 1 */}
        <motion.div
          animate={{
            x: ['0%', '30%', '-20%', '0%'],
            y: ['0%', '-40%', '20%', '0%'],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: baseDuration,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full"
          style={{ backgroundColor: colors[0] }}
        />
        
        {/* Blob 2 */}
        <motion.div
          animate={{
            x: ['0%', '-40%', '30%', '0%'],
            y: ['0%', '30%', '-30%', '0%'],
            scale: [1, 0.9, 1.3, 1],
          }}
          transition={{
            duration: baseDuration * 1.3,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-[30%] right-[20%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full"
          style={{ backgroundColor: colors[1] }}
        />
        
        {/* Blob 3 */}
        <motion.div
          animate={{
            x: ['0%', '20%', '-40%', '0%'],
            y: ['0%', '40%', '-20%', '0%'],
            scale: [1, 1.4, 0.9, 1],
          }}
          transition={{
            duration: baseDuration * 1.6,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-[10%] left-[30%] w-[45vw] h-[45vw] max-w-[700px] max-h-[700px] rounded-full"
          style={{ backgroundColor: colors[2] }}
        />
      </div>

      {/* Noise Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.04] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-20 size-full">
        {children}
      </div>
    </div>
  );
}

export { AuroraMeshBackground, type AuroraMeshBackgroundProps };
