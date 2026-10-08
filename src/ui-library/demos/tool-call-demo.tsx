'use client';

import React, { useEffect, useState } from 'react';
import { Plane } from 'lucide-react';
import { ToolCall, type ToolCallStatus } from '../registry/tool-call';

const INPUT = { from: 'BLR', to: 'LIS', date: '2026-11-02', passengers: 2 };
const OUTPUT = { cheapest: '€412', airline: 'TAP Air Portugal', stops: 1, duration: '14h 20m' };

export default function ToolCallDemo({ tab = 'Live' }: { tab?: string }) {
  const [status, setStatus] = useState<ToolCallStatus>(tab === 'Denied' ? 'denied' : tab === 'Custom output' ? 'done' : 'preparing');
  const [fields, setFields] = useState(tab === 'Live' || tab === 'Error' ? 0 : 4);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (tab !== 'Live' && tab !== 'Error') return;
    setStatus('preparing');
    setFields(0);
    const timers = [1, 2, 3, 4].map((n) => window.setTimeout(() => setFields(n), 350 * n));
    timers.push(window.setTimeout(() => setStatus('running'), 1700));
    timers.push(window.setTimeout(() => setStatus(tab === 'Error' ? 'error' : 'done'), 3100));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [tab, run]);

  const input = Object.fromEntries(Object.entries(INPUT).slice(0, fields));

  return (
    <div className="w-full max-w-[420px]">
      <ToolCall
        name="search_flights"
        title="Search flights"
        icon={<Plane className="size-3.5" />}
        status={status}
        input={input}
        output={OUTPUT}
        duration={1240}
        defaultOpen
        errorText="The flights API timed out after 10 seconds."
        onRetry={() => setRun((r) => r + 1)}
        renderOutput={
          tab === 'Custom output'
            ? () => (
                <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
                  <div>
                    <p className="text-[13px] font-medium text-foreground">Bengaluru → Lisbon</p>
                    <p className="text-[12px] text-muted-foreground">TAP Air Portugal · 1 stop · 14h 20m</p>
                  </div>
                  <p className="text-[15px] font-medium tabular-nums text-foreground">€412</p>
                </div>
              )
            : undefined
        }
      />
    </div>
  );
}
