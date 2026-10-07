"use client";

import { useEffect, useRef, useState } from "react";

import { usePlayback } from "@/components/motion/hooks";
import { LiveDot } from "@/components/ui/Status";

const POINTS = 36;
const WIDTH = 300;
const HEIGHT = 110;
const MAX_MS = 140;

/** A small seeded generator, so the server and the browser draw the same first chart. */
function generator(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

type Sample = { p50: number; p99: number };

function sample(random: () => number): Sample {
  const p50 = 34 + random() * 8;
  const spike = random() > 0.93 ? 18 : 0;
  return { p50, p99: 102 + random() * 12 + spike };
}

/** A smoothed line through the samples: quadratic curves between midpoints. */
function toPath(values: number[], close = false) {
  const step = WIDTH / (values.length - 1);
  const points = values.map((value, index) => [index * step, HEIGHT - (value / MAX_MS) * HEIGHT]);
  const fixed = (number: number) => number.toFixed(1);
  let line = `M ${fixed(points[0][0])} ${fixed(points[0][1])}`;
  for (let index = 1; index < points.length - 1; index += 1) {
    const [x, y] = points[index];
    const [nx, ny] = points[index + 1];
    line += ` Q ${fixed(x)} ${fixed(y)} ${fixed((x + nx) / 2)} ${fixed((y + ny) / 2)}`;
  }
  const [lx, ly] = points[points.length - 1];
  line += ` L ${fixed(lx)} ${fixed(ly)}`;
  return close ? `${line} L ${WIDTH} ${HEIGHT} L 0 ${HEIGHT} Z` : line;
}

/** Live p50 and p99 dispatch latency, one new sample a second while on screen. */
export function LatencyChart() {
  const ref = useRef<HTMLDivElement>(null);
  const { playing } = usePlayback(ref, 0.4);
  // The first chart comes from a fixed seed (identical on server and client); live samples use their own stream.
  const live = useRef<() => number>(null);
  const [samples, setSamples] = useState<Sample[]>(() => {
    const random = generator(7);
    return Array.from({ length: POINTS }, () => sample(random));
  });

  useEffect(() => {
    if (!playing) return;
    live.current ??= generator(11);
    const random = live.current;
    const interval = window.setInterval(() => {
      setSamples((current) => [...current.slice(1), sample(random)]);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [playing]);

  const latest = samples[samples.length - 1];
  const p50 = samples.map((item) => item.p50);
  const p99 = samples.map((item) => item.p99);

  return (
    <div ref={ref} aria-hidden="true" className="flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">p50 dispatch</p>
          <p className="mt-1 text-[30px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
            {Math.round(latest.p50)}
            <span className="ml-1 text-base font-medium text-neutral-400">ms</span>
          </p>
        </div>
        <div className="text-right">
          <p className="flex items-center justify-end gap-1.5 text-[11px] font-semibold text-neutral-500">
            <LiveDot />
            Live
          </p>
          <p className="mt-1.5 font-mono text-[12px] tabular-nums text-neutral-400">p99 {Math.round(latest.p99)} ms</p>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" className="mt-auto h-[96px] w-full overflow-visible">
        <defs>
          <linearGradient id="latency-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((line) => (
          <line key={line} x1="0" x2={WIDTH} y1={HEIGHT * line} y2={HEIGHT * line} stroke="rgba(0,0,0,0.05)" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
        ))}
        <path d={toPath(p99)} fill="none" stroke="var(--color-accent-soft)" strokeWidth="1.5" strokeOpacity="0.8" vectorEffect="non-scaling-stroke" />
        <path d={toPath(p50, true)} fill="url(#latency-fill)" />
        <path d={toPath(p50)} fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
