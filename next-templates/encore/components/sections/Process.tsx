"use client";

import * as React from "react";
import { site } from "@/site.config";
import { auditHref } from "@/lib/links";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { RevealText, Reveal } from "@/components/motion/Reveal";
import { useMotion } from "@/components/motion/MotionProvider";

/*
 * PROCESS: the first ninety days on one line.
 *   scroll   a berry line fills along the timeline as you scroll through the
 *            section (across on wide screens, down on phones); each stage
 *            lights up as the line reaches it, and dims again if you go back
 *   reduced  every stage is lit
 */

export function Process() {
  const { process } = site;
  const { reduced } = useMotion();
  const ref = React.useRef<HTMLOListElement>(null);
  const [reached, setReached] = React.useState(reduced ? process.stages.length : 0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.style.setProperty("--p", "1");
      setReached(process.stages.length);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const wide = window.innerWidth >= 1024;
      // Wide: fill while the row crosses from 80% to 35% of the screen. Phones: follow the column down.
      const p = wide
        ? (vh * 0.8 - rect.top) / (vh * 0.45)
        : (vh * 0.7 - rect.top) / Math.max(1, rect.height);
      const clamped = Math.min(1, Math.max(0, p));
      el.style.setProperty("--p", clamped.toFixed(4));
      const n = process.stages.length;
      // The first stage lights as the line starts; each next one as the line reaches it.
      const count = clamped <= 0 ? 0 : Math.min(n, Math.floor(clamped * (n - 1) + 1.0001));
      setReached((c) => (c === count ? c : count));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduced, process.stages.length]);

  return (
    <section id="process" className="tone-dark mx-2 mt-3 rounded-[28px] bg-ink py-20 md:mx-3 md:rounded-[40px] md:py-28" aria-labelledby="process-title">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Label tone="dark">{process.label}</Label>
            </Reveal>
            <RevealText id="process-title" text={process.title} className="display mt-6 max-w-[16ch] text-[44px] text-white sm:text-[60px] lg:text-[72px]" />
          </div>
          <Reveal delay={200}>
            <Button href={auditHref()} variant="white">
              {process.cta}
            </Button>
          </Reveal>
        </div>

        <ol ref={ref} className="relative mt-16 grid gap-10 pl-8 lg:mt-20 lg:grid-cols-4 lg:gap-6 lg:pl-0 lg:pt-12">
          {/* The line: across the top on wide screens, down the left on phones. */}
          <span aria-hidden="true" className="absolute left-[7px] top-1 bottom-1 w-px bg-white/12 lg:left-0 lg:right-0 lg:top-[7px] lg:bottom-auto lg:h-px lg:w-auto" />
          <span
            aria-hidden="true"
            className="timeline-fill absolute left-[7px] top-1 bottom-1 w-px origin-top bg-berry lg:left-0 lg:right-0 lg:top-[7px] lg:bottom-auto lg:h-px lg:w-auto lg:origin-left"
          />
          {process.stages.map((stage, i) => {
            const lit = i < reached;
            return (
              <li key={stage.title} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-8 top-1 grid size-[15px] place-items-center rounded-full border transition-[background-color,border-color,scale] duration-500 lg:-top-12 lg:left-0 ${
                    lit ? "scale-110 border-berry bg-berry" : "border-white/25 bg-ink"
                  }`}
                >
                  <span className={`size-[5px] rounded-full transition-colors duration-500 ${lit ? "bg-white" : "bg-white/30"}`} />
                </span>
                <p className={`label transition-colors duration-500 ${lit ? "text-berry" : "text-white/40"}`}>{stage.when}</p>
                <h3 className={`display mt-3 text-[36px] transition-colors duration-500 md:text-[44px] ${lit ? "text-white" : "text-white/35"}`}>{stage.title}</h3>
                <p className={`mt-3 max-w-[30ch] text-[15px] leading-relaxed transition-colors duration-500 ${lit ? "text-white/70" : "text-white/35"}`}>{stage.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
