'use client';

import React, { useRef } from 'react';
import { WaitlistField } from '../registry/waitlist-field';

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

export default function WaitlistFieldDemo({ tab = 'Join' }: { tab?: string }) {
  const attempts = useRef(0);

  // A stand-in for your API: the Error tab fails once, then lets you in.
  const join = async () => {
    await wait(1400);
    if (tab === 'Error' && attempts.current++ === 0) throw new Error('Network');
    return { position: 1248 };
  };

  return (
    <div className="flex w-full max-w-[440px] flex-col items-center gap-5 text-center">
      <div>
        <p className="text-[24px] font-medium tracking-[-0.03em] text-foreground">Be first to try Relay</p>
        <p className="mt-1 text-[13.5px] text-muted-foreground">One email when it’s ready. Nothing else.</p>
      </div>
      <WaitlistField onSubmit={join} joined={tab === 'Joined' ? { position: 1248 } : null} />
    </div>
  );
}
