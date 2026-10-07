/**
 * Everything you are likely to change lives in this file: your studio name, copy, prices and links.
 * Colours are in app/globals.css. Fonts are in app/layout.tsx.
 *
 * "Cutroom", its clients, numbers, quotes and prices are made up for the demo. Replace them with your own.
 * TypeScript will tell you if you leave out a field or misspell one.
 */

export interface NavLink {
  label: string;
  href: string;
}

/** A headline where the last words sit inside the orange "clip", like a selected clip on a timeline. */
export interface Clipped {
  before: string;
  clip: string;
}

/** A section headline. `accent` is set in orange. */
export interface Accented {
  before: string;
  accent: string;
}

export interface SectionIntro {
  /** The scene label above the title, for example "Scene 02". */
  scene: string;
  /** The topic, for example "Services". */
  label: string;
  title: Accented;
  description: string;
}

/** Colours for clips on the timeline drawings. */
export type Tone = "flame" | "blue" | "ink" | "green";

export type ServiceVisual = "long" | "shorts" | "thumbs" | "repurpose";

export interface SiteConfig {
  /** Shown in the navbar, the browser tab and the footer. */
  name: string;
  title: string;
  description: string;

  nav: { links: NavLink[]; cta: NavLink };

  hero: {
    /** `proof` sits next to three small initial avatars. */
    proof: string;
    /** Set in three lines. Keep `clip` short (one or two words): it cannot wrap. */
    headline: Clipped;
    description: string;
    primaryCta: NavLink;
    secondaryCta: NavLink;
    /** The editor drawing under the headline. */
    editor: {
      longTitle: string;
      longDuration: string;
      shortCaption: { before: string; highlight: string };
      retention: { label: string; from: string; to: string };
      /** Each clip is a start and end position on the track, 0 to 100. */
      tracks: { label: string; clips: { start: number; end: number; tone: Tone }[] }[];
    };
  };

  creators: { label: string; items: { name: string; subs: string }[] };

  services: SectionIntro & {
    items: {
      title: string;
      tagline: string;
      description: string;
      deliverables: string[];
      turnaround: string;
      from: string;
      visual: ServiceVisual;
    }[];
    cta: NavLink;
  };

  results: SectionIntro & {
    chart: {
      rawLabel: string;
      editedLabel: string;
      /** Twelve points each, 0 to 100: the share of viewers still watching. */
      raw: number[];
      edited: number[];
      /** Where each numbered marker sits (an index into the points) and what happened there. */
      notes: { at: number; text: string }[];
    };
    stats: { value: string; label: string }[];
  };

  process: SectionIntro & {
    steps: { tag: string; title: string; description: string; from: string; to: string }[];
    footnote: string;
  };

  pricing: SectionIntro & {
    formats: { name: string; note: string; perVideo: number }[];
    /** Volume discounts. `discount` is 0 to 1. */
    volumes: { count: number; discount: number }[];
    includedTitle: string;
    included: string[];
    cta: NavLink;
    footnote: string;
  };

  testimonials: SectionIntro & {
    comments: { name: string; handle: string; text: string; likes: string; time: string; pinned?: boolean }[];
  };

  faq: SectionIntro & { items: { question: string; answer: string }[] };

  journal: SectionIntro & {
    posts: { title: string; tag: string; date: string; read: string; tone: Tone }[];
    link: NavLink;
  };

  cta: {
    title: Clipped;
    description: string;
    primary: NavLink;
    secondary: NavLink;
    drop: { title: string; hint: string; files: { name: string; size: string }[] };
  };

