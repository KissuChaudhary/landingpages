'use client';

import React, { useEffect, useState } from 'react';
import { ThinkingTrace, type ThinkingStep, type ThinkingVariant } from '../registry/thinking-trace';

type Script = { variant: ThinkingVariant; doneLabel?: string; query?: string; more?: number; steps: ThinkingStep[] };

const SCRIPTS: Record<string, Script> = {
  Steps: {
    variant: 'steps',
    doneLabel: 'Thought for 4 seconds',
    steps: [
      { label: 'Reading flavor briefs' },
      { label: 'Scanning supplier lists' },
      { label: 'Comparing tasting notes', detail: '6 flavors' },
      { label: 'Writing the scoop report' },
    ],
  },
  Reasoning: {
    variant: 'reasoning',
    doneLabel: 'Thought for 4 seconds',
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
    doneLabel: 'Ran 3 tools',
    steps: [
      { label: 'Read', detail: 'flavors.ts' },
      { label: 'Edit', detail: 'ChurnSchedule.tsx', additions: 74, deletions: 41 },
      { label: 'Run', detail: 'npm run freeze' },
    ],
  },
};

const START = 700;
const STEP = 750;

export default function ThinkingTraceDemo({ variant = 'Steps' }: { variant?: string }) {
  const script = SCRIPTS[variant] ?? SCRIPTS.Steps;
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers = script.steps.map((_, i) => window.setTimeout(() => setCount(i + 1), START + i * STEP));
    timers.push(window.setTimeout(() => setDone(true), START + script.steps.length * STEP + 500));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [script]);

  return (
    <div className="flex min-h-[188px] w-full max-w-[380px] flex-col justify-start">
      <ThinkingTrace
        variant={script.variant}
        status={done ? 'done' : 'running'}
        steps={script.steps.slice(0, count)}
        query={script.query}
        more={done ? script.more : undefined}
        doneLabel={script.doneLabel}
      />
    </div>
  );
}
