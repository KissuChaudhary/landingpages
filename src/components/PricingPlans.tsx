import React from 'react';
import { SectionHeader } from './theirs/section-header';
import { ShieldCheck } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';
import { ALL_ACCESS_CHECKOUT, PRICING, formatPrice } from '@/data/pricing';
import BuyButton from '@/components/template/BuyButton';

function Checklist({ items, strong = false }: { items: readonly string[]; strong?: boolean }) {
  return (
    <ul className="mt-5 flex flex-1 list-none flex-col gap-2 border-t border-dashed border-black/[0.1] p-0 pt-4">
      {items.map((text) => (
        <li key={text} className={`flex items-start gap-2 text-xs leading-5 ${strong ? 'font-medium text-[#181925]' : 'text-[#444]'}`}>
          <span aria-hidden="true" className={`mt-1.5 block size-2 shrink-0 ${strong ? 'text-primary' : 'text-muted-foreground/60'}`}>
            <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 8 8">
              <path d="M4 0v8M0 4h8" />
            </svg>
          </span>
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

function Specs({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="mt-5 flex flex-col gap-2 border-t border-dashed border-black/[0.1] pt-4 font-mono text-xs">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-baseline justify-between gap-3">
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="font-medium tabular-nums text-primary">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

const outlineButton =
  'mt-6 inline-flex h-10 select-none items-center justify-center whitespace-nowrap rounded-full border border-black/[0.1] bg-white px-5 text-sm font-medium text-[#181925] shadow-2xs transition-all hover:bg-neutral-50';

export default function PricingPlans() {
  const count = TEMPLATES.length;
  const single = formatPrice(PRICING.single.price);
  const allAccess = formatPrice(PRICING.allAccess.price);

  return (
    <section id="pricing" className="relative flex scroll-mt-20 flex-col gap-12 overflow-hidden border-t border-black/[0.04] bg-[#fafafa] py-16 sm:py-24">
      <SectionHeader
        badge="Pricing"
        title="Buy one template, or own the whole library."
        description={
          <>
            Every demo is free to explore. Pay once when you want the source code,{' '}
            <span className="box-decoration-clone rounded-md bg-primary/10 px-1 py-0.5 font-medium text-primary">never a subscription</span>.
          </>
        }
        className="mx-auto max-w-3xl px-5"
      />

      <div className="mx-auto w-full max-w-5xl px-5">
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:gap-5 md:grid-cols-3">
          {/* Preview */}
          <li className="flex flex-col rounded-2xl border border-black/[0.04] bg-[#f6f6f6] p-6 sm:p-7">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#181925]">Preview</p>
            <p className="mt-4 flex items-baseline text-4xl font-medium tabular-nums tracking-tight text-[#181925]">
              $0
              <span className="ml-1.5 text-base font-normal text-muted-foreground">to explore</span>
            </p>
            <Specs rows={[['Live demos', `All ${count}`], ['Device sizes', '4 viewports']]} />
            <Checklist
              items={[`Click through all ${count} templates live`, 'Desktop, laptop, tablet and phone views', 'Full-page screenshots and specs for each']}
            />
            <a href="#catalog" className={outlineButton}>
              Browse the demos
            </a>
          </li>

          {/* Single template */}
          <li className="flex flex-col rounded-2xl border border-black/[0.08] bg-white p-6 sm:p-7">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#181925]">{PRICING.single.name}</p>
            <p className="mt-4 flex items-baseline text-4xl font-medium tabular-nums tracking-tight text-[#181925]">
              {single}
              <span className="ml-1.5 text-base font-normal text-muted-foreground">per template</span>
            </p>
            <Specs rows={[['Source code', '1 template'], ['Projects', 'Unlimited']]} />
            <Checklist items={PRICING.single.includes} />
            <a href="#catalog" className={outlineButton}>
              Choose a template
            </a>
          </li>

          {/* All-access */}
          <li className="relative flex flex-col rounded-2xl border-2 border-primary/50 bg-white p-6 sm:p-7">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{PRICING.allAccess.name}</p>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-primary">Best value</p>
            </div>
            <p className="mt-4 flex items-baseline text-4xl font-medium tabular-nums tracking-tight text-[#181925]">
              {allAccess}
              <span className="ml-1.5 text-base font-normal text-muted-foreground">one-time</span>
            </p>
            <Specs rows={[['Source code', `All ${count} templates`], ['Future templates', 'Included']]} />
            <Checklist items={PRICING.allAccess.includes} strong />
            <BuyButton href={ALL_ACCESS_CHECKOUT} variant="brand" className="mt-6 h-10">
              Get all-access for {allAccess}
            </BuyButton>
            {!ALL_ACCESS_CHECKOUT && <p className="mt-2 text-center text-xs text-[#888]">Checkout opens soon</p>}
          </li>
        </ul>

        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-[#777]">
          <ShieldCheck className="size-4 shrink-0 text-primary" />
          <span>{PRICING.refundDays}-day money-back guarantee · No subscriptions · Keep the code forever.</span>
        </div>
      </div>
    </section>
  );
}
