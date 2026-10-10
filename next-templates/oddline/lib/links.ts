import { site } from "@/site.config";
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
export const home = () =>
  process.env.NEXT_PUBLIC_BASE_PATH ? asset("/index.html") : "/";
export const contact = (subject = "Let’s make something with Oddline") =>
  site.links.booking ||
  `mailto:${site.links.email}?subject=${encodeURIComponent(subject)}`;
