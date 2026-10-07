import type { ReactNode } from "react";

import { Diamond } from "@/components/hero/GridFrame";
import { cn } from "@/lib/utils";
import type { Accented, SectionIntro } from "@/site.config";

/** A headline with its second half in the serif italic accent. */
export function AccentTitle({ title, className }: { title: Accented; className?: string }) {
  return (
    <h2
      className={cn(
        "text-balance text-[clamp(2rem,1.2rem+3.2vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.02em] text-ink",
        className,
      )}
    >
      {title.before}{" "}
      <em className="bg-gradient-to-b from-ember-100 via-ember-200 to-ember-400 bg-clip-text pr-[0.08em] font-serif text-[1.08em] font-normal italic tracking-[-0.012em] text-transparent">
        {title.accent}
      </em>
    </h2>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.16em] text-ember-300",
        className,
      )}
    >
      <span aria-hidden className="size-[5px] rotate-45 bg-ember-400" />
      {children}
    </p>
  );
}

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Pass false for sections that supply their own vertical padding. */
  padded?: boolean;
};

/** Every section below the hero: the same content width and the same vertical rhythm. */
export function Section({ id, children, className, padded = true }: SectionProps) {
  return (
    <section id={id} className={cn("relative scroll-mt-24", padded && "py-20 md:py-28", className)}>
      <div className="mx-auto w-[var(--content)]">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionIntro & { align?: "center" | "left" }) {
  const center = align === "center";
  return (
    <header className={cn("mb-12 flex flex-col gap-5 md:mb-16", center ? "items-center text-center" : "items-start")}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <AccentTitle title={title} className={center ? "max-w-[16em]" : "max-w-[14em]"} />
      <p className="text-pretty max-w-[34rem] text-base leading-[1.65] text-ink-mid md:text-[1.0625rem]">{description}</p>
    </header>
  );
}

/** The hairline between sections, with a diamond where it meets each outer rail. */
export function Divider() {
  return (
    <div aria-hidden className="relative z-10 h-px w-full">
      <div className="hairline-x absolute inset-0" />
      <Diamond className="-top-[3px] hidden md:block" style={{ left: "calc(50% - var(--content) / 2 - 3.5px)" }} />
      <Diamond className="-top-[3px] hidden md:block" style={{ left: "calc(50% + var(--content) / 2 - 3.5px)" }} />
    </div>
  );
}

/** Two vertical rails that run the whole height of the page below the hero, at the content edges. */
export function PageRails() {
  const rail =
    "absolute inset-y-0 hidden w-px bg-line md:block [mask-image:linear-gradient(to_bottom,transparent,#000_120px,#000_calc(100%-200px),transparent)]";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <span className={rail} style={{ left: "calc(50% - var(--content) / 2)" }} />
      <span className={rail} style={{ left: "calc(50% + var(--content) / 2)" }} />
    </div>
  );
}
