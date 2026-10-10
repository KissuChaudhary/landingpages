import { site } from "@/site.config";

// Paths work at the site root and under a base path (NEXT_PUBLIC_BASE_PATH) on static hosts.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** A file in /public. */
export const asset = (src: string) => (src.startsWith("/") && !src.startsWith("//") ? `${basePath}${src}` : src);

/** True for other sites, email and phone links. */
export const isExternal = (href: string) => /^(https?:)?\/\//.test(href) || /^(mailto|tel):/.test(href);

/** A page link. Under a base path, static exports need explicit .html files. */
export function href(path: string) {
  if (path.startsWith("#")) path = `/${path}`;
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (!basePath) return path;
  const split = path.search(/[?#]/);
  const pathname = split < 0 ? path : path.slice(0, split);
  const suffix = split < 0 ? "" : path.slice(split);
  return `${basePath}${pathname === "/" ? "/index.html" : `${pathname.replace(/\/$/, "")}.html`}${suffix}`;
}

/** Where "Start free" goes: your sign-up page (with any details), or the plans until you have one. */
export function signupHref(params?: Record<string, string>) {
  if (!site.links.signup) return "/#pricing";
  const query = params ? new URLSearchParams(params).toString() : "";
  return query ? `${site.links.signup}${site.links.signup.includes("?") ? "&" : "?"}${query}` : site.links.signup;
}

/** An email to links.email with a subject (and body) filled in. */
export const mailto = (subject: string, body = "") =>
  `mailto:${site.links.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
