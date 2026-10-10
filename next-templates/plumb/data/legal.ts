/*
 * Placeholder legal pages. They are written for a fictional analytics company and are
 * not legal advice: replace them with policies written for your business.
 */

export type LegalPage = { title: string; updated: string; intro: string; sections: { heading: string; body: string }[] };

export const privacy: LegalPage = {
  title: "Privacy",
  updated: "2026-10-01",
  intro: "This is placeholder text for a privacy policy. Plumb is a fictional product, and these paragraphs show the shape of a policy, not its substance.",
  sections: [
    { heading: "What we collect from your visitors", body: "Describe exactly what your product records about the people who visit your customers' sites, how long you keep it and where it is stored." },
    { heading: "What we collect from you", body: "List the account, billing and support information you hold about your own customers, and why you need each piece." },
    { heading: "Who we share it with", body: "Name the processors you rely on (hosting, payments, email) and link to their terms." },
    { heading: "Your rights", body: "Explain how someone can see, export, correct or delete their data, and how quickly you'll respond." },
    { heading: "Contact", body: "Give a real address for privacy questions, and the name of your data protection contact if you have one." },
  ],
};

export const terms: LegalPage = {
  title: "Terms",
  updated: "2026-10-01",
  intro: "This is placeholder text for terms of service. Replace it with terms written for your business before you launch.",
  sections: [
    { heading: "The service", body: "Describe what you provide, what you don't, and any limits on how it may be used." },
    { heading: "Accounts and billing", body: "Explain trials, renewals, upgrades, refunds and what happens when a payment fails." },
    { heading: "Your content and data", body: "Say who owns the data customers send you and what you may do with it." },
    { heading: "Ending the service", body: "Explain how either side can end the agreement and what happens to the data afterwards." },
    { heading: "Liability", body: "Set out the limits of your liability, written with a lawyer for your jurisdiction." },
  ],
};
