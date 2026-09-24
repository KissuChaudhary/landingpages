'use client';

import React from 'react';
import Link from 'next/link';
import { SectionHeader } from '@/components/theirs/section-header';
import { DitherGradient } from '@/components/theirs/dither-gradient';
import { Monitor, Smartphone, Tablet, Download, Code2, Check, ArrowRight, Eye } from 'lucide-react';

export function Steps() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 px-4 max-w-5xl mx-auto flex flex-col gap-12 sm:gap-16">
      {/* Section Header */}
      <SectionHeader
        badge="How it works"
        title="Ship your next startup in three simple steps."
        description={
          <>
            Browse 35+ full templates, test them with live responsive device previews,{' '}
            <span className="rounded-md bg-primary/10 box-decoration-clone px-1 py-0.5 text-primary font-medium">
              and export clean Next.js source code
            </span>
            .
          </>
        }
      />

      {/* 3 Refined, Vibrant Showcase Cards */}
      <ul className="grid gap-4 sm:gap-6 lg:grid-cols-3 list-none p-0 m-0">
        {/* Step 01 */}
        <li className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#f6f6f6] pb-6 sm:pb-8 border border-black/[0.06]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(125%_115%_at_0%_0%,#000_0%,#000_18%,transparent_66%)]"
          >
            <DitherGradient from="cyan" bloom="aura" />
          </span>

          <div className="relative flex items-baseline gap-2.5 px-6 py-4 sm:px-8">
            <span className="text-base tabular-nums text-muted-foreground font-medium">01</span>
            <h3 className="text-base font-medium tracking-tight text-[#222]">Browse 35+ Curated Kits</h3>
          </div>

          {/* Micro Preview Box */}
          <div className="relative flex flex-1 items-center justify-center px-4 py-5 sm:px-6 min-h-[200px]">
            <div className="w-full max-w-[19rem] bg-white border border-black/[0.08] rounded-xl p-3.5 shadow-2xs text-left">
              <div className="flex items-center justify-between text-[10px] font-mono text-primary font-medium uppercase">
                <span>Dashboard Kit</span>
                <span className="rounded bg-emerald-50 text-emerald-600 px-1.5 py-0.5 text-[9px] font-bold">READY</span>
              </div>
              <div className="mt-1 text-xs font-semibold text-[#181925]">Apex Analytics Command</div>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="text-[10px] bg-[#f5f5f7] px-2 py-0.5 rounded text-[#666]">#Next.js 15</span>
                <span className="text-[10px] bg-[#f5f5f7] px-2 py-0.5 rounded text-[#666]">#Tailwind v4</span>
              </div>
            </div>
          </div>

          <p className="relative pl-6 pr-6 text-sm leading-6 text-muted-foreground sm:pl-8 sm:pr-8 tracking-tight">
            Find the exact design direction your SaaS needs: investment dashboards, AI copilot hero sections, or high-converting agency landing pages.
          </p>
        </li>

        {/* Step 02 */}
        <li className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#f6f6f6] pb-6 sm:pb-8 border border-black/[0.06]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(125%_115%_at_0%_0%,#000_0%,#000_18%,transparent_66%)]"
          >
            <DitherGradient from="green" bloom="aura" />
          </span>

          <div className="relative flex items-baseline gap-2.5 px-6 py-4 sm:px-8">
            <span className="text-base tabular-nums text-muted-foreground font-medium">02</span>
            <h3 className="text-base font-medium tracking-tight text-[#222]">Test Live Responsiveness</h3>
          </div>

          {/* Micro Preview Box */}
          <div className="relative flex flex-1 items-center justify-center px-4 py-5 sm:px-6 min-h-[200px]">
            <div className="w-full max-w-[19rem] bg-white border border-black/[0.08] rounded-xl p-3.5 shadow-2xs text-center flex flex-col items-center">
              <div className="flex items-center gap-2 rounded-full bg-[#f0f0f2] p-1 text-[11px] font-medium text-[#666]">
                <span className="bg-white text-[#181925] px-2 py-0.5 rounded-full shadow-2xs font-semibold">Desktop</span>
                <span className="px-2 py-0.5">Tablet 768px</span>
                <span className="px-2 py-0.5">Mobile 375px</span>
              </div>
              <div className="mt-3 flex items-center justify-center gap-3 text-xs text-[#555]">
                <Monitor className="size-4 text-emerald-600" />
                <Tablet className="size-4 text-emerald-600" />
                <Smartphone className="size-4 text-emerald-600" />
              </div>
              <span className="mt-2 text-[10px] text-emerald-700 font-mono">100% Verified Fluid Viewports</span>
            </div>
          </div>

          <p className="relative pl-6 pr-6 text-sm leading-6 text-muted-foreground sm:pl-8 sm:pr-8 tracking-tight">
            Use the Cruip-style interactive player to test true CSS media queries on Desktop, Tablet (768px), and Mobile (375px) viewports before using the code.
          </p>
        </li>

        {/* Step 03 */}
        <li className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#f6f6f6] pb-6 sm:pb-8 border border-black/[0.06]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(125%_115%_at_0%_0%,#000_0%,#000_18%,transparent_66%)]"
          >
            <DitherGradient from="blue" bloom="aura" />
          </span>

          <div className="relative flex items-baseline gap-2.5 px-6 py-4 sm:px-8">
            <span className="text-base tabular-nums text-muted-foreground font-medium">03</span>
            <h3 className="text-base font-medium tracking-tight text-[#222]">Export Code & Launch</h3>
          </div>

          {/* Micro Preview Box */}
          <div className="relative flex flex-1 items-center justify-center px-4 py-5 sm:px-6 min-h-[200px]">
            <div className="w-full max-w-[19rem] bg-white border border-black/[0.08] rounded-xl p-3.5 shadow-2xs text-left">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#888]">package.zip</span>
                <Download className="size-3.5 text-primary" />
              </div>
              <div className="mt-2 rounded bg-neutral-900 p-2 font-mono text-[10px] text-emerald-400">
                $ pnpm install && pnpm dev
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#666]">
                <Check className="size-3 text-emerald-500" />
                <span>Commercial license included</span>
              </div>
            </div>
          </div>

          <p className="relative pl-6 pr-6 text-sm leading-6 text-muted-foreground sm:pl-8 sm:pr-8 tracking-tight">
            Download the standalone zip package or copy components into your existing Next.js app. Customize copy and colors, connect auth, and launch.
          </p>
        </li>
      </ul>
    </section>
  );
}
