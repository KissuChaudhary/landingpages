import { site, type Billing } from "@/site.config";
export const path = (value: string) => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!value.startsWith("/") || value.startsWith("//")) return value;
  if (base && (value === base || value.startsWith(`${base}/`))) return value;
  return `${base}${value}`;
};
export const appHref = () => path(site.links.app || "/#product");
export const bookingHref = () => path(site.links.booking || "/contact");
export const planHref = (
  plan: (typeof site.pricing.plans)[number],
  billing: Billing,
) =>
  path(
    plan.checkout[billing] ||
      `/contact?plan=${encodeURIComponent(plan.id)}&billing=${billing}`,
  );
