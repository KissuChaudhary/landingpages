import type { Accent } from "@/site.config";

// Case studies. Each one gets a card on the home page (if listed in site.work.featured),
// a card on /work and its own page at /work/<slug>.

export type Kind = "Pop-up" | "Launch" | "Community" | "Creator trip";

export type Work = {
  slug: string;
  client: string;
  title: string;
  kind: Kind;
  /** Shown on the card next to the client name. */
  metric: string;
  summary: string;
  image: string;
  alt: string;
  accent: Accent;
  facts: { label: string; value: string }[];
  results: { value: number; suffix?: string; prefix?: string; decimals?: number; label: string }[];
  brief: string;
  built: { title: string; body: string }[];
  night: string;
  afterglow: string;
  quote: { text: string; name: string; role: string };
  gallery: { image: string; alt: string }[];
};

export const work: Work[] = [
  {
    slug: "halfmoon",
    client: "Halfmoon",
    title: "The Cold Room: a three-day puffer pop-up",
    kind: "Pop-up",
    metric: "3-day pop-up · 6,200 guests",
    summary:
      "An outerwear label's first physical store, built inside a Brooklyn warehouse as a room you had to queue for and couldn't stop filming.",
    image: "/images/work-halfmoon.webp",
    alt: "A model in a black puffer jacket on a lime platform while guests film her",
    accent: "iris",
    facts: [
      { label: "Format", value: "Three-day pop-up" },
      { label: "City", value: "Brooklyn, New York" },
      { label: "Services", value: "Concept, build, waitlist, capture" },
      { label: "Timeline", value: "Nine weeks" },
    ],
    results: [
      { value: 6200, label: "guests through the doors" },
      { value: 3, label: "hours to sell out the first drop" },
      { value: 1.4, decimals: 1, suffix: "M", label: "organic views in two weeks" },
    ],
    brief:
      "Halfmoon had sold online for four years and built a loyal, quiet following. For the winter collection they wanted a first physical moment that felt like the brand: warm, a little strange and worth travelling for. It had to sell the first drop and give the team content for the whole season.",
    built: [
      {
        title: "A room built for the jacket",
        body: "We turned a 9,000 square foot warehouse into a cold, bright room with oversized inflatable forms in the brand's periwinkle and a single lime platform where guests could try the jackets under flash.",
      },
      {
        title: "A waitlist that felt like an invite",
        body: "Entry times were released in three waves by text. Each wave sold out in minutes, which became its own story on social before the doors had opened.",
      },
      {
        title: "Content designed in, not added on",
        body: "Every corner was blocked for camera. Twelve creators had their own call times, and a crew of four shot the room from open to close.",
      },
    ],
    night:
      "The line started at seven in the morning for a ten o'clock opening. Guests were let in by entry time, given ten minutes on the platform and walked out with a jacket, a photo and something to post. Our producers kept the queue moving and the room calm, even at capacity.",
    afterglow:
      "Within 48 hours Halfmoon had 220 edited photos and 64 short videos, cut for every channel. The team posted from the pop-up for six weeks, and the room's look became the campaign for the rest of the season.",
    quote: {
      text: "We'd never sold a jacket in person before. By lunchtime on day one we'd sold the first drop, and the photos still show up in our tags.",
      name: "Lena Hartley",
      role: "VP Brand, Halfmoon",
    },
    gallery: [
      { image: "/images/svc-popups.webp", alt: "Shoppers photographing products on periwinkle plinths" },
      { image: "/images/feature-line.webp", alt: "A line of guests queuing outside the pop-up" },
    ],
  },
  {
    slug: "northpaw",
    client: "Northpaw",
    title: "Sunday Pack: a run club for dogs and their people",
    kind: "Community",
    metric: "Weekly run club · 900 members",
    summary:
      "A pet care brand's launch activation that became a weekly habit across four cities, with hosts, routes and rituals Northpaw now runs itself.",
    image: "/images/work-northpaw.webp",
    alt: "A golden retriever in a periwinkle bandana leaping ahead of a group of runners",
    accent: "lime",
    facts: [
      { label: "Format", value: "Weekly community program" },
      { label: "Cities", value: "Chicago, Austin, Denver, Toronto" },
      { label: "Services", value: "Program design, hosts, capture" },
      { label: "Running since", value: "March 2025" },
    ],
    results: [
      { value: 900, label: "members running each Sunday" },
      { value: 62, suffix: "%", label: "come back the following week" },
      { value: 38, label: "runs hosted in the first season" },
    ],
    brief:
      "Northpaw was launching a range of joint supplements for active dogs. A launch event would have been forgotten in a week, so we proposed something slower: a run that happens every Sunday, where the product is part of the ritual rather than the reason.",
    built: [
      {
        title: "Routes worth showing up for",
        body: "Five-kilometre loops in each city's best dog-friendly park, with a water and treat stop at the halfway point and a slower pace group so nobody gets left behind.",
      },
      {
        title: "Hosts, not promoters",
        body: "We recruited and trained two local hosts per city from the dog-owner community, gave them a playbook and paid them to run the club like it was theirs.",
      },
      {
        title: "A ritual at the finish",
        body: "Every run ends with a group photo, a bandana for first-timers and coffee for the humans. The bandana became the club's badge, and members wear them to other events.",
      },
    ],
    night:
      "The first run in Chicago drew 140 people and 120 dogs in light rain. By the fourth week, the slower pace group was the biggest one, and the hosts were introducing members to each other by their dogs' names.",
    afterglow:
      "Members post every week without being asked. We handed the program over to Northpaw's community team after the first season, with the hosts, routes, member list and a monthly content kit they still use.",
    quote: {
      text: "What started as a launch activation is now the best channel we have. People join for the dogs and stay for each other.",
      name: "Mei Tanaka",
      role: "Head of Community, Northpaw",
    },
    gallery: [
      { image: "/images/svc-community.webp", alt: "Members stretching in matching lime caps" },
      { image: "/images/journal-runclub.webp", alt: "Running shoes and coffee cups after a run" },
    ],
  },
  {
    slug: "saltwork",
    client: "Saltwork",
    title: "Low Tide Tour: six beaches, one van",
    kind: "Pop-up",
    metric: "Sampling tour · 28,000 samples",
    summary:
      "A skincare brand's sampling tour in a converted camper van, timed to low tide on six beaches, built to put the product in people's hands where they'd actually use it.",
    image: "/images/work-saltwork.webp",
    alt: "Two guests testing skincare at a periwinkle counter built into a camper van",
    accent: "blush",
    facts: [
      { label: "Format", value: "Eleven-day sampling tour" },
      { label: "Route", value: "California coast" },
      { label: "Services", value: "Vehicle build, route, staffing, capture" },
      { label: "Timeline", value: "Seven weeks" },
    ],
    results: [
      { value: 28000, label: "samples handed out" },
      { value: 3.2, decimals: 1, suffix: "×", label: "site traffic during the tour" },
      { value: 310, label: "edits delivered for paid social" },
    ],
    brief:
      "Saltwork's mineral sunscreen tested well and sold poorly, because people didn't believe it would feel light. The fix was simple: get it on people's skin at the beach. The brief was to do that at a scale that moved the numbers.",
    built: [
      {
        title: "A van that's also a counter",
        body: "We rebuilt a vintage camper van with a fold-down periwinkle counter, a sink and shelving for testers, so the whole shop could open in ten minutes and close before the tide came in.",
      },
      {
        title: "A route planned around the tide",
        body: "Each stop was scheduled for the two hours either side of low tide, when beaches are busiest and people have time to stop.",
      },
      {
        title: "A reason to come back",
        body: "Guests who tried the product got a code for a full-size bottle, redeemable online that week. Redemptions told us which beaches to revisit.",
      },
    ],
    night:
      "On the busiest day in Santa Monica the van served 4,000 people. Our team of six kept the counter moving, and the crew filmed real reactions instead of staged ones, which is what made the edits work.",
    afterglow:
      "Saltwork's paid team ran the tour edits for a full quarter. The real reactions outperformed their studio ads, and the van now tours every summer.",
    quote: {
      text: "We left with more than 300 edits ready to post. The real reactions beat every studio ad we'd made.",
      name: "Aoife Byrne",
      role: "Growth Lead, Saltwork",
    },
    gallery: [
      { image: "/images/svc-creators.webp", alt: "A creator filming a friend jumping into a pool" },
      { image: "/images/journal-edit.webp", alt: "An editor cutting footage from the tour" },
    ],
  },
  {
    slug: "fernway",
    client: "Fernway",
    title: "Long Table: a plant-based supper series",
    kind: "Launch",
    metric: "12 dinners · 96% turnout",
    summary:
      "Twelve sold-out dinners in sunlit lofts and a greenhouse to launch a plant-based range to people who don't usually buy plant-based.",
    image: "/images/work-fernway.webp",
    alt: "Hands reaching across a long table of colourful dishes",
    accent: "lime",
    facts: [
      { label: "Format", value: "Twelve-dinner series" },
      { label: "Cities", value: "Lisbon, London, Amsterdam" },
      { label: "Services", value: "Concept, guest curation, capture" },
      { label: "Timeline", value: "Ten weeks" },
    ],
    results: [
      { value: 1440, label: "seats filled" },
      { value: 96, suffix: "%", label: "of RSVPs turned up" },
      { value: 41, suffix: "%", label: "of guests had never bought plant-based" },
    ],
    brief:
      "Fernway's range was made for people who love food, not for people who already eat plant-based. They wanted to reach that audience without a sampling stand. We suggested the oldest format there is: a long table and a good dinner.",
    built: [
      {
        title: "A guest list with a mix",
        body: "Each table was curated: chefs, regulars from the neighbourhood, a few creators and people who'd never tried the range. RSVPs were confirmed twice, which is why almost everyone came.",
      },
      {
        title: "A menu built around the range",
        body: "Local chefs cooked a sharing menu with Fernway products at the centre, served family-style so people had to talk to each other.",
      },
      {
        title: "A table designed for overhead shots",
        body: "Lime linen, periwinkle plates and dishes placed for the camera above. The overhead photos became the range's packaging imagery.",
      },
    ],
    night:
      "One dinner lost power halfway through the main course during a storm. The team brought out candles, the chefs finished on gas burners and the guests remember it as the best night of the series.",
    afterglow:
      "Fernway used the overhead photographs across retail and packaging, and the dinners became a quarterly fixture with a waitlist of more than 3,000.",
    quote: {
      text: "Two hundred guests, a storm and a power cut. Nobody noticed but us. That's the whole job.",
      name: "Ravi Menon",
      role: "Brand Director, Fernway",
    },
    gallery: [
      { image: "/images/hero-supper.webp", alt: "A guest raising a glass in a greenhouse" },
      { image: "/images/journal-guestlist.webp", alt: "A wristband fastened at the door" },
    ],
  },
  {
    slug: "orbit",
    client: "Orbit Coffee",
    title: "After Hours: a coffee shop's opening night",
    kind: "Launch",
    metric: "Opening night · 1,100 RSVPs",
    summary:
      "A specialty roaster's first café opened at nine at night with a DJ, a dance floor and espresso tonics, so the neighbourhood met it at its best.",
    image: "/images/work-orbit.webp",
    alt: "Guests dancing with paper cups as confetti falls in a café",
    accent: "stone",
    facts: [
      { label: "Format", value: "Launch night" },
      { label: "City", value: "Austin, Texas" },
      { label: "Services", value: "Concept, guest list, run of show, capture" },
      { label: "Timeline", value: "Six weeks" },
    ],
    results: [
      { value: 1100, label: "RSVPs for 400 places" },
      { value: 2, label: "hours for the list to fill" },
      { value: 38, suffix: "%", label: "of guests came back in the first week" },
    ],
    brief:
      "Orbit had roasted for restaurants for a decade and was opening its first café. Coffee openings tend to be quiet mornings with free samples. They wanted the neighbourhood to remember this one.",
    built: [
      {
        title: "Open the café at night",
        body: "We flipped the format: doors at nine in the evening, a local DJ behind the counter and an espresso tonic menu. The café's morning regulars were invited first.",
      },
      {
        title: "A list that filled itself",
        body: "Invites went to neighbours, local businesses and Orbit's restaurant partners, each with one plus-one. The list filled in two hours, and the waitlist did the rest.",
      },
      {
        title: "Confetti at midnight",
        body: "One cue, one moment: at midnight the lights dropped and lime confetti fell from the ceiling. It's in almost every video from the night.",
      },
    ],
    night:
      "Four hundred guests, a line around the corner until one in the morning and a café that ran out of oat milk twice. Our producers handled the door so Orbit's team could make coffee and meet their new neighbours.",
    afterglow:
      "Orbit's first week of mornings was busier than their forecast for the first month, and the night became a monthly After Hours that still sells out.",
    quote: {
      text: "No padding and no no-shows. The room was exactly who we wanted, and they posted about it all week.",
      name: "Daniel Okafor",
      role: "Founder, Orbit Coffee",
    },
    gallery: [
      { image: "/images/svc-launch.webp", alt: "Confetti falling over a cheering crowd" },
      { image: "/images/cta-crowd.webp", alt: "Guests cheering under festoon lights" },
    ],
  },
];

export const getWork = (slug: string) => work.find((item) => item.slug === slug);

/** The filters on /work, in the order they first appear, so an unused kind never shows an empty filter. */
export const kinds: Kind[] = Array.from(new Set(work.map((item) => item.kind)));
