'use client';

import React, { useState } from 'react';
import { UsageLimits, type PlanLimit } from '../registry/usage-limits';

const HOUR = 3_600_000;

// An agent working on Kept's till app, on the Max plan.
export default function UsageLimitsDemo({ tab = 'Normal' }: { tab?: string }) {
  const [now] = useState(() => Date.now());
  const fiveHour = tab === 'Reached' ? 1 : tab === 'Near the limit' ? 0.86 : 0.38;
  const nextTuesday = (() => {
    const d = new Date(now);
    d.setDate(d.getDate() + ((9 - d.getDay()) % 7 || 7));
    d.setHours(15, 0, 0, 0);
    return d.getTime();
  })();
  const limits: PlanLimit[] = [
    { id: 'five-hour', label: '5-hour window', used: fiveHour * 100, limit: 100, resetsAt: now + 2 * HOUR + 46 * 60_000 },
    { id: 'weekly', label: 'Weekly · all models', used: tab === 'Normal' ? 3 : 41, limit: 100, resetsAt: nextTuesday },
    { id: 'think', label: 'Weekly · Aurora Think', used: tab === 'Reached' ? 100 : 5, limit: 100, resetsAt: nextTuesday },
  ];
  return (
    <div className="w-full max-w-[440px] py-4">
      <UsageLimits
        key={tab}
        plan="Max"
        defaultOpen={tab === 'Near the limit'}
        context={{
          limit: 1_000_000,
          parts: [
            { id: 'system', label: 'System prompt', tokens: 14_000 },
            { id: 'tools', label: 'Tools', tokens: 46_000 },
            { id: 'files', label: 'Files read', tokens: tab === 'Normal' ? 212_000 : 318_000 },
            { id: 'chat', label: 'Conversation', tokens: tab === 'Normal' ? 298_000 : 548_000 },
          ],
        }}
        limits={limits}
        onPlanClick={() => {}}
        locales="en-US"
      />
    </div>
  );
}
