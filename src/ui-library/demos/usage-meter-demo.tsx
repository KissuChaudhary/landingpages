'use client';

import React, { useState } from 'react';
import { ArrowUp, Paperclip } from 'lucide-react';
import { UsageMeter } from '../registry/usage-meter';

const DAY = 24 * 60 * 60 * 1000;

export default function UsageMeterDemo({ tab = 'Normal' }: { tab?: string }) {
  const [used, setUsed] = useState(tab === 'Low' ? 1_700 : tab === 'Out' ? 2_000 : 760);
  const [resetAt] = useState(() => Date.now() + 4 * DAY);

  if (tab === 'Ring') {
    return (
      <div className="flex w-full max-w-[420px] flex-col gap-3">
        {[42_000, 109_000, 128_000].map((tokens) => (
          <div key={tokens} className="flex items-center justify-between rounded-full border border-border py-1.5 pl-3 pr-1.5">
            <span className="flex items-center gap-3 text-muted-foreground">
              <Paperclip aria-hidden="true" className="size-4" />
              <UsageMeter variant="ring" label="Context" unit="tokens" used={tokens} limit={128_000} />
            </span>
            <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ArrowUp className="size-3.5" />
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full max-w-[380px]">
      <UsageMeter used={used} limit={2_000} unit="credits" label="Credits" resetAt={resetAt} onUpgrade={() => {}} upgradeLabel="Upgrade to Pro" />
      <div className="mt-5 flex gap-4 text-[12px]">
        <button
          type="button"
          disabled={used >= 2_000}
          onClick={() => setUsed((u) => Math.min(2_000, u + 220))}
          className="text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground disabled:opacity-40"
        >
          Use 220 credits
        </button>
        <button type="button" onClick={() => setUsed(tab === 'Low' ? 1_700 : tab === 'Out' ? 2_000 : 760)} className="text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground">
          Reset
        </button>
      </div>
    </div>
  );
}
