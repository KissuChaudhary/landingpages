"use client";

import * as React from "react";
import { AlertCircle, Ban, Check, ChevronDown, RotateCcw, Wrench } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * TOOL CALL: one tool invocation, from arguments to result
 *
 *   preparing  the model is still writing the arguments
 *   running    arguments are complete; the tool is executing
 *   done       finished, with timing; output folds open
 *   error      failed, with the message and a retry
 *   denied     the user said no
 *
 * Arguments render as readable fields; nested values as JSON.
 * Pass renderOutput to show a result your own way.
 * ───────────────────────────────────────────────────────── */

export type ToolCallStatus = "preparing" | "running" | "done" | "error" | "denied";

export interface ToolCallProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** The tool's name as the model calls it, e.g. "search_flights". */
  name: string;
  /** A human label, e.g. "Search flights". */
  title?: string;
  status: ToolCallStatus;
  /** Arguments, possibly partial while preparing. */
  input?: unknown;
  /** The result, once done. */
  output?: unknown;
  /** Render the result yourself, e.g. as a small card. */
  renderOutput?: (output: unknown) => React.ReactNode;
  errorText?: string;
  onRetry?: () => void;
  /** How long it ran (ms). */
  duration?: number;
  icon?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";
const SHIMMER =
  "bg-[linear-gradient(90deg,color-mix(in_oklab,var(--muted-foreground)_55%,transparent)_35%,var(--foreground)_50%,color-mix(in_oklab,var(--muted-foreground)_55%,transparent)_65%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[ui-shimmer_1.4s_linear_infinite] motion-reduce:animate-none motion-reduce:bg-none motion-reduce:text-foreground/70";

function formatDuration(ms: number) {
  return ms < 1000 ? `${Math.round(ms)}ms` : ms < 60000 ? `${(ms / 1000).toFixed(1)}s` : `${Math.floor(ms / 60000)}m ${Math.round((ms % 60000) / 1000)}s`;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function Value({ value }: { value: unknown }) {
  if (typeof value === "string") return <span className="break-words text-foreground">{value}</span>;
  if (typeof value === "number" || typeof value === "boolean" || value === null)
    return <span className="font-mono text-[12px] text-foreground">{String(value)}</span>;
  return <span className="break-all font-mono text-[11.5px] text-muted-foreground">{JSON.stringify(value)}</span>;
}

function Fields({ value }: { value: unknown }) {
  if (isPlainObject(value)) {
    const entries = Object.entries(value);
    if (entries.length === 0) return <p className="text-[12.5px] text-muted-foreground">No arguments</p>;
    return (
      <dl className="grid grid-cols-[minmax(0,auto)_1fr] gap-x-4 gap-y-1.5 text-[12.5px]">
        {entries.map(([key, v]) => (
          <React.Fragment key={key}>
            <dt className="truncate font-mono text-[11.5px] leading-5 text-muted-foreground">{key}</dt>
            <dd className="min-w-0 leading-5">
              <Value value={v} />
            </dd>
          </React.Fragment>
        ))}
      </dl>
    );
  }
  if (typeof value === "string") return <p className="whitespace-pre-wrap text-[12.5px] text-foreground">{value}</p>;
  return (
    <pre className="max-h-56 overflow-auto rounded-md bg-muted px-3 py-2 font-mono text-[11.5px] leading-5 text-foreground">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">{children}</p>;
}

export function ToolCall({
  name,
  title,
  status,
  input,
  output,
  renderOutput,
  errorText,
  onRetry,
  duration,
  icon,
  open,
  defaultOpen = false,
  onOpenChange,
  className = "",
  ...props
}: ToolCallProps) {
  const [ownOpen, setOwnOpen] = React.useState(defaultOpen);
  const [errorSeen, setErrorSeen] = React.useState(false);
  const panelId = React.useId();

  // Failures open themselves once, so the reason is visible without a click.
  React.useEffect(() => {
    if (status === "error" && !errorSeen) {
      setErrorSeen(true);
      if (open === undefined) setOwnOpen(true);
    }
  }, [status, errorSeen, open]);

  const expanded = open ?? ownOpen;
  const toggle = () => {
    const next = !expanded;
    if (open === undefined) setOwnOpen(next);
    onOpenChange?.(next);
  };

  const badge =
    status === "preparing" ? (
      <span className={`text-[12px] font-medium ${SHIMMER}`}>Preparing</span>
    ) : status === "running" ? (
      <span className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
        <span aria-hidden="true" className="size-3 animate-spin rounded-full border-[1.5px] border-border border-t-foreground/70 motion-reduce:animate-none" />
        Running
      </span>
    ) : status === "done" ? (
      <span className="flex items-center gap-1 text-[12px] text-muted-foreground animate-[ui-fade-in_300ms_ease-out_both]">
        <Check aria-hidden="true" className="size-3.5 text-emerald-600" strokeWidth={2.5} />
        {duration !== undefined ? formatDuration(duration) : "Done"}
      </span>
    ) : status === "error" ? (
      <span className="flex items-center gap-1 text-[12px] font-medium text-red-500 animate-[ui-fade-in_300ms_ease-out_both]">
        <AlertCircle aria-hidden="true" className="size-3.5" />
        Failed
      </span>
    ) : (
      <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
        <Ban aria-hidden="true" className="size-3.5" />
        Denied
      </span>
    );

  return (
    <div className={`overflow-hidden rounded-xl border border-border bg-background ${className}`} {...props}>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={toggle}
        className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition-colors hover:bg-accent/60 ${FOCUS}`}
      >
        <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          {icon ?? <Wrench className="size-3.5" />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-medium text-foreground">{title ?? name}</span>
          {title && <span className="block truncate font-mono text-[11px] text-muted-foreground">{name}</span>}
        </span>
        <span role="status" aria-live="polite" className="shrink-0">
          {badge}
        </span>
        <ChevronDown aria-hidden="true" className={`size-3.5 shrink-0 text-muted-foreground transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
      </button>

      <div
        id={panelId}
        inert={!expanded}
        className={`grid transition-[grid-template-rows,opacity] duration-[350ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 border-t border-border px-3 py-3">
            {input !== undefined && (
              <section>
                <Label>Input</Label>
                <Fields value={input} />
              </section>
            )}

            {status === "done" && output !== undefined && (
              <section className="animate-[ui-fade-up_300ms_cubic-bezier(0.23,1,0.32,1)_both] motion-reduce:animate-none">
                <Label>Output</Label>
                {renderOutput ? renderOutput(output) : <Fields value={output} />}
              </section>
            )}

            {status === "error" && (
              <section className="flex items-start justify-between gap-3">
                <p className="text-[12.5px] leading-5 text-red-500">{errorText ?? "The tool failed."}</p>
                {onRetry && (
                  <button
                    type="button"
                    onClick={onRetry}
                    className={`flex shrink-0 items-center gap-1.5 rounded-md border border-border px-2 py-1 text-[12px] font-medium text-foreground transition-colors hover:bg-accent ${FOCUS}`}
                  >
                    <RotateCcw aria-hidden="true" className="size-3" />
                    Retry
                  </button>
                )}
              </section>
            )}

            {status === "denied" && <p className="text-[12.5px] text-muted-foreground">You declined this action, so it didn’t run.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
