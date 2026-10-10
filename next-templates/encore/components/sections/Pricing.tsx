"use client";

import { Check } from "lucide-react";
import { site } from "@/site.config";
import { auditHref, bookingHref } from "@/lib/links";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { RevealText, Reveal } from "@/components/motion/Reveal";

/*
 * PRICING: three ways to work together. Each button goes to its own `href`;
 * empty, the free audit goes to links.audit (or booking) and the retainers
 * go to links.booking.
 */

export function Pricing() {
  const { pricing } = site;
  return (
    <section id="pricing" className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 md:py-28" aria-labelledby="pricing-title">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
        <div>
          <Reveal>
            <Label>{pricing.label}</Label>
          </Reveal>
          <RevealText id="pricing-title" text={pricing.title} className="display mt-6 max-w-[16ch] text-[44px] text-ink sm:text-[60px] lg:text-[72px]" />
        </div>
        <Reveal delay={140} className="max-w-[42ch] text-[16px] leading-relaxed text-muted-foreground md:text-[17px] lg:justify-self-end">
          <p>{pricing.description}</p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-3 md:grid-cols-3 md:mt-16">
        {pricing.engagements.map((e, i) => {
          const dark = e.featured;
          const href = e.href || (i === 0 ? auditHref() : bookingHref());
          return (
            <Reveal key={e.name} delay={i * 90}>
              <article className={`flex h-full flex-col rounded-[26px] p-6 lg:p-8 ${dark ? "tone-dark bg-ink text-white" : "border border-line bg-white text-ink"}`}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[18px] font-[600] tracking-[-0.01em]">{e.name}</h3>
                  {dark && <span className="rounded-full bg-berry px-3 py-1 text-[12px] font-[600] text-white">Most chosen</span>}
                </div>
                <p className="mt-8 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="display text-[64px] leading-none md:text-[54px] lg:text-[72px]" style={{ ["--wdth" as string]: 82 }}>
                    {e.price}
                  </span>
                  <span className={dark ? "text-white/55" : "text-muted-foreground"}>{e.cadence}</span>
                </p>
                <p className={`mt-4 min-h-[48px] text-[15px] leading-relaxed ${dark ? "text-white/70" : "text-muted-foreground"}`}>{e.description}</p>
                <ul className={`mt-6 space-y-3 border-t pt-6 text-[15px] ${dark ? "border-white/10" : "border-line"}`}>
                  {e.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-berry" strokeWidth={2.6} />
                      <span className={dark ? "text-white/85" : "text-ink/85"}>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Button href={href} variant={dark ? "berry" : "outline"} className="w-full">
                    {e.cta}
                  </Button>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
