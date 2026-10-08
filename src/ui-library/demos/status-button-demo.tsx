'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Link2 } from 'lucide-react';
import { StatusButton, type ActionStatus } from '../registry/status-button';

export default function StatusButtonDemo({ tab = 'Save' }: { tab?: string }) {
  const [status, setStatus] = useState<ActionStatus>('idle');
  const attempts = useRef(0);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  // A stand-in for a request: the Error tab fails the first time, then works.
  const save = () => {
    setStatus('pending');
    const fail = tab === 'Error' && attempts.current++ === 0;
    timer.current = window.setTimeout(() => setStatus(fail ? 'error' : 'success'), 1200);
  };

  if (tab === 'Copy') {
    return (
      <StatusButton
        variant="outline"
        icon={<Link2 />}
        status={status}
        labels={{ idle: 'Copy link', success: 'Copied' }}
        onClick={() => setStatus('success')}
        onReset={() => setStatus('idle')}
      />
    );
  }

  return (
    <div className="flex w-full max-w-[340px] flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-[12.5px] text-muted-foreground">
        Shop name
        <input
          defaultValue="Kept · Harbour Road"
          className="h-10 rounded-xl px-3 text-[14px] text-foreground shadow-[inset_0_0_0_1px_var(--border)] outline-none focus:shadow-[inset_0_0_0_1px_var(--ring)]"
        />
      </label>
      <div className="flex justify-end">
        <StatusButton
          status={status}
          labels={{ idle: 'Save changes', pending: 'Saving', success: 'Saved', error: 'Try again' }}
          onClick={save}
          onReset={() => setStatus('idle')}
        />
      </div>
    </div>
  );
}
