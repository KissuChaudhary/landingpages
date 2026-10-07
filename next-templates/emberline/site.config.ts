/**
 * Everything you are likely to change lives in this file: your brand, your copy, your links.
 * Colours are in app/globals.css (the --color-ember-* ramp). Fonts are in app/layout.tsx.
 *
 * The demo brand "Cinder" and every number, name, quote and logo in the demo are made up. Replace them.
 * TypeScript will tell you if you leave out a field or misspell one.
 */

export interface NavLink {
  label: string;
  href: string;
}

/** A headline in two parts. `accent` is set in the serif italic. */
export interface Accented {
  before: string;
  accent: string;
}

export interface SectionIntro {
  /** Small label above the headline. */
  eyebrow: string;
  title: Accented;
  /** One or two sentences. */
  description: string;
}

export type Support = "yes" | "partial" | "no";

export interface Plan {
  name: string;
  description: string;
  /** Price per month when billed monthly, and when billed yearly (per month). */
  monthly: number;
  yearly: number;
  cta: NavLink;
  /** Highlights the plan as the recommended one. Use it on exactly one plan. */
  featured?: boolean;
  features: string[];
}

export interface Quote {
  quote: string;
  name: string;
  role: string;
}

export interface SiteConfig {
  /** Shown in the navbar, the browser tab and the footer. */
  name: string;
  /** Used for <title> and social previews. */
  title: string;
  description: string;

  nav: { links: NavLink[]; login: NavLink; cta: NavLink };

  hero: {
    badge: { tag: string; text: string };
    headline: Accented;
    description: string;
    primaryCta: NavLink;
    secondaryCta: NavLink;
  };

  /** Made-up company names shown under the hero. Replace them with real customers, with permission. */
  logos: { label: string; names: string[] };

  features: SectionIntro & {
    /** Order matters: the first two cards are wide, the last three are narrow. */
    items: { title: string; description: string }[];
  };

  comparison: SectionIntro & {
    /** Header of the second column. The first column is your brand name. */
    otherLabel: string;
    rows: { label: string; us: Support; them: Support }[];
  };

  steps: SectionIntro & { items: { title: string; description: string }[] };

  testimonials: SectionIntro & {
    featured: Quote;
    items: Quote[];
    stats: { value: string; label: string }[];
  };

  pricing: SectionIntro & {
    yearlyNote: string;
    footnote: string;
    plans: Plan[];
  };

  faq: SectionIntro & {
    items: { question: string; answer: string }[];
    contact: { label: string; href: string };
  };

  cta: {
    title: Accented;
    description: string;
    primary: NavLink;
    secondary: NavLink;
  };

