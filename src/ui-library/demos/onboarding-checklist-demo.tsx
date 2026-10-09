'use client';

import React from 'react';
import { OnboardingChecklist, type OnboardingTask } from '../registry/onboarding-checklist';

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

const TASKS: OnboardingTask[] = [
  { id: 'menu', title: 'Add your menu', description: 'Flavours, sizes and prices, so orders know what they can be.', action: { label: 'Import menu', pendingLabel: 'Importing', onClick: () => wait(1100) } },
  { id: 'hours', title: 'Set opening hours', description: 'Customers see them on your page; orders close fifteen minutes before.', action: { label: 'Use usual hours', pendingLabel: 'Saving', onClick: () => wait(800) } },
  { id: 'payments', title: 'Connect payments', description: 'Card and Apple Pay at the counter and online. Payouts every morning.', action: { label: 'Connect', pendingLabel: 'Connecting', onClick: () => wait(1300) } },
  { id: 'team', title: 'Invite your team', description: 'Ana and Tom can take orders; only you see the takings.', action: { label: 'Send invites', pendingLabel: 'Sending', onClick: () => wait(900) } },
  { id: 'test', title: 'Take a test order', description: 'One scoop of pistachio, end to end, so Saturday holds no surprises.', action: { label: 'Place test order', pendingLabel: 'Placing', onClick: () => wait(1200) } },
];

export default function OnboardingChecklistDemo({ tab = 'Fresh' }: { tab?: string }) {
  // "Nearly done" starts with three ticked, to reach the finish quickly.
  return (
    <div className="w-full max-w-[400px]">
      <Seeded key={tab} tasks={TASKS} preset={tab === 'Nearly done' ? 3 : 0} />
    </div>
  );
}

function Seeded({ tasks, preset }: { tasks: OnboardingTask[]; preset: number }) {
  const [done, setDone] = React.useState(() => new Set(tasks.slice(0, preset).map((t) => t.id)));
  const [hidden, setHidden] = React.useState(false);
  if (hidden) {
    return (
      <button type="button" onClick={() => (setDone(new Set()), setHidden(false))} className="text-[12.5px] text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground">
        Start the checklist again
      </button>
    );
  }
  return (
    <OnboardingChecklist
      tasks={tasks.map((t) => ({ ...t, done: done.has(t.id) }))}
      onTaskComplete={(id) => setDone((s) => new Set(s).add(id))}
      onDismiss={() => setHidden(true)}
    />
  );
}
