import React from 'react';
import { ArrowRight } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';
import { PRICING, formatPrice } from '@/data/pricing';

export default function Hero() {
  const count = TEMPLATES.length;

  return (
    <section className="mx-auto max-w-6xl px-5 pb-14 pt-14 sm:px-6 sm:pb-16 sm:pt-20">
      <span className="flex h-[24px] w-fit select-none items-center whitespace-nowrap rounded-md bg-neutral-100 px-2.5 text-xs font-medium text-[#666]">
        Next.js landing page templates
      </span>

      <h1 className="mt-6 text-[52px] font-medium leading-[0.92] tracking-[-0.055em] text-[#181925] sm:text-[88px] lg:text-[112px]">
        Landing pages that <br className="hidden sm:block" />
        <span className="text-primary">look expensive.</span>
      </h1>

      <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <p className="max-w-xl text-pretty text-lg leading-relaxed text-[#666] sm:text-xl">
          {count} production-ready templates for AI tools, SaaS products and studios. Every word lives in one config file.
          <span className="mt-2 block text-[#181925]">
            {formatPrice(PRICING.single.price)} each, or all {count} for {formatPrice(PRICING.allAccess.price)}.
          </span>
        </p>

        <div className="flex flex-col gap-2.5 sm:flex-row">
          <a
            href="#catalog"
            className="group inline-flex h-12 select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[color-mix(in_srgb,var(--primary)_80%,#12245e)] bg-[color-mix(in_srgb,var(--primary)_90%,#12245e)] px-6 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(18,36,94,0.4)] transition-all hover:bg-primary active:scale-[0.98]"
          >
            Browse templates
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <a
            href="#pricing"
            className="inline-flex h-12 select-none items-center justify-center whitespace-nowrap rounded-full border border-black/[0.1] bg-white px-6 text-sm font-medium text-[#181925] shadow-2xs transition-all hover:bg-neutral-50 active:scale-[0.98]"
          >
            See pricing
          </a>
        </div>
      </div>
    </section>
  );
}
