"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { site } from "@/site.config";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";
import { Screen } from "@/components/ui/Screen";
import { useSeen } from "@/components/motion/useInView";

/*
 * HOW IT WORKS: three steps in one row.
 *   desktop  the step you point at (or focus) widens and its scene slides
 *            in beside the copy; the others narrow to their titles
 *   phones   a vertical accordion: tap a step to open its scene
 * Each step's screen arrives out of a light blur when its step opens.
 */

const EASE = "cubic-bezier(0.16,1,0.3,1)";

export function Steps() {
  const { steps } = site;
  const [active, setActive] = React.useState(0);
  const [ref, seen] = useSeen<HTMLDivElement>();

  const scene = (i: number) => (
    <Screen image={steps.items[i].image} width={420} height={470} show={seen && active === i} className="size-full rounded-[18px] bg-ink object-cover" />
  );

  return (
    <section id="how" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 md:py-28" aria-labelledby="how-title">
      <SectionIntro id="how-title" align="center" badge={steps.badge} title={steps.title} description={steps.description} />

      <div ref={ref}>
        {/* Wide screens: the row that opens where you point. */}
        <Reveal className="mt-14 flex h-[460px] gap-3 max-lg:hidden">
          {steps.items.map((step, i) => {
            const open = active === i;
            return (
              <div
                key={step.title}
                onPointerEnter={() => setActive(i)}
                className="relative flex min-w-0 overflow-hidden rounded-[26px] border border-line bg-mist p-2"
                style={{ flexGrow: open ? 2.35 : 1, flexBasis: 0, transition: `flex-grow 760ms ${EASE}, background-color 400ms` }}
              >
                <button
                  type="button"
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={open}
                  aria-controls={`step-scene-${i}`}
                  className="flex w-[270px] shrink-0 flex-col justify-between rounded-[18px] p-5 text-left"
                >
                  <span className="font-mono text-[13px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block text-[24px] font-[480] leading-tight tracking-[-0.03em] text-ink">{step.title}</span>
                    <span className="mt-2.5 block text-[14px] leading-relaxed text-muted-foreground">{step.body}</span>
                  </span>
                </button>
                <div
                  id={`step-scene-${i}`}
                  className="min-w-[340px] flex-1"
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "none" : "translateX(24px)",
                    filter: open ? "none" : "blur(6px)",
                    transition: `opacity 500ms ${EASE} ${open ? 220 : 0}ms, transform 760ms ${EASE} ${open ? 160 : 0}ms, filter 500ms ${EASE} ${open ? 200 : 0}ms`,
                  }}
                  inert={!open}
                >
                  {scene(i)}
                </div>
              </div>
            );
          })}
        </Reveal>

        {/* Phones and tablets: tap to open. */}
        <div className="mt-10 space-y-3 lg:hidden">
          {steps.items.map((step, i) => {
            const open = active === i;
            return (
              <Reveal key={step.title} delay={i * 80} className="rounded-[22px] border border-line bg-mist p-2">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={open}
                  aria-controls={`step-panel-${i}`}
                  className="flex w-full items-center gap-4 rounded-[16px] p-3 text-left"
                >
                  <span className="font-mono text-[12px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-[18px] font-[480] tracking-[-0.02em] text-ink">{step.title}</span>
                  <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-white">
                    <Plus className="size-4 text-ink" style={{ transform: open ? "rotate(135deg)" : "none", transition: `transform 520ms ${EASE}` }} />
                  </span>
                </button>
                <div id={`step-panel-${i}`} className="grid" style={{ gridTemplateRows: open ? "1fr" : "0fr", transition: `grid-template-rows 560ms ${EASE}` }} inert={!open}>
                  <div className="min-h-0 overflow-hidden">
                    <p className="px-3 pb-4 text-[14px] leading-relaxed text-muted-foreground">{step.body}</p>
                    <div className="aspect-[420/470] w-full">{scene(i)}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
