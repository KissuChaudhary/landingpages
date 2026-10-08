"use client";

import * as React from "react";
import { Check, ChevronRight, Square, X } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * COMMAND OUTPUT: a command the agent runs, and its log
 *
 *   running    $ pnpm test, a live timer and Stop; the log
 *              streams in and follows the newest line
 *   success    a check and the time it took; the log folds
 *              away a beat later (open it any time)
 *   error      exit code in red; the log stays open with the
 *              failing lines marked and scrolled into view
 *   cancelled  stopped by you
 *
 * Pass the lines as they arrive; plain strings work, ANSI
 * colour codes are stripped, and lines that look like errors
 * are marked (or set level yourself).
 * ───────────────────────────────────────────────────────── */

export type CommandStatus = "running" | "success" | "error" | "cancelled";

export interface CommandLine {
  text: string;
  level?: "info" | "error" | "warn" | "success";
}

export interface CommandOutputProps extends React.HTMLAttributes<HTMLDivElement> {
  command: string;
  status: CommandStatus;
  lines: (string | CommandLine)[];
  exitCode?: number;
  /** When it started (ms); shows a live timer, then the duration. */
  startedAt?: number;
  endedAt?: number;
  onStop?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const EASE = "cubic-bezier(0.23,1,0.32,1)";
const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";
const ANSI = /\u001b\[[0-9;]*[A-Za-z]/g;
const LOOKS_LIKE_ERROR = /(^|\s)(error|err!|failed|fail|fatal|exception|✗|✕|×)(\s|:|$)/i;

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const useReducedMotion = () =>
  React.useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => false);

function duration(ms: number) {
  const s = Math.max(0, ms) / 1000;
  if (s < 10) return `${s.toFixed(1)}s`;
  if (s < 60) return `${Math.round(s)}s`;
  return `${Math.floor(s / 60)}m ${Math.round(s % 60)}s`;
}

function clock(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function CommandOutput({
  command,
  status,
  lines,
  exitCode,
  startedAt,
  endedAt,
  onStop,
  open: openProp,
  onOpenChange,
  className = "",
  ...props
}: CommandOutputProps) {
  const reduced = useReducedMotion();
  const running = status === "running";
  const [now, setNow] = React.useState(startedAt ?? 0);
  const [userOpen, setUserOpen] = React.useState<boolean | null>(null);
  const [settled, setSettled] = React.useState(status === "success");
  const logRef = React.useRef<HTMLDivElement>(null);
  const firstError = React.useRef<HTMLDivElement | null>(null);
  const follow = React.useRef(true);
  const id = React.useId();

  const rows = React.useMemo(
    () =>
      lines.map((line) => {
        const l = typeof line === "string" ? { text: line } : line;
        const text = l.text.replace(ANSI, "");
        return { text, level: l.level ?? (LOOKS_LIKE_ERROR.test(text) ? "error" : "info") };
      }),
    [lines]
  );

  // Success folds the log a beat after the last line, so the end is seen before it goes.
  React.useEffect(() => {
    if (status !== "success") {
      setSettled(false);
      return;
    }
    const timer = window.setTimeout(() => setSettled(true), reduced ? 0 : 900);
    return () => window.clearTimeout(timer);
  }, [status, reduced]);

  const open = openProp ?? userOpen ?? !(status === "success" ? settled : status === "cancelled");
  const toggle = () => {
    setUserOpen(!open);
    onOpenChange?.(!open);
  };

  React.useEffect(() => {
    if (!running || startedAt === undefined) return;
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [running, startedAt]);

  // Follow the newest line while running, unless the reader scrolled up.
  React.useLayoutEffect(() => {
    const log = logRef.current;
    if (log && follow.current) log.scrollTop = log.scrollHeight;
  }, [rows.length]);

  // On failure, bring the first failing line into view.
  React.useEffect(() => {
    if (status !== "error") return;
    const log = logRef.current;
    const line = firstError.current;
    if (log && line) log.scrollTo({ top: Math.max(0, line.offsetTop - 16), behavior: reduced ? "auto" : "smooth" });
  }, [status, reduced]);

  const elapsed = startedAt === undefined ? null : running ? clock(now - startedAt) : endedAt !== undefined ? duration(endedAt - startedAt) : null;
  let errorSeen = false;

  return (
    <div className={`w-full rounded-[18px] bg-background p-1 shadow-[0_0_0_1px_var(--border)] ${className}`} {...props}>
      <div className="flex h-9 items-center gap-2.5 pl-2.5 pr-1">
        <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center">
          {running ? (
            <span className="size-3 animate-spin rounded-full border-[1.5px] border-border border-t-foreground/70 motion-reduce:animate-none" />
          ) : status === "success" ? (
            <span className="flex size-4 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 animate-[ui-pop-in_220ms_ease-out_both] dark:text-emerald-400">
              <Check className="size-2.5" strokeWidth={3} />
            </span>
          ) : status === "error" ? (
            <span className="flex size-4 items-center justify-center rounded-full bg-red-500/15 text-red-600 animate-[ui-pop-in_220ms_ease-out_both] dark:text-red-400">
              <X className="size-2.5" strokeWidth={3} />
            </span>
          ) : (
            <span className="flex size-4 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Square className="size-2" fill="currentColor" />
            </span>
          )}
        </span>

        <code className="min-w-0 flex-1 truncate font-mono text-[12.5px] text-foreground">
          <span className="select-none text-muted-foreground">$ </span>
          {command}
        </code>

        <span className="flex shrink-0 items-center gap-2 font-mono text-[11.5px] tabular-nums text-muted-foreground">
          {status === "error" && exitCode !== undefined && <span className="text-red-600 dark:text-red-400">exit {exitCode}</span>}
          {status === "cancelled" && <span>stopped</span>}
          {elapsed && <span>{elapsed}</span>}
          <span role="status" className="sr-only">
            {running ? "Running" : status === "success" ? "Finished" : status === "error" ? `Failed${exitCode !== undefined ? ` with exit code ${exitCode}` : ""}` : "Stopped"}
          </span>
        </span>

        {running && onStop && (
          <button
            type="button"
            onClick={onStop}
            aria-label="Stop command"
            className={`flex h-7 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground ${FOCUS}`}
          >
            <Square className="size-2.5" fill="currentColor" />
            Stop
          </button>
        )}
        {!running && rows.length > 0 && (
          <button
            type="button"
            aria-expanded={open}
            aria-controls={id}
            aria-label={open ? "Hide output" : "Show output"}
            onClick={toggle}
            className={`flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground ${FOCUS}`}
          >
            <ChevronRight
              className="size-3.5 transition-transform duration-300"
              style={{ transform: open ? "rotate(90deg)" : "none", transitionTimingFunction: EASE }}
            />
          </button>
        )}
      </div>

      <div
        id={id}
        inert={!open}
        className="grid"
        style={{ gridTemplateRows: open && rows.length ? "1fr" : "0fr", transition: reduced ? "none" : `grid-template-rows 420ms ${EASE}` }}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            ref={logRef}
            role="log"
            aria-label={`Output of ${command}`}
            tabIndex={0}
            onScroll={(e) => {
              const el = e.currentTarget;
              follow.current = el.scrollHeight - el.clientHeight - el.scrollTop < 24;
            }}
            className="max-h-56 overflow-y-auto overflow-x-hidden rounded-[14px] bg-muted/70 py-2.5 font-mono text-[11.5px] leading-[1.65] outline-none [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/30"
          >
            {rows.map((row, i) => {
              const isError = row.level === "error";
              const ref = isError && !errorSeen ? ((errorSeen = true), firstError) : undefined;
              return (
                <div
                  key={i}
                  ref={ref}
                  className={`whitespace-pre-wrap break-words px-3 animate-[ui-fade-in_160ms_ease-out_both] motion-reduce:animate-none ${
                    isError
                      ? "bg-red-500/[0.08] text-red-700 dark:text-red-300"
                      : row.level === "warn"
                        ? "text-amber-700 dark:text-amber-300"
                        : row.level === "success"
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-foreground/75"
                  }`}
                >
                  {row.text || " "}
                </div>
              );
            })}
            {running && (
              <div aria-hidden="true" className="px-3">
                <span className="inline-block h-3.5 w-[7px] translate-y-[2px] bg-foreground/60 animate-[ui-blink_1s_steps(1)_infinite]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
