"use client";

import * as React from "react";
import { Check, Copy, RotateCcw, ThumbsDown, ThumbsUp } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * STREAMING ANSWER: an AI answer as it arrives
 *
 *   StreamingText   the text so far, with inline citation chips;
 *                   only newly arrived words fade in
 *   AnswerActions   copy, regenerate, feedback and a sources stack
 *   FollowUps       suggested next questions
 *
 * StreamingText renders whatever you pass it. Append to `content`
 * as your stream delivers tokens and set `streaming` while it runs.
 * ───────────────────────────────────────────────────────── */

export type AnswerCitation = { type: "citation"; label: string; href?: string };
export type AnswerSegment = string | AnswerCitation;

export interface AnswerSource {
  name: string;
  href?: string;
  /** Tailwind background class for the dot, e.g. "bg-blue-500". */
  color?: string;
}

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";
const DOTS = ["bg-blue-500", "bg-emerald-500", "bg-orange-500", "bg-violet-500"];

/* ── StreamingText ───────────────────────────────────────── */

export interface StreamingTextProps extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "content"> {
  content: AnswerSegment[];
  streaming?: boolean;
}

function CitationChip({ citation }: { citation: AnswerCitation }) {
  const className = `mx-0.5 inline-flex translate-y-[-1px] items-center gap-1 rounded-[5px] border border-border bg-muted px-1.5 py-px align-middle font-mono text-[11px] text-foreground animate-[ui-fade-up_240ms_cubic-bezier(0.23,1,0.32,1)_both] motion-reduce:animate-none ${FOCUS}`;
  const inner = (
    <>
      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
      {citation.label}
    </>
  );
  return citation.href ? (
    <a href={citation.href} target="_blank" rel="noreferrer" className={`${className} transition-colors hover:bg-accent`}>
      {inner}
    </a>
  ) : (
    <span className={className}>{inner}</span>
  );
}

export function StreamingText({ content, streaming = false, className = "", ...props }: StreamingTextProps) {
  // Words keep a stable key by position, so only words that just arrived mount and fade in.
  let word = 0;

  return (
    <p aria-busy={streaming} className={`text-[13.5px] leading-relaxed text-foreground ${className}`} {...props}>
      {content.map((segment, i) =>
        typeof segment === "string" ? (
          <React.Fragment key={`s${i}`}>
            {segment.split(/(\s+)/).map((token) =>
              token === "" ? null : /^\s+$/.test(token) ? (
                token
              ) : (
                <span key={`w${word++}`} className="animate-[ui-fade-in_420ms_ease-out_both] motion-reduce:animate-none">
                  {token}
                </span>
              )
            )}
          </React.Fragment>
        ) : (
          <CitationChip key={`c${i}`} citation={segment} />
        )
      )}
      {streaming && (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] bg-foreground animate-[ui-blink_1s_steps(2,start)_infinite] motion-reduce:animate-none"
        />
      )}
    </p>
  );
}

/* ── AnswerActions ───────────────────────────────────────── */

export interface AnswerActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Text the copy button puts on the clipboard. Hides the button when omitted. */
  copyText?: string;
  onRegenerate?: () => void;
  onFeedback?: (value: "up" | "down" | null) => void;
  sources?: AnswerSource[];
  onSourcesClick?: () => void;
}

function IconButton({ label, pressed, onClick, children }: { label: string; pressed?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className={`flex size-7 items-center justify-center rounded-md transition-colors duration-150 hover:bg-accent hover:text-foreground ${
        pressed ? "bg-accent text-foreground" : "text-muted-foreground"
      } ${FOCUS}`}
    >
      {children}
    </button>
  );
}

export function AnswerActions({ copyText, onRegenerate, onFeedback, sources, onSourcesClick, className = "", ...props }: AnswerActionsProps) {
  const [copied, setCopied] = React.useState(false);
  const [feedback, setFeedback] = React.useState<"up" | "down" | null>(null);

  React.useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
    } catch {
      // Clipboard can be blocked by the browser; nothing to undo.
    }
  };

  const rate = (value: "up" | "down") => {
    const next = feedback === value ? null : value;
    setFeedback(next);
    onFeedback?.(next);
  };

  const stack = sources && sources.length > 0 && (
    <>
      <span className="flex items-center -space-x-1.5" aria-hidden="true">
        {sources.slice(0, 3).map((s, i) => (
          <span key={s.name} className={`size-3.5 rounded-full ring-2 ring-background ${s.color ?? DOTS[i % DOTS.length]}`} />
        ))}
      </span>
      <span>
        {sources.length} {sources.length === 1 ? "source" : "sources"}
      </span>
    </>
  );

  return (
    <div className={`flex items-center justify-between gap-4 ${className}`} {...props}>
      <div className="flex items-center gap-1">
        {copyText !== undefined && (
          <IconButton label={copied ? "Copied" : "Copy answer"} onClick={copy}>
            {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
          </IconButton>
        )}
        {onRegenerate && (
          <IconButton label="Regenerate" onClick={onRegenerate}>
            <RotateCcw className="size-3.5" />
          </IconButton>
        )}
        <IconButton label="Helpful" pressed={feedback === "up"} onClick={() => rate("up")}>
          <ThumbsUp className="size-3.5" />
        </IconButton>
        <IconButton label="Not helpful" pressed={feedback === "down"} onClick={() => rate("down")}>
          <ThumbsDown className="size-3.5" />
        </IconButton>
      </div>

      {stack &&
        (onSourcesClick ? (
          <button
            type="button"
            onClick={onSourcesClick}
            className={`flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[11.5px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground ${FOCUS}`}
          >
            {stack}
          </button>
        ) : (
          <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-muted-foreground">{stack}</span>
        ))}
    </div>
  );
}

/* ── FollowUps ───────────────────────────────────────────── */

export interface FollowUpsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items: string[];
  onSelect?: (item: string) => void;
  label?: string;
}

export function FollowUps({ items, onSelect, label = "Follow-ups", className = "", ...props }: FollowUpsProps) {
  return (
    <div className={`border-t border-border pt-3 ${className}`} {...props}>
      <p className="mb-1 text-[11.5px] font-medium text-muted-foreground">{label}</p>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item}>
            <button
              type="button"
              onClick={() => onSelect?.(item)}
              className={`-mx-1.5 flex w-[calc(100%+0.75rem)] items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-[12.5px] text-foreground transition-colors duration-150 hover:bg-accent ${FOCUS}`}
            >
              <span aria-hidden="true" className="text-muted-foreground">
                ↳
              </span>
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
