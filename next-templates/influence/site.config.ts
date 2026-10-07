/**
 * Everything you are likely to change lives in this file: your agency name, copy, numbers, prices and links.
 * Colours are in app/globals.css. Fonts are in app/layout.tsx.
 *
 * "Influence", its creators, numbers, quotes and prices are made up. Replace them with your own.
 * TypeScript will tell you if you leave out a field or misspell one.
 *
 * No photos are used anywhere: the creator videos are drawn from the colours and words below, so there is
 * nothing to license and nothing to host. If you have real thumbnails, put them in `public/` and swap them
 * into `components/ui/Reel.tsx`.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface SectionHead {
  /** A short word in the pill above the title, for example "Results". */
  label: string;
  /** Plain words, then one word or phrase set in the italic serif. */
  title: { before: string; accent: string };
  description: string;
}

/** The look of one drawn video thumbnail. Use `*asterisks* ` around the words to highlight in the hook. */
export interface ReelLook {
  from: string;
  to: string;
  /** Text colour on the thumbnail. */
  ink: string;
  shape: "arc" | "dots" | "stripes";
}

export interface Reel extends ReelLook {
  handle: string;
  category: string;
  hook: string;
  views: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;

  nav: { links: NavLink[]; cta: NavLink };

  hero: {
    tag: string;
    /** The headline sets as: line, four platform badges, line, then the serif phrase. */
    headline: { line1: string; line2: string; accent: string };
    description: string;
    primaryCta: NavLink;
    secondaryCta: NavLink;
    proof: { brands: string; rating: string; initials: string[] };
    phone: {
      handle: string;
      /** Words with `mark: true` are highlighted like a live caption. */
      caption: { text: string; mark?: boolean }[];
      look: ReelLook;
      likes: string;
      comments: string;
      shares: string;
      chips: { comments: string; views: string; likes: string; followers: string };
    };
  };

  /** A slow strip of headline numbers and platforms. */
  marquee: string[];

  results: SectionHead & {
    featured: {
      handle: string;
      niche: string;
      headline: string;
      description: string;
      /** Weekly follower counts, oldest first. */
      points: number[];
      start: string;
      end: string;
      stats: { value: string; label: string }[];
    };
    others: { handle: string; niche: string; value: string; label: string; points: number[] }[];
  };

  work: SectionHead & {
    filters: string[];
    reels: Reel[];
  };

  process: SectionHead & {
    steps: { when: string; title: string; text: string }[];
    includedLabel: string;
    included: string[];
  };

  proof: {
    label: string;
    title: SectionHead["title"];
    featured: { quote: string; name: string; handle: string; hook: string; look: ReelLook; stats: { value: string; label: string }[] };
    more: { text: string; name: string; handle: string }[];
  };

  pricing: SectionHead & {
    billing: { monthly: string; quarterly: string; save: string; discount: number; note: string };
    plans: { name: string; description: string; price: number; cta: string; featured?: boolean }[];
    /** One row per feature. `values` has one entry per plan, in order: text, `true` for included, `false` for not. */
    rows: { label: string; values: (string | boolean)[] }[];
    addOns: string;
  };

  faq: SectionHead & { items: { question: string; answer: string }[] };

  cta: {
    tag: string;
    title: { before: string; accent: string };
    description: string;
    button: NavLink;
    note: string;
    initials: string[];
  };

