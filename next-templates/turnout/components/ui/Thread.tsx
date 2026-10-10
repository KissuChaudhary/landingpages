"use client";

import { useScrollProgress, type Range } from "@/components/Motion";

// A loose, looping line that draws itself as you scroll past it. Purely decorative.

const drawRange: Range = (el, vh) => ({ start: vh * 0.92, distance: el.offsetHeight + vh * 0.35 });

export function Thread({ d, viewBox, className = "", tone = "lime", width = 10 }: { d: string; viewBox: string; className?: string; tone?: "lime" | "iris"; width?: number }) {
  const ref = useScrollProgress<HTMLDivElement>((p, el) => {
    el.style.setProperty("--draw", (1 - p).toFixed(4));
  }, drawRange);
  return (
    <div ref={ref} className={`thread thread-${tone} ${className}`} aria-hidden="true">
      <svg viewBox={viewBox} fill="none" preserveAspectRatio="xMidYMid meet">
        <path d={d} pathLength={1} strokeWidth={width} />
      </svg>
    </div>
  );
}
