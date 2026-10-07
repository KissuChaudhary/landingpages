/**
 * Everything you are likely to change lives in this file: your product name, copy, numbers, prices and links.
 * Colours are in app/globals.css. Fonts are in app/layout.tsx.
 *
 * "Parley", its customers, numbers, quotes and prices are made up. Replace them with your own.
 * TypeScript will tell you if you leave out a field or misspell one.
 */

export interface NavLink {
  label: string;
  href: string;
}

/** A headline in two parts. `accent` is set in the italic serif, in the rose accent colour. */
export interface Accented {
  before: string;
  accent: string;
}

export interface SectionHead {
  /** A short word above the title, for example "Actions". */
  label: string;
  title: Accented;
  description: string;
}

export interface Message {
  from: "customer" | "agent";
  text: string;
  /** A small confirmation line under an agent message, for example "Refund issued". */
  action?: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;

  nav: { links: NavLink[]; login: NavLink; cta: NavLink };

  hero: {
    badge: string;
    /** Sets in three lines at 76px. Keep it to about 30 characters. */
    headline: Accented;
    description: string;
    primaryCta: NavLink;
    secondaryCta: NavLink;
    /** The handwritten note beside the chat. Keep it under six words. */
    note: string;
    chat: { header: string; status: string; messages: Message[] };
    logosLabel: string;
    logos: string[];
  };

  /** The same support request handled twice. A switch swaps the transcript. */
  compare: SectionHead & {
    tabs: { id: "classic" | "parley"; label: string; messages: Message[]; result: { value: string; label: string } }[];
  };

  /** What the agent did, as a log. */
  actions: SectionHead & {
    log: { text: string; source: string; time: string }[];
    integrationsLabel: string;
    integrations: string[];
  };

  results: {
    label: string;
    headline: Accented;
    description: string;
    stats: { value: string; label: string }[];
  };

  quotes: {
    label: string;
    featured: { text: string; name: string; role: string };
    more: { text: string; name: string; role: string }[];
  };

  pricing: SectionHead & {
    plans: { name: string; audience: string; volume: string; price: string; unit: string; cta: string; featured?: boolean }[];
    includedLabel: string;
    included: string[];
  };

  /** Asked as customer messages and answered as agent messages. */
  faq: SectionHead & { items: { question: string; answer: string }[] };

