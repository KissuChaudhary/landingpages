/**
 * Everything you are likely to change lives in this file: your product name, copy, numbers and links.
 * Colours are in app/globals.css. Fonts are in app/layout.tsx.
 *
 * "Footnote", its customers, numbers, quotes and every source named in the demo are made up. Replace them
 * with your own. TypeScript will tell you if you leave out a field or misspell one.
 */

export interface NavLink {
  label: string;
  href: string;
}

/** A headline in two parts. `accent` is set in the italic serif, in the accent colour. */
export interface Accented {
  before: string;
  accent: string;
}

export interface SectionHead {
  /** A short word above the title, for example "Method". */
  label: string;
  title: Accented;
  description: string;
}

export interface SiteConfig {
  /** Shown in the navbar, the browser tab and the footer. */
  name: string;
  title: string;
  description: string;

  nav: { links: NavLink[]; login: NavLink; cta: NavLink };

  hero: {
    announcement: NavLink;
    /** Sets in two lines at 88px. Keep it to about 28 characters. */
    headline: Accented;
    description: string;
    primaryCta: NavLink;
    secondaryCta: NavLink;
    logosLabel: string;
    logos: string[];
  };

  /** Two drafts of the same paragraph, side by side. */
  difference: SectionHead & {
    before: {
      label: string;
      /** Segments with a `flag` are underlined and marked as uncited. */
      text: { text: string; flag?: boolean }[];
      summary: string;
    };
    after: {
      label: string;
      /** Segments with a `ref` carry a footnote marker. Numbers must match the footnotes list. */
      text: { text: string; ref?: number }[];
      footnotes: string[];
      summary: string;
    };
  };

  /** An annotated draft: a line from the article, and what the agent did to it. */
  method: SectionHead & {
    rows: { agent: string; excerpt: { text: string; mark?: boolean }[]; note: string }[];
  };

  engine: SectionHead & {
    spreads: { title: string; body: string; stat: { value: string; label: string }; visual: "matrix" | "sources" | "voice" }[];
    matrix: { beforeLabel: string; afterLabel: string; caption: string };
    sources: { title: string; items: { domain: string; kind: string; used: boolean }[] };
    voice: {
      yours: { label: string; text: string };
      ours: { label: string; text: string };
      traits: { value: string; label: string }[];
    };
  };

