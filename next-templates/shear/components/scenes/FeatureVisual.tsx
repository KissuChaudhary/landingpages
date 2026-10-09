"use client";

import { site } from "@/site.config";

import * as React from "react";
import { AlertTriangle, ArrowRight } from "lucide-react";
import type { FeatureVisual as Kind } from "@/site.config";
import { NumberRoll } from "@/components/hairline/number-roll";
import { smoothPath } from "./BillChart";

/*
 * Small product scenes for the feature cards. Each one plays when its card
 * is on screen (`play`): bars grow, rings fill, dials sweep, lines draw.
 * Ambient loops carry the `loop` class, so pause and reduced motion stop them.
 * The figures are sample data; swap a card for a screenshot with `image`.
 */

const EASE = "cubic-bezier(0.16,1,0.3,1)";
const t = (play: boolean, delay = 0, ms = 900) => ({ transition: `all ${ms}ms ${EASE} ${play ? delay : 0}ms` });

function Frame({ glow, children }: { glow: string; children: React.ReactNode }) {
  return (
    <div className="relative isolate h-full w-full overflow-hidden rounded-[18px] bg-ink text-white">
      <div
        aria-hidden="true"
        className="loop absolute -inset-[20%] -z-10 opacity-60 blur-[50px] animate-[sh-drift_14s_ease-in-out_infinite]"
        style={{ background: `radial-gradient(40% 40% at 30% 75%, ${glow}, transparent 70%), radial-gradient(35% 35% at 80% 20%, ${glow}55, transparent 70%)` }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:14px_14px]" />
      {children}
    </div>
  );
}

function Radar({ play }: { play: boolean }) {
  const rows = [
    { id: "i-0a3f9 · idle 21d", cost: 1840, w: 100 },
    { id: "vol-77c2 · unattached", cost: 620, w: 34 },
    { id: "snapshots · 142 old", cost: 410, w: 22 },
    { id: "lb-legacy · 0 requests", cost: 290, w: 16 },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 p-5">
      <div className="mb-1 flex items-center justify-between text-[11px] text-white/55">
        <span>Waste this month</span>
        <span className="font-mono text-[13px] text-white">
          <NumberRoll locales={site.locale} value={play ? 3160 : 0} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} duration={1200} />
        </span>
      </div>
      {rows.map((row, i) => (
        <div key={row.id} className="rounded-[10px] border border-white/[0.07] bg-white/[0.04] px-3 py-2" style={{ ...t(play, 120 + i * 90, 700), opacity: play ? 1 : 0, transform: play ? "none" : "translateY(8px)" }}>
          <div className="flex items-center justify-between font-mono text-[10.5px]">
            <span className="text-white/70">{row.id}</span>
            <span className="text-white">${row.cost.toLocaleString(site.locale)}</span>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.08]">
            <div className="h-full rounded-full bg-mint" style={{ ...t(play, 300 + i * 90, 1100), width: play ? `${row.w}%` : "0%" }} />
          </div>
        </div>
      ))}
      <span aria-hidden="true" className="loop pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-mint/[0.07] to-transparent animate-[sh-scan_3.6s_linear_infinite]" />
    </div>
  );
}

