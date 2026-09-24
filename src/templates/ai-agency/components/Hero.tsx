'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Play } from 'lucide-react';
import { BlurText } from './BlurText';

export function Hero() {
  return (
    <section className="relative overflow-visible h-[1000px] bg-black w-full flex flex-col">
      {/* Background Video */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
        className="absolute top-[20%] w-full h-auto object-contain z-0"
        autoPlay
        loop
        muted
        playsInline
        poster="https://picsum.photos/seed/hero/1920/1080"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/5 z-0" />
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] h-[300px]"
        style={{ background: 'linear-gradient(to bottom, transparent, black)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center pt-[150px] px-6 w-full max-w-7xl mx-auto flex-1">
        <div className="liquid-glass rounded-full p-1 pr-5 text-[10px] uppercase tracking-[0.2em] font-medium text-white/80 font-body inline-flex items-center gap-4 mb-8">
          <span className="bg-white text-black rounded-full px-3 py-1.5 font-bold tracking-normal text-xs">New</span>
          Introducing AI‑powered web design
        </div>

        <BlurText
          text="The Website Your Brand Deserves"
          className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] tracking-[-4px] max-w-4xl mx-auto"
          delay={0.1}
        />

        <motion.p
          initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 text-white/60 font-body font-light text-lg md:text-xl max-w-2xl mx-auto"
        >
          Stunning design. Blazing performance. Built by AI, refined by experts. This is web design, wildly reimagined.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-10 flex items-center gap-4"
        >
          <button className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white flex items-center gap-2 hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300 group">
            Get Started
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
          <button className="rounded-full px-6 py-3 text-sm font-medium text-white flex items-center gap-2 hover:text-white/80 hover:scale-105 active:scale-95 transition-all duration-300 group">
            Watch the Film
            <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
