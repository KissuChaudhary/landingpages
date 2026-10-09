"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { site, type Plan } from "@/site.config";
import { signupHref } from "@/lib/signup";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";
import { Pill } from "@/components/ui/Pill";
import { PricingToggle, Price } from "@/components/hairline/pricing-toggle";

/*
 * PRICING: four plans and a monthly/yearly switch (Hairline UI Pricing
 * toggle: the thumb is thrown, every price rolls, the billing line slides
 * in from the side you moved).
 *
 * Where each plan button goes: its checkout link for the chosen period;
 * until you add one, free plans go to sign-up and paid or custom plans
 * start an email to sales.
 */

type Billing = "monthly" | "yearly";

function planHref(plan: Plan, billing: Billing) {
  const checkout = plan.checkout[billing];
  if (checkout) return checkout;
  if (plan.price && plan.price.monthly === 0) return signupHref();
  const subject = plan.price ? `${plan.name} plan, billed ${billing}` : `${plan.name} plan`;
  return `mailto:${site.contact.sales}?subject=${encodeURIComponent(subject)}`;
}

export function Pricing() {
  const { pricing } = site;
  const [billing, setBilling] = React.useState<Billing>("yearly");
  const [dir, setDir] = React.useState(1);
  const options = React.useMemo(
    () => [
      { value: "monthly", label: "Monthly" },
      { value: "yearly", label: "Yearly", badge: pricing.yearlyBadge },
    ],
    [pricing.yearlyBadge],
  );

  const note = (plan: Plan) => {
    if (!plan.price) return "Annual contract";
    if (plan.price.monthly === 0) return "Free, no card needed";
    if (billing === "yearly")
      return `${(plan.price.yearly * 12).toLocaleString(site.locale, { style: "currency", currency: pricing.currency, maximumFractionDigits: 0 })} billed yearly`;
    return "Billed monthly";
  };

  return (
    <section id="pricing" className="mx-2 rounded-[26px] bg-mist py-20 md:mx-3 md:rounded-[36px] md:py-28" aria-labelledby="pricing-title">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <SectionIntro id="pricing-title" align="center" badge={pricing.badge} title={pricing.title} description={pricing.description} />
        <Reveal delay={200} className="mt-9 flex justify-center">
          <PricingToggle
            value={billing}
            options={options}
            onValueChange={(v) => {
              setDir(v === "yearly" ? 1 : -1);
              setBilling(v as Billing);
            }}
          />
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pricing.plans.map((plan, i) => {
            const dark = plan.featured;
            return (
              <Reveal key={plan.id} delay={i * 80}>
                <article
                  className={`flex h-full flex-col rounded-[26px] p-6 ${dark ? "tone-dark bg-ink text-white" : "border border-line bg-white text-ink"}`}
                  aria-label={`${plan.name} plan`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[19px] font-[520] tracking-[-0.02em]">{plan.name}</h3>
                    {plan.badge && <span className="rounded-full bg-mint px-2.5 py-0.5 text-[11.5px] font-[560] text-ink">{plan.badge}</span>}
                  </div>
                  <p className={`mt-1.5 min-h-[42px] text-[13.5px] leading-snug ${dark ? "text-white/55" : "text-muted-foreground"}`}>{plan.description}</p>
                  <div className="mt-6 min-h-[78px]">
                    {plan.price ? (
                      <Price
                        locales={site.locale}
                        amount={plan.price[billing]}
                        currency={pricing.currency}
                        note={note(plan)}
                        direction={dir}
                        numberClassName={`text-[44px] font-[450] leading-[1.1] tracking-[-0.045em] ${dark ? "text-white" : "text-ink"}`}
                      />
                    ) : (
                      <div>
                        <p className="text-[44px] font-[450] leading-[1.1] tracking-[-0.045em]">Custom</p>
                        <p className="mt-1 text-[12.5px] text-muted-foreground">{note(plan)}</p>
                      </div>
                    )}
                  </div>
                  <Pill href={planHref(plan, billing)} variant={dark ? "mint" : "ink"} className="mt-6 w-full justify-between">
                    {plan.cta}
                  </Pill>
                  <ul className={`mt-6 space-y-2.5 border-t pt-6 text-[14px] ${dark ? "border-white/10" : "border-line"}`}>
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-2.5">
                        <Check aria-hidden="true" className={`mt-0.5 size-4 shrink-0 ${dark ? "text-mint" : "text-mint-ink"}`} strokeWidth={2.4} />
                        <span className={dark ? "text-white/85" : "text-ink/85"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
