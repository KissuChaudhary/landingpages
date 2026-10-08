export type Mode = "plan" | "focus" | "reflect";
export type ScreenAsset = { src: string; alt: string };
export type Plan = {
  id: string;
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  features: string[];
  href: string;
};

export const site = {
  brand: {
    name: "tempo",
    tagline: "A little space for yourself.",
    year: "2026",
  },
  meta: {
    title: "Tempo — Make room for a better day",
    description:
      "A calmer place to plan your day, find your focus and reflect. A light mobile-app launch template with an interactive everyday workspace.",
  },
  links: { ios: "", android: "", app: "", email: "hello@example.com" },
  // Example: plan: { src: "/screens/plan.webp", alt: "Your app's daily plan" }
  screens: {} as Partial<Record<Mode, ScreenAsset>>,
  hero: {
    eyebrow: "Less rush. More rhythm.",
    title: "Make room for a",
    emphasis: "better day.",
    description:
      "A little structure. A little breathing room. Your plans, focus and reflections, together in one thoughtful app.",
    primary: "Find your rhythm",
    secondary: "Take a closer look",
  },
  session: {
    defaultMinutes: 25,
    durations: [15, 25, 45],
    task: "Make something meaningful",
    note: "One thing at a time is enough.",
  },
  chapters: [
    {
      id: "plan" as Mode,
      number: "01",
      label: "A little intention",
      title: "A day that feels like yours.",
      description:
        "Start with what matters. A few good intentions, a manageable list, and space for whatever the day brings.",
      points: [
        "Make a little plan, without the pressure",
        "Keep your everyday rituals close",
        "Leave room for life in between",
      ],
    },
    {
      id: "focus" as Mode,
      number: "02",
      label: "A little presence",
      title: "One thing. Your full attention.",
      description:
        "Give a good idea a little uninterrupted time. Set your own pace, take a breath, and settle into the work in front of you.",
      points: [
        "Choose a session that fits your day",
        "Pause when you need a moment",
        "Let the clock quietly keep you company",
      ],
    },
    {
      id: "reflect" as Mode,
      number: "03",
      label: "A little perspective",
      title: "Keep a little of today.",
      description:
        "The small things count, too. An unexpected idea, a quiet win, a moment worth remembering. Make a little note before it slips away.",
      points: [
        "A gentle prompt to get you started",
        "Save a thought in this browser",
        "Your words, ready to come back to",
      ],
    },
  ],
  routine: [
    {
      id: "breathe",
      time: "08:00",
      title: "A slow start",
      detail: "A breath before the busy",
      done: true,
    },
    {
      id: "create",
      time: "09:30",
      title: "Make something",
      detail: "A little time to focus",
      done: false,
    },
    {
      id: "walk",
      time: "12:30",
      title: "Step outside",
      detail: "Find a change of scenery",
      done: false,
    },
  ],
  moments: [
    {
      time: "08:00",
      title: "Begin with intention.",
      description: "Coffee, a deep breath, a little plan.",
      kind: "morning",
    },
    {
      time: "09:30",
      title: "Find your flow.",
      description: "One good thing, given your attention.",
      kind: "focus",
    },
    {
      time: "18:00",
      title: "Leave a little note.",
      description: "Take the good parts of today with you.",
      kind: "evening",
    },
  ],
  stories: [
    {
      quote:
        "I like that my day has a shape, without every minute needing a job.",
      name: "Alex R.",
      role: "Designer & slow-morning person",
      initials: "AR",
      colour: "sage",
      note: "A little more intention",
    },
    {
      quote:
        "That small pocket of focus has become my favourite part of the morning.",
      name: "Jamie L.",
      role: "Writer & habitual overthinker",
      initials: "JL",
      colour: "peach",
      note: "A little more presence",
    },
    {
      quote:
        "A sentence at the end of the day. Such a small thing, but I’m glad I kept it.",
      name: "Sam K.",
      role: "Maker & collector of little moments",
      initials: "SK",
      colour: "lilac",
      note: "A little more perspective",
    },
  ],
  plans: [
    {
      id: "everyday",
      name: "Everyday",
      description: "A little rhythm, to begin with.",
      monthly: 0,
      yearly: 0,
      features: [
        "Your daily plan",
        "Flexible focus sessions",
        "A space to reflect",
      ],
      href: "",
    },
    {
      id: "plus",
      name: "Tempo Plus",
      description: "More space for your everyday.",
      monthly: 6,
      yearly: 48,
      features: [
        "Everything in Everyday",
        "Unlimited custom routines",
        "Longer reflection history",
        "Your weekly rhythm",
      ],
      href: "",
    },
  ] satisfies Plan[],
  faq: [
    {
      question: "What can I try here?",
      answer:
        "Choose a focus duration, start or pause a real timer, check off the sample routine, and save a short reflection in your browser. The phone screens are interactive examples of the fictional Tempo app.",
    },
    {
      question: "Is Tempo a real app I can download?",
      answer:
        "Tempo is a demonstration for a mobile-app launch template. The download panel shows how your app links would work. A template buyer can connect their own App Store, Google Play or web app links.",
    },
    {
      question: "Where is my reflection saved?",
      answer:
        "Only in local storage in this browser, when storage is available. It is not sent to a server and there is no account or cloud sync. Clearing your browser data removes it.",
    },
    {
      question: "Can I use it for another kind of app?",
      answer:
        "Yes. Replace the demo screens or add your own screenshots, then edit the brand, content, links and colour tokens. The layout also suits habit trackers, journals, reading apps and other personal tools.",
    },
    {
      question: "What happens when I choose a plan?",
      answer:
        "You can review the selected plan and its billing total. No payment is collected in this demo. Each plan can link to your real checkout when you adapt the template.",
    },
  ],
};
