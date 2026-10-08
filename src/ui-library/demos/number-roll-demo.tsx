'use client';

import React, { useEffect, useState } from 'react';
import { NumberRoll } from '../registry/number-roll';

const BUTTON =
  'h-8 rounded-full border border-border px-3 font-mono text-[12px] tabular-nums text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:scale-[0.96]';

const CURRENCY: Intl.NumberFormatOptions = { style: 'currency', currency: 'USD', maximumFractionDigits: 0 };
const COMPACT: Intl.NumberFormatOptions = { notation: 'compact', maximumFractionDigits: 1 };

export default function NumberRollDemo({ tab = 'Try it' }: { tab?: string }) {
  const [value, setValue] = useState(tab === 'Live' ? 12_480 : tab === 'Compact' ? 9_400 : 1_248);

  // A stand-in for a live metric: small, uneven bumps.
  useEffect(() => {
    if (tab !== 'Live') return;
    const timer = window.setInterval(() => setValue((v) => v + 1 + Math.floor(Math.random() * 7)), 1400);
    return () => window.clearInterval(timer);
  }, [tab]);

  return (
    <div className="flex flex-col items-center gap-6">
      {tab === 'Live' ? (
        <div className="text-center">
          <NumberRoll value={value} className="text-[64px] font-medium leading-[1.1] tracking-[-0.04em] text-foreground" />
          <p className="mt-1 text-[13px] text-muted-foreground">templates downloaded</p>
        </div>
      ) : (
        <NumberRoll
          value={value}
          format={tab === 'Compact' ? COMPACT : tab === 'Currency' ? CURRENCY : undefined}
          className="text-[64px] font-medium leading-[1.1] tracking-[-0.04em] text-foreground"
        />
      )}
      {tab !== 'Live' && (
        <div className="flex flex-wrap justify-center gap-1.5">
          <button type="button" className={BUTTON} onClick={() => setValue((v) => Math.max(0, v - 1))}>
            −1
          </button>
          <button type="button" className={BUTTON} onClick={() => setValue((v) => v + 1)}>
            +1
          </button>
          <button type="button" className={BUTTON} onClick={() => setValue((v) => v + 752)}>
            +752
          </button>
          <button type="button" className={BUTTON} onClick={() => setValue((v) => v * 10)}>
            ×10
          </button>
          <button type="button" className={BUTTON} onClick={() => setValue((v) => Math.max(1, Math.round(v / 10)))}>
            ÷10
          </button>
          <button type="button" className={BUTTON} onClick={() => setValue(Math.floor(Math.random() * 99_999))}>
            Random
          </button>
        </div>
      )}
    </div>
  );
}
