/**
 * The single source of truth for the whole portfolio.
 *
 * Merged + de-duplicated from four AI-assistant summaries (Gemini + 3 ChatGPT accounts) and
 * Harvansh's own notes. Where they conflicted, his own words won:
 *   - Threddr  = the Reddit customer-finder (not the "modular workspace" idea).
 *   - TheIndieWall + FoundersWall = one product (FoundersWall).
 *   - PinLoop AI = EcomPin = "Ecompon" (one product).
 *   - BringBack ≈ $2.9K in ~a year ("1 year, 3k revenue in total"). ~$3.8K = lifetime, everything.
 *
 * Timeline months are a best reconstruction (`born` / `died` = months since Oct 2024).
 * Edit freely: everything in the UI derives from this file.
 */

export const PERSON = {
  name: 'Harvansh',
  handle: '@9to5_Dad',
  x: 'https://x.com/9to5_Dad',
  startedISO: '2024-10-01',
} as const;

export type Status = 'paying' | 'alive' | 'pivoting' | 'dead' | 'shelved' | 'unlaunched' | 'given-away';

export interface Product {
  id: string;
  name: string;
  url?: string;
  what: string;
  /** What the landing page says (the hype layer). */
  hype: string;
  /** What actually happened (the truth layer). */
  truth: string;
  status: Status;
  /** Short verdict, used on the stamp. */
  verdict: string;
  /** Months since Oct 2024 (0 = Oct 2024, 12 = Oct 2025, 24 = Oct 2026). */
  born: number;
  died: number | null;
  cause?: string;
  did: string[];
  lesson: string;
  facts?: { k: string; v: string }[];
  /** Screenshot for the X-ray film. */
  image?: string;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'content-gen',
    name: 'Saze AI',
    what: 'My very first product. An AI content generator.',
    hype: 'Generate content in seconds.',
    truth: 'No customers. No revenue. I tried to keep it alive on AdSense.',
    status: 'dead',
    verdict: 'NO USERS',
    born: 0,
    died: 3,
    cause: 'Nobody wanted it',
    did: [
      'Shipped a real web app with no coding background',
      'Wired up payments, a database and a deploy pipeline for the first time',
    ],
    lesson: 'Shipping is not proof that anyone wants it.',
  },
  {
    id: 'unrealshot',
    name: 'UnrealShot AI',
    url: 'https://www.unrealshot.com',
    what: 'AI photoshoots that look like real photos, not AI.',
    hype: 'The hyper-realistic, anti-AI photoshoot.',
    truth:
      'My first paying users, and some of them came back. Then four pivots, each one chasing a clearer market. Still looking for the version that sticks.',
    status: 'pivoting',
    verdict: 'PIVOTED ×4',
    born: 3,
    died: null,
    did: [
      'Deleted per-customer LoRA training: too slow, too many GPU dollars, margins gone',
      'Rebuilt on Seedream v4.5 with reference images + preset style packs',
      'Wrote prompts like a photographer: 50mm / 85mm, real lighting, shallow depth of field',
    ],
    lesson: 'I solved problems nobody could see, and never proved the market.',
    facts: [
      { k: 'Pivots', v: '4' },
      { k: 'LoRA training', v: 'deleted' },
    ],
    featured: true,
  },
  {
    id: 'oss-starter',
    name: 'Next.js starter',
    what: 'My own setup (Next.js, Supabase auth, payments), open-sourced.',
    hype: 'Ship your SaaS this weekend.',
    truth: 'Builders liked it. Then I left it alone.',
    status: 'given-away',
    verdict: 'GIVEN AWAY',
    born: 6,
    died: 7,
    cause: 'Left it',
    did: ['Packaged the exact stack I actually use', 'Gave it to the builder community for free'],
    lesson: 'Free earns respect. It does not earn revenue.',
  },
  {
    id: 'lexistock',
    name: 'Lexistock',
    what: 'Free AI image tools: background removal, enhance, restore, upscale.',
    hype: 'Every image tool you need. Free.',
    truth: 'A traffic lab. It taught me how Google indexes pages and what people actually click.',
    status: 'shelved',
    verdict: 'TRAFFIC LAB',
    born: 8,
    died: 12,
    cause: 'Served its purpose',
    did: ['Tested organic traffic with free tools', 'Learned SEO by shipping pages and watching Search Console'],
    lesson: 'Free tools bring visitors, not customers.',
  },
  {
    id: 'threddr',
    name: 'Threddr',
    what: 'Find potential customers on Reddit.',
    hype: 'Find your first customers where they already hang out.',
    truth: 'I used it myself. A few other builders found it useful. There was no business in it.',
    status: 'shelved',
    verdict: 'SHELVED',
    born: 9,
    died: 11,
    cause: 'No business model',
    did: ['Dog-fooded it on my own products'],
    lesson: 'Useful to a few is not the same as wanted by many.',
  },
  {
    id: 'founderswall',
    name: 'FoundersWall',
    what: 'A wall where indie makers show what they build (it began as TheIndieWall).',
    hype: 'The launchpad for indie makers.',
    truth: 'Launch-day dopamine, then a ghost town. Directories always end this way.',
    status: 'dead',
    verdict: 'GHOST TOWN',
    born: 10,
    died: 14,
    cause: 'Ghost town after launch',
    did: ['Built a public directory + launchpad', 'Pivoted the asset toward AEO product reviews and comparisons'],
    lesson: 'Never build a directory you cannot fill every single day.',
  },
  {
    id: 'cvfolio',
    name: 'CVFolio.me',
    url: 'https://cvfolio.me',
    what: 'Turn your resume into a portfolio website.',
    hype: 'Your resume, but a website.',
    truth:
      'It worked. The business did not: once people land the job, they never touch their portfolio again. (Yes, I built a portfolio builder and still needed this page.)',
    status: 'dead',
    verdict: 'FLATLINED',
    born: 11,
    died: 14,
    cause: 'One-time use case',
    did: ['Resume-to-site generator with themes and an interactive timeline'],
    lesson: 'A great product with a one-time use case is a trap.',
  },
  {
    id: 'bringback',
    name: 'BringBack.pro',
    url: 'https://bringback.pro',
    what: 'AI restoration for old, damaged family photos.',
    hype: 'Restore old photos & faded memories.',
    truth:
      'The only one that pays: about $2.9K in a year. Nine months in, a competitor showed up. Google traffic dipped. And every customer restores grandma once, then cancels.',
    status: 'paying',
    verdict: 'PAYING',
    born: 12,
    died: null,
    did: [
      'Restoration, colorization, "add a person to a photo", family portraits, 5-second animation',
      'Automated QC that catches botched restorations and re-runs them before a customer ever sees one',
      'Read the Google slump in real data (thousands of impressions, zero clicks), fixed intent, titles and snippets. It recovered.',
      'Shipped an Android app, and refused to list features it did not actually have',
    ],
    lesson: 'Being earlier is not winning. More features is not winning.',
    facts: [
      { k: 'Revenue', v: '~$2.9K / ~12 months' },
      { k: 'Competitor arrived', v: '~9 months in' },
      { k: 'Worst query', v: '2,976 impressions · 0 clicks' },
    ],
    image: '/work/bringback.webp',
    featured: true,
  },
  {
    id: 'ctrlcut',
    name: 'CtrlCut',
    what: '3D icons, mascots and UI stickers.',
    hype: 'Icons and mascots, on demand.',
    truth:
      'I let it do too much. AI profile avatars were a crowded, support-heavy mess, so I cut them. What was left was too small.',
    status: 'dead',
    verdict: 'FLATLINED',
    born: 13,
    died: 16,
    cause: 'Tried to do too much',
    did: ['Cut the avatar feature ruthlessly', 'Narrowed to 3D icons, mascots and UI stickers'],
    lesson: 'Scope creep is just fear of committing to one thing.',
  },
  {
    id: 'doax',
    name: 'Doax',
    what: 'An agentic-chat idea.',
    hype: 'An agent for everything.',
    truth: 'A cool idea with no answer to "who pays?". Shelved.',
    status: 'shelved',
    verdict: 'SHELVED',
    born: 15,
    died: 16,
    cause: 'No clear money',
    did: ['Prototyped the core loop, then stopped'],
    lesson: 'If I cannot name who pays in one sentence, I stop.',
  },
  {
    id: 'flipaeo',
    name: 'FlipAEO',
    url: 'https://flipaeo.com',
    what: 'Get cited inside ChatGPT, Perplexity and Gemini answers.',
    hype: "Don't just rank. Be the source AI cites.",
    truth: 'It found some users and worked for a few months. Then it stopped being worth it.',
    status: 'dead',
    verdict: 'FLATLINED',
    born: 14,
    died: 20,
    cause: 'Never became what I wanted',
    did: [
      'Entity-dense content clusters + Schema.org markup so answer engines pick it up',
      'A research, clustering and content-generation pipeline',
    ],
    lesson: 'A clever idea is not a market.',
    facts: [
      { k: 'Lifespan', v: 'a few months' },
      { k: 'Users', v: 'some, for a while' },
    ],
    image: '/work/flipaeo.webp',
    featured: true,
  },
  {
    id: 'pinloop',
    name: 'PinLoop AI',
    what: 'Autopilot Pinterest pins for Shopify and Etsy sellers (a.k.a. EcomPin).',
    hype: 'Your catalog, on Pinterest, on autopilot.',
    truth: 'Fully designed. Never launched.',
    status: 'unlaunched',
    verdict: 'NEVER LAUNCHED',
    born: 16,
    died: 17,
    cause: 'Never shipped',
    did: ['Catalog-feed ingestion + a scheduled pinning pipeline', 'A full landing page nobody ever saw'],
    lesson: 'A landing page is not a launch.',
  },
  {
    id: 'askpando',
    name: 'AskPando',
    what: 'Homework help for parents that is actually mathematically correct.',
    hype: 'Explanations parents can trust.',
    truth: 'Gemini Flash paired with deterministic math engines, so it never gets arithmetic wrong. Never launched.',
    status: 'unlaunched',
    verdict: 'NEVER LAUNCHED',
    born: 17,
    died: 18,
    cause: 'Never shipped',
    did: ['An LLM for the explanation, deterministic math engines for the numbers'],
    lesson: 'Correct is a feature. It is not a distribution channel.',
  },
  {
    id: 'drawgle',
    name: 'Drawgle',
    url: 'https://drawgle.com',
    what: 'An AI product designer for mobile apps that keeps every screen consistent.',
    hype: 'Design mobile apps in minutes.',
    truth: 'Four months to build. Public, usable, and still improving. I have barely marketed it.',
    status: 'alive',
    verdict: 'BUILT. NOT SOLD.',
    born: 18,
    died: null,
    did: [
      'Prompt or screenshot in: editable canvas, design tokens, Tailwind code and agent-ready context packs out',
      '"Controlled AI": product charter, then navigation plan, then design direction, then screen briefs',
      'Fought generic AI-slop UI by preserving the reference: hierarchy, depth, spacing, layering',
    ],
    lesson: 'Comfortable solving problems for hours. Scared of asking a stranger to try it.',
    facts: [
      { k: 'Time to build', v: '~4 months' },
      { k: 'Status', v: 'still improving' },
      { k: 'Marketing', v: 'barely' },
    ],
    image: '/work/drawgle.webp',
    featured: true,
  },
  {
    id: 'theirs',
    name: 'Theirs.page',
    url: 'https://theirs.page',
    what: 'A quiet memorial page: photos, stories, voice notes and tributes for someone who has died.',
    hype: 'A place for everything they were.',
    truth:
      'Launched September 2026. One stranger found it through ChatGPT and finished the free flow. That is the entire user base, and it still felt like a win.',
    status: 'alive',
    verdict: '1 USER',
    born: 21,
    died: null,
    did: [
      'Designed it quiet, warm and human: no purple gradients, no "AI-powered memories"',
      'Cloudflare Workers + OpenNext, R2 storage, Resend email, Turnstile, on its own domain',
      'Studied ForeverMissed pricing before writing a line of code',
    ],
    lesson: 'Ask "will enough people pay?" before "can I build it?".',
    facts: [
      { k: 'Launched', v: 'Sep 2026' },
      { k: 'Users', v: '1 (via ChatGPT)' },
    ],
    image: '/work/theirs.webp',
    featured: true,
  },
];

