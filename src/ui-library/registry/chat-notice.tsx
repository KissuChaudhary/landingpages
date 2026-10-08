"use client";

import * as React from "react";
import { AlertCircle, Hourglass, Layers, RotateCcw, WifiOff } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * CHAT NOTICE: the moments an AI app has to say no
 *
 *   error       the answer failed; retry
 *   offline     no connection; reconnecting
 *   rate-limit  out of messages; counts down to the reset
 *   context     the chat is too long; start fresh with a summary
 *
 * Calm, inline and specific: what happened, what happens next,
 * and the one action that helps. Technical details fold away.
 * ───────────────────────────────────────────────────────── */

export type ChatNoticeKind = "error" | "offline" | "rate-limit" | "context";

export interface ChatNoticeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  kind: ChatNoticeKind;
  title?: string;
  description?: string;
  /** Rate limit: when sending is allowed again (ms). Shows a live countdown. */
  resetAt?: number;
  onReset?: () => void;
  onRetry?: () => void;
  /** Shows a spinner on Retry, or "Reconnecting" when offline. */
  retrying?: boolean;
  onUpgrade?: () => void;
  upgradeLabel?: string;
  /** Context: start a new chat carrying a summary of this one. */
  onSummarize?: () => void;
  onNewChat?: () => void;
  /** Technical details, e.g. an error message or request ID. */
  details?: string;
}

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";
const BUTTON = `inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[12px] font-medium transition-colors ${FOCUS}`;
const SECONDARY = `${BUTTON} border border-border text-foreground hover:bg-accent`;
const PRIMARY = `${BUTTON} bg-primary text-primary-foreground hover:bg-primary/90`;

function formatLeft(ms: number) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  if (s >= 3600) return `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m`;
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function useCountdown(resetAt: number | undefined, onReset?: () => void) {
  const [now, setNow] = React.useState(resetAt ?? 0);
  const fired = React.useRef(false);
  React.useEffect(() => {
    if (resetAt === undefined) return;
    fired.current = false;
    const tick = () => {
      const t = Date.now();
      setNow(t);
      if (t >= resetAt && !fired.current) {
        fired.current = true;
        onReset?.();
      }
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [resetAt, onReset]);
  return resetAt === undefined ? undefined : Math.max(0, resetAt - now);
}

export function ChatNotice({
  kind,
  title,
  description,
  resetAt,
  onReset,
  onRetry,
  retrying = false,
  onUpgrade,
  upgradeLabel = "Upgrade",
  onSummarize,
  onNewChat,
  details,
  className = "",
  ...props
}: ChatNoticeProps) {
  const left = useCountdown(kind === "rate-limit" ? resetAt : undefined, onReset);
  const ready = left === 0;

  const preset = {
    error: {
      icon: <AlertCircle className="size-4 text-red-500" />,
      title: "Something went wrong",
      description: "The answer didn’t finish. Your message is safe.",
    },
    offline: {
      icon: <WifiOff className="size-4 text-muted-foreground" />,
      title: "You’re offline",
      description: "We’ll pick up where you left off when your connection is back.",
    },
    "rate-limit": {
      icon: <Hourglass className="size-4 text-amber-500" />,
      title: ready ? "You can send messages again" : "You’ve reached your limit",
      description: ready ? "Your limit has reset." : left !== undefined ? `It resets in ${formatLeft(left)}.` : "It resets soon.",
    },
    context: {
      icon: <Layers className="size-4 text-muted-foreground" />,
      title: "This chat is getting long",
      description: "Earlier messages may be forgotten. Start fresh with a summary to keep answers sharp.",
    },
  }[kind];

  const spinner = (
    <span aria-hidden="true" className="size-3 animate-spin rounded-full border-[1.5px] border-current/30 border-t-current motion-reduce:animate-none" />
  );

  return (
    <div
      role={kind === "error" ? "alert" : "status"}
      className={`flex flex-col gap-3 rounded-xl border border-border bg-background px-3.5 py-3 animate-[ui-fade-up_320ms_cubic-bezier(0.23,1,0.32,1)_both] motion-reduce:animate-none sm:flex-row sm:items-start ${className}`}
      {...props}
    >
      <div className="flex min-w-0 flex-1 gap-3">
        <span aria-hidden="true" className="mt-px flex shrink-0">
          {preset.icon}
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-medium leading-5 text-foreground">{title ?? preset.title}</p>
          <p className="text-[12.5px] leading-5 text-muted-foreground">
            {description ?? preset.description}
            {kind === "offline" && retrying && (
              <span className="ml-1.5 inline-flex items-center gap-1.5 text-foreground/70">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-amber-500 animate-[ui-breathe_1.4s_ease-in-out_infinite] motion-reduce:animate-none" />
                Reconnecting
              </span>
            )}
          </p>
          {details && (
            <details className="group mt-1.5">
              <summary className={`w-fit cursor-pointer list-none rounded text-[11.5px] text-muted-foreground hover:text-foreground [&::-webkit-details-marker]:hidden ${FOCUS}`}>
                <span className="group-open:hidden">Show details</span>
                <span className="hidden group-open:inline">Hide details</span>
              </summary>
              <p className="mt-1 break-all font-mono text-[11px] leading-5 text-muted-foreground">{details}</p>
            </details>
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2 pl-7 sm:pl-0">
        {(kind === "error" || kind === "offline") && onRetry && (
          <button type="button" onClick={onRetry} disabled={retrying} className={`${SECONDARY} disabled:opacity-60`}>
            {retrying ? spinner : <RotateCcw aria-hidden="true" className="size-3" />}
            {kind === "offline" ? "Try now" : "Retry"}
          </button>
        )}
        {kind === "rate-limit" && onUpgrade && !ready && (
          <button type="button" onClick={onUpgrade} className={PRIMARY}>
            {upgradeLabel}
          </button>
        )}
        {kind === "context" && onNewChat && (
          <button type="button" onClick={onNewChat} className={SECONDARY}>
            New chat
          </button>
        )}
        {kind === "context" && onSummarize && (
          <button type="button" onClick={onSummarize} className={PRIMARY}>
            Continue with summary
          </button>
        )}
      </div>
    </div>
  );
}
