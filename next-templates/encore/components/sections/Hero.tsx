"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { site } from "@/site.config";
import { bookingHref } from "@/lib/links";
import { asset } from "@/lib/assets";
import { Button } from "@/components/ui/Button";
import { NumberRoll } from "@/components/hairline/number-roll";
import { TextMorph } from "@/components/hairline/text-morph";
import { LogoMarquee } from "@/components/hairline/logo-marquee";
import { useMotion, usePausedAnimations } from "@/components/motion/MotionProvider";
import { useInView, usePageVisible } from "@/components/motion/useInView";

/*
 * HERO: the promise on the left, the work on the right.
 *   title    words rise in and narrow into place; a hand-drawn loop then
 *            circles the highlighted words
 *   deck     real email designs (images) in a fanned deck. Every few seconds
 *            the front email is pulled out and tucked behind the others while
 *            they step forward; the chip under it names the flow and rolls its
 *            revenue. Pointing at the deck holds it; clicking shows the next.
 *   figures  four results roll up when they reach the screen
 *   brands   a slow strip of client names
 */

const EASE = "cubic-bezier(0.16,1,0.3,1)";
const SLOTS = [
  { x: 0, y: 0, r: -3, s: 1, o: 1 },
  { x: 10, y: 3, r: 3.5, s: 0.95, o: 1 },
  { x: 19, y: 6, r: 8.5, s: 0.9, o: 1 },
  { x: 19, y: 6, r: 8.5, s: 0.9, o: 0 },
];
const slot = (i: number) => SLOTS[Math.min(i, SLOTS.length - 1)];
const transform = (i: number) => {
  const p = slot(i);
  return `translate(${p.x}%, ${p.y}%) rotate(${p.r}deg) scale(${p.s})`;
};

function Deck() {
  const { deck, deckNote } = site.hero;
  const { still, reduced } = useMotion();
  const visible = usePageVisible();
  const [ref, inView] = useInView<HTMLDivElement>({ once: false, rootMargin: "0px" });
  const [order, setOrder] = React.useState(() => deck.map((_, i) => i));
  const [leaving, setLeaving] = React.useState<number | null>(null);
  const [hold, setHold] = React.useState(false);
  const cards = React.useRef<(HTMLDivElement | null)[]>([]);
  const front = deck[order[0]];

  const next = React.useCallback(() => {
    const index = order[0];
    const el = cards.current[index];
    if (el && !reduced) {
      setLeaving(index);
      const back = deck.length - 1;
      el.animate(
        [
          { transform: transform(0), zIndex: 10, offset: 0 },
          { transform: "translate(-58%, -5%) rotate(-15deg) scale(1)", zIndex: 10, offset: 0.42 },
          { transform: transform(back), zIndex: 0, offset: 1 },
        ],
        { duration: 1050, easing: EASE },
      ).finished.then(() => setLeaving((l) => (l === index ? null : l)), () => {});
    }
    setOrder((o) => [...o.slice(1), o[0]]);
  }, [order, reduced, deck.length]);

  React.useEffect(() => {
    if (still || hold || !visible || !inView) return;
    const timer = window.setTimeout(next, 3800);
    return () => window.clearTimeout(timer);
  }, [still, hold, visible, inView, next]);

  return (
    <div ref={ref} className="relative mx-auto w-[min(76vw,360px)] lg:w-[380px] xl:w-[400px]">
      <button
        type="button"
        onClick={next}
        onPointerEnter={() => setHold(true)}
        onPointerLeave={() => setHold(false)}
        onFocus={() => setHold(true)}
        onBlur={() => setHold(false)}
        aria-label={`Showing ${front.flow}. Show the next email.`}
        className="relative block aspect-[600/880] w-full rounded-[18px] outline-offset-8"
      >
        {deck.map((item, i) => {
          const position = order.indexOf(i);
          return (
            <div
              key={item.image.src}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className="absolute inset-0 origin-[50%_90%]"
              style={{
                transform: transform(position),
                opacity: slot(position).o,
                zIndex: deck.length - position,
                transition: reduced || leaving === i ? "none" : `transform 900ms ${EASE}, opacity 500ms ${EASE}`,
              }}
              aria-hidden={position !== 0}
            >
              <img
                src={asset(item.image.src)}
                alt={position === 0 ? item.image.alt : ""}
                width={600}
                height={880}
                draggable={false}
                loading={i < 2 ? "eager" : "lazy"}
                className="size-full rounded-[18px] border border-black/[0.06] bg-white object-cover"
              />
            </div>
          );
        })}
      </button>

      <div className="absolute -bottom-6 -left-4 z-20 flex items-center gap-3 rounded-full border border-line bg-white py-2 pl-2 pr-4 sm:-left-10">
        <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-berry-wash">
          <span className="size-2 rounded-full bg-berry" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[12.5px] text-muted-foreground">
            <TextMorph>{front.flow}</TextMorph>
          </span>
          <span className="text-[16px] font-[600] tracking-[-0.02em] text-ink">
            <NumberRoll value={front.revenue} locales={site.locale} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} />{" "}
            <span className="text-[12.5px] font-[450] text-muted-foreground">{deckNote}</span>
          </span>
        </span>
      </div>
    </div>
  );
}