  footer: {
    blurb: string;
    columns: { title: string; links: NavLink[] }[];
    social: { label: "X" | "GitHub" | "LinkedIn"; href: string }[];
    legal: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Cinder",
  title: "Cinder: Get found in every AI answer",
  description:
    "Track how ChatGPT, Claude and Perplexity mention your brand, and get the exact fixes that win the citation.",

  nav: {
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "FAQ", href: "#faq" },
    ],
    login: { label: "Log in", href: "#" },
    cta: { label: "Get started", href: "#" },
  },

  hero: {
    /** Keep the badge text under about 32 characters so it fits on a phone. */
    badge: { tag: "New", text: "Citation tracking for AI search" },
    /** Keep the headline to two lines (about 30 characters). */
    headline: { before: "Get found in every", accent: "AI answer." },
    /** One or two sentences, 90 to 120 characters, so it sets in two even lines. */
    description:
      "Track how ChatGPT, Claude and Perplexity mention your brand, and get the exact fixes that win the citation.",
    primaryCta: { label: "Start free trial", href: "#" },
    secondaryCta: { label: "Book a demo", href: "#" },
  },

  logos: {
    label: "Trusted by growth teams at",
    names: ["Northwind", "Parallel", "Lumen", "Hexa", "Orbit", "Kiln"],
  },

  features: {
    eyebrow: "Features",
    title: { before: "Everything you need to", accent: "win AI search." },
    description:
      "One workspace to see how AI talks about you, why competitors get picked instead, and what to publish next.",
    items: [
      {
        title: "Every model, every mention",
        description: "Daily checks across ChatGPT, Claude, Perplexity and Gemini on the questions your buyers actually ask.",
      },
      {
        title: "Know the moment you're cited",
        description: "Instant alerts when a model starts, stops or changes the way it recommends you.",
      },
      {
        title: "See who wins instead",
        description: "Share of voice against every competitor, per prompt and per model.",
      },
      {
        title: "Fixes, not just charts",
        description: "Every gap comes with the exact page, snippet or source to publish.",
      },
      {
        title: "Reports people read",
        description: "A one-page weekly brief: what moved, why, and what to do next.",
      },
    ],
  },

  comparison: {
    eyebrow: "Compare",
    title: { before: "Built for AI answers,", accent: "not retrofitted." },
    description: "Classic SEO suites track rankings. Cinder tracks what the models actually say about you.",
    otherLabel: "Other tools",
    rows: [
      { label: "Tracks ChatGPT, Claude, Perplexity and Gemini", us: "yes", them: "partial" },
      { label: "Prompt-level citation tracking", us: "yes", them: "no" },
      { label: "Share of voice against competitors", us: "yes", them: "partial" },
      { label: "Exact fixes for every gap", us: "yes", them: "no" },
      { label: "Instant alerts on citation changes", us: "yes", them: "partial" },
      { label: "A weekly report written for you", us: "yes", them: "partial" },
      { label: "Set up in under 10 minutes", us: "yes", them: "no" },
    ],
  },

  steps: {
    eyebrow: "How it works",
    title: { before: "From invisible to", accent: "cited." },
    description: "Three steps, ten minutes, no engineers.",
    items: [
      {
        title: "Add your brand",
        description: "Enter your domain and a few competitors. We map the questions your buyers ask.",
      },
      {
        title: "We ask the models",
        description: "Every day we run those questions across four models and record who gets recommended, and why.",
      },
      {
        title: "Ship the fixes",
        description: "Get a ranked to-do list. Publish, re-check, and watch your citations climb.",
      },
    ],
  },

  testimonials: {
    eyebrow: "Customers",
    title: { before: "Teams that got", accent: "found." },
    description: "What growth teams say after their first month.",
    featured: {
      quote:
        "We went from never appearing in ChatGPT answers to being the first recommendation for three of our core questions in six weeks. Cinder told us exactly which pages to fix.",
      name: "Maya Okafor",
      role: "Head of Growth, Northwind",
    },
    items: [
      {
        quote: "The weekly brief replaced two reports and a standing meeting.",
        name: "Daniel Reyes",
        role: "Marketing Lead, Parallel",
      },
      {
        quote: "Finally a tool that shows why a competitor is recommended, not just that they are.",
        name: "Priya Nair",
        role: "Founder, Lumen",
      },
      {
        quote: "Setup took nine minutes. The first fix paid for the whole year.",
        name: "Tom Becker",
        role: "CMO, Kiln",
      },
    ],
    stats: [
      { value: "3.2×", label: "more citations in 90 days" },
      { value: "41 hrs", label: "saved on reporting each month" },
      { value: "9 min", label: "to your first report" },
    ],
  },

  pricing: {
    eyebrow: "Pricing",
    title: { before: "Simple pricing,", accent: "serious results." },
    description: "Start free for 14 days. No card required.",
    yearlyNote: "Save 20%",
    footnote: "All plans include a 14-day free trial. Cancel any time.",
    plans: [
      {
        name: "Starter",
        description: "For founders getting started.",
        monthly: 29,
        yearly: 23,
        cta: { label: "Start free trial", href: "#" },
        features: ["25 tracked prompts", "2 AI models", "Weekly report", "1 competitor", "Email support"],
      },
      {
        name: "Growth",
        description: "For teams that compete on AI answers.",
        monthly: 79,
        yearly: 63,
        featured: true,
        cta: { label: "Start free trial", href: "#" },
        features: [
          "150 tracked prompts",
          "All 4 AI models",
          "Daily checks and instant alerts",
          "5 competitors",
          "Fix recommendations",
          "Priority support",
        ],
      },
      {
        name: "Scale",
        description: "For brands with many markets.",
        monthly: 199,
        yearly: 159,
        cta: { label: "Talk to sales", href: "#" },
        features: [
          "1,000 tracked prompts",
          "Unlimited competitors",
          "API and webhooks",
          "SSO and roles",
          "A dedicated success manager",
        ],
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: { before: "Questions,", accent: "answered." },
    description: "Everything you need to know before you start.",
    contact: { label: "Ask us anything", href: "#" },
    items: [
      {
        question: "Which AI models do you track?",
        answer:
          "ChatGPT, Claude, Perplexity and Gemini. Growth and Scale track all four; Starter tracks two models of your choice.",
      },
      {
        question: "How do you decide which prompts to track?",
        answer:
          "We analyse your site and your competitors to suggest the questions your buyers ask, and you can add your own at any time.",
      },
      {
        question: "How often is the data refreshed?",
        answer: "Starter refreshes weekly. Growth and Scale refresh daily and send alerts the moment something changes.",
      },
      {
        question: "Can I try it before I pay?",
        answer: "Yes. Every plan starts with a 14-day free trial, and we do not ask for a card.",
      },
      {
        question: "Does it work outside English?",
        answer: "Yes. You can track prompts in more than 30 languages, and reports follow the language you choose.",
      },
      {
        question: "Can I cancel any time?",
        answer: "Yes, from your settings in two clicks. You keep access until the end of the billing period.",
      },
    ],
  },

  cta: {
    title: { before: "Be the answer", accent: "AI gives." },
    description: "Start your 14-day free trial and see where you stand in ten minutes.",
    primary: { label: "Start free trial", href: "#" },
    secondary: { label: "Book a demo", href: "#" },
  },

  footer: {
    blurb: "Track and win citations across ChatGPT, Claude, Perplexity and Gemini.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Changelog", href: "#" },
          { label: "Roadmap", href: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "Blog", href: "#" },
          { label: "Careers", href: "#" },
          { label: "Contact", href: "#" },
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
    social: [
      { label: "X", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
    legal: "All rights reserved.",
  },
};
