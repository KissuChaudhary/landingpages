// Placeholder policies. Replace them with documents written for your product and jurisdiction.
import { site } from "@/site.config";

export type LegalDoc = { title: string; updated: string; intro: string; sections: { heading: string; text: string }[] };

export const privacy: LegalDoc = {
  title: "Privacy policy",
  updated: "2026-10-01",
  intro: `This page is a placeholder. Replace it with a privacy policy that describes how ${site.brand} collects, uses and protects personal data.`,
  sections: [
    { heading: "What to cover", text: "The data you collect (account details, workspace content, usage data), why you collect it, the legal basis for processing, and how long you keep it." },
    { heading: "Connected sources", text: "If your product reads calendars, code repositories or other tools on a user's behalf, explain exactly which data is read, how it is stored and how a user can disconnect a source and remove its data." },
    { heading: "Sub-processors and transfers", text: "List the services that process data for you and where data is stored, including any international transfers and the safeguards that apply." },
    { heading: "Your rights", text: `Explain how people can access, correct, export or delete their data, and how to reach you at ${site.links.email}.` },
  ],
};

export const terms: LegalDoc = {
  title: "Terms of service",
  updated: "2026-10-01",
  intro: `This page is a placeholder. Replace it with the terms that govern use of ${site.brand}.`,
  sections: [
    { heading: "Accounts and access", text: "Who may create a workspace, how seats are counted, and the responsibilities of workspace owners and members." },
    { heading: "Billing", text: "How plans are billed, what happens when people are added or removed, refunds, taxes and changes to pricing." },
    { heading: "Customer data", text: "Who owns the data in a workspace, how it may be used to provide the service, and how it is exported or deleted when an account closes." },
    { heading: "Liability and contact", text: `Warranties, limitations of liability, governing law, and how to contact you at ${site.links.email}.` },
  ],
};
