"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { site, type Feature } from "@/site.config";
import { asset } from "@/lib/assets";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/motion/Reveal";
import { FeatureVisual } from "@/components/scenes/FeatureVisual";
import { NumberRoll } from "@/components/hairline/number-roll";
import { useSeen } from "@/components/motion/useInView";

/*
 * PRODUCT: a row of wide feature cards.
 *   scroll   native horizontal scrolling with snap points, so touch,
 *            trackpads and keyboards just work; on desktop you can also
 *            drag the row
 *   arrows   step one card at a time; the counter rolls and the hairline
 *            under the row fills with your position
 *   cards    each product scene plays the first time its card is on screen
 *            and keeps its final state; its loops rest while off screen
 */

function Card({ feature, index }: { feature: Feature; index: number }) {
  // Scenes play the first time they are seen and keep their final state; loops rest off screen.
  const [ref, seen, visible] = useSeen<HTMLLIElement>("0px -10% 0px -10%");
  return (
    <li
      ref={ref}
      data-card
      className={`grid w-[86vw] shrink-0 snap-start grid-rows-[auto_1fr] gap-2 rounded-[26px] border border-line bg-white p-2 sm:w-[560px] md:w-[640px] md:grid-cols-[1.05fr_1fr] md:grid-rows-1 ${visible ? "" : "[&_.loop]:[animation-play-state:paused]"}`}
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${site.product.features.length}: ${feature.title}`}
    >
      <div className="aspect-[4/3] md:aspect-auto md:h-[330px]">
        {feature.image ? (
          <img src={asset(feature.image)} alt="" className="size-full rounded-[18px] object-cover" draggable={false} />
        ) : (
          <FeatureVisual kind={feature.visual} glow={feature.glow} play={seen} />
        )}
      </div>
      <div className="flex flex-col justify-end p-4 md:p-6">
        <span className="font-mono text-[12px] text-subtle">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="mt-3 text-[22px] font-[480] tracking-[-0.03em] text-ink md:text-[26px]">{feature.title}</h3>
        <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">{feature.body}</p>
      </div>
    </li>
  );
}

export function Features() {
  const { product } = site;
  const trackRef = React.useRef<HTMLUListElement>(null);
  const barRef = React.useRef<HTMLSpanElement>(null);
  const [active, setActive] = React.useState(0);
  const [edges, setEdges] = React.useState({ start: true, end: false });
  const drag = React.useRef<{ x: number; left: number; moved: boolean } | null>(null);

  // Position: the hairline fills and the counter follows the nearest card.
  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = track.scrollWidth - track.clientWidth;
      const p = max > 0 ? track.scrollLeft / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.max(0.04, p)})`;
      const card = track.querySelector<HTMLElement>("[data-card]");
      const step = card ? card.offsetWidth + 12 : 1;
      const index = Math.min(product.features.length - 1, Math.round(track.scrollLeft / step));
      setActive(p > 0.995 ? product.features.length - 1 : index);
      setEdges((e) => {
        const next = { start: track.scrollLeft < 4, end: track.scrollLeft > max - 4 };
        return e.start === next.start && e.end === next.end ? e : next;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [product.features.length]);

  const step = (dir: number) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-card]");
    if (!track || !card) return;
    track.scrollBy({ left: dir * (card.offsetWidth + 12), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  // Drag to scroll with a mouse; touch and trackpads scroll natively.
  const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      e.currentTarget.style.scrollSnapType = "none";
      e.currentTarget.style.scrollBehavior = "auto";
    }
    if (d.moved) e.currentTarget.scrollLeft = d.left - dx;
  };
  const endDrag = (e: React.PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    const track = e.currentTarget;
    track.style.scrollBehavior = "";
    // Let snap settle the row on the nearest card.
    requestAnimationFrame(() => (track.style.scrollSnapType = ""));
  };

  return (
    <section id="product" className="mx-2 rounded-[26px] bg-mist py-20 md:mx-3 md:rounded-[36px] md:py-28" aria-labelledby="product-title">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <SectionIntro id="product-title" badge={product.badge} title={product.title} description={product.description}>
          <Pill href={product.cta.href} variant="ink">
            {product.cta.label}
          </Pill>
        </SectionIntro>
      </div>

      <Reveal className="mt-12 md:mt-16">
        <ul
          ref={trackRef}
          tabIndex={0}
          aria-label="Product features"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={(e) => drag.current?.moved && e.preventDefault()}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-1 outline-none [scrollbar-width:none] sm:px-6 md:cursor-grab md:active:cursor-grabbing xl:px-[max(1.5rem,calc((100%-1280px)/2+1.5rem))] [&::-webkit-scrollbar]:hidden"
          style={{ scrollPaddingInline: "max(1rem, calc((100% - 1280px) / 2 + 1.5rem))" }}
        >
          {product.features.map((feature, i) => (
            <Card key={feature.title} feature={feature} index={i} />
          ))}
          <li aria-hidden="true" className="w-1 shrink-0" />
        </ul>
      </Reveal>

      <div className="mx-auto mt-8 flex max-w-[1280px] items-center gap-5 px-4 sm:px-6">
        <span className="font-mono text-[13px] text-muted-foreground tabular" aria-live="polite">
          <NumberRoll locales={site.locale} value={active + 1} format={{ minimumIntegerDigits: 2 }} /> / {String(product.features.length).padStart(2, "0")}
        </span>
        <span aria-hidden="true" className="relative h-px flex-1 overflow-hidden bg-line">
          <span ref={barRef} className="absolute inset-0 origin-left bg-ink transition-transform duration-150" style={{ transform: "scaleX(0.04)" }} />
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={edges.start}
            aria-label="Previous feature"
            className="grid size-11 place-items-center rounded-full bg-ink text-white transition-[opacity,scale] duration-300 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
          >
            <ChevronLeft aria-hidden="true" className="size-[18px]" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={edges.end}
            aria-label="Next feature"
            className="grid size-11 place-items-center rounded-full bg-ink text-mint transition-[opacity,scale] duration-300 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
          >
            <ChevronRight aria-hidden="true" className="size-[18px]" />
          </button>
        </div>
      </div>
    </section>
  );
}
