'use client';

import React from 'react';
import { StatsBand } from '../registry/stats-band';

const STATS = [
  { value: 12480, label: 'Teams shipping on Relay', format: { notation: 'compact', maximumFractionDigits: 1 } as Intl.NumberFormatOptions, suffix: '+' },
  { value: 99.98, label: 'Uptime this year', format: { maximumFractionDigits: 2 } as Intl.NumberFormatOptions, suffix: '%' },
  { value: 4.9, label: 'Average review', format: { minimumFractionDigits: 1, maximumFractionDigits: 1 } as Intl.NumberFormatOptions, suffix: ' / 5' },
  { value: 38, label: 'Minutes to first deploy', format: undefined, prefix: '<' },
];

export default function StatsBandDemo() {
  return (
    <div className="w-full max-w-[760px] rounded-[22px] border border-border">
      <StatsBand stats={STATS} />
    </div>
  );
}
