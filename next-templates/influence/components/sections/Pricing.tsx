"use client";

import { Check, Minus } from "lucide-react";
import { useState } from "react";

import { NumberRoll } from "@/components/hairline/number-roll";
import { TextMorph } from "@/components/hairline/text-morph";
import { Container, SectionTitle } from "@/components/ui/Title";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site.config";

/** A cell value: text, a tick for included, a dash for not included. */
function Value({ value, dark }: { value: string | boolean; dark?: boolean }) {
  if (value === true) return <Check className={cn("size-5", dark ? "text-orange" : "text-good")} strokeWidth={2.5} aria-label="Included" />;
  if (value === false) return <Minus className={cn("size-5", dark ? "text-white/30" : "text-ink-low/60")} aria-label="Not included" />;
  return <span>{value}</span>;
}

/**
 * Three plans as one comparison. On wide screens the plans are columns of a table, with the featured plan
 * as a dark column. On phones each plan stacks as its own block and lists the same rows.
 * A billing switch recalculates the prices from `pricing.billing.discount`.
 */
export function Pricing() {
  const { pricing } = siteConfig;
  const { billing, plans, rows } = pricing;
  const [quarterly, setQuarterly] = useState(false);

  const price = (base: number) => (
    <NumberRoll value={Math.round(quarterly ? base * (1 - billing.discount) : base)} prefix="$" locales="en-US" />
  );
  const cols = "lg:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,1fr))]";

  return (
    <section id="pricing" className="scroll-mt-20 border-t border-line bg-sheet py-20 sm:py-28">
      <Container>
        <SectionTitle label={pricing.label} title={pricing.title} description={pricing.description} />

        <div className="mt-10 flex flex-col items-center gap-3">
          <div role="group" aria-label="Billing period" className="inline-flex rounded-full border border-line-strong bg-paper p-1">
            {[
              { label: billing.monthly, value: false },
              { label: billing.quarterly, value: true },
            ].map((option) => (
              <button
                key={option.label}
                type="button"
                aria-pressed={quarterly === option.value}
                onClick={() => setQuarterly(option.value)}
                className={cn(
                  "h-10 cursor-pointer rounded-full px-5 text-[14px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-orange",
                  quarterly === option.value ? "bg-ink text-white" : "text-ink-mid hover:text-ink",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="text-[13px] font-semibold text-good" aria-live="polite">
            <TextMorph>{quarterly ? billing.note : billing.save}</TextMorph>
          </p>
        </div>

        {/* Wide screens: one table, the featured plan as a dark column. */}
        <div className="mt-14 hidden lg:block">
          <div className={cn("grid", cols)}>
            <div />
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn("flex flex-col px-8 pb-8 pt-8", plan.featured ? "rounded-t-[28px] bg-ink text-white" : "text-ink")}
              >
                <h3 className="display text-[1.75rem] leading-none">{plan.name}</h3>
                <p className={cn("mt-3 min-h-[3rem] text-[14px] leading-snug", plan.featured ? "text-on-night-mid" : "text-ink-mid")}>{plan.description}</p>
                <p className="mt-6 flex items-baseline gap-1.5">
                  <span className="display money text-[2.75rem] leading-none">{price(plan.price)}</span>
                  <span className={cn("text-[14px]", plan.featured ? "text-on-night-mid" : "text-ink-mid")}>/month</span>
                </p>
                <a
                  href="#start"
                  className={cn(
                    "mt-7 inline-flex h-12 items-center justify-center rounded-full text-[15px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-orange",
                    plan.featured ? "bg-orange text-ink hover:bg-orange-deep" : "border border-line-strong text-ink hover:border-ink",
                  )}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          {rows.map((row, rowIndex) => (
            <div key={row.label} className={cn("grid", cols)}>
              <p className="flex items-center border-t border-line py-4 pr-6 text-[15px] font-medium text-ink">{row.label}</p>
              {plans.map((plan, planIndex) => (
                <div
                  key={plan.name}
                  className={cn(
                    "flex items-center px-8 py-4 text-[15px]",
                    plan.featured ? "bg-ink text-white" : "border-t border-line text-ink",
                    plan.featured && rowIndex === rows.length - 1 && "rounded-b-[28px]",
                    plan.featured && rowIndex > 0 && "border-t border-white/10",
                  )}
                >
                  <Value value={row.values[planIndex]} dark={plan.featured} />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Phones and tablets: one block per plan. */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:hidden">
          {plans.map((plan, planIndex) => (
            <article
              key={plan.name}
              className={cn("flex min-w-0 flex-col rounded-[28px] border p-7", plan.featured ? "border-ink bg-ink text-white md:col-span-2" : "border-line bg-paper text-ink")}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <h3 className="display text-[1.75rem] leading-none">{plan.name}</h3>
                <p className="flex items-baseline gap-1.5">
                  <span className="display money text-[2.25rem] leading-none">{price(plan.price)}</span>
                  <span className={cn("text-[14px]", plan.featured ? "text-on-night-mid" : "text-ink-mid")}>/month</span>
                </p>
              </div>
              <p className={cn("mt-3 text-[14px]", plan.featured ? "text-on-night-mid" : "text-ink-mid")}>{plan.description}</p>
              <ul className={cn("mt-6 divide-y", plan.featured ? "divide-white/10" : "divide-line")}>
                {rows
                  .filter((row) => row.values[planIndex] !== false)
                  .map((row) => (
                    <li key={row.label} className="flex items-center justify-between gap-4 py-3 text-[14px]">
                      <span className={plan.featured ? "text-on-night-mid" : "text-ink-mid"}>{row.label}</span>
                      <span className="font-semibold">
                        <Value value={row.values[planIndex]} dark={plan.featured} />
                      </span>
                    </li>
                  ))}
              </ul>
              <a
                href="#start"
                className={cn(
                  "mt-7 inline-flex h-12 items-center justify-center rounded-full text-[15px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-orange",
                  plan.featured ? "bg-orange text-ink hover:bg-orange-deep" : "border border-line-strong text-ink hover:border-ink",
                )}
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-[34rem] text-center text-[15px] leading-relaxed text-ink-mid">{pricing.addOns}</p>
      </Container>
    </section>
  );
}
