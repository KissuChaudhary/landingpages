'use client';

import React, { useEffect, useState } from 'react';
import { InlineRewrite, type RewriteVersion } from '../registry/inline-rewrite';

const LENGTH: RewriteVersion[] = [
  { label: 'Shortest', text: 'Fresh beans from small roasters, at your door every two weeks.' },
  { label: 'Shorter', text: 'Fresh beans from small roasters, roasted to order and at your door every two weeks. Skip or cancel anytime.' },
  {
    label: 'Original',
    text: 'Kept sends fresh beans from small roasters, roasted to order and at your door every two weeks. Each bag comes with a note from the roaster on how to brew it. Skip a delivery or cancel anytime from your phone.',
  },
  {
    label: 'Longer',
    text: 'Kept sends fresh beans from small roasters across Europe, roasted to order on Monday and at your door every two weeks. Each bag comes with a handwritten note from the roaster on where the beans grew and how to brew it. Skip a delivery, swap a bag or cancel anytime from your phone, with no calls and no forms.',
  },
  {
    label: 'Longest',
    text: 'Kept sends fresh beans from small roasters across Europe, roasted to order on Monday and at your door every two weeks. Each bag comes with a handwritten note from the roaster on where the beans grew and how to brew it. Skip a delivery, swap a bag or cancel anytime from your phone, with no calls and no forms. And if a bag doesn’t become your favourite, the next one is on us.',
  },
];

// Only Neutral is written; the others are written the first time the dial lands on them.
const TONE: RewriteVersion[] = [{ label: 'Blunt' }, { label: 'Neutral', text: 'Sorry, your order shipped late. It should arrive on Thursday, and we’ve refunded the shipping.' }, { label: 'Warm' }, { label: 'Playful' }];
const WRITTEN: Record<string, string> = {
  Blunt: 'Your order shipped late. It arrives on Thursday. We’ve refunded the shipping.',
  Warm: 'We’re so sorry your order shipped late. It should arrive on Thursday, and we’ve refunded the shipping so you’re not out of pocket. Thank you for bearing with us.',
  Playful: 'Your beans took the scenic route, sorry about that. They should arrive on Thursday, and we’ve refunded the shipping. The next coffee’s on us.',
};

function Length() {
  const [index, setIndex] = useState(2);
  const [auto, setAuto] = useState(true);

  // It plays a few lengths on its own until you touch the dial.
  useEffect(() => {
    if (!auto) return;
    const steps = [1, 0, 1, 2, 3, 4, 3, 2];
    const timers = steps.map((s, i) => window.setTimeout(() => setIndex(s), 1400 + i * 2100));
    timers.push(window.setTimeout(() => setAuto(false), 1400 + steps.length * 2100));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [auto]);

  return (
    <div onPointerDownCapture={() => setAuto(false)} onKeyDownCapture={() => setAuto(false)}>
      <p className="mb-3 text-[13px] font-medium text-foreground">Product description</p>
      <InlineRewrite versions={LENGTH} value={index} onValueChange={setIndex} label="Length" />
    </div>
  );
}

function Tone() {
  return (
    <div>
      <p className="text-[13px] font-medium text-foreground">Re: Where’s my order?</p>
      <p className="mb-3 text-[11.5px] text-muted-foreground">Reply to Maya, drafted</p>
      <InlineRewrite
        versions={TONE}
        defaultValue={1}
        label="Tone"
        onRewrite={({ label }) => new Promise((resolve) => window.setTimeout(() => resolve(WRITTEN[label]), 1300))}
      />
    </div>
  );
}

export default function InlineRewriteDemo({ tab = 'Length' }: { tab?: string }) {
  // A fixed height so the frame doesn't jump as the paragraph grows and shrinks.
  return (
    <div className="flex h-[400px] w-full max-w-[440px] flex-col sm:h-[340px]">
      <div className="rounded-[20px] border border-border bg-card p-4">{tab === 'Tone' ? <Tone /> : <Length />}</div>
      <p className="mt-3 text-center text-[12px] text-muted-foreground">Drag the dial.</p>
    </div>
  );
}
