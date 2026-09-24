'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, ArrowRight, Sparkles, Layers, CheckCircle2 } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 6 spotlight templates for the panorama
  const spotlight = TEMPLATES.slice(0, 6);

  return (
    <section className="relative pt-16 sm:pt-14 pb-0 px-4 text-center overflow-hidden flex flex-col items-center bg-white">
      <div className="max-w-5xl mx-auto flex flex-col items-center w-full">
        {/* Eyebrow Badge */}
        <div className="mb-3.5 flex justify-center">
          <span
            data-slot="badge"
            className="flex items-center justify-center border font-medium w-fit whitespace-nowrap border-transparent bg-neutral-100 text-[#666] h-[24px] min-w-[24px] text-xs px-2.5 rounded-md select-none"
          >
            35+ Production-Ready Next.js & Tailwind Kits
          </span>
        </div>

        {/* Commanding Two-Line Headline */}
        <h1 className="text-balance text-4xl sm:text-6xl lg:text-[68px] font-medium tracking-[-0.04em] text-[#181925] leading-[1.04] mb-3.5">
          Ship your startup with templates
          <br />
          <span className="text-primary">that look like a $50k design studio built them.</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-[660px] text-pretty text-base sm:text-xl leading-relaxed text-[#666] mb-5 sm:mb-6">
          A curated library of high-converting landing pages, financial analytics dashboards, animated bento grids, and interactive hero sections{' '}
          <span className="rounded-md bg-primary/10 box-decoration-clone px-1 py-0.5 text-primary font-medium">
            with live responsive demo access
          </span>{' '}
          — built with Next.js 15, React 19 and Tailwind CSS.
        </p>

        {/* High-Converting Search Pill Box */}
        <div className="w-full max-w-lg flex flex-col items-center gap-2 mb-4 sm:mb-5">
          <form
            onSubmit={handleSearch}
            className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 sm:p-1.5 sm:rounded-full sm:bg-[#f7f7f8] sm:border sm:border-black/[0.08] sm:shadow-2xs transition-colors sm:focus-within:border-primary/50"
          >
            <div className="flex-1 flex items-center gap-2 px-4 py-2.5 sm:py-1.5 text-sm rounded-full bg-[#f7f7f8] border border-black/[0.08] sm:border-none sm:bg-transparent shadow-2xs sm:shadow-none focus-within:border-primary/50 transition-colors">
              <span className="text-xs sm:text-sm text-[#888] font-medium shrink-0 select-none">
                Search
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Fintech, SaaS, Agency, Bento..."
                className="w-full bg-transparent font-medium text-[#181925] outline-none placeholder:text-[#aaa] text-sm"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap !rounded-full font-medium transition-all cursor-pointer border border-[color-mix(in_srgb,var(--primary)_80%,#12245e)] bg-[color-mix(in_srgb,var(--primary)_90%,#12245e)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(18,36,94,0.4)] transform-gpu hover:bg-primary active:scale-[0.98] h-11 sm:h-10 px-5 text-sm group shrink-0 select-none w-full sm:w-auto"
            >
              <span>Explore 35+ Kits</span>
              <span className="relative size-3.5 overflow-hidden inline-flex items-center">
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </button>
          </form>

          {/* Clean Trust Line */}
          <span className="text-xs text-[#888] select-none">
            Next.js 15 · Tailwind CSS v4 · 100% Live Demos · Commercial License Included
          </span>
        </div>
      </div>

      {/* Panorama Showcase of Live Templates */}
      <div className="w-full max-w-6xl mx-auto mt-8 sm:mt-12 px-4">
        <div className="relative rounded-3xl border border-black/[0.06] bg-[#f7f7f8] p-4 sm:p-8 overflow-hidden shadow-sm">
          {/* Top Browser Bar */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/[0.04] text-xs text-[#888]">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-red-400" />
              <span className="size-2.5 rounded-full bg-amber-400" />
              <span className="size-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 font-mono text-[11px] text-[#999]">founderdada.com/demo/showcase</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-[#666]">
              <span>35 Total Templates</span>
              <span>·</span>
              <span className="text-primary font-semibold">Live Preview Active</span>
            </div>
          </div>

          {/* Grid of Micro Preview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {spotlight.map((template) => (
              <div
                key={template.slug}
                className="group relative flex flex-col justify-between rounded-xl border border-black/[0.06] bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-primary uppercase font-semibold tracking-wider">
                      {template.category}
                    </span>
                    <span className="rounded bg-[#f0f0f2] px-1.5 py-0.5 text-[9px] font-medium text-[#666]">
                      {template.badge}
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-[#181925] group-hover:text-primary transition-colors line-clamp-1">
                    {template.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#777] line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-black/[0.04] pt-3 text-xs">
                  <Link
                    href={template.demoUrl}
                    className="inline-flex items-center gap-1 font-medium text-primary hover:underline text-[11px]"
                  >
                    <Eye className="size-3" />
                    <span>Live Demo</span>
                  </Link>
                  <Link
                    href={template.detailUrl}
                    className="text-[#888] hover:text-[#181925] text-[11px]"
                  >
                    Specs &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
