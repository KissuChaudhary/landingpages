"use client";

import { TrendingDown, Coins, Timer, GitMerge, BellRing } from "lucide-react";
import { site, type ProofStat } from "@/site.config";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { NumberRoll } from "@/components/hairline/number-roll";
import { BillChart } from "@/components/scenes/BillChart";
import { useScrollProgress } from "@/components/motion/useScrollProgress";
import { useMotion } from "@/components/motion/MotionProvider";

/*
 * PROOF: five figures and the bill they add up to.
 *   spread   on wide screens the outer columns start tucked toward the
 *            middle, slightly turned, and spread to their places as you
 *            scroll (driven by scroll position, not a timer)
 *   settle   once the grid lands, every figure rolls up from zero and the
 *            bill chart draws its line
 *   phones   a plain two-column grid that rises in
 */

const icons = { trend: TrendingDown, coins: Coins, timer: Timer, merge: GitMerge, bell: BellRing };

function Stat({ stat, play, index, className = "" }: { stat: ProofStat; play: boolean; index: number; className?: string }) {
  const Icon = icons[stat.icon];
  return (
    <article className={`flex h-full flex-col rounded-[22px] bg-mist p-5 sm:p-6 ${className}`}>
      <span className="grid size-10 place-items-center rounded-full bg-ink text-mint sm:size-11">
        <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
      </span>
      <p className="mt-auto pt-8 text-[34px] font-[450] leading-none tracking-[-0.045em] text-ink sm:pt-10 sm:text-[44px]">
        <span className="sr-only">
          {stat.prefix}
          {stat.value}
          {stat.suffix}
        </span>
        <span aria-hidden="true" className="tabular">
          {stat.prefix}
          <NumberRoll locales={site.locale} value={play ? stat.value : 0} format={stat.format} duration={1100 + index * 120} />
          {stat.suffix}
        </span>
      </p>
      <h3 className="mt-2 text-[15px] font-[520] tracking-[-0.01em] text-ink">{stat.title}</h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">{stat.body}</p>
    </article>
  );
}

export function Proof() {
  const { proof } = site;
  const { reduced } = useMotion();
  const [ref, settled] = useScrollProgress<HTMLDivElement>({ start: 0.95, end: 0.45, settleAt: 0.72, disabled: reduced });
  const [a, b, c, d, e] = proof.stats;
  return (
    <section id="proof" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 md:py-28" aria-labelledby="proof-title">
      <SectionIntro id="proof-title" badge={proof.badge} title={proof.title} description={proof.description} />
      <div ref={ref} className="spread mt-12 grid grid-cols-2 gap-3 md:mt-16 lg:grid-cols-3 lg:gap-4">
        <div data-col="left" className="contents lg:flex lg:flex-col lg:gap-4">
          <Stat stat={a} play={settled} index={0} />
          <Stat stat={d} play={settled} index={3} />
        </div>
        <div data-col="center" className="col-span-2 flex flex-col gap-3 max-lg:order-first lg:col-span-1 lg:gap-4">
          <div className="max-lg:hidden">
            <Stat stat={b} play={settled} index={1} />
          </div>
          <div className="min-h-[300px] flex-1 lg:min-h-[330px]">
            <BillChart play={settled} />
          </div>
        </div>
        <div className="contents lg:hidden">
          <Stat stat={b} play={settled} index={1} />
        </div>
        <div data-col="right" className="contents lg:flex lg:flex-col lg:gap-4">
          <Stat stat={c} play={settled} index={2} />
          <Stat stat={e} play={settled} index={4} className="max-lg:col-span-2" />
        </div>
      </div>
    </section>
  );
}
