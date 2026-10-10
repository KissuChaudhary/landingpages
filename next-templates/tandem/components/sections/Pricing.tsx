"use client";
import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { site } from "@/site.config";
import { Button } from "@/components/ui/Button";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/motion/Reveal";
import { Price, PricingToggle } from "@/components/hairline/pricing-toggle";

export function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const [direction, setDirection] = useState(1);
  const p = site.pricing;
  const options = useMemo(
    () => [
      { value: "monthly", label: "Monthly" },
      { value: "yearly", label: "Yearly", badge: "Save up to 26%" },
    ],
    [],
  );
  return (
    <section
      id="pricing"
      className="pricing section"
      aria-labelledby="pricing-title"
    >
      <div className="container">
        <SectionIntro
          id="pricing-title"
          eyebrow={p.eyebrow}
          title={p.title}
          description={p.description}
          center
        />
        <Reveal>
          <div className="pricing-switch">
            <PricingToggle
              value={billing}
              onValueChange={(v) => {
                setDirection(v === "yearly" ? 1 : -1);
                setBilling(v as typeof billing);
              }}
              options={options}
            />
          </div>
        </Reveal>
        <div className="pricing-grid">
          {p.plans.map((plan, i) => {
            const amount = plan[billing];
            const href =
              plan.checkout[billing] ||
              `mailto:${site.contact}?subject=${encodeURIComponent(`${plan.name} plan — ${billing}`)}`;
            return (
              <Reveal key={plan.name} delay={i * 90}>
                <article
                  className={`plan ${plan.featured ? "plan-featured" : ""}`}
                >
                  <div className="plan-header">
                    <h3>{plan.name}</h3>
                    {plan.featured && <span>BETTER TOGETHER</span>}
                  </div>
                  <p className="plan-description">{plan.description}</p>
                  <div className="plan-price">
                    {amount !== null ? (
                      <Price
                        amount={amount}
                        locales={site.locale}
                        note={
                          billing === "yearly"
                            ? `$${amount * 12} billed yearly`
                            : "Billed monthly"
                        }
                        direction={direction}
                        numberClassName="text-[56px] font-[440] tracking-[-0.05em]"
                      />
                    ) : (
                      <>
                        <strong>Let's talk.</strong>
                        <p>Built around your team</p>
                      </>
                    )}
                  </div>
                  <Button
                    href={href}
                    variant={plan.featured ? "white" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                  <ul>
                    {plan.features.map((f) => (
                      <li key={f}>
                        <Check size={14} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="plan-bottom">
                    YOUR NEXT BIG THING STARTS HERE.
                  </span>
                </article>
              </Reveal>
            );
          })}
        </div>
        <p className="pricing-note">
          A little backup today. Room for whatever comes next.
        </p>
      </div>
    </section>
  );
}
