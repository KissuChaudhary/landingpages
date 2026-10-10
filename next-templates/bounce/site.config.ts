// Everything a buyer usually changes lives here: brand, cohort, links, copy, curriculum,
// plans, stories and questions. Photos live in public/images; see ASSETS.md.

export type Color = "pink" | "violet" | "blue" | "lime" | "cyan" | "amber";

export const site = {
  brand: "Bounce",
  legalName: "Bounce Studio Ltd",
  title: "Bounce: a six-week music production course",
  description:
    "Go from an eight-bar loop to a mixed, mastered and released song in six weeks. Live sessions, weekly feedback on your own track, and a crew that finishes with you.",

  // The next cohort. Seats left and the countdown are calculated from these values.
  cohort: { name: "Cohort 07", start: "2026-11-03T18:00:00Z", seats: 60, taken: 38 },

  // Destinations. Leave a value empty to use the fallback described next to it.
  links: {
    enroll: "", // Your checkout or application page. Empty: "Join" buttons scroll to pricing.
    signin: "", // Student login. Empty: the "Log in" link is hidden.
    email: "hello@example.com",
  },

  social: [
    { label: "YouTube", href: "" },
    { label: "Instagram", href: "" },
    { label: "TikTok", href: "" },
  ],

  nav: [
    { label: "Course", href: "/#outcomes" },
    { label: "Weeks", href: "/#weeks" },
    { label: "Teacher", href: "/#teacher" },
    { label: "Stories", href: "/#stories" },
    { label: "Pricing", href: "/#pricing" },
  ],

  hero: {
    heading: ["Finish the tracks", "you start."],
    text: "A six-week production course that takes you from an eight-bar loop to a mixed, mastered and released song. Live sessions, weekly feedback on your own track, and a crew that finishes with you.",
    primary: "Join Cohort 07",
    secondary: { label: "See the six weeks", href: "/#weeks" },
    proof: { count: "2,140", text: "tracks finished by past students", avatars: ["/images/ama.webp", "/images/kenji.webp", "/images/ruth.webp", "/images/arjun.webp"] },
    // Floating labels around the beat pad.
    chips: [
      { label: "Hook written", detail: "Week 1 · 0:32", color: "pink" as Color },
      { label: "Mix bounced", detail: "Week 5 · -14 LUFS", color: "lime" as Color },
      { label: "Released", detail: "Week 6 · Night Bus", color: "violet" as Color },
    ],
  },

  // The beat pad in the hero. Patterns use x for a hit and . for a rest, 16 steps per row.
  pad: {
    rows: [
      { name: "Kick", color: "pink" as Color },
      { name: "Snare", color: "violet" as Color },
      { name: "Hats", color: "cyan" as Color },
      { name: "Keys", color: "lime" as Color },
    ],
    presets: [
      { name: "House", bpm: 122, pattern: ["x...x...x...x...", "....x.......x...", "..x...x...x...xx", "x.......x..x...."] },
      { name: "Boom bap", bpm: 90, pattern: ["x......x..x.....", "....x.......x..x", "x.x.x.x.x.x.x.x.", "x.......x......."] },
      { name: "Lo-fi", bpm: 78, pattern: ["x.....x...x.....", "....x.......x...", "x.xxx.x.x.xxx.x.", "x...........x..."] },
    ],
  },

  tracks: {
    label: "Recently finished by students",
    items: [
      { title: "Glass Tides", artist: "Ama B.", genre: "Deep house", colors: ["#ff3d8b", "#7b5cff"] },
      { title: "Night Bus", artist: "Kenji M.", genre: "Lo-fi", colors: ["#19c4d8", "#2f6bff"] },
      { title: "Low Season", artist: "Ruth E.", genre: "Indie pop", colors: ["#ffb020", "#ff3d8b"] },
      { title: "Paper Planes", artist: "Arjun M.", genre: "Garage", colors: ["#b8f24a", "#19c4d8"] },
      { title: "Marigold", artist: "Valeria C.", genre: "Afro house", colors: ["#ffb020", "#7b5cff"] },
      { title: "Static Bloom", artist: "Karim N.", genre: "Ambient", colors: ["#2f6bff", "#b8f24a"] },
      { title: "Satellite", artist: "Jo P.", genre: "Synthwave", colors: ["#7b5cff", "#19c4d8"] },
      { title: "Sunday Sketch", artist: "Lena T.", genre: "Jazz hop", colors: ["#ff3d8b", "#ffb020"] },
    ],
  },

  statement: {
    text: "You don't need another plugin. You need an ending.",
    files: ["loop_final_v7", "untitled 88bpm", "idea (3)", "sunday sketch", "bounce this one", "chords?? ", "new project 41", "drop idea"],
    finished: "night-bus_master.wav",
  },

  outcomes: {
    heading: ["By week six,", "you'll have"],
    items: [
      { eyebrow: "Weeks 1–2", title: "An idea worth finishing", text: "Turn a loop into a song sketch with a hook, a plan and a deadline.", image: "/images/outcome-idea.webp", alt: "A producer with headphones at a keyboard in magenta light." },
      { eyebrow: "Week 2", title: "Drums that hit", text: "Programme grooves that move people, then shape them so they cut through.", image: "/images/outcome-drums.webp", alt: "A producer tapping drum pads in cyan light." },
      { eyebrow: "Week 5", title: "Mixes that translate", text: "Balance, space and loudness that sound right on phones, cars and clubs.", image: "/images/outcome-mix.webp", alt: "A producer turning a knob beside studio monitors in amber and violet light." },
      { eyebrow: "Weeks 3–4", title: "A sound that's yours", text: "Design signature sounds instead of scrolling presets for an hour.", image: "/images/outcome-sound.webp", alt: "A musician playing an analog synthesizer in green light." },
      { eyebrow: "Week 6", title: "A release, not a folder", text: "Master, artwork, distribution and a launch plan for your first release.", image: "/images/outcome-release.webp", alt: "A producer at a laptop in blue light with city lights behind." },
    ],
  },

  weeks: {
    heading: ["Six weeks.", "One finished track."],
    intro: "Every week adds a layer to the same song, so by the end you have a release, not a stack of exercises.",
    items: [
      { title: "Idea", subtitle: "Loop to sketch", color: "pink" as Color, live: "Kickoff and loop clinic", assignment: "A 60-second sketch with a hook", lessons: ["Finding the eight bars worth keeping", "Writing a hook in twenty minutes", "Using reference tracks properly", "Mapping the song before you build it", "Deadlines that actually work"] },
      { title: "Rhythm", subtitle: "Drums and groove", color: "violet" as Color, live: "Groove surgery", assignment: "Two contrasting drum sections", lessons: ["Groove, swing and ghost notes", "Layering kicks and snares", "Percussion that moves", "Building energy with hats", "Drums that leave room for bass"] },
      { title: "Harmony", subtitle: "Chords and bass", color: "blue" as Color, live: "Chord clinic", assignment: "A full harmonic section", lessons: ["Progressions that aren't boring", "Basslines that lock to the kick", "Voicing and register", "Low end you can trust", "Sound design for your lead"] },
      { title: "Arrange", subtitle: "Loop to song", color: "lime" as Color, live: "Arrangement teardown", assignment: "A full arrangement and rough mix", lessons: ["From loop to verse and chorus", "Transitions, risers and drops", "The art of taking things out", "Holding attention for three minutes", "Rough mixing as you go"] },
      { title: "Mix", subtitle: "Balance and space", color: "cyan" as Color, live: "Live mix review", assignment: "A mix checked on three systems", lessons: ["Gain staging and balance", "EQ for space, not shine", "Compression without fear", "Depth with reverb and delay", "Mixing on headphones"] },
      { title: "Release", subtitle: "Master and launch", color: "amber" as Color, live: "Listening party", assignment: "Release it", lessons: ["Mastering for streaming", "Loudness, honestly", "Artwork and metadata", "Distribution and pitching", "Your first-release plan"] },
    ],
  },

  teacher: {
    heading: "Taught by someone who finishes for a living",
    name: "Theo Vance",
    role: "Producer, mix engineer and teacher",
    photo: "/images/teacher.webp",
    bio: [
      "Theo has spent twelve years producing and mixing for independent artists, from bedroom demos to records on national radio. He started teaching because most talented producers he met were stuck at the same place: the second half of the song.",
      "Bounce is the course he wishes he'd had. Every lesson is built around finishing, and every week he listens to your actual project, not a hypothetical one.",
    ],
    stats: [
      { value: "12", suffix: " yrs", label: "producing and mixing" },
      { value: "60", suffix: "M+", label: "streams on productions" },
      { value: "1,900", suffix: "", label: "students taught" },
    ],
    credits: [
      { title: "Glasshouse", artist: "Mira Lune", role: "Producer", year: "2025", colors: ["#7b5cff", "#ff3d8b"] },
      { title: "Low Season", artist: "Kofi & The Static", role: "Co-writer, mix", year: "2024", colors: ["#19c4d8", "#2f6bff"] },
      { title: "Satellite Heart", artist: "Ana Sol", role: "Producer", year: "2024", colors: ["#ffb020", "#ff3d8b"] },
      { title: "Northern Rooms", artist: "TV series", role: "Score and sync", year: "2023", colors: ["#b8f24a", "#19c4d8"] },
    ],
  },

  platform: {
    heading: ["Feedback lands", "on the waveform."],
    text: "Upload your project every week. Theo and the crew leave comments at the exact second something works or doesn't, so you always know what to fix next.",
    image: "/images/platform.webp",
    phone: "/images/platform-phone.webp",
    alt: "The Bounce lesson player with a song's waveform, time-stamped feedback comments and the week's lessons.",
    notes: [
      { title: "Time-stamped notes", text: "Comments pinned to the second they're about." },
      { title: "Weekly listen", text: "Every student's project, every week." },
      { title: "Before and after", text: "Compare versions on the same timeline." },
    ],
  },

  stories: {
    heading: ["Finished.", "Released. Played."],
    stats: [
      { value: "2,140", label: "tracks finished" },
      { value: "41", label: "countries" },
      { value: "4.9", label: "average rating" },
    ],
    items: [
      { name: "Ama Boateng", avatar: "/images/ama.webp", track: "Glass Tides", result: "First release, 24k streams", quote: "I had 63 unfinished projects. In week six I released my first track, and it's still the thing I'm proudest of.", color: "pink" as Color },
      { name: "Kenji Mori", avatar: "/images/kenji.webp", track: "Night Bus", result: "Signed to a small label", quote: "The feedback on the waveform is unreal. Theo hears the exact second something's off and tells you why.", color: "cyan" as Color },
      { name: "Ruth Ellison", avatar: "/images/ruth.webp", track: "Low Season", result: "Mixed in three weeks, not three months", quote: "I finally understand why my mixes fell apart in the car. Now I check on three systems before I call anything done.", color: "lime" as Color },
      { name: "Arjun Mehta", avatar: "/images/arjun.webp", track: "Paper Planes", result: "Licensed for a podcast intro", quote: "The arrangement week alone was worth it. Taking things out made my tracks twice as interesting.", color: "violet" as Color },
      { name: "Valeria Cruz", avatar: "/images/valeria.webp", track: "Marigold", result: "Played her first live set", quote: "Having a crew finishing at the same time kept me honest. Nobody wanted to show up to the listening party empty-handed.", color: "amber" as Color },
      { name: "Karim Nasser", avatar: "/images/karim.webp", track: "Static Bloom", result: "Four tracks finished since", quote: "It's not just one song. The process stuck, and I've finished more in six months than in the four years before.", color: "blue" as Color },
    ],
  },

  included: {
    heading: ["Everything", "in the session."],
    items: [
      { value: "6", unit: "live sessions", text: "Thursdays, recorded if you miss one" },
      { value: "42", unit: "short lessons", text: "Each one ends with something to try" },
      { value: "6", unit: "feedback rounds", text: "On your own track, every week" },
      { value: "1.4", unit: "GB sample pack", text: "Royalty-free drums, loops and one-shots" },
      { value: "12", unit: "project files", text: "For Ableton, Logic and FL Studio" },
      { value: "60", unit: "producers in your crew", text: "A private community that finishes with you" },
    ],
    note: "Lifetime access to lessons and future updates.",
  },

  pricing: {
    heading: ["Pick how much", "help you want."],
    tiers: [
      {
        id: "self",
        name: "Self-paced",
        color: "blue" as Color,
        price: 149,
        installments: null as null | { count: number; amount: number },
        tagline: "Every lesson, at your own speed.",
        features: ["All 42 lessons", "Sample pack and project files", "Private community", "Lifetime access and updates"],
        cohort: false,
        cta: "Start now",
        checkout: "",
      },
      {
        id: "cohort",
        name: "Cohort",
        color: "pink" as Color,
        price: 349,
        installments: { count: 3, amount: 119 } as null | { count: number; amount: number },
        tagline: "Six weeks, live, with feedback on your track.",
        features: ["Everything in Self-paced", "Six live sessions with Theo", "Weekly feedback on your project", "Release support and pitch template"],
        cohort: true,
        cta: "Join Cohort 07",
        checkout: "",
      },
      {
        id: "mentor",
        name: "Cohort + mentor",
        color: "violet" as Color,
        price: 790,
        installments: { count: 3, amount: 269 } as null | { count: number; amount: number },
        tagline: "The cohort, plus Theo one-to-one.",
        features: ["Everything in Cohort", "Three one-to-one calls", "Mix review of two more tracks", "Priority feedback"],
        cohort: true,
        cta: "Apply for mentoring",
        checkout: "",
      },
    ],
    defaultTier: "cohort",
    guarantee: "14-day refund if it's not for you, no questions asked.",
  },

  faq: {
    heading: ["Questions,", "answered."],
    contact: { title: "Still deciding?", text: "Send Theo a voice note or an email. He answers every one himself." },
    items: [
      { q: "Which DAW do I need?", a: "Any of them. Lessons are demonstrated in Ableton Live, with project files for Logic Pro and FL Studio too. The ideas transfer to every DAW." },
      { q: "Am I too much of a beginner?", a: "If you can make a loop, you're ready. Bounce is for people who start lots of ideas and finish few, not for people opening a DAW for the first time." },
      { q: "How much time does it take each week?", a: "Plan for five to seven hours: about an hour of lessons, a ninety-minute live session and the rest on your own track." },
      { q: "What if I miss a live session?", a: "Every session is recorded and posted the same day, and you can leave questions in advance for Theo to answer live." },
      { q: "Can I get a refund?", a: "Yes. If Bounce isn't right for you, ask within 14 days of the start date for a full refund." },
      { q: "What time are the live sessions?", a: "Thursdays at 18:00 UTC. That's morning on the US west coast and evening in Europe, and recordings cover every other time zone." },
    ],
  },

  closing: {
    heading: "Your next track has an ending.",
    text: "Cohort 07 starts soon. Bring a loop; leave with a release.",
    cta: "Join Cohort 07",
  },

  footer: {
    blurb: "A six-week music production course for people who start more than they finish.",
    columns: [
      { title: "Course", links: [{ label: "What you'll make", href: "/#outcomes" }, { label: "The six weeks", href: "/#weeks" }, { label: "Full syllabus", href: "/syllabus" }, { label: "Pricing", href: "/#pricing" }] },
      { title: "About", links: [{ label: "Your teacher", href: "/#teacher" }, { label: "Student stories", href: "/#stories" }, { label: "Questions", href: "/#faq" }] },
      { title: "Legal", links: [{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }] },
    ],
  },
};

export type Tier = (typeof site.pricing.tiers)[number];

/** Where "Join" buttons go. */
export const enrollHref = () => site.links.enroll || "/#pricing";

/** Where a plan button goes. */
export const tierHref = (tier: Tier) => tier.checkout || site.links.enroll || mailto(`${site.brand} ${tier.name}`);

export const mailto = (subject: string) => `mailto:${site.links.email}?subject=${encodeURIComponent(subject)}`;

/** Seats left in the next cohort, never below zero. */
export const seatsLeft = () => Math.max(0, site.cohort.seats - site.cohort.taken);

/** "3 Nov" style start date, fixed to UTC so it renders the same everywhere. */
export const cohortDate = () =>
  new Date(site.cohort.start).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
