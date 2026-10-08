'use client';

import React, { useEffect, useState } from 'react';
import { ThinkingIndicator, type IndicatorVariant } from '../registry/thinking-indicator';

export default function ThinkingIndicatorDemo({ tab = 'Orbit' }: { tab?: string }) {
  const [startedAt] = useState(() => Date.now() - (tab === 'Done' ? 0 : 41_200));
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (tab !== 'Done') return;
    const t = window.setTimeout(() => setDone(true), 2400);
    return () => window.clearTimeout(t);
  }, [tab]);

  const variant = (tab === 'Done' ? 'orbit' : tab.toLowerCase()) as IndicatorVariant;

  return <ThinkingIndicator variant={variant} label="Churning" startedAt={startedAt} status={done ? 'done' : 'running'} />;
}
