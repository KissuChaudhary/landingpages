import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { Accented } from "@/site.config";

/**
 * The page frame: two hatched rails and a hairline on each side, running the whole height of the page.
 * Everything else sits in the middle column.
 */
export function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[1250px] items-stretch sm:border-x sm:border-line">
      <div aria-hidden className="rail hidden w-5 shrink-0 border-r border-line sm:block" />
      <div className="min-w-0 flex-1">{children}</div>
      <div aria-hidden className="rail hidden w-5 shrink-0 border-l border-line sm:block" />
    </div>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1000px] px-4 sm:px-8", className)}>{children}</div>;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const buttonBase =
  "group inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-xl font-medium text-ink outline-none " +
  "border border-flame/60 bg-gradient-to-b from-orange-300 to-orange-400 shadow-[inset_0_-2px_0_rgba(120,53,15,0.18),inset_0_1px_0_rgba(255,255,255,0.55)] " +
  "transition-[filter,transform] duration-200 hover:brightness-[1.04] active:translate-y-px focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

/** The orange call to action. */
export function Button({ className, children, arrow = false, ...props }: LinkProps & { arrow?: boolean }) {
  return (
    <a className={cn(buttonBase, "h-14 px-8 text-[17px]", className)} {...props}>
      {children}
      {arrow ? <ArrowRight className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5" /> : null}
    </a>
  );
}

/** The quiet outlined button used in the navigation. */
export function OutlineButton({ className, children, ...props }: LinkProps) {
  return (
    <a
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-xl border border-line-strong bg-card px-5 text-[14px] font-medium text-ink outline-none transition-colors hover:border-ink focus-visible:ring-2 focus-visible:ring-flame",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

/** Small caps label in a pale orange pill. */
export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center rounded-full border border-peach bg-flame-soft px-3.5 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-flame-text",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** A headline: serif, with the second half in italic. */
export function Heading({ title, className }: { title: Accented; className?: string }) {
  return (
    <>
      <span className={className}>{title.before}</span>
      {title.accent ? <em className={cn("italic", className)}> {title.accent}</em> : null}
    </>
  );
}

/** Centred title and one sentence, with an optional pill above. */
export function SectionHead({ pill, title, description, className }: { pill?: string; title: Accented; description: string; className?: string }) {
  return (
    <header className={cn("mx-auto flex max-w-[44rem] flex-col items-center text-center", className)}>
      {pill ? <Pill className="mb-6">{pill}</Pill> : null}
      <h2 className="text-balance font-serif text-[clamp(2.25rem,1.3rem+3.8vw,4rem)] leading-[1.08] tracking-tight text-ink">
        <Heading title={title} />
      </h2>
      <p className="text-pretty mt-5 max-w-[34rem] text-[1.0625rem] leading-[1.6] text-ink-mid">{description}</p>
    </header>
  );
}

/**
 * The signature card: a white card inside a peach ring, inside a lilac hairline.
 * Used for features, examples and the price.
 */
export function Ring({ children, className, innerClassName }: { children: ReactNode; className?: string; innerClassName?: string }) {
  return (
    <div className={cn("rounded-[28px] border border-lilac bg-peach p-1.5", className)}>
      <div className={cn("h-full rounded-[22px] bg-card", innerClassName)}>{children}</div>
    </div>
  );
}

/** A small handwritten note with a curved arrow. `arrow` picks the direction the arrow points. */
export function Note({ children, arrow, className }: { children: ReactNode; arrow: "down-left" | "down" | "up" | "down-right" | "up-left" | "up-right"; className?: string }) {
  const paths: Record<string, string> = {
    "down-left": "M52 8 Q52 44 10 48",
    down: "M30 6 Q36 30 30 52",
    up: "M30 52 Q24 28 30 8",
    "down-right": "M8 8 Q8 44 50 48",
    "up-left": "M52 52 Q52 16 12 10",
    "up-right": "M8 52 Q8 16 48 10",
  };
  return (
    <div aria-hidden className={cn("pointer-events-none flex flex-col items-center font-hand text-[1.375rem] leading-[1.15] text-ink-mid", className)}>
      <span>{children}</span>
      <svg width="64" height="60" viewBox="0 0 64 60" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="mt-0.5 text-ink-low">
        <path d={paths[arrow]} />
        <path
          d={
            arrow === "down-left"
              ? "M18 41 L10 48 L20 53"
              : arrow === "down"
                ? "M24 44 L30 52 L37 45"
                : arrow === "up"
                  ? "M23 15 L30 8 L36 15"
                  : arrow === "down-right"
                    ? "M42 41 L50 48 L40 53"
                    : arrow === "up-left"
                      ? "M20 4 L12 10 L21 16"
                      : "M40 4 L48 10 L39 16"
          }
        />
      </svg>
    </div>
  );
}
