'use client';

import React, { useEffect, useRef, useState } from 'react';
import { LiveCursors, type LiveCursor, type LiveCursorBox } from '../registry/live-cursors';
import { NumberRoll } from '../registry/number-roll';

// The wireframe is laid out in fractions of the canvas, so the boxes people select line up at any size.
const BOX = {
  nav: { x: 0.05, y: 0.06, width: 0.9, height: 0.09 },
  headline: { x: 0.12, y: 0.21, width: 0.76, height: 0.15 },
  primary: { x: 0.31, y: 0.55, width: 0.18, height: 0.09 },
  secondary: { x: 0.51, y: 0.55, width: 0.18, height: 0.09 },
  card1: { x: 0.05, y: 0.72, width: 0.28, height: 0.21 },
  card2: { x: 0.36, y: 0.72, width: 0.28, height: 0.21 },
  card3: { x: 0.67, y: 0.72, width: 0.28, height: 0.21 },
} satisfies Record<string, LiveCursorBox>;

type Person = {
  id: string;
  name: string;
  /** [seconds, x, y] waypoints through one loop. */
  path: [number, number, number][];
  say?: [number, number, string][];
  clicks?: number[];
  select?: [number, LiveCursorBox | null][];
  /** [from, to] seconds they're here; always, when left out. */
  here?: [number, number];
};

const LOOP = 16;
const PEOPLE: Person[] = [
  {
    id: 'ana',
    name: 'Ana',
    path: [[0, 0.3, 0.3], [1.2, 0.46, 0.27], [6.5, 0.48, 0.29], [7.6, 0.41, 0.6], [12.5, 0.43, 0.61], [13.6, 0.2, 0.84], [16, 0.3, 0.3]],
    say: [[2.2, 6.2, 'Love this headline'], [8.8, 12.4, 'Make this one darker?']],
    clicks: [1.2, 7.7],
    select: [[1.3, BOX.headline], [7.8, BOX.primary], [13.8, null]],
  },
  {
    id: 'kofi',
    name: 'Kofi',
    path: [[0, 0.82, 0.86], [2.6, 0.84, 0.84], [3.6, 0.52, 0.8], [5.4, 0.55, 0.82], [14.8, 0.55, 0.82], [16, 0.82, 0.86]],
    clicks: [3.7],
    select: [[3.8, BOX.card2], [15, null]],
  },
  {
    id: 'mei',
    name: 'Mei',
    path: [[2, 0.62, 0.48], [3.4, 0.86, 0.12], [8.6, 0.85, 0.13], [10, 0.7, 0.5], [12, 0.72, 0.52]],
    say: [[4.4, 8.4, 'Pricing link goes here']],
    clicks: [3.5],
    select: [[3.6, BOX.nav], [9.6, null]],
    here: [2, 12],
  },
];

const ease = (k: number) => k * k * (3 - 2 * k);

function at(p: Person, t: number, loop: number): LiveCursor | null {
  if (p.here && (t < p.here[0] || t > p.here[1])) return null;
  const path = p.path;
  let i = path.findIndex(([s], n) => n < path.length - 1 && t >= s && t <= path[n + 1][0]);
  if (i === -1) i = t < path[0][0] ? 0 : path.length - 2;
  const [s0, x0, y0] = path[i];
  const [s1, x1, y1] = path[i + 1];
  const k = ease(Math.min(1, Math.max(0, (t - s0) / Math.max(0.001, s1 - s0))));
  const moving = x0 !== x1 || y0 !== y1;
  // A little hand wobble while moving, none while resting.
  const wobble = moving && k > 0 && k < 1 ? Math.sin(t * 9 + p.id.length) * 0.004 : 0;
  const message = p.say?.find(([a, b]) => t >= a && t <= b)?.[2];
  const clicks = (p.clicks?.length ?? 0) * loop + (p.clicks?.filter((c) => c <= t).length ?? 0);
  const picks = p.select ?? [];
  const pick = [...picks].reverse().find(([s]) => s <= t) ?? picks[picks.length - 1];
  return { id: p.id, name: p.name, x: x0 + (x1 - x0) * k + wobble, y: y0 + (y1 - y0) * k - wobble, message, clicks, selection: pick?.[1] ?? null };
}

