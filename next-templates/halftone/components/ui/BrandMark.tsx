import { cn } from "@/lib/utils";
import { site } from "@/site.config";

/** Pixel cells of the glyph on a 5 × 5 grid: [column, row, opacity]. A halftone arrow with a fading trail. */
const CELLS: [number, number, number][] = [
  [0, 2, 0.35],
  [1, 2, 0.6],
  [2, 2, 1],
  [3, 2, 1],
  [4, 2, 1],
  [3, 1, 1],
  [3, 3, 1],
  [2, 0, 1],
  [2, 4, 1],
];

/** The product glyph. Swap the cells (or the whole SVG) for your own mark. */
export function BrandGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      {CELLS.map(([column, row, opacity]) => (
        <rect key={`${column}-${row}`} x={2.25 + column * 4} y={2.25 + row * 4} width={3.5} height={3.5} rx={0.9} opacity={opacity} />
      ))}
    </svg>
  );
}

/** The glyph inside an ink tile, with an optional wordmark. */
export function BrandMark({ className, wordmark = true }: { className?: string; wordmark?: boolean }) {
  return (
    <span className={cn("inline-flex select-none items-center gap-2", className)}>
      <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-[9px] bg-ink text-white">
        <BrandGlyph className="size-[18px]" />
      </span>
      {wordmark ? <span className="text-[17px] font-semibold tracking-tight text-ink">{site.brand.name}</span> : null}
    </span>
  );
}