  cta: {
    title: Accented;
    description: string;
    inputLabel: string;
    inputPlaceholder: string;
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
  name: "Parley",
  title: "Parley: AI support that answers like a person",
  description:
    "Parley is an AI support agent that answers like a person and does the work: it looks up orders, issues refunds and hands over to your team with the full story.",

  nav: {
    links: [
      { label: "Why Parley", href: "#why" },
      { label: "Actions", href: "#actions" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    login: { label: "Log in", href: "#" },
    cta: { label: "Try it free", href: "#start" },
  },

  hero: {
    badge: "Trusted by 1,200 support teams",
    headline: { before: "Answers that sound like", accent: "a person." },
    description:
      "Parley is an AI support agent that talks like your best teammate and does the work: it looks up the order, issues the refund and hands over with the full story when it should.",
    primaryCta: { label: "Try it free", href: "#start" },
    secondaryCta: { label: "See it handle a refund", href: "#why" },
    note: "Refunded, no human needed",
    chat: {
      header: "Loomhouse support",
      status: "Parley is online",
      messages: [
        { from: "customer", text: "Hi, my lamp arrived cracked. Can I get my money back?" },
        {
          from: "agent",
          text: "I am sorry about that. I can see order #4821 arrived on Tuesday. Would you like a refund to your card, or a replacement?",
        },
        { from: "customer", text: "Refund please." },
        {
          from: "agent",
          text: "Done. $38.00 is on its way to your Visa ending 4417, and the receipt is in your inbox.",
          action: "Refund issued, order #4821",
        },
      ],
    },
    logosLabel: "Support for",
    logos: ["Loomhouse", "Paperkite", "Tidewell", "Fenwick & Co.", "Okra Goods"],
  },

  compare: {
    label: "Why Parley",
    title: { before: "The same question,", accent: "answered twice." },
    description: "A customer writes in about a damaged order. Switch between a classic chatbot and Parley.",
    tabs: [
      {
        id: "classic",
        label: "Classic chatbot",
        messages: [
          { from: "customer", text: "Hi, my order #4821 arrived damaged. Can I get a refund?" },
          { from: "agent", text: "Sorry, I did not get that. Please choose an option: 1. Track order  2. Returns policy  3. Talk to an agent." },
          { from: "customer", text: "Refund." },
          { from: "agent", text: "Here is our returns policy: loomhouse.example/returns. Is there anything else I can help with?" },
          { from: "customer", text: "No. I want a refund." },
          { from: "agent", text: "Transferring you to an agent. Estimated wait: 38 minutes." },
        ],
        result: { value: "38 min", label: "to reach a person. No refund yet." },
      },
      {
        id: "parley",
        label: "Parley",
        messages: [
          { from: "customer", text: "Hi, my order #4821 arrived damaged. Can I get a refund?" },
          { from: "agent", text: "I am sorry about that. I can see it shipped on Tuesday. Would you like a refund to your card, or a replacement?" },
          { from: "customer", text: "Refund please." },
          {
            from: "agent",
            text: "Done. $38.00 is on its way to your Visa ending 4417, and a receipt is in your inbox. Anything else?",
            action: "Refund issued and receipt sent",
          },
        ],
        result: { value: "41 sec", label: "from first message to a refund." },
      },
    ],
  },

  actions: {
    label: "Actions",
    title: { before: "It does the work,", accent: "not just the talking." },
    description: "Parley connects to the tools your team already uses, so a conversation ends with the problem solved and the paperwork done.",
    log: [
      { text: "Looked up order #4821", source: "Shopify", time: "0.4 s" },
      { text: "Checked the 30-day return window", source: "Your policy", time: "0.1 s" },
      { text: "Issued a $38.00 refund", source: "Stripe", time: "1.2 s" },
      { text: "Emailed the receipt", source: "Gmail", time: "0.8 s" },
      { text: "Tagged the ticket as damaged goods", source: "Zendesk", time: "0.3 s" },
      { text: "Posted a summary to #support", source: "Slack", time: "0.5 s" },
    ],
    integrationsLabel: "Works with",
    integrations: ["Shopify", "Stripe", "Zendesk", "Gmail", "Slack", "HubSpot", "Notion", "Intercom"],
  },

  results: {
    label: "Results",
    headline: { before: "Most conversations end", accent: "without a handover." },
    description: "Across 1,200 teams, Parley resolves the routine questions and hands over the rest with the whole story attached, so your people spend their day on the conversations that need them.",
    stats: [
      { value: "84%", label: "of conversations resolved without a human" },
      { value: "41 sec", label: "average time to resolution" },
      { value: "4.8 / 5", label: "average customer rating" },
    ],
  },

  quotes: {
    label: "Teams",
    featured: {
      text: "Our queue dropped by two thirds in the first week, and customers started thanking the bot.",
      name: "Priya Nair",
      role: "Head of Support, Loomhouse",
    },
    more: [
      { text: "It refunds, it reschedules, and it knows when to call us.", name: "Tom Eriksen", role: "Operations, Paperkite" },
      { text: "Setup took an afternoon. We pasted our help centre and it just worked.", name: "Hana Mori", role: "Founder, Tidewell" },
      { text: "Finally a bot our customers do not try to escape.", name: "Leo Fenwick", role: "CX Lead, Fenwick & Co." },
    ],
  },

  pricing: {
    label: "Pricing",
    title: { before: "Pay for", accent: "conversations." },
    description: "Every plan includes everything below. You only choose how many conversations a month.",
    plans: [
      { name: "Starter", audience: "For trying it on real customers", volume: "100 conversations a month", price: "Free", unit: "", cta: "Start free" },
      { name: "Growth", audience: "For teams answering every day", volume: "2,000 conversations a month", price: "$79", unit: "a month", cta: "Choose Growth", featured: true },
      { name: "Scale", audience: "For busy stores and platforms", volume: "10,000 conversations a month", price: "$299", unit: "a month", cta: "Choose Scale" },
    ],
    includedLabel: "Every plan includes",
    included: [
      "Trained on your help centre in minutes",
      "Answers around the clock in 40+ languages",
      "Hands over to your team with the full conversation",
      "Actions in Shopify, Stripe and Zendesk",
      "A weekly report on what customers ask",
    ],
  },

  faq: {
    label: "Questions",
    title: { before: "Ask us", accent: "anything." },
    description: "The questions teams ask before they switch it on.",
    items: [
      {
        question: "What can it actually do?",
        answer: "It answers from your help centre and past tickets, and it can take actions in connected tools: look up orders, issue refunds, change addresses and book callbacks.",
      },
      {
        question: "Will it make things up?",
        answer: "It only answers from what you have given it. If it is not sure, it says so and hands over to your team with the conversation so far.",
      },
      {
        question: "How does the handover work?",
        answer: "The conversation moves to your inbox with a short summary, what the customer wants and what Parley already tried. Customers never repeat themselves.",
      },
      {
        question: "How long does setup take?",
        answer: "Most teams are live the same afternoon. Paste your help centre link, connect your store, and test it in the preview before you publish.",
      },
      {
        question: "Can it match our tone?",
        answer: "Yes. You describe how your team writes, and you can edit the guidance at any time. Every reply follows it.",
      },
    ],
  },

  cta: {
    title: { before: "Meet your newest", accent: "teammate." },
    description: "Paste your help centre link and chat with Parley as your customers would, in about two minutes.",
    inputLabel: "Help centre link",
    inputPlaceholder: "help.yourstore.com",
    button: "Train Parley",
    note: "Free to try. No card required.",
  },

  footer: {
    blurb: "The AI support agent that answers like a person.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Why Parley", href: "#why" },
          { label: "Actions", href: "#actions" },
          { label: "Pricing", href: "#pricing" },
          { label: "Changelog", href: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "Customers", href: "#" },
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
    legal: "All rights reserved.",
  },
};
