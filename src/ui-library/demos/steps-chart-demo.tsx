'use client';

import React from 'react';
import { StepsChart, type StepsWeek } from '../registry/steps-chart';

// Four weeks of Ana's steps between shifts at Kept. This week runs to Friday, which is still under way.
const KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// The readout names the real date, e.g. "Thursday 9 October".
const dayTitle = (monday: string, i: number) => {
  const d = new Date(`${monday}T12:00:00`);
  d.setDate(d.getDate() + i);
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
};

const week = (id: string, label: string, monday: string, values: number[], today = -1): StepsWeek => ({
  id,
  label,
  days: KEYS.map((key, i) => ({ key, label: LABELS[i], value: values[i] ?? 0, title: dayTitle(monday, i), today: i === today || undefined })),
});

const WEEKS: StepsWeek[] = [
  week('w38', '14 to 20 Sept', '2026-09-14', [7_820, 11_240, 9_310, 12_680, 10_950, 14_210, 6_430]),
  week('w39', '21 to 27 Sept', '2026-09-21', [9_120, 8_440, 10_870, 7_960, 12_330, 15_820, 8_910]),
  week('w40', 'Last week', '2026-09-28', [10_480, 12_110, 6_920, 11_760, 9_840, 13_590, 10_220]),
  week('w41', 'This week', '2026-10-05', [11_320, 8_760, 12_940, 9_870, 6_180], 4),
];

export default function StepsChartDemo() {
  return (
    <div className="w-full max-w-[520px] py-4">
      <StepsChart weeks={WEEKS} goal={10_000} locales="en-US" />
    </div>
  );
}
