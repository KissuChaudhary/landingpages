'use client';

import React, { useMemo, useState } from 'react';
import { DateRangePicker, type DateRange, type DateRangePreset } from '../registry/date-range-picker';
import { NumberRoll } from '../registry/number-roll';
import { TextMorph } from '../registry/text-morph';

const EASE = 'cubic-bezier(0.16,1,0.3,1)';
const DAY = 86_400_000;
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const days = (r: DateRange) => Math.round((startOfDay(r.end).getTime() - startOfDay(r.start).getTime()) / DAY) + 1;
const short = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' });

// Visitors per day: a weekly rhythm, a slow climb and some noise, the same for a date every time.
const visitors = (d: Date) => {
  const n = Math.floor(d.getTime() / DAY);
  const noise = Math.abs(Math.sin(n * 12.9898) * 43758.5453) % 1;
  const weekend = d.getDay() === 0 || d.getDay() === 6 ? 0.68 : 1;
  return Math.round((1150 + (n % 365) * 0.9 + noise * 380) * weekend);
};

function Analytics() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [range, setRange] = useState<DateRange>({ start: addDays(today, -29), end: today });
  const length = days(range);

  const { total, delta, bars } = useMemo(() => {
    const series = Array.from({ length }, (_, i) => visitors(addDays(range.start, i)));
    const before = Array.from({ length }, (_, i) => visitors(addDays(range.start, i - length)));
    const total = series.reduce((a, b) => a + b, 0);
    const previous = before.reduce((a, b) => a + b, 0);
    // A bar a day up to a month, a bar a week past that.
    const size = length > 31 ? 7 : 1;
    const bars = Array.from({ length: Math.ceil(length / size) }, (_, i) => series.slice(i * size, i * size + size).reduce((a, b) => a + b, 0) / Math.min(size, length - i * size));
    return { total, delta: ((total - previous) / previous) * 100, bars };
  }, [range, length]);
  const top = Math.max(...bars);

  return (
    <div className="w-full rounded-[20px] border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-foreground">Visitors</p>
          <p className="text-[11.5px] text-muted-foreground">kept.coffee</p>
        </div>
        <DateRangePicker value={range} onValueChange={setRange} max={today} align="end" />
      </div>

      <p className="mt-5 text-[26px] font-semibold leading-none tracking-tight text-foreground tabular-nums">
        <NumberRoll value={total} />
      </p>
      <p className="mt-2 text-[12px] text-muted-foreground">
        <span className={delta >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}>
          <NumberRoll value={delta} format={{ maximumFractionDigits: 1, minimumFractionDigits: 1, signDisplay: 'always' }} suffix="%" />
        </span>{' '}
        <TextMorph>{`vs the ${length === 1 ? 'day' : `${length} days`} before`}</TextMorph>
      </p>

      <div className="mt-5 flex h-20 items-end justify-center gap-[3px] border-b border-border" aria-hidden="true">
        {bars.map((v, i) => (
          <span
            key={i}
            className="max-w-6 flex-1 rounded-t-[3px] bg-[var(--chart-1)]"
            style={{ height: `${(v / top) * 100}%`, transition: `height 520ms ${EASE}` }}
          />
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground tabular-nums">
        <TextMorph>{short.format(range.start)}</TextMorph>
        <TextMorph>{short.format(range.end)}</TextMorph>
      </div>
    </div>
  );
}

const nextFriday = (t: Date) => addDays(t, (5 - t.getDay() + 7) % 7);
const STAY_PRESETS: DateRangePreset[] = [
  { label: 'This weekend', range: (t) => ({ start: nextFriday(t), end: addDays(nextFriday(t), 2) }) },
  { label: 'Next weekend', range: (t) => ({ start: addDays(nextFriday(t), 7), end: addDays(nextFriday(t), 9) }) },
  { label: 'A week', range: (t) => ({ start: addDays(nextFriday(t), 3), end: addDays(nextFriday(t), 10) }) },
];

function Stay() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [range, setRange] = useState<DateRange>(() => STAY_PRESETS[1].range(today));
  const nights = days(range) - 1;
  const rate = 180;

  return (
    <div className="w-full rounded-[20px] border border-border bg-card p-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[13px] font-medium text-foreground">Loft in Alfama, Lisbon</p>
        <p className="shrink-0 text-[12px] text-muted-foreground tabular-nums">${rate} a night</p>
      </div>
      <DateRangePicker className="mt-3" value={range} onValueChange={setRange} min={today} unit="nights" presets={STAY_PRESETS} />

      <dl className="mt-4 space-y-2 text-[12.5px]">
        <div className="flex justify-between text-muted-foreground">
          <dt>
            <NumberRoll value={nights} /> <TextMorph>{nights === 1 ? 'night' : 'nights'}</TextMorph> × ${rate}
          </dt>
          <dd className="tabular-nums">
            <NumberRoll value={nights * rate} prefix="$" />
          </dd>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <dt>Cleaning</dt>
          <dd className="tabular-nums">$40</dd>
        </div>
        <div className="flex justify-between border-t border-border pt-2 font-medium text-foreground">
          <dt>Total</dt>
          <dd className="tabular-nums">
            <NumberRoll value={nights * rate + 40} prefix="$" />
          </dd>
        </div>
      </dl>
      <button type="button" className="mt-4 h-9 w-full rounded-full bg-primary text-[13px] font-medium text-primary-foreground">
        Reserve
      </button>
    </div>
  );
}

export default function DateRangePickerDemo({ tab = 'Analytics' }: { tab?: string }) {
  // Tall enough that the open panel stays inside the frame.
  return (
    <div className="flex h-[500px] w-full max-w-[400px] flex-col sm:h-[450px]">
      {tab === 'Stay' ? <Stay /> : <Analytics />}
      <p className="mt-3 text-center text-[12px] text-muted-foreground">Tap the dates.</p>
    </div>
  );
}
