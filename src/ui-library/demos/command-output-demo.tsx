'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CommandOutput, type CommandStatus } from '../registry/command-output';

const PASS = [
  '> kept@1.4.0 test',
  '> vitest run',
  '',
  ' RUN  v3.2.4 /app',
  '',
  ' ✓ src/menu/flavours.test.ts (12 tests) 41ms',
  ' ✓ src/menu/prices.test.ts (8 tests) 18ms',
  ' ✓ src/orders/queue.test.ts (15 tests) 96ms',
  ' ✓ src/orders/receipt.test.ts (6 tests) 22ms',
  ' ✓ src/stock/churn-plan.test.ts (9 tests) 64ms',
  '',
  ' Test Files  5 passed (5)',
  '      Tests  50 passed (50)',
  '   Duration  1.84s',
];

const FAIL = [
  '> kept@1.4.0 build',
  '> next build',
  '',
  '   ▲ Next.js 15.5.0',
  '   Creating an optimized production build ...',
  ' ✓ Compiled successfully in 9.1s',
  '   Linting and checking validity of types ...',
  'Failed to compile.',
  '',
  './src/orders/queue.ts:42:18',
  'Type error: Property \'eta\' does not exist on type \'Order\'.',
  '',
  '  40 |   return orders.map((order) => ({',
  '  41 |     ...order,',
  '> 42 |     wait: order.eta - now,',
  '     |                  ^',
  '  43 |   }));',
  'Next.js build worker exited with code: 1',
];

export default function CommandOutputDemo({ tab = 'Passing' }: { tab?: string }) {
  const failing = tab === 'Failing';
  const script = failing ? FAIL : PASS;
  const [lines, setLines] = useState<string[]>([]);
  const [status, setStatus] = useState<CommandStatus>('running');
  const [startedAt] = useState(() => Date.now());
  const [endedAt, setEndedAt] = useState<number>();
  const timer = useRef<number | undefined>(undefined);

  // A stand-in for a real process: lines arrive at an uneven pace, then it exits.
  useEffect(() => {
    let i = 0;
    const next = () => {
      if (i >= script.length) {
        setStatus(failing ? 'error' : 'success');
        setEndedAt(Date.now());
        return;
      }
      const line = script[i++];
      setLines((l) => [...l, line]);
      timer.current = window.setTimeout(next, line === '' ? 120 : 160 + Math.random() * 260);
    };
    timer.current = window.setTimeout(next, 400);
    return () => window.clearTimeout(timer.current);
  }, [failing, script]);

  const stop = () => {
    window.clearTimeout(timer.current);
    setLines((l) => [...l, '^C']);
    setStatus('cancelled');
    setEndedAt(Date.now());
  };

  return (
    <div className="w-full max-w-[520px]">
      <CommandOutput
        command={failing ? 'pnpm build' : 'pnpm test'}
        status={status}
        lines={lines}
        exitCode={failing ? 1 : 0}
        startedAt={startedAt}
        endedAt={endedAt}
        onStop={stop}
      />
    </div>
  );
}
