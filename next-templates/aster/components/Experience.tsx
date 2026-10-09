"use client";
import { createContext, useContext, useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { site, type Billing } from "@/site.config";
import { integrations } from "@/data/integrations";
import { href } from "@/lib/urls";
import { Modal } from "./ui/Modal";
import { SectionHead } from "./ui/Primitives";
type Experience =
  | { type: "plan"; id: string; billing: Billing }
  | { type: "integration"; id: string };
const Context = createContext({ open: (_value: Experience) => {} });
export const useExperience = () => useContext(Context);
export function ExperienceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState<Experience | null>(null);
  const plan =
    active?.type === "plan"
      ? site.plans.find((p) => p.id === active.id)
      : undefined;
  const integration =
    active?.type === "integration"
      ? integrations.find((i) => i.id === active.id)
      : undefined;
  const amount =
    plan && active?.type === "plan"
      ? active.billing === "annual"
        ? plan.annual === null
          ? null
          : plan.annual * 12
        : plan.monthly
      : null;
  return (
    <Context.Provider value={{ open: setActive }}>
      {children}
      {active && (
        <Modal
          title={
            plan
              ? `${plan.name} plan review`
              : integration
                ? `${integration.name} connection guide`
                : "A closer look"
          }
          onClose={() => setActive(null)}
        >
          {plan && active.type === "plan" ? (
            <div className="plan-review">
              <SectionHead
                label="Your starting point"
                lines={[plan.name]}
                text={plan.text}
              />
              <p className="review-price">
                {amount === null
                  ? "Let's talk"
                  : amount === 0
                    ? "Free"
                    : `$${amount}`}
                <span>
                  {amount !== null && amount > 0
                    ? active.billing === "annual"
                      ? " / year"
                      : " / month"
                    : ""}
                </span>
              </p>
              <p>
                {amount === null
                  ? "A tailored conversation about your needs."
                  : active.billing === "annual" && amount > 0
                    ? `$${plan.annual} per month, billed as $${amount} once a year.`
                    : amount === 0
                      ? "A place to explore the local example."
                      : `$${amount} billed each month.`}
              </p>
              <ul className="check-list">
                {plan.features.map((f) => (
                  <li key={f}>
                    <Check size={16} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                className="button"
                href={href(
                  plan.checkout[active.billing] ||
                    `/contact?plan=${plan.id}&billing=${active.billing}`,
                )}
              >
                {plan.checkout[active.billing]
                  ? "Continue to checkout"
                  : "Discuss this plan"}
                <ArrowUpRight size={15} />
              </a>
              <p className="small-note">
                Example plan review. No payment is collected here.
              </p>
            </div>
          ) : integration ? (
            <div className="connection-review">
              <SectionHead
                label={integration.category}
                lines={[
                  `Bring ${integration.name.toLowerCase()}`,
                  "into the picture.",
                ]}
                text={integration.text}
              />
              <h3>Example data scope</h3>
              <ul className="check-list">
                {integration.fields.map((f) => (
                  <li key={f}>
                    <Check size={16} />
                    {f}
                  </li>
                ))}
              </ul>
              <p>{integration.scope}</p>
              <a className="button button-light" href={href("/contact")}>
                Talk about a connection
                <ArrowUpRight size={15} />
              </a>
              <p className="small-note">
                A connection guide. No live account is connected.
              </p>
            </div>
          ) : null}
        </Modal>
      )}
    </Context.Provider>
  );
}
