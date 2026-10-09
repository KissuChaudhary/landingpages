import React from 'react';
import Link from 'next/link';
import { ArrowRight, Blocks } from 'lucide-react';
import HeroWord from '@/components/HeroWord';
import HeroWall from '@/components/HeroWall';
import { TEMPLATES } from '@/data/templates';
import { PRICING, formatPrice } from '@/data/pricing';
import { UI_ITEMS } from '@/ui-library/registry';
import { NEW_COMPONENTS } from '@/components/site/nav-data';

const WORDS = ['AI tools', 'SaaS', 'agents', 'studios', 'fintech', 'dev tools'];
const STACK = [
  ['Next.js', '15'],
  ['React', '19'],
  ['Tailwind CSS', 'v4'],
  ['TypeScript', '5'],
  ['shadcn/ui', 'registry'],
];

export default function Hero() {
  const count = TEMPLATES.length;
  const latest = UI_ITEMS.find((i) => i.name === NEW_COMPONENTS[NEW_COMPONENTS.length - 1]);

  return (
    <section className="overflow-hidden pb-6 pt-12 sm:pt-20">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
        {latest && (
          <Link
            href={`/ui/${latest.name}`}
            className="group inline-flex h-8 items-center gap-2 rounded-full bg-white pl-1 pr-3 text-[13px] text-[#444] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] transition-colors hover:text-[#181925]"
          >
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.04em] text-primary">New</span>
            {latest.title}
            <ArrowRight className="size-3.5 text-[#aaa] transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        )}

        <h1 className="mx-auto mt-7 text-[38px] font-medium leading-[1.04] tracking-[-0.05em] text-[#181925] sm:text-[64px] lg:text-[80px]">
          Landing pages for <HeroWord words={WORDS} />
          <br />
          that <span className="text-primary">look expensive.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-[#666] sm:text-lg">
          {count} Next.js templates and {UI_ITEMS.length} free components, made to one standard: every state designed, every change in motion.{' '}
          <span className="text-[#181925]">
            {formatPrice(PRICING.single.price)} each, or all {count} for {formatPrice(PRICING.allAccess.price)}.
          </span>
        </p>

        <div className="mt-8 flex flex-col justify-center gap-2.5 sm:flex-row">
          <a
            href="#catalog"
            className="group inline-flex h-11 select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[color-mix(in_srgb,var(--primary)_80%,#12245e)] bg-[color-mix(in_srgb,var(--primary)_90%,#12245e)] px-6 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(18,36,94,0.4)] transition-all hover:bg-primary active:scale-[0.98]"
          >
            Browse templates
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <Link
            href="/ui"
            className="inline-flex h-11 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-6 text-sm font-medium text-[#181925] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] transition-all hover:bg-neutral-50 active:scale-[0.98]"
          >
            <Blocks className="size-4 text-[#888]" aria-hidden="true" />
            Free components
          </Link>
        </div>

        <ul aria-label="Built with" className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-[#666]">
          {STACK.map(([name, version], i) => (
            <li key={name} className="flex items-center gap-5">
              {i > 0 && <span aria-hidden="true" className="hidden size-[3px] rounded-full bg-[#ccc] sm:block" />}
              <span>
                {name} <span className="text-[#aaa]">{version}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <HeroWall />
    </section>
  );
}
