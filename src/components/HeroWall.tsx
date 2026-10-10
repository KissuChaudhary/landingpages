'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowUpRight } from 'lucide-react';

/* Under the hero, the library's richest components, running: a wall of tiles in three columns that fades out at the
 * bottom, each one linking to its page. Demos load on the client only, each in its own chunk, so the page's first paint
 * stays light. Phones get three tiles. */

type Tile = { name: string; title: string; Demo: React.ComponentType<{ tab?: string }>; tab?: string; min: number; phone?: boolean };

const load = (loader: () => Promise<{ default: React.ComponentType<{ tab?: string }> }>) => dynamic(loader, { ssr: false });

const COLUMNS: Tile[][] = [
  [
    { name: 'live-cursors', title: 'Live cursors', Demo: load(() => import('@/ui-library/demos/live-cursors-demo')), min: 340 },
    { name: 'voice-note', title: 'Voice note', Demo: load(() => import('@/ui-library/demos/voice-note-demo')), min: 260 },
  ],
  [
    { name: 'diff-review', title: 'Diff review', Demo: load(() => import('@/ui-library/demos/diff-review-demo')), min: 440, phone: true },
    { name: 'live-map', title: 'Live map', Demo: load(() => import('@/ui-library/demos/live-map-demo')), min: 420, phone: true },
  ],
  [
    { name: 'activity-rings', title: 'Activity rings', Demo: load(() => import('@/ui-library/demos/activity-rings-demo')), min: 360, phone: true },
    { name: 'earnings-chart', title: 'Earnings chart', Demo: load(() => import('@/ui-library/demos/earnings-chart-demo')), min: 330 },
  ],
];

function TileCard({ tile }: { tile: Tile }) {
  const { Demo } = tile;
  return (
    <div className={`${tile.phone ? 'flex' : 'hidden lg:flex'} flex-col rounded-[22px] border border-black/[0.07] bg-[#fafafa]`}>
      <Link href={`/ui/${tile.name}`} className="group flex items-center justify-between px-4 pt-3.5 text-[12.5px] text-[#888] transition-colors hover:text-[#181925]">
        {tile.title}
        <span className="flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Open
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </span>
      </Link>
      <div className="flex flex-1 items-center justify-center px-4 pb-5 pt-3" style={{ minHeight: tile.min }}>
        <Demo tab={tile.tab} />
      </div>
    </div>
  );
}

export default function HeroWall() {
  return (
    <div className="relative mx-auto mt-14 max-w-[1280px] px-4 sm:mt-16 sm:px-6">
      <div className="grid gap-3 lg:max-h-[760px] lg:grid-cols-[1fr_1.2fr_1fr] lg:gap-4 lg:overflow-hidden lg:[mask-image:linear-gradient(to_bottom,black_74%,transparent)]">
        {COLUMNS.map((column, i) => (
          <div key={i} className={`flex flex-col gap-3 lg:gap-4 ${i === 1 ? 'lg:pt-10' : ''}`}>
            {column.map((tile) => (
              <TileCard key={tile.name} tile={tile} />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center lg:-mt-16 lg:relative">
        <Link
          href="/ui"
          className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-[13px] font-medium text-[#181925] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] transition-shadow hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.18)]"
        >
          See every component
          <ArrowUpRight className="size-3.5 text-[#999] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
