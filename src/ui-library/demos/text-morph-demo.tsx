'use client';

import React, { useEffect, useState } from 'react';
import { TextMorph } from '../registry/text-morph';

const WORDS = ['Save', 'Saving', 'Saved', 'Copy link', 'Copied', 'Follow', 'Following', 'Subscribe'];
const AUDIENCES = ['founders', 'designers', 'agencies', 'indie makers'];

export default function TextMorphDemo({ tab = 'Labels' }: { tab?: string }) {
  const [word, setWord] = useState('Save');
  const [i, setI] = useState(0);

  // The headline steps through its words on its own.
  useEffect(() => {
    if (tab !== 'Headline') return;
    const timer = window.setInterval(() => setI((n) => (n + 1) % AUDIENCES.length), 2200);
    return () => window.clearInterval(timer);
  }, [tab]);

  if (tab === 'Headline') {
    return (
      <p className="text-center text-[44px] font-medium leading-[1.1] tracking-[-0.04em] text-foreground">
        Landing pages for <TextMorph className="text-primary">{AUDIENCES[i]}</TextMorph>
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <TextMorph className="text-[52px] font-medium leading-[1.1] tracking-[-0.04em] text-foreground">{word}</TextMorph>
      <div className="flex max-w-[420px] flex-wrap justify-center gap-1.5">
        {WORDS.map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => setWord(w)}
            aria-pressed={w === word}
            className={`h-8 rounded-full px-3 text-[12.5px] transition-colors ${
              w === word ? 'bg-foreground text-background' : 'text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)] hover:text-foreground'
            }`}
          >
            {w}
          </button>
        ))}
      </div>
    </div>
  );
}
