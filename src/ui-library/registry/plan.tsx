"use client";

import * as React from "react";
import { ChevronDown, ListChecks, X } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * PLAN: an agent's checklist, ticking itself off
 *
 *   pending   not started
 *   running   being worked on now
 *   done      finished; the check draws itself in
 *   skipped   no longer needed
 *   failed    couldn't be done, with the reason underneath
 *
 * A hairline under the header fills as tasks finish. When every
 * task is settled the plan folds into a one-line summary.
 * ───────────────────────────────────────────────────────── */

export type PlanTaskStatus = "pending" | "running" | "done" | "skipped" | "failed";

export interface PlanTask {
  id?: string;
  label: string;
  /** A note under the task, e.g. why it failed or what it produced. */
  detail?: string;
  status: PlanTaskStatus;
}

export interface PlanProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  tasks: PlanTask[];
  title?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Fold into the summary once every task is settled. */
  collapseWhenDone?: boolean;
}

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";
const STATUS_TEXT: Record<PlanTaskStatus, string> = {
  pending: "Not started",
  running: "In progress",
  done: "Done",
  skipped: "Skipped",
  failed: "Failed",
};

function Mark({ status }: { status: PlanTaskStatus }) {
  if (status === "running")
    return (
      <span
        aria-hidden="true"
        className="size-3.5 shrink-0 animate-spin rounded-full border-[1.5px] border-border border-t-foreground motion-reduce:animate-none"
      />
    );
  if (status === "done")
    return (
      <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 shrink-0">
        <circle cx="8" cy="8" r="8" className="fill-foreground" />
        <path
          d="M4.8 8.3l2.1 2.1 4.3-4.6"
          fill="none"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="24"
          className="stroke-background animate-[ui-draw_450ms_cubic-bezier(0.23,1,0.32,1)_both] motion-reduce:animate-none"
        />
      </svg>
    );
  if (status === "failed")
    return (
      <span aria-hidden="true" className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
        <X className="size-2.5" strokeWidth={3} />
      </span>
    );
  if (status === "skipped")
    return (
      <span aria-hidden="true" className="flex size-3.5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-border">
        <span className="h-[1.5px] w-1.5 rounded-full bg-muted-foreground" />
      </span>
    );
  return <span aria-hidden="true" className="size-3.5 shrink-0 rounded-full border-[1.5px] border-border" />;
}

export function Plan({
  tasks,
  title = "Plan",
  open,
  defaultOpen = true,
  onOpenChange,
  collapseWhenDone = true,
  className = "",
  ...props
}: PlanProps) {
  const [ownOpen, setOwnOpen] = React.useState(defaultOpen);
  const [touched, setTouched] = React.useState(false);
  const panelId = React.useId();

  const done = tasks.filter((t) => t.status === "done").length;
  const settled = tasks.length > 0 && tasks.every((t) => t.status === "done" || t.status === "skipped" || t.status === "failed");
  const failed = tasks.some((t) => t.status === "failed");
  const expanded = open ?? ownOpen;

  // Fold away once everything is settled, unless the user has taken control or something failed.
  React.useEffect(() => {
    if (!collapseWhenDone || open !== undefined || touched || !settled || failed) return;
    const timer = window.setTimeout(() => setOwnOpen(false), 1200);
    return () => window.clearTimeout(timer);
  }, [collapseWhenDone, open, touched, settled, failed]);

  const toggle = () => {
    const next = !expanded;
    setTouched(true);
    if (open === undefined) setOwnOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div className={`w-full ${className}`} {...props}>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={toggle}
        className={`-mx-1.5 flex w-[calc(100%+0.75rem)] items-center gap-2 rounded-lg px-1.5 py-1 text-left transition-colors hover:bg-accent ${FOCUS}`}
      >
        <ListChecks aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
        <span className="text-[13px] font-medium text-foreground">{title}</span>
        <span role="status" aria-live="polite" className="ml-auto font-mono text-[11.5px] tabular-nums text-muted-foreground">
          {settled ? `${done} of ${tasks.length} done` : `${done} of ${tasks.length}`}
        </span>
        <ChevronDown aria-hidden="true" className={`size-3.5 shrink-0 text-muted-foreground transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
      </button>

      <div aria-hidden="true" className="mt-1.5 h-px w-full overflow-hidden bg-border">
        <div
          className="h-full bg-foreground transition-[width] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ width: `${tasks.length ? (done / tasks.length) * 100 : 0}%` }}
        />
      </div>

      <div
        id={panelId}
        inert={!expanded}
        className={`grid transition-[grid-template-rows,opacity] duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <ol aria-label={title} className="flex flex-col gap-0.5 pt-2.5">
            {tasks.map((task, i) => {
              const quiet = task.status === "done" || task.status === "skipped";
              return (
                <li key={task.id ?? `${i}-${task.label}`} className="flex gap-2.5 py-1">
                  <span className="mt-[3px] flex">
                    <Mark status={task.status} />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block text-[13px] leading-5 transition-colors duration-300 ${
                        task.status === "running"
                          ? "font-medium text-foreground"
                          : quiet
                            ? "text-muted-foreground line-through decoration-border"
                            : "text-foreground"
                      }`}
                    >
                      {task.label}
                      <span className="sr-only">, {STATUS_TEXT[task.status]}</span>
                    </span>
                    {task.detail && (
                      <span
                        className={`mt-0.5 block text-[12px] leading-5 animate-[ui-fade-in_300ms_ease-out_both] ${
                          task.status === "failed" ? "text-red-500" : "text-muted-foreground"
                        }`}
                      >
                        {task.detail}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
