"use client";

import * as React from "react";
import { Globe } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * CITATION: an inline [1] that previews its source
 *
 *   closed       a small numbered marker in the sentence
 *   open         hover or focus shows the site, title and snippet
 *   unavailable  the source couldn't be fetched
 *
 * The marker is the link itself, so clicking opens the source.
 * The card is a tooltip describing it; it flips above near the
 * bottom of the screen and shifts to stay inside the viewport.
 * ───────────────────────────────────────────────────────── */

export interface CitationSource {
  title: string;
  url: string;
  snippet?: string;
  /** A favicon, e.g. <img src="…" alt="" />. */
  icon?: React.ReactNode;
}

export interface CitationProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  index: number;
  source?: CitationSource;
  status?: "available" | "unavailable";
}

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";
const CARD_WIDTH = 288;

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function Citation({ index, source, status = "available", className = "", ...props }: CitationProps) {
  const [open, setOpen] = React.useState(false);
  const [place, setPlace] = React.useState<{ above: boolean; shift: number }>({ above: false, shift: 0 });
  const triggerRef = React.useRef<HTMLAnchorElement>(null);
  const cardRef = React.useRef<HTMLSpanElement>(null);
  const timer = React.useRef<number | undefined>(undefined);
  const id = React.useId();
  const unavailable = status === "unavailable" || !source;

  const show = (delay: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), delay);
  };
  const hide = (delay: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), delay);
  };
  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  // Keep the card on screen: flip above near the bottom, shift left near the right edge.
  React.useLayoutEffect(() => {
    if (!open || !triggerRef.current || !cardRef.current) return;
    const t = triggerRef.current.getBoundingClientRect();
    const h = cardRef.current.offsetHeight;
    const overflowRight = t.left + CARD_WIDTH - (window.innerWidth - 12);
    setPlace({ above: t.bottom + h + 12 > window.innerHeight && t.top > h + 12, shift: Math.max(0, overflowRight) });
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <span className={`relative inline-block align-baseline ${className}`} onMouseEnter={() => show(120)} onMouseLeave={() => hide(150)} {...props}>
      <a
        ref={triggerRef}
        href={source?.url}
        target="_blank"
        rel="noreferrer"
        aria-describedby={open ? id : undefined}
        aria-label={`Source ${index}${source ? `: ${source.title}` : ""}`}
        onFocus={() => show(0)}
        onBlur={() => hide(0)}
        className={`mx-0.5 inline-flex h-[1.2em] min-w-[1.2em] -translate-y-[0.12em] items-center justify-center rounded-[5px] px-1 font-mono text-[10.5px] leading-none no-underline transition-colors ${FOCUS} ${
          unavailable ? "bg-muted text-muted-foreground/60 line-through" : open ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
        }`}
      >
        {index}
      </a>

      {open && (
        <span
          ref={cardRef}
          id={id}
          role="tooltip"
          className={`absolute left-0 z-50 block rounded-xl border border-border bg-background p-3 text-left shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)] animate-[ui-fade-up_180ms_cubic-bezier(0.23,1,0.32,1)_both] motion-reduce:animate-none ${
            place.above ? "bottom-full mb-1.5" : "top-full mt-1.5"
          }`}
          style={{ width: CARD_WIDTH, transform: place.shift ? `translateX(-${place.shift}px)` : undefined }}
        >
          {unavailable ? (
            <span className="block text-[12.5px] text-muted-foreground">This source couldn’t be loaded.</span>
          ) : (
            <>
              <span className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
                <span aria-hidden="true" className="flex size-3.5 shrink-0 items-center justify-center overflow-hidden rounded-full">
                  {source.icon ?? <Globe className="size-3.5" />}
                </span>
                <span className="truncate">{hostname(source.url)}</span>
              </span>
              <span className="mt-1.5 line-clamp-2 block text-[13px] font-medium leading-snug text-foreground">{source.title}</span>
              {source.snippet && <span className="mt-1 line-clamp-3 block text-[12px] leading-relaxed text-muted-foreground">{source.snippet}</span>}
            </>
          )}
        </span>
      )}
    </span>
  );
}
