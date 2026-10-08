import React from 'react';
import { ArrowRight } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';
import { PRICING, formatPrice } from '@/data/pricing';

export default function Hero() {
  const count = TEMPLATES.length;

  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-white px-4 pb-8 pt-14 text-center sm:pb-10 sm:pt-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
        {/* Eyebrow Badge */}
        <span className="mb-4 flex h-[24px] w-fit select-none items-center justify-center whitespace-nowrap rounded-md bg-neutral-100 px-2.5 text-xs font-medium text-[#666]">
          {count} production-ready Next.js templates
        </span>

        {/* Two-line headline */}
        <h1 className="mb-5 text-balance text-[44px] font-medium leading-[1.02] tracking-[-0.045em] text-[#181925] sm:text-6xl lg:text-[76px]">
          Landing pages that
          <br />
          <span className="text-primary">look expensive.</span>
        </h1>

        <p className="mx-auto mb-8 max-w-[560px] text-pretty text-base leading-relaxed text-[#666] sm:text-lg">
          Templates for AI tools, SaaS products and studios. Every word lives in one config file.{' '}
          <span className="box-decoration-clone rounded-md bg-primary/10 px-1 py-0.5 font-medium text-primary">
            {formatPrice(PRICING.single.price)} each, or all {count} for {formatPrice(PRICING.allAccess.price)}
          </span>
          .
        </p>

        <div className="flex w-full flex-col items-stretch justify-center gap-2.5 sm:w-auto sm:flex-row sm:items-center">
          <a
            href="#catalog"
            className="group inline-flex h-11 select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[color-mix(in_srgb,var(--primary)_80%,#12245e)] bg-[color-mix(in_srgb,var(--primary)_90%,#12245e)] px-6 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(18,36,94,0.4)] transition-all hover:bg-primary active:scale-[0.98]"
          >
            Browse templates
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <a
            href="#pricing"
            className="inline-flex h-11 select-none items-center justify-center whitespace-nowrap rounded-full border border-black/[0.1] bg-white px-6 text-sm font-medium text-[#181925] shadow-2xs transition-all hover:bg-neutral-50 active:scale-[0.98]"
          >
            See pricing
          </a>
        </div>

        <span className="mt-5 select-none text-xs text-[#888]">
          Next.js 15 · Tailwind CSS v4 · Live demos · Commercial license included
        </span>
      </div>
    </section>
  );
}