/** Milestones on the lifelines. `approx` renders a "~" (dates from memory). */
export const MILESTONES: { m: number; label: string; sub: string; approx?: boolean }[] = [
  { m: 0, label: 'First line of code', sub: 'A blogger with no coding background, a day job and a family.' },
  { m: 4, label: 'First paying stranger', sub: 'UnrealShot. Someone actually paid.', approx: true },
  { m: 12, label: 'BringBack ships', sub: 'Restore. Colorize. Animate. The one that ended up paying.' },
  { m: 21, label: 'A competitor appears', sub: 'Nine months of work. The worst feeling of the whole journey.', approx: true },
  { m: 23, label: 'Stop starting things', sub: 'No new products. Grow what already exists.' },
];

/** A normal weekday, roughly. Hours are 24h; the scene runs 05:30 → 02:00. */
export const DAY: { from: number; to: number; time: string; title: string; body: string; mine?: boolean }[] = [
  { from: 5.5, to: 9, time: '06:00', title: 'A normal weekday.', body: 'Roughly. Some are worse.' },
  {
    from: 9,
    to: 17,
    time: '09:00 — 17:00',
    title: 'The 9-to-5.',
    body: "Someone else's roadmap. It pays for everything, including my mistakes.",
  },
  {
    from: 17,
    to: 21.25,
    time: '17:00 — 21:00',
    title: 'Dad.',
    body: 'Family time. Not negotiable, not for any product.',
  },
  {
    from: 21.25,
    to: 25.5,
    time: '21:30',
    title: 'Mine.',
    body: 'The house goes quiet and the laptop opens. Almost everything on this page was built in this window.',
    mine: true,
  },
  { from: 25.5, to: 26.01, time: '01:30', title: 'Ship. Sleep. Repeat.', body: 'nights since October 1, 2024.', mine: true },
];

