'use client';

import React, { useEffect, useState } from 'react';
import { Plan, type PlanTask } from '../registry/plan';

const TASKS = [
  'Pull last month’s sales by flavor',
  'Compare margins against vanilla',
  'Check cone and cup inventory',
  'Draft the weekend special',
  'Write the announcement',
];

function tasksAt(step: number, failAt?: number): PlanTask[] {
  return TASKS.map((label, i) => {
    if (failAt !== undefined && i === failAt && step > i) return { label, status: 'failed', detail: 'The inventory sheet is locked by another user.' };
    if (failAt !== undefined && i > failAt && step > failAt) return { label, status: i === failAt + 1 ? 'skipped' : 'pending' };
    if (i < step) return { label, status: 'done', detail: i === 1 ? 'Pistachio leads at 41% margin.' : undefined };
    if (i === step) return { label, status: 'running' };
    return { label, status: 'pending' };
  });
}

export default function PlanDemo({ tab = 'Live' }: { tab?: string }) {
  const failAt = tab === 'Failed' ? 2 : undefined;
  const [step, setStep] = useState(tab === 'Settled' ? TASKS.length : 0);

  useEffect(() => {
    if (tab === 'Settled') return;
    const last = failAt !== undefined ? failAt + 1 : TASKS.length;
    const timers = Array.from({ length: last }, (_, i) => window.setTimeout(() => setStep(i + 1), 900 + i * 1000));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [tab, failAt]);

  return (
    <div className="w-full max-w-[400px]">
      <Plan title="Weekend special" tasks={tasksAt(step, failAt)} defaultOpen={tab !== 'Settled'} />
    </div>
  );
}
