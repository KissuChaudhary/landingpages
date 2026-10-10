# Bounce

A bright, playful landing page for an online course, written for a six-week music production cohort. A playable beat pad sits in the hero, the curriculum is laid out as a song arrangement that records itself as you scroll, and every section has its own motion: a pinned statement that pulls loose project files into one finished master, a draggable outcomes rail, odometer numbers, a pricing card that reshapes around the plan you pick, and a closing wordmark that bounces in.

Includes the home page, a printable syllabus page, privacy and terms placeholders, and a custom 404.

## Run

Node.js 20.9 or newer is required.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production, run `npm run build` and `npm start`. Bricolage Grotesque, Figtree and Geist Mono are downloaded at build time and served locally by Next.js.

## Make it yours

Nearly everything lives in `site.config.ts`: brand, cohort date and seats, links, every heading, the beat pad presets, weeks and lessons, the teacher, stories, plans and questions.

| What | Where |
| --- | --- |
| Brand, cohort, links, copy, weeks, plans, FAQ | `site.config.ts` |
| Privacy and terms placeholders | `data/legal.ts` |
| Logo mark and favicon | `components/ui/Brand.tsx`, `public/icon.svg` |
| Colours, type scale, buttons | `styles/base.css` |
| Section order | `app/page.tsx` |
| Photos and the platform screens | `public/images/`, see `ASSETS.md` |

Each section is its own component in `components/sections/`, with styles grouped by area in `styles/`. There is no Tailwind requirement and no animation library.

### Colours

Six colours run through the page: `pink`, `violet`, `blue`, `lime`, `cyan` and `amber`. Weeks, beat pad rows, stories and plans each take one by name. To change a colour everywhere, edit its value at the top of `styles/base.css`; each also has a soft tint and a deeper tone for text, defined right below.

### The cohort

`cohort.start` (an ISO date and time), `cohort.seats` and `cohort.taken` drive the "seats left" labels, the seats meter on cohort plans and the countdown in the closing panel. When the start date passes, the countdown hides itself; update the date for your next cohort.

### The beat pad

`pad.rows` names the four instruments and their colours. Each preset has a tempo and four patterns of 16 steps, written with `x` for a hit and `.` for a rest. The sound is synthesized in the browser with the Web Audio API, so there are no audio files: row one is a kick, two a snare, three hi-hats and four a chord stab that moves through Am7, Fmaj7, Cmaj7 and G6. Visitors can switch presets, change the tempo, tap pads to edit the beat and turn sound on. Sound is always off until someone asks for it.

The pad is self-contained in `components/sections/BeatPad.tsx`. To use the hero for a course on another subject, replace `<BeatPad />` in `components/sections/Hero.tsx` with an image or your own demo.

### Photos and screens

Replace the files in `public/images/` with your own at similar proportions, or point the config at new ones:

| Image | Used in | Shape |
| --- | --- | --- |
| `outcome-*.webp` | Outcomes rail | 3:4 portrait |
| `teacher.webp` | Teacher section and FAQ card | 3:4 portrait |
| `ama.webp`, `kenji.webp` and other avatars | Hero proof, stories | Square |
| `platform.webp` | Course platform section | 2720 × 1720 |
| `platform-phone.webp` | Course platform on phones | 780 × 992 |

Track and credit covers are drawn in CSS from two colours each, so there is nothing to upload for them.

## Links and plans

- `links.enroll`: where "Join" and "Enroll" go. Empty, they scroll to pricing.
- `links.signin`: shows "Log in" in the menu when set.
- `pricing.tiers[].checkout`: a checkout URL per plan. An empty checkout falls back to `links.enroll`, then to an email that names the plan.
- `pricing.tiers[].installments`: set `{ count, amount }` to offer a payment plan, or `null` for pay-once only. The card switches between the two.
- `pricing.defaultTier`: the plan selected when the page loads.
- `social`: footer links. Empty entries are hidden.

## Motion

- **Hero:** headline words rise in, the full stop drops in as a ball and bounces to rest, the beat pad slides up, and milestone chips pop in and drift with the pointer.
- **Beat pad:** the playhead runs while the pad is on screen. It stops off-screen unless sound is on, and the play button and reduced motion stop it.
- **Statement:** on scroll, its words light up and the scattered project files are pulled into one finished master.
- **Weeks:** on wide screens the section pins and scrolling moves the playhead across the weeks, recording each week's clip. On phones and with reduced motion, the week buttons choose what's shown.
- **Elsewhere:** the outcomes rail can be dragged, scrolled or stepped with the arrows. Stats, prices and the countdown roll like an odometer. Buttons roll their letters on hover.

Everything respects the system "reduce motion" setting: content appears in place, nothing pins and nothing loops. The track strip and the beat pad are the only things that move on their own. Both respect system reduced motion.

## Accessibility

Every call to action is a real link. There's a skip link and visible focus styles, and decorative layers are hidden from assistive technology.
- **Beat pad:** a radio group of presets, labelled tempo buttons, and pads that are toggle buttons with arrow-key navigation.
- **Weeks and plans:** week tabs and a plan radio group, both with arrow-key support.
- **FAQ and menu:** the FAQ uses expandable regions, and the phone menu closes on Escape.

## Check your edits

```sh
npm run typecheck
npm run verify:content
npm run build
```

`verify:content` checks the cohort numbers, plans and payment plans, beat pad patterns, colours, section anchors and that every referenced image exists.

## Deploy

Any Node host works with `npm run build` and `npm start`. For a static host, build with `BOUNCE_EXPORT=1 npm run build` (this turns on `output: "export"` in `next.config.ts`) and upload the `out/` folder. If a static export lives under a sub-path, also set `NEXT_PUBLIC_BASE_PATH` at build time; links and images follow it.

The course, teacher, students, numbers and quotes are fictional placeholders. Replace them before launch. Image provenance is in `ASSETS.md`; usage terms are in `LICENSE.md`.