/** A hand-drawn loop around the highlighted words; it draws itself in. */
function Loop({ draw }: { draw: boolean }) {
  return (
    <svg viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true" className="pointer-events-none absolute -inset-x-[7%] -inset-y-[22%] h-[144%] w-[114%] overflow-visible">
      <path
        d="M318 16C246 3 86 4 34 30 -6 51 14 98 116 109 218 120 362 108 388 73 410 43 362 16 282 12 226 9 170 15 140 21"
        fill="none"
        stroke="var(--berry)"
        strokeWidth="3.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        strokeDasharray="1"
        style={{ strokeDashoffset: draw ? 0 : 1, transition: `stroke-dashoffset 1300ms ${EASE} 800ms` }}
      />
    </svg>
  );
}

export function Hero() {
  const { hero } = site;
  const { still } = useMotion();
  const [entered, setEntered] = React.useState(false);
  const [statsRef, statsSeen] = useInView<HTMLDListElement>();
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  usePausedAnimations(marqueeRef, still);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  let i = 0;
  const lines = hero.title.split("\n");

  return (
    <section id="top" className="relative overflow-hidden" aria-labelledby="hero-title">
      <div aria-hidden="true" className="pointer-events-none absolute right-[-10%] top-[-10%] -z-0 size-[720px] rounded-full bg-[radial-gradient(closest-side,var(--berry-wash),transparent)]" />
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 px-4 pb-20 pt-10 sm:px-6 md:pt-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 lg:pb-24 lg:pt-16">
        <div>
          <div className="fade-up" data-reveal={entered ? "in" : "wait"}>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white py-1.5 pl-2 pr-3.5 text-[13px] text-muted-foreground">
              <span className="flex gap-0.5 rounded-full bg-berry-wash px-1.5 py-1 text-berry" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="size-3 fill-current" strokeWidth={0} />
                ))}
              </span>
              <span>
                <span className="font-[600] text-ink">{hero.rating.score}</span> {hero.rating.label}
              </span>
            </p>
          </div>

          <h1
            id="hero-title"
            data-reveal={entered ? "in" : "wait"}
            style={{ "--base": "60ms" } as React.CSSProperties}
            className="display mt-7 text-[56px] text-ink sm:text-[80px] lg:text-[100px] xl:text-[112px]"
          >
            {lines.map((line, l) => {
              const words = line.split(" ").map((word, w, all) => (
                <React.Fragment key={w}>
                  <span className="reveal-word" style={{ "--i": i++ } as React.CSSProperties}>
                    {word}
                  </span>
                  {w < all.length - 1 ? " " : null}
                </React.Fragment>
              ));
              return (
                <React.Fragment key={l}>
                  {l > 0 && " "}
                  {line === hero.highlight ? (
                    <span className="relative inline-block text-berry">
                      {words}
                      <Loop draw={entered} />
                    </span>
                  ) : (
                    words
                  )}
                  {l < lines.length - 1 && <br className="max-sm:hidden" />}
                </React.Fragment>
              );
            })}
          </h1>

          <div className="fade-up mt-7 max-w-[520px]" data-reveal={entered ? "in" : "wait"} style={{ "--delay": "380ms" } as React.CSSProperties}>
            <p className="text-[16.5px] leading-relaxed text-muted-foreground md:text-[18px]">{hero.description}</p>
          </div>
          <div className="fade-up mt-9 flex flex-wrap items-center gap-3" data-reveal={entered ? "in" : "wait"} style={{ "--delay": "480ms" } as React.CSSProperties}>
            <Button href={bookingHref()}>{hero.primary}</Button>
            <Button href={hero.secondary.href} variant="outline">
              {hero.secondary.label}
            </Button>
          </div>
        </div>

        <div className="fade-up pb-6" data-reveal={entered ? "in" : "wait"} style={{ "--delay": "260ms" } as React.CSSProperties}>
          <Deck />
        </div>
      </div>

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6">
        <dl ref={statsRef} className="grid grid-cols-2 border-y border-line lg:grid-cols-4">
          {hero.stats.map((stat, s) => (
            <div key={stat.label} className={`px-1 py-6 sm:px-5 md:py-8 ${s % 2 ? "border-l border-line pl-4 sm:pl-6" : ""} ${s > 1 ? "max-lg:border-t max-lg:border-line" : ""} ${s === 2 ? "lg:border-l lg:border-line lg:pl-6" : ""}`}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="display block text-[44px] text-ink md:text-[56px]" style={{ ["--wdth" as string]: 84 }}>
                  {stat.prefix}
                  <NumberRoll value={statsSeen ? stat.value : 0} format={stat.format} locales={site.locale} duration={1200 + s * 150} />
                  {stat.suffix}
                </span>
                <span aria-hidden="true" className="mt-2 block max-w-[24ch] text-[13.5px] leading-snug text-muted-foreground">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-5 py-10 md:flex-row md:items-center md:gap-10">
          <p className="label shrink-0 text-muted-foreground">{hero.brandsLabel}</p>
          <div ref={marqueeRef} className="min-w-0 flex-1">
            <LogoMarquee
              speed={34}
              gap={56}
              aria-label="Clients"
              logos={hero.brands.map((name) => (
                <span key={name} className="display text-[26px] text-current" style={{ ["--wdth" as string]: 90 }}>
                  {name}
                </span>
              ))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
