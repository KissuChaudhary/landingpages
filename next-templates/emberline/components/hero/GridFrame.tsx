import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The hero's line system, built from two ideas so it is easy to reason about:
 *
 *  - Rails: four vertical lines, drawn once for the whole hero (not repeated per row). The inner pair frames
 *    the text column; the outer pair frames the product mockup, which is exactly as wide as the outer pair.
 *  - Rows: full-bleed horizontal hairlines. Every row height is a multiple of the 32px --row unit.
 *
 * Diamonds mark the points where an inner rail meets a row line.
 */

export function Rails() {
  const rail = "absolute inset-y-0 w-px bg-line [mask-image:linear-gradient(to_bottom,transparent,#000_96px,#000_calc(100%-160px),transparent)]";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {/* Inner rails: the text column. */}
      <span className={rail} style={{ left: "calc(50% - var(--rail-inner) / 2)" }} />
      <span className={rail} style={{ left: "calc(50% + var(--rail-inner) / 2)" }} />
      {/* Outer rails: the mockup width. Hidden on phones, where there is no room for two pairs. */}
      <span className={cn(rail, "hidden md:block")} style={{ left: "calc(50% - var(--rail-outer) / 2)" }} />
      <span className={cn(rail, "hidden md:block")} style={{ left: "calc(50% + var(--rail-outer) / 2)" }} />
    </div>
  );
}

export function Diamond({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <span
      aria-hidden
      style={style}
      className={cn(
        "absolute z-20 size-[7px] rotate-45 bg-ember-400 shadow-[0_0_12px_2px_color-mix(in_srgb,var(--color-ember-400)_55%,transparent)]",
        className,
      )}
    />
  );
}

type RowProps = {
  children: ReactNode;
  className?: string;
  /** Draw the line on the top edge. */
  lineTop?: boolean;
  /** Draw the line on the bottom edge. */
  lineBottom?: boolean;
  /** Diamonds where the inner rails meet the top and bottom lines. */
  markers?: "top" | "bottom" | "both";
};

/** One horizontal band of the grid, as wide as the inner rails. */
export function Row({ children, className, lineTop, lineBottom, markers }: RowProps) {
  const top = markers === "top" || markers === "both";
  const bottom = markers === "bottom" || markers === "both";
  return (
    <div className="relative z-10 w-full">
      {lineTop ? <div aria-hidden className="hairline-x absolute inset-x-0 top-0" /> : null}
      {lineBottom ? <div aria-hidden className="hairline-x absolute inset-x-0 bottom-0" /> : null}
      <div
        className={cn("relative mx-auto flex w-[var(--rail-inner)] flex-col items-center justify-center", className)}
      >
        {top ? (
          <>
            <Diamond className="-left-[3.5px] -top-[3.5px]" />
            <Diamond className="-right-[3.5px] -top-[3.5px]" />
          </>
        ) : null}
        {bottom ? (
          <>
            <Diamond className="-bottom-[3.5px] -left-[3.5px]" />
            <Diamond className="-bottom-[3.5px] -right-[3.5px]" />
          </>
        ) : null}
        {children}
      </div>
    </div>
  );
}
