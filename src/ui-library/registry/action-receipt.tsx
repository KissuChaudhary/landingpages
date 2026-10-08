"use client";

import * as React from "react";
import { Check, ChevronRight, RotateCcw, X } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * ACTION RECEIPTS: what the agent did, and the way back
 *
 *   done      a quiet line per action: what happened, where;
 *             Undo with a ring that drains while you still can
 *   undoing   a spinner in place of Undo
 *   undone    the line is struck through: "Undone"
 *   failed    why it failed, and Retry
 *   stacked   three or more fold into "3 actions · Undo all",
 *             which opens into the list
 *
 * Feed it the actions your tools performed; it keeps the timing.
 * ───────────────────────────────────────────────────────── */

export type ReceiptStatus = "done" | "undoing" | "undone" | "failed";

export interface Receipt {
  id: string;
  /** What happened, e.g. "Added “Soft launch” to Saturday". */
  title: string;
  /** Where or when, e.g. "Calendar · 9:00 am". */
  detail?: string;
  icon?: React.ReactNode;
  status?: ReceiptStatus;
  error?: string;
  /** Until when it can be undone (ms timestamp). Without it, no Undo. */
  undoUntil?: number;
}

export interface ActionReceiptsProps extends React.HTMLAttributes<HTMLDivElement> {
  actions: Receipt[];
  onUndo?: (id: string) => void | Promise<void>;
  /** Defaults to undoing each undoable action. */
  onUndoAll?: () => void | Promise<void>;
  onRetry?: (id: string) => void;
  /** Fold into a summary from this many actions (0 never folds). */
  stackFrom?: number;
  /** How long the undo window is, for the ring (ms). */
  undoWindow?: number;
}

const EASE = "cubic-bezier(0.23,1,0.32,1)";
const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";
const LINK = `inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium text-foreground transition-colors hover:bg-accent ${FOCUS}`;

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const useReducedMotion = () =>
  React.useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => false);

/** Re-renders when the next undo window closes, so Undo disappears on time. */
function useUndoClock(actions: Receipt[]) {
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    const next = actions.map((a) => a.undoUntil ?? 0).filter((t) => t > now).sort((a, b) => a - b)[0];
    if (!next) return;
    const timer = window.setTimeout(() => setNow(Date.now()), next - now + 20);
    return () => window.clearTimeout(timer);
  }, [actions, now]);
  return now;
}

/** A ring that drains from full to empty over the time left, with CSS only. */
function DrainRing({ until, window: total, reduced }: { until: number; window: number; reduced: boolean }) {
  const [start] = React.useState(() => Date.now());
  const left = Math.max(0, until - start);
  const elapsed = Math.max(0, total - left);
  const c = 2 * Math.PI * 5.5;
  return (
    <svg aria-hidden="true" viewBox="0 0 14 14" className="size-3.5 -rotate-90">
      <circle cx="7" cy="7" r="5.5" fill="none" strokeWidth="1.5" className="stroke-border" />
      <circle
        cx="7"
        cy="7"
        r="5.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray={c}
        className="stroke-foreground/70"
        style={
          reduced
            ? { strokeDashoffset: c * (elapsed / total) }
            : ({
                "--ui-ring": `${c}`,
                animation: `ui-drain ${total}ms linear -${elapsed}ms forwards`,
              } as React.CSSProperties)
        }
      />
    </svg>
  );
}

function Line({
  action,
  now,
  pending,
  undoWindow,
  reduced,
  onUndo,
  onRetry,
}: {
  action: Receipt;
  now: number;
  pending: boolean;
  undoWindow: number;
  reduced: boolean;
  onUndo?: (id: string) => void;
  onRetry?: (id: string) => void;
}) {
  const status = pending ? "undoing" : action.status ?? "done";
  const canUndo = status === "done" && Boolean(onUndo) && (action.undoUntil ?? 0) > now;
  const undone = status === "undone";
  const failed = status === "failed";

  return (
    <li className="flex min-h-10 items-center gap-2.5 py-1 animate-[ui-fade-up_320ms_cubic-bezier(0.23,1,0.32,1)_both] motion-reduce:animate-none">
      <span
        aria-hidden="true"
        className={`flex size-6 shrink-0 items-center justify-center rounded-full [&_svg]:size-3.5 [&_svg]:stroke-[1.8] ${
          failed ? "bg-red-500/10 text-red-600 dark:text-red-400" : "bg-muted text-muted-foreground"
        }`}
      >
        {failed ? <X /> : action.icon ?? <Check />}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={`block truncate text-[13px] transition-colors duration-300 ${undone ? "text-muted-foreground line-through decoration-muted-foreground/50" : "text-foreground"}`}
        >
          {action.title}
        </span>
        {(failed ? action.error : action.detail) && (
          <span className={`block truncate text-[11.5px] ${failed ? "text-red-600 dark:text-red-400" : "text-muted-foreground"}`}>
            {failed ? action.error : action.detail}
          </span>
        )}
      </span>

      <span role="status" className="sr-only">
        {status === "undoing" ? `Undoing ${action.title}` : undone ? `Undone: ${action.title}` : failed ? `Failed: ${action.error ?? action.title}` : ""}
      </span>
      <span className="flex shrink-0 items-center">
        {status === "undoing" ? (
          <span className="inline-flex h-7 items-center gap-1.5 px-2.5 text-[12px] text-muted-foreground">
            <span aria-hidden="true" className="size-3 animate-spin rounded-full border-[1.5px] border-border border-t-foreground/70 motion-reduce:animate-none" />
            Undoing
          </span>
        ) : undone ? (
          <span className="inline-flex h-7 items-center gap-1.5 px-2.5 text-[12px] text-muted-foreground animate-[ui-fade-in_240ms_ease-out_both]">
            <RotateCcw aria-hidden="true" className="size-3" />
            Undone
          </span>
        ) : failed && onRetry ? (
          <button type="button" onClick={() => onRetry(action.id)} className={LINK}>
            <RotateCcw aria-hidden="true" className="size-3" />
            Retry
          </button>
        ) : canUndo ? (
          <button type="button" onClick={() => onUndo?.(action.id)} aria-label={`Undo: ${action.title}`} className={LINK}>
            <DrainRing until={action.undoUntil ?? 0} window={undoWindow} reduced={reduced} />
            Undo
          </button>
        ) : null}
      </span>
    </li>
  );
}

