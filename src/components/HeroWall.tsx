'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowUpRight } from 'lucide-react';

/* Under the hero, the real components, running: a wall of tiles in three columns that fades out at the bottom, each one
 * linking to its page. Demos load on the client only, each in its own chunk, so the page's first paint stays light. */

type Tile = { name: string; title: string; Demo: React.ComponentType<{ tab?: string }>; tab?: string; min: number; phone?: boolean };

const load = (loader: () => Promise<{ default: React.ComponentType<{ tab?: string }> }>) => dynamic(loader, { ssr: false });

const COLUMNS: Tile[][] = [
  [
    { name: 'number-roll', title: 'Number roll', Demo: load(() => import('@/ui-library/demos/number-roll-demo')), tab: 'Live', min: 190, phone: true },
    { name: 'onboarding-checklist', title: 'Onboarding checklist', Demo: load(() => import('@/ui-library/demos/onboarding-checklist-demo')), min: 360 },
  ],
  [
    { name: 'changelog-scrubber', title: 'Changelog scrubber', Demo: load(() => import('@/ui-library/demos/changelog-scrubber-demo')), min: 430, phone: true },
    { name: 'waitlist-field', title: 'Waitlist field', Demo: load(() => import('@/ui-library/demos/waitlist-field-demo')), min: 250, phone: true },
  ],
  [
    { name: 'theme-toggle', title: 'Theme toggle', Demo: load(() => import('@/ui-library/demos/theme-toggle-demo')), min: 280 },
    { name: 'status-button', title: 'Status button', Demo: load(() => import('@/ui-library/demos/status-button-demo')), min: 200 },
    { name: 'usage-meter', title: 'Usage meter', Demo: load(() => import('@/ui-library/demos/usage-meter-demo')), min: 200 },
  ],
];

function TileCard({ tile }: { tile: Tile }) {
  const { Demo } = tile;
  return (
    <div className={`${tile.phone ? 'flex' : 'hidden lg:flex'} flex-col rounded-[22px] border border-black/[0.06] bg-[#f7f7f8]`}>
      <Link href={`/ui/${tile.name}`} className="group flex items-center justify-between px-4 pt-3.5 text-[12.5px] text-[#888] transition-colors hover:text-[#181925]">
        {tile.title}
        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
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
      <div className="grid gap-3 lg:max-h-[720px] lg:grid-cols-[1fr_1.2fr_1fr] lg:gap-4 lg:overflow-hidden lg:[mask-image:linear-gradient(to_bottom,black_72%,transparent)]">
        {COLUMNS.map((column, i) => (
          <div key={i} className={`flex flex-col gap-3 lg:gap-4 ${i === 1 ? 'lg:pt-10' : ''}`}>
            {column.map((tile) => (
              <TileCard key={tile.name} tile={tile} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
