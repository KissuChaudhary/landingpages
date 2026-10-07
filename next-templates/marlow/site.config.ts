/**
 * Everything you are likely to change lives in this file: your studio name, your copy, your links.
 * Colours are in app/globals.css. Fonts are in app/layout.tsx.
 *
 * "Marlow", its clients, numbers, quotes and prices are made up for the demo. Replace them with your own.
 * TypeScript will tell you if you leave out a field or misspell one.
 */

export interface NavLink {
  label: string;
  href: string;
}

/** The pastel tints available for accents. Each has a solid and a soft version in app/globals.css. */
export type Tint = "butter" | "peach" | "mint" | "sky" | "rose";

/** A headline in two parts. `accent` is set in the italic serif. */
export interface Accented {
  before: string;
  accent: string;
}

export interface SectionIntro {
  /** Small label above the section, for example "Services". */
  label: string;
  title: Accented;
  /** One or two sentences. */
  description: string;
}

export interface SiteConfig {
  /** Shown in the navbar, the browser tab and the footer wordmark. */
  name: string;
  /** Used for <title> and social previews. */
  title: string;
  description: string;

  nav: { links: NavLink[]; cta: NavLink };

  hero: {
    /** The line above the headline. `live` shows a pulsing green dot. */
    eyebrow: { text: string; live: boolean };
    /** Keep to about 36 characters: it sets in three lines. */
    headline: Accented;
    /** One or two sentences, about 120 characters. */
    description: string;
    primaryCta: NavLink;
    secondaryCta: NavLink;
    /** The two demo panels. Edit freely, or replace HeroPanels.tsx with your own visual. */
    accounts: { title: string; link: string; people: { name: string; company: string; tint: Tint }[] };
    rhythm: {
      title: string;
      value: string;
      delta: string;
      deltaNote: string;
      /** Seven bars, Monday to Sunday. Heights are 0 to 100. */
      bars: { day: string; height: number; tint: Tint }[];
    };
  };

  logos: { label: string; names: string[] };

  /** The manifesto. Segments with a `tint` are drawn with a highlighter mark. */
  approach: {
    label: string;
    text: { text: string; tint?: Tint }[];
    stats: { value: string; label: string }[];
  };

  services: SectionIntro & {
    items: { title: string; description: string; tags: string[]; tint: Tint; href: string }[];
  };

  work: SectionIntro & {
    items: {
      client: string;
      tags: string[];
      /** The big figure, for example "+212%". */
      figure: string;
      caption: string;
      tint: Tint;
      /** The small drawing in the corner of the tile. */
      glyph: "line" | "bars" | "steps";
    }[];
    /** The dark tile at the end. */
    more: { title: string; cta: NavLink };
  };

  process: SectionIntro & {
    /** How many weeks the chart shows. */
    weeks: number;
    phases: { title: string; description: string; start: number; end: number; tint: Tint }[];
    footnote: string;
  };

  testimonials: {
    label: string;
    featured: { quote: string; name: string; role: string; tint: Tint };
    items: { quote: string; name: string; role: string; tint: Tint }[];
    rating: { value: string; note: string };
  };

  pricing: SectionIntro & {
    plans: {
      name: string;
      tagline: string;
      duration: string;
      includes: string[];
      price: string;
      /** Shown after the price, for example "/ month". */
      unit: string;
      cta: NavLink;
      /** Draws the row dark. Use it on exactly one plan. */
      featured?: boolean;
    }[];
    footnote: string;
  };

  faq: SectionIntro & { items: { question: string; answer: string }[] };

  cta: {
    title: Accented;
    description: string;
    primary: NavLink;
    secondary: NavLink;
    slotsTitle: string;
    slots: { day: string; times: string }[];
    slotsNote: string;
  };

