'use client';

import React, { useEffect, useState } from 'react';
import { ThinkingTrace, type ThinkingStatus, type ThinkingStep, type ThinkingVariant } from '../registry/thinking-trace';

type Script = { variant: ThinkingVariant; query?: string; more?: number; failAt?: number; steps: ThinkingStep[] };

const SCRIPTS: Record<string, Script> = {
  Steps: {
    variant: 'steps',
    steps: [
      { label: 'Reading flavor briefs' },
      { label: 'Scanning supplier lists' },
      { label: 'Comparing tasting notes', detail: '6 flavors' },
      { label: 'Writing the scoop report' },
    ],
  },
  Reasoning: {
    variant: 'reasoning',
    steps: [
      { label: 'Summer demand spikes for stone-fruit flavors, with peach and apricot in the lead.' },
      { label: 'I should check cone inventory before promoting a waffle-bowl special.' },
    ],
  },
  Search: {
    variant: 'search',
    query: 'best waffle cone supplier',
    more: 7,
    steps: [
      { label: 'Joy Cone', detail: 'joycone.com', href: 'https://joycone.com/' },
      { label: 'WebstaurantStore', detail: 'webstaurantstore.com', href: 'https://www.webstaurantstore.com/' },
      { label: 'The Konery', detail: 'thekonery.com', href: 'https://www.thekonery.com/' },
    ],
  },
  Tools: {
    variant: 'tools',
    steps: [
      { label: 'Read', detail: 'src/data/flavors.ts' },
      { label: 'Edit', detail: 'src/components/ChurnSchedule.tsx', additions: 74, deletions: 41 },
      { label: 'Run', detail: 'npm run freeze' },
    ],
  },
  Error: {
    variant: 'tools',
    failAt: 2,
    steps: [
      { label: 'Read', detail: 'src/data/flavors.ts' },
      { label: 'Edit', detail: 'src/components/ChurnSchedule.tsx', additions: 12, deletions: 3 },
      { label: 'Run', detail: 'npm run freeze' },
    ],
  },
};

const START = 700;
const STEP = 800;

export default function ThinkingTraceDemo({ tab = 'Steps' }: { tab?: string }) {
  const script = SCRIPTS[tab] ?? SCRIPTS.Steps;
  const [startedAt] = useState(() => Date.now());
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState<ThinkingStatus>('running');

  useEffect(() => {
    const total = script.failAt !== undefined ? script.failAt + 1 : script.steps.length;
    const timers = Array.from({ length: total }, (_, i) => window.setTimeout(() => setCount(i + 1), START + i * STEP));
    timers.push(window.setTimeout(() => setStatus(script.failAt !== undefined ? 'error' : 'done'), START + total * STEP + 700));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [script]);

  const steps = script.steps.slice(0, count).map((step, i) =>
    script.failAt === i && status === 'error' ? { ...step, status: 'error' as const } : step
  );

  return (
    <div className="flex min-h-[196px] w-full max-w-[400px] flex-col justify-start">
      <ThinkingTrace
        variant={script.variant}
        status={status}
        startedAt={startedAt}
        steps={steps}
        query={script.query}
        more={status === 'done' ? script.more : undefined}
      />
    </div>
  );
}
