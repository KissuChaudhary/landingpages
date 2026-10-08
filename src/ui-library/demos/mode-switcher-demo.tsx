'use client';

import React, { useState } from 'react';
import { Brain, Telescope, Zap } from 'lucide-react';
import { ModeSwitcher } from '../registry/mode-switcher';

const MODES = [
  { value: 'fast', label: 'Fast', icon: <Zap />, description: 'Quick answers for everyday questions.' },
  { value: 'thinking', label: 'Thinking', icon: <Brain />, description: 'Takes a moment to reason before answering.' },
  { value: 'research', label: 'Research', icon: <Telescope />, description: 'Reads dozens of sources and writes a report.', locked: true },
];

export default function ModeSwitcherDemo() {
  const [note, setNote] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <ModeSwitcher modes={MODES} defaultValue="fast" showDescription onLockedSelect={(m) => setNote(`${m.label} is on the Pro plan.`)} />
      <p className="h-4 text-[12px] text-muted-foreground">{note && <span className="animate-[ui-fade-in_250ms_ease-out_both]">{note}</span>}</p>
    </div>
  );
}
