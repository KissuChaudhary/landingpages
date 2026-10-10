"use client";

import type * as React from "react";
import { Check } from "lucide-react";
import { site } from "@/site.config";
import { Label } from "@/components/ui/Label";
import { RevealText, Reveal } from "@/components/motion/Reveal";
import { NumberRoll } from "@/components/hairline/number-roll";
import { useInView } from "@/components/motion/useInView";

/*
 * HOW WE WORK: one big figure and five promises, in a grid.
 * The figure rolls up when it's seen; the tiles rise in one after another.
 * The last tile widens to close the grid, so four to six promises fit cleanly.
 */

export function Why() {
  const { why } = site;
  const [ref, seen] = useInView<HTMLDivElement>();
  const n = why.points.length;
  // Beside the figure: three columns over two rows on wide screens, two columns below it on tablets.
  const lastWide = n >= 4 && n <= 6 ? 7 - n : 1;
  const lastTablet = n % 2 ? 2 : 1;
  return (
    <section className="mx-auto max-w-[1320px] px-4 pb-20 sm:px-6 md:pb-28" aria-labelledby="why-title">
      <Reveal>
        <Label>{why.label}</Label>
      </Reveal>
      <RevealText id="why-title" text={why.title} className="display mt-6 max-w-[18ch] text-[44px] text-ink sm:text-[60px] lg:text-[72px]" />

      <div ref={ref} className="mt-12 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Reveal className="tone-dark relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[26px] bg-berry p-7 text-white md:col-span-2 md:p-9 xl:col-span-1 xl:row-span-2 xl:min-h-full">
          <span aria-hidden="true" className="absolute -right-24 -top-24 size-72 rounded-full border border-white/15" />
          <span aria-hidden="true" className="absolute -right-10 -top-10 size-44 rounded-full border border-white/15" />
          <p className="label text-white/75">Year one</p>
          <div>
            <p className="display whitespace-nowrap text-[110px] leading-[0.85] md:text-[150px] xl:text-[128px]" style={{ ["--wdth" as string]: 78 }}>
              <NumberRoll value={seen ? why.big.value : 0} locales={site.locale} format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }} duration={1500} />
              {why.big.suffix}
            </p>
            <p className="mt-4 max-w-[26ch] text-[16px] leading-snug text-white/85">{why.big.label}</p>
          </div>
        </Reveal>
        {why.points.map((point, i) => (
          <Reveal
            key={point.title}
            delay={80 + i * 70}
            className="flex flex-col rounded-[26px] bg-mist p-6 md:p-7 md:[grid-column:span_var(--span-md)] xl:[grid-column:span_var(--span-lg)]"
            style={{ "--span-md": i === n - 1 ? lastTablet : 1, "--span-lg": i === n - 1 ? lastWide : 1 } as React.CSSProperties}
          >
            <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-white text-berry">
              <Check className="size-4" strokeWidth={2.6} />
            </span>
            <h3 className="mt-8 text-[20px] font-[600] tracking-[-0.02em] text-ink">{point.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{point.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
