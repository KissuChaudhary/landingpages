'use client';

import React from 'react';
import { ComboChart, type ComboDay } from '../registry/combo-chart';

// Kept's last 30 days of orders: busy weekends, a slow slide into autumn, a rainy Tuesday.
const COUNTS = [
  96, 104, 131, 142, 88, 84, 90, 99, 112, 138, 129, 81, 52, 85, 92, 101, 124, 133, 79, 77, 83, 88, 97, 119, 126, 74, 72, 79, 84, 93,
];

const DAYS: ComboDay[] = COUNTS.map((value, i) => {
  const d = new Date('2026-09-10T12:00:00');
  d.setDate(d.getDate() + i);
  return {
    key: d.toISOString().slice(0, 10),
    label: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    title: d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }),
    value,
  };
});

export default function ComboChartDemo() {
  return (
    <div className="w-full max-w-[680px] py-4">
      <ComboChart title="Orders" days={DAYS} previous={3_212} series={['Orders', '7-day average']} locales="en-US" />
    </div>
  );
}