export const ALLERGIES: string[] = [
  'Fake "$10K MRR in six weeks" screenshots',
  '"Just add more pages."',
  '"Just build an AI wrapper."',
  '"Just run ads."',
  'Thousands of impressions, zero clicks',
  'Launch-day dopamine, then silence',
  'Posting on X, Reddit and HN just to stay flat',
  'Feature lists that lie',
  'Purple gradients that say "AI-powered"',
  'Environment variables that vanish in production',
  'Buying a new domain instead of marketing the last one',
  'Me, polishing things no customer will ever notice',
];

export interface Vital {
  id: string;
  label: string;
  value: string;
  unit: string;
  title: string;
  body: string;
}

export const VITALS: Vital[] = [
  {
    id: 'revenue',
    label: 'BringBack · ~12 months',
    value: '$2,900',
    unit: 'revenue',
    title: 'Strangers paid for something I made.',
    body: 'Not life-changing. Completely real. Organic traffic, real cards, still selling today.',
  },
  {
    id: 'lifetime',
    label: 'Everything · 2 years',
    value: '$4,300',
    unit: 'lifetime',
    title: 'The whole number, not the best month.',
    body: 'Across every product I have shipped. I would rather show you this than a screenshot of a good day.',
  },
  {
    id: 'shipped',
    label: 'From zero code',
    value: '15',
    unit: 'products shipped',
    title: 'From blogger to building everything alone.',
    body: 'Design, frontend, backend, infra, payments, SEO, Android. All of it mine now.',
  },
];

