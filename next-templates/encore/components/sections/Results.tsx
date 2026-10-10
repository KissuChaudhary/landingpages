"use client";

import * as React from "react";
import { site } from "@/site.config";
import { asset } from "@/lib/assets";
import { bookingHref } from "@/lib/links";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { RevealText, Reveal } from "@/components/motion/Reveal";
import { NumberRoll } from "@/components/hairline/number-roll";
import { useInView } from "@/components/motion/useInView";
import { useMotion } from "@/components/motion/MotionProvider";

/*
 * RESULTS: one case told properly, then a ledger of others.
 *   featured  the metrics roll up and the chart rises in when they're seen
 *   ledger    on a desktop, the email behind a result floats beside the
 *             pointer while you read the row, trailing it slightly and tilting
 *             with its movement; on phones each row shows a thumbnail
 */

function Featured() {
  const { featured } = site.results;
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="grid gap-3 lg:grid-cols-[0.92fr_1.08fr]">
      <Reveal className="flex flex-col justify-between rounded-[26px] bg-mist p-6 md:p-9">
        <div>
          <p className="label text-muted-foreground">
            {featured.brand} · {featured.category}
          </p>
          <h3 className="display mt-5 text-[36px] text-ink md:text-[46px]">{featured.headline}</h3>
          <blockquote className="mt-6 max-w-[48ch] text-[16px] leading-relaxed text-ink/80">“{featured.quote}”</blockquote>
          <p className="mt-3 text-[14px] text-muted-foreground">{featured.person}</p>
        </div>
        <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6">
          {featured.metrics.map((m, i) => (
            <div key={m.label}>
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="display block whitespace-nowrap text-[28px] text-ink sm:text-[34px] md:text-[44px]" style={{ ["--wdth" as string]: 84 }}>
                  {m.prefix}
                  <NumberRoll value={seen ? m.value : 0} format={m.format} locales={site.locale} duration={1200 + i * 150} />
                  {m.suffix}
                </span>
                <span aria-hidden="true" className="mt-1 block text-[13px] leading-snug text-muted-foreground">
                  {m.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
      <Reveal delay={120} className="overflow-hidden rounded-[26px] border border-line bg-white p-2">
        <Screen image={featured.image} width={760} height={480} show={seen} className="h-auto w-full rounded-[20px]" />
      </Reveal>
    </div>
  );
}

function Ledger() {
  const { rows } = site.results;
  const { reduced } = useMotion();
  const wrap = React.useRef<HTMLDivElement>(null);
  const card = React.useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const target = React.useRef({ x: 0, y: 0 });
  const pos = React.useRef({ x: 0, y: 0, tilt: 0 });
  const frame = React.useRef(0);

  // The preview trails the pointer and leans in the direction it moves.
  const tick = React.useCallback(() => {
    const el = card.current;
    if (!el) return;
    const p = pos.current;
    const t = target.current;
    const dx = t.x - p.x;
    p.x += dx * 0.16;
    p.y += (t.y - p.y) * 0.16;
    p.tilt += (Math.max(-10, Math.min(10, dx * 0.12)) - p.tilt) * 0.12;
    el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) rotate(${p.tilt}deg)`;
    if (Math.abs(dx) > 0.3 || Math.abs(t.y - p.y) > 0.3 || Math.abs(p.tilt) > 0.05) frame.current = requestAnimationFrame(tick);
    else frame.current = 0;
  }, []);

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !wrap.current) return;
    const rect = wrap.current.getBoundingClientRect();
    target.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (reduced) {
      pos.current = { ...target.current, tilt: 0 };
      if (card.current) card.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px) translate(-50%, -50%)`;
      return;
    }
    if (!frame.current) frame.current = requestAnimationFrame(tick);
  };

  React.useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <div ref={wrap} className="relative mt-3" onPointerMove={move} onPointerLeave={() => setHovered(null)}>
      <ul className="border-t border-line">
        {rows.map((row, i) => (
          <Reveal as="li" key={row.brand + row.result} delay={i * 70} className="border-b border-line">
            <div
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                if (hovered === null && wrap.current) {
                  const rect = wrap.current.getBoundingClientRect();
                  pos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, tilt: 0 };
                }
                setHovered(i);
              }}
              className={`group grid grid-cols-[56px_1fr] items-center gap-x-4 gap-y-1 py-5 transition-colors duration-300 md:grid-cols-[1.1fr_0.8fr_1.1fr_1.3fr] md:gap-6 md:py-7 ${hovered === i ? "text-ink" : ""}`}
            >
              <img src={asset(row.image.src)} alt="" width={56} height={82} loading="lazy" className="row-span-2 h-[82px] w-14 rounded-[8px] border border-line object-cover md:hidden" />
              <p className="display text-[26px] text-ink md:text-[32px]" style={{ ["--wdth" as string]: 86 }}>
                {row.brand}
              </p>
              <p className="label text-muted-foreground max-md:hidden">{row.category}</p>
              <p className="text-[17px] font-[600] tracking-[-0.01em] text-berry-ink md:text-[20px]">{row.result}</p>
              <p className="text-[14.5px] text-muted-foreground max-md:col-start-2">{row.detail}</p>
            </div>
          </Reveal>
        ))}
      </ul>
      <div
        ref={card}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 w-[220px] max-md:hidden"
        style={{ opacity: hovered === null ? 0 : 1, transition: "opacity 260ms ease" }}
      >
        {rows.map((row, i) => (
          <img
            key={row.brand + row.result}
            src={asset(row.image.src)}
            alt=""
            width={600}
            height={880}
            loading="lazy"
            className="absolute inset-x-0 top-0 h-auto w-full rounded-[14px] border border-black/[0.06]"
            style={{
              opacity: hovered === i ? 1 : 0,
              transform: hovered === i ? "scale(1)" : "scale(0.92)",
              transition: "opacity 300ms ease, transform 500ms cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        ))}
        <span className="block aspect-[600/880]" />
      </div>
    </div>
  );
}

export function Results() {
  const { results } = site;
  return (
    <section id="results" className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 md:py-28" aria-labelledby="results-title">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <Label>{results.label}</Label>
          </Reveal>
          <RevealText id="results-title" text={results.title} className="display mt-6 max-w-[17ch] text-[44px] text-ink sm:text-[60px] lg:text-[72px]" />
        </div>
        <Reveal delay={160}>
          <Button href={bookingHref(results.cta.href)} variant="ink">
            {results.cta.label}
          </Button>
        </Reveal>
      </div>
      <div className="mt-12 md:mt-16">
        <Featured />
        <Ledger />
      </div>
    </section>
  );
}
