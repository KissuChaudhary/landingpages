"use client";

import { site } from "@/site.config";
import { bookingHref } from "@/lib/links";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { RevealText, Reveal } from "@/components/motion/Reveal";
import { FaqAccordion } from "@/components/hairline/faq-accordion";

/*
 * FAQ: questions on the right (Hairline UI FAQ accordion: answers open to
 * their real height out of a light blur, the plus folds into a minus, arrow
 * keys move between questions), and the founder beside them for anyone who'd
 * rather talk.
 */

export function Faq() {
  const { faq } = site;
  const initials = faq.founder.name
    .split(" ")
    .map((p) => p[0])
    .join("");
  return (
    <section id="faq" className="mx-auto max-w-[1320px] px-4 pb-20 sm:px-6 md:pb-28" aria-labelledby="faq-title">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Label>{faq.label}</Label>
          </Reveal>
          <RevealText id="faq-title" text={faq.title} className="display mt-6 text-[44px] text-ink sm:text-[60px] lg:text-[72px]" />
          <Reveal delay={160} className="mt-10">
            <div className="rounded-[26px] border border-line p-6">
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="grid size-14 place-items-center rounded-full bg-berry text-[17px] font-[600] text-white">
                  {initials}
                </span>
                <div>
                  <p className="text-[17px] font-[600] tracking-[-0.01em] text-ink">{faq.founder.name}</p>
                  <p className="text-[14px] text-muted-foreground">{faq.founder.role}</p>
                </div>
              </div>
              <p className="mt-5 text-[15.5px] leading-relaxed text-ink/80">{faq.founder.note}</p>
              <Button href={bookingHref()} variant="ink" size="sm" className="mt-5">
                {faq.founder.cta}
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <FaqAccordion items={faq.items} defaultOpen={[0]} className="[&_button]:text-[17px] [&_button]:md:text-[18.5px]" />
        </Reveal>
      </div>
    </section>
  );
}
