"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

type Billing = "monthly" | "yearly";

/** Client component only because of the billing toggle. Prices and copy come from site.config.ts. */
export function PricingPlans() {
  const [billing, setBilling] = useState<Billing>("yearly");
  const { plans, yearlyNote, footnote } = siteConfig.pricing;

  return (
    <div>
      {/* Billing toggle */}
      <div className="mb-10 flex justify-center">
        <div role="group" aria-label="Billing period" className="inline-flex items-center rounded-full border border-line bg-bg-raised p-1">
          {(["monthly", "yearly"] as const).map((value) => {
            const active = billing === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => setBilling(value)}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-full px-4 text-[13px] font-medium capitalize outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ember-300",
                  active ? "bg-white/[0.09] text-ink" : "text-ink-mid hover:text-ink",
                )}
              >
                {value}
                {value === "yearly" ? (
                  <span className="rounded-full bg-ember-300 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.05em] text-on-ember">
                    {yearlyNote}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3 lg:gap-5">
        {plans.map((plan) => {
          const price = billing === "yearly" ? plan.yearly : plan.monthly;
          return (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col lg:p-8",
                plan.featured &&
                  "border-ember-300/45 bg-gradient-to-b from-ember-300/[0.09] to-bg-raised shadow-[0_40px_90px_-40px_color-mix(in_srgb,var(--color-ember-500)_55%,transparent)] hover:border-ember-300/60",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[1.125rem] font-medium tracking-[-0.01em] text-ink">{plan.name}</h3>
                {plan.featured ? (
                  <span className="rounded-full bg-ember-300 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-on-ember">
                    Most popular
                  </span>
                ) : null}
              </div>
              <p className="mt-1.5 text-[14px] text-ink-mid">{plan.description}</p>

              <p className="mt-7 flex items-baseline gap-1.5">
                <span className="text-[3.25rem] font-medium leading-none tracking-[-0.035em] tabular-nums text-ink">${price}</span>
                <span className="text-[14px] text-ink-low">/month</span>
              </p>
              <p className="mt-2 h-5 text-[13px] text-ink-low">
                {billing === "yearly" ? `Billed yearly, $${plan.yearly * 12} per year` : "Billed monthly"}
              </p>

              <Button
                href={plan.cta.href}
                variant={plan.featured ? "primary" : "secondary"}
                className={cn("mt-7 w-full", plan.featured && "justify-between")}
              >
                {plan.cta.label}
              </Button>

              <ul className="mt-8 space-y-3.5 border-t border-line pt-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[14.5px] leading-snug text-ink-mid">
                    <span aria-hidden className="mt-px grid size-[18px] shrink-0 place-items-center rounded-full bg-ember-300/15 text-ember-200">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>

      <p className="mt-8 text-center text-[13px] text-ink-low">{footnote}</p>
    </div>
  );
}
