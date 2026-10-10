// Everything a visitor reads lives here: brand, links, every heading, paragraph, plan and
// answer. Section order is in app/page.tsx; colours and type are in styles/base.css.
//
// Words in [brackets] inside a heading are set in a tile that snaps into the line as it
// scrolls into view, e.g. "Get paid by [@handle]." Use one bracketed phrase per heading.

export type Tone = "ultra" | "ink" | "paper" | "citrine";

export const site = {
  brand: "Inlay",
  legalName: "Inlay Labs ApS",
  title: "Inlay — Every piece of you, on one page",
  description:
    "Inlay is a link in bio you arrange like a gallery wall: posters, playlists, posts, products and bookings on one page that also pays you.",
  /** Your production URL, used for social previews. Leave empty until you have one. */
  url: "",

  /** The public address pages live at. The hero shows `${handleDomain}/${handle}`. */
  handleDomain: "inlay.me",

  links: {
    /**
     * Where "Claim your page" and "Sign up" go. The handle a visitor typed is added as
     * ?handle=… so your sign-up form can prefill it. Empty: they lead to the claim field in
     * the hero, and claiming a handle shows the plans.
     */
    signup: "",
    /** Your app's login page. Empty: the "Log in" links are hidden. */
    login: "",
    /**
     * Optional availability check: GET `${handleCheck}?handle=noa` answering
     * { "available": true | false }. Empty: handles are only checked for length and characters.
     */
    handleCheck: "",
    /** Receives { email } as JSON (POST) from the early-access form. Empty: it opens an email to `email`. */
    waitlistEndpoint: "",
    /** Receives { email } as JSON (POST) from the footer. Empty: it opens an email to `email`. */
    newsletterEndpoint: "",
    email: "hello@example.com",
    /** A status page for the footer's "All systems normal". Empty: shown without a link. */
    status: "",
    /** Empty entries are hidden. */
    social: {
      instagram: "https://www.instagram.com/",
      x: "https://x.com/",
      bluesky: "https://bsky.app/",
    },
  },

  nav: [
    { label: "Pay", href: "/#pay" },
    { label: "Sell", href: "/#sell" },
    { label: "Build", href: "/#build" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
  ],
  login: "Log in",
  signup: "Sign up",

  hero: {
    announcement: { label: "New", text: "Inlay Pay is rolling out", href: "/#pay" },
    // One string per line. The [bracketed] words sit in the tile.
    title: ["Every piece of you,", "on [one page]."],
    description:
      "Your posters, playlists, posts, products and bookings, arranged the way you like, on a page that also gets you paid.",
    /** Handles the claim field cycles through until someone types their own. */
    handles: ["noa", "halvor", "riso.club", "kettle", "ama", "plotline"],
    claim: "Claim your page",
    login: "Already on Inlay?",
  },

  /**
   * The example page the hero tiles fly into. Tiles are placed by `slot` (see the grid in
   * styles/hero.css); `scatter` is where each tile waits in the hero, as a fraction of the
   * hero's width and height, with a tilt in degrees. Phones use `phone`, as a fraction of the
   * band under the claim field where the tiles wait fanned out (null: the tile just fades in).
   */
  page: {
    name: "Noa Lindqvist",
    /** Shown in the page address until a visitor types their own handle. */
    handle: "noa",
    bio: "Type designer and poster artist. Copenhagen.",
    avatar: "/images/noa-avatar.webp",
    actions: ["Follow", "Tip €"],
    tiles: [
      { slot: "a", image: "/images/tile-noa.webp", alt: "Open studio poster: condensed black type over blue and red halftone dots, Saturday 18 October", scatter: { x: 0.035, y: 0.1, r: -7 }, phone: { x: -0.05, y: 0.1, r: -12 } },
      { slot: "b", image: "/images/tile-nordlys.webp", alt: "Poster for the Nordlys jazz festival: heavy black type, a red disc and blue bars", scatter: { x: -0.055, y: 0.63, r: 5 }, phone: { x: 0.13, y: 0.46, r: -5 } },
      { slot: "c", image: "/images/tile-glyph.webp", alt: "Process video: a lowercase g drawn with bezier handles", scatter: { x: 0.862, y: 0.03, r: 7 }, phone: { x: 0.8, y: -0.08, r: 9 } },
      { slot: "d", image: "/images/tile-booking.webp", alt: "Booking tile: poster critique, 30 minutes, €60, three free slots", scatter: { x: 0.1, y: 0.9, r: -5 }, phone: { x: 0.32, y: 0.04, r: 7 } },
      { slot: "e", image: "/images/tile-font.webp", alt: "Product tile: the Grotto Display typeface, six weights, €48", scatter: { x: 0.79, y: 0.84, r: -6 }, phone: { x: 0.5, y: 0.32, r: -6 } },
      { slot: "f", image: "/images/tile-album.webp", alt: "Music tile: Low Tide by Halvor, with cover art by Noa", scatter: { x: 0.875, y: 0.5, r: 4 }, phone: { x: 0.66, y: 0.16, r: 11 } },
      { slot: "g", image: "/images/tile-letter.webp", alt: "Newsletter tile: Kerning Club, a Sunday letter with 4,280 readers", scatter: { x: 0.02, y: 0.41, r: 3 }, phone: null },
    ],
    /** The bar of tile types under the example page. */
    toolbar: ["Photo", "Video", "Link", "Product", "Booking"],
  },

  pay: {
    label: "Inlay Pay",
    title: "A link in bio that [pays you].",
    description:
      "Tips, sales and bookings land in one balance. Move it to your bank whenever you like: today, not on the 15th.",
    currency: "EUR",
    balance: 2486.4,
    // The balance card cycles through these as they "arrive".
    incoming: [
      { who: "@mika", what: "Tip for the Low Tide cover", amount: 5 },
      { who: "@aiko", what: "Grotto Display licence", amount: 48 },
      { who: "@jonas", what: "Poster critique, Tue 10:00", amount: 60 },
      { who: "@lea", what: "Nordlys print, A2", amount: 35 },
      { who: "@sam", what: "Tip: “the g video, wow”", amount: 3 },
    ],
    views: [
      { label: "Balance", value: 2486.4 },
      { label: "This month", value: 3140 },
      { label: "Paid out", value: 18920.5 },
    ],
    payout: { idle: "Pay out", busy: "Paying out", done: "Sent to •••• 4021" },
    methods: "Cards, Apple Pay and Google Pay · 34 currencies",
    cta: "Turn on Inlay Pay",
  },

  // Four short chapters; the picture beside them swaps as you read.
  story: {
    chapters: [
      {
        label: "Tips & transfers",
        title: "Get paid by [@handle].",
        body: "Fans tip from your page and friends pay you by handle. No invoices, no bank details, no “what's your PayPal?”",
        points: ["Tips from €1, no account needed to pay", "Pay anyone on Inlay by handle", "Thank-you notes sent for you"],
        image: "/images/story-tips.webp",
        alt: "Activity feed: tips and payments from @mika, @aiko and @jonas, with a field to pay someone by handle",
        tone: "ultra" as Tone,
      },
      {
        label: "Bookings",
        title: "Your calendar, [priced].",
        body: "Sell critiques, lessons and studio visits. People pick a slot and pay upfront, so the slot is real and so is the money.",
        points: ["Syncs with Google and iCloud calendars", "Buffers, limits and time zones handled", "Reschedule links in every confirmation"],
        image: "/images/story-booking.webp",
        alt: "Booking sheet: a month calendar with Tuesday selected, three times, and a button to book and pay €60",
        tone: "paper" as Tone,
      },
      {
        label: "Payouts",
        title: "Paid [today], not on the 15th.",
        body: "Move your balance to your bank or debit card in seconds. Every fee is shown before you tap, and there's no minimum.",
        points: ["Instant payouts in 34 currencies", "Fees shown before you confirm", "Monthly statements for your accountant"],
        image: "/images/story-payout.webp",
        alt: "Payout sheet: €2,486.40 to a Nordea account ending 4021, arriving in seconds",
        tone: "citrine" as Tone,
      },
      {
        label: "Privacy",
        title: "Analytics, [minus the creep].",
        body: "See which tiles get looked at, clicked and bought. No cookies, no ad trackers and nothing sold, so your page never needs a cookie banner.",
        points: ["Views, clicks and sales per tile", "No cookies or third-party trackers", "Export or delete everything, anytime"],
        image: "/images/story-insights.webp",
        alt: "Dark analytics card: 18.2k views, 4.1k clicks and €3,140 in sales over 30 days, per tile",
        tone: "ink" as Tone,
      },
    ],
  },

  extras: {
    title: "Everything else, [built in].",
    description: "The things you'd otherwise glue together with five other apps.",
    cards: [
      { label: "Plus", title: "Your own domain", body: "Point noa.studio at your page in two clicks. Certificates and redirects are handled for you.", image: "/images/extra-domain.webp", alt: "Domain settings: noa.studio connected, with a green check" },
      { label: "Free", title: "A newsletter on your page", body: "Collect emails on a tile and send updates from Inlay. Export your list whenever you like.", image: "/images/extra-letter.webp", alt: "Newsletter editor: a short issue of Kerning Club ready to send to 4,280 readers" },
      { label: "Plus", title: "Members-only tiles", body: "Lock a tile for supporters: early drops, process videos, the playlist you draw to.", image: "/images/extra-members.webp", alt: "A locked tile for members, €4 a month, with three member avatars" },
      { label: "Free", title: "Drops on a schedule", body: "Set a tile to appear Friday at nine and disappear when the edition sells out.", image: "/images/extra-drop.webp", alt: "A scheduled drop: Nordlys A2 edition of 50, going live Friday 09:00" },
      { label: "Free", title: "Codes for the real world", body: "Print a code on a gig poster or a market stall. It opens your page and remembers where people came from.", image: "/images/extra-qr.webp", alt: "A QR code card labelled market stall, with 214 scans this week" },
    ],
  },

  early: {
    label: "Early access",
    title: "Inlay Pay is [opening up].",
    description: "We're switching it on country by country. Leave your email and we'll tell you the day it reaches you.",
    placeholder: "you@email.com",
    button: { idle: "Join the list", busy: "Joining", done: "You're on the list" },
    note: "Live now in the EU, the UK and the US.",
  },

  sell: {
    label: "Storefront",
    title: "Sell straight [from a tile].",
    description:
      "Add a product tile for fonts, prints, presets or tickets. Buyers check out on your page, and the file arrives the moment they pay.",
    points: ["Digital files delivered instantly", "Limited editions and pay what you want", "0% platform fee on Plus"],
    // The example: the page, the checkout the product tile grows into, and the paid state.
    frames: {
      page: "/images/sell-page.webp",
      checkout: "/images/sell-checkout.webp",
      paid: "/images/sell-paid.webp",
    },
    alt: "Noa's page with the Grotto Display tile opening into a checkout, then a paid receipt with a download",
    receipt: "+€48.00 to your balance",
  },

  connect: {
    eyebrow: "Works with what you already post",
    title: "Bring [every corner] of the internet.",
    description: "Embed posts, videos, tracks and repos from 40+ platforms. They stay live, so your page updates when you post.",
    cta: "Start your page",
  },

  build: {
    title: "Build it in [three moves].",
    steps: [
      { title: "Drop a tile", body: "Pick a photo, track, link, product or booking and drop it in. It finds the next free spot." },
      { title: "Size it", body: "Make what matters bigger. Everything around it makes room." },
      { title: "Move it", body: "Drag it anywhere. The grid rearranges itself, on desktop and on phones." },
    ],
  },

  showcase: {
    title: "Pages people [actually visit].",
    description: "A few of the 120,000 people who keep their corner of the internet on Inlay.",
    pages: [
      { name: "Halvor", handle: "halvor", role: "Ambient musician", stat: "2,300 listens from the page last month", image: "/images/page-halvor.webp" },
      { name: "Riso Club", handle: "riso.club", role: "Print studio", stat: "Sold out a 60-print run in a day", image: "/images/page-riso.webp" },
      { name: "Plotline", handle: "plotline", role: "Pen-plotter artist", stat: "€4,100 in editions this spring", image: "/images/page-plotline.webp" },
      { name: "Kettle", handle: "kettle", role: "Podcast", stat: "1,200 members at €4 a month", image: "/images/page-kettle.webp" },
      { name: "Ama Mensah", handle: "ama", role: "Illustrator", stat: "Booked out for commissions till May", image: "/images/page-ama.webp" },
      { name: "Noa Lindqvist", handle: "noa", role: "Type designer", stat: "312 font licences sold from one tile", image: "/images/page-noa.webp" },
    ],
  },

  pricing: {
    title: "Free to start. [Plus] when you're ready.",
    description: "Every page is free forever. Plus is for when your page starts earning.",
    /** Percentage off when billed yearly. `npm run verify:content` checks the yearly prices match. */
    saving: 20,
    currency: "EUR",
    plans: [
      {
        name: "Free",
        note: "Forever, for everyone",
        monthly: 0,
        yearly: 0,
        features: ["Unlimited tiles and pages", "Your inlay.me address", "Tips, products and bookings", "Analytics without cookies", "5% fee on sales"],
        cta: "Start free",
        href: "",
        featured: false,
      },
      {
        name: "Plus",
        note: "For pages that earn",
        monthly: 9,
        yearly: 7,
        features: ["Everything in Free", "Your own domain", "0% platform fee", "Members-only tiles", "Remove the Inlay badge", "Chat with the founders"],
        cta: "Get Plus",
        href: "",
        featured: true,
      },
    ],
    footnote: "Card processing (1.5% + €0.25 in the EU) applies to every sale, on every plan.",
  },

  faq: {
    title: "Questions, answered.",
    items: [
      { q: "What is Inlay?", a: "A personal page you arrange like a gallery wall. Photos, videos, music, links, products, bookings and a newsletter sit side by side as tiles, at one short address you can put in any bio." },
      { q: "Is it really free?", a: "Yes. Pages, tiles, tips, bookings, products and analytics are free forever. On the Free plan we take 5% of sales; Plus removes that fee and adds your own domain and members-only tiles." },
      { q: "What can I put on my page?", a: "Anything you make or link to: images, video, audio, links with previews, posts from 40+ platforms, digital products, bookings, a newsletter sign-up and plain text." },
      { q: "How do payments work?", a: "Visitors pay with a card, Apple Pay or Google Pay without making an account. The money lands in your Inlay balance, and you move it to your bank or card whenever you like." },
      { q: "When do I get my money?", a: "Instantly, if you want it. Payouts to most banks and debit cards arrive in seconds; the fee is shown before you confirm. You can also schedule a free weekly payout." },
      { q: "Which countries are supported?", a: "Pages work everywhere. Inlay Pay is live in the EU, the UK and the US and is rolling out to more countries; join the early-access list to hear when it reaches you." },
      { q: "Can I use my own domain?", a: "On Plus, yes. Connect a domain you own (noa.studio instead of inlay.me/noa) and we handle certificates and redirects." },
      { q: "Do you track my visitors?", a: "No. Analytics are counted without cookies or fingerprinting, nothing is shared with advertisers, and your page never needs a cookie banner." },
      { q: "Can I take my page with me?", a: "Always. Export your tiles, files, sales history and subscriber list as standard formats at any time, and delete your account in one step." },
      { q: "Does it work for a band, shop or studio?", a: "Yes. A page can have several editors, and Plus adds a business name on receipts and monthly statements for your accountant." },
    ],
  },

  footer: {
    claim: "Your page is waiting at",
    columns: [
      { title: "Product", links: [{ label: "Pages", href: "/#build" }, { label: "Inlay Pay", href: "/#pay" }, { label: "Storefront", href: "/#sell" }, { label: "Pricing", href: "/#pricing" }] },
      { title: "Resources", links: [{ label: "Showcase", href: "/#showcase" }, { label: "Questions", href: "/#faq" }, { label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }] },
      // Empty links are hidden, so you can list pages before they exist.
      { title: "Company", links: [{ label: "Contact", href: "mailto:hello@example.com" }, { label: "Press", href: "mailto:hello@example.com?subject=Press" }, { label: "Careers", href: "mailto:hello@example.com?subject=Careers" }, { label: "About", href: "" }] },
    ],
    newsletter: { title: "Product notes, once a month.", placeholder: "you@email.com", button: { idle: "Subscribe", busy: "Subscribing", done: "Subscribed" } },
    status: "All systems normal",
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
};