function Rightsize({ play }: { play: boolean }) {
  const ticks = 34;
  const used = 0.18;
  return (
    <div className="flex h-full flex-col items-center justify-center p-5">
      <svg viewBox="0 0 200 112" className="w-[84%] max-w-[260px]" aria-hidden="true">
        {Array.from({ length: ticks }).map((_, i) => {
          const a = Math.PI - (i / (ticks - 1)) * Math.PI;
          const lit = i / (ticks - 1) <= used;
          return (
            <line
              key={i}
              x1={(100 + Math.cos(a) * 70).toFixed(2)}
              y1={(104 - Math.sin(a) * 70).toFixed(2)}
              x2={(100 + Math.cos(a) * 90).toFixed(2)}
              y2={(104 - Math.sin(a) * 90).toFixed(2)}
              stroke={lit ? "var(--mint)" : "white"}
              strokeOpacity={lit ? (play ? 1 : 0.15) : 0.15}
              strokeWidth="4.5"
              strokeLinecap="round"
              style={{ transition: `stroke-opacity 300ms ${EASE} ${play ? 200 + i * 40 : 0}ms` }}
            />
          );
        })}
      </svg>
      <div className="-mt-12 flex flex-col items-center">
        <span className="font-mono text-[26px] leading-none">
          <NumberRoll locales={site.locale} value={play ? 18 : 0} duration={1100} />%
        </span>
        <span className="mt-1 text-[10.5px] text-white/50">CPU p95, last 14 days</span>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] py-1 pl-3 pr-1 font-mono text-[10.5px]" style={{ ...t(play, 900, 700), opacity: play ? 1 : 0 }}>
        <span className="text-white/60 line-through decoration-white/40">2xlarge</span>
        <ArrowRight aria-hidden="true" className="size-3 text-white/40" />
        <span className="text-white">large</span>
        <span className="rounded-full bg-mint px-2 py-0.5 text-[10.5px] font-[600] text-ink">−$1,120/mo</span>
      </div>
    </div>
  );
}

