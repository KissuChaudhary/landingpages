import { cn } from "@/lib/utils";

/**
 * A line chart drawn from a list of numbers. The line stays crisp at any width because the stroke does not
 * scale. A dot marks the latest value.
 */
export function Sparkline({ points, className, grid = false }: { points: number[]; className?: string; grid?: boolean }) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const coords = points.map((value, index) => ({
    x: (index / (points.length - 1)) * 100,
    y: 100 - ((value - min) / span) * 88 - 6,
  }));
  const line = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(2)} ${c.y.toFixed(2)}`).join(" ");
  const last = coords[coords.length - 1];

  return (
    <div className={cn("relative", className)} role="img" aria-label={`Grew from ${points[0].toLocaleString("en-US")} to ${points[points.length - 1].toLocaleString("en-US")}`}>
      {grid ? (
        <div aria-hidden className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="block border-t border-dashed border-line" />
          ))}
        </div>
      ) : null}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible" aria-hidden>
        <path d={`${line} L100 100 L0 100 Z`} fill="var(--color-orange-soft)" />
        <path d={line} fill="none" stroke="var(--color-orange)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <span
        aria-hidden
        className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-sheet bg-orange"
        style={{ left: `${last.x}%`, top: `${last.y}%` }}
      />
    </div>
  );
}