  proof: {
    label: string;
    metrics: { value: string; label: string }[];
    footnote: string;
    quote: { text: string; name: string; role: string };
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
  name: "Footnote",
  title: "Footnote: Be the source AI quotes",
  description:
    "Footnote is an agentic writer that researches, drafts and verifies long-form articles, built to earn citations in ChatGPT, Perplexity and Google AI Overviews.",

  nav: {
    links: [
      { label: "Difference", href: "#difference" },
      { label: "Method", href: "#method" },
      { label: "Engine", href: "#engine" },
      { label: "FAQ", href: "#faq" },
    ],
    login: { label: "Log in", href: "#" },
    cta: { label: "Start free trial", href: "#start" },
  },

  hero: {
    announcement: { label: "New: citation tracking for Perplexity and AI Overviews", href: "#engine" },
    headline: { before: "Be the source", accent: "AI quotes." },
    description:
      "Footnote is an agentic writer that researches, drafts and verifies long-form articles, built to earn citations in ChatGPT, Perplexity and Google AI Overviews.",
    primaryCta: { label: "Start free trial", href: "#start" },
    secondaryCta: { label: "Read the method", href: "#method" },
    logosLabel: "Written with Footnote at",
    logos: ["Pipelinx", "Ephicient", "Dunha", "Northwind"],
  },

  difference: {
    label: "The difference",
    title: { before: "It is in the", accent: "sentences." },
    description: "The same paragraph, written twice. One reads like every other article. The other can be cited.",
    before: {
      label: "A single prompt",
      text: [
        { text: "Many experts believe", flag: true },
        { text: " that content marketing is becoming more important in today's digital landscape. " },
        { text: "Studies show", flag: true },
        { text: " that businesses that publish consistently tend to see better results over time, and " },
        { text: "it is widely agreed", flag: true },
        { text: " that quality matters." },
      ],
      summary: "0 sources. 0 claims anyone can check.",
    },
    after: {
      label: "Footnote",
      text: [
        { text: "B2B teams that publish four or more articles a month earn 3.2 times more AI citations than teams that publish one." , ref: 1 },
        { text: " The gap is widest on comparison queries, where models prefer pages that carry primary data." , ref: 2 },
      ],
      footnotes: [
        "Northwind Research, Citation Share Report, 2026.",
        "Kiln Analytics, AI Answer Sources, 2026.",
      ],
      summary: "2 sources. Every claim checked before delivery.",
    },
  },

  method: {
    label: "Method",
    title: { before: "How an article", accent: "gets made." },
    description: "Four agents work on the same draft. Here is a page of it, with their notes in the margin.",
    rows: [
      {
        agent: "Research",
        excerpt: [
          { text: "Teams that publish weekly are " },
          { text: "cited 3.2 times more often", mark: true },
          { text: " than teams that publish monthly." },
        ],
        note: "Found the study, confirmed it in two primary sources, and attached the citation to the sentence.",
      },
      {
        agent: "Voice",
        excerpt: [
          { text: "We keep drafts short. " },
          { text: "Plain verbs, no hedging", mark: true },
          { text: ", and one idea to a paragraph." },
        ],
        note: "Matched your last 50 posts: sentence length, vocabulary and the way you open a paragraph.",
      },
      {
        agent: "Draft",
        excerpt: [
          { text: "As the second section showed, " },
          { text: "the same gap appears on comparison queries", mark: true },
          { text: "." },
        ],
        note: "Wrote this paragraph knowing everything before it, so nothing repeats and nothing contradicts.",
      },
      {
        agent: "Verify",
        excerpt: [
          { text: "The benchmark covered " },
          { text: "4,120 queries across three engines", mark: true },
          { text: "." },
        ],
        note: "Rechecked the number against the source before it reached you. Two claims failed and were rewritten.",
      },
    ],
  },

  engine: {
    label: "Engine",
    title: { before: "Inside the", accent: "engine." },
    description: "Three things a single prompt cannot do, and what each one changes in the finished article.",
    spreads: [
      {
        title: "Every section knows the last.",
        body: "Most tools write an article in one pass and lose the thread by section five. Footnote drafts recursively: each section is written with everything before it in view, so the argument builds instead of drifting.",
        stat: { value: "98.4%", label: "coherence across 4,000-word articles" },
        visual: "matrix",
      },
      {
        title: "Sources, not guesses.",
        body: "The research agent reads live pages, keeps only primary sources with an author and a date, and writes every claim with its citation already attached. What it cannot verify, it leaves out.",
        stat: { value: "31 of 31", label: "claims cited in the median article" },
        visual: "sources",
      },
      {
        title: "Your voice, extracted.",
        body: "Footnote reads your best-performing posts and builds a fingerprint of how you write: cadence, vocabulary, the way you open. Drafts follow it, so editors fix facts, not tone.",
        stat: { value: "92%", label: "of drafts need no tone edits" },
        visual: "voice",
      },
    ],
    matrix: {
      beforeLabel: "Single prompt",
      afterLabel: "Footnote",
      caption: "Coherence by section, 12 sections",
    },
    sources: {
      title: "Sources for one article",
      items: [
        { domain: "northwind.example/research", kind: "Primary data", used: true },
        { domain: "kiln.example/reports", kind: "Primary data", used: true },
        { domain: "dunha.example/docs", kind: "Documentation", used: true },
        { domain: "journal.example/2026", kind: "Peer reviewed", used: true },
        { domain: "blogspam.example/top-10", kind: "No author, no date", used: false },
      ],
    },
    voice: {
      yours: {
        label: "From your top posts",
        text: "We shipped it. Then we watched what broke. Three things did, and each one taught us something.",
      },
      ours: {
        label: "From the Footnote draft",
        text: "We tested it. Then we measured what moved. Two things did, and each one changed the plan.",
      },
      traits: [
        { value: "11", label: "words per sentence" },
        { value: "94%", label: "active voice" },
        { value: "0.4%", label: "hedging words" },
      ],
    },
  },

  proof: {
    label: "In the wild",
    metrics: [
      { value: "3.2×", label: "more AI citations after 90 days" },
      { value: "4,000+", label: "teams publishing with Footnote" },
      { value: "98.4%", label: "of claims verified before delivery" },
    ],
    footnote: "Customer data, January to September 2026. Replace with your own numbers.",
    quote: {
      text: "We stopped fixing drafts and started publishing them. The citations were in the first month's report.",
      name: "Maya Okafor",
      role: "Head of Content, Pipelinx",
    },
  },

  faq: {
    label: "Questions",
    title: { before: "The fine", accent: "print." },
    description: "Short answers to what teams ask before they start.",
    items: [
      {
        question: "What is GEO?",
        answer:
          "Generative engine optimization: writing so that AI answer engines choose your page as a source. It rewards primary data, clear structure and claims a model can verify.",
      },
      {
        question: "Which engines does it target?",
        answer: "ChatGPT, Perplexity, Google AI Overviews and Claude. We track citations across all four and report changes weekly.",
      },
      {
        question: "Does it replace our editors?",
        answer: "No. It replaces the first draft and the fact-checking pass. Your editors decide what is worth publishing.",
      },
      {
        question: "Where do the sources come from?",
        answer: "Live pages, read at the time of writing. Every citation links to the page it came from, and nothing is quoted from memory.",
      },
      {
        question: "Can it match our brand voice?",
        answer: "Yes. Point it at your ten best posts and it builds a voice profile. You can edit the profile at any time.",
      },
      {
        question: "How does the trial work?",
        answer: "Fourteen days, three full articles, no card. If you stop, your drafts and citations stay yours.",
      },
    ],
  },

  cta: {
    title: { before: "Start earning", accent: "citations." },
    description: "Your first three articles are free. Most teams see their first citation within a month.",
    emailLabel: "Work email",
    emailPlaceholder: "you@company.com",
    button: "Start free trial",
    note: "Fourteen days. No card required.",
  },

  footer: {
    blurb: "The agentic writer for articles that get cited.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Method", href: "#method" },
          { label: "Engine", href: "#engine" },
          { label: "Changelog", href: "#" },
          { label: "Docs", href: "#" },
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
    legal: "All rights reserved.",
  },
};
