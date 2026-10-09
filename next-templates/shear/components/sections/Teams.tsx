"use client";

import * as React from "react";
import { site } from "@/site.config";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";
import { Pill } from "@/components/ui/Pill";
import { NumberRoll } from "@/components/hairline/number-roll";
import { asset } from "@/lib/assets";
import { useMotion } from "@/components/motion/MotionProvider";
import { useInView } from "@/components/motion/useInView";

/*
 * TEAMS: one panel, four audiences.
 *   tabs     the white thumb is thrown to the chosen tab; while nobody is
 *            pointing at the section, a hairline fills under the active tab
 *            and the next one takes over when it is full
 *   copy     the new copy slides in from the side you moved toward, through
 *            a light blur
 *   field    the light field blends to the team colours, and its card slides
 *            over to the next one from the side you moved toward
 * Arrow keys, Home and End move between tabs.
 */

const EASE = "cubic-bezier(0.16,1,0.3,1)";
const THROW = "cubic-bezier(0.34,1.36,0.64,1)";
const AUTOPLAY = 7000;

export function Teams() {
  const { teams } = site;
  const { still, reduced } = useMotion();
  const [active, setActive] = React.useState(0);
  const [dir, setDir] = React.useState(1);
  const [holding, setHolding] = React.useState(false);
  const [round, setRound] = React.useState(0);
  const [ref, inView] = useInView<HTMLDivElement>({ once: false, rootMargin: "0px" });
  const [statRef, statSeen] = useInView<HTMLDivElement>();
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [thumb, setThumb] = React.useState({ left: 0, width: 0, ready: false });
  const tab = teams.tabs[active];
  const autoplay = !still && !holding && inView;

  React.useLayoutEffect(() => {
    const measure = () => {
      const el = tabRefs.current[active];
      if (!el) return;
      setThumb((t) => (t.left === el.offsetLeft && t.width === el.offsetWidth ? t : { left: el.offsetLeft, width: el.offsetWidth, ready: t.width > 0 }));
    };
    measure();
    const observer = new ResizeObserver(measure);
    tabRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [active]);

  const select = (next: number, focus = false) => {
    const i = (next + teams.tabs.length) % teams.tabs.length;
    if (i === active) return;
    setDir(i > active ? 1 : -1);
    setActive(i);
    setRound((r) => r + 1);
    if (focus) tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: teams.tabs.length - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    select(keys[e.key], true);
  };

  return (
    <section id="teams" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 md:py-28" aria-labelledby="teams-title">
      <SectionIntro id="teams-title" align="center" badge={teams.badge} title={teams.title} description={teams.description} />

      <div
        ref={ref}
        onPointerEnter={() => setHolding(true)}
        onPointerLeave={() => setHolding(false)}
        onFocusCapture={() => setHolding(true)}
        onBlurCapture={() => setHolding(false)}
      >
        <Reveal className="mt-12 md:mt-14">
          <div role="tablist" aria-label="Teams" onKeyDown={onKeyDown} className="relative grid grid-cols-4 rounded-[20px] border border-line bg-mist p-1 md:rounded-full">
            <span
              aria-hidden="true"
              className="absolute inset-y-1 left-0 rounded-[16px] bg-white shadow-[0_0_0_1px_var(--line)] md:rounded-full"
              style={{
                width: thumb.width,
                transform: `translateX(${thumb.left}px)`,
                transition: thumb.ready && !reduced ? `transform 560ms ${THROW}, width 420ms ${EASE}` : "none",
              }}
            />
            {teams.tabs.map((t, i) => {
              const selected = i === active;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`team-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls="team-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  className={`relative h-11 overflow-hidden rounded-[16px] px-2 text-[13px] font-[520] transition-colors duration-300 sm:text-[14px] md:h-12 md:rounded-full ${
                    selected ? "text-ink" : "text-muted-foreground hover:text-ink"
                  }`}
                >
                  {t.label}
                  {selected && autoplay && (
                    <span aria-hidden="true" className="absolute inset-x-6 bottom-1.5 h-px overflow-hidden rounded-full bg-line">
                      <span
                        key={round}
                        className="loop block h-full origin-left bg-ink animate-[sh-tab-fill_linear_forwards]"
                        style={{ animationDuration: `${AUTOPLAY}ms` }}
                        onAnimationEnd={() => select(active + 1)}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-3">
          <div
            id="team-panel"
            role="tabpanel"
            aria-labelledby={`team-tab-${tab.id}`}
            className="grid gap-2 rounded-[28px] border border-line bg-white p-2 md:grid-cols-[1fr_1.05fr]"
          >
            <div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden p-5 md:min-h-[440px] md:p-9">
              <div key={active} className="motion-safe:animate-[sh-slide-in_640ms_cubic-bezier(0.16,1,0.3,1)_both]" style={{ "--from": `${dir * 36}px` } as React.CSSProperties}>
                <p className="text-[14px] text-subtle">{tab.label}</p>
                <h3 className="mt-3 max-w-[18ch] text-[28px] font-[460] leading-[1.08] tracking-[-0.035em] text-ink md:text-[36px]">{tab.title}</h3>
                <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-muted-foreground">{tab.body}</p>
              </div>
              <div ref={statRef} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Pill href={teams.cta.href} variant="ink">
                  {teams.cta.label}
                </Pill>
                <div>
                  <p className="text-[20px] font-[500] leading-none tracking-[-0.03em] text-ink">
                    <NumberRoll locales={site.locale} value={statSeen ? teams.stat.value : 0} format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} duration={1600} />
                  </p>
                  <p className="mt-1.5 text-[13px] text-muted-foreground">{teams.stat.label}</p>
                </div>
              </div>
            </div>

            <div
              className="light-field relative min-h-[300px] overflow-hidden rounded-[22px] md:min-h-0"
              style={{ "--c1": tab.colors[0], "--c2": tab.colors[1], "--c3": tab.colors[2] } as React.CSSProperties}
            >
              <div aria-hidden="true" className="loop absolute inset-0 animate-[sh-drift_16s_ease-in-out_infinite] bg-[radial-gradient(40%_40%_at_70%_70%,rgba(255,255,255,0.7),transparent_70%)]" />
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(rgba(8,9,11,0.08)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_bottom,transparent,#000_40%)]" />
              <div className="absolute inset-x-5 bottom-5 aspect-[300/112] md:inset-x-auto md:bottom-9 md:right-9 md:w-[300px]">
                {teams.tabs.map((t, i) => {
                  const offset = i === active ? 0 : (i < active ? -1 : 1) * 28;
                  return (
                    <img
                      key={t.id}
                      src={asset(t.card.src)}
                      alt={i === active ? t.card.alt : ""}
                      aria-hidden={i === active ? undefined : true}
                      width={300}
                      height={112}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 size-full"
                      style={{
                        opacity: i === active ? 1 : 0,
                        transform: `translateX(${offset}px)`,
                        filter: i === active ? "none" : "blur(6px)",
                        transition: reduced ? "none" : `opacity 420ms ${EASE} ${i === active ? 120 : 0}ms, transform 620ms ${EASE}, filter 420ms ${EASE}`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
