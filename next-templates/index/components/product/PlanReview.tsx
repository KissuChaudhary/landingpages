"use client";
import { useCallback } from "react";
import { site, type Plan } from "@/site.config";
import { planPrice, type Billing } from "@/lib/content";
import { Dialog } from "@/components/ui/Dialog";
import { Action } from "@/components/ui/Action";
export function PlanReview({
  plan,
  billing,
  onClose,
}: {
  plan: Plan | null;
  billing: Billing;
  onClose: () => void;
}) {
  const close = useCallback(onClose, [onClose]);
  const price = plan ? planPrice(plan, billing) : null;
  return (
    <Dialog open={!!plan} onClose={close} title="Plan preview">
      {plan && price && (
        <div className="plan-review">
          <h2>{plan.name}</h2>
          <p>{plan.description}</p>
          <dl>
            <div>
              <dt>Billing period</dt>
              <dd>
                {price.total === 0
                  ? "Free"
                  : billing === "yearly"
                    ? "Yearly"
                    : "Monthly"}
              </dd>
            </div>
            <div>
              <dt>
                {price.perSeat ? "Monthly price per person" : "Monthly price"}
              </dt>
              <dd>${price.monthly}</dd>
            </div>
            <div>
              <dt>{price.perSeat ? "Total per person" : "Total"}</dt>
              <dd>
                ${price.total}
                {price.total > 0 &&
                  (billing === "yearly" ? " / year" : " / month")}
              </dd>
            </div>
            {price.savings > 0 && (
              <div>
                <dt>Annual savings{price.perSeat ? " per person" : ""}</dt>
                <dd>${price.savings}</dd>
              </div>
            )}
          </dl>
          <p className="plan-review__note">
            This is a local plan preview. No payment is taken and no account is
            created. Configure this plan’s billing destination to connect your
            checkout.
          </p>
          <Action href={site.links.app || "#research"} onClick={close}>
            Explore the working example
          </Action>
          <button className="text-link" onClick={close}>
            Back to plans
          </button>
        </div>
      )}
    </Dialog>
  );
}
