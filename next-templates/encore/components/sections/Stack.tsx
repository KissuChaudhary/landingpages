"use client";

import { site } from "@/site.config";
import { Label } from "@/components/ui/Label";
import { Mark } from "@/components/ui/Brand";
import { RevealText, Reveal } from "@/components/motion/Reveal";

/*
 * STACK: the tools we connect, in orbit around the studio.
 * Two rings turn slowly in opposite directions while each name stays upright.
 * They hold while the pointer rests on them and stay still with reduced motion.
 */

function Ring({ tools, size, duration, reverse = false }: { tools: string[]; size: number; duration: number; reverse?: boolean }) {
  const spin = reverse ? "en-counter" : "en-orbit";
  const counter = reverse ? "en-orbit" : "en-counter";
  return (
    <div
      className="loop absolute left-1/2 top-1/2 rounded-full border border-line"
      style={{ width: `${size}%`, aspectRatio: "1", translate: "-50% -50%", animation: `${spin} ${duration}s linear infinite` }}
    >
      {tools.map((tool, i) => {
        const angle = (i / tools.length) * 360 + (reverse ? 45 : 0);
        return (
          <div key={tool} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${angle}deg) translateY(-${size / 2}cqw) rotate(${-angle}deg)` }}>
            <span
              className="block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-line bg-white px-3 py-1.5 text-[12.5px] font-[560] sm:px-4 sm:py-2 sm:text-[14px] text-ink"
              style={{ animation: `${counter} ${duration}s linear infinite` }}
            >
              {tool}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function Stack() {
  const { stack } = site;
  const half = Math.ceil(stack.tools.length / 2);
  return (
    <section className="mx-auto grid max-w-[1320px] overflow-x-clip items-center gap-12 px-4 pb-20 sm:px-6 md:pb-28 lg:grid-cols-[0.9fr_1.1fr]" aria-labelledby="stack-title">
      <div>
        <Reveal>
          <Label>{stack.label}</Label>
        </Reveal>
        <RevealText id="stack-title" text={stack.title} className="display mt-6 max-w-[14ch] text-[44px] text-ink sm:text-[60px] lg:text-[72px]" />
        <Reveal delay={140} className="mt-5 max-w-[44ch] text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">
          <p>{stack.description}</p>
        </Reveal>
        <ul className="sr-only">
          {stack.tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
      <Reveal delay={100}>
        <div aria-hidden="true" className="hold relative mx-auto aspect-square w-full max-w-[560px] [container-type:inline-size]">
          <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(closest-side,var(--berry-wash),transparent)]" />
          <div className="absolute inset-[8%] [container-type:inline-size]">
            <Ring tools={stack.tools.slice(0, half)} size={92} duration={70} />
          </div>
          <div className="absolute inset-[28%] [container-type:inline-size]">
            <Ring tools={stack.tools.slice(half)} size={92} duration={52} reverse />
          </div>
          <div className="absolute left-1/2 top-1/2 grid size-[18%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[28%] bg-berry">
            <Mark className="size-[62%] text-berry" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
