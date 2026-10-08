"use client";

import * as React from "react";
import { ArrowUp, Check } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * CLARIFYING QUESTION: the agent pauses to ask
 *
 *   asking    the question and its options; press 1–9 or click
 *   other     "Something else" turns into a field in place
 *   multiple  options toggle, then Continue
 *   answered  the card folds into one line: question · answer
 *   skipped   "Skipped · the agent will decide"
 *
 * Pair it with a client-side tool that has no execute: render it
 * for the tool's input and send the answer back as the output.
 * ───────────────────────────────────────────────────────── */

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
}

export interface QuestionAnswer {
  ids: string[];
  labels: string[];
  /** What they typed under "Something else". */
  other?: string;
}

export interface ClarifyingQuestionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  question: string;
  detail?: string;
  options: QuestionOption[];
  /** Allow several answers, confirmed with Continue. */
  multiple?: boolean;
  /** Offer "Something else" with a field. */
  allowOther?: boolean;
  otherLabel?: string;
  /** The answer once given, e.g. the tool's output; shows the folded line. */
  answer?: QuestionAnswer | null;
  onAnswer: (answer: QuestionAnswer) => void;
  /** Shows Skip; the agent continues with its own choice. */
  onSkip?: () => void;
  skipped?: boolean;
  skippedText?: string;
  autoFocus?: boolean;
}

const OTHER = "__other__";
const EASE = "cubic-bezier(0.23,1,0.32,1)";
const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const useReducedMotion = () =>
  React.useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => false);

