'use client';

import React from 'react';
import { ChangelogScrubber } from '../registry/changelog-scrubber';
import { ENTRIES } from './changelog-timeline-demo';

export default function ChangelogScrubberDemo() {
  return (
    <div className="w-full max-w-[640px] py-4">
      <ChangelogScrubber entries={ENTRIES} />
    </div>
  );
}
