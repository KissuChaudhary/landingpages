"use client";

import * as React from "react";
import { AlertCircle, ArrowRight, Check, CircleSlash, RotateCcw } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * TASK PROGRESS: work that takes minutes, not seconds
 *
 *   running    phases fill left to right; the current one sweeps;
 *              live timer, stats and a Cancel
 *   done       "Finished in 4m 12s" and the result to open
 *   error      what went wrong, with Retry
 *   cancelled  stopped by the user
 *
 * For deep research, long builds and batch jobs. Tell people
 * they can leave; the card is what they come back to.
 * ───────────────────────────────────────────────────────── */

export type TaskProgressStatus = "running" | "done" | "error" | "cancelled";

export interface TaskStat {
  label: string;
  value: React.ReactNode;
}

export interface TaskProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: string;
  status: TaskProgressStatus;
  /** The stages, e.g. ["Searching", "Reading", "Writing"]. */
  phases: string[];
  /** Index of the current phase. */
  phase: number;
  /** Start time (ms); shows a live timer. */
  startedAt?: number;
  /** Total time (ms), if you know it once finished. */
  duration?: number;
  stats?: TaskStat[];
  /** A line under the progress, e.g. "You can close this tab. We'll keep going." */
  message?: string;
  onCancel?: () => void;
  onOpen?: () => void;
  openLabel?: string;
  errorText?: string;
  onRetry?: () => void;
}

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";
const BUTTON = `inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-[12.5px] font-medium transition-colors ${FOCUS}`;

function formatTime(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;
}

export function TaskProgress({
  title,
  status,
  phases,
  phase,
  startedAt,
  duration,
  stats,
  message,
  onCancel,
  onOpen,
  openLabel = "Open result",
  errorText,
  onRetry,
  className = "",
  ...props
}: TaskProgressProps) {
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
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [running, startedAt]);

  const elapsed = duration ?? (startedAt === undefined ? undefined : (running ? now : (endedAt ?? now)) - startedAt);
  const current = Math.min(Math.max(phase, 0), phases.length - 1);

  return (
    <div className={`w-full rounded-xl border border-border bg-background p-4 ${className}`} {...props}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="min-w-0 truncate text-[13.5px] font-medium text-foreground">{title}</p>
        {elapsed !== undefined && <span className="shrink-0 font-mono text-[11.5px] tabular-nums text-muted-foreground">{formatTime(elapsed)}</span>}
      </div>

      <div className="mt-3.5 flex gap-1" aria-hidden="true">
        {phases.map((p, i) => {
          const complete = status === "done" || i < current;
          const live = running && i === current;
          return (
            <span key={p} className={`relative h-1 flex-1 overflow-hidden rounded-full ${complete ? "bg-foreground" : "bg-border"} transition-colors duration-500`}>
              {live && (
                <span className="absolute inset-y-0 left-0 w-2/5 rounded-full bg-foreground/60 animate-[ui-scan_1.6s_cubic-bezier(0.45,0,0.55,1)_infinite] motion-reduce:animate-none" />
              )}
              {status === "error" && i === current && <span className="absolute inset-0 bg-red-500" />}
            </span>
          );
        })}
      </div>

      <div className="mt-2 flex gap-1 text-[11.5px]">
        {phases.map((p, i) => (
          <span
            key={p}
            className={`flex-1 truncate ${
              status === "error" && i === current ? "text-red-500" : (running && i === current) ? "font-medium text-foreground" : "text-muted-foreground"
            }`}
          >
            {p}
          </span>
        ))}
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {status === "done" ? `${title} finished` : status === "error" ? `${title} failed` : status === "cancelled" ? `${title} cancelled` : `${phases[current]}`}
      </p>

      {stats && stats.length > 0 && (
        <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-muted-foreground">
          {stats.map((s) => (
            <span key={s.label}>
              <span className="font-mono tabular-nums text-foreground">{s.value}</span> {s.label}
            </span>
          ))}
        </p>
      )}

      {running && message && <p className="mt-2 text-[12px] text-muted-foreground">{message}</p>}
      {status === "error" && <p className="mt-3 text-[12.5px] text-red-500">{errorText ?? "Something went wrong partway through."}</p>}

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
          {status === "done" && (
            <>
              <Check aria-hidden="true" className="size-3.5 text-emerald-600" strokeWidth={2.5} />
              Finished{elapsed !== undefined && ` in ${formatTime(elapsed)}`}
            </>
          )}
          {status === "error" && (
            <>
              <AlertCircle aria-hidden="true" className="size-3.5 text-red-500" />
              Stopped at {phases[current].toLowerCase()}
            </>
          )}
          {status === "cancelled" && (
            <>
              <CircleSlash aria-hidden="true" className="size-3.5" />
              Cancelled{elapsed !== undefined && ` after ${formatTime(elapsed)}`}
            </>
          )}
        </span>
        <span className="flex gap-2">
          {running && onCancel && (
            <button type="button" onClick={onCancel} className={`${BUTTON} border border-border text-foreground hover:bg-accent`}>
              Cancel
            </button>
          )}
          {status === "error" && onRetry && (
            <button type="button" onClick={onRetry} className={`${BUTTON} border border-border text-foreground hover:bg-accent`}>
              <RotateCcw aria-hidden="true" className="size-3" />
              Retry
            </button>
          )}
          {status === "done" && onOpen && (
            <button type="button" onClick={onOpen} className={`${BUTTON} bg-primary text-primary-foreground hover:bg-primary/90 animate-[ui-fade-in_300ms_ease-out_both]`}>
              {openLabel}
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </button>
          )}
        </span>
      </div>
    </div>
  );
}
