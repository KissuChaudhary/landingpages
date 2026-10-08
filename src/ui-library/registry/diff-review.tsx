"use client";

import * as React from "react";
import { Check, X } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * DIFF REVIEW: accept or reject what the AI changed
 *
 *   pending   the change inline: removed words struck in red,
 *             added words in green; Reject and Accept
 *   accepted  shows the new text; Undo
 *   rejected  keeps the original; Undo
 *
 * Give it before and after; it works out the difference by word
 * (prose) or by line (code). Accept or reject one at a time, or
 * all at once. Works controlled or on its own; onComplete fires
 * when nothing is left to review.
 * ───────────────────────────────────────────────────────── */

export type ChangeDecision = "pending" | "accepted" | "rejected";

export interface DiffChange {
  id: string;
  before: string;
  after: string;
  /** Where it is, e.g. "Paragraph 2" or a file name. */
  label?: string;
}

export interface DiffReviewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  changes: DiffChange[];
  /** Compare word by word (prose) or line by line (code). */
  mode?: "words" | "lines";
  decisions?: Record<string, ChangeDecision>;
  defaultDecisions?: Record<string, ChangeDecision>;
  /** Every decision after a change (one call for Accept all). */
  onDecisionsChange?: (decisions: Record<string, ChangeDecision>) => void;
  onDecisionChange?: (id: string, decision: ChangeDecision) => void;
  /** Called when the last pending change gets a decision. */
  onComplete?: (decisions: Record<string, ChangeDecision>) => void;
  /** Show the decisions without Undo, e.g. once they've been sent. */
  readOnly?: boolean;
  title?: string;
}

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";
const SMALL = `inline-flex h-7 items-center gap-1 rounded-md px-2 text-[12px] font-medium transition-colors ${FOCUS}`;

type Op = { kind: "same" | "add" | "remove"; text: string };

