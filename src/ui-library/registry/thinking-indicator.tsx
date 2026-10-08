"use client";

import * as React from "react";
import { Check } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * THINKING INDICATOR: the gap before the first token
 *
 *   orbit  a dot circling a hairline ring
 *   dots   three dots in a soft wave
 *   pulse  a breathing dot
 *   scan   a bar sweeping a short track
 *
 * A shimmering label and a live timer ("Churning 44.9s") while
 * running; settles to "Done in 12.4s" with a check.
 * ───────────────────────────────────────────────────────── */

export type IndicatorVariant = "orbit" | "dots" | "pulse" | "scan";

export interface ThinkingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: IndicatorVariant;
  status?: "running" | "done";
  label?: string;
  doneLabel?: string;
  /** Start time (ms); shows a live timer. */
  startedAt?: number;
}

const SHIMMER =
  "bg-[linear-gradient(90deg,color-mix(in_oklab,var(--muted-foreground)_55%,transparent)_35%,var(--foreground)_50%,color-mix(in_oklab,var(--muted-foreground)_55%,transparent)_65%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[ui-shimmer_1.4s_linear_infinite] motion-reduce:animate-none motion-reduce:bg-none motion-reduce:text-foreground/70";

function formatElapsed(ms: number) {
  const s = Math.max(0, ms) / 1000;
  return s < 60 ? `${s.toFixed(1)}s` : `${Math.floor(s / 60)}m ${String(Math.floor(s % 60)).padStart(2, "0")}s`;
}

function Mark({ variant }: { variant: IndicatorVariant }) {
  if (variant === "dots")
    return (
      <span aria-hidden="true" className="flex h-4 items-center gap-[3px]">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="size-1 rounded-full bg-foreground animate-[ui-bounce_1.2s_ease-in-out_infinite] motion-reduce:animate-none"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </span>
    );
  if (variant === "pulse")
    return (
      <span aria-hidden="true" className="flex size-4 items-center justify-center">
        <span className="size-2.5 rounded-full bg-foreground animate-[ui-breathe_1.6s_ease-in-out_infinite] motion-reduce:animate-none" />
      </span>
    );
  if (variant === "scan")
    return (
      <span aria-hidden="true" className="flex h-4 items-center">
        <span className="relative h-[3px] w-6 overflow-hidden rounded-full bg-border">
          <span className="absolute inset-y-0 left-0 w-2/5 rounded-full bg-foreground animate-[ui-scan_1.1s_cubic-bezier(0.45,0,0.55,1)_infinite] motion-reduce:animate-none" />
        </span>
      </span>
    );
  return (
    <span aria-hidden="true" className="relative flex size-4 items-center justify-center">
      <span className="absolute inset-[1.5px] rounded-full border border-border" />
      <span className="absolute inset-0 animate-spin [animation-duration:1.4s] motion-reduce:animate-none">
        <span className="absolute left-1/2 top-0 size-[5px] -translate-x-1/2 rounded-full bg-foreground" />
      </span>
    </span>
  );
}

export function ThinkingIndicator({
  variant = "orbit",
  status = "running",
  label = "Thinking",
  doneLabel,
  startedAt,
  className = "",
  ...props
}: ThinkingIndicatorProps) {
  const running = status === "running";
  const [now, setNow] = React.useState(startedAt ?? 0);
  const [endedAt, setEndedAt] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    if (!running) {
      setEndedAt((prev) => prev ?? Date.now());
      return;
    }
    setEndedAt(undefined);
    if (startedAt === undefined) return;
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 100);
    return () => window.clearInterval(timer);
  }, [running, startedAt]);

  const elapsed = startedAt === undefined ? undefined : (running ? now : (endedAt ?? now)) - startedAt;

  return (
    <div role="status" aria-live="polite" className={`inline-flex items-center gap-2.5 text-[13px] ${className}`} {...props}>
      {running ? (
        <Mark variant={variant} />
      ) : (
        <Check aria-hidden="true" className="size-4 text-muted-foreground animate-[ui-fade-in_300ms_ease-out_both]" strokeWidth={2.5} />
      )}
      {running ? (
        <span className={`font-medium ${SHIMMER}`}>{label}</span>
      ) : (
        <span className="font-medium text-foreground/75 animate-[ui-fade-in_300ms_ease-out_both]">
          {doneLabel ?? (elapsed !== undefined ? `Done in ${formatElapsed(elapsed)}` : "Done")}
        </span>
      )}
      {running && elapsed !== undefined && (
        <span aria-hidden="true" className="font-mono text-[11.5px] tabular-nums text-muted-foreground">
          {formatElapsed(elapsed)}
        </span>
      )}
    </div>
  );
}