  footer: {
    blurb: string;
    columns: { title: string; links: NavLink[] }[];
    legal: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Marlow",
  title: "Marlow: Strategy and growth for young teams",
  description:
    "Marlow is a small studio that embeds with startups to sharpen strategy, tighten operations and build teams that last.",

  nav: {
    links: [
      { label: "Approach", href: "#approach" },
      { label: "Services", href: "#services" },
      { label: "Work", href: "#work" },
      { label: "Pricing", href: "#pricing" },
    ],
    cta: { label: "Contact us", href: "#contact" },
  },

  hero: {
    eyebrow: { text: "Taking on two new teams this quarter", live: true },
    headline: { before: "We help young teams", accent: "grow on purpose." },
    description:
      "Marlow is a small studio that embeds with startups to sharpen strategy, tighten operations and build teams that last.",
    primaryCta: { label: "Book an intro call", href: "#contact" },
    secondaryCta: { label: "See our work", href: "#work" },
    accounts: {
      title: "Accounts",
      link: "All accounts",
      people: [
        { name: "Maggie Johnson", company: "Oasis Organic Inc.", tint: "peach" },
        { name: "Chris Friedkly", company: "Supermarket Villanova", tint: "mint" },
        { name: "Gael Harry", company: "New York Finest Fruits", tint: "butter" },
      ],
    },
    rhythm: {
      title: "Focus time",
      value: "2h 20m",
      delta: "+30m",
      deltaNote: "this week",
      bars: [
        { day: "M", height: 42, tint: "sky" },
        { day: "T", height: 66, tint: "peach" },
        { day: "W", height: 48, tint: "butter" },
        { day: "T", height: 82, tint: "mint" },
        { day: "F", height: 58, tint: "sky" },
        { day: "S", height: 30, tint: "rose" },
        { day: "S", height: 46, tint: "peach" },
      ],
    },
  },

  logos: {
    label: "Teams we have worked with",
    names: ["Northfield", "Kiln & Co", "Parallel", "Vesper", "Lumen", "Atlas"],
  },

  approach: {
    label: "Approach",
    text: [
      { text: "Most startups do not have a growth problem. They have a " },
      { text: "clarity", tint: "butter" },
      { text: " problem. We start by deciding what matters, then build the " },
      { text: "operating rhythm", tint: "mint" },
      { text: " that keeps it that way, and finally we " },
      { text: "step back", tint: "peach" },
      { text: " so your team owns it." },
    ],
    stats: [
      { value: "38", label: "teams since 2021" },
      { value: "11 wks", label: "median engagement" },
      { value: "94%", label: "renew or refer" },
    ],
  },

  services: {
    label: "Services",
    title: { before: "Three ways we", accent: "work with you." },
    description: "Pick one, or let us build a plan across all three. Every engagement ends with a handover.",
    items: [
      {
        title: "Strategy",
        description: "Positioning, planning and a one-page strategy your whole team can repeat from memory.",
        tags: ["Positioning", "Roadmaps", "Pricing"],
        tint: "butter",
        href: "#",
      },
      {
        title: "Operations",
        description: "Decision cadences, metrics and tooling that remove the Monday-morning scramble.",
        tags: ["Metrics", "Rituals", "Tooling"],
        tint: "mint",
        href: "#",
      },
      {
        title: "Team",
        description: "Hiring plans, onboarding and manager coaching for teams growing from ten to sixty.",
        tags: ["Hiring", "Coaching", "Culture"],
        tint: "peach",
        href: "#",
      },
    ],
  },

  work: {
    label: "Selected work",
    title: { before: "Results our clients", accent: "still talk about." },
    description: "A few engagements, and what changed after we left.",
    items: [
      {
        client: "Northfield",
        tags: ["Strategy", "Operations"],
        figure: "+212%",
        caption: "qualified pipeline in two quarters, after we replaced five competing goals with one.",
        tint: "peach",
        glyph: "line",
      },
      {
        client: "Kiln & Co",
        tags: ["Team"],
        figure: "21 to 9",
        caption: "days to onboard a new hire, with a playbook the managers now maintain themselves.",
        tint: "mint",
        glyph: "bars",
      },
      {
        client: "Parallel",
        tags: ["Strategy", "Pricing"],
        figure: "2.1×",
        caption: "average contract value after a pricing model built around outcomes, not seats.",
        tint: "sky",
        glyph: "steps",
      },
    ],
    more: { title: "Your team could be next.", cta: { label: "Start a conversation", href: "#contact" } },
  },

  process: {
    label: "Process",
    title: { before: "How an engagement", accent: "runs." },
    description: "Six weeks, four phases, a review every Friday. You always know where we are.",
    weeks: 6,
    phases: [
      {
        title: "Diagnose",
        description: "Interviews, data and a frank read of where the team actually is.",
        start: 1,
        end: 2,
        tint: "butter",
      },
      {
        title: "Design",
        description: "One strategy, a small set of metrics and the rhythm that runs them.",
        start: 2,
        end: 4,
        tint: "mint",
      },
      {
        title: "Deploy",
        description: "We run the new cadence beside you until it feels ordinary.",
        start: 4,
        end: 6,
        tint: "peach",
      },
      {
        title: "Hand over",
        description: "A playbook, a recorded walkthrough and a calendar your team owns.",
        start: 6,
        end: 6,
        tint: "sky",
      },
    ],
    footnote: "Longer engagements repeat the last two phases each quarter.",
  },

  testimonials: {
    label: "Kind words",
    featured: {
      quote:
        "Marlow did not hand us a deck. They sat in our Monday meeting for six weeks until we stopped needing them, and the cadence they left behind is still the way we run the company.",
      name: "Maya Okafor",
      role: "CEO, Northfield",
      tint: "peach",
    },
    items: [
      {
        quote: "The first studio that told us what to stop doing.",
        name: "Daniel Reyes",
        role: "Co-founder, Kiln & Co",
        tint: "mint",
      },
      {
        quote: "Calm, direct and quietly rigorous. Our managers still quote them.",
        name: "Priya Nair",
        role: "COO, Parallel",
        tint: "sky",
      },
    ],
    rating: { value: "4.9", note: "average from 38 founders" },
  },

  pricing: {
    label: "Pricing",
    title: { before: "Clear terms,", accent: "no surprises." },
    description: "Fixed fees and a named lead on every engagement. Pay by the sprint, or by the month.",
    plans: [
      {
        name: "Sprint",
        tagline: "One decision, made well.",
        duration: "4 weeks",
        includes: ["Strategy audit", "One-page strategy", "Two working sessions", "Written recommendations"],
        price: "$6,500",
        unit: "fixed",
        cta: { label: "Start a sprint", href: "#contact" },
      },
      {
        name: "Embed",
        tagline: "We work inside your team.",
        duration: "3 months",
        includes: [
          "Weekly working sessions",
          "Operating cadence and metrics",
          "Hiring and onboarding support",
          "Friday review, every week",
        ],
        price: "$9,000",
        unit: "/ month",
        cta: { label: "Book an intro call", href: "#contact" },
        featured: true,
      },
      {
        name: "Partner",
        tagline: "A fractional growth team.",
        duration: "Ongoing",
        includes: ["Everything in Embed", "A named senior lead", "Quarterly planning offsite", "Board and investor support"],
        price: "Custom",
        unit: "",
        cta: { label: "Talk to us", href: "#contact" },
      },
    ],
    footnote: "All prices in USD. Nonprofits and teams under five people: ask us about our sliding scale.",
  },

  faq: {
    label: "Questions",
    title: { before: "Good questions,", accent: "honest answers." },
    description: "If yours is not here, write to us. We reply within a working day.",
    items: [
      {
        question: "Who do you work best with?",
        answer:
          "Founder-led teams of 10 to 60 people who already have customers and want to grow without the chaos. We are a poor fit for pre-product ideas.",
      },
      {
        question: "Do you work remotely?",
        answer:
          "Yes. Most engagements are remote with one in-person week at the start. We sit in your meetings and your Slack, not in a separate room.",
      },
      {
        question: "How is a sprint different from an embed?",
        answer:
          "A sprint answers one question in four weeks. An embed changes how the team operates, which takes about three months to stick.",
      },
      {
        question: "What happens when the engagement ends?",
        answer:
          "You keep a playbook, a recorded walkthrough and the calendar we built. We offer a free check-in at 90 days, and most teams never need more.",
      },
      {
        question: "Can you work with our investors or board?",
        answer: "Yes, on Embed and Partner engagements. We prepare the narrative and the numbers, and your team presents.",
      },
    ],
  },

  cta: {
    title: { before: "Let us find your next", accent: "obvious move." },
    description: "A 30-minute intro call, no deck and no pitch. You leave with one thing to try on Monday.",
    primary: { label: "Book an intro call", href: "#" },
    secondary: { label: "Write to us", href: "#" },
    slotsTitle: "Next open slots",
    slots: [
      { day: "Tue", times: "10:30 and 15:00" },
      { day: "Wed", times: "09:00 and 14:00" },
      { day: "Thu", times: "11:30 and 16:00" },
    ],
    slotsNote: "All times in your timezone.",
  },

  footer: {
    blurb: "A small studio for strategy and growth. Based wherever the team is.",
    columns: [
      {
        title: "Studio",
        links: [
          { label: "Approach", href: "#approach" },
          { label: "Services", href: "#services" },
          { label: "Work", href: "#work" },
          { label: "Pricing", href: "#pricing" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Book a call", href: "#contact" },
          { label: "hello@marlow.studio", href: "#" },
          { label: "LinkedIn", href: "#" },
          { label: "Newsletter", href: "#" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy", href: "#" },
          { label: "Terms", href: "#" },
        ],
      },
    ],
    legal: "All rights reserved.",
  },
};
