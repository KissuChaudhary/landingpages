"use client";

import * as React from "react";
import { Clock, TrendingDown, BellRing, ShieldCheck, ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { RevealText, Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Pill } from "@/components/ui/Pill";
import { Mark } from "@/components/ui/Brand";
import { GlyphField } from "@/components/motion/GlyphField";
import { NumberRoll } from "@/components/hairline/number-roll";
import { useInView } from "@/components/motion/useInView";

/*
 * WHY SHEAR: the Monday digest beside four reasons.
 *   tile     a quieter glyph river runs behind the digest card
 *   digest   the card rises in, the saved figure rolls up and its rows
 *            arrive one after another
 *   list     each reason rises in on its own hairline
 */

const icons = { clock: Clock, trend: TrendingDown, bell: BellRing, shield: ShieldCheck };
const tones = { good: "bg-mint", warn: "bg-amber-400", plain: "bg-subtle" };
const TILE_RANGE: [number, number] = [0.1, 0.92];
const EASE = "cubic-bezier(0.16,1,0.3,1)";

function Digest() {
  const { digest } = site.benefits;
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="w-full max-w-[380px] rounded-[22px] border border-black/5 bg-white p-5 text-ink"
      style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(28px) scale(0.97)", transition: `opacity 700ms ${EASE}, transform 1000ms ${EASE}` }}
    >
      <div className="flex items-center justify-between text-[12px] text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full bg-ink">
            <Mark className="size-3.5 text-mint" />
          </span>
          {site.brand.name} · Monday digest
        </span>
        <span className="font-mono">08:00</span>
      </div>
      <p className="mt-5 text-[14px] text-muted-foreground">{digest.title}</p>
      <p className="mt-1 text-[38px] font-[460] leading-none tracking-[-0.045em]">
        <NumberRoll locales={site.locale} value={inView ? digest.saved : 0} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} duration={1500} />
        <span className="ml-2 text-[15px] font-[480] tracking-[-0.01em] text-mint-ink">saved</span>
      </p>
      <ul className="mt-5 divide-y divide-line border-t border-line">
        {digest.rows.map((row, i) => (
          <li
            key={row.label}
            className="flex items-center justify-between gap-3 py-3 text-[13px]"
            style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(8px)", transition: `all 600ms ${EASE} ${inView ? 500 + i * 140 : 0}ms` }}
          >
            <span className="flex shrink-0 items-center gap-2 whitespace-nowrap text-muted-foreground">
              <span aria-hidden="true" className={`size-1.5 rounded-full ${tones[row.tone]}`} />
              {row.label}
            </span>
            <span className="truncate font-mono text-[12px] text-ink">{row.value}</span>
          </li>
        ))}
      </ul>
      <span className="mt-1 flex items-center gap-1 text-[12.5px] font-[520] text-ink">
        Open the full report
        <ArrowUpRight aria-hidden="true" className="size-3.5" />
      </span>
    </div>
  );
}

export function Benefits() {
  const { benefits } = site;
  return (
    <section id="why" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 md:py-28" aria-labelledby="why-title">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <Reveal className="relative">
          <div className="tone-dark relative isolate flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[28px] bg-ink p-6 sm:aspect-[5/5] lg:aspect-[4/4.4]">
            <GlyphField range={TILE_RANGE} className="-z-10 opacity-70" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_50%_55%,rgba(8,9,11,0.92),transparent_80%)]" />
            <Digest />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Badge>{benefits.badge}</Badge>
          </Reveal>
          <RevealText id="why-title" text={benefits.title} className="mt-5 text-[32px] text-ink sm:text-[40px] md:text-[48px]" />
          <Reveal delay={140} className="mt-4 max-w-[48ch] text-[15.5px] leading-relaxed text-muted-foreground md:text-[17px]">
            <p>{benefits.description}</p>
          </Reveal>
          <Reveal delay={220} className="mt-8">
            <Pill href={benefits.cta.href}>{benefits.cta.label}</Pill>
          </Reveal>
          <ul className="mt-10 border-t border-line">
            {benefits.items.map((item, i) => {
              const Icon = icons[item.icon];
              return (
                <Reveal as="li" key={item.text} delay={i * 90} className="flex items-center gap-4 border-b border-line py-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-mist text-ink">
                    <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
                  </span>
                  <span className="text-[15.5px] text-ink">{item.text}</span>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
