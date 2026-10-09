'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { ThemeToggle, type Theme } from '../registry/theme-toggle';

const query = '(prefers-color-scheme: dark)';
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(query);
  m.addEventListener('change', cb);
  return () => m.removeEventListener('change', cb);
};

export default function ThemeToggleDemo() {
  // Controlled here so the demo themes this card, not the whole docs page.
  const [theme, setTheme] = useState<Theme>('light');
  const systemDark = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
  const dark = theme === 'dark' || (theme === 'system' && systemDark);

  return (
    <div className={`${dark ? 'dark' : ''} w-full max-w-[460px] rounded-[22px] border border-border bg-background p-5 text-foreground`}>
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-medium tracking-[-0.01em]">Kept</span>
        <ThemeToggle value={theme} onValueChange={setTheme} />
      </div>
      <div className="mt-6 rounded-[16px] border border-border p-4">
        <p className="text-[12px] text-muted-foreground">Tonight’s churn</p>
        <p className="mt-1 text-[22px] font-medium tracking-[-0.03em]">Pistachio, twice</p>
        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">The Saturday queue empties the tray by four. Start the second batch at noon.</p>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <ThemeToggle variant="segmented" value={theme} onValueChange={setTheme} />
        <ThemeToggle variant="pill" value={theme} onValueChange={setTheme} />
      </div>
    </div>
  );
}
