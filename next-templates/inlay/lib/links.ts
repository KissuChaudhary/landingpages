import { site } from "@/site.config";

// Where every call to action goes. Change the destinations in site.config.ts → links.

const withParams = (url: string, params: Record<string, string>) => {
  const query = Object.entries(params)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join("&");
  if (!query) return url;
  const [base, hash] = url.split("#");
  return `${base}${base.includes("?") ? "&" : "?"}${query}${hash ? `#${hash}` : ""}`;
};

/** Sign up, carrying the handle the visitor chose. Without a sign-up link: the claim field in the hero. */
export const signupHref = (handle = "", plan = "") => (site.links.signup ? withParams(site.links.signup, { handle, plan }) : "/#claim");

/** The app's login page, or null when there isn't one yet (the links are hidden). */
export const loginHref = () => site.links.login || null;

export const mailto = (subject: string, body = "") =>
  `mailto:${site.links.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

type Plan = (typeof site.pricing.plans)[number];

/** A plan's button: its own link, else sign-up with the plan named, else an email. */
export function planHref(plan: Plan, billing: "monthly" | "yearly", handle = "") {
  if (plan.href) return plan.href;
  if (site.links.signup) return withParams(site.links.signup, { handle, plan: `${plan.name.toLowerCase()}-${billing}` });
  return mailto(`${site.brand} ${plan.name}, billed ${billing}`);
}

/** POST { email } as JSON to an endpoint, or open the visitor's email app when there is none. */
export async function sendEmailSignup(endpoint: string, email: string, subject: string) {
  if (!endpoint) {
    window.location.href = mailto(subject, `Please add ${email}.`);
    return;
  }
  const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
  if (!res.ok) throw new Error(`Signup failed (${res.status})`);
}
