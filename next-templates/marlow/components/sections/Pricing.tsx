import { Check } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Section, SectionHead } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

/**
 * A rate card, not three cards: one row per engagement, so the terms read left to right like a quote
 * (name and term, what is included, price). The featured row is drawn in ink. On phones each row stacks.
 */
export function Pricing() {
  const { plans, footnote, ...intro } = siteConfig.pricing;

  return (
    <Section id="pricing">
      <SectionHead index="06" {...intro} />

      <ul className="space-y-4">
        {plans.map((plan) => {
          const dark = Boolean(plan.featured);
          return (
            <li
              key={plan.name}
              className={cn(
                "grid gap-8 rounded-[2rem] p-6 sm:p-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.4fr)_minmax(0,0.9fr)] lg:items-center lg:gap-10 lg:p-10",
                dark ? "bg-ink text-on-ink shadow-lift" : "border border-line bg-paper-raised",
              )}
            >
              <div>
                <p
                  className={cn(
                    "inline-flex rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em]",
                    dark ? "bg-on-ink/12 text-on-ink" : "bg-sand text-ink-mid",
                  )}
                >
                  {plan.duration}
                  {dark ? " · Most chosen" : ""}
                </p>
                <h3 className="display mt-5 text-[2.75rem] leading-none">{plan.name}</h3>
                <p className={cn("mt-3 text-[1.0625rem]", dark ? "text-on-ink-mid" : "text-ink-mid")}>{plan.tagline}</p>
              </div>

              <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-snug">
                    <span
                      aria-hidden
                      className={cn(
                        "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                        dark ? "bg-peach text-ink" : "bg-mint text-ink",
                      )}
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span className={dark ? "text-on-ink" : "text-ink"}>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="lg:text-right">
                <p className="display text-[3.25rem] leading-none">
                  {plan.price}
                  {plan.unit ? (
                    <span className={cn("ml-2 font-sans text-[15px] tracking-normal", dark ? "text-on-ink-mid" : "text-ink-mid")}>
                      {plan.unit}
                    </span>
                  ) : null}
                </p>
                <Button
                  href={plan.cta.href}
                  variant={dark ? "light" : "primary"}
                  className="mt-6 w-full justify-between lg:ml-auto lg:w-auto lg:min-w-[14rem]"
                >
                  {plan.cta.label}
                </Button>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 text-[13px] text-ink-low">{footnote}</p>
    </Section>
  );
}
