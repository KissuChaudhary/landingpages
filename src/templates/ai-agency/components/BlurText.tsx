'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function BlurText({ text, className = '', delay = 0 }: BlurTextProps) {
  const words = text.split(' ');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: [0, 0.5, 1],
      y: [50, -5, 0],
      filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
      transition: {
        duration: 0.35,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)',
    },
  };

  return (
    <motion.h1
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