export default function LiveCursorsDemo() {
  const [cursors, setCursors] = useState<LiveCursor[]>([]);
  const [reply, setReply] = useState<string | null>(null);
  const start = useRef(0);

  // Positions arrive ten times a second, the way a realtime channel would send them.
  useEffect(() => {
    start.current = performance.now();
    const timer = window.setInterval(() => {
      const elapsed = (performance.now() - start.current) / 1000;
      const loop = Math.floor(elapsed / LOOP);
      const t = elapsed % LOOP;
      setCursors(PEOPLE.map((p) => at(p, t, loop)).filter((c): c is LiveCursor => c !== null));
    }, 100);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!reply) return;
    const timer = window.setTimeout(() => setReply(null), 3600);
    return () => window.clearTimeout(timer);
  }, [reply]);

  // Say something and Ana answers.
  const shown = cursors.map((c) => (c.id === 'ana' && reply ? { ...c, message: reply } : c));

  return (
    <div className="w-full max-w-[560px]">
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {PEOPLE.map((p, i) => {
              const here = cursors.some((c) => c.id === p.id);
              return (
                <span
                  key={p.id}
                  className="flex h-6 shrink-0 items-center justify-center overflow-hidden rounded-full border-[1.5px] bg-background text-[10px] font-medium text-foreground"
                  style={{
                    // Someone leaving shrinks out of the row and closes the gap.
                    width: here ? 24 : 0,
                    borderColor: `var(--chart-${i + 1})`,
                    opacity: here ? 1 : 0,
                    transform: here ? 'none' : 'scale(0.6)',
                    transition: 'opacity 260ms cubic-bezier(0.16,1,0.3,1), transform 260ms cubic-bezier(0.16,1,0.3,1), width 320ms cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  {p.name[0]}
                </span>
              );
            })}
          </div>
          <span className="text-[12px] text-muted-foreground">
            <NumberRoll value={cursors.length} /> here
          </span>
        </div>
        <span className="hidden items-center gap-1 text-[11.5px] text-muted-foreground [@media(pointer:fine)]:flex">
          Press <kbd className="rounded-[4px] border border-border px-1 font-sans text-[10.5px] text-foreground">/</kbd> to chat
        </span>
      </div>

      <LiveCursors
        cursors={shown}
        idleAfter={4000}
        onMessage={() => window.setTimeout(() => setReply('Agreed, let’s ship it'), 900)}
        className="@container aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-border bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] sm:aspect-[16/10]"
      >
        {/* The page being designed, as grey blocks. */}
        <div aria-hidden="true" className="absolute inset-0">
          <Block box={BOX.nav} className="flex items-center justify-between rounded-[8px] border border-border bg-card px-[3%]">
            <span className="h-[30%] w-[12%] rounded-full bg-foreground/80" />
            <span className="flex h-full w-[40%] items-center justify-end gap-[8%]">
              <span className="h-[18%] w-[18%] rounded-full bg-muted-foreground/30" />
              <span className="h-[18%] w-[18%] rounded-full bg-muted-foreground/30" />
              <span className="h-[46%] w-[26%] rounded-full bg-primary" />
            </span>
          </Block>
          <Block box={BOX.headline} className="flex items-center justify-center">
            <span className="text-center text-[6.4cqw] font-semibold leading-none tracking-tight text-foreground">Ship the pricing page</span>
          </Block>
          <Block box={{ x: 0.22, y: 0.4, width: 0.56, height: 0.035 }} className="rounded-full bg-muted-foreground/20" />
          <Block box={{ x: 0.3, y: 0.46, width: 0.4, height: 0.035 }} className="rounded-full bg-muted-foreground/20" />
          <Block box={BOX.primary} className="flex items-center justify-center rounded-full bg-primary">
            <span className="text-[2.2cqw] font-medium text-primary-foreground">Start free</span>
          </Block>
          <Block box={BOX.secondary} className="flex items-center justify-center rounded-full border border-border bg-card">
            <span className="text-[2.2cqw] font-medium text-foreground">See pricing</span>
          </Block>
          {[BOX.card1, BOX.card2, BOX.card3].map((b, i) => (
            <Block key={i} box={b} className="flex flex-col gap-[8%] rounded-[10px] border border-border bg-card p-[3%]">
              <span className="aspect-square w-[16%] rounded-[4px] bg-muted-foreground/25" />
              <span className="h-[9%] w-[70%] rounded-full bg-muted-foreground/30" />
              <span className="h-[9%] w-[50%] rounded-full bg-muted-foreground/20" />
            </Block>
          ))}
        </div>
      </LiveCursors>
    </div>
  );
}

function Block({ box, className, children }: { box: LiveCursorBox; className: string; children?: React.ReactNode }) {
  return (
    <div
      className={`absolute ${className}`}
      style={{ left: `${box.x * 100}%`, top: `${box.y * 100}%`, width: `${box.width * 100}%`, height: `${box.height * 100}%` }}
    >
      {children}
    </div>
  );
}
