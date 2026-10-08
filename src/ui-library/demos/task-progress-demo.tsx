'use client';

import React, { useEffect, useState } from 'react';
import { TaskProgress, type TaskProgressStatus } from '../registry/task-progress';

const PHASES = ['Searching', 'Reading', 'Writing'];

export default function TaskProgressDemo({ tab = 'Live' }: { tab?: string }) {
  const [startedAt] = useState(() => Date.now() - 62_000);
  const [phase, setPhase] = useState(tab === 'Done' ? 2 : tab === 'Error' || tab === 'Cancelled' ? 1 : 0);
  const [sources, setSources] = useState(tab === 'Live' ? 8 : 42);
  const [read, setRead] = useState(tab === 'Live' ? 0 : 12);
  const [status, setStatus] = useState<TaskProgressStatus>(
    tab === 'Done' ? 'done' : tab === 'Error' ? 'error' : tab === 'Cancelled' ? 'cancelled' : 'running'
  );

  useEffect(() => {
    if (tab !== 'Live') return;
    const timers = [
      window.setTimeout(() => setSources(23), 700),
      window.setTimeout(() => setSources(42), 1500),
      window.setTimeout(() => setPhase(1), 2200),
      window.setTimeout(() => setRead(5), 2900),
      window.setTimeout(() => setRead(12), 3700),
      window.setTimeout(() => setPhase(2), 4600),
      window.setTimeout(() => setStatus('done'), 7000),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [tab]);

  return (
    <div className="w-full max-w-[440px]">
      <TaskProgress
        title="Researching waffle cone suppliers"
        status={status}
        phases={PHASES}
        phase={phase}
        startedAt={startedAt}
        duration={tab === 'Done' ? 252_000 : undefined}
        stats={[
          { label: 'sources', value: sources },
          { label: 'read', value: read },
        ]}
        message="You can close this tab. We’ll keep going and let you know."
        onCancel={() => setStatus('cancelled')}
        onOpen={() => {}}
        openLabel="Open report"
        errorText="Three supplier sites blocked automated reading."
        onRetry={() => setStatus('running')}
      />
    </div>
  );
}
