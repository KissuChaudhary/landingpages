import React from 'react';
import { ArrowRight, Check, Clock, FileCheck2, Infinity as InfinityIcon, ShieldCheck } from 'lucide-react';
import { SectionHeader } from './theirs/section-header';
import { TEMPLATES } from '@/data/templates';
import { ALL_ACCESS_CHECKOUT, PRICING, formatPrice } from '@/data/pricing';
import { primaryButton, secondaryButton } from '@/components/home/buttons';

/* Two plans side by side, one-time prices, and the all-access price set against buying every template on its own.
 * Until checkout is connected, the all-access button says so plainly instead of looking broken. */

function Features({ items, strong = false }: { items: readonly string[]; strong?: boolean }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {items.map((text) => (
        <li key={text} className={`flex items-start gap-2.5 text-[14.5px] leading-[1.45] ${strong ? 'text-[#181925]' : 'text-[#555]'}`}>
          <span className={`mt-[1px] grid size-[18px] shrink-0 place-items-center rounded-full ${strong ? 'bg-primary text-white' : 'bg-black/[0.05] text-[#666]'}`}>
            <Check className="size-[11px]" strokeWidth={3} aria-hidden="true" />
          </span>
          {text}
        </li>
      ))}
    </ul>
  );
}

function Price({ value, note }: { value: string; note: string }) {
  return (
    <p className="flex items-baseline gap-2">
      <span className="text-[52px] font-medium leading-none tracking-[-0.045em] text-[#181925] tabular-nums">{value}</span>
      <span className="text-[14px] text-[#888]">{note}</span>
    </p>
  );
}

const ASSURANCES = [
  { Icon: ShieldCheck, text: `${PRICING.refundDays}-day money-back guarantee` },
  { Icon: InfinityIcon, text: 'No subscription, ever' },
  { Icon: FileCheck2, text: 'Commercial license included' },
];

export default function PricingPlans() {
  const separately = TEMPLATES.length * PRICING.single.price;
  const separatelyText = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(separately);

  return (
    <section id="pricing" className="relative scroll-mt-20 border-t border-black/[0.05] bg-[#fafafa] py-20 sm:py-28">
      <SectionHeader
        badge="Pricing"
        title="Pay once. Keep it forever."
        description="Every demo is free to explore. Buy the source when you’re ready."
        className="mx-auto max-w-3xl px-5"
      />

      <div className="mx-auto mt-12 grid w-full max-w-[920px] gap-4 px-5 sm:mt-14 md:grid-cols-2">
        {/* Single template */}
        <article className="flex flex-col rounded-[24px] bg-white p-7 shadow-[0_0_0_1px_rgba(0,0,0,0.07)] sm:p-8">
          <header className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-medium text-[#181925]">{PRICING.single.name}</h3>
            <span className="text-[13px] text-[#999]">One complete project</span>
          </header>
          <div className="mt-6">
            <Price value={formatPrice(PRICING.single.price)} note="one-time" />
            <p className="mt-2.5 h-5 text-[13px] text-[#999]">Pick any template in the catalog.</p>
          </div>
          <div className="my-6 h-px bg-black/[0.06]" />
          <Features items={PRICING.single.includes} />
          <a href="#catalog" className={`${secondaryButton} mt-8 w-full`}>
            Choose a template
            <ArrowRight className="size-4 text-[#999] transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </article>

        {/* All-access */}
        <article className="relative order-first flex flex-col rounded-[24px] bg-white p-7 shadow-[0_0_0_1.5px_var(--primary)] sm:p-8 md:order-none">
          <header className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-medium text-primary">{PRICING.allAccess.name}</h3>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[12px] font-medium text-primary">Best value</span>
          </header>
          <div className="mt-6">
            <Price value={formatPrice(PRICING.allAccess.price)} note="one-time" />
            <p className="mt-2.5 h-5 text-[13px] text-[#999]">
              <span className="text-[#777] line-through decoration-[#bbb]">{separatelyText}</span> if you bought every template on its own
            </p>
          </div>
          <div className="my-6 h-px bg-black/[0.06]" />
          <Features items={PRICING.allAccess.includes} strong />
          {ALL_ACCESS_CHECKOUT ? (
            <a href={ALL_ACCESS_CHECKOUT} className={`${primaryButton} mt-8 w-full`}>
              Get All-Access
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          ) : (
            <p className="mt-8 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary/[0.07] text-sm font-medium text-primary">
              <Clock className="size-4" aria-hidden="true" />
              Checkout opens soon
            </p>
          )}
        </article>
      </div>

      <ul className="mx-auto mt-10 flex max-w-[920px] flex-col items-center justify-center gap-3 px-5 text-[13px] text-[#777] sm:flex-row sm:gap-0">
        {ASSURANCES.map(({ Icon, text }, i) => (
          <li key={text} className={`flex items-center gap-2 sm:px-5 ${i ? 'sm:border-l sm:border-black/[0.08]' : ''}`}>
            <Icon className="size-4 text-[#999]" aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
