'use client';

import React from 'react';
import { PricingCalculator } from '../registry/pricing-calculator';

// A usage-based plan: free up to 2,500 users, then cheaper per user the bigger you get.
const price = (users: number) =>
  users <= 2_500 ? 0 : users <= 10_000 ? 29 + (users - 2_500) * 0.004 : users <= 100_000 ? 59 + (users - 10_000) * 0.0025 : 284 + (users - 100_000) * 0.0015;
const plan = (users: number) => (users <= 2_500 ? 'Free' : users <= 10_000 ? 'Starter' : users <= 100_000 ? 'Growth' : 'Scale');

const MARKS = [
  { value: 2_500, label: '2.5K' },
  { value: 10_000, label: '10K' },
  { value: 100_000, label: '100K' },
  { value: 500_000, label: '500K' },
];
const COMPACT: Intl.NumberFormatOptions = { notation: 'compact', maximumFractionDigits: 1 };

export default function PricingCalculatorDemo() {
  return (
    <div className="w-full max-w-[560px] rounded-[22px] border border-border bg-background p-6 sm:p-8">
      <PricingCalculator
        label="Monthly active users"
        min={1_000}
        max={1_000_000}
        defaultValue={25_000}
        scale="log"
        unit="monthly active users"
        valueFormat={COMPACT}
        price={price}
        plan={plan}
        marks={MARKS}
        contactFrom={500_000}
        yearlyDiscount={0.2}
        cta={{ label: (p) => (p === 'Free' ? 'Start for free' : `Start with ${p}`) }}
      />
    </div>
  );
}
