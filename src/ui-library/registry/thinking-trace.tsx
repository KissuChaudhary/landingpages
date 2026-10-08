"use client";

import * as React from "react";
import { AlertCircle, Check, ChevronDown, CircleSlash, Globe, Search, Sparkle, X } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * THINKING TRACE: an expandable record of what an agent did
 *
 *   steps      a checklist: spinner on the live step, checks after
 *   reasoning  sentences of reasoning
 *   search     the query, then the sources read
 *   tools      tool calls: reads, edits with +/− counts, commands
 *
 * Drive it from your stream: pass the steps you have so far and a
 * status. It opens while running, folds away once done (stays open
 * on error so the failure is visible), and can always be reopened.
 * ───────────────────────────────────────────────────────── */

export type ThinkingVariant = "steps" | "reasoning" | "search" | "tools";
export type ThinkingStatus = "running" | "done" | "error" | "cancelled";
export type ThinkingStepStatus = "pending" | "running" | "done" | "error";

export interface ThinkingStep {
  /** A step, a sentence of reasoning, a source title or a tool name. */
  label: string;
  /** Supporting text: a count, a domain or a file path. */
  detail?: string;
  /** Makes the row a link, e.g. a search source. */
  href?: string;
  /** Replaces the row's default mark, e.g. a site favicon. */
  icon?: React.ReactNode;
  /** Defaults to "running" for the last step while running, "done" otherwise. */
  status?: ThinkingStepStatus;
  /** Lines added and removed, for edit tool calls. */
  additions?: number;
  deletions?: number;
}

export interface ThinkingTraceProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  steps: ThinkingStep[];
  variant?: ThinkingVariant;
  status?: ThinkingStatus;
  /** Header while running. Defaults per variant, e.g. "Searching the web". */
  label?: string;
  /** Header once settled. Defaults to e.g. "Thought for 6s" when timing is known. */
  doneLabel?: string;
  /** When the work started (ms). Shows a live timer and times the done label. */
  startedAt?: number;
  /** How long it took (ms), if your stream reports it. */
  duration?: number;
  /** The search query, shown above the sources. */
  query?: string;
  /** Items not listed, shown as "+N more". */
  more?: number;
  /** Replaces the sparkle in the header. */
  icon?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Makes rows without an href clickable, e.g. to show a tool's output. */
  onStepClick?: (step: ThinkingStep, index: number) => void;
}

const RUNNING_LABEL: Record<ThinkingVariant, string> = {
  steps: "Thinking",
  reasoning: "Thinking",
  search: "Searching the web",
  tools: "Running tools",
};

const SOURCE_TONES = ["bg-blue-600", "bg-orange-500", "bg-emerald-600", "bg-violet-600"];
const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";
const ROW = "flex min-h-7 w-full gap-2 rounded-md px-1.5 py-0.5 text-left";
const SHIMMER =
  "bg-[linear-gradient(90deg,color-mix(in_oklab,var(--muted-foreground)_55%,transparent)_35%,var(--foreground)_50%,color-mix(in_oklab,var(--muted-foreground)_55%,transparent)_65%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[ui-shimmer_1.4s_linear_infinite] motion-reduce:animate-none motion-reduce:bg-none motion-reduce:text-foreground/70";

function toneFor(key: string) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) | 0;
  return SOURCE_TONES[Math.abs(hash) % SOURCE_TONES.length];
}

function formatDuration(ms: number) {
  const s = Math.max(0, Math.round(ms / 1000));
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-3 shrink-0 animate-spin rounded-full border-[1.5px] border-border border-t-foreground/70 motion-reduce:animate-none"
    />
  );
}

