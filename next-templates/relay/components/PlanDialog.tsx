"use client";
import { ArrowUpRight } from "lucide-react";
import { useRelay } from "@/components/RelayProvider";
import { Modal } from "@/components/ui/Modal";
import { formatAmount } from "@/lib/pricing";
export function PlanDialog() {
  const { selectedPlan, closePlan, start } = useRelay();
  if (!selectedPlan) return null;
  const { plan, yearly } = selectedPlan;
  const total = yearly ? plan.annual : plan.monthly;
  return (
    <Modal title={`${plan.name} plan`} close={closePlan}>
      <p>{plan.description}</p>
      <dl className="plan-summary">
        <div>
          <dt>Billing period</dt>
          <dd>{total === 0 ? "Free" : yearly ? "Yearly" : "Monthly"}</dd>
        </div>
        <div>
          <dt>Billing total</dt>
          <dd>
            ${formatAmount(total)}
            {total > 0 && (yearly ? " / year" : " / month")}
          </dd>
        </div>
      </dl>
      <ul>
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <p className="supporting">
        This is a local plan preview. Connect your real checkout to accept
        payments or create accounts.
      </p>
      <button
        className="button button-blue"
        onClick={() => {
          closePlan();
          window.requestAnimationFrame(start);
        }}
      >
        Try an example
        <ArrowUpRight size={18} />
      </button>
    </Modal>
  );
}