export function ActionReceipts({
  actions,
  onUndo,
  onUndoAll,
  onRetry,
  stackFrom = 3,
  undoWindow = 10_000,
  className = "",
  ...props
}: ActionReceiptsProps) {
  const reduced = useReducedMotion();
  const now = useUndoClock(actions);
  const [pending, setPending] = React.useState<Set<string>>(() => new Set());
  const [open, setOpen] = React.useState(false);
  const listId = React.useId();

  const undo = async (id: string) => {
    if (!onUndo) return;
    setPending((p) => new Set(p).add(id));
    try {
      await onUndo(id);
    } finally {
      setPending((p) => {
        const next = new Set(p);
        next.delete(id);
        return next;
      });
    }
  };

  const undoable = actions.filter((a) => (a.status ?? "done") === "done" && (a.undoUntil ?? 0) > now && !pending.has(a.id));
  const undoAll = async () => {
    if (onUndoAll) {
      setPending(new Set(undoable.map((a) => a.id)));
      try {
        await onUndoAll();
      } finally {
        setPending(new Set());
      }
    } else await Promise.all(undoable.map((a) => undo(a.id)));
  };

  const stacked = stackFrom > 0 && actions.length >= stackFrom;
  const failed = actions.filter((a) => a.status === "failed").length;
  const undone = actions.filter((a) => a.status === "undone").length;
  const busy = pending.size > 0;

  const lines = (
    <ul aria-label="Actions taken">
      {actions.map((a) => (
        <Line key={a.id} action={a} now={now} pending={pending.has(a.id)} undoWindow={undoWindow} reduced={reduced} onUndo={onUndo ? undo : undefined} onRetry={onRetry} />
      ))}
    </ul>
  );

  if (!stacked) {
    return (
      <div className={`w-full ${className}`} {...props}>
        {lines}
      </div>
    );
  }

  const summary = [
    `${actions.length} actions`,
    failed ? `${failed} failed` : null,
    undone ? `${undone} undone` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className={`w-full ${className}`} {...props}>
      <div className="flex min-h-10 items-center gap-2.5">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((o) => !o)}
          className="group flex min-w-0 flex-1 items-center gap-2.5 rounded-lg py-1 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <span aria-hidden="true" className="flex shrink-0 items-center">
            {actions.slice(0, 3).map((a, i) => (
              <span
                key={a.id}
                className={`flex size-6 items-center justify-center rounded-full ring-2 ring-background [&_svg]:size-3.5 [&_svg]:stroke-[1.8] ${i ? "-ml-2" : ""} ${
                  a.status === "failed" ? "bg-red-500/10 text-red-600 dark:text-red-400" : "bg-muted text-muted-foreground"
                }`}
                style={{ zIndex: 3 - i }}
              >
                {a.status === "failed" ? <X /> : a.icon ?? <Check />}
              </span>
            ))}
          </span>
          <span className="truncate text-[13px] text-foreground">{summary}</span>
          <ChevronRight
            aria-hidden="true"
            className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:text-foreground"
            style={{ transform: open ? "rotate(90deg)" : "none", transitionTimingFunction: EASE }}
          />
        </button>
        {onUndo && undoable.length > 1 && (
          <button type="button" onClick={undoAll} disabled={busy} className={`${LINK} disabled:opacity-50`}>
            <RotateCcw aria-hidden="true" className="size-3" />
            Undo all
          </button>
        )}
      </div>
      <div
        id={listId}
        inert={!open}
        className="grid"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", transition: reduced ? "none" : `grid-template-rows 380ms ${EASE}` }}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="ml-3 border-l border-border pl-[18px]">{lines}</div>
        </div>
      </div>
    </div>
  );
}
