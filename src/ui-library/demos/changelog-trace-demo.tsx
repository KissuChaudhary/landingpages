'use client';

import React from 'react';
import { ChangelogTrace } from '../registry/changelog-trace';
import { ENTRIES } from './changelog-timeline-demo';

export default function ChangelogTraceDemo() {
  return (
    <div className="w-full max-w-[720px] py-4">
      <ChangelogTrace entries={ENTRIES} initialCount={4} />
    </div>
  );
}
