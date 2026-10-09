"use client";

import { site } from "@/site.config";
import { signupHref } from "@/lib/signup";
import { RevealText, Reveal } from "@/components/motion/Reveal";
import { Pill } from "@/components/ui/Pill";
import { GlyphField } from "@/components/motion/GlyphField";

/*
 * CLOSING: the hero's river again, printed in ink on a light panel, with
 * the last call to action over it.
 */

const MASK = { x: 0.5, y: 0.5, rx: 0.42, ry: 0.42 };
const RANGE: [number, number] = [0.18, 0.84];

export function Closing() {
  const { closing } = site;
  return (
    <section id="start" className="px-2 pb-3 md:px-3" aria-labelledby="closing-title">
      <div className="relative isolate overflow-hidden rounded-[26px] border border-line bg-[#f7f9f8] md:rounded-[36px]">
        <GlyphField tone="light" mask={MASK} range={RANGE} className="-z-10" />
        <div className="mx-auto flex max-w-[820px] flex-col items-center px-5 py-24 text-center md:py-36">
          <RevealText id="closing-title" text={closing.title} className="text-[36px] text-ink sm:text-[48px] md:text-[64px]" />
          <Reveal delay={160} className="mt-5 max-w-[46ch] text-[15.5px] leading-relaxed text-muted-foreground md:text-[17px]">
            <p>{closing.description}</p>
          </Reveal>
          <Reveal delay={260} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Pill href={signupHref()}>{closing.primary}</Pill>
            <Pill href={closing.secondary.href} variant="light">
              {closing.secondary.label}
            </Pill>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
