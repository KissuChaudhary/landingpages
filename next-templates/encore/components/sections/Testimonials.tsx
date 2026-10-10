"use client";

import * as React from "react";
import { site } from "@/site.config";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/motion/Reveal";
import { useMotion } from "@/components/motion/MotionProvider";
import { useInView } from "@/components/motion/useInView";

/*
 * WHAT CLIENTS SAY: one quote at a time, large.
 *   index    the brands sit in a list; the one speaking is marked, and a
 *            hairline under it fills while its quote is up
 *   swap     the next quote rises in out of a light blur, from below when you
 *            move down the list and from above when you move up
 *   autoplay advances when the line is full, only while the section is on
 *            screen and nobody is pointing at it; reduced motion stops it
 */

const AUTOPLAY = 7000;

export function Testimonials() {
  const { testimonials } = site;
  const { still } = useMotion();
  const [active, setActive] = React.useState(0);
  const [dir, setDir] = React.useState(1);
  const [hold, setHold] = React.useState(false);
  const [round, setRound] = React.useState(0);
  const [ref, inView] = useInView<HTMLElement>({ once: false, rootMargin: "0px" });
  const tabs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const quote = testimonials.items[active];
  const playing = !still && !hold && inView;

  const select = (i: number) => {
    const next = (i + testimonials.items.length) % testimonials.items.length;
    if (next === active) return;
    setDir(next > active ? 1 : -1);
    setActive(next);
    setRound((r) => r + 1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const n = testimonials.items.length;
    const to = { ArrowRight: active + 1, ArrowDown: active + 1, ArrowLeft: active - 1, ArrowUp: active - 1, Home: 0, End: n - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    const next = (to + n) % n;
    select(next);
    tabs.current[next]?.focus();
  };

  return (
    <section
      ref={ref}
      className="mx-2 rounded-[28px] bg-mist py-20 md:mx-3 md:rounded-[40px] md:py-28"
      aria-label={testimonials.label}
      onPointerEnter={() => setHold(true)}
      onPointerLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={() => setHold(false)}
    >
      <div className="mx-auto grid max-w-[1320px] grid-cols-[minmax(0,1fr)] gap-10 px-4 sm:px-6 lg:grid-cols-[0.42fr_1fr] lg:gap-16">
        <Reveal>
          <Label>{testimonials.label}</Label>
          <ul className="mt-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-col lg:gap-0 lg:border-t lg:border-line [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Clients" onKeyDown={onKeyDown}>
            {testimonials.items.map((item, i) => {
              const selected = i === active;
              return (
                <li key={item.brand} className="shrink-0 lg:border-b lg:border-line">
                  <button
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`quote-tab-${i}`}
                    tabIndex={selected ? 0 : -1}
                    aria-selected={selected}
                    aria-controls="quote-panel"
                    onClick={() => select(i)}
                    className={`relative flex w-full items-center justify-between gap-6 rounded-full border px-4 py-2 text-left transition-colors duration-300 lg:rounded-none lg:border-0 lg:px-0 lg:py-5 ${
                      selected ? "border-ink text-ink" : "border-line text-ink/40 hover:text-ink/70"
                    }`}
                  >
                    <span className="display text-[18px] lg:text-[30px]" style={{ ["--wdth" as string]: 86 }}>
                      {item.brand}
                    </span>
                    <span className="label text-subtle max-lg:hidden">0{i + 1}</span>
                    {selected && (
                      <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px overflow-hidden max-lg:hidden">
                        <span
                          key={round}
                          className="loop block h-full origin-left bg-berry"
                          style={{
                            animation: `en-fill ${AUTOPLAY}ms linear forwards`,
                            animationPlayState: playing ? "running" : "paused",
                          }}
                          onAnimationEnd={() => select(active + 1)}
                        />
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <figure id="quote-panel" role="tabpanel" aria-labelledby={`quote-tab-${active}`} className="relative min-h-[360px] md:min-h-[400px]">
            <div key={active} className="motion-safe:animate-[en-slide-in_700ms_cubic-bezier(0.16,1,0.3,1)_both]" style={{ "--from": `${dir * 28}px` } as React.CSSProperties}>
              <span aria-hidden="true" className="display block text-[120px] leading-[0.6] text-berry">“</span>
              <blockquote className="mt-2 text-[28px] font-[540] leading-[1.18] tracking-[-0.02em] text-ink md:text-[40px]" style={{ fontVariationSettings: '"wdth" 92' }}>
                {quote.quote}
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="flex items-center gap-3">
                  <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-ink text-[13px] font-[600] text-white">
                    {quote.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="block text-[15px] font-[600] text-ink">{quote.name}</span>
                    <span className="block text-[13.5px] text-muted-foreground">
                      {quote.role}, {quote.brand}
                    </span>
                  </span>
                </span>
                <span className="rounded-full bg-berry-wash px-3.5 py-1.5 text-[14px] font-[600] text-berry-ink">{quote.metric}</span>
              </figcaption>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
