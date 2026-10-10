// Everything a visitor reads on the home page lives here: brand, links, every heading,
// paragraph, plan and answer. Case studies are in data/work.ts, articles in data/articles.ts.

export type Accent = "lime" | "iris" | "stone" | "blush";

export const site = {
  brand: "Turnout",
  legalName: "Turnout Studio",
  title: "Turnout — Moments people show up for",
  description:
    "Turnout designs, builds and films brand experiences: pop-ups, launch nights, community programs and creator trips, each one turned into a season of content.",
  /** Your production URL, used for social previews. Leave empty until you have one. */
  url: "",

  links: {
    /** A booking page (Cal.com, Calendly…). Empty: every "Plan an event" goes to /contact. */
    booking: "",
    /** Receives the contact form as JSON (POST). Empty: the form opens an email to `email` instead. */
    contactEndpoint: "",
    /** Receives { email } as JSON (POST). Empty: the footer form opens an email to `email`. */
    newsletterEndpoint: "",
    email: "hello@example.com",
    phone: "+1 (555) 014-2290",
    address: ["Studio 4, 210 Kent Avenue", "Brooklyn, NY 11249"],
    /** Empty entries are hidden. */
    social: {
      instagram: "https://www.instagram.com/",
      tiktok: "https://www.tiktok.com/",
      linkedin: "https://www.linkedin.com/",
    },
  },

  nav: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "Process", href: "/#process" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Journal", href: "/journal" },
  ],
  /** The main call to action, used in the menu, hero and closing panel. */
  cta: "Plan an event",

  /** Visitors can pause the looping parts (photo deck, ribbon, logo strip). Remembered on their device. */

  hero: {
    status: "Now booking spring 2027",
    // Each string is one line of the headline. `[0]` and `[1]` are photo capsules, set
    // from `capsules` below (three photos each; they take turns).
    title: ["Moments [0] people", "show up [1] for."],
    capsules: [
      ["/images/hero-popup.webp", "/images/hero-supper.webp", "/images/hero-runclub.webp"],
      ["/images/svc-launch.webp", "/images/svc-creators.webp", "/images/svc-community.webp"],
    ],
    services: ["Pop-ups & launches", "Community programs", "Creator trips"],
    description:
      "We design, build and film brand experiences, then turn every one into a season of content your team can post for weeks.",
    /** The small card in the corner. Point it at any case study slug in data/work.ts. */
    latest: { label: "Just wrapped", work: "halfmoon" },
    // The filmstrip along the bottom of the hero. `wide` frames are landscape.
    reel: [
      { image: "/images/hero-popup.webp", alt: "A guest laughing as she films a brand pop-up on her phone", caption: "Pop-up · Brooklyn" },
      { image: "/images/work-halfmoon.webp", alt: "A model in a black puffer jacket on a lime platform while guests film her", caption: "Halfmoon · The Cold Room", wide: true },
      { image: "/images/hero-supper.webp", alt: "A guest raising a glass at a long-table supper club in a greenhouse", caption: "Supper club · Lisbon" },
      { image: "/images/svc-launch.webp", alt: "Guests cheering as confetti falls over a launch stage", caption: "Launch night · Austin", wide: true },
      { image: "/images/hero-runclub.webp", alt: "A run club crossing a city bridge at sunrise", caption: "Run club · London" },
      { image: "/images/work-fernway.webp", alt: "Hands reaching across a long table of colourful dishes", caption: "Fernway · 12 dinners", wide: true },
      { image: "/images/svc-creators.webp", alt: "A creator filming a friend jumping into a motel pool", caption: "Creator trip · Palm Springs" },
      { image: "/images/work-northpaw.webp", alt: "A golden retriever in a periwinkle bandana leaping ahead of a group of runners", caption: "Northpaw · Sunday club", wide: true },
    ],
  },

  logos: {
    label: "Trusted by 40+ brands that would rather be remembered",
  },

  problem: {
    // A week of attention, drawn as you scroll: a typical launch first, with each problem
    // pinned where it happens, then ours, which crosses them out. The headline then turns
    // into `answer`. Keep five problems; they pin from the launch night to Monday.
    title: "Most launches are forgotten by Monday.",
    answer: "Ours are still posting by Friday.",
    legend: { typical: "A typical launch", launch: "Launch night", end: "Still posting · day 9" },
    pains: [
      "Guest lists full of no-shows",
      "Pop-ups that photograph badly",
      "A launch post nobody saves",
      "Creators who post once and vanish",
      "Nothing left to post the morning after",
    ],
  },

  season: {
    label: "What we do",
    statement:
      "We design the moments people show up for, then turn each one into a season of content.",
    // The season slides past sideways. `shape` sets the card: wide, tall or report (the
    // closing card, no photo). `stat` rolls up when it appears.
    steps: [
      {
        when: "Doors open",
        title: "Built for the line around the block.",
        body: "The invite, the room and the reason to arrive early are planned together, from the waitlist drop to the doors opening.",
        image: "/images/feature-line.webp",
        alt: "A line of guests with tote bags queuing outside a white storefront pop-up",
        stat: { value: 18400, suffix: "", label: "RSVPs in nine days" },
        accent: "lime" as Accent,
        shape: "wide",
      },
      {
        when: "Nine o'clock",
        title: "A moment worth filming.",
        body: "Staging, light and one reason to pull out a phone, written into the run of show.",
        image: "/images/hero-popup.webp",
        alt: "A guest laughing as she films a brand pop-up on her phone",
        accent: "blush" as Accent,
        shape: "tall",
      },
      {
        when: "Day two",
        title: "Every guest leaves with something to post.",
        body: "Creators who belong in the room and a crew on the floor, so the night keeps travelling after the doors close.",
        image: "/images/feature-creator.webp",
        alt: "A creator filming herself on a tripod while friends dance behind her",
        stat: { value: 2.1, suffix: "M", label: "organic views from one weekend" },
        accent: "iris" as Accent,
        shape: "wide",
      },
      {
        when: "Week one",
        title: "The 48-hour edit.",
        body: "Recaps, cutdowns and creator posts land while people are still talking about the night.",
        image: "/images/journal-edit.webp",
        alt: "An editor cutting event footage on two monitors late at night",
        stat: { value: 340, suffix: "+", label: "assets from an average event" },
        accent: "stone" as Accent,
        shape: "tall",
      },
      {
        when: "Week four",
        title: "The room becomes a ritual.",
        body: "Run clubs and supper series bring the same faces back every week, with hosts and routes your brand keeps.",
        image: "/images/svc-community.webp",
        alt: "A run club in matching lime caps stretching in a city plaza",
        stat: { value: 900, suffix: "", label: "members every Sunday" },
        accent: "lime" as Accent,
        shape: "wide",
      },
      {
        when: "Week ten",
        title: "The turnout report.",
        body: "Guests, reach, saves and sales on one page, with what we'd change next time. Then we plan the next night.",
        accent: "lime" as Accent,
        shape: "report",
        cta: true,
      },
    ] as {
      when: string;
      title: string;
      body: string;
      image?: string;
      alt?: string;
      stat?: { value: number; suffix: string; label: string };
      accent: Accent;
      shape: "wide" | "tall" | "report";
      cta?: boolean;
    }[],
  },

  work: {
    label: "Recent turnouts",
    title: "Rooms we filled this year.",
    intro: "From a three-day puffer pop-up to a run club that outlived its campaign. Every one of them is still posting.",
    // Slugs from data/work.ts, in order. The first one gets the wide card.
    featured: ["halfmoon", "northpaw", "saltwork", "fernway", "orbit"],
    more: "See every turnout",
  },

  services: {
    label: "What we build",
    title: "Four ways to fill a room.",
    items: [
      {
        id: "pop-ups",
        tab: "Pop-ups",
        title: "Pop-ups & store takeovers",
        body: "Limited-run shops, sampling tours and store takeovers designed to be lined up for, and built to photograph from every angle.",
        includes: ["Concept and spatial design", "Build, staffing and operations", "Waitlist and RSVP flows"],
        stat: { value: 64, suffix: "", label: "pop-ups opened since 2019" },
        image: "/images/svc-popups.webp",
        alt: "Shoppers photographing products on periwinkle plinths in a pop-up shop",
        accent: "lime" as Accent,
      },
      {
        id: "launch-nights",
        tab: "Launches",
        title: "Launch nights",
        body: "Product drops and press nights with a guest list that actually shows up: the right people, a reason to arrive early and a moment worth filming at nine.",
        includes: ["Guest curation and RSVPs", "Run of show and staging", "Press and creator seating"],
        stat: { value: 92, suffix: "%", label: "average RSVP turnout" },
        image: "/images/svc-launch.webp",
        alt: "Guests cheering as confetti falls over a launch stage",
        accent: "iris" as Accent,
      },
      {
        id: "community",
        tab: "Community",
        title: "Community programs",
        body: "Run clubs, supper clubs and member series that turn a one-off event into a weekly habit, with hosts, routes and rituals your brand keeps.",
        includes: ["Program design", "Host network and training", "Member list handover"],
        stat: { value: 11000, suffix: "", label: "members across nine cities", compact: true },
        image: "/images/svc-community.webp",
        alt: "A run club in matching lime caps stretching in a city plaza",
        accent: "stone" as Accent,
      },
      {
        id: "creator-trips",
        tab: "Creators",
        title: "Creator trips & capture",
        body: "We cast creators who belong in the room, keep a crew on the floor and deliver a 48-hour edit, so the moment keeps posting for weeks.",
        includes: ["Creator casting", "On-site photo and video crew", "48-hour edit and cutdowns"],
        stat: { value: 340, suffix: "+", label: "assets from an average event" },
        image: "/images/svc-creators.webp",
        alt: "A creator filming a friend jumping into a motel pool",
        accent: "blush" as Accent,
      },
    ],
  },

  compare: {
    label: "The difference",
    title: "Not another event vendor.",
    them: {
      label: "A typical event agency",
      items: [
        "Venue and catering first",
        "A guest list from a spreadsheet",
        "One photographer, one recap reel",
        "Measured in headcount",
        "Done when the room empties",
      ],
    },
    us: {
      items: [
        "Concepts built for the crowd and the camera",
        "Waitlists that build demand before doors",
        "Creators and crew on the floor",
        "Measured in turnout, reach and sales",
        "A season of content after the night",
      ],
    },
  },

  spotlight: {
    label: "Inside the work",
    title: "What a turnout leaves behind.",
    intro: "The night is the start. Here's what each one was still doing weeks later.",
    // Slugs from data/work.ts, in order. Each card shows the case study's first three results.
    featured: ["halfmoon", "northpaw", "saltwork", "fernway", "orbit"],
    read: "Read the case study",
  },

  process: {
    label: "How it runs",
    title: "From first idea to afterglow.",
    intro: "Ten weeks from the first call to the last post, with the night itself somewhere around week seven.",
    /** Length of the run of show in weeks. Each step's `span` is [from, to] in weeks; a single week ([6, 6]) is drawn as a marker. */
    weeks: 10,
    steps: [
      {
        title: "Concept",
        span: [0, 2] as [number, number],
        body: "We find the reason people would cross town for you.",
        when: "Weeks 1–2",
        details: ["Audience and city research", "Three concepts, one direction", "Budget and site shortlist"],
        icon: "spark",
        accent: "blush" as Accent,
      },
      {
        title: "Build",
        span: [2, 6] as [number, number],
        body: "Space, guest list and run of show, built side by side.",
        when: "Weeks 3–6",
        details: ["Fabrication and vendors", "Waitlist and RSVPs", "Creator casting"],
        icon: "build",
        accent: "iris" as Accent,
      },
      {
        title: "Show day",
        span: [6, 6] as [number, number],
        body: "We run the floor so you can host your guests.",
        when: "On the day",
        details: ["Producers on site", "Crew on every angle", "Live posting"],
        icon: "ticket",
        accent: "stone" as Accent,
      },
      {
        title: "Afterglow",
        span: [6, 10] as [number, number],
        body: "The night keeps posting for weeks afterwards.",
        when: "Weeks 7–10",
        details: ["48-hour edit", "Recaps and cutdowns", "Turnout report"],
        icon: "glow",
        accent: "lime" as Accent,
      },
    ],
  },

  voices: {
    label: "Client notes",
    title: "Brands keep coming back.",
    featured: {
      title: "Our pop-up had a line before the doors opened.",
      quote:
        "Turnout gave us a three-day moment that sold out our first drop and handed the team a month of content. People still tag the space.",
      name: "Lena Hartley",
      role: "VP Brand, Halfmoon",
      image: "/images/quote-lena.webp",
    },
    items: [
      {
        title: "The run club outlived the campaign.",
        quote: "What started as a launch activation is now 900 members every Sunday. It's the best channel we have.",
        name: "Mei Tanaka",
        role: "Head of Community, Northpaw",
        avatar: "/images/avatar-mei.webp",
      },
      {
        title: "Every RSVP was a real person.",
        quote: "No padding and no no-shows. The room was exactly who we wanted, and they posted about it.",
        name: "Daniel Okafor",
        role: "Founder, Orbit Coffee",
        avatar: "/images/avatar-daniel.webp",
      },
      {
        title: "They think in content from day one.",
        quote: "We left with more than 300 edits ready to post. Our paid team ran them for a whole quarter.",
        name: "Aoife Byrne",
        role: "Growth Lead, Saltwork",
        avatar: "/images/avatar-aoife.webp",
      },
      {
        title: "Calm on a chaotic night.",
        quote: "Two hundred guests, a storm and a power cut. Nobody noticed but us. That's the whole job.",
        name: "Ravi Menon",
        role: "Brand Director, Fernway",
        avatar: "/images/avatar-ravi.webp",
      },
    ],
  },

  team: {
    label: "The crew",
    title: "The people in the room.",
    body: "Producers, designers and creators who have run more than 300 events across 14 cities.",
    people: [
      { name: "Maya Brooks", role: "Founder & Creative Director", image: "/images/team-maya.webp" },
      { name: "Theo Park", role: "Head of Production", image: "/images/team-theo.webp" },
      { name: "Inés Romero", role: "Partnerships", image: "/images/team-ines.webp" },
      { name: "Sam Keller", role: "Community Lead", image: "/images/team-sam.webp" },
      { name: "Priya Nair", role: "Content Director", image: "/images/team-priya.webp" },
      { name: "Jonah Reed", role: "Creator Casting", image: "/images/team-jonah.webp" },
    ],
  },

  pricing: {
    label: "Pricing",
    title: "Pick your pace.",
    // Prices are per month. `yearly` is the monthly equivalent when billed yearly.
    // `npm run verify:content` checks that `saving` matches the numbers.
    saving: 15,
    currency: "USD",
    plans: [
      {
        id: "moment",
        name: "Moment",
        audience: "One flagship event a quarter, fully produced.",
        quarterly: 6800,
        yearly: 5780,
        features: [
          "One event every quarter",
          "Concept, build and run of show",
          "Up to 150 guests",
          "Five creators cast per event",
          "48-hour edit, 40 assets",
        ],
        /** Where the plan button goes. Empty: /contact with this plan filled in. */
        href: "",
      },
      {
        id: "season",
        name: "Season",
        audience: "A moment every month and a community program.",
        quarterly: 12500,
        yearly: 10625,
        featured: true,
        badge: "Most booked",
        features: [
          "One event every month",
          "A weekly community program",
          "Waitlists and RSVP tools",
          "Fifteen creators cast a month",
          "An always-on crew, 150+ assets a month",
        ],
        href: "",
      },
    ],
    custom: {
      title: "Planning a tour or a festival?",
      action: "Let's talk",
      image: "/images/team-maya.webp",
    },
  },

  journal: {
    label: "Journal",
    title: "Notes from the floor.",
    all: "All articles",
  },

  faq: {
    title: "Questions, answered.",
    items: [
      {
        q: "What kind of brands do you work with?",
        a: "Consumer brands with something people can touch, taste or try: fashion, food and drink, beauty, wellness, sport and the occasional app with a real-world habit. Most clients have a launch, a new city or a community they want to grow.",
      },
      {
        q: "How far ahead should we book?",
        a: "Eight to ten weeks is comfortable for a pop-up or launch night. Community programs can start sooner because the first sessions are small. If your date is fixed and close, ask anyway: we keep a little room each season for quick turnarounds.",
      },
      {
        q: "What does a typical budget look like?",
        a: "Single events usually run from $40k to $250k including the build, depending on city, size and how long the doors stay open. Retainers are listed above and cover our team; production costs are quoted per event and approved before we spend them.",
      },
      {
        q: "Do you handle venues, permits and insurance?",
        a: "Yes. We scout and contract venues, file permits, carry event liability insurance and bring our own producers, crew and vendors. You approve the plan; we handle the paperwork.",
      },
      {
        q: "Who owns the content you capture?",
        a: "You do. Every photo, video and edit is delivered with full usage rights for organic and paid channels. Creator content follows the usage terms agreed with each creator up front, and we tell you exactly what they are before anyone posts.",
      },
      {
        q: "Can you run events outside our home city?",
        a: "We work across North America and Europe with local producers in nine cities, and we travel for everything else. Touring formats, where one concept moves city to city, are some of our favourite projects.",
      },
    ],
  },

  closing: {
    title: "Let's fill a room.",
    body: "Tell us what you're launching and where. We'll come back within two working days with a first idea and a rough budget.",
    note: "Now booking spring 2027",
    image: "/images/cta-crowd.webp",
    alt: "A crowd cheering under festoon lights as confetti falls",
  },

  footer: {
    headline: ["Moments people", "show up for."],
    newsletter: {
      title: "The Afterglow",
      body: "One short email a month on what filled rooms, and why.",
      placeholder: "Email address",
      action: "Subscribe",
    },
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
};

export type Site = typeof site;
export type Plan = (typeof site.pricing.plans)[number];
