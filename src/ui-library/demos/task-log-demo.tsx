'use client';

import React, { useEffect, useState } from 'react';
import { FileCode2, Search } from 'lucide-react';
import { TaskLog, type TaskLogStep, type TaskLogTask } from '../registry/task-log';

// The agent adding a theme toggle to Kept's till app.
const PLAN: { id: string; title: string; doneTitle: string; icon: React.ReactNode; steps: TaskLogStep[] }[] = [
  {
    id: 'find',
    title: 'Finding project files',
    doneTitle: 'Found project files',
    icon: <Search />,
    steps: [
      { id: 's1', text: 'Searching "app/page.tsx, components"' },
      { id: 's2', text: 'Read', file: 'page.tsx' },
      { id: 's3', text: 'Scanning', detail: '52 files' },
      { id: 's4', text: 'Read', file: 'layout.tsx' },
    ],
  },
  {
    id: 'toggle',
    title: 'Adding the theme toggle',
    doneTitle: 'Added the theme toggle',
    icon: <FileCode2 />,
    steps: [
      { id: 't1', text: 'Created', file: 'theme-toggle.tsx' },
      { id: 't2', text: 'Wired it into', file: 'layout.tsx' },
      { id: 't3', text: 'Ran lint and type-check', detail: '0 errors' },
    ],
  },
];

const finished = (): TaskLogTask[] => PLAN.map((p) => ({ ...p, status: 'done' }));

export default function TaskLogDemo({ tab = 'Live' }: { tab?: string }) {
  const [run, setRun] = useState(0);
  const [tasks, setTasks] = useState<TaskLogTask[]>(tab === 'Live' ? [] : finished());

  // A stand-in for a streamed run: tasks open, steps arrive, titles turn past tense.
  useEffect(() => {
    if (tab !== 'Live') return;
    setTasks([]);
    const timers: number[] = [];
    let t = 300;
    PLAN.forEach((p, ti) => {
      timers.push(window.setTimeout(() => setTasks((list) => [...list, { ...p, status: 'running', steps: [] }]), t));
      p.steps.forEach((step) => {
        t += 650;
        timers.push(window.setTimeout(() => setTasks((list) => list.map((x, i) => (i === ti ? { ...x, steps: [...x.steps, step] } : x))), t));
      });
      t += 700;
      timers.push(window.setTimeout(() => setTasks((list) => list.map((x, i) => (i === ti ? { ...x, status: 'done' } : x))), t));
      t += 300;
    });
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [tab, run]);

  return (
    <div className="w-full max-w-[440px] py-2">
      <TaskLog tasks={tasks} onRerun={() => (tab === 'Live' ? setRun((r) => r + 1) : setTasks(finished()))} />
    </div>
  );
}
