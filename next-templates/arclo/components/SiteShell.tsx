"use client";
import { useEffect, useState, type ReactNode } from "react";
import { Check, CreditCard } from "lucide-react";
import { ExperienceContext } from "./Experience";
import { Navigation } from "./Navigation";
import { Footer } from "./sections/Footer";
import { Motion } from "./Motion";
import { Dialog } from "./ui/Dialog";
import { Button } from "./ui/Primitives";
import { Workbench } from "./product/Workbench";
import { site, type Plan } from "@/site.config";
import { route } from "@/lib/urls";
import { amount } from "@/lib/billing";
export function SiteShell({ children }: { children: ReactNode }) {
  const [workspace, setWorkspace] = useState<string | null>(null);
  const [billing, setBilling] = useState<{
    plan: Plan;
    annual: boolean;
  } | null>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    try {
      setPaused(localStorage.getItem("arclo-motion") === "paused");
    } catch {}
  }, []);
  const toggleMotion = () =>
    setPaused((value) => {
      try {
        localStorage.setItem("arclo-motion", value ? "on" : "paused");
      } catch {}
      return !value;
    });
  const openWorkspace = (workflow = "match") => {
    if (site.links.app) window.location.assign(site.links.app);
    else setWorkspace(workflow);
  };
  const choosePlan = (plan: Plan, annual: boolean) => {
    const destination = annual ? plan.annualHref : plan.monthlyHref;
    if (destination) window.location.assign(destination);
    else setBilling({ plan, annual });
  };
  return (
    <ExperienceContext.Provider
      value={{ openWorkspace, choosePlan, paused, toggleMotion }}
    >
      <div className={`site ${paused ? "motion-paused" : ""}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        {children}
        <Footer />
        <Motion paused={paused} />
      </div>
      {workspace && (
        <Dialog
          title="A sample close, start to finish."
          onClose={() => setWorkspace(null)}
          wide
        >
          <Workbench initial={workspace} expanded />
        </Dialog>
      )}
      {billing && (
        <Dialog
          title={`The ${billing.plan.name} plan.`}
          onClose={() => setBilling(null)}
        >
          <div className="plan-review">
            <CreditCard className="review-icon" />
            <p className="review-amount">
              $
              {amount(
                billing.annual ? billing.plan.annual : billing.plan.monthly,
              )}
              <span> / {billing.annual ? "year" : "month"}</span>
            </p>
            <p>
              {billing.annual
                ? `One annual payment of $${amount(billing.plan.annual)}. Equivalent to $${amount(billing.plan.annual / 12)} per month.`
                : `Billed monthly at $${amount(billing.plan.monthly)}.`}
            </p>
            <ul>
              {billing.plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={16} />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="muted small">
              Plan preview. A checkout destination has not been configured.
            </p>
            <Button href={route("/contact")}>Talk to the team</Button>
          </div>
        </Dialog>
      )}
    </ExperienceContext.Provider>
  );
}
