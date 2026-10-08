"use client";

import * as React from "react";
import { ChevronRight, Search } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * WEB RESEARCH: watch the agent search and read
 *
 *   searching  "Searching" shimmers; the live query types in
 *   reading    each page read drops its icon into the stack;
 *              its title crossfades underneath
 *   done       "3 searches · 14 sources"; open it for the list
 *   error      "Search failed", keeping whatever was found
 *   cancelled  "Stopped after 2 searches"
 *
 * Feed it the queries and sources as they arrive (tool calls
 * and source parts from the AI SDK); it animates the rest.
 * ───────────────────────────────────────────────────────── */

export type ResearchStatus = "searching" | "reading" | "done" | "error" | "cancelled";

export interface ResearchSource {
  url: string;
  title?: string;
  /** An icon URL; without one, a tinted monogram of the site. */
  favicon?: string;
}

export interface WebResearchProps extends React.HTMLAttributes<HTMLDivElement> {
  status: ResearchStatus;
  /** Queries so far; the last one is live while searching. */
  queries: string[];
  /** Pages read so far, in order. */
  sources: ResearchSource[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const EASE = "cubic-bezier(0.23,1,0.32,1)";
const STACK = 4;
const SHIMMER =
  "bg-[linear-gradient(90deg,color-mix(in_oklab,var(--muted-foreground)_55%,transparent)_35%,var(--foreground)_50%,color-mix(in_oklab,var(--muted-foreground)_55%,transparent)_65%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[ui-shimmer_1.4s_linear_infinite] motion-reduce:animate-none motion-reduce:bg-none motion-reduce:text-foreground/70";

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const useReducedMotion = () =>
  React.useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => false,
  );

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function hue(text: string) {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) % 360;
  return h;
}

function Favicon({ source, className = "" }: { source: ResearchSource; className?: string }) {
  const host = hostname(source.url);
  const [failed, setFailed] = React.useState(false);
  if (source.favicon && !failed) {
    return <img src={source.favicon} alt="" onError={() => setFailed(true)} className={`rounded-full bg-background object-cover ${className}`} />;
  }
  const h = hue(host);
  return (
    <span
      aria-hidden="true"
      className={`flex items-center justify-center rounded-full text-[9.5px] font-semibold leading-none ${className}`}
      style={{
        background: `color-mix(in oklab, oklch(0.62 0.13 ${h}) 20%, var(--background))`,
        color: `oklch(0.5 0.12 ${h})`,
      }}
    >
      {host.charAt(0).toUpperCase()}
    </span>
  );
}

