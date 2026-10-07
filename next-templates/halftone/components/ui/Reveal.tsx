"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { EASE } from "@/components/motion/hooks";
import { BrandGlyph } from "./BrandMark";

/**
 * The page's one scroll entrance: a short rise, a slow settle and a faint focus-in.
 * Offsets are halved and capped so nothing travels far; reduced motion keeps only the fade.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  amount,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  const reduced = useReducedMotion();
  const rise = reduced ? 0 : Math.min(18, Math.max(0, y) * 0.5);
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: rise, filter: "blur(4px)" }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
      viewport={{ once: true, margin: "0px 0px -12% 0px", amount }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** The small pill label that opens every section. */
export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "surface inline-flex select-none items-center gap-2 rounded-full border border-black/[0.04] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-800",
        className,
      )}
    >
      <BrandGlyph className="size-3.5 text-accent" />
      <span>{children}</span>
    </div>
  );
}

/** The two-line section headline: a quiet lead and the accent line on its own row. */
export function Headline({ lead, accent, className, as: Tag = "h2" }: { lead: ReactNode; accent: ReactNode; className?: string; as?: "h1" | "h2" }) {
  return (
    <Tag className={cn("text-balance text-3xl font-medium leading-[1.12] tracking-tight text-body sm:text-4xl md:text-[46px]", className)}>
      {lead} <br className="hidden sm:block" />
      <span className="font-semibold text-accent">{accent}</span>
    </Tag>
  );
}

/**
 * Section header. `split` puts the headline on the left and the description beside it, which suits
 * sections with wide content below; `center` is for sections that are centred themselves.
 */
export function SectionHeader({
  kicker,
  lead,
  accent,
  description,
  align = "split",
  className,
}: {
  kicker: string;
  lead: ReactNode;
  accent: ReactNode;
  description?: ReactNode;
  align?: "split" | "center";
  className?: string;
}) {
  if (align === "center") {
    return (
      <div className={cn("mx-auto mb-12 max-w-3xl text-center sm:mb-16", className)}>
        <Reveal y={16}>
          <Kicker className="mb-5">{kicker}</Kicker>
        </Reveal>
        <Reveal y={24} delay={0.08}>
          <Headline lead={lead} accent={accent} />
        </Reveal>
        {description ? (
          <Reveal y={24} delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-body sm:text-lg">{description}</p>
          </Reveal>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("mb-12 grid gap-5 sm:mb-16 md:grid-cols-12 md:items-end md:gap-8", className)}>
      <div className="md:col-span-7">
        <Reveal y={16}>
          <Kicker className="mb-5">{kicker}</Kicker>
        </Reveal>
        <Reveal y={24} delay={0.08}>
          <Headline lead={lead} accent={accent} />
        </Reveal>
      </div>
      {description ? (
        <Reveal y={24} delay={0.16} className="md:col-span-5 md:pb-1.5">
          <p className="max-w-md text-pretty text-base leading-relaxed text-body sm:text-[17px]">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
