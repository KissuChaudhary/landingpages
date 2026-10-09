'use client';

import React from 'react';
import { AreaChart, type AreaSeries } from '../registry/area-chart';

// Twelve weeks of Kept's orders by where they came in: the counter, the app, and delivery.
const MONDAYS = Array.from({ length: 12 }, (_, i) => {
  const d = new Date('2026-07-20T12:00:00');
  d.setDate(d.getDate() + i * 7);
  return d;
});
const LABELS = MONDAYS.map((d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }));
const TITLES = MONDAYS.map((d) => `Week of ${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}`);

const SERIES: AreaSeries[] = [
  { id: 'counter', label: 'Counter', values: [842, 905, 931, 880, 864, 812, 760, 702, 655, 618, 590, 571] },
  { id: 'app', label: 'App', values: [212, 238, 266, 291, 318, 342, 371, 389, 402, 431, 455, 478] },
  { id: 'delivery', label: 'Delivery', values: [168, 181, 204, 199, 214, 232, 226, 241, 237, 252, 266, 259] },
];

export default function AreaChartDemo() {
  return (
    <div className="w-full max-w-[680px] py-4">
      <AreaChart title="Orders" caption="in the last 12 weeks" labels={LABELS} titles={TITLES} series={SERIES} locales="en-US" />
    </div>
  );
}
