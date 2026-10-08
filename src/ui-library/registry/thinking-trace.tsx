"use client";

import * as React from "react";
import { Check, ChevronDown, Globe, Search, Sparkle } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * THINKING TRACE: an expandable record of what an agent did
 *
 *   steps      a checklist: spinner on the live step, checks after
 *   reasoning  sentences of reasoning
 *   search     the query, then the sources read
 *   tools      tool calls: reads, edits with +/− counts, commands
 *
 * Drive it with your stream: pass the steps you have so far and
 * status="running"; switch to "done" when the agent finishes. It
 * opens while working, folds away once settled, and stays
 * expandable.
 * ───────────────────────────────────────────────────────── */

export type ThinkingVariant = "steps" | "reasoning" | "search" | "tools";
export type ThinkingStatus = "running" | "done";

export interface ThinkingStep {
  /** A step, a sentence of reasoning, a source title or a tool name. */
  label: string;
  /** Supporting text: a count, a domain or a file name. */
  detail?: string;
  /** Makes the row a link, e.g. a search source. */
  href?: string;
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
  /** Header once done, e.g. "Thought for 4 seconds". */
  doneLabel?: string;
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

const LABELS: Record<ThinkingVariant, [running: string, done: string]> = {
  steps: ["Thinking", "Thought it through"],
  reasoning: ["Thinking", "Thought it through"],
  search: ["Searching the web", "Searched the web"],
  tools: ["Running tools", "Ran tools"],
};

const SOURCE_TONES = ["bg-blue-600", "bg-orange-500", "bg-emerald-600", "bg-violet-600"];

function toneFor(key: string) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) | 0;
  return SOURCE_TONES[Math.abs(hash) % SOURCE_TONES.length];
}

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";
const ROW = "flex min-h-7 w-full gap-2 rounded-md px-1.5 py-0.5 text-left";

export function ThinkingTrace({
  steps,
  variant = "steps",
  status = "done",
  label,
  doneLabel,
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

  // Open while working, fold away shortly after it settles.
  React.useEffect(() => {
    if (running) {
      setAutoOpen(true);
      return;
    }
    const timer = window.setTimeout(() => setAutoOpen(false), 900);
    return () => window.clearTimeout(timer);
  }, [running]);

  const toggle = () => {
    const next = !expanded;
    if (open === undefined) setUserOpen(next);
    onOpenChange?.(next);
  };

  const [runningLabel, settledLabel] = LABELS[variant];

  return (
    <div className={`flex w-full flex-col ${className}`} {...props}>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={toggle}
        className={`-mx-1.5 flex w-fit items-center gap-2 rounded-lg px-1.5 py-1 text-[13px] font-medium transition-colors duration-100 hover:bg-accent ${FOCUS}`}
      >
        <span className={`flex shrink-0 transition-colors duration-200 ${running ? "text-foreground/70" : "text-muted-foreground"}`}>
          {icon ?? <Sparkle className="size-4" fill="currentColor" strokeWidth={0} aria-hidden="true" />}
        </span>
        <span role="status" aria-live="polite" className="whitespace-nowrap">
          {running ? (
            <span className="bg-[linear-gradient(90deg,color-mix(in_oklab,var(--muted-foreground)_55%,transparent)_35%,var(--foreground)_50%,color-mix(in_oklab,var(--muted-foreground)_55%,transparent)_65%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[ui-shimmer_1.4s_linear_infinite] motion-reduce:animate-none motion-reduce:bg-none motion-reduce:text-foreground/70">
              {label ?? runningLabel}
            </span>
          ) : (
            <span className="text-foreground/75 animate-[ui-fade-in_350ms_ease-out_both]">{doneLabel ?? settledLabel}</span>
          )}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`size-3.5 text-muted-foreground transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
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
                  {query}
                </li>
              )}

              {steps.map((step, i) => {
                const live = variant === "steps" && running && i === steps.length - 1;
                const content = (
                  <>
                    {variant === "steps" &&
                      (live ? (
                        <span
                          aria-hidden="true"
                          className="mt-[3px] size-3 shrink-0 animate-spin rounded-full border-[1.5px] border-border border-t-foreground/70 motion-reduce:animate-none"
                        />
                      ) : (
                        <Check aria-hidden="true" className="mt-px size-3.5 shrink-0 text-muted-foreground" strokeWidth={2.5} />
                      ))}
                    {variant === "search" && (
                      <span
                        aria-hidden="true"
                        className={`mt-[1.5px] flex size-3.5 shrink-0 items-center justify-center rounded-full text-white ${toneFor(step.detail ?? step.label)}`}
                      >
                        <Globe className="size-[9px]" strokeWidth={2.5} />
                      </span>
                    )}
                    <span
                      className={
                        variant === "reasoning"
                          ? "text-[12.5px] leading-relaxed text-muted-foreground"
                          : "min-w-0 truncate text-[12.5px] font-medium text-foreground"
                      }
                    >
                      {step.label}
                    </span>
                    {step.detail && (
                      <span className={`shrink-0 text-[11.5px] text-muted-foreground ${variant === "tools" ? "font-mono" : ""}`}>
                        {step.detail}
                      </span>
                    )}
                    {step.additions !== undefined && (
                      <span className="shrink-0 font-mono text-[11px] tabular-nums">
                        <span className="text-emerald-600">+{step.additions}</span>{" "}
                        <span className="text-red-500">−{step.deletions ?? 0}</span>
                      </span>
                    )}
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
                <li className="px-1.5 pt-0.5 text-xs text-muted-foreground animate-[ui-fade-in_300ms_ease-out_both] motion-reduce:animate-none">
                  +{more} more
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
