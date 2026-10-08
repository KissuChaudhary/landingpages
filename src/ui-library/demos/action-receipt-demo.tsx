'use client';

import React, { useEffect, useState } from 'react';
import { CalendarPlus, ListTodo, Mail, Megaphone } from 'lucide-react';
import { ActionReceipts, type Receipt } from '../registry/action-receipt';

const WINDOW = 12_000;

const ACTIONS: Omit<Receipt, 'undoUntil'>[] = [
  { id: 'event', title: 'Added “Soft launch” to Saturday', detail: 'Calendar · 9:00 am, Harbour Road', icon: <CalendarPlus /> },
  { id: 'email', title: 'Emailed opening hours to 2,400 subscribers', detail: 'Newsletter · sends in 10 minutes', icon: <Mail /> },
  { id: 'tasks', title: 'Created 6 prep tasks for Ana', detail: 'Tasks · due Friday', icon: <ListTodo /> },
  { id: 'post', title: 'Scheduled the launch post', detail: 'Instagram · Saturday, 8:30 am', icon: <Megaphone /> },
];

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

export default function ActionReceiptDemo({ tab = 'Live' }: { tab?: string }) {
  const [actions, setActions] = useState<Receipt[]>(() =>
    tab === 'Live'
      ? []
      : ACTIONS.map((a, i) => ({
          ...a,
          undoUntil: Date.now() + WINDOW,
          ...(tab === 'Failed' && i === 1 ? { status: 'failed' as const, error: 'The email service didn’t respond' } : {}),
        })).slice(0, tab === 'Failed' ? 2 : 4)
  );

  // A stand-in for an agent working: each action lands as its tool finishes.
  useEffect(() => {
    if (tab !== 'Live') return;
    const timers = ACTIONS.slice(0, 3).map((a, i) =>
      window.setTimeout(() => setActions((list) => [...list, { ...a, undoUntil: Date.now() + WINDOW }]), 500 + i * 900)
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [tab]);

  const set = (id: string, patch: Partial<Receipt>) => setActions((list) => list.map((a) => (a.id === id ? { ...a, ...patch } : a)));

  return (
    <div className="w-full max-w-[460px]">
      <p className="mb-2 text-[13.5px] leading-relaxed text-foreground">Done. Here’s what I set up for Saturday:</p>
      <ActionReceipts
        actions={actions}
        undoWindow={WINDOW}
        stackFrom={tab === 'Stacked' ? 3 : 4}
        onUndo={async (id) => {
          await wait(700);
          set(id, { status: 'undone' });
        }}
        onRetry={async (id) => {
          set(id, { status: 'done', error: undefined, undoUntil: Date.now() + WINDOW });
        }}
      />
    </div>
  );
}
