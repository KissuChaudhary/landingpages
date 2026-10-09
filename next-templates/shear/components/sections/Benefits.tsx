"use client";

import * as React from "react";
import { Clock, TrendingDown, BellRing, ShieldCheck } from "lucide-react";
import { site } from "@/site.config";
import { RevealText, Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Pill } from "@/components/ui/Pill";
import { GlyphField } from "@/components/motion/GlyphField";
import { Screen } from "@/components/ui/Screen";
import { useInView } from "@/components/motion/useInView";

/*
 * WHY SHEAR: the Monday digest beside four reasons.
 *   tile     a quieter glyph river runs behind the digest card
 *   digest   the digest (an image) rises in out of a light blur
 *   list     each reason rises in on its own hairline
 */

const icons = { clock: Clock, trend: TrendingDown, bell: BellRing, shield: ShieldCheck };
const TILE_RANGE: [number, number] = [0.1, 0.92];

/** The Monday digest is an image that rises in when it reaches the screen. */
function Digest() {
  const { digest } = site.benefits;
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="w-full max-w-[380px]">
      <Screen image={digest} width={380} height={332} show={inView} className="h-auto w-full" />
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
