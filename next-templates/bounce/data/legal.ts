// Placeholder policies. Replace them with documents written for your course and jurisdiction.
import { site } from "@/site.config";

export type LegalDoc = { title: string; updated: string; intro: string; sections: { heading: string; text: string }[] };

export const privacy: LegalDoc = {
  title: "Privacy policy",
  updated: "2026-10-01",
  intro: `This page is a placeholder. Replace it with a privacy policy that explains how ${site.brand} collects, uses and protects personal data.`,
  sections: [
    { heading: "What to cover", text: "The data you collect (account and payment details, uploaded projects, messages in the community, usage data), why you collect it, the legal basis and how long you keep it." },
    { heading: "Student work", text: "Explain who can hear the tracks students upload, how long uploads are stored, whether recordings of live sessions include students, and how to delete them." },
    { heading: "Service providers", text: "List the services that process data for you, such as payments, video hosting, email and community tools, and where that data is stored." },
    { heading: "Your rights", text: `Explain how people can access, correct, export or delete their data, and how to reach you at ${site.links.email}.` },
  ],
};

export const terms: LegalDoc = {
  title: "Terms of enrollment",
  updated: "2026-10-01",
  intro: `This page is a placeholder. Replace it with the terms that govern enrolling in ${site.brand}.`,
  sections: [
    { heading: "Access", text: "What each plan includes, how long access lasts, and whether accounts can be shared." },
    { heading: "Payments and refunds", text: "How one-time and instalment payments work, what happens if a payment fails, and the refund window." },
    { heading: "Your music", text: "Students keep the rights to everything they make. State how feedback, examples and showcased tracks may be used, and how to opt out." },
    { heading: "Conduct and contact", text: `Community guidelines, how live sessions are run, and how to contact you at ${site.links.email}.` },
  ],
};
