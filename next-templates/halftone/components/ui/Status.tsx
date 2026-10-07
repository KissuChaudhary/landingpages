import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type Tone = "ok" | "warn" | "fail" | "idle" | "accent";

const PILL: Record<Tone, string> = {
  ok: "bg-emerald-500/10 text-emerald-700",
  warn: "bg-orange-500/10 text-orange-700",
  fail: "bg-rose-500/10 text-rose-700",
  idle: "bg-black/[0.04] text-neutral-500",
  accent: "bg-accent/10 text-accent",
};

const DOT: Record<Tone, string> = {
  ok: "bg-emerald-500",
  warn: "bg-orange-500",
  fail: "bg-rose-500",
  idle: "bg-neutral-400",
  accent: "bg-accent",
};

/** A small status label with a coloured dot: delivery results, plan badges and states. */
export function StatusPill({ tone, children, className, dot = true }: { tone: Tone; children: ReactNode; className?: string; dot?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums transition-colors duration-300",
        PILL[tone],
        className,
      )}
    >
      {dot ? <span className={cn("size-1.5 rounded-full transition-colors duration-300", DOT[tone])} /> : null}
      {children}
    </span>
  );
}

/** A dot with a ring that pulses outward, for anything live. */
export function LiveDot({ tone = "ok", className }: { tone?: Tone; className?: string }) {
  return (
    <span aria-hidden="true" className={cn("relative flex size-2", className)}>
      <span className={cn("live-ping absolute inset-0 rounded-full", DOT[tone])} />
      <span className={cn("relative size-2 rounded-full", DOT[tone])} />
    </span>
  );
}

const TINTS = ["#c7d6ff", "#ffd9c2", "#c9efdc", "#ead7ff", "#ffe6a8", "#ffd0e4"];

export function initialsOf(name: string) {
  return name
    .split(/[\s&]+/)
    .filter((part) => /^\p{L}/u.test(part))
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

/** A soft initials avatar, so the page needs no portrait photos. */
export function Face({ name, index = 0, className }: { name: string; index?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold tracking-tight text-ink/75", className)}
      style={{ backgroundColor: TINTS[index % TINTS.length] }}
    >
      {initialsOf(name)}
    </span>
  );
}
