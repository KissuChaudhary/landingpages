"use client";

import { site } from "@/site.config";
import { RevealText, Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Pill } from "@/components/ui/Pill";
import { FaqAccordion } from "@/components/hairline/faq-accordion";

/*
 * FAQ: the intro stays beside the questions on wide screens.
 * Questions are the Hairline UI FAQ accordion: answers ease open to their
 * real height out of a light blur, the plus folds into a minus, and arrow
 * keys move between questions.
 */

export function Faq() {
  const { faq } = site;
  return (
    <section id="faq" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 md:py-28" aria-labelledby="faq-title">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Badge>{faq.badge}</Badge>
          </Reveal>
          <RevealText id="faq-title" text={faq.title} className="mt-5 text-[32px] text-ink sm:text-[40px] md:text-[52px]" />
          <Reveal delay={140} className="mt-4 max-w-[40ch] text-[15.5px] leading-relaxed text-muted-foreground md:text-[17px]">
            <p>{faq.description}</p>
          </Reveal>
          <Reveal delay={220} className="mt-8">
            <Pill href={faq.cta.href} variant="ink">
              {faq.cta.label}
            </Pill>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <FaqAccordion items={faq.items} defaultOpen={[0]} className="[&_button]:text-[16px] [&_button]:md:text-[17px]" />
        </Reveal>
      </div>
    </section>
  );
}
