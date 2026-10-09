'use client';

import React, { useState } from 'react';
import { SortableList, type SortableListSort } from '../registry/sortable-list';

type Feature = { id: string; name: string; votes: number; effort: 'S' | 'M' | 'L' };

const FEATURES: Feature[] = [
  { id: 'csv', name: 'CSV export', votes: 168, effort: 'S' },
  { id: 'seats', name: 'Team seats', votes: 342, effort: 'L' },
  { id: 'dark', name: 'Dark mode', votes: 214, effort: 'M' },
  { id: 'slack', name: 'Slack alerts', votes: 97, effort: 'S' },
  { id: 'api', name: 'Public API', votes: 256, effort: 'L' },
];

const SIZE = { S: 0, M: 1, L: 2 };
const SORTS: SortableListSort<Feature>[] = [
  { label: 'Votes', compare: (a, b) => b.votes - a.votes },
  { label: 'Effort', compare: (a, b) => SIZE[a.effort] - SIZE[b.effort] || b.votes - a.votes },
  { label: 'A–Z', compare: (a, b) => a.name.localeCompare(b.name) },
];

export default function SortableListDemo() {
  const [items, setItems] = useState(FEATURES);
  return (
    <div className="w-full max-w-[420px]">
      <p className="mb-3 text-[13px] font-medium text-foreground">Next quarter, in order</p>
      <SortableList
        items={items}
        onReorder={setItems}
        sorts={SORTS}
        getLabel={(f) => f.name}
        label="Roadmap priorities"
        renderItem={(f) => (
          <div className="flex items-center gap-2">
            <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-foreground">{f.name}</span>
            <span className="shrink-0 rounded-[5px] border border-border px-1.5 text-[11px] leading-5 text-muted-foreground">{f.effort}</span>
            <span className="w-12 shrink-0 text-right text-[12px] tabular-nums text-muted-foreground">{f.votes} ↑</span>
          </div>
        )}
      />
      <p className="mt-3 text-center text-[12px] text-muted-foreground">Drag a grip, or focus one and press Space.</p>
    </div>
  );
}
