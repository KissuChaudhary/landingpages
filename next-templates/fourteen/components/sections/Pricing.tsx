import { BarChart3, Mail, Plug, ShieldCheck, Target } from "lucide-react";

import { Button, Container, Note, Pill, Ring, SectionHead } from "@/components/ui/Kit";
import { siteConfig } from "@/site.config";

const icons = { mail: Mail, target: Target, plug: Plug, shield: ShieldCheck, chart: BarChart3 };

/** One plan, in one ring: the offer on the left and everything that is included on the right. */
export function Pricing() {
  const { pricing } = siteConfig;

  return (
    <section id="pricing" className="scroll-mt-28 pb-24 sm:pb-32">
      <Container className="max-w-[1000px]">
        <SectionHead title={pricing.title} description={pricing.description} />

        <Ring className="relative mt-16" innerClassName="grid overflow-hidden md:grid-cols-[2fr_3fr]">
          <p className="absolute left-0 top-0 z-10 rounded-br-2xl rounded-tl-[22px] bg-flame px-4 pb-2 pt-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
            {pricing.tab}
          </p>

          <div className="flex flex-col items-center bg-cream/60 px-5 pb-10 pt-20 sm:px-7 text-center md:pt-24">
            <Pill>{pricing.badge}</Pill>
            <h3 className="mt-5 max-w-[12rem] font-serif text-[1.625rem] leading-tight text-ink">{pricing.audience}</h3>

            <p className="mt-7 flex items-end gap-3">
              <span className="pb-3 font-serif text-[1.25rem] text-ink-low line-through">{pricing.was}</span>
              <span className="font-serif text-[3.5rem] leading-none text-ink sm:text-[4.25rem]">{pricing.price}</span>
            </p>
            <p className="mt-2 text-[14px] text-ink-mid">{pricing.per}</p>

            <div className="relative mt-8 w-full">
              <Button href={pricing.cta.href} className="h-14 w-full text-[17px]">
                {pricing.cta.label}
              </Button>
            </div>
            <Note arrow="up" className="mt-3 text-[1.25rem]">
              {pricing.note}
            </Note>

            <p className="mt-4 flex items-center gap-2 text-[13px] font-medium text-ink-mid">
              <ShieldCheck className="size-4 shrink-0 text-good" />
              {pricing.guarantee}
            </p>
          </div>

          <div className="px-5 py-8 sm:px-10 sm:py-10 md:pt-24">
            <p className="border-b border-line pb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-low">{pricing.includedLabel}</p>
            <ul className="mt-6 space-y-6">
              {pricing.included.map((item) => {
                const Icon = icons[item.icon];
                return (
                  <li key={item.title} className="flex gap-3.5 sm:gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl sm:size-11 border border-line bg-card text-flame-text">
                      <Icon className="size-[18px]" />
                    </span>
                    <span>
                      <span className="block font-serif text-[1.0625rem] leading-snug text-ink sm:text-[1.1875rem]">{item.title}</span>
                      <span className="text-pretty mt-1 block text-[14px] leading-[1.6] text-ink-mid">{item.text}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Ring>
      </Container>
    </section>
  );
}
