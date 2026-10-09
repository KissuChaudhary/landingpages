'use client';

import React, { useEffect, useState } from 'react';
import { Check, CreditCard, Lock } from 'lucide-react';
import { ScrollStory, type ScrollStoryStep } from '../registry/scroll-story';
import { NumberRoll } from '../registry/number-roll';
import { TextMorph } from '../registry/text-morph';

const EASE = 'cubic-bezier(0.16,1,0.3,1)';

/** Flips to true a moment after the picture arrives, so each one plays its own small moment. */
function useLater(ms: number) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setOn(true), ms);
    return () => window.clearTimeout(t);
  }, [ms]);
  return on;
}

function PickTemplate() {
  const picked = useLater(550);
  return (
    <div className="w-[248px] p-4">
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="relative h-[64px] rounded-[10px] border bg-background p-1.5"
            style={{ borderColor: i === 1 && picked ? 'var(--primary)' : 'var(--border)', transition: `border-color 300ms ${EASE}` }}
          >
            <span className="block h-1.5 w-1/2 rounded-full bg-muted-foreground/30" />
            <span className="mt-1.5 block h-5 rounded-[4px] bg-muted" />
            <span className="mt-1.5 block h-1.5 w-3/4 rounded-full bg-muted-foreground/20" />
            {i === 1 && (
              <span
                className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground"
                style={{ transform: picked ? 'scale(1)' : 'scale(0)', transition: `transform 360ms cubic-bezier(0.34,1.36,0.64,1)` }}
              >
                <Check className="size-2.5" strokeWidth={3} />
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-3 text-[12px] text-muted-foreground">
        <TextMorph>{picked ? 'Picked: Index' : 'Three to start from'}</TextMorph>
      </p>
    </div>
  );
}

function MakeYours() {
  const name = 'Kept Coffee';
  const [typed, setTyped] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setTyped((n) => (n < name.length ? n + 1 : n)), 70);
    return () => window.clearInterval(t);
  }, []);
  const done = typed === name.length;
  const colors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--foreground)'];
  return (
    <div className="w-[248px] p-4">
      <p className="text-[11px] text-muted-foreground">Name</p>
      <div className="mt-1 flex h-9 items-center rounded-[10px] border border-border bg-background px-3 text-[13.5px] text-foreground">
        {name.slice(0, typed)}
        <span className="ml-px h-4 w-px bg-foreground motion-safe:animate-[ui-blink_1s_steps(1)_infinite]" />
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">Colour</p>
      <div className="mt-1.5 flex gap-2">
        {colors.map((c, i) => (
          <span
            key={i}
            className="size-6 rounded-full border-2"
            style={{
              backgroundColor: c,
              borderColor: done && i === 2 ? 'var(--background)' : 'transparent',
              outline: done && i === 2 ? '1px solid var(--foreground)' : '1px solid transparent',
              transition: `outline-color 300ms ${EASE}, border-color 300ms ${EASE}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Payments() {
  const on = useLater(500);
  const connected = useLater(1400);
  return (
    <div className="w-[248px] p-4">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-[10px] border border-border bg-background">
          <CreditCard className="size-4 text-foreground" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-foreground">Payments</p>
          <p className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
            <span className={`size-1.5 rounded-full transition-colors duration-300 ${connected ? 'bg-emerald-500' : 'bg-muted-foreground/50'}`} />
            <TextMorph>{connected ? 'Connected' : on ? 'Connecting' : 'Not connected'}</TextMorph>
          </p>
        </div>
        <span
          className="relative h-5 w-9 shrink-0 rounded-full"
          style={{ backgroundColor: on ? 'var(--primary)' : 'var(--muted)', transition: `background-color 300ms ${EASE}` }}
        >
          <span
            className="absolute top-0.5 size-4 rounded-full bg-background"
            style={{ left: on ? 18 : 2, transition: `left 320ms cubic-bezier(0.34,1.36,0.64,1)` }}
          />
        </span>
      </div>
      <div className="mt-3 flex justify-between border-t border-border pt-3 text-[12px] text-muted-foreground">
        <span>Fees</span>
        <span className="tabular-nums text-foreground">2.9% + 30¢</span>
      </div>
    </div>
  );
}

function GoLive() {
  const live = useLater(350);
  return (
    <div className="w-[248px] p-4">
      <div className="flex h-8 items-center gap-2 rounded-full border border-border bg-background px-3 text-[12.5px] text-foreground">
        <Lock className="size-3 text-muted-foreground" />
        kept.coffee
        <span className="ml-auto flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400" style={{ opacity: live ? 1 : 0, transition: 'opacity 300ms' }}>
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      </div>
      <p className="mt-4 text-[28px] font-semibold leading-none tracking-tight text-foreground tabular-nums">
        <NumberRoll value={live ? 128 : 0} />
      </p>
      <p className="mt-1.5 text-[12px] text-muted-foreground">visitors in the first hour</p>
    </div>
  );
}

const STEPS: ScrollStoryStep[] = [
  { title: 'Pick a template', body: 'Start from a page that already moves, not a blank file.', visual: <PickTemplate /> },
  { title: 'Make it yours', body: 'Your name, your colour. The motion comes with it.', visual: <MakeYours /> },
  { title: 'Connect payments', body: 'One switch, and the pricing section takes real money.', visual: <Payments /> },
  { title: 'Go live', body: 'Push it and watch the first visitors arrive.', visual: <GoLive /> },
];

export default function ScrollStoryDemo() {
  return (
    <div className="w-full max-w-[640px]">
      <p className="mb-2 text-center text-[12px] text-muted-foreground">Scroll inside the box.</p>
      <div className="h-[440px] overflow-y-auto overscroll-y-contain rounded-[20px] border border-border bg-background px-4 [scrollbar-width:thin] sm:px-6">
        <ScrollStory steps={STEPS} />
      </div>
    </div>
  );
}
