"use client";

import * as React from "react";
import { site, type Testimonial } from "@/site.config";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";
import { NumberRoll } from "@/components/hairline/number-roll";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import { useInView } from "@/components/motion/useInView";

/*
 * CUSTOMERS: quotes and the people behind them, in a staggered grid.
 *   arrive   cards rise in column by column
 *   figure   one dark tile carries a customer result that rolls up when seen
 *   phones   one column: the result first, then each quote with its person
 * Monograms stand in for portraits; add photos by replacing <Avatar>.
 */

const SWATCHES = [
  ["#7cf0b5", "#0a8552"],
  ["#67e8f9", "#0e7490"],
  ["#a78bfa", "#5b21b6"],
  ["#fbbf24", "#b45309"],
];

function Avatar({ name, index }: { name: string; index: number }) {
  const [a, b] = SWATCHES[index % SWATCHES.length];
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
  return (
    <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full text-[13px] font-[600] text-white" style={{ background: `linear-gradient(140deg, ${a}, ${b})` }}>
      {initials}
    </span>
  );
}

function Person({ t, index }: { t: Testimonial; index: number }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar name={t.name} index={index} />
      <div>
        <p className="text-[15px] font-[540] tracking-[-0.01em] text-ink">{t.name}</p>
        <p className="text-[13px] text-muted-foreground">
          {t.role}, {t.company}
        </p>
      </div>
    </div>
  );
}

function Quote({ text, large = false }: { text: string; large?: boolean }) {
  return (
    <>
      <svg viewBox="0 0 32 24" aria-hidden="true" className="h-5 w-auto text-mint-ink">
        <path d="M0 24V14C0 6 4 1 12 0l1.5 3.5C8.8 5 6.8 8 6.6 12H12v12H0Zm19 0V14c0-8 4-13 12-14l1.5 3.5C27.8 5 25.8 8 25.6 12H31v12H19Z" fill="currentColor" />
      </svg>
      <p className={`mt-5 leading-[1.55] tracking-[-0.01em] text-ink ${large ? "text-[17px]" : "text-[15.5px]"}`}>{text}</p>
    </>
  );
}

function Highlight() {
  const { highlight } = site.testimonials;
  const logo = site.hero.logos.find((l) => l.name === highlight.company);
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="tone-dark relative isolate flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-[24px] bg-ink p-6 text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_100%_100%,rgba(124,240,181,0.22),transparent_70%)]" />
      {logo && <CompanyLogo logo={logo} className="text-white/80" />}
      <div>
        <p className="text-[44px] font-[450] leading-none tracking-[-0.05em] text-mint">
          −<NumberRoll locales={site.locale} value={inView ? highlight.value : 0} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} duration={1500} />
        </p>
        <p className="mt-3 max-w-[26ch] text-[14px] leading-relaxed text-white/60">{highlight.label}</p>
      </div>
    </div>
  );
}

export function Testimonials() {
  const { testimonials } = site;
  const [q1, q2, q3, q4] = testimonials.items;
  const card = "rounded-[24px] bg-mist p-6";
  return (
    <section id="customers" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 md:py-28" aria-labelledby="customers-title">
      <SectionIntro id="customers-title" badge={testimonials.badge} title={testimonials.title} description={testimonials.description} />

      {/* Wide screens: a staggered four-column grid. */}
      <div className="mt-14 grid grid-cols-4 items-stretch gap-3 max-lg:hidden">
        <Reveal>
          <figure className="flex h-full flex-col gap-3">
            <blockquote className={`${card} flex-1`}>
              <Quote text={q1.quote} large />
            </blockquote>
            <figcaption className={card}>
              <Person t={q1} index={0} />
            </figcaption>
          </figure>
        </Reveal>
        <Reveal delay={90}>
          <figure className="flex h-full flex-col gap-3">
            <figcaption className={card}>
              <Person t={q2} index={1} />
            </figcaption>
            <blockquote className={`${card} flex-1`}>
              <Quote text={q2.quote} />
            </blockquote>
          </figure>
        </Reveal>
        <Reveal delay={180} className="flex flex-col gap-3">
          <div className="flex-1">
            <Highlight />
          </div>
          <figure className={card}>
            <blockquote>
              <Quote text={q3.quote} />
            </blockquote>
            <figcaption className="mt-6">
              <Person t={q3} index={2} />
            </figcaption>
          </figure>
        </Reveal>
        <Reveal delay={270}>
          <figure className="flex h-full flex-col gap-3">
            <figcaption className={card}>
              <Person t={q4} index={3} />
            </figcaption>
            <blockquote className={`${card} flex-1`}>
              <Quote text={q4.quote} />
            </blockquote>
          </figure>
        </Reveal>
      </div>

      {/* Phones and tablets: one column. */}
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:hidden">
        <Reveal className="sm:col-span-2">
          <Highlight />
        </Reveal>
        {testimonials.items.map((t, i) => (
          <Reveal key={t.name} delay={i * 60}>
            <figure className={`${card} h-full`}>
              <blockquote>
                <Quote text={t.quote} />
              </blockquote>
              <figcaption className="mt-6">
                <Person t={t} index={i} />
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