export function ThinkingTrace({
  steps,
  variant = "steps",
  status = "done",
  label,
  doneLabel,
  startedAt,
  duration,
  query,
  more,
  icon,
  open,
  defaultOpen,
  onOpenChange,
  onStepClick,
  className = "",
  ...props
}: ThinkingTraceProps) {
  const running = status === "running";
  const [autoOpen, setAutoOpen] = React.useState(running);
  const [userOpen, setUserOpen] = React.useState<boolean | undefined>(defaultOpen);
  const expanded = open ?? userOpen ?? autoOpen;
  const panelId = React.useId();
  // Rows present on first render stagger in; rows streamed in later appear as they arrive.
  const initialCount = React.useRef(steps.length);

  // Live timer while running; remember when it settled so the done label can say how long it took.
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

  // Open while working; fold away after it settles, except on error so the failure stays visible.
  React.useEffect(() => {
    if (running || status === "error") {
      setAutoOpen(true);
      return;
    }
    const timer = window.setTimeout(() => setAutoOpen(false), 900);
    return () => window.clearTimeout(timer);
  }, [running, status]);

  const toggle = () => {
    const next = !expanded;
    if (open === undefined) setUserOpen(next);
    onOpenChange?.(next);
  };

  const took = duration ?? (startedAt !== undefined && endedAt !== undefined ? endedAt - startedAt : undefined);
  const settledLabel =
    status === "error"
      ? "Couldn’t finish"
      : status === "cancelled"
        ? "Stopped"
        : variant === "search"
          ? "Searched the web"
          : variant === "tools"
            ? `Ran ${steps.length} ${steps.length === 1 ? "tool" : "tools"}`
            : took !== undefined
              ? `Thought for ${formatDuration(took)}`
              : "Thought it through";

  const headerIcon =
    icon ??
    (status === "error" ? (
      <AlertCircle className="size-4 text-red-500" aria-hidden="true" />
    ) : status === "cancelled" ? (
      <CircleSlash className="size-4" aria-hidden="true" />
    ) : (
      <Sparkle className="size-4" fill="currentColor" strokeWidth={0} aria-hidden="true" />
    ));

  return (
    <div className={`flex w-full flex-col ${className}`} {...props}>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={toggle}
        className={`-mx-1.5 flex w-fit max-w-full items-center gap-2 rounded-lg px-1.5 py-1 text-[13px] font-medium transition-colors duration-100 hover:bg-accent ${FOCUS}`}
      >
        <span className={`flex shrink-0 transition-colors duration-200 ${running ? "text-foreground/70" : "text-muted-foreground"}`}>{headerIcon}</span>
        <span role="status" aria-live="polite" className="truncate">
          {running ? (
            <span className={SHIMMER}>{label ?? RUNNING_LABEL[variant]}</span>
          ) : (
            <span className="text-foreground/75 animate-[ui-fade-in_350ms_ease-out_both]">{doneLabel ?? settledLabel}</span>
          )}
        </span>
        {running && startedAt !== undefined && (
          <span className="font-mono text-[11.5px] font-normal tabular-nums text-muted-foreground">{formatDuration(now - startedAt)}</span>
        )}
        <ChevronDown
          aria-hidden="true"
          className={`size-3.5 shrink-0 text-muted-foreground transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      <div
        id={panelId}
        inert={!expanded}
        className={`grid transition-[grid-template-rows,opacity] duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="relative ml-[5px] mt-1 pl-4">
            <span aria-hidden="true" className="absolute bottom-1.5 left-[3px] top-0 w-px bg-border" />
            <ul className="flex flex-col gap-0.5 py-1">
              {query && (
                <li className="flex h-7 items-center gap-2 px-1.5 text-[12.5px] text-muted-foreground animate-[ui-fade-up_300ms_cubic-bezier(0.23,1,0.32,1)_both] motion-reduce:animate-none">
                  <Search className="size-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">{query}</span>
                </li>
              )}

              {steps.map((step, i) => {
                const last = i === steps.length - 1;
                const stepStatus: ThinkingStepStatus =
                  step.status ?? (last && running ? "running" : last && status === "error" ? "error" : "done");
                const failed = stepStatus === "error";
                const pending = stepStatus === "pending";

                const mark =
                  variant === "steps" ? (
                    stepStatus === "running" ? (
                      <span className="mt-[3px]">
                        <Spinner />
                      </span>
                    ) : failed ? (
                      <X aria-hidden="true" className="mt-px size-3.5 shrink-0 text-red-500" strokeWidth={2.5} />
                    ) : pending ? (
                      <span aria-hidden="true" className="mt-[3px] size-3 shrink-0 rounded-full border-[1.5px] border-border" />
                    ) : (
                      <Check aria-hidden="true" className="mt-px size-3.5 shrink-0 text-muted-foreground" strokeWidth={2.5} />
                    )
                  ) : variant === "search" ? (
                    step.icon ? (
                      <span aria-hidden="true" className="flex size-3.5 shrink-0 items-center justify-center overflow-hidden rounded-full">
                        {step.icon}
                      </span>
                    ) : (
                      <span
                        aria-hidden="true"
                        className={`flex size-3.5 shrink-0 items-center justify-center rounded-full text-white ${failed ? "bg-muted-foreground/40" : toneFor(step.detail ?? step.label)}`}
                      >
                        <Globe className="size-[9px]" strokeWidth={2.5} />
                      </span>
                    )
                  ) : null;

                const trailing =
                  variant === "search" || variant === "tools" ? (
                    stepStatus === "running" ? (
                      <span className="ml-auto pl-2">
                        <Spinner />
                      </span>
                    ) : failed ? (
                      <span className="ml-auto shrink-0 pl-2 text-[11.5px] font-medium text-red-500">Failed</span>
                    ) : null
                  ) : null;

                const content = (
                  <>
                    {mark}
                    {variant === "tools" ? (
                      <>
                        <span className={`shrink-0 text-[12.5px] font-medium ${pending ? "text-muted-foreground" : "text-foreground"}`}>{step.label}</span>
                        {step.detail && <span className="min-w-0 truncate font-mono text-[11.5px] text-muted-foreground">{step.detail}</span>}
                      </>
                    ) : (
                      <>
                        <span
                          className={
                            variant === "reasoning"
                              ? "text-[12.5px] leading-relaxed text-muted-foreground"
                              : `min-w-0 truncate text-[12.5px] font-medium ${pending ? "text-muted-foreground" : "text-foreground"}`
                          }
                        >
                          {step.label}
                        </span>
                        {step.detail && <span className="shrink-0 text-[11.5px] text-muted-foreground">{step.detail}</span>}
                      </>
                    )}
                    {step.additions !== undefined && (
                      <span className="shrink-0 font-mono text-[11px] tabular-nums">
                        <span className="text-emerald-600">+{step.additions}</span> <span className="text-red-500">−{step.deletions ?? 0}</span>
                      </span>
                    )}
                    {trailing}
                  </>
                );
                const align = variant === "reasoning" ? "items-start" : "items-center";
                const delay = i < initialCount.current ? i * 90 : 0;

                return (
                  <li
                    key={`${i}-${step.label}`}
                    className="animate-[ui-fade-up_320ms_cubic-bezier(0.23,1,0.32,1)_both] motion-reduce:animate-none"
                    style={{ animationDelay: `${delay}ms` }}
                  >
                    {step.href ? (
                      <a href={step.href} target="_blank" rel="noreferrer" className={`${ROW} ${align} transition-colors duration-150 hover:bg-accent ${FOCUS}`}>
                        {content}
                      </a>
                    ) : onStepClick ? (
                      <button
                        type="button"
                        onClick={() => onStepClick(step, i)}
                        className={`${ROW} ${align} cursor-pointer transition-colors duration-150 hover:bg-accent ${FOCUS}`}
                      >
                        {content}
                      </button>
                    ) : (
                      <div className={`${ROW} ${align}`}>{content}</div>
                    )}
                  </li>
                );
              })}

              {more ? (
                <li className="px-1.5 pt-0.5 text-xs text-muted-foreground animate-[ui-fade-in_300ms_ease-out_both] motion-reduce:animate-none">+{more} more</li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
