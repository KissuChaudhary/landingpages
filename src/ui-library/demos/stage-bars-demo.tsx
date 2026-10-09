'use client';

import React from 'react';
import { StageBars, type Stage, type StagePeriod } from '../registry/stage-bars';

// How far people get when they order from Kept's app.
const STAGES: Stage[] = [
  { id: 'opened', label: 'Opened the app' },
  { id: 'browsed', label: 'Browsed the flavours' },
  { id: 'basket', label: 'Added to basket' },
  { id: 'checkout', label: 'Started checkout' },
  { id: 'paid', label: 'Paid' },
];

const PERIODS: StagePeriod[] = [
  { id: 'week', label: 'This week', values: [2_480, 1_910, 1_164, 742, 611] },
  { id: 'last', label: 'Last week', values: [2_310, 1_655, 921, 548, 437] },
  { id: 'month', label: '30 days', values: [9_860, 7_240, 4_215, 2_690, 2_174] },
];

export default function StageBarsDemo() {
  return (
    <div className="w-full max-w-[560px] py-4">
      <StageBars title="App orders" stages={STAGES} periods={PERIODS} locales="en-US" />
    </div>
  );
}
