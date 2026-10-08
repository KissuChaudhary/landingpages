'use client';

import React from 'react';
import Link from 'next/link';
import { DitherGradient } from '@/components/theirs/dither-gradient';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';
import { PRICING, formatPrice } from '@/data/pricing';

export function CtaBanner() {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden bg-white">
      <div className="max-w-5xl mx-auto relative">
        {/* Dark Charcoal CTA Card */}
        <div className="relative z-10 overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#1a1a1f] p-10 sm:p-20 text-center text-white shadow-2xl flex flex-col items-center justify-center">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-radial from-white/[0.04] via-transparent to-transparent pointer-events-none" />

          {/* Dither Pattern Background Cover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden select-none opacity-60 z-0"
          >
            <DitherGradient from="#305dde" bloom="aura" direction="down" />
          </div>

          {/* Brand Sparkle Emblem */}
          <div className="relative z-10 flex items-center justify-center mb-6 select-none">
            <div className="size-14 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-primary shadow-lg">
              <Sparkles className="size-7 text-primary" />
            </div>
          </div>

          {/* Headline */}
          <h2 className="relative z-10 text-balance text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.15] max-w-3xl mx-auto mb-3.5">
            Start with {TEMPLATES.length} production templates.{' '}
            <span className="text-neutral-400 font-normal block mt-1 sm:mt-1.5">
              Ship your SaaS before the week ends.
            </span>
          </h2>

          <p className="relative z-10 text-sm sm:text-base text-neutral-300 max-w-xl mx-auto mb-8 leading-relaxed">
            You don't need to spend weeks designing from scratch. Pick a layout, test the responsive demo, and launch with clean Next.js 15 & Tailwind code.
          </p>

          {/* Action Button Pill */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#catalog"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap !rounded-full font-medium transition-all cursor-pointer bg-white text-[#181925] hover:bg-neutral-100 active:scale-[0.98] h-11 px-6 text-sm group shrink-0 select-none shadow-sm"
            >
              <span>Explore All {TEMPLATES.length} Templates</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap !rounded-full font-medium transition-all cursor-pointer border border-white/20 bg-white/10 text-white hover:bg-white/20 active:scale-[0.98] h-11 px-6 text-sm select-none"
            >
              <span>Get all-access ({formatPrice(PRICING.allAccess.price)})</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