export const STACK: string[] = [
  'Next.js',
  'TypeScript',
  'Tailwind',
  'Supabase',
  'Cloudflare',
  'R2',
  'Vercel',
  'QStash',
  'Trigger.dev',
  'Resend',
  'Seedream',
  'Gemini',
];

export const NOW = {
  headline: 'Right now, I am not starting anything new.',
  body: 'Two years ago my problem was that I did not know how to build. Now I do. The next part is putting BringBack, Drawgle and Theirs.page in front of the people who need them.',
};

/* ------------------------------------------------------------------ derived */

export const COUNTS = {
  products: PRODUCTS.length,
  paying: PRODUCTS.filter((p) => p.status === 'paying').length,
  alive: PRODUCTS.filter((p) => p.died === null).length,
  dead: PRODUCTS.filter((p) => p.died !== null).length,
  earned: 4300,
  bringback: 2900,
};

export const MONTHS_TOTAL = 24;

export function monthLabel(m: number): string {
  const names = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const idx = ((Math.round(m) % 12) + 12) % 12;
  const year = 2024 + Math.floor((Math.round(m) + 9) / 12);
  return `${names[idx]} ${year}`;
}

export function daysBuilding(now = Date.now()): number {
  const start = new Date(PERSON.startedISO + 'T00:00:00').getTime();
  return Math.max(0, Math.floor((now - start) / 86_400_000));
}
