/**
 * Everything a visitor reads on the page lives here: brand, copy, figures,
 * services, results, engagements, questions and where every button goes.
 * Edit this file first.
 *
 * Destinations: any `href` can be an anchor ("#results"), a full URL or a
 * mailto: link. Most buttons point at `links.booking`; set it to your
 * scheduling page (Cal.com, Calendly, HubSpot…) and they all follow.
 */

export type Link = { label: string; href: string };

/** A product or email screen. Screens are images, so the page stays fast. */
export type Screen = { src: string; alt: string };

export type Service = { title: string; body: string; deliverables: string[]; image: Screen };

export type Stage = { when: string; title: string; body: string };

export type CaseRow = { brand: string; category: string; result: string; detail: string; image: Screen };

export type Quote = { quote: string; name: string; role: string; brand: string; metric: string };

export type Engagement = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  includes: string[];
  cta: string;
  /** Empty: uses links.booking. */
  href: string;
  featured?: boolean;
};

const hello = "hello@example.com";
const booking = `mailto:${hello}?subject=Strategy%20call%20with%20Encore`;

export const site = {
  /** Used for every number, so the server and browser format them alike. */
  locale: "en-US",

  brand: {
    name: "Encore",
    descriptor: "Email & SMS retention studio",
    description: "Encore designs, writes and runs the email and SMS programmes that bring e-commerce customers back.",
    legalName: "Encore Studio Ltd.",
  },

  meta: {
    title: "Encore | Email & SMS retention for e-commerce brands",
    description:
      "Encore designs, writes and runs the email and SMS flows that turn first-time buyers into regulars. Book a strategy call or claim a free audit.",
  },

  links: {
    /** Your scheduling page. Every "Book a call" button goes here. */
    booking,
    email: hello,
    /** Where "Claim a free audit" goes. Empty: uses booking. */
    audit: "",
  },

  nav: {
    links: [
      { label: "Services", href: "#services" },
      { label: "Process", href: "#process" },
      { label: "Results", href: "#results" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ] as Link[],
    cta: "Book a call",
  },

  hero: {
    rating: { score: "4.9", label: "from 120+ Shopify brands" },
    /** "\n" starts a new line (kept on wide screens). The line equal to `highlight` gets a hand-drawn loop. */
    title: "Make the\nsecond order\ninevitable.",
    highlight: "second order",
    description:
      "Encore designs, writes and runs the email and SMS flows that turn first-time buyers into regulars, so retention stops being the channel you'll get to next quarter.",
    primary: "Book a strategy call",
    secondary: { label: "See the results", href: "#results" } as Link,
    /** The deck of email designs on the right. 600 × 880 at 1×, 2× files. */
    deck: [
      {
        image: { src: "/images/email-halden.webp", alt: "Halden Coffee replenishment email: your ritual is running low, reorder in one tap." },
        flow: "Replenishment flow",
        revenue: 18420,
      },
      {
        image: { src: "/images/email-fable.webp", alt: "Fable & Fern back-in-stock email for the overnight balm." },
        flow: "Back-in-stock flow",
        revenue: 9310,
      },
      {
        image: { src: "/images/email-northloop.webp", alt: "Northloop new-arrivals email: the second layer, in five colours." },
        flow: "New-arrivals campaign",
        revenue: 26780,
      },
      {
        image: { src: "/images/email-pantry.webp", alt: "Peak Pantry abandoned-cart email: still thinking it over?" },
        flow: "Abandoned-cart flow",
        revenue: 14150,
      },
    ] as { image: Screen; flow: string; revenue: number }[],
    deckNote: "this month",
    stats: [
      { value: 48, prefix: "$", suffix: "M", label: "revenue attributed to our flows in 2025" },
      { value: 31, suffix: "%", label: "average share of revenue from email" },
      { value: 2.4, suffix: "x", label: "return on retainer in year one", format: { minimumFractionDigits: 1, maximumFractionDigits: 1 } },
      { value: 120, suffix: "+", label: "brands on Shopify and Shopify Plus" },
    ] as { value: number; prefix?: string; suffix?: string; label: string; format?: Intl.NumberFormatOptions }[],
    brandsLabel: "Bringing customers back for",
    brands: ["Halden", "Fable & Fern", "Northloop", "Peak Pantry", "Otter & Oak", "Lumen Skin", "Saltwork", "Fieldnote"],
  },

  statement: {
    label: "The leak",
    /** Words light up as the visitor scrolls through. */
    text: "Most brands spend forty dollars to win a customer, then email them twice a month. The margin isn't in the first order. It's in the second, the third and the tenth.",
  },

  services: {
    label: "What we run",
    title: "Everything between the first order and the fifth.",
    description: "One team for strategy, copy, design, build and reporting. No hand-offs between agencies, no briefs lost in a thread.",
    items: [
      {
        title: "Lifecycle strategy",
        body: "A map of every moment a customer can buy again, with the revenue each one is leaving on the table.",
        deliverables: ["Flow audit", "Segmentation plan", "90-day roadmap"],
        image: { src: "/images/service-strategy.webp", alt: "Lifecycle map from welcome to win-back with monthly revenue on each flow." },
      },
      {
        title: "Copywriting",
        body: "Subject lines, emails and texts written in your voice, tested against each other, never by a template.",
        deliverables: ["Brand voice guide", "Weekly campaign copy", "SMS scripts"],
        image: { src: "/images/service-copy.webp", alt: "Email draft with three subject-line variants and editor notes." },
      },
      {
        title: "Email & SMS design",
        body: "Modular, on-brand designs that read in a second on a phone and still look right in dark mode.",
        deliverables: ["Design system", "Campaign designs", "Flow templates"],
        image: { src: "/images/service-design.webp", alt: "Email design system with colour tokens, type scale and modular blocks." },
      },
      {
        title: "Klaviyo build",
        body: "Flows, splits, suppression and deliverability set up properly once, then documented so nothing breaks.",
        deliverables: ["Flow builds", "Deliverability setup", "Integrations"],
        image: { src: "/images/service-build.webp", alt: "Abandoned-checkout flow with a trigger, a delay, a split and two emails." },
      },
      {
        title: "Testing",
        body: "A standing test every week: subject lines, offers, send times, timing between messages.",
        deliverables: ["Test calendar", "Significance checks", "Rollout notes"],
        image: { src: "/images/service-testing.webp", alt: "A/B test result: variant B lifted click rate by 18.4%." },
      },
      {
        title: "Reporting",
        body: "Revenue by flow, campaign and segment, reconciled to Shopify, in a monthly review with the people who did the work.",
        deliverables: ["Live dashboard", "Monthly review", "Next-month plan"],
        image: { src: "/images/service-reporting.webp", alt: "Revenue dashboard: email revenue by month, split between flows and campaigns." },
      },
    ] as Service[],
  },

  process: {
    label: "Your first 90 days",
    title: "A quarter to rebuild it. Every month after to compound it.",
    stages: [
      { when: "Week 1", title: "Audit", body: "We read every flow, campaign and segment and price each leak in dollars." },
      { when: "Week 2", title: "Plan", body: "A 90-day roadmap ranked by revenue, not by what's easiest to ship." },
      { when: "Weeks 3–8", title: "Build", body: "Core flows rebuilt, weekly campaigns live, SMS layered in where it pays." },
      { when: "Week 12", title: "Review", body: "Revenue by flow, by campaign, by segment. Then we pick the next quarter's bets." },
    ] as Stage[],
    cta: "Claim a free audit",
  },

  results: {
    label: "Results",
    title: "Revenue you can find in Shopify, not in a slide.",
    featured: {
      brand: "Halden Coffee",
      category: "Coffee subscriptions",
      headline: "From 9% to 34% of revenue from email in five months.",
      quote: "We'd been running the same welcome email since launch. Encore rebuilt everything in six weeks, and email now pays for our entire paid social budget.",
      person: "Jonah Reyes, Founder",
      metrics: [
        { value: 412, prefix: "+$", suffix: "k", label: "flow revenue in five months" },
        { value: 34, suffix: "%", label: "of revenue from email" },
        { value: 2.3, suffix: "x", label: "repeat purchase rate", format: { minimumFractionDigits: 1, maximumFractionDigits: 1 } },
      ] as { value: number; prefix?: string; suffix?: string; label: string; format?: Intl.NumberFormatOptions }[],
      image: { src: "/images/case-halden.webp", alt: "Halden's monthly email revenue, flows and campaigns, rising from January to May." } as Screen,
    },
    rows: [
      {
        brand: "Fable & Fern",
        category: "Skincare",
        result: "$64,000 recovered",
        detail: "from abandoned carts in 45 days",
        image: { src: "/images/email-fable.webp", alt: "Fable & Fern back-in-stock email." },
      },
      {
        brand: "Northloop",
        category: "Apparel",
        result: "+41% flow conversion",
        detail: "after rebuilding browse and cart flows",
        image: { src: "/images/email-northloop.webp", alt: "Northloop new-arrivals email." },
      },
      {
        brand: "Peak Pantry",
        category: "Food & drink",
        result: "2.1x subscription retention",
        detail: "with a three-step pause-not-cancel flow",
        image: { src: "/images/email-pantry.webp", alt: "Peak Pantry abandoned-cart email." },
      },
      {
        brand: "Halden Coffee",
        category: "Coffee",
        result: "+28% campaign revenue",
        detail: "from weekly sends segmented by roast",
        image: { src: "/images/email-halden.webp", alt: "Halden Coffee replenishment email." },
      },
    ] as CaseRow[],
    cta: { label: "Talk about your numbers", href: "" } as Link,
  },

  why: {
    label: "How we work",
    title: "Retention without another tab to manage.",
    big: { value: 2.4, suffix: "x", label: "average return on retainer in a client's first year" },
    points: [
      { title: "Weekly campaigns", body: "Written, designed and scheduled by us. You approve in one thread." },
      { title: "A shared Slack channel", body: "Answers the same working day, from the people doing the work." },
      { title: "Monthly flow refresh", body: "Every flow gets a test or a rewrite each month. Nothing goes stale." },
      { title: "Certified on Klaviyo", body: "Platform partners, so builds follow what the platform rewards." },
      { title: "Month to month after 90 days", body: "We keep clients by results, not by contract terms." },
    ],
  },

  stack: {
    label: "Works with your stack",
    title: "We plug into the tools you already pay for.",
    description: "Set up and connected by us. No new platform to learn, no migration unless it earns its keep.",
    tools: ["Klaviyo", "Shopify", "Postscript", "Attentive", "Recharge", "Okendo", "Gorgias", "Yotpo"],
  },

  testimonials: {
    label: "What clients say",
    items: [
      {
        quote: "The segmentation work alone paid for the engagement. Our repeat purchase rate moved in the first month.",
        name: "Priya Nandakumar",
        role: "Head of Growth",
        brand: "Lumen Skin",
        metric: "+37% repeat purchase rate",
      },
      {
        quote: "They write like they've worked here for years. Customers reply to our emails now, and they're buying.",
        name: "Tom Ellery",
        role: "Founder",
        brand: "Saltwork",
        metric: "4.1% campaign conversion",
      },
      {
        quote: "Our SMS programme went from an afterthought to our second-best channel in a quarter.",
        name: "Ana Ruiz",
        role: "E-commerce Director",
        brand: "Otter & Oak",
        metric: "$118k from SMS in 90 days",
      },
      {
        quote: "Monthly reviews with real numbers from Shopify. No vanity metrics, no surprises.",
        name: "Marcus Bell",
        role: "CEO",
        brand: "Fieldnote",
        metric: "31% revenue from email",
      },
    ] as Quote[],
  },

  pricing: {
    label: "Ways to work with us",
    title: "Start with an audit. Stay for the compounding.",
    description: "Clear monthly retainers, no setup fees, month to month after the first 90 days.",
    engagements: [
      {
        name: "Free audit",
        price: "$0",
        cadence: "one time",
        description: "A recorded walkthrough of your account with the five biggest leaks priced in dollars.",
        includes: ["Flow and campaign review", "Deliverability check", "Prioritised fix list"],
        cta: "Claim your audit",
        href: "",
      },
      {
        name: "Growth",
        price: "$4,500",
        cadence: "per month",
        description: "For brands doing $1–10M a year that want email and SMS run properly.",
        includes: ["Core flows rebuilt and tested", "One campaign a week", "Monthly review and dashboard", "Shared Slack channel"],
        cta: "Book a call",
        href: "",
        featured: true,
      },
      {
        name: "Full lifecycle",
        price: "$8,500",
        cadence: "per month",
        description: "For brands over $10M: email, SMS and loyalty with a dedicated strategist.",
        includes: ["Everything in Growth", "Two campaigns a week", "SMS and loyalty programmes", "Dedicated strategist"],
        cta: "Book a call",
        href: "",
      },
    ] as Engagement[],
  },

  faq: {
    label: "FAQ",
    title: "Questions, answered",
    items: [
      {
        question: "What kind of communication do I get?",
        answer:
          "A shared Slack channel with the strategist, writer and designer on your account, answered the same working day. We also hold a review call every two weeks to go through results and next steps.",
      },
      {
        question: "Who is this for?",
        answer:
          "E-commerce brands on Shopify or Shopify Plus doing roughly $1M to $50M a year that already have a list and want it to earn more. If you're pre-launch, start with the free audit.",
      },
      {
        question: "Do you work in Klaviyo only?",
        answer:
          "Most of our clients are on Klaviyo, with Postscript or Attentive for SMS. We also work in Omnisend and Mailchimp; we'll only suggest moving if it clearly pays for itself.",
      },
      {
        question: "How much does it cost?",
        answer: "Retainers start at $4,500 a month. The audit is free. There are no setup fees and no percentage of revenue.",
      },
      {
        question: "Do you have long-term contracts?",
        answer: "The first 90 days are committed, because that's how long a proper rebuild takes. After that, it's month to month.",
      },
      {
        question: "How do we start?",
        answer: "Book a call or claim the audit. We'll ask for read-only access, review your account and come back within a week with the numbers.",
      },
    ],
    founder: {
      name: "Maya Okafor",
      role: "Founder, Encore",
      note: "Rather talk it through? Book twenty minutes with me.",
      cta: "Book with Maya",
    },
  },

  closing: {
    title: "Your list already wants to buy again.",
    description: "Book a strategy call and we'll show you where the next order is hiding.",
    cta: "Book a strategy call",
    marquee: ["second order", "third order", "tenth order", "subscription", "referral"],
  },

  footer: {
    columns: [
      {
        title: "Studio",
        links: [
          { label: "Services", href: "#services" },
          { label: "Process", href: "#process" },
          { label: "Results", href: "#results" },
          { label: "Pricing", href: "#pricing" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Book a call", href: booking },
          { label: hello, href: `mailto:${hello}` },
          { label: "FAQ", href: "#faq" },
        ],
      },
    ] as { title: string; links: Link[] }[],
    /** Shown only when they have an href. */
    social: [
      { label: "LinkedIn", href: "" },
      { label: "Instagram", href: "" },
      { label: "X", href: "" },
    ] as Link[],
    legal: [
      { label: "Privacy", href: "" },
      { label: "Terms", href: "" },
    ] as Link[],
    partner: "Klaviyo partner · Shopify partner",
  },

  motion: {
    storageKey: "encore-motion",
  },
};

export type Site = typeof site;
