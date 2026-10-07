/**
 * Everything you are likely to change lives in this file: your product name, copy, numbers, prices and links.
 * Colours are in app/globals.css. Fonts are in app/layout.tsx.
 *
 * "Kept", its customers, numbers, quotes, prices and the tax rates shown in the demo are made up and for
 * illustration only. Replace them with your own. TypeScript will tell you if you leave out a field or misspell one.
 */

export interface NavLink {
  label: string;
  href: string;
}

/** A headline in two parts. `accent` is set in the italic serif, in the green accent colour. */
export interface Accented {
  before: string;
  accent: string;
}

export interface SectionHead {
  /** A short word above the title, for example "The year". */
  label: string;
  title: Accented;
  description: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;

  nav: { links: NavLink[]; login: NavLink; cta: NavLink };

  hero: {
    /** Sets in three lines at 84px. Keep it to about 28 characters. */
    headline: Accented;
    description: string;
    primaryCta: NavLink;
    secondaryCta: NavLink;
    note: string;
    /** The invoice sheet. `split` percentages must add up to 100. */
    sheet: {
      number: string;
      client: string;
      status: string;
      amount: number;
      splitLabel: string;
      split: { label: string; percent: number; tone: "tax" | "buffer" | "yours" }[];
      next: string;
    };
    stats: { value: string; label: string }[];
  };

  /** A year of income, split into the share you set aside and the share you keep. */
  year: SectionHead & {
    /** The share of every payment set aside for tax, from 0 to 1. */
    rate: number;
    months: { month: string; income: number }[];
    legend: { tax: string; yours: string };
    /** Payments to the tax office. `from` and `to` are month indexes (0 is January) the payment covers. */
    due: { date: string; label: string; from: number; to: number; at: number }[];
    totals: { setAside: string; surprise: string; surpriseValue: string };
    disclaimer: string;
  };

  /** The product as a statement: a line, a dotted leader, and a figure. */
  ledger: SectionHead & {
    items: { label: string; value: string; detail: string }[];
  };

  quotes: {
    label: string;
    title: Accented;
    columns: { person: string; said: string; kept: string };
    items: { name: string; work: string; text: string; kept: string }[];
  };

  /** One plan, set as a receipt. */
  pricing: SectionHead & {
    receipt: { title: string; subtitle: string; lines: { label: string; amount: string }[]; total: { label: string; amount: string }; note: string };
    cta: NavLink;
    free: { title: string; text: string; cta: NavLink };
  };

  faq: SectionHead & { items: { question: string; answer: string }[] };

  cta: {
    title: Accented;
    description: string;
    emailLabel: string;
    emailPlaceholder: string;
    button: string;
    note: string;
  };

