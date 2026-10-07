import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The page grid, and the only place its marks are drawn.
 *
 * The page is one Frame: two thin vertical rules. Sections sit between them, separated by Dividers.
 * A mark appears only where lines really meet, and there are two kinds:
 *
 *   plus      a full + (9px). Where a divider meets the frame edge, and where an inner column rule
 *             crosses a divider.
 *   tee-down  a half +, the T-junction. Where an inner column rule STARTS on a divider (its top arm is gone).
 *   tee-up    the same, where an inner column rule ENDS on a divider (its bottom arm is gone).
 *
 * Marks are never decoration. If a mark has no line to join, it should not exist.
 */

export type MarkKind = "plus" | "tee-down" | "tee-up";

export function Mark({ kind = "plus", className, style }: { kind?: MarkKind; className?: string; style?: CSSProperties }) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute z-20 block size-[9px] -translate-x-1/2 -translate-y-1/2", className)}
      style={style}
    >
      <span className="absolute inset-x-0 top-1/2 h-px bg-mark" />
      {kind !== "tee-down" ? <span className="absolute left-1/2 top-0 h-1/2 w-px bg-mark" /> : null}
      {kind !== "tee-up" ? <span className="absolute bottom-0 left-1/2 h-1/2 w-px bg-mark" /> : null}
    </span>
  );
}

/** The page frame: every section lives between its two vertical rules. */
export function Frame({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-[var(--frame)] border-x border-line", className)}>{children}</div>;
}

type DividerMark = { at: number; kind: MarkKind };

/**
 * A horizontal rule across the frame.
 *  edges  draws a + where the rule meets each side of the frame (on by default).
 *  marks  draws marks at inner column rules, `at` being a percentage from the left. They only show from the
 *         breakpoint `from` upward, because below it the columns stack and there is no rule to join.
 */
export function Divider({
  edges = true,
  marks = [],
  from = "lg",
  className,
}: {
  edges?: boolean;
  marks?: DividerMark[];
  from?: "md" | "lg";
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("relative h-px w-full bg-line", className)}>
      {edges ? (
        <>
          <Mark className="left-0 top-1/2" />
          <Mark className="left-full top-1/2" />
        </>
      ) : null}
      {marks.map((mark) => (
        <Mark
          key={`${mark.kind}-${mark.at}`}
          kind={mark.kind}
          className={cn("top-1/2", from === "lg" ? "max-lg:hidden" : "max-md:hidden")}
          style={{ left: `${mark.at}%` }}
        />
      ))}
    </div>
  );
}