/** Longest-common-subsequence diff over tokens; falls back to a full replace for very large inputs. */
function diff(a: string[], b: string[]): Op[] {
  if (a.length * b.length > 250_000) {
    return [...a.map((text) => ({ kind: "remove" as const, text })), ...b.map((text) => ({ kind: "add" as const, text }))];
  }
  const dp = Array.from({ length: a.length + 1 }, () => new Uint32Array(b.length + 1));
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const ops: Op[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      ops.push({ kind: "same", text: a[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) ops.push({ kind: "remove", text: a[i++] });
    else ops.push({ kind: "add", text: b[j++] });
  }
  while (i < a.length) ops.push({ kind: "remove", text: a[i++] });
  while (j < b.length) ops.push({ kind: "add", text: b[j++] });
  return ops;
}

type Run = { kind: "same"; tokens: string[] } | { kind: "change"; removed: string[]; added: string[] };

/** Group ops into unchanged runs and change runs (everything removed, then everything added). */
function toRuns(ops: Op[]): Run[] {
  const runs: Run[] = [];
  for (const op of ops) {
    const last = runs[runs.length - 1];
    if (op.kind === "same") {
      if (last?.kind === "same") last.tokens.push(op.text);
      else runs.push({ kind: "same", tokens: [op.text] });
    } else {
      let run = last;
      if (run?.kind !== "change") {
        run = { kind: "change", removed: [], added: [] };
        runs.push(run);
      }
      (op.kind === "remove" ? run.removed : run.added).push(op.text);
    }
  }
  return runs;
}

/** Fold short unchanged bits ("to", a space) between two changes into them, so a rewrite reads as one phrase. */
function absorbSmall(runs: Run[]): Run[] {
  const out: Run[] = [];
  for (let i = 0; i < runs.length; i++) {
    const run = runs[i];
    const prev = out[out.length - 1];
    const next = runs[i + 1];
    if (run.kind === "same" && prev?.kind === "change" && next?.kind === "change" && run.tokens.join("").trim().length <= 3) {
      prev.removed.push(...run.tokens, ...next.removed);
      prev.added.push(...run.tokens, ...next.added);
      i++;
    } else if (run.kind === "change" && prev?.kind === "change") {
      prev.removed.push(...run.removed);
      prev.added.push(...run.added);
    } else out.push(run.kind === "same" ? { kind: "same", tokens: [...run.tokens] } : { kind: "change", removed: [...run.removed], added: [...run.added] });
  }
  return out;
}

const words = (s: string) => s.split(/(\s+|[.,;:!?()"“”])/).filter(Boolean);
const lines = (s: string) => s.split("\n");

function InlineDiff({ before, after }: { before: string; after: string }) {
  const runs = React.useMemo(() => absorbSmall(toRuns(diff(words(before), words(after)))), [before, after]);
  return (
    <p className="text-[13.5px] leading-relaxed text-foreground">
      {runs.map((run, i) =>
        run.kind === "same" ? (
          <React.Fragment key={i}>{run.tokens.join("")}</React.Fragment>
        ) : (
          <React.Fragment key={i}>
            {run.removed.length > 0 && (
              <del className="rounded-[3px] bg-red-500/10 text-red-600 decoration-red-500/50 dark:text-red-400 [&+ins]:ml-0.5">{run.removed.join("")}</del>
            )}
            {run.added.length > 0 && (
              <ins className="rounded-[3px] bg-emerald-500/15 text-emerald-700 no-underline dark:text-emerald-400">{run.added.join("")}</ins>
            )}
          </React.Fragment>
        )
      )}
    </p>
  );
}

function LineDiff({ before, after }: { before: string; after: string }) {
  const ops = React.useMemo(
    () =>
      toRuns(diff(lines(before), lines(after))).flatMap((run): Op[] =>
        run.kind === "same"
          ? run.tokens.map((text) => ({ kind: "same", text }))
          : [...run.removed.map((text) => ({ kind: "remove" as const, text })), ...run.added.map((text) => ({ kind: "add" as const, text }))]
      ),
    [before, after]
  );
  return (
    <pre className="overflow-x-auto font-mono text-[12px] leading-5">
      {ops.map((op, i) => (
        <span
          key={i}
          className={`flex ${op.kind === "add" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : op.kind === "remove" ? "bg-red-500/10 text-red-600 dark:text-red-400" : "text-foreground"}`}
        >
          <span aria-hidden="true" className="w-5 shrink-0 select-none pl-1.5 text-muted-foreground">
            {op.kind === "add" ? "+" : op.kind === "remove" ? "−" : " "}
          </span>
          <span className="pr-3">{op.text || " "}</span>
          <span className="sr-only">{op.kind === "add" ? " (added)" : op.kind === "remove" ? " (removed)" : ""}</span>
        </span>
      ))}
    </pre>
  );
}

export function DiffReview({
  changes,
  mode = "words",
  decisions,
  defaultDecisions = {},
  onDecisionsChange,
  onDecisionChange,
  onComplete,
  readOnly = false,
  title = "Suggested changes",
  className = "",
  ...props
}: DiffReviewProps) {
  const [own, setOwn] = React.useState<Record<string, ChangeDecision>>(defaultDecisions);
  const current = decisions ?? own;
  const decisionOf = (id: string) => current[id] ?? "pending";

  const commit = (ids: string[], decision: ChangeDecision) => {
    const next = { ...current, ...Object.fromEntries(ids.map((id) => [id, decision])) };
    if (decisions === undefined) setOwn(next);
    onDecisionsChange?.(next);
    ids.forEach((id) => onDecisionChange?.(id, decision));
    if (decision !== "pending" && changes.every((c) => (next[c.id] ?? "pending") !== "pending")) onComplete?.(next);
  };
  const decide = (id: string, decision: ChangeDecision) => commit([id], decision);
  const decideAll = (decision: ChangeDecision) =>
    commit(changes.filter((c) => decisionOf(c.id) === "pending").map((c) => c.id), decision);

  const pending = changes.filter((c) => decisionOf(c.id) === "pending").length;
  const accepted = changes.filter((c) => decisionOf(c.id) === "accepted").length;

  return (
    <div className={`w-full ${className}`} {...props}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[13px] font-medium text-foreground">
          {title}{" "}
          <span role="status" aria-live="polite" className="font-normal text-muted-foreground">
            {pending > 0 ? `${pending} to review` : `${accepted} of ${changes.length} accepted`}
          </span>
        </p>
        {pending > 1 && !readOnly && (
          <span className="flex gap-1">
            <button type="button" onClick={() => decideAll("rejected")} className={`${SMALL} text-muted-foreground hover:bg-accent hover:text-foreground`}>
              Reject all
            </button>
            <button type="button" onClick={() => decideAll("accepted")} className={`${SMALL} bg-primary text-primary-foreground hover:bg-primary/90`}>
              Accept all
            </button>
          </span>
        )}
      </div>

      <ul className="flex flex-col gap-2">
        {changes.map((change) => {
          const decision = decisionOf(change.id);
          return (
            <li key={change.id} className={`overflow-hidden rounded-xl border transition-colors ${decision === "pending" ? "border-border" : "border-border/60"}`}>
              <div className="flex items-center justify-between gap-3 border-b border-border/60 px-3 py-1.5">
                <span className="truncate text-[11.5px] text-muted-foreground">{change.label ?? "Change"}</span>
                {decision === "pending" ? (
                  !readOnly && (
                    <span className="flex shrink-0 gap-1">
                      <button type="button" aria-label={`Reject ${change.label ?? "change"}`} onClick={() => decide(change.id, "rejected")} className={`${SMALL} text-muted-foreground hover:bg-accent hover:text-foreground`}>
                        <X aria-hidden="true" className="size-3.5" />
                        Reject
                      </button>
                      <button type="button" aria-label={`Accept ${change.label ?? "change"}`} onClick={() => decide(change.id, "accepted")} className={`${SMALL} text-foreground hover:bg-accent`}>
                        <Check aria-hidden="true" className="size-3.5" />
                        Accept
                      </button>
                    </span>
                  )
                ) : (
                  <span className="flex shrink-0 items-center gap-2 text-[12px] animate-[ui-fade-in_250ms_ease-out_both]">
                    <span className={decision === "accepted" ? "text-emerald-600" : "text-muted-foreground"}>{decision === "accepted" ? "Accepted" : "Rejected"}</span>
                    {!readOnly && (
                      <button type="button" onClick={() => decide(change.id, "pending")} className={`rounded font-medium text-foreground underline decoration-border underline-offset-2 hover:decoration-foreground ${FOCUS}`}>
                        Undo
                      </button>
                    )}
                  </span>
                )}
              </div>
              <div className={mode === "lines" ? "py-2" : "px-3 py-2.5"}>
                {decision === "pending" ? (
                  mode === "lines" ? <LineDiff before={change.before} after={change.after} /> : <InlineDiff before={change.before} after={change.after} />
                ) : (
                  <div key={decision} className="animate-[ui-fade-in_250ms_ease-out_both]">
                    {mode === "lines" ? (
                      <pre className={`overflow-x-auto px-3 font-mono text-[12px] leading-5 ${decision === "rejected" ? "text-muted-foreground" : "text-foreground"}`}>
                        {decision === "accepted" ? change.after : change.before}
                      </pre>
                    ) : (
                      <p className={`text-[13.5px] leading-relaxed ${decision === "rejected" ? "text-muted-foreground" : "text-foreground"}`}>
                        {decision === "accepted" ? change.after : change.before}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
