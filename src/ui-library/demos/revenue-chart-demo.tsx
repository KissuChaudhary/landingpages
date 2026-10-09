'use client';

import React from 'react';
import { RevenueChart, type RevenueMetric } from '../registry/revenue-chart';

// Kept's two years at the counter: 2026 runs to October; 2025 is complete.
const LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const TITLES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const REVENUE_2025 = [6_100, 5_800, 7_400, 9_200, 11_800, 14_900, 17_600, 16_900, 12_100, 9_400, 7_300, 8_900];
const REVENUE_2026 = [6_900, 6_600, 8_700, 10_400, 13_900, 17_800, 20_600, 19_800, 13_900, 10_700];
const AVERAGE_2025 = [8.6, 8.5, 8.8, 9.0, 9.1, 9.3, 9.4, 9.4, 9.2, 9.0, 8.9, 9.6];
const AVERAGE_2026 = [9.1, 9.0, 9.3, 9.5, 9.7, 9.9, 10.1, 10.0, 9.8, 9.6];
const orders = (revenue: number[], average: number[]) => revenue.map((r, i) => Math.round(r / average[i]));

const USD = { style: 'currency', currency: 'USD', maximumFractionDigits: 0 } as const;

const METRICS: RevenueMetric[] = [
  { id: 'revenue', label: 'Revenue', current: REVENUE_2026, previous: REVENUE_2025, format: USD },
  { id: 'orders', label: 'Orders', current: orders(REVENUE_2026, AVERAGE_2026), previous: orders(REVENUE_2025, AVERAGE_2025) },
  {
    id: 'average',
    label: 'Average order',
    current: AVERAGE_2026,
    previous: AVERAGE_2025,
    format: { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    total: 'average',
  },
];

export default function RevenueChartDemo() {
  return (
    <div className="w-full max-w-[680px] py-4">
      <RevenueChart labels={LABELS} titles={TITLES} metrics={METRICS} series={['2026', '2025']} locales="en-US" />
    </div>
  );
}