function Commit({ play }: { play: boolean }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex h-full items-center justify-center gap-6 p-5">
      <div className="relative size-[132px] shrink-0">
        <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
          <circle cx="60" cy="60" r={r} fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="12" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="var(--mint)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={c.toFixed(2)}
            style={{ strokeDashoffset: (play ? c * (1 - 0.82) : c).toFixed(2), transition: `stroke-dashoffset 1400ms ${EASE} 200ms` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-[24px] leading-none">
            <NumberRoll locales={site.locale} value={play ? 82 : 0} duration={1300} />%
          </span>
          <span className="mt-1 text-[10px] text-white/50">covered</span>
        </div>
      </div>
      <dl className="space-y-3 text-[11px]">
        {[
          ["Baseline", "$41.2k/mo"],
          ["Plan", "1-year, no upfront"],
          ["Break-even", "Month 4"],
        ].map(([k, v], i) => (
          <div key={k} style={{ ...t(play, 500 + i * 120, 700), opacity: play ? 1 : 0, transform: play ? "none" : "translateX(8px)" }}>
            <dt className="text-white/45">{k}</dt>
            <dd className="font-mono text-[12px] text-white">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Anomaly({ play }: { play: boolean }) {
  const pts: [number, number][] = [
    [0, 70], [24, 66], [48, 68], [72, 64], [96, 67], [120, 63], [144, 65], [168, 22], [192, 18], [216, 20],
  ];
  return (
    <div className="flex h-full flex-col justify-center p-5">
      <div className="relative mx-auto aspect-[216/90] w-full max-w-[300px]">
        <svg viewBox="0 0 216 90" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
          <path d={smoothPath(pts.slice(0, 7))} fill="none" stroke="white" strokeOpacity="0.55" strokeWidth="2" pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: play ? 0 : 1, transition: `stroke-dashoffset 1000ms ${EASE}` }} />
          <path d={smoothPath(pts.slice(6))} fill="none" stroke="#fbbf24" strokeWidth="2.4" pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: play ? 0 : 1, transition: `stroke-dashoffset 600ms ${EASE} ${play ? 900 : 0}ms` }} />
        </svg>
        <span className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300" style={{ left: `${(168 / 216) * 100}%`, top: `${(22 / 90) * 100}%`, ...t(play, 1200, 400), opacity: play ? 1 : 0 }}>
          <span className="loop absolute inset-0 rounded-full bg-amber-300 animate-[sh-ring_2s_ease-out_infinite]" />
        </span>
      </div>
      <div
        className="mx-auto mt-5 flex w-full max-w-[300px] items-start gap-2.5 rounded-[12px] border border-amber-300/25 bg-amber-300/[0.08] p-3"
        style={{ ...t(play, 1350, 700), opacity: play ? 1 : 0, transform: play ? "none" : "translateY(10px)" }}
      >
        <AlertTriangle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-amber-300" strokeWidth={2.2} />
        <div className="text-[11px] leading-snug">
          <p className="text-white">Spend spike on export-job</p>
          <p className="mt-0.5 font-mono text-[10.5px] text-white/55">+$38/hr · deploy 4f2a91 · 4 min ago</p>
        </div>
      </div>
    </div>
  );
}

function Unit({ play }: { play: boolean }) {
  const months = [0.061, 0.054, 0.047, 0.041, 0.036, 0.031];
  const max = months[0];
  return (
    <div className="flex h-full flex-col justify-center p-5">
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] text-white/55">Cost per 1k requests</span>
        <span className="font-mono text-[18px]">
          $<NumberRoll locales={site.locale} value={play ? 0.031 : 0.061} format={{ minimumFractionDigits: 3, maximumFractionDigits: 3 }} duration={1300} />
        </span>
      </div>
      <div className="mt-5 flex h-[110px] items-end gap-2.5">
        {months.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="w-full origin-bottom rounded-[6px]" style={{ height: `${(v / max) * 100}%`, background: i === months.length - 1 ? "var(--mint)" : "rgba(255,255,255,0.16)", ...t(play, 150 + i * 90, 900), transform: play ? "none" : "scaleY(0)" }} />
            <span className="font-mono text-[9.5px] text-white/40">{["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Forecast({ play }: { play: boolean }) {
  const actual: [number, number][] = [[0, 30], [30, 34], [60, 40], [90, 46], [120, 52]];
  const without: [number, number][] = [[120, 52], [150, 60], [180, 69], [210, 78]];
  const withFixes: [number, number][] = [[120, 52], [150, 50], [180, 47], [210, 45]];
  const y = (v: number) => 100 - v;
  const map = (p: [number, number][]) => p.map(([px, py]) => [px, y(py)] as [number, number]);
  return (
    <div className="flex h-full flex-col justify-center p-5">
      <div className="relative mx-auto aspect-[210/100] w-full max-w-[300px]">
        <svg viewBox="0 0 210 100" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
          <line x1="120" x2="120" y1="0" y2="100" stroke="white" strokeOpacity="0.12" strokeDasharray="2 3" />
          <path d={smoothPath(map(actual))} fill="none" stroke="white" strokeOpacity="0.8" strokeWidth="2" pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: play ? 0 : 1, transition: `stroke-dashoffset 900ms ${EASE}` }} />
          <path d={smoothPath(map(without))} fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="1.6" strokeDasharray="3 4" style={{ opacity: play ? 1 : 0, transition: `opacity 600ms ${EASE} ${play ? 900 : 0}ms` }} />
          <path d={smoothPath(map(withFixes))} fill="none" stroke="var(--mint)" strokeWidth="2" strokeDasharray="3 4" style={{ opacity: play ? 1 : 0, transition: `opacity 600ms ${EASE} ${play ? 1100 : 0}ms` }} />
        </svg>
        <span className="absolute right-0 top-[18%] font-mono text-[10px] text-white/45" style={{ ...t(play, 1200, 600), opacity: play ? 1 : 0 }}>
          without fixes
        </span>
        <span className="absolute bottom-[38%] right-0 font-mono text-[10px] text-mint" style={{ ...t(play, 1400, 600), opacity: play ? 1 : 0 }}>
          with open fixes
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between text-[11px]">
        <span className="text-white/50">July forecast</span>
        <span className="rounded-full bg-mint/15 px-2 py-0.5 font-mono text-mint">−$7,240 if merged</span>
      </div>
    </div>
  );
}

const scenes: Record<Kind, (props: { play: boolean }) => React.ReactElement> = {
  radar: Radar,
  rightsize: Rightsize,
  commit: Commit,
  anomaly: Anomaly,
  unit: Unit,
  forecast: Forecast,
};

export function FeatureVisual({ kind, glow, play }: { kind: Kind; glow: string; play: boolean }) {
  const Scene = scenes[kind];
  return (
    <Frame glow={glow}>
      <Scene play={play} />
    </Frame>
  );
}
