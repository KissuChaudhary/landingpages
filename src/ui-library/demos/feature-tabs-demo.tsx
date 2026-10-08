'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { FeatureTabs, type FeatureTab } from '../registry/feature-tabs';

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-5 sm:grid-cols-[1fr_1.15fr] sm:items-center">
      <div>
        <p className="text-[18px] font-medium leading-snug tracking-[-0.02em] text-foreground">{title}</p>
      </div>
      <div className="rounded-[18px] border border-border p-4">{children}</div>
    </div>
  );
}

const TABS: FeatureTab[] = [
  {
    id: 'plan',
    label: 'Plan',
    content: (
      <Frame title="Turn a rough idea into a plan you can actually ship.">
        <ul className="space-y-2.5 text-[12.5px]">
          {['Draft the opening week', 'Book the tasting', 'Print the menu boards', 'Schedule the launch post'].map((t, i) => (
            <li key={t} className="flex items-center gap-2.5">
              <span className={`flex size-4 items-center justify-center rounded-full ${i < 2 ? 'bg-foreground text-background' : 'shadow-[inset_0_0_0_1px_var(--border)]'}`}>
                {i < 2 && <Check className="size-2.5" strokeWidth={3} />}
              </span>
              <span className={i < 2 ? 'text-muted-foreground line-through decoration-border' : 'text-foreground'}>{t}</span>
            </li>
          ))}
        </ul>
      </Frame>
    ),
  },
  {
    id: 'write',
    label: 'Write',
    content: (
      <Frame title="Write it once, in your voice, and keep it consistent everywhere.">
        <div className="space-y-2">
          <div className="h-2 w-3/4 rounded-full bg-muted" />
          <div className="h-2 w-full rounded-full bg-muted" />
          <div className="h-2 w-5/6 rounded-full bg-muted" />
          <p className="pt-2 text-[12.5px] leading-relaxed text-foreground">
            “Pistachio leads all weekend. <span className="rounded-[3px] bg-primary/15">Churn it early Saturday</span> so it sets before the rush.”
          </p>
        </div>
      </Frame>
    ),
  },
  {
    id: 'ship',
    label: 'Ship',
    content: (
      <Frame title="Ship with a log you can read, and a rollback you can trust.">
        <div className="space-y-1.5 font-mono text-[11.5px] text-muted-foreground">
          <p>✓ Built in 9.1s</p>
          <p>✓ 50 tests passed</p>
          <p>✓ Deployed to harbour-road.relay.app</p>
          <p className="text-foreground">Live · 0 errors in the last hour</p>
          <p>Rollback ready</p>
        </div>
      </Frame>
    ),
  },
  {
    id: 'measure',
    label: 'Measure',
    content: (
      <Frame title="See what moved the numbers.">
        <div className="flex h-24 items-end gap-1.5">
          {[30, 42, 38, 55, 61, 58, 76, 88].map((h, i) => (
            <span key={i} className={`flex-1 rounded-t-[4px] ${i === 7 ? 'bg-primary' : 'bg-muted'}`} style={{ height: `${h}%` }} />
          ))}
        </div>
      </Frame>
    ),
  },
];

export default function FeatureTabsDemo({ tab = 'Autoplay' }: { tab?: string }) {
  return (
    <div className="w-full max-w-[640px]">
      <FeatureTabs tabs={TABS} autoplay={tab === 'Autoplay' ? 4200 : undefined} />
    </div>
  );
}
