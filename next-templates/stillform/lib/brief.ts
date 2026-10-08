import { site } from "@/site.config";
import { calculateQuote, money, type BriefOptions } from "./quote";

export interface ContactDetails {
  name: string;
  email: string;
  brand: string;
  deadline: string;
  message: string;
}

export function createBrief(details: ContactDetails, options: BriefOptions) {
  const quote = calculateQuote(options);
  return [
    `${site.brand.name.toUpperCase()} / PROJECT BRIEF`,
    "",
    `Name: ${details.name}`,
    `Email: ${details.email}`,
    `Brand: ${details.brand}`,
    `Target date: ${details.deadline || "To be discussed"}`,
    "",
    `Direction: ${quote.format.name}`,
    `Products: ${quote.products}`,
    `Final images: ${quote.images}`,
    `Social crops: ${options.social ? "Yes" : "No"}`,
    `Priority production: ${options.rush ? "Requested" : "No"}`,
    `Planning estimate: ${money(quote.total)} ${site.pricing.currency} (not a final quote)`,
    "",
    "ABOUT THE PROJECT",
    details.message,
    "",
    site.pricing.note,
  ].join("\n");
}

export function emailDraft(details: ContactDetails, brief: string) {
  return `mailto:${site.brand.email}?subject=${encodeURIComponent(`Project enquiry — ${details.brand}`)}&body=${encodeURIComponent(brief)}`;
}
