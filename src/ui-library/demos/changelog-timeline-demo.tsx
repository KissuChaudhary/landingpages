'use client';

import React from 'react';
import { ChangelogTimeline, type ChangelogEntry } from '../registry/changelog-timeline';

const ENTRIES: ChangelogEntry[] = [
  {
    id: 'shift-planner',
    date: '2026-10-06',
    version: 'v2.8',
    title: 'Shift planner',
    tags: ['new'],
    body: <p>Drag shifts onto the week and Kept checks them against your busiest hours. Ana and Tom get their rota on their phones the moment you publish it.</p>,
    media: (
      <div className="grid grid-cols-5 gap-1.5 bg-muted/50 p-4 text-[11px]">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
          <div key={d} className="rounded-[10px] border border-border bg-background p-2">
            <p className="text-muted-foreground">{d}</p>
            <p className="mt-6 rounded-md bg-primary/10 px-1.5 py-1 font-medium text-primary">{i % 2 ? 'Ana' : 'Tom'}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'faster-checkout',
    date: '2026-09-29',
    version: 'v2.7.2',
    title: 'Checkout in one tap at the counter',
    tags: ['improved'],
    body: <p>Returning customers pay with the card they used last time. The queue on a Saturday moves about a fifth faster in our tests.</p>,
  },
  {
    id: 'stock-alerts',
    date: '2026-09-22',
    version: 'v2.7',
    title: 'Stock alerts before a flavour runs out',
    tags: ['new'],
    body: (
      <ul>
        <li>A nudge when a tray is down to its last few scoops.</li>
        <li>Suggested batch sizes from last month’s sales.</li>
      </ul>
    ),
  },
  {
    id: 'receipt-fix',
    date: '2026-09-15',
    version: 'v2.6.4',
    title: 'Receipts print the right shop name again',
    tags: ['fixed'],
    body: <p>Shops with more than one location sometimes printed the first shop’s address. Sorry, Harbour Road.</p>,
  },
  {
    id: 'dark-mode',
    date: '2026-09-08',
    version: 'v2.6',
    title: 'Dark mode for the counter screen',
    tags: ['new', 'improved'],
    body: <p>Easier on the eyes at closing time, and it follows the screen’s own setting.</p>,
  },
  {
    id: 'export',
    date: '2026-08-30',
    version: 'v2.5.1',
    title: 'Exports include tips',
    tags: ['improved'],
    body: <p>The weekly CSV now has a tips column, split by shift.</p>,
  },
  {
    id: 'sync-fix',
    date: '2026-08-21',
    version: 'v2.5',
    title: 'Offline orders sync without duplicates',
    tags: ['fixed'],
    body: <p>Orders taken while the Wi-Fi dropped could appear twice once it came back. They now sync once, in order.</p>,
  },
];

export default function ChangelogTimelineDemo() {
  return (
    <div className="w-full max-w-[720px] py-4">
      <ChangelogTimeline entries={ENTRIES} initialCount={4} />
    </div>
  );
}
