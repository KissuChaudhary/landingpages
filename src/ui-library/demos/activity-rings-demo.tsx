'use client';

import React from 'react';
import { ActivityRings, type RingDay, type RingGoal } from '../registry/activity-rings';

// Kept's three daily goals for this week. Friday is today and still going; the weekend hasn't happened yet.
const GOALS: RingGoal[] = [
  { id: 'orders', label: 'Orders', goal: 120 },
  { id: 'revenue', label: 'Revenue', goal: 1_200, format: { style: 'currency', currency: 'USD', maximumFractionDigits: 0 } },
  { id: 'regulars', label: 'Regulars back', goal: 15 },
];

const WEEK: [number, number, number][] = [
  [131, 1_284, 17],
  [98, 912, 11],
  [142, 1_466, 21],
  [87, 845, 9],
  [93, 940, 12],
];

const DAYS: RingDay[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((label, i) => {
  const d = new Date('2026-10-05T12:00:00');
  d.setDate(d.getDate() + i);
  return { key: d.toISOString().slice(0, 10), label, title: d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }), values: WEEK[i] ?? [null, null, null] };
});

export default function ActivityRingsDemo() {
  return (
    <div className="w-full max-w-[400px] py-4">
      <ActivityRings goals={GOALS} days={DAYS} locales="en-US" />
    </div>
  );
}
