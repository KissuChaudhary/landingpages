"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * RESPONSE VERSIONS: "2 / 3" between regenerated answers
 *
 * Wrap the current version's content; the arrows step between
 * versions and the content slides in from the side it came from.
 * Regenerate adds a version and shows a spinner while it's made.
 * ───────────────────────────────────────────────────────── */

export interface ResponseVersionsProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
  /** Zero-based index of the version shown. */
  index: number;
  onIndexChange: (index: number) => void;
  onRegenerate?: () => void;
  regenerating?: boolean;
  /** The current version's content. */
  children: React.ReactNode;
}

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";
const ICON = `flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-35 ${FOCUS}`;

export function ResponseVersions({ count, index, onIndexChange, onRegenerate, regenerating = false, children, className = "", ...props }: ResponseVersionsProps) {
  const previous = React.useRef(index);
  const direction = index >= previous.current ? 1 : -1;
  React.useEffect(() => {
    previous.current = index;
  }, [index]);

  return (
    <div className={className} {...props}>
      <div
        key={index}
        className={`motion-reduce:animate-none ${
          direction > 0
            ? "animate-[ui-slide-from-right_320ms_cubic-bezier(0.23,1,0.32,1)_both]"
            : "animate-[ui-slide-from-left_320ms_cubic-bezier(0.23,1,0.32,1)_both]"
        }`}
      >
        {children}
      </div>

      <div className="mt-3 flex items-center gap-1">
        <button type="button" aria-label="Previous version" disabled={index <= 0} onClick={() => onIndexChange(index - 1)} className={ICON}>
          <ChevronLeft className="size-4" />
        </button>
        <span aria-live="polite" className="min-w-[3.25rem] text-center font-mono text-[11.5px] tabular-nums text-muted-foreground">
          <span className="sr-only">Version </span>
          {index + 1} / {count}
        </span>
        <button type="button" aria-label="Next version" disabled={index >= count - 1} onClick={() => onIndexChange(index + 1)} className={ICON}>
          <ChevronRight className="size-4" />
        </button>
        {onRegenerate && (
          <button type="button" aria-label={regenerating ? "Regenerating" : "Regenerate"} disabled={regenerating} onClick={onRegenerate} className={`${ICON} ml-1`}>
            {regenerating ? (
              <span aria-hidden="true" className="size-3.5 animate-spin rounded-full border-[1.5px] border-border border-t-foreground/70 motion-reduce:animate-none" />
            ) : (
              <RotateCcw className="size-3.5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
