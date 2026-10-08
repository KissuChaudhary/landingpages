"use client";

import * as React from "react";
import { Ban, Check, Clock, ShieldQuestion } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * APPROVAL CARD: the agent asks before it acts
 *
 *   pending   what it wants to do, with Approve and Deny
 *   approved  folds into one confirming line
 *   denied    folds into one line; the agent moves on
 *   expired   the request timed out
 *
 * Works controlled (pass status) or on its own (it remembers
 * the choice). Mark destructive actions so Approve reads as such.
 * ───────────────────────────────────────────────────────── */

export type ApprovalStatus = "pending" | "approved" | "denied" | "expired";

export interface ApprovalDetail {
  label: string;
  value: React.ReactNode;
}

export interface ApprovalCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** What the agent wants to do, e.g. "Send email to 3 people". */
  title: string;
  description?: string;
  /** The specifics worth checking before approving. */
  details?: ApprovalDetail[];
  /** Why approval is needed, e.g. AI SDK's approval.requestReason. */
  reason?: string;
  status?: ApprovalStatus;
  defaultStatus?: ApprovalStatus;
  onApprove?: () => void;
  onDeny?: () => void;
  approveLabel?: string;
  denyLabel?: string;
  /** Styles Approve as a destructive action. */
  destructive?: boolean;
  /** When the request lapses (ms). Shows a countdown, then expires. */
  expiresAt?: number;
  onExpire?: () => void;
}

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

function formatLeft(ms: number) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function ApprovalCard({
  title,
  description,
  details,
  reason,
  status,
  defaultStatus = "pending",
  onApprove,
  onDeny,
  approveLabel = "Approve",
  denyLabel = "Deny",
  destructive = false,
  expiresAt,
  onExpire,
  className = "",
  ...props
}: ApprovalCardProps) {
  const [ownStatus, setOwnStatus] = React.useState<ApprovalStatus>(defaultStatus);
  const current = status ?? ownStatus;
  const [now, setNow] = React.useState(expiresAt ?? 0);

  // Count down while pending; expire on time.
  React.useEffect(() => {
    if (current !== "pending" || expiresAt === undefined) return;
    const tick = () => {
      const t = Date.now();
      setNow(t);
      if (t >= expiresAt) {
        if (status === undefined) setOwnStatus("expired");
        onExpire?.();
      }
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [current, expiresAt, status, onExpire]);

  const decide = (next: "approved" | "denied") => {
    if (status === undefined) setOwnStatus(next);
    if (next === "approved") onApprove?.();
    else onDeny?.();
  };

  if (current !== "pending") {
    const meta =
      current === "approved"
        ? { icon: <Check className="size-3.5 text-emerald-600" strokeWidth={2.5} />, text: "Approved" }
        : current === "denied"
          ? { icon: <Ban className="size-3.5 text-muted-foreground" />, text: "Denied" }
          : { icon: <Clock className="size-3.5 text-muted-foreground" />, text: "Expired" };
    return (
      <div
        role="status"
        className={`flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] animate-[ui-fade-in_300ms_ease-out_both] ${className}`}
        {...props}
      >
        <span aria-hidden="true" className="flex shrink-0">
          {meta.icon}
        </span>
        <span className="shrink-0 font-medium text-foreground">{meta.text}</span>
        <span className="min-w-0 truncate text-muted-foreground">{title}</span>
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={`Approval needed: ${title}`}
      className={`rounded-xl border border-border bg-background p-4 animate-[ui-fade-up_320ms_cubic-bezier(0.23,1,0.32,1)_both] motion-reduce:animate-none ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between gap-3 text-[12px] font-medium text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <ShieldQuestion aria-hidden="true" className="size-3.5" />
          Needs your approval
        </span>
        {expiresAt !== undefined && <span className="font-mono tabular-nums">{formatLeft(expiresAt - now)}</span>}
      </div>

      <p className="mt-2 text-[14px] font-medium leading-snug text-foreground">{title}</p>
      {description && <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{description}</p>}

      {details && details.length > 0 && (
        <dl className="mt-3 grid grid-cols-[minmax(0,auto)_1fr] gap-x-4 gap-y-1.5 rounded-lg bg-muted px-3 py-2.5 text-[12.5px]">
          {details.map((d) => (
            <React.Fragment key={d.label}>
              <dt className="text-muted-foreground">{d.label}</dt>
              <dd className="min-w-0 break-words text-foreground">{d.value}</dd>
            </React.Fragment>
          ))}
        </dl>
      )}

      {reason && <p className="mt-2.5 text-[12px] leading-relaxed text-muted-foreground">{reason}</p>}

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => decide("denied")}
          className={`h-8 rounded-lg border border-border px-3 text-[12.5px] font-medium text-foreground transition-colors hover:bg-accent ${FOCUS}`}
        >
          {denyLabel}
        </button>
        <button
          type="button"
          onClick={() => decide("approved")}
          className={`h-8 rounded-lg px-3.5 text-[12.5px] font-medium transition-[background-color,transform] active:scale-[0.98] ${FOCUS} ${
            destructive ? "bg-red-600 text-white hover:bg-red-700" : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {approveLabel}
        </button>
      </div>
    </div>
  );
}
