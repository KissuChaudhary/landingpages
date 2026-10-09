'use client';

import React, { useEffect, useState } from 'react';
import { ImageUp } from 'lucide-react';
import { LiveActivity, type LiveActivityData } from '../registry/live-activity';

type Frame = { at: number; activity: LiveActivityData | null };

const agent = (step: number, extra: Partial<LiveActivityData> = {}): LiveActivityData => ({
  id: 'agent',
  label: 'Planning the change',
  title: 'Kept agent',
  detail: 'Adding tips to the weekly export',
  steps: [
    { label: 'Plan the change', done: step > 0 },
    { label: 'Edit 3 files', done: step > 1 },
    { label: 'Run the tests', done: step > 2 },
  ],
  ...extra,
});

// The agent run: it plans, edits, tests, reports, and the pill folds away. Then it starts again.
const AGENT: Frame[] = [
  { at: 300, activity: agent(0, { progress: 0.08 }) },
  { at: 1800, activity: agent(1, { label: 'Editing 3 files', progress: 0.34 }) },
  { at: 2700, activity: agent(1, { label: 'Editing 3 files', progress: 0.52 }) },
  { at: 3600, activity: agent(1, { label: 'Editing 3 files', progress: 0.68 }) },
  { at: 4500, activity: agent(2, { label: 'Running the tests', progress: 0.86 }) },
  {
    at: 6200,
    activity: agent(3, {
      label: '3 files changed',
      status: 'done',
      progress: 1,
      title: 'Tips are in the weekly export',
      detail: '3 files changed, 12 tests passed',
      actions: [
        { label: 'Dismiss', onClick: () => {} },
        { label: 'View changes', onClick: () => {}, primary: true },
      ],
    }),
  },
  { at: 10_500, activity: null },
];

const upload = (n: number, extra: Partial<LiveActivityData> = {}): LiveActivityData => ({
  id: 'upload',
  label: 'Uploading photos',
  icon: <ImageUp />,
  title: 'New flavour photos',
  detail: 'Going to the menu board',
  count: { value: n, suffix: ' of 4' },
  progress: n / 4,
  ...extra,
});

const UPLOAD: Frame[] = [
  { at: 300, activity: upload(0, { progress: 0.05 }) },
  { at: 1200, activity: upload(1) },
  { at: 2100, activity: upload(2) },
  { at: 3000, activity: upload(3) },
  { at: 3900, activity: upload(4, { label: '4 photos added', status: 'done', icon: undefined, detail: 'They’re on the menu board now' }) },
  { at: 7500, activity: null },
];

export default function LiveActivityDemo({ tab = 'Agent' }: { tab?: string }) {
  const [activity, setActivity] = useState<LiveActivityData | null>(null);
  const [cycle, setCycle] = useState(0);
  const frames = tab === 'Upload' ? UPLOAD : AGENT;

  useEffect(() => {
    // Dismiss clears the pill for real; the other actions are stand-ins.
    const live = (a: LiveActivityData | null): LiveActivityData | null =>
      a && { ...a, actions: a.actions?.map((x) => (x.label === 'Dismiss' ? { ...x, onClick: () => setActivity(null) } : x)) };
    const timers = frames.map((f) => window.setTimeout(() => setActivity(live(f.activity)), f.at));
    timers.push(window.setTimeout(() => setCycle((c) => c + 1), frames[frames.length - 1].at + 1500));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [frames, cycle]);

  return (
    <div className="flex w-full max-w-[420px] flex-col items-center">
      <div className="flex h-[300px] w-full flex-col items-center rounded-[22px] bg-muted/50 pt-4 shadow-[inset_0_0_0_1px_var(--border)]">
        <LiveActivity activity={activity} />
      </div>
      <p className="mt-3 text-[12px] text-muted-foreground">Tap the pill while it runs.</p>
    </div>
  );
}