  footer: {
    blurb: string;
    columns: { title: string; links: NavLink[] }[];
    legal: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Cutroom",
  title: "Cutroom: Video editing for YouTube creators",
  description:
    "Cutroom is a video editing studio for YouTube creators. Retention-first edits of long-form videos and Shorts, delivered in 48 hours.",

  nav: {
    links: [
      { label: "Services", href: "#services" },
      { label: "Results", href: "#results" },
      { label: "Process", href: "#process" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: { label: "Start a project", href: "#contact" },
  },

  hero: {
    proof: "Trusted by 100+ top creators",
    headline: { before: "Edits that keep people", clip: "watching." },
    description:
      "Cutroom is a video editing studio for YouTube creators. We turn raw footage into retention-first edits in 48 hours, so you can keep shooting.",
    primaryCta: { label: "Start your project", href: "#contact" },
    secondaryCta: { label: "Watch the showreel", href: "#results" },
    editor: {
      longTitle: "I Quit My Job For 30 Days",
      longDuration: "12:48",
      shortCaption: { before: "Wait for", highlight: "the end" },
      retention: { label: "Average view duration", from: "41%", to: "63%" },
      tracks: [
        {
          label: "V1",
          clips: [
            { start: 2, end: 26, tone: "flame" },
            { start: 28, end: 58, tone: "flame" },
            { start: 60, end: 92, tone: "flame" },
          ],
        },
        {
          label: "V2",
          clips: [
            { start: 12, end: 34, tone: "blue" },
            { start: 64, end: 84, tone: "blue" },
          ],
        },
        {
          label: "A1",
          clips: [{ start: 2, end: 96, tone: "green" }],
        },
      ],
    },
  },

  creators: {
    label: "Cutting videos for channels with 40M+ subscribers",
    items: [
      { name: "Northline", subs: "2.1M" },
      { name: "Daily Wander", subs: "880K" },
      { name: "Fieldnotes", subs: "1.4M" },
      { name: "Maker Hours", subs: "3.2M" },
      { name: "Kitchen Table", subs: "640K" },
      { name: "Plain Talk", subs: "1.9M" },
    ],
  },

  services: {
    scene: "Scene 01",
    label: "Services",
    title: { before: "Every format your channel", accent: "needs." },
    description: "One team, one style guide, every cut. Pick a format to see what you get.",
    items: [
      {
        title: "Long-form",
        tagline: "Videos people finish",
        description:
          "Story-first edits of 8 to 25 minute videos: a cold open that earns the click, pacing that never sags, and sound that sits right on every device.",
        deliverables: ["Cold open and hook", "Pacing and cuts", "Sound mix", "Motion graphics", "Captions"],
        turnaround: "48 hours",
        from: "$150",
        visual: "long",
      },
      {
        title: "Shorts",
        tagline: "Built for the swipe",
        description:
          "Vertical edits with burnt-in captions, punch-in cuts and a first second that stops the scroll. Delivered in batches, ready to schedule.",
        deliverables: ["Vertical 9:16 cut", "Burnt-in captions", "Hook in 1 second", "Platform exports"],
        turnaround: "24 hours",
        from: "$40",
        visual: "shorts",
      },
      {
        title: "Thumbnails",
        tagline: "The click before the watch",
        description:
          "Three thumbnail options per video, designed around one idea and one face, tested against what is winning in your niche.",
        deliverables: ["3 options per video", "One free revision", "Layered source files", "A/B test sets"],
        turnaround: "24 hours",
        from: "$30",
        visual: "thumbs",
      },
      {
        title: "Repurposing",
        tagline: "One shoot, a month of posts",
        description:
          "We mine your long videos for the best moments and turn each into Shorts, Reels and clips, so one shoot feeds every channel.",
        deliverables: ["8 to 12 clips per video", "Captions and titles", "Posting schedule", "All platforms"],
        turnaround: "72 hours",
        from: "$220",
        visual: "repurpose",
      },
    ],
    cta: { label: "Start a project", href: "#contact" },
  },

  results: {
    scene: "Scene 02",
    label: "Results",
    title: { before: "Retention does not", accent: "lie." },
    description: "The same video, cut two ways. Here is what happened to the audience.",
    chart: {
      rawLabel: "Raw cut",
      editedLabel: "Cutroom edit",
      raw: [100, 68, 55, 49, 44, 40, 37, 34, 31, 28, 26, 24],
      edited: [100, 88, 82, 78, 74, 71, 69, 66, 64, 62, 60, 58],
      notes: [
        { at: 1, text: "A cold open replaces a 40-second intro. The first-minute drop falls from 32% to 12%." },
        { at: 5, text: "A pattern interrupt every 45 seconds holds the audience through the middle." },
        { at: 9, text: "The payoff is moved earlier and the outro is cut to 8 seconds." },
      ],
    },
    stats: [
      { value: "2.1×", label: "average watch time" },
      { value: "48h", label: "typical turnaround" },
      { value: "500+", label: "videos delivered" },
      { value: "4.9", label: "average rating" },
    ],
  },

  process: {
    scene: "Scene 03",
    label: "Process",
    title: { before: "From raw footage to", accent: "published." },
    description: "Four steps, 48 hours, and you always know where your video is. Hours are counted from your upload.",
    steps: [
      {
        tag: "Upload",
        title: "Drop your footage",
        description: "Send a Drive, Dropbox or Frame.io link and a few notes. No special format needed.",
        from: "00h",
        to: "02h",
      },
      {
        tag: "Cut",
        title: "We make the first cut",
        description: "Your editor builds the story, the pacing and the sound, following your style guide.",
        from: "02h",
        to: "30h",
      },
      {
        tag: "Review",
        title: "You leave notes",
        description: "Comment right on the timeline. Two rounds of revisions are included in every video.",
        from: "30h",
        to: "42h",
      },
      {
        tag: "Deliver",
        title: "Ready to publish",
        description: "Final video, captions, thumbnail options and a title, in the right sizes for every platform.",
        from: "42h",
        to: "48h",
      },
    ],
    footnote: "Rush delivery in 24 hours is available on request.",
  },

  pricing: {
    scene: "Scene 04",
    label: "Pricing",
    title: { before: "Pay by the video,", accent: "save by the batch." },
    description: "Pick a format and how many videos you publish each month. The price updates as you go.",
    formats: [
      { name: "Long-form", note: "8 to 25 minutes", perVideo: 150 },
      { name: "Shorts", note: "up to 60 seconds", perVideo: 40 },
    ],
    volumes: [
      { count: 4, discount: 0 },
      { count: 8, discount: 0.08 },
      { count: 12, discount: 0.12 },
      { count: 16, discount: 0.16 },
      { count: 24, discount: 0.2 },
    ],
    includedTitle: "Every plan includes",
    included: [
      "A dedicated editor who learns your style",
      "Two rounds of revisions per video",
      "Captions and platform exports",
      "Thumbnail options on long-form",
      "48-hour delivery, 24 for Shorts",
      "Cancel or pause any month",
    ],
    cta: { label: "Start this plan", href: "#contact" },
    footnote: "All prices in USD. Add Thumbnails or Repurposing to any plan from your first call.",
  },

  testimonials: {
    scene: "Scene 05",
    label: "Creators",
    title: { before: "Top comments from", accent: "our creators." },
    description: "Said in their own words, usually in a DM at midnight.",
    comments: [
      {
        name: "Northline",
        handle: "@northline",
        text: "Our average view duration went from 41% to 63% in two months. We changed nothing else. The edit is the whole difference.",
        likes: "2.4K",
        time: "2 weeks ago",
        pinned: true,
      },
      {
        name: "Maker Hours",
        handle: "@makerhours",
        text: "I used to spend three days cutting each video. Now I shoot on Monday and publish on Wednesday.",
        likes: "1.1K",
        time: "1 month ago",
      },
      {
        name: "Daily Wander",
        handle: "@dailywander",
        text: "They understood our humour from the first cut. That never happened with any freelancer before.",
        likes: "860",
        time: "1 month ago",
      },
      {
        name: "Plain Talk",
        handle: "@plaintalk",
        text: "The Shorts alone paid for the whole retainer. Four of them broke 500K views last quarter.",
        likes: "640",
        time: "3 months ago",
      },
    ],
  },

  faq: {
    scene: "Scene 06",
    label: "FAQ",
    title: { before: "Questions before", accent: "you start." },
    description: "If yours is not here, send it with your first upload and we will answer it there.",
    items: [
      {
        question: "How fast do I get my first video?",
        answer:
          "Long-form videos come back in 48 hours from upload and Shorts in 24. Rush delivery is available on request.",
      },
      {
        question: "Will the edit match my style?",
        answer:
          "Yes. In the first week your editor builds a style guide from your best videos: pacing, fonts, sound, humour. Every cut after that follows it.",
      },
      {
        question: "How many revisions are included?",
        answer: "Two rounds on every video. Most videos need one, and you can leave notes right on the timeline.",
      },
      {
        question: "Do you handle thumbnails and titles?",
        answer: "Yes. Long-form videos include three thumbnail options and a title suggestion. Both are optional extras on Shorts.",
      },
      {
        question: "What footage and tools do you need from me?",
        answer:
          "Just a link to your raw footage and a few notes. We work with any camera and any format, and you do not need to install anything.",
      },
      {
        question: "Can I pause or cancel?",
        answer: "Any month. There is no contract, and unused videos roll over for 30 days.",
      },
    ],
  },

  journal: {
    scene: "Scene 07",
    label: "Journal",
    title: { before: "Notes from the", accent: "edit bay." },
    description: "What we learn from cutting a few hundred videos a quarter.",
    posts: [
      { title: "The first 30 seconds: a cold open checklist", tag: "Craft", date: "Oct 2", read: "6 min", tone: "flame" },
      { title: "Why your Shorts stop at 400 views, and how to fix it", tag: "Growth", date: "Sep 18", read: "5 min", tone: "blue" },
      { title: "Sound is half the video: a mixing guide for creators", tag: "Craft", date: "Sep 4", read: "8 min", tone: "green" },
    ],
    link: { label: "Read the journal", href: "#" },
  },

  cta: {
    title: { before: "Send us your next", clip: "upload." },
    description: "Your first video is covered by our 48-hour guarantee. If it is late, it is free.",
    primary: { label: "Start your project", href: "#" },
    secondary: { label: "hello@cutroom.studio", href: "#" },
    drop: {
      title: "Drop your raw footage here",
      hint: "or paste a Drive, Dropbox or Frame.io link",
      files: [
        { name: "vlog_day12_A001.mov", size: "4.2 GB" },
        { name: "broll_street_B014.mp4", size: "1.8 GB" },
        { name: "voiceover_take3.wav", size: "212 MB" },
      ],
    },
  },

  footer: {
    blurb: "A video editing studio for YouTube creators. Cutting in 14 time zones.",
    columns: [
      {
        title: "Studio",
        links: [
          { label: "Services", href: "#services" },
          { label: "Results", href: "#results" },
          { label: "Process", href: "#process" },
          { label: "Pricing", href: "#pricing" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Journal", href: "#" },
          { label: "Style guide template", href: "#" },
          { label: "Showreel", href: "#" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "hello@cutroom.studio", href: "#" },
          { label: "Book a call", href: "#contact" },
          { label: "Instagram", href: "#" },
        ],
      },
    ],
    legal: "All rights reserved.",
  },
};
