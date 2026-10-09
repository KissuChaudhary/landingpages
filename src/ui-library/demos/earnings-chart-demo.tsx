'use client';

import React from 'react';
import { EarningsChart, type EarningsPeriod } from '../registry/earnings-chart';

// Kept, an ice cream shop: a year of months (summer peaks), and five years of totals.
const MONTHS: [string, string, number][] = [
  ['2025-11', 'Nov', 3_120],
  ['2025-12', 'Dec', 2_480],
  ['2026-01', 'Jan', 2_210],
  ['2026-02', 'Feb', 2_640],
  ['2026-03', 'Mar', 3_890],
  ['2026-04', 'Apr', 5_120],
  ['2026-05', 'May', 6_980],
  ['2026-06', 'Jun', 9_340],
  ['2026-07', 'Jul', 11_860],
  ['2026-08', 'Aug', 11_210],
  ['2026-09', 'Sep', 7_460],
  ['2026-10', 'Oct', 5_380],
];
const LONG = { Nov: 'November', Dec: 'December', Jan: 'January', Feb: 'February', Mar: 'March', Apr: 'April', May: 'May', Jun: 'June', Jul: 'July', Aug: 'August', Sep: 'September', Oct: 'October' } as Record<string, string>;
const bars = MONTHS.map(([key, label, value]) => ({ key, label, value, title: `${LONG[label]} ${key.slice(0, 4)}` }));

const PERIODS: EarningsPeriod[] = [
  { id: '6m', label: '6M', bars: bars.slice(6), previous: 46_120, comparison: 'vs May to Oct last year' },
  { id: '1y', label: '1Y', bars, previous: 61_940, comparison: 'vs the year before' },
  {
    id: 'all',
    label: 'All',
    bars: [
      { key: 'y2022', label: '2022', value: 31_200 },
      { key: 'y2023', label: '2023', value: 44_850 },
      { key: 'y2024', label: '2024', value: 52_300 },
      { key: 'y2025', label: '2025', value: 61_940 },
      { key: 'y2026', label: '2026', value: 66_090, title: '2026 so far' },
    ],
    comparison: 'since the shop opened',
  },
];

export default function EarningsChartDemo() {
  return (
    <div className="w-full max-w-[600px] py-4">
      <EarningsChart title="Earned so far" periods={PERIODS} defaultValue="1y" locales="en-US" />
    </div>
  );
}
