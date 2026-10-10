import { site } from "@/site.config";
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
export const home = () =>
  process.env.NEXT_PUBLIC_BASE_PATH
    ? `${process.env.NEXT_PUBLIC_BASE_PATH}/index.html`
    : "/";
export const contact = (subject = site.links.subject) =>
  site.links.start ||
  `mailto:${site.links.email}?subject=${encodeURIComponent(subject)}`;
export const sales = () =>
  site.links.sales ||
  `mailto:${site.links.email}?subject=${encodeURIComponent(`${site.name} for our team`)}`;
