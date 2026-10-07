import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { Accented, SectionIntro, Tint } from "@/site.config";
import { TINT } from "@/lib/tint";

/** A headline with its second half in the italic serif, in the accent colour. */
export function Title({
  title,
  className,
  accentClassName = "text-clay",
}: {
  title: Accented;
  className?: string;
  accentClassName?: string;
}) {
  return (
    <>
      <span className={className}>{title.before} </span>
      <em className={cn("display italic", accentClassName, className)}>{title.accent}</em>
    </>
  );
}

/** Every section below the hero: the same content width, the same vertical rhythm, a stable anchor. */
export function Section({
  id,
  index,
  children,
  className,
}: {
  id?: string;
  /** The section number shown in the header rule, for example "02". Omit to hide the rule. */
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-24 py-16 md:py-24", className)}>
      <div className="mx-auto w-[var(--content)]">{children}</div>
      {index ? <span className="sr-only">Section {index}</span> : null}
    </section>
  );
}

/** The editorial section header: a hairline with the label and number, then a big title with its description beside it. */
export function SectionHead({ label, index, title, description }: SectionIntro & { index: string }) {
  return (
    <header className="mb-12 md:mb-16">
      <div className="flex items-baseline justify-between border-t border-line-strong pt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-low">
        <p>{label}</p>
        <p aria-hidden>({index})</p>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h2 className="display text-balance text-[clamp(2.25rem,1.2rem+3.6vw,4.25rem)] leading-[1.02] text-ink lg:col-span-8">
          <Title title={title} className="" />
        </h2>
        <p className="text-pretty max-w-[26rem] text-[1.0625rem] leading-[1.6] text-ink-mid lg:col-span-4 lg:pb-2">{description}</p>
      </div>
    </header>
  );
}

/** Initials on a tint: no avatar photos to license or host. */
export function Avatar({ name, tint, className }: { name: string; tint: Tint; className?: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-full text-[12px] font-semibold tracking-wide text-ink",
        TINT[tint].solid,
        className,
      )}
    >
      {initials}
    </span>
  );
}
