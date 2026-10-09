'use client';

import React, { useEffect, useState } from 'react';
import { CodeInput } from '../registry/code-input';

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const RIGHT = '424242';

// Signing in to Kept's till on a new device. Autofill and Wrong code play a code arriving by SMS.
export default function CodeInputDemo({ tab = 'Try it' }: { tab?: string }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (tab === 'Try it') return;
    const timer = window.setTimeout(() => setValue(tab === 'Autofill' ? RIGHT : '138507'), 900);
    return () => window.clearTimeout(timer);
  }, [tab]);

  return (
    <div className="flex w-full max-w-[360px] flex-col items-start gap-1">
      <p className="text-[15px] font-medium tracking-[-0.01em] text-foreground">Check your phone</p>
      <p className="mb-4 text-[13px] text-muted-foreground">We sent a code to •• •• 4417.{tab === 'Try it' ? ` Try ${RIGHT}, or anything else to see it fail.` : ''}</p>
      <CodeInput
        value={value}
        onValueChange={setValue}
        groups={[3, 3]}
        autoFocus={tab === 'Try it'}
        onComplete={async (code) => {
          await wait(1100);
          return code === RIGHT;
        }}
        onResend={() => wait(900)}
      />
    </div>
  );
}