  footer: {
    blurb: string;
    columns: { title: string; links: NavLink[] }[];
    legal: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Kept",
  title: "Kept: invoicing that sets your tax aside",
  description:
    "Kept is invoicing for freelancers. It sets your tax aside the moment a client pays, so the bill in April is never a surprise.",

  nav: {
    links: [
      { label: "The year", href: "#year" },
      { label: "What it does", href: "#ledger" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    login: { label: "Log in", href: "#" },
    cta: { label: "Start free", href: "#start" },
  },

  hero: {
    headline: { before: "Get paid. Keep", accent: "what is yours." },
    description:
      "Kept is invoicing for freelancers. The moment a client pays, it sets your tax aside, so the bill in April is never a surprise.",
    primaryCta: { label: "Start free", href: "#start" },
    secondaryCta: { label: "See a year of income", href: "#year" },
    note: "Free for three clients. No card.",
    sheet: {
      number: "Invoice 1042",
      client: "Northwind Studio",
      status: "Paid on Tuesday",
      amount: 4800,
      splitLabel: "Split the moment it landed",
      split: [
        { label: "Tax, set aside", percent: 24, tone: "tax" },
        { label: "Business buffer", percent: 6, tone: "buffer" },
        { label: "Yours to spend", percent: 70, tone: "yours" },
      ],
      next: "Next tax payment: 15 June, already 83% covered",
    },
    stats: [
      { value: "12,400", label: "freelancers" },
      { value: "$86M", label: "invoiced" },
      { value: "9 days", label: "faster to be paid" },
    ],
  },

  year: {
    label: "The year",
    title: { before: "A year of income,", accent: "already divided." },
    description:
      "Every payment is split on arrival. By the time a tax date comes round, the money is sitting in its own pot, not spent.",
    rate: 0.24,
    months: [
      { month: "Jan", income: 3600 },
      { month: "Feb", income: 5200 },
      { month: "Mar", income: 4400 },
      { month: "Apr", income: 6800 },
      { month: "May", income: 4800 },
      { month: "Jun", income: 7600 },
      { month: "Jul", income: 3200 },
      { month: "Aug", income: 2800 },
      { month: "Sep", income: 6400 },
      { month: "Oct", income: 8200 },
      { month: "Nov", income: 5600 },
      { month: "Dec", income: 4200 },
    ],
    legend: { tax: "Set aside for tax", yours: "Yours to spend" },
    due: [
      { date: "15 Jan", label: "Fourth payment, last year", from: 9, to: 11, at: 0 },
      { date: "15 Apr", label: "First payment", from: 0, to: 2, at: 3 },
      { date: "15 Jun", label: "Second payment", from: 3, to: 4, at: 5 },
      { date: "15 Sep", label: "Third payment", from: 5, to: 7, at: 8 },
    ],
    totals: { setAside: "Set aside this year", surprise: "Surprise bill in April", surpriseValue: "$0" },
    disclaimer: "Illustration with a 24% rate. Your rate and dates depend on where you live and how you file.",
  },

  ledger: {
    label: "What it does",
    title: { before: "Everything a freelancer chases,", accent: "done for you." },
    description: "Six jobs that used to eat a Friday afternoon, each one handled from the same invoice.",
    items: [
      {
        label: "Invoices that get paid",
        value: "9 days faster",
        detail: "One link, three ways to pay: card, bank transfer or PayPal. Clients pay in two taps and never make an account.",
      },
      {
        label: "Reminders that stay polite",
        value: "Sent for you",
        detail: "A friendly nudge on day three, a firmer one on day seven, and a call to action on day fourteen. In your voice, from your address.",
      },
      {
        label: "Tax set aside on every payment",
        value: "Your rate",
        detail: "Pick a percentage once. Each payment is split into tax, a business buffer and money you can spend, before you see it.",
      },
      {
        label: "Quarterly payments, ready",
        value: "One tap",
        detail: "Kept shows what you owe and when, with the exact figure, so paying the tax office takes a minute, not a weekend.",
      },
      {
        label: "Expenses and receipts",
        value: "Snap, done",
        detail: "Photograph a receipt and it is read, filed and counted against your tax. Mileage is logged from a trip you tap once.",
      },
      {
        label: "A year your accountant can read",
        value: "CSV and PDF",
        detail: "Income, expenses and tax in one clean export, with every invoice and receipt attached. No shoebox required.",
      },
    ],
  },

  quotes: {
    label: "Freelancers",
    title: { before: "Said by people who", accent: "stopped dreading April." },
    columns: { person: "Freelancer", said: "What they said", kept: "Kept aside last year" },
    items: [
      {
        name: "Ines Almeida",
        work: "Brand designer",
        text: "I used to guess at tax and be wrong. Now the money is already there and I just pay it.",
        kept: "$18,240",
      },
      {
        name: "Daniel Okoye",
        work: "Developer",
        text: "Clients pay in two days instead of two weeks. I have not sent a chasing email since March.",
        kept: "$31,900",
      },
      {
        name: "Mara Lindqvist",
        work: "Photographer",
        text: "Receipts used to live in a shoebox. Now my accountant asks how I got so organised.",
        kept: "$12,760",
      },
      {
        name: "Sam Whitfield",
        work: "Copywriter",
        text: "It does the boring part of freelancing so quietly that I forgot it was the boring part.",
        kept: "$15,480",
      },
    ],
  },

  pricing: {
    label: "Pricing",
    title: { before: "One flat price,", accent: "not a cut." },
    description: "You keep every dollar a client sends you. Kept costs the same whether you invoice a little or a lot.",
    receipt: {
      title: "Kept Pro",
      subtitle: "For one freelancer, billed monthly",
      lines: [
        { label: "Unlimited clients and invoices", amount: "Included" },
        { label: "Tax set-aside and payment dates", amount: "Included" },
        { label: "Automatic reminders", amount: "Included" },
        { label: "Receipts, mileage and expenses", amount: "Included" },
        { label: "Accountant export", amount: "Included" },
      ],
      total: { label: "Total per month", amount: "$12" },
      note: "Cancel any time. Your data and exports stay yours.",
    },
    cta: { label: "Start 14 days free", href: "#start" },
    free: {
      title: "Just starting out?",
      text: "Kept is free for up to three clients, forever. No card, and the tax set-aside is included.",
      cta: { label: "Start free", href: "#start" },
    },
  },

  faq: {
    label: "Questions",
    title: { before: "Before you", accent: "ask." },
    description: "Short answers to what freelancers want to know first.",
    items: [
      {
        question: "Does Kept move my money?",
        answer:
          "Kept splits your income on paper and shows you what to move. Your payments land in your own bank account, and you can link a savings pot to hold the tax share.",
      },
      {
        question: "How does it know how much tax to set aside?",
        answer:
          "You choose a percentage, and Kept suggests one from your income and country. You can change it any time, and past payments keep the rate they had.",
      },
      {
        question: "Is Kept a replacement for an accountant?",
        answer:
          "No. It keeps your income, expenses and tax in order so a good accountant has less to do, and costs you less. It gives estimates, not advice.",
      },
      {
        question: "Which countries and currencies does it support?",
        answer: "You can invoice in 30 currencies. Tax estimates are available for the US, UK, Canada, Australia and the EU, with more on the way.",
      },
      {
        question: "What if a client never pays?",
        answer:
          "Kept keeps reminding them politely, then gives you a ready-made final notice. If you write the invoice off, the tax you set aside on it is released back to you.",
      },
      {
        question: "Can I bring my old invoices?",
        answer: "Yes. Import a CSV from your spreadsheet or another tool, and your history and clients come across in a minute.",
      },
    ],
  },

  cta: {
    title: { before: "Make April", accent: "boring." },
    description: "Send your first invoice in five minutes. The tax is set aside before the money arrives.",
    emailLabel: "Email address",
    emailPlaceholder: "you@studio.com",
    button: "Start free",
    note: "Free for three clients. No card required.",
  },

  footer: {
    blurb: "Invoicing for freelancers that sets your tax aside.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "The year", href: "#year" },
          { label: "What it does", href: "#ledger" },
          { label: "Pricing", href: "#pricing" },
          { label: "Changelog", href: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "Journal", href: "#" },
          { label: "Careers", href: "#" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy", href: "#" },
          { label: "Terms", href: "#" },
          { label: "Security", href: "#" },
        ],
      },
    ],
    legal: "All rights reserved. Kept gives estimates, not tax advice.",
  },
};