  footer: {
    blurb: string;
    columns: { title: string; links: NavLink[] }[];
    legal: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Influence",
  title: "Influence: short-form content that builds real influence",
  description:
    "Influence is a short-form video studio for personal brands. We edit, caption and optimise Reels, TikToks and Shorts so your expertise turns into attention.",

  nav: {
    links: [
      { label: "Results", href: "#results" },
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: { label: "Book a call", href: "#start" },
  },

  hero: {
    tag: "3 spots left for August",
    headline: { line1: "Short-form content", line2: "that builds", accent: "real influence." },
    description:
      "We turn your expertise into short-form videos that build trust and drive attention. You send the footage. We edit, caption and track what works.",
    primaryCta: { label: "Let's grow your brand", href: "#start" },
    secondaryCta: { label: "See pricing", href: "#pricing" },
    proof: { brands: "100+ personal brands", rating: "Rated 5 out of 5", initials: ["S", "M", "J", "K"] },
    phone: {
      handle: "sasha_",
      caption: [{ text: "This one edit" }, { text: "doubled", mark: true }, { text: "my views" }],
      look: { from: "#ffb347", to: "#ff7a59", ink: "#2a1208", shape: "arc" },
      likes: "30k",
      comments: "1.2k",
      shares: "4.8k",
      chips: { comments: "100+", views: "40k+", likes: "30k", followers: "2k+ followers" },
    },
  },

  marquee: [
    "180M views delivered",
    "100+ personal brands",
    "3.4x average follower growth",
    "48-hour turnaround",
    "TikTok",
    "Instagram Reels",
    "YouTube Shorts",
    "Snapchat Spotlight",
  ],

  results: {
    label: "Results",
    title: { before: "Growth you can", accent: "point to." },
    description: "Three creators, three niches. Same process: a sharper hook, a cleaner edit, and a monthly look at what to repeat.",
    featured: {
      handle: "travelwithmia",
      niche: "Travel creator",
      headline: "+14.2k followers in 90 days",
      description: "Mia posted twice a week with no plan. We moved her to five edited Reels a week, each opening on a single strong image.",
      points: [3100, 3300, 3500, 3900, 4300, 5200, 6100, 7400, 8800, 10200, 11900, 14000, 17300],
      start: "Week 1",
      end: "Week 13",
      stats: [
        { value: "6.1%", label: "link click rate" },
        { value: "1.9k", label: "profile visits a week" },
        { value: "22k", label: "average views" },
      ],
    },
    others: [
      { handle: "zaratalks", niche: "Business coach", value: "+5k", label: "followers in 60 days", points: [10, 12, 13, 17, 19, 26, 33, 41] },
      { handle: "_jason", niche: "Fitness coach", value: "3.2x", label: "more booked calls", points: [8, 9, 9, 12, 14, 15, 22, 26] },
      { handle: "golf_with_jess", niche: "Sports creator", value: "1.1M", label: "views in one month", points: [6, 6, 8, 7, 12, 19, 18, 31] },
    ],
  },

  work: {
    label: "Work",
    title: { before: "Where strategy meets", accent: "scroll-stopping" },
    description: "A look at what we make. Every video opens on a hook, carries live captions and ends on one clear next step.",
    filters: ["All", "Education", "Lifestyle", "Finance", "Fitness"],
    reels: [
      { handle: "business_chats", category: "Education", hook: "The *one question* that closes every client", views: "1.2M", from: "#1f2a44", to: "#3b5bdb", ink: "#ffffff", shape: "arc" },
      { handle: "kia_dances", category: "Lifestyle", hook: "I *stopped* posting daily. Here is why", views: "640k", from: "#ff9a9e", to: "#fad0c4", ink: "#2a1515", shape: "dots" },
      { handle: "investing_with_jon", category: "Finance", hook: "Three *money* habits at 25", views: "910k", from: "#0f2027", to: "#2c5364", ink: "#ffffff", shape: "stripes" },
      { handle: "_jason", category: "Fitness", hook: "Do *not* skip this warm-up", views: "2.1M", from: "#f6d365", to: "#fda085", ink: "#1f1408", shape: "arc" },
      { handle: "zoe_gardens", category: "Lifestyle", hook: "Grow *tomatoes* on a balcony", views: "480k", from: "#d4fc79", to: "#96e6a1", ink: "#10230f", shape: "dots" },
      { handle: "tennis_tips", category: "Fitness", hook: "Fix your *serve* in ten minutes", views: "730k", from: "#2b2b2b", to: "#555555", ink: "#ffffff", shape: "stripes" },
      { handle: "tom_finance", category: "Finance", hook: "Why your *savings* are shrinking", views: "1.5M", from: "#c471f5", to: "#fa71cd", ink: "#1d0a2e", shape: "arc" },
      { handle: "sarah_rides", category: "Education", hook: "Learn to *ride* in one weekend", views: "390k", from: "#a1c4fd", to: "#c2e9fb", ink: "#0e1f33", shape: "dots" },
    ],
  },

  process: {
    label: "Process",
    title: { before: "Raw clips in,", accent: "viral content out." },
    description: "Four steps, one monthly rhythm. You only ever do two things: send footage and approve.",
    steps: [
      { when: "Day 0", title: "Kickoff call", text: "Thirty minutes on your goals, your audience and the topics only you can talk about." },
      { when: "Every week", title: "Send us your footage", text: "Film on your phone and drop it in a shared folder. No special kit, no scripts needed." },
      { when: "Within 3 days", title: "We edit. You approve.", text: "Hooks, captions, music and a cover for every video. Review in one place and hit post." },
      { when: "Every month", title: "Track what works", text: "A one-page report on what grew your audience, so next month doubles down on it." },
    ],
    includedLabel: "Every video includes",
    included: ["A tested hook", "Live captions", "Licensed music", "A cover frame", "A written caption", "Posting times"],
  },

  proof: {
    label: "Creators",
    title: { before: "Kind words from people who", accent: "post for a living." },
    featured: {
      quote: "From 2K to 10K followers in three months. Influence knows what works, and they never miss a deadline.",
      name: "Samuel",
      handle: "investing_with_jon",
      hook: "From 2K to 10K in *three months*",
      look: { from: "#16222a", to: "#3a6073", ink: "#ffffff", shape: "stripes" },
      stats: [
        { value: "5x", label: "follower growth" },
        { value: "6.3%", label: "conversion" },
        { value: "22k", label: "average views" },
      ],
    },
    more: [
      { text: "Our Reels finally have structure, pace and purpose.", name: "Priya", handle: "business_chats" },
      { text: "Influence made it effortless to stay consistent and grow fast.", name: "Tom", handle: "tom_finance" },
      { text: "Engagement doubled. Leads tripled. All from Influence.", name: "Kenny", handle: "_kenny" },
      { text: "They handled everything: editing, pacing, captions. Perfectly.", name: "Jessica", handle: "jessica_estates" },
      { text: "My videos finally have the polish they were missing.", name: "Zoe", handle: "zoe_gardens" },
      { text: "I film for an hour a week and the rest just happens.", name: "Jason", handle: "_jason" },
    ],
  },

  pricing: {
    label: "Pricing",
    title: { before: "Flexible plans built for", accent: "growth." },
    description: "Pick a plan that fits how often you want to post. Change or pause it at any time.",
    billing: { monthly: "Monthly", quarterly: "Every 3 months", save: "Save 10%", discount: 0.1, note: "Billed every three months at a 10% discount." },
    plans: [
      { name: "Starter", description: "For creators growing an audience.", price: 750, cta: "Get started" },
      { name: "Growth", description: "For brands ready to post often and grow fast.", price: 1500, cta: "Book an intro call", featured: true },
      { name: "Scale", description: "For founders and agencies building a presence.", price: 2800, cta: "Get started" },
    ],
    rows: [
      { label: "Short-form videos a month", values: ["8", "20", "32"] },
      { label: "Turnaround", values: ["5 days", "3 days", "48 hours"] },
      { label: "Revisions", values: ["1 per video", "Unlimited", "Unlimited"] },
      { label: "Live captions and cover", values: [true, true, true] },
      { label: "Monthly performance report", values: [true, true, true] },
      { label: "Hook testing", values: [false, true, true] },
      { label: "Posting schedule", values: [false, true, true] },
      { label: "Dedicated editor", values: [false, false, true] },
    ],
    addOns: "Need long-form, podcasts or ad creative? Add them to any plan from $400 a month.",
  },

  faq: {
    label: "Questions",
    title: { before: "Answers before you", accent: "ask." },
    description: "The things creators ask before booking a call.",
    items: [
      { question: "What footage do I need to send?", answer: "Anything you can film on a phone: talking to camera, a walk-and-talk, behind the scenes. We turn it into finished videos." },
      { question: "Do I need to write scripts?", answer: "No. Send us the ideas you already talk about and we shape them into hooks and structure. You approve every video before it goes live." },
      { question: "Who owns the videos?", answer: "You do. Every finished video, caption and cover is yours to post anywhere and keep after you leave." },
      { question: "Which platforms do you edit for?", answer: "TikTok, Instagram Reels, YouTube Shorts and Snapchat Spotlight. Each video is exported at the right size for all four." },
      { question: "How fast will I see results?", answer: "Most creators see a lift in views within the first month and steady follower growth by month three. We share a report every month so you can see it." },
      { question: "Can I pause or cancel?", answer: "Yes. Plans run month to month, or every three months at a discount. Pause or cancel with 14 days' notice." },
    ],
  },

  cta: {
    tag: "3 spots left for August",
    title: { before: "Ready to be the", accent: "creator everyone follows?" },
    description: "Book a thirty-minute call. We will look at your content and tell you honestly what we would change.",
    button: { label: "Book a call", href: "#" },
    note: "Free, and we reply within 24 hours.",
    initials: ["S", "M", "J", "K"],
  },

  footer: {
    blurb: "A short-form video studio for personal brands.",
    columns: [
      {
        title: "Studio",
        links: [
          { label: "Results", href: "#results" },
          { label: "Work", href: "#work" },
          { label: "Pricing", href: "#pricing" },
        ],
      },
      {
        title: "Follow",
        links: [
          { label: "TikTok", href: "#" },
          { label: "Instagram", href: "#" },
          { label: "YouTube", href: "#" },
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
