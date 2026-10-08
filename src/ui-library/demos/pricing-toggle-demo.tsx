'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Price, PricingToggle } from '../registry/pricing-toggle';

const PLANS = [
  { name: 'Starter', monthly: 12, yearly: 9, blurb: 'For one person and one product.', features: ['1 project', 'Community support'] },
  { name: 'Pro', monthly: 29, yearly: 23, blurb: 'For founders shipping every week.', features: ['10 projects', 'Priority support'], featured: true },
  { name: 'Team', monthly: 79, yearly: 63, blurb: 'For small teams that share work.', features: ['Unlimited projects', 'Shared workspace'] },
];

export default function PricingToggleDemo() {
  const [billing, setBilling] = useState('monthly');
  const yearly = billing === 'yearly';

  return (
    <div className="flex w-full max-w-[720px] flex-col items-center gap-8">
      <PricingToggle value={billing} onValueChange={setBilling} />
      <div className="grid w-full grid-cols-1 overflow-hidden rounded-[22px] border border-border sm:grid-cols-3">
        {PLANS.map((plan, i) => {
          const amount = yearly ? plan.yearly : plan.monthly;
          return (
            <div key={plan.name} className={`flex flex-col p-5 ${i ? 'border-t border-border sm:border-l sm:border-t-0' : ''}`}>
              <p className="flex items-center gap-2 text-[13px] font-medium text-foreground">
                {plan.name}
                {plan.featured && <span className="rounded-full bg-primary/10 px-1.5 py-px text-[10.5px] text-primary">Popular</span>}
              </p>
              <Price
                className="mt-3"
                amount={amount}
                direction={yearly ? 1 : -1}
                note={yearly ? `$${plan.yearly * 12} billed yearly` : 'Billed monthly'}
              />
              <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">{plan.blurb}</p>
              <ul className="mt-3 space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[12.5px] text-foreground/80">
                    <Check aria-hidden="true" className="size-3.5 text-muted-foreground" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`mt-5 h-9 rounded-full text-[13px] font-medium transition-[opacity,transform,background-color] active:scale-[0.98] ${
                  plan.featured ? 'bg-primary text-primary-foreground hover:opacity-90' : 'border border-border text-foreground hover:bg-accent'
                }`}
              >
                Get {plan.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
