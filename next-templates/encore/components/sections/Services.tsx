"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { site } from "@/site.config";
import { asset } from "@/lib/assets";
import { Label } from "@/components/ui/Label";
import { RevealText, Reveal } from "@/components/motion/Reveal";
import { useMotion } from "@/components/motion/MotionProvider";

/*
 * SERVICES: an index on the left, one preview on the right.
 *   index    pointing at (or choosing) a service opens its row: the plus
 *            turns into a cross, the description and deliverables ease open
 *   preview  the panel beside it stays put while you read (sticky) and the
 *            new screen wipes in over the old one from the direction you
 *            moved through the list
 *   phones   the screen opens inside the row instead
 */

const EASE = "cubic-bezier(0.16,1,0.3,1)";

export function Services() {
  const { services } = site;
  const { reduced } = useMotion();
  const [active, setActive] = React.useState(0);
  const [previous, setPrevious] = React.useState<number | null>(null);
  const [dir, setDir] = React.useState(1);

  const choose = (i: number) => {
    if (i === active) return;
    setDir(i > active ? 1 : -1);
    setPrevious(active);
    setActive(i);
  };

  return (
    <section id="services" className="mx-2 rounded-[28px] bg-mist py-20 md:mx-3 md:rounded-[40px] md:py-28" aria-labelledby="services-title">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Reveal>
            <Label>{services.label}</Label>
          </Reveal>
          <RevealText id="services-title" text={services.title} className="display mt-6 text-[44px] text-ink sm:text-[60px] lg:text-[72px]" />
          <Reveal delay={140} className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">
            <p>{services.description}</p>
          </Reveal>

          <ul className="mt-12 border-t border-line">
            {services.items.map((item, i) => {
              const open = i === active;
              return (
                <li key={item.title} className="border-b border-line" onPointerEnter={(e) => e.pointerType === "mouse" && choose(i)}>
                  <button
                    type="button"
                    onClick={() => choose(i)}
                    onFocus={() => choose(i)}
                    aria-expanded={open}
                    aria-controls={`service-${i}`}
                    className="flex w-full items-center gap-5 py-5 text-left md:py-6"
                  >
                    <span className="label w-8 text-subtle">0{i + 1}</span>
                    <span
                      className={`display flex-1 text-[30px] transition-colors duration-300 md:text-[38px] ${open ? "text-ink" : "text-ink/40"}`}
                      style={{ ["--wdth" as string]: 84 }}
                    >
                      {item.title}
                    </span>
                    <span aria-hidden="true" className={`grid size-9 place-items-center rounded-full transition-colors duration-300 ${open ? "bg-berry text-white" : "bg-white text-ink"}`}>
                      <Plus className="size-4" style={{ transform: open ? "rotate(135deg)" : "none", transition: `transform 520ms ${EASE}` }} />
                    </span>
                  </button>
                  <div id={`service-${i}`} className="grid" style={{ gridTemplateRows: open ? "1fr" : "0fr", transition: reduced ? "none" : `grid-template-rows 560ms ${EASE}` }} inert={!open}>
                    <div className="min-h-0 overflow-hidden">
                      <div className="pb-6 pl-[52px]" style={{ opacity: open ? 1 : 0, transition: `opacity 400ms ${EASE} ${open ? 140 : 0}ms` }}>
                        <p className="max-w-[46ch] text-[15.5px] leading-relaxed text-muted-foreground">{item.body}</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {item.deliverables.map((d) => (
                            <li key={d} className="rounded-full border border-line bg-white px-3 py-1 text-[13px] text-ink">
                              {d}
                            </li>
                          ))}
                        </ul>
                        <img src={asset(item.image.src)} alt={item.image.alt} width={760} height={600} loading="lazy" decoding="async" className="mt-6 w-full rounded-[16px] lg:hidden" />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="max-lg:hidden">
          <div className="sticky top-28">
            <div className="relative aspect-[760/600] overflow-hidden rounded-[24px] border border-line bg-white">
              {services.items.map((item, i) => {
                const shown = i === active;
                const leaving = i === previous;
                return (
                  <img
                    key={item.title}
                    src={asset(item.image.src)}
                    alt={shown ? item.image.alt : ""}
                    aria-hidden={shown ? undefined : true}
                    width={760}
                    height={600}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="absolute inset-0 size-full object-cover"
                    style={{
                      zIndex: shown ? 2 : leaving ? 1 : 0,
                      opacity: shown || leaving ? 1 : 0,
                      animation: shown && !reduced ? `${dir > 0 ? "en-wipe-up" : "en-wipe-down"} 760ms ${EASE} both` : "none",
                      transform: leaving && !reduced ? `translateY(${-dir * 4}%) scale(0.98)` : "none",
                      transition: leaving && !reduced ? `transform 760ms ${EASE}, opacity 300ms ease 600ms` : "none",
                    }}
                  />
                );
              })}
            </div>
            <p className="mt-4 flex items-center justify-between text-[13px] text-muted-foreground">
              <span>{services.items[active].title}</span>
              <span className="label">
                0{active + 1} / 0{services.items.length}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
