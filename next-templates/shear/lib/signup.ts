import { site } from "@/site.config";

/**
 * Where a sign-up goes, in order:
 *   1. `signup.endpoint`  POST { email } as JSON and wait for the answer
 *   2. `signup.url`       open your sign-up page with ?email= filled in
 *   3. neither            take the visitor to the plans
 * Swap this function for your own (a CRM, an auth provider) if you prefer.
 */
export type SignupOutcome = "sent" | "redirected" | "plans";

export async function submitSignup(email: string): Promise<SignupOutcome> {
  const { endpoint, url, param } = site.signup;
  if (endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error(`Sign-up failed with ${response.status}`);
    return "sent";
  }
  if (url) {
    const target = new URL(url, window.location.href);
    target.searchParams.set(param, email);
    window.location.assign(target.toString());
    return "redirected";
  }
  const plans = document.getElementById("pricing");
  plans?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  return "plans";
}

/** Where "Start free" buttons point: your sign-up page, or the plans until you set one. */
export const signupHref = () => site.signup.url || "#pricing";
