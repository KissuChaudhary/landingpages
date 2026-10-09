"use client";

import * as React from "react";
import { site } from "@/site.config";
import { NumberRoll } from "@/components/hairline/number-roll";

/*
 * The monthly bill: what it would have been (a dashed line still climbing)
 * against what it became (the mint line falling away). When `play` turns
 * true, the mint line draws itself, the gap between them fills in, and the
 * figure rolls down from the projected bill to the real one.
 */

const EASE = "cubic-bezier(0.16,1,0.3,1)";
const W = 400;
const H = 170;

/** A smooth path through points (Catmull-Rom as cubic Béziers). */
export function smoothPath(points: [number, number][]) {
  return points.reduce((d, [x, y], i, all) => {
    if (i === 0) return `M${x} ${y}`;
    const [x0, y0] = all[i - 2] ?? all[i - 1];
    const [x1, y1] = all[i - 1];
    const [x3, y3] = all[i + 1] ?? [x, y];
    const c1 = [x1 + (x - x0) / 6, y1 + (y - y0) / 6];
    const c2 = [x - (x3 - x1) / 6, y - (y3 - y1) / 6];
    return `${d} C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }, "");
}

export function BillChart({ play }: { play: boolean }) {
  const { bill } = site.proof;
  const all = [...bill.before, ...bill.after];
  const min = Math.min(...all) * 0.86;
  const max = Math.max(...all) * 1.04;
  const x = (i: number) => (i / (bill.months.length - 1)) * W;
  const y = (v: number) => H - ((v - min) / (max - min)) * H;
  const before = bill.before.map((v, i) => [x(i), y(v)] as [number, number]);
  const after = bill.after.map((v, i) => [x(i), y(v)] as [number, number]);
  const area = `${smoothPath(after)} L${before
    .slice()
    .reverse()
    .map(([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`)
    .join(" L")} Z`;
  const last = bill.after[bill.after.length - 1];
  const projected = bill.before[bill.before.length - 1];
  const cut = Math.round((1 - last / projected) * 100);
  const [ex, ey] = after[after.length - 1];

  return (
    <div className="flex h-full flex-col rounded-[22px] bg-ink p-5 text-white sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <p className="text-[13px] text-white/55">{bill.label}</p>
        <div className="flex items-center gap-3 text-[11.5px] text-white/50">
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-px w-3 border-t border-dashed border-white/50" />
            Projected
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-[2px] w-3 rounded-full bg-mint" />
            With Shear
          </span>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <NumberRoll
          locales={site.locale}
          value={play ? last : projected}
          format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
          duration={1400}
          className="text-[34px] font-[460] tracking-[-0.04em] sm:text-[40px]"
        />
        <span
          className="rounded-full bg-mint/15 px-2 py-0.5 text-[12px] font-[520] text-mint transition-[opacity,translate] duration-700"
          style={{ opacity: play ? 1 : 0, translate: play ? "0 0" : "0 4px", transitionDelay: "700ms" }}
        >
          −{cut}% vs. projected
        </span>
      </div>
      <div className="relative mt-4 min-h-[120px] flex-1">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="white" strokeOpacity="0.06" vectorEffect="non-scaling-stroke" />
          ))}
          <path d={area} fill="var(--mint)" style={{ opacity: play ? 0.12 : 0, transition: `opacity 900ms ${EASE} 500ms` }} />
          <path d={smoothPath(before)} fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />
          <path
            d={smoothPath(after)}
            fill="none"
            stroke="var(--mint)"
            strokeWidth="2.25"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            strokeDasharray="1"
            style={{ strokeDashoffset: play ? 0 : 1, transition: `stroke-dashoffset 1500ms ${EASE}` }}
          />
        </svg>
        <span
          aria-hidden="true"
          className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint transition-opacity duration-500"
          style={{ left: `${(ex / W) * 100}%`, top: `${(ey / H) * 100}%`, opacity: play ? 1 : 0, transitionDelay: "1300ms" }}
        >
          <span className="loop absolute inset-0 rounded-full bg-mint animate-[sh-ring_2.4s_ease-out_infinite]" />
        </span>
      </div>
      <div className="mt-3 flex justify-between font-mono text-[11px] text-white/35" aria-hidden="true">
        {bill.months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      <p className="sr-only">
        {bill.label}: projected {projected.toLocaleString(site.locale, { style: "currency", currency: "USD", maximumFractionDigits: 0 })}, actual{" "}
        {last.toLocaleString(site.locale, { style: "currency", currency: "USD", maximumFractionDigits: 0 })} in {bill.months[bill.months.length - 1]}.
      </p>
    </div>
  );
}
