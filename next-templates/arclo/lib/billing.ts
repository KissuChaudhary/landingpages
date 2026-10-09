import type { Plan } from "@/site.config";
export const amount = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
export const annualSavings = (plans: Plan[]) =>
  Math.max(
    0,
    ...plans
      .filter((plan) => plan.monthly > 0)
      .map((plan) => Math.round((1 - plan.annual / (plan.monthly * 12)) * 100)),
  );
