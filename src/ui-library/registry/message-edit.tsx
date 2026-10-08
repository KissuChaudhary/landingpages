"use client";

import * as React from "react";
import { Check, ChevronLeft, ChevronRight, Copy, Pencil } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * EDIT AND RESEND: change a sent message in place
 *
 *   sent      the message, with Copy and Edit on hover
 *   editing   the bubble grows into an editor where it sits;
 *             Enter sends, Escape cancels
 *   versions  after a resend, "2 / 2" steps between branches
 *   disabled  editing waits while an answer is streaming
 *
 * The morph is one surface: it widens from its right edge and
 * grows to fit the field, its contents fade across, and it folds
 * back the same way.
 * ───────────────────────────────────────────────────────── */

export interface MessageEditProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  text: string;
  /** Called with the edited text; replace the message and regenerate from it. */
  onSubmit: (text: string) => void;
  /** Disable editing, e.g. while an answer streams. */
  disabled?: boolean;
  disabledReason?: string;
  /** Branches of this message, shown as "2 / 3". */
  versions?: { index: number; count: number; onIndexChange: (index: number) => void };
  /** How the sent message renders; defaults to the text. */
  children?: React.ReactNode;
}

const EASE = "cubic-bezier(0.23,1,0.32,1)";
const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";
const ICON = `flex size-7 items-center justify-center rounded-full text-muted-foreground transition-[background-color,color,transform] duration-150 hover:bg-accent hover:text-foreground active:scale-[0.94] disabled:pointer-events-none disabled:opacity-35 [&_svg]:size-3.5 ${FOCUS}`;

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const useReducedMotion = () =>
  React.useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => false);

export function MessageEdit({
  text,
  onSubmit,
  disabled = false,
  disabledReason = "Wait for the answer to finish",
  versions,
  children,
  className = "",
  ...props
}: MessageEditProps) {
  const reduced = useReducedMotion();
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(text);
  const [copied, setCopied] = React.useState(false);
  const surfaceRef = React.useRef<HTMLDivElement>(null);
  const fieldRef = React.useRef<HTMLTextAreaElement>(null);
  const editRef = React.useRef<HTMLButtonElement>(null);
  const fromRef = React.useRef<DOMRect | null>(null);
  const returnFocus = React.useRef(false);

  const morph = (next: boolean) => {
    fromRef.current = surfaceRef.current?.getBoundingClientRect() ?? null;
    setEditing(next);
  };

  const start = () => {
    if (disabled) return;
    setDraft(text);
    morph(true);
  };

  const cancel = (refocus = true) => {
    returnFocus.current = refocus;
    morph(false);
  };

  const send = () => {
    const next = draft.trim();
    if (!next || next === text.trim()) return;
    onSubmit(next);
    returnFocus.current = true;
    morph(false);
  };

  // Animate the surface from where it was to where it lands (both directions).
  React.useLayoutEffect(() => {
    const el = surfaceRef.current;
    const from = fromRef.current;
    fromRef.current = null;
    if (editing) {
      const field = fieldRef.current;
      if (field) {
        field.style.height = "auto";
        field.style.height = `${field.scrollHeight}px`;
        field.focus({ preventScroll: true });
        field.setSelectionRange(field.value.length, field.value.length);
      }
    } else if (returnFocus.current) {
      returnFocus.current = false;
      editRef.current?.focus({ preventScroll: true });
    }
    if (!el || !from || reduced) return;
    const to = el.getBoundingClientRect();
    el.animate(
      [
        { width: `${from.width}px`, height: `${from.height}px` },
        { width: `${to.width}px`, height: `${to.height}px` },
      ],
      { duration: 380, easing: EASE }
    );
  }, [editing, reduced]);

  React.useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard blocked; nothing to show.
    }
  };

  const unchanged = draft.trim() === text.trim() || !draft.trim();

  return (
    <div className={`group/message flex w-full flex-col items-end ${className}`} {...props}>
      <div
        ref={surfaceRef}
        className={`overflow-hidden rounded-[20px] transition-[background-color,box-shadow] duration-300 ${
          editing
            ? "w-full bg-background shadow-[0_0_0_1px_var(--border),0_8px_24px_-16px_rgba(0,0,0,0.25)]"
            : "w-fit max-w-[85%] bg-muted shadow-[0_0_0_1px_transparent]"
        }`}
      >
        {editing ? (
          <div key="editor" className="p-3 animate-[ui-fade-in_220ms_ease-out_100ms_both] motion-reduce:animate-none">
            <textarea
              ref={fieldRef}
              value={draft}
              rows={1}
              aria-label="Edit message"
              onChange={(e) => {
                setDraft(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onKeyDown={(e) => {
                if (e.nativeEvent.isComposing) return;
                if (e.key === "Escape") {
                  e.preventDefault();
                  cancel();
                } else if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              className="block max-h-60 w-full resize-none bg-transparent px-1 text-[14px] leading-relaxed text-foreground outline-none"
            />
            <div className="mt-2 flex items-center justify-end gap-1">
              <button
                type="button"
                onClick={() => cancel()}
                className={`h-8 rounded-full px-3 text-[12.5px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground ${FOCUS}`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={send}
                disabled={unchanged}
                className={`h-8 rounded-full bg-primary px-3.5 text-[12.5px] font-medium text-primary-foreground transition-[opacity,transform] duration-150 active:scale-[0.96] disabled:opacity-35 ${FOCUS}`}
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <div key="message" className="whitespace-pre-wrap px-4 py-2.5 text-[14px] leading-relaxed text-foreground animate-[ui-fade-in_220ms_ease-out_100ms_both] motion-reduce:animate-none">
            {children ?? text}
          </div>
        )}
      </div>

      <div
        inert={editing}
        className={`mt-1 flex items-center gap-0.5 transition-opacity duration-200 ${
          editing ? "opacity-0" : "opacity-0 focus-within:opacity-100 group-hover/message:opacity-100 [@media(hover:none)]:opacity-100"
        }`}
      >
        {versions && versions.count > 1 && (
          <span className="mr-1 flex items-center">
            <button
              type="button"
              aria-label="Previous version"
              disabled={versions.index <= 0}
              onClick={() => versions.onIndexChange(versions.index - 1)}
              className={ICON}
            >
              <ChevronLeft />
            </button>
            <span aria-live="polite" className="min-w-[2.5rem] text-center font-mono text-[11px] tabular-nums text-muted-foreground">
              <span className="sr-only">Version </span>
              {versions.index + 1} / {versions.count}
            </span>
            <button
              type="button"
              aria-label="Next version"
              disabled={versions.index >= versions.count - 1}
              onClick={() => versions.onIndexChange(versions.index + 1)}
              className={ICON}
            >
              <ChevronRight />
            </button>
          </span>
        )}
        <button type="button" aria-label={copied ? "Copied" : "Copy message"} onClick={copy} className={ICON}>
          {copied ? <Check className="animate-[ui-pop-in_200ms_ease-out_both] text-foreground" /> : <Copy />}
        </button>
        <button
          ref={editRef}
          type="button"
          aria-label="Edit message"
          title={disabled ? disabledReason : undefined}
          aria-disabled={disabled || undefined}
          onClick={start}
          className={`${ICON} aria-disabled:cursor-not-allowed aria-disabled:opacity-35 aria-disabled:hover:bg-transparent aria-disabled:hover:text-muted-foreground`}
        >
          <Pencil />
        </button>
      </div>
    </div>
  );
}
