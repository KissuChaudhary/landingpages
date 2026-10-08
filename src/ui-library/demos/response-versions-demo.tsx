'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ResponseVersions } from '../registry/response-versions';

const POOL = [
  'Fresh beans at your door before the bag runs out.',
  'Roasted on Monday. In your cup by Thursday.',
  'Your next bag ships before you notice you need it.',
  'Good coffee, on a schedule you never think about.',
  'Small-batch roasts, delivered while they still matter.',
];

export default function ResponseVersionsDemo() {
  const [versions, setVersions] = useState(POOL.slice(0, 3));
  const [index, setIndex] = useState(2);
  const [regenerating, setRegenerating] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  // A new version is shown as soon as it arrives.
  const count = versions.length;
  useEffect(() => setIndex(count - 1), [count]);

  const regenerate = () => {
    setRegenerating(true);
    timer.current = window.setTimeout(() => {
      setVersions((v) => [...v, POOL[v.length % POOL.length]]);
      setRegenerating(false);
    }, 1400);
  };

  return (
    <div className="w-full max-w-[420px]">
      <p className="mb-4 ml-auto w-fit rounded-2xl bg-muted px-3.5 py-2 text-[13px] text-foreground">A tagline for our coffee subscription?</p>
      <ResponseVersions count={versions.length} index={index} onIndexChange={setIndex} onRegenerate={regenerate} regenerating={regenerating}>
        <p className="text-[15px] leading-relaxed text-foreground">{versions[index]}</p>
      </ResponseVersions>
    </div>
  );
}
