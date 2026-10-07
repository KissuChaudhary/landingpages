import { Check } from "lucide-react";

import { Button, OutlineButton } from "@/components/ui/Button";
import { Container, SectionTitle } from "@/components/ui/Title";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

/**
 * Three plans as three rows, not three cards: name, volume, price and a button on one line.
 * What every plan includes is listed once underneath, so the rows stay short.
 */
export function Pricing() {
  const { pricing } = siteConfig;

  return (
    <section id="pricing" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
      <Container>
        <SectionTitle label={pricing.label} title={pricing.title} description={pricing.description} />

        <ul className="mx-auto mt-14 max-w-[60rem]">
          {pricing.plans.map((plan, index) => (
            <li
              key={plan.name}
              className={cn(
                "grid items-center gap-x-8 gap-y-5 px-5 py-8 sm:px-8 md:grid-cols-[1.3fr_1.2fr_auto_auto]",
                plan.featured ? "rounded-[28px] bg-blush" : index > 0 && !pricing.plans[index - 1].featured && "border-t border-line",
              )}
            >
              <div>
                <h3 className="display flex flex-wrap items-center gap-x-3 text-[1.875rem] leading-none text-ink">
                  {plan.name}
                  {plan.featured ? (
                    <span className="rounded-full bg-ink px-3 py-1 font-sans text-[12px] font-semibold tracking-normal text-paper">Most teams</span>
                  ) : null}
                </h3>
                <p className="mt-2 text-[15px] text-ink-mid">{plan.audience}</p>
              </div>
              <p className="text-[15px] font-medium text-ink">{plan.volume}</p>
              <p className="flex items-baseline gap-2 md:justify-end">
                <span className="display text-[2.5rem] leading-none text-ink">{plan.price}</span>
                {plan.unit ? <span className="text-[14px] text-ink-mid">{plan.unit}</span> : null}
              </p>
              {plan.featured ? (
                <Button href="#start" className="md:w-44">
                  {plan.cta}
                </Button>
              ) : (
                <OutlineButton href="#start" className="md:w-44">
                  {plan.cta}
                </OutlineButton>
              )}
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-14 max-w-[60rem] px-5 sm:px-8">
          <p className="text-[14px] font-semibold text-ink">{pricing.includedLabel}</p>
          <ul className="mt-5 grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
            {pricing.included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] leading-snug text-ink-mid">
                <Check className="mt-0.5 size-4 shrink-0 text-rose-text" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
