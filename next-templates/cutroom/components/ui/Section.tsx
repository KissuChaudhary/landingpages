import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { Accented, SectionIntro } from "@/site.config";

/**
 * The template's signature: words sitting inside an orange "clip" with trim handles, like a selected clip on
 * an editing timeline. It is inline-block and cannot wrap, so keep it to one or two short words.
 */
export function Clip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("relative mx-[0.06em] inline-block whitespace-nowrap rounded-[0.16em] bg-flame px-[0.3em] text-ink", className)}>
      <span aria-hidden className="absolute inset-y-[20%] left-[0.1em] w-[0.06em] min-w-[3px] rounded-full bg-ink/75" />
      <span aria-hidden className="absolute inset-y-[20%] right-[0.1em] w-[0.06em] min-w-[3px] rounded-full bg-ink/75" />
      {children}
    </span>
  );
}

/** A section headline with the second half in orange. */
export function AccentTitle({ title }: { title: Accented }) {
  return (
    <>
      {title.before} <span className="text-flame-text">{title.accent}</span>
    </>
  );
}

/** Every section below the hero: the same content width, the same vertical rhythm, a stable anchor. */
export function Section({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("relative scroll-mt-20 py-16 md:py-24", className)}>
      <div className="mx-auto w-[var(--content)]">{children}</div>
    </section>
  );
}

/**
 * The scene header: a ruler strip with tick marks, the scene number and topic in mono, then the title with
 * its description beside it. `tone` switches the colours for sections on a dark background.
 */
export function SceneHead({ scene, label, title, description, tone = "paper" }: SectionIntro & { tone?: "paper" | "ink" }) {
  const ink = tone === "ink";
  return (
    <header className="mb-12 md:mb-16">
      <div aria-hidden className={cn("h-3 w-full", ink ? "ruler-on-ink" : "ruler")} />
      <p className={cn("timecode mt-4 flex items-center gap-3", ink ? "text-on-ink-mid" : "text-text-low")}>
        <span className={ink ? "text-flame" : "text-flame-text"}>{scene}</span>
        <span aria-hidden>/</span>
        <span>{label}</span>
      </p>
      <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h2
          className={cn(
            "display text-balance text-[clamp(2.25rem,1.2rem+3.9vw,4.5rem)] leading-[1.02] lg:col-span-8",
            ink ? "text-on-ink" : "text-text",
          )}
        >
          {title.before} <span className={ink ? "text-flame" : "text-flame-text"}>{title.accent}</span>
        </h2>
        <p
          className={cn(
            "text-pretty max-w-[26rem] text-[1.0625rem] leading-[1.6] lg:col-span-4 lg:pb-2",
            ink ? "text-on-ink-mid" : "text-text-mid",
          )}
        >
          {description}
        </p>
      </div>
    </header>
  );
}

/** Initials in a circle: no avatar photos to license or host. */
export function Initial({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("grid size-10 shrink-0 place-items-center rounded-full text-[13px] font-bold text-ink", className)}
    >
      {name.trim()[0]}
    </span>
  );
}
