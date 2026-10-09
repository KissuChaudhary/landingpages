export const site = {
  brand: "Arclo",
  title: "Arclo — Close the books before Friday",
  description:
    "Reconciliation, approvals and a close checklist in one calm workspace for finance teams.",
  email: "hello@example.com",
  links: { app: "", contactEndpoint: "", waitlistEndpoint: "" },
  hero: {
    announcement: "Multi-entity close is here",
    title: ["Close the books", "before Friday."],
    description:
      "Arclo matches every bank line, routes every approval and keeps the evidence behind every adjustment, so month end takes days instead of weeks.",
    primary: "Run a sample close",
    secondary: "See the platform",
  },
  plans: [
    {
      id: "launch",
      name: "Launch",
      monthly: 0,
      annual: 0,
      audience: "One entity and a cleaner close, from the first month.",
      features: [
        "1 entity",
        "2 bank and card feeds",
        "Shared close checklist",
        "Email support",
      ],
      limits: ["1", "2", "Checklist", "3 months"],
      monthlyHref: "",
      annualHref: "",
    },
    {
      id: "growth",
      name: "Growth",
      monthly: 149,
      annual: 1428,
      audience: "For finance teams who close every month, on time.",
      features: [
        "Up to 3 entities",
        "Unlimited bank and card feeds",
        "Approval routing and variance notes",
        "Priority email support",
      ],
      limits: ["3", "Unlimited", "Rules and approvals", "24 months"],
      monthlyHref: "",
      annualHref: "",
    },
    {
      id: "group",
      name: "Group",
      monthly: 399,
      annual: 3828,
      audience: "For groups with several entities and an auditor to answer to.",
      features: [
        "Unlimited entities",
        "Intercompany matching",
        "Audit exports and single sign-on",
        "A named close specialist",
      ],
      limits: ["Unlimited", "Unlimited", "Intercompany and audit", "Unlimited"],
      monthlyHref: "",
      annualHref: "",
    },
  ],
  faq: [
    {
      question: "Does Arclo replace our accounting system?",
      answer:
        "No. Your ledger stays the system of record. Arclo reads balances and transactions, prepares matches and entries for review, and keeps the trail of what was checked and who approved it. The examples on this site run on a small sample dataset in your browser.",
    },
    {
      question: "What does setting up the first close involve?",
      answer:
        "Most of the setup is mapping: which bank accounts feed which ledger accounts, and who signs off on what. Start with one entity and a handful of rules, run a month alongside your current process, then retire the spreadsheets you no longer need.",
    },
    {
      question: "Does a person still review the work?",
      answer:
        "Always. Lines outside your tolerance, entries above an approval limit and unusual variances wait for a named reviewer. Nothing in the included preview posts to a ledger or contacts anyone.",
    },
    {
      question: "What do our auditors get to see?",
      answer:
        "Every reconciled line and every entry keeps its source, the rule that matched it, who prepared it and who signed it off. Download a sample run from the preview to see the shape of that record.",
    },
    {
      question: "Can it handle several entities and currencies?",
      answer:
        "The Group plan describes multi-entity closes and intercompany matching. Bank connections, currency revaluation and consolidation rules belong in your own application; the sample workflows show how the product presents them.",
    },
  ],
  footer: {
    headline: ["Every number,", "accounted for."],
    closing: ["Close sooner.", "Sleep better."],
    description: "Give your team the first week of the month back.",
  },
};
export type Plan = (typeof site.plans)[number];