export function ClarifyingQuestion({
  question,
  detail,
  options,
  multiple = false,
  allowOther = true,
  otherLabel = "Something else",
  answer,
  onAnswer,
  onSkip,
  skipped = false,
  skippedText = "the agent will decide",
  autoFocus = false,
  className = "",
  ...props
}: ClarifyingQuestionProps) {
  const id = React.useId();
  const reduced = useReducedMotion();
  const [own, setOwn] = React.useState<QuestionAnswer | null>(null);
  const [ownSkipped, setOwnSkipped] = React.useState(false);
  const [picked, setPicked] = React.useState<string[]>([]);
  const [otherOpen, setOtherOpen] = React.useState(false);
  const [otherText, setOtherText] = React.useState("");
  const [active, setActive] = React.useState(0);
  const [highlight, setHighlight] = React.useState({ top: 0, height: 0, ready: false });

  const surfaceRef = React.useRef<HTMLDivElement>(null);
  const rowRefs = React.useRef<(HTMLButtonElement | HTMLDivElement | null)[]>([]);
  const otherRef = React.useRef<HTMLInputElement>(null);
  const fromHeight = React.useRef<number | null>(null);

  const final = answer ?? own;
  const isSkipped = skipped || ownSkipped;
  const done = Boolean(final) || isSkipped;
  const rows = allowOther ? [...options, { id: OTHER, label: otherLabel }] : options;

  // Fold the card into its one-line receipt (and back, if the answer is cleared).
  const fold = () => (fromHeight.current = surfaceRef.current?.offsetHeight ?? null);
  React.useLayoutEffect(() => {
    const el = surfaceRef.current;
    const from = fromHeight.current;
    fromHeight.current = null;
    if (!el || from === null || reduced) return;
    el.animate([{ height: `${from}px` }, { height: `${el.offsetHeight}px` }], { duration: 420, easing: EASE });
  }, [done, reduced]);

  React.useEffect(() => {
    if (autoFocus && !done) (rowRefs.current[0] as HTMLElement | null)?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (otherOpen) otherRef.current?.focus({ preventScroll: true });
  }, [otherOpen]);

  // Digits also answer when nothing else has focus (never while typing in a field).
  const chooseRef = React.useRef<(i: number) => void>(() => {});
  React.useEffect(() => {
    if (done) return;
    const onKey = (e: KeyboardEvent) => {
      const focused = document.activeElement;
      if ((focused && focused !== document.body) || e.metaKey || e.ctrlKey || e.altKey || !/^[1-9]$/.test(e.key)) return;
      if (Number(e.key) > rows.length) return;
      e.preventDefault();
      chooseRef.current(Number(e.key) - 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [done, rows.length]);

  // The highlight slides to the active row and takes its height.
  React.useLayoutEffect(() => {
    const row = rowRefs.current[active];
    if (!row || done) return;
    const top = row.offsetTop;
    const height = row.offsetHeight;
    setHighlight((h) => (h.top === top && h.height === height && h.ready ? h : { top, height, ready: h.height > 0 }));
  }, [active, otherOpen, done, rows.length]);

  const submit = (picks: string[], other?: string) => {
    const order = (x: string) => options.findIndex((o) => o.id === x);
    const ids = [...picks].sort((a, b) => order(a) - order(b));
    const next: QuestionAnswer = {
      ids,
      labels: ids.map((i) => options.find((o) => o.id === i)?.label ?? i),
      ...(other ? { other } : {}),
    };
    fold();
    if (answer === undefined) setOwn(next);
    onAnswer(next);
  };

  const skip = () => {
    fold();
    setOwnSkipped(true);
    onSkip?.();
  };

  const choose = (i: number) => {
    const row = rows[i];
    if (!row) return;
    setActive(i);
    if (row.id === OTHER) {
      setOtherOpen((o) => (multiple ? !o : true));
      return;
    }
    if (multiple) setPicked((p) => (p.includes(row.id) ? p.filter((x) => x !== row.id) : [...p, row.id]));
    else submit([row.id]);
  };

  React.useLayoutEffect(() => {
    chooseRef.current = choose;
  });

  const submitOther = () => {
    const text = otherText.trim();
    if (!text) return;
    if (multiple) submit(picked, text);
    else submit([], text);
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement) return;
    if (/^[1-9]$/.test(e.key) && Number(e.key) <= rows.length) {
      e.preventDefault();
      choose(Number(e.key) - 1);
      (rowRefs.current[Number(e.key) - 1] as HTMLElement | null)?.focus();
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = (active + (e.key === "ArrowDown" ? 1 : -1) + rows.length) % rows.length;
      setActive(next);
      (rowRefs.current[next] as HTMLElement | null)?.focus();
    }
  };

  const summary = final ? [...final.labels, final.other].filter(Boolean).join(", ") : "";
  const canContinue = picked.length > 0 || (otherOpen && otherText.trim().length > 0);

  return (
    <div
      ref={surfaceRef}
      className={`overflow-hidden rounded-[20px] bg-background shadow-[0_0_0_1px_var(--border),0_8px_24px_-18px_rgba(0,0,0,0.25)] ${className}`}
      {...props}
    >
      {done ? (
        <div role="status" className="flex min-h-11 items-center gap-2.5 px-3.5 py-2.5 text-[13px] animate-[ui-fade-in_260ms_ease-out_120ms_both] motion-reduce:animate-none">
          <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Check className="size-2.5" strokeWidth={3} />
          </span>
          <span title={question} className="min-w-0 truncate text-muted-foreground">
            {question}
          </span>
          <span aria-hidden="true" className="text-border">
            ·
          </span>
          <span title={isSkipped && !final ? undefined : summary} className="max-w-[55%] shrink-0 truncate font-medium text-foreground">
            {isSkipped && !final ? `Skipped, ${skippedText}` : summary}
          </span>
        </div>
      ) : (
        <div className="p-1.5">
          <div className="px-2.5 pb-2.5 pt-2">
            <div className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 rounded-full bg-primary animate-[ui-ping_1.6s_cubic-bezier(0,0,0.2,1)_infinite] motion-reduce:animate-none" />
                <span className="relative size-1.5 rounded-full bg-primary" />
              </span>
              Needs your answer
            </div>
            <p id={`${id}-q`} className="mt-1.5 text-[14px] font-medium leading-snug text-foreground">
              {question}
            </p>
            {detail && <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted-foreground">{detail}</p>}
          </div>

          <div
            role={multiple ? "group" : "radiogroup"}
            aria-labelledby={`${id}-q`}
            onKeyDown={onListKey}
            className="relative"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 rounded-[14px] bg-accent"
              style={{
                height: highlight.height,
                transform: `translateY(${highlight.top}px)`,
                transition: highlight.ready && !reduced ? `transform 200ms ${EASE}, height 200ms ${EASE}` : "none",
              }}
            />
            {rows.map((row, i) => {
              const isOther = row.id === OTHER;
              const checked = isOther ? otherOpen : picked.includes(row.id);
              const description = "description" in row ? row.description : undefined;
              const marker = multiple ? (
                <span
                  aria-hidden="true"
                  className={`flex size-[18px] shrink-0 items-center justify-center rounded-[6px] transition-colors ${
                    checked ? "bg-primary text-primary-foreground" : "shadow-[inset_0_0_0_1.5px_var(--border)]"
                  }`}
                >
                  {checked && <Check className="size-3 animate-[ui-pop-in_160ms_ease-out_both]" strokeWidth={3} />}
                </span>
              ) : (
                <kbd
                  aria-hidden="true"
                  className={`flex size-[18px] shrink-0 items-center justify-center rounded-[6px] font-mono text-[10.5px] transition-colors ${
                    i === active ? "bg-background text-foreground shadow-[0_0_0_1px_var(--border)]" : "text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)]"
                  }`}
                >
                  {i + 1}
                </kbd>
              );

              if (isOther && otherOpen) {
                return (
                  <div
                    key={row.id}
                    ref={(el) => {
                      rowRefs.current[i] = el;
                    }}
                    className="relative flex min-h-11 items-center gap-3 rounded-[14px] px-2.5"
                  >
                    {marker}
                    <input
                      ref={otherRef}
                      value={otherText}
                      onChange={(e) => setOtherText(e.target.value)}
                      onFocus={() => setActive(i)}
                      onKeyDown={(e) => {
                        if (e.nativeEvent.isComposing) return;
                        if (e.key === "Enter") {
                          e.preventDefault();
                          submitOther();
                        } else if (e.key === "Escape") {
                          e.preventDefault();
                          setOtherOpen(false);
                          requestAnimationFrame(() => (rowRefs.current[i] as HTMLElement | null)?.focus());
                        }
                      }}
                      placeholder="Type your answer"
                      aria-label={otherLabel}
                      className="h-8 min-w-0 flex-1 bg-transparent text-[13.5px] text-foreground outline-none placeholder:text-muted-foreground animate-[ui-fade-in_200ms_ease-out_both]"
                    />
                    {!multiple && (
                      <button
                        type="button"
                        aria-label="Send answer"
                        disabled={!otherText.trim()}
                        onClick={submitOther}
                        className={`flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-[opacity,transform] active:scale-[0.94] disabled:opacity-30 ${FOCUS}`}
                      >
                        <ArrowUp className="size-3.5" strokeWidth={2.4} />
                      </button>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={row.id}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  type="button"
                  role={multiple ? "checkbox" : "radio"}
                  aria-checked={multiple ? checked : false}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => choose(i)}
                  onPointerMove={() => i !== active && setActive(i)}
                  onFocus={() => setActive(i)}
                  className="relative flex min-h-11 w-full items-center gap-3 rounded-[14px] px-2.5 py-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/30"
                >
                  {marker}
                  <span className="min-w-0 flex-1">
                    <span className={`block text-[13.5px] ${isOther ? "text-muted-foreground" : "text-foreground"}`}>{isOther ? `${row.label}…` : row.label}</span>
                    {description && <span className="mt-px block text-[12px] leading-snug text-muted-foreground">{description}</span>}
                  </span>
                </button>
              );
            })}
          </div>

          {(onSkip || multiple) && (
            <div className="flex items-center justify-between gap-2 px-1 pb-0.5 pt-1.5">
              {onSkip ? (
                <button
                  type="button"
                  onClick={skip}
                  className={`h-8 rounded-full px-2.5 text-[12.5px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground ${FOCUS}`}
                >
                  Skip
                </button>
              ) : (
                <span />
              )}
              {multiple && (
                <button
                  type="button"
                  disabled={!canContinue}
                  onClick={() => submit(picked, otherOpen && otherText.trim() ? otherText.trim() : undefined)}
                  className={`h-8 rounded-full bg-primary px-3.5 text-[12.5px] font-medium text-primary-foreground transition-[opacity,transform] active:scale-[0.96] disabled:opacity-35 ${FOCUS}`}
                >
                  Continue{picked.length + (otherOpen && otherText.trim() ? 1 : 0) > 0 ? ` · ${picked.length + (otherOpen && otherText.trim() ? 1 : 0)}` : ""}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
