"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Check, Clock3 } from "lucide-react";

import { site } from "@/site.config";
import { EASE } from "@/components/motion/hooks";
import { BrandGlyph } from "@/components/ui/BrandMark";
import { Reveal, SectionHeader } from "@/components/ui/Reveal";

/** The same rows on both sides, so the reader compares line by line: weeks of work against "Included". */
export function BuildVsBuy() {
  const { buildVsBuy: content } = site;
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(listRef, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const ticked = inView || reduced;

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader kicker={content.kicker} lead={content.lead} accent={content.accent} description={content.description} />

        <div ref={listRef} className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          <Reveal y={30} className="surface flex flex-col rounded-[30px] p-6 sm:p-8">
            <h3 className="mb-5 text-lg font-semibold tracking-tight text-neutral-600">{content.build.title}</h3>
            <ul className="flex-1 divide-y divide-black/[0.05]">
              {content.rows.map((row) => (
                <li key={row.item} className="flex min-h-14 items-center justify-between gap-4 py-2.5 text-[15px] leading-snug text-neutral-600">
                  <span className="flex min-w-0 items-center gap-3">
                    <Clock3 className="size-4 shrink-0 text-neutral-400" />
                    <span>{row.item}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[13px] tabular-nums text-neutral-500">{row.estimate}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-black/[0.06] pt-5 text-[15px] font-semibold tracking-tight text-neutral-700">{content.build.total}</p>
          </Reveal>

          <Reveal y={30} delay={0.1} className="surface rounded-[30px] p-2 ring-1 ring-accent/25">
            <div className="flex h-full flex-col rounded-[24px] bg-white p-6 ring-1 ring-black/[0.05] sm:p-6">
              <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold tracking-tight text-ink">
                <span className="flex size-6 items-center justify-center rounded-[7px] bg-ink text-white">
                  <BrandGlyph className="size-4" />
                </span>
                {content.buy.title}
              </h3>
              <ul className="flex-1 divide-y divide-black/[0.05]">
                {content.rows.map((row, index) => (
                  <li key={row.item} className="flex min-h-14 items-center justify-between gap-4 py-2.5 text-[15px] leading-snug text-ink">
                    <span className="flex min-w-0 items-center gap-3">
                      <motion.span
                        initial={false}
                        animate={ticked ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
                        transition={{ duration: 0.45, delay: reduced ? 0 : 0.35 + index * 0.12, ease: EASE }}
                        className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-accent text-white"
                      >
                        <Check className="size-3" strokeWidth={3} />
                      </motion.span>
                      <span>{row.item}</span>
                    </span>
                    <span className="shrink-0 text-[13px] font-semibold text-accent">{content.buy.note}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-baseline justify-between gap-4 border-t border-black/[0.06] pt-5">
                <span className="text-[15px] font-semibold tracking-tight text-ink">{content.buy.totalLabel}</span>
                <span className="text-2xl font-semibold tracking-tight text-accent">{content.buy.total}</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
