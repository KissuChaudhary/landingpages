"use client";

import * as React from "react";
import { site } from "@/site.config";
import { bookingHref } from "@/lib/links";
import { Button } from "@/components/ui/Button";
import { RevealText, Reveal } from "@/components/motion/Reveal";

/*
 * CLOSING: one berry block. Along its bottom edge, the orders still to come
 * drift past in outline; the strip holds under the pointer and stays still with
 * reduced motion.
 */

export function Closing() {
  const { closing } = site;
  const words = [...closing.marquee, ...closing.marquee];
  return (
    <section id="start" className="px-2 md:px-3" aria-labelledby="closing-title">
      <div className="tone-dark hold relative isolate overflow-hidden rounded-[28px] bg-berry px-4 pb-36 pt-24 text-center md:rounded-[40px] md:pb-56 md:pt-32">
        <div aria-hidden="true" className="absolute inset-x-0 -bottom-6 -z-10 overflow-hidden md:-bottom-10">
          <div className="loop flex w-max animate-[en-marquee_48s_linear_infinite]">
            {words.map((word, i) => (
              <span
                key={i}
                className="display block px-8 text-[110px] leading-none text-transparent md:text-[190px]"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.32)", ["--wdth" as string]: 78 } as React.CSSProperties}
              >
                {word} ·
              </span>
            ))}
          </div>
        </div>
        <RevealText id="closing-title" text={closing.title} className="display mx-auto max-w-[14ch] text-[52px] text-white sm:text-[76px] lg:text-[104px]" />
        <Reveal delay={180} className="mx-auto mt-6 max-w-[44ch] text-[17px] leading-relaxed text-white/80 md:text-[19px]">
          <p>{closing.description}</p>
        </Reveal>
        <Reveal delay={260} className="mt-10 flex justify-center">
          <Button href={bookingHref()} variant="white">
            {closing.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