/** Types the newest query in, a few characters a frame; earlier text never re-types. */
function useTyped(text: string, active: boolean, reduced: boolean) {
  const [shown, setShown] = React.useState(text);
  React.useEffect(() => {
    if (!active || reduced) {
      setShown(text);
      return;
    }
    let i = 0;
    let frame = 0;
    const step = () => {
      i = Math.min(text.length, i + 2);
      setShown(text.slice(0, i));
      if (i < text.length) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [text, active, reduced]);
  return shown;
}

export function WebResearch({ status, queries, sources, open: openProp, defaultOpen = false, onOpenChange, className = "", ...props }: WebResearchProps) {
  const reduced = useReducedMotion();
  const [ownOpen, setOwnOpen] = React.useState(defaultOpen);
  const open = openProp ?? ownOpen;
  const setOpen = (next: boolean) => {
    if (openProp === undefined) setOwnOpen(next);
    onOpenChange?.(next);
  };

  const working = status === "searching" || status === "reading";
  const query = queries[queries.length - 1] ?? "";
  const typed = useTyped(query, status === "searching", reduced);
  const latest = sources[sources.length - 1];
  const stack = sources.slice(-STACK);
  const extra = sources.length - stack.length;
  const listId = React.useId();

  const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : /(s|sh|ch|x)$/.test(word) ? "es" : "s"}`;
  const summary =
    status === "error"
      ? `Search failed${sources.length ? ` · ${plural(sources.length, "source")}` : ""}`
      : status === "cancelled"
        ? `Stopped after ${plural(queries.length, "search")}`
        : `${plural(queries.length, "search")} · ${plural(sources.length, "source")}`;

  const header = (
    <>
      <span className="relative flex h-5 shrink-0 items-center">
        {stack.length === 0 ? (
          <span className="flex size-5 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Search className={`size-3 ${working ? "animate-[ui-breathe_1.6s_ease-in-out_infinite] motion-reduce:animate-none" : ""}`} strokeWidth={2.2} />
          </span>
        ) : (
          stack.map((s, i) => (
            <span
              key={s.url}
              className={`relative flex size-5 overflow-hidden rounded-full ring-2 ring-background ${i ? "-ml-1.5" : ""} ${working ? "animate-[ui-drop-in_420ms_cubic-bezier(0.23,1,0.32,1)_both] motion-reduce:animate-none" : ""}`}
              style={{ zIndex: i }}
            >
              <Favicon source={s} className="size-full" />
            </span>
          ))
        )}
        {extra > 0 && (
          <span
            key={extra}
            className="-ml-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1 font-mono text-[9.5px] tabular-nums text-muted-foreground ring-2 ring-background animate-[ui-fade-in_200ms_ease-out_both]"
          >
            +{extra}
          </span>
        )}
      </span>

      <span className="min-w-0 flex-1 text-left">
        {working ? (
          <span className="flex min-w-0 items-baseline gap-1.5 text-[13px]">
            <span className={`shrink-0 font-medium ${SHIMMER}`}>{status === "searching" ? "Searching" : "Reading"}</span>
            {status === "searching" && query && <span className="truncate text-muted-foreground">“{typed}”</span>}
            {status === "reading" && (
              <span
                key={sources.length}
                className="shrink-0 font-mono text-[11.5px] tabular-nums text-muted-foreground animate-[ui-fade-up_240ms_ease-out_both] motion-reduce:animate-none"
              >
                {plural(sources.length, "site")}
              </span>
            )}
          </span>
        ) : (
          <span className={`block truncate text-[13px] ${status === "error" ? "text-red-600 dark:text-red-400" : "text-muted-foreground"}`}>{summary}</span>
        )}
        {working && latest && (
          <span className="relative mt-0.5 block h-4 overflow-hidden">
            <span
              key={latest.url}
              className="absolute inset-0 truncate text-[11.5px] text-muted-foreground/80 animate-[ui-fade-up_320ms_cubic-bezier(0.23,1,0.32,1)_both] motion-reduce:animate-none"
            >
              {latest.title ?? hostname(latest.url)} <span className="text-muted-foreground/60">· {hostname(latest.url)}</span>
            </span>
          </span>
        )}
      </span>
    </>
  );

  return (
    <div className={`w-full ${className}`} {...props}>
      {working ? (
        <div role="status" aria-live="polite" className="flex min-h-9 items-center gap-2.5 py-1">
          {header}
          <span className="sr-only">{status === "searching" ? `Searching for ${query}` : `Read ${plural(sources.length, "site")}`}</span>
        </div>
      ) : (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen(!open)}
          className="group flex min-h-9 w-full items-center gap-2.5 rounded-lg py-1 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          {header}
          <ChevronRight
            aria-hidden="true"
            className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:text-foreground"
            style={{
              transform: open ? "rotate(90deg)" : "none",
              transitionTimingFunction: EASE,
            }}
          />
        </button>
      )}

      <div
        id={listId}
        inert={!open || working}
        className="grid"
        style={{
          gridTemplateRows: open && !working ? "1fr" : "0fr",
          transition: reduced ? "none" : `grid-template-rows 380ms ${EASE}`,
        }}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="ml-[9px] mt-1 border-l border-border pl-[19px]">
            {queries.length > 0 && (
              <ul className="pb-1.5">
                {queries.map((q, i) => (
                  <li key={i} className="flex h-7 items-center gap-2 text-[12px] text-muted-foreground">
                    <Search aria-hidden="true" className="size-3 shrink-0" strokeWidth={2.2} />
                    <span className="truncate">{q}</span>
                  </li>
                ))}
              </ul>
            )}
            {sources.length > 0 && (
              <div className="border-t border-border/60 pb-1 pt-1.5">
                <ul className="-mx-1.5 max-h-80 overflow-y-auto overflow-x-hidden px-1.5 [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin]">
                  {sources.map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-8 items-center gap-2.5 rounded-lg px-1.5 outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40"
                      >
                        <Favicon source={s} className="size-4 shrink-0" />
                        <span className="min-w-0 flex-1 truncate text-[12.5px] text-foreground">{s.title ?? hostname(s.url)}</span>
                        <span className="shrink-0 text-[11.5px] text-muted-foreground">{hostname(s.url)}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
