import { goodfolkDetails } from './template-catalog/goodfolk';
import { shearDetails } from './template-catalog/shear';
import { daymarkDetails } from './template-catalog/daymark';
import { arcloDetails } from './template-catalog/arclo';
import { rivetDetails } from './template-catalog/rivet';
import { asterDetails } from './template-catalog/aster';
import { sereinDetails } from './template-catalog/serein';
import { velaDetails } from './template-catalog/vela';
import { sylvaDetails } from './template-catalog/sylva';
import { notchDetails } from './template-catalog/notch';
import { oddlineDetails } from './template-catalog/oddline';
import { bounceDetails } from './template-catalog/bounce';

/**
 * Long-form content for each template's detail page. Everything here is taken from the template's own
 * README, package.json and source, so keep it in step when a template changes.
 * Text in `backticks` renders as inline code.
 */

export interface TemplateSection {
  name: string;
  detail: string;
}

export interface TemplateDetails {
  name: string;
  /** What it is, used in the H1, the page title and the meta description. */
  kind: string;
  /** One or two sentences: the pitch under the heading. */
  summary: string;
  bestFor: string[];
  /** The visual system, in the words of the template's README. */
  design: string;
  sections: TemplateSection[];
  customize: { what: string; where: string }[];
  customizeIntro?: string;
  fonts: string[];
  dependencies: string[];
  styling?: 'CSS' | 'Tailwind CSS v4';
  images: string;
  node: string;
  files: number;
  lines: number;
  /** What a buyer has to connect or replace before going live. */
  beforeLaunch: string;
  updated: string;
}

const NEXT_DEPS = ['next', 'react', 'react-dom', 'lucide-react', 'clsx', 'tailwind-merge'];
const PLACEHOLDERS =
  'The brand, customers, numbers and quotes in the demo are placeholders. Replace them in `site.config.ts`, and point the buttons at your own sign-up or booking link.';

export const TEMPLATE_DETAILS: Record<string, TemplateDetails> = {
  bounce: bounceDetails,
  oddline: oddlineDetails,
  goodfolk: goodfolkDetails,
  daymark: daymarkDetails,
  shear: shearDetails,
  notch: notchDetails,
  serein: sereinDetails,
  rivet: rivetDetails,
  vela: velaDetails,
  sylva: sylvaDetails,
  aster: asterDetails,
  arclo: arcloDetails,
  daybreak: {
    name: 'Daybreak',
    kind: 'AI marketing and analytics workspace landing page template',
    summary: 'A complete launch experience with a landscape-led hero, quiet Inter typography, pill controls and aligned dashed frames. Original artwork and expanding portrait stories add warmth; working local campaign reviews, a week of mornings and a clear access panel make the product story tangible.',
    bestFor: ['AI marketing and campaign platforms', 'Analytics and reporting products', 'Connected team workspaces and agency tools'],
    design: 'White, charcoal and quiet blue with ochre, sage and coral in original painted landscapes. A centered two-line hero leads into split product tabs, a wide dashboard over a painted valley, a week of mornings on a sun-path arc, an integration garden, three audience chapters, expanding portrait perspectives, a calm-by-design access panel and three aligned plans. Shared frame rules meet at actual square intersections.',
    sections: [
      { name: 'Navigation and hero', detail: 'Compact sticky navigation, accessible resource/mobile menus, original coastal landscape and an editable question opening a source-linked campaign report.' },
      { name: 'Product and workspace', detail: 'Four keyboard-accessible views, source context, campaign filtering, a four-step report workflow and a dashboard preview with a dedicated phone layout.' },
      { name: 'A week of mornings', detail: 'A sun crosses a dashed arc to the day you choose; each day opens a small working interface: a weekly brief, an approvable budget nudge, a creative test, an early warning and a scheduled report.' },
      { name: 'Integrations and audience chapters', detail: 'Clickable connection garden, searchable directory with category filters and scope guides, plus three audience rows with scroll-aware navigation.' },
      { name: 'Portrait perspectives', detail: 'Four expanding, keyboard-accessible fictional team stories with original editorial portraits.' },
      { name: 'Calm by design', detail: 'An access panel with read-only connections, per-source suggestion switches, an approval rule and an activity log, beside three plain principles.' },
      { name: 'Pricing and closing', detail: 'Three plans, monthly/annual selection, plan buttons that go to checkout or contact and a landscape-led closing section.' },
      { name: 'Contact and resources', detail: 'Validated local contact brief or configured JSON submission, journal and three articles, about, privacy, terms, accessibility and a custom missing-page state.' },
    ],
    customizeIntro: 'Start in `site.config.ts` for the brand, copy, plans and destinations. Campaign data, team perspectives, integrations and resource content each have their own focused file.',
    customize: [
      { what: 'Brand, metadata, copy, plans, FAQ and destinations', where: 'site.config.ts' },
      { what: 'Campaign values, calculations and recommendations', where: 'data/campaigns.ts' },
      { what: 'Example teams and portrait stories', where: 'data/teams.ts' },
      { what: 'Connection directory and scope guides', where: 'data/integrations.ts' },
      { what: 'Articles and supporting pages', where: 'data/pages.ts' },
      { what: 'Palette, type, gutters and controls', where: 'styles/base.css' },
      { what: 'Original images and full prompt set', where: 'public/images/ and ASSETS.md' },
    ],
    fonts: ['Inter'],
    dependencies: ['next', 'react', 'react-dom', 'lucide-react'],
    styling: 'CSS',
    images: 'Two original painted landscapes and four original fictional portraits generated with the built-in imagegen tool. Optimized WebP assets ship locally. The dashboard preview ships as two images rendered from the template’s interface. Brand marks, diagrams and interfaces are editable SVG, CSS and React.',
    node: '20.9',
    files: 58,
    lines: 7256,
    beforeLaunch: 'Replace the fictional brand, teams, quotes and sample campaigns. Configure your app URL, monthly/annual checkout destinations and contact endpoint. Replace privacy and terms with your own policies. Local reports, filtered CSV exports, workflow states and contact briefs work; connect your production AI, accounts, attribution and integration providers separately.',
    updated: '2026-10-09',
  },
  conduit: {
    name: 'Conduit',
    kind: 'AI agent and workflow platform landing page template',
    summary: 'A complete platform launch experience with a centered serif hero, original cobalt imagery and alternating white and black chapters. Real local demonstrations make the product story tangible, while separate pricing, contact and resource pages complete the template.',
    bestFor: ['AI agent and automation platforms', 'Workflow orchestration products', 'Developer tools and connected workspaces'],
    design: 'Light Merriweather headings and Inter text. Square controls, dashed frame rules, subtle square intersection marks and original cobalt glass and point-cloud artwork. A two-part hero visual leads into a dark problem chapter, alternating product rows, a flow graphic, a dark capability grid and a tabbed story panel. One consistent label introduces each main heading.',
    sections: [
      { name: 'Navigation and hero', detail: 'Announcement strip, compact square navigation, accessible company/mobile menus, a centered serif heading and four selectable agent blueprints over original glass artwork.' },
      { name: 'Problem and product', detail: 'A dark three-column problem chapter, an editable agent builder, a working four-step workflow with a JSON receipt and switchable analytics.' },
      { name: 'Impact and capabilities', detail: 'A glass flow graphic, isometric context layers, connected logic nodes, task rails, model selection and functional tool controls.' },
      { name: 'Industries and stories', detail: 'Six sectors linked to example blueprints and four keyboard-accessible workflow stories that open their details in place.' },
      { name: 'Control and FAQ', detail: 'Original access, context and oversight seals followed by native FAQ disclosures.' },
      { name: 'Closing and footer', detail: 'A two-column black closing section, working resource links, remembered motion preference and a large pixel wordmark.' },
      { name: 'Pricing and contact', detail: 'Three plans on a dedicated page, correct monthly/annual pricing with plan buttons that go to checkout or contact, and a contact form that can prepare a local brief or submit to your configured endpoint.' },
      { name: 'Resource pages', detail: 'About, guides, changelog, accessibility and editable privacy/terms placeholder pages, plus a custom missing-page state.' },
    ],
    customizeIntro: 'Start in `site.config.ts` for the brand, marketing copy, plans and destinations. Agent examples, workflow stories and resource content each have their own small data file.',
    customize: [
      { what: 'Brand, copy, plans, FAQ and destinations', where: 'site.config.ts' },
      { what: 'Agent instructions, tools, approval boundaries and run receipt', where: 'data/blueprints.ts' },
      { what: 'Workflow stories and supporting pages', where: 'data/stories.ts and data/pages.ts' },
      { what: 'Palette, gutters, type and controls', where: 'styles/base.css' },
      { what: 'Original image assets and provenance', where: 'public/images/ and ASSETS.md' },
      { what: 'Section composition and product scenes', where: 'components/sections/ and components/product/' },
      { what: 'Pricing and contact integration', where: 'components/PricingContent.tsx and components/ContactContent.tsx' },
    ],
    fonts: ['Merriweather', 'Inter'],
    dependencies: ['next', 'react', 'react-dom', 'lucide-react'],
    styling: 'CSS',
    images: 'Three original images generated with the built-in imagegen tool, optimized to WebP and shipped locally. Original HTML/CSS/SVG logos, diagrams, seals and pixel wordmark. No reference-site assets.',
    node: '20.9',
    files: 46,
    lines: 6260,
    beforeLaunch: 'Replace the fictional brand, identities, example metrics and plan allowances. Set your app, contact endpoint and each plan’s monthly/annual checkout destination. Replace privacy and terms with your own policies. The blueprints, run receipts, story details and local contact exports work; connect your production AI, accounts, tools and billing separately.',
    updated: '2026-10-09',
  },
  index: {
    name: 'Index',
    kind: 'AI research and knowledge workspace landing page template',
    summary: 'A warm editorial launch page for research, knowledge and AI products. A wide source-to-synthesis scene, purposeful heading motion and a scroll-led product story turn a collection of ideas into a clear product narrative.',
    bestFor: ['AI research and search products', 'Knowledge workspaces and browser extensions', 'Writing, reading and personal productivity tools'],
    design: 'Warm paper, ink, stone and persimmon. Instrument Sans carries a consistent display and reading hierarchy. Segmented heading accents, briefly decoded labels and sparse animated fields express sources becoming understanding. Open prose alternates with functional product screens and a dark evidence chapter. One badge per section, a 64px navigation row and three aligned plans complete the page.',
    sections: [
      { name: 'Navigation', detail: 'Compact open navigation, useful anchors, a main example action and an Escape-aware mobile menu.' },
      { name: 'Hero', detail: 'A wide headline and research scene with three selectable topics, measured connection paths, original source objects and cited findings.' },
      { name: 'Introduction', detail: 'An open editorial statement with an assembled accent and a concise source trail.' },
      { name: 'Product story', detail: 'Collect, Connect and Understand share a large sticky stage. Desktop scrolling and manual controls advance it; phones show the three chapters in normal reading order.' },
      { name: 'Evidence', detail: 'A dark source-to-answer chapter with a working reference back to the corresponding passage.' },
      { name: 'Examples', detail: 'Open collection rows with keyboard selection, coordinated cited previews, clipboard fallback and complete plain-text exports.' },
      { name: 'Pricing', detail: 'Three aligned plans with an emphasized Curious tier, monthly/yearly billing, per-person pricing and plan buttons that go to checkout or your email.' },
      { name: 'FAQ', detail: 'Native disclosures explaining the examples, exports and buyer integrations.' },
      { name: 'Closing and footer', detail: 'A persimmon closing field with original sheet artwork, working destinations and a remembered motion control.' },
    ],
    customizeIntro: 'Start with `site.config.ts` for the brand, copy, plans and links. The complete fictional sources and their cited findings live in one separate data file.',
    customize: [
      { what: 'Brand, metadata, copy, FAQ, plans and destinations', where: 'site.config.ts' },
      { what: 'Source passages, topics, connections and cited findings', where: 'data/topics.ts' },
      { what: 'Palette, gutters, shared type and control sizes', where: 'styles/base.css' },
      { what: 'Fonts and page metadata', where: 'app/layout.tsx' },
      { what: 'Section order', where: 'app/page.tsx' },
      { what: 'Accent, decode, visibility and ambient motion', where: 'components/motion/ and styles/motion.css' },
      { what: 'Research scenes, source previews and exports', where: 'components/product/' },
    ],
    fonts: ['Instrument Sans', 'Geist Mono'],
    dependencies: ['next', 'react', 'react-dom', 'lucide-react'],
    styling: 'CSS',
    images: 'Original HTML/CSS/SVG mark, source objects, sheets, connection diagrams and ambient fields. Original fictional research passages. No stock images or reference-site assets.',
    node: '20.9',
    files: 42,
    lines: 4200,
    beforeLaunch: 'Set `links.app`, `links.docs`, `links.email` and each plan’s monthly/yearly destination. Replace the fictional brand, prices, feature allowances and sample research. The in-card source passages, selections and brief exports work locally; connect your own AI, document processing, accounts and checkout separately.',
    updated: '2026-10-09',
  },
  footnote: {
    name: 'Footnote',
    kind: 'AI writing tool landing page template',
    summary:
      'A dark, editorial landing page for AI writing and research products, built around the footnote: every section is a piece of evidence, from a before-and-after draft with numbered citations to a proof ledger.',
    bestFor: ['AI writing tools', 'Content platforms', 'Research products'],
    design:
      'Dark graphite, warm-white text and one blue accent. Headlines are set in a light serif with an italic accent phrase, the page sits inside two thin vertical rules, and small + marks appear only where lines really meet. There are no shadows: depth comes from hairlines and spacing.',
    sections: [
      { name: 'Hero', detail: 'Serif headline with an italic accent phrase over an animated dot field, with a row of customer names.' },
      { name: 'The difference', detail: 'The same paragraph written twice: uncited claims underlined on one side, numbered footnotes on the other.' },
      { name: 'Method', detail: 'An annotated draft. Each row is one sentence with a margin note explaining the move.' },
      { name: 'Engine', detail: 'Three alternating sections with a source matrix, a sources list and a voice panel.' },
      { name: 'Proof', detail: 'Three figures and a customer quote.' },
      { name: 'FAQ', detail: 'Every answer written out as plain text, so there is nothing to click.' },
      { name: 'Closing sign-up', detail: 'Email capture with a confirmation state.' },
      { name: 'Footer', detail: 'Links, legal and the wordmark.' },
    ],
    customize: [
      { what: 'All copy, links, numbers, FAQ', where: 'site.config.ts' },
      { what: 'Colours', where: 'app/globals.css (@theme)' },
      { what: 'Fonts', where: 'app/layout.tsx' },
      { what: 'Which sections appear, and in what order', where: 'app/page.tsx' },
      { what: 'The grid lines and + marks', where: 'components/ui/Grid.tsx' },
      { what: 'The three engine visuals', where: 'components/sections/Engine.tsx' },
    ],
    fonts: ['Newsreader', 'Instrument Sans', 'IBM Plex Mono'],
    dependencies: NEXT_DEPS,
    images: 'None. Every visual is built in code.',
    node: '18.18',
    files: 19,
    lines: 1332,
    beforeLaunch:
      'The sign-up form in `components/sections/FinalCta.tsx` only shows a confirmation message, so connect its `onSubmit` to your own sign-up endpoint or email provider. The logos in the hero are text placeholders: swap them for your customers’ marks.',
    updated: '2026-10-07',
  },

  cutroom: {
    name: 'Cutroom',
    kind: 'Video editing studio landing page template',
    summary:
      'A landing page for video editing studios and creator agencies, dressed like the cutting room: a timeline hero with a playhead, a retention chart, an edit decision list for the process and a pricing calculator.',
    bestFor: ['Video editing studios', 'YouTube editors', 'Creator agencies'],
    design:
      'Clean white, near-black ink and one signal orange. The look borrows from the cutting room: timecodes, a ruler, a timeline, and key words that sit inside an orange “clip” with trim handles. There are no shadows: depth comes from borders, tints and contrast.',
    sections: [
      { name: 'Hero', detail: 'Headline with a clipped keyword above an editor with a timeline and playhead.' },
      { name: 'Client channels', detail: 'The channels you edit for.' },
      { name: 'Services', detail: 'A selector with a drawing for each video format.' },
      { name: 'Results', detail: 'A retention chart with numbered markers.' },
      { name: 'Process', detail: 'Your workflow written as an edit decision list.' },
      { name: 'Pricing', detail: 'A calculator with volume discounts.' },
      { name: 'Testimonials', detail: 'Quotes set as pinned comments.' },
      { name: 'FAQ', detail: 'Common questions, answered in place.' },
      { name: 'Journal', detail: 'Recent articles from your blog.' },
      { name: 'Closing block', detail: 'A call to action with a footage drop zone.' },
      { name: 'Footer', detail: 'Links, legal and the wordmark.' },
    ],
    customize: [
      { what: 'All copy, links, prices, chart data, FAQ', where: 'site.config.ts' },
      { what: 'Colours', where: 'app/globals.css (@theme)' },
      { what: 'Fonts', where: 'app/layout.tsx' },
      { what: 'Which sections appear, and in what order', where: 'app/page.tsx' },
      { what: 'The editor drawing in the hero', where: 'components/sections/HeroEditor.tsx' },
      { what: 'The service drawings', where: 'components/sections/ServiceVisuals.tsx' },
    ],
    fonts: ['Bricolage Grotesque', 'Hanken Grotesk', 'JetBrains Mono'],
    dependencies: NEXT_DEPS,
    images: 'None. Every visual is built in code.',
    node: '18.18',
    files: 23,
    lines: 2013,
    beforeLaunch: PLACEHOLDERS,
    updated: '2026-10-07',
  },

  emberline: {
    name: 'Emberline',
    kind: 'AI SaaS landing page template',
    summary:
      'A dark, grid-framed landing page for AI and SaaS products: energy lines running through the hero into a dashboard mockup, bento features, a comparison table and a monthly and yearly pricing toggle.',
    bestFor: ['AI products', 'SaaS startups', 'Analytics tools'],
    design:
      'Near-black surfaces, a warm orange glow and a visible grid whose intersections light up. Headlines are set in Inter Tight with an Instrument Serif italic accent, and the whole palette comes from one colour ramp.',
    sections: [
      { name: 'Hero', detail: 'Grid-framed headline with animated energy lines feeding a product dashboard mockup.' },
      { name: 'Logo strip', detail: 'Customer wordmarks.' },
      { name: 'Features', detail: 'A bento grid with inline illustrations.' },
      { name: 'Comparison', detail: 'A table of your product against the alternatives.' },
      { name: 'How it works', detail: 'The steps from sign-up to result.' },
      { name: 'Testimonials', detail: 'Customer quotes.' },
      { name: 'Pricing', detail: 'Plans with a monthly and yearly toggle.' },
      { name: 'FAQ', detail: 'Common questions, answered in place.' },
      { name: 'Final call to action', detail: 'One last push to sign up.' },
      { name: 'Footer', detail: 'Links, legal and the wordmark.' },
    ],
    customize: [
      { what: 'All copy, links, prices, plans, FAQ', where: 'site.config.ts' },
      { what: 'Accent colour and surfaces', where: 'app/globals.css (@theme)' },
      { what: 'Fonts', where: 'app/layout.tsx' },
      { what: 'Feature card illustrations', where: 'components/sections/Features.tsx' },
      { what: 'Hero product mockup', where: 'components/hero/DashboardMockup.tsx' },
      { what: 'Add, remove or reorder sections', where: 'app/page.tsx' },
    ],
    fonts: ['Inter Tight', 'Instrument Serif'],
    dependencies: NEXT_DEPS,
    images: 'None. Every visual is built in code.',
    node: '18.18',
    files: 25,
    lines: 2124,
    beforeLaunch: PLACEHOLDERS,
    updated: '2026-10-07',
  },

  fourteen: {
    name: 'Fourteen',
    kind: 'Done-for-you service landing page template',
    summary:
      'A warm, complete landing page for done-for-you services and productised B2B offers: a strip of sample emails, drawn feature illustrations, handwritten notes, one-plan pricing and a founder’s note.',
    bestFor: ['Outbound agencies', 'Productised services', 'B2B consultants'],
    design:
      'Warm paper with a fine grain, stone neutrals and one orange. Headlines are set in Playfair Display with the second half in italic, handwritten notes point at the buttons, the page sits between two hatched rails, and the cards that matter wear a two-tone ring.',
    sections: [
      { name: 'Hero', detail: 'Headline, a short testimonial and a slow-moving strip of sample emails.' },
      { name: 'Problem', detail: 'What your buyer is stuck with today.' },
      { name: 'Solution', detail: 'Six cards in an alternating wide and narrow layout.' },
      { name: 'How it works', detail: 'Three steps on a cream panel.' },
      { name: 'Features', detail: 'Eight cards, each with a small drawing.' },
      { name: 'Case studies', detail: 'Results from clients.' },
      { name: 'Pricing', detail: 'One plan, stated plainly.' },
      { name: 'FAQ', detail: 'Native disclosures for each question.' },
      { name: 'Founder’s note', detail: 'A personal note with a signature.' },
      { name: 'Closing', detail: 'A call to action surrounded by handwritten notes.' },
    ],
    customize: [
      { what: 'All copy, links, price, FAQ', where: 'site.config.ts' },
      { what: 'Colours', where: 'app/globals.css (@theme)' },
      { what: 'Fonts', where: 'app/layout.tsx' },
      { what: 'Which sections appear, and in what order', where: 'app/page.tsx' },
      { what: 'Page frame, buttons, rings and handwritten notes', where: 'components/ui/Kit.tsx' },
      { what: 'The small drawings inside the cards', where: 'components/visuals/Visuals.tsx' },
    ],
    fonts: ['Playfair Display', 'Inter', 'Caveat'],
    dependencies: NEXT_DEPS,
    images: 'None. Every visual is built in code.',
    node: '18.18',
    files: 20,
    lines: 1939,
    beforeLaunch:
      'The buttons point at the closing section: replace them with your booking or sign-up link in `site.config.ts`. The clients, numbers, quotes and the guarantee are placeholders, so swap them for real ones and only promise what you can deliver.',
    updated: '2026-10-07',
  },

  halftone: {
    name: 'Halftone',
    kind: 'Developer tool and API landing page template',
    summary:
      'A clean, light landing page for developer tools and API products. Every product visual is built in code and animated: a live delivery log, a pipeline, six product panels, a code window with language tabs and a CLI terminal.',
    bestFor: ['APIs and webhooks', 'Developer infrastructure', 'Email, auth and payments APIs'],
    design:
      'White surfaces, one cobalt accent and soft dithered colour fields. Text is set in Instrument Sans, code and data in Geist Mono, and every panel stays sharp at any size because none of it is a screenshot.',
    sections: [
      { name: 'Hero', detail: 'Headline, an install command with a copy button, and a live delivery log in which one request fails and recovers on retry.' },
      { name: 'Logo strip', detail: 'Six placeholder wordmarks.' },
      { name: 'Build vs. buy', detail: 'The same rows on both sides: weeks of work against “Included”.' },
      { name: 'How it works', detail: 'Your app, your product and three customer endpoints, with packets travelling along the lines.' },
      { name: 'Product', detail: 'A bento grid of six animated panels: retries, signing, replay, latency, regions and a customer portal.' },
      { name: 'Developers', detail: 'Three steps beside a code window. Each step highlights its lines, and language tabs switch the sample.' },
      { name: 'Numbers', detail: 'Four figures that count up.' },
      { name: 'Customers', detail: 'One long story with its result, and two short quotes.' },
      { name: 'Pricing', detail: 'Usage-based. A log-scale slider prices every plan at the chosen volume and marks the cheapest.' },
      { name: 'FAQ', detail: 'Heading and contact card beside an accordion.' },
      { name: 'Closing card', detail: 'A call to action beside a terminal that forwards events to localhost.' },
    ],
    customize: [
      { what: 'Copy, links, plans, FAQ, sample events and code', where: 'site.config.ts' },
      { what: 'Accent colour, surfaces and code colours', where: 'app/globals.css (@theme)' },
      { what: 'Dither colours (hero, closing card)', where: 'site.config.ts → dither' },
      { what: 'Fonts', where: 'app/layout.tsx' },
      { what: 'Logo', where: 'components/ui/BrandMark.tsx' },
      { what: 'Section order', where: 'app/page.tsx' },
    ],
    fonts: ['Instrument Sans', 'Geist Mono'],
    dependencies: [...NEXT_DEPS.slice(0, 4), 'motion', 'clsx', 'tailwind-merge'],
    images: 'None. Every visual is built in code.',
    node: '18.18',
    files: 34,
    lines: 3780,
    beforeLaunch:
      'The product is a made-up webhook service called Ferry. Keep the structure and change the nouns: for an email API the log becomes sent and bounced messages, for auth it shows sign-ins. Each panel is one small component in `components/visuals/`, so you can also swap any of them for a screenshot.',
    updated: '2026-10-07',
  },

  influence: {
    name: 'Influence',
    kind: 'Short-form video agency landing page template',
    summary:
      'A high-energy landing page for short-form video studios: platform badges in the headline, a phone with floating metrics, a filterable wall of drawn video thumbnails and comparison pricing with a billing switch. No photos to license.',
    bestFor: ['Short-form video studios', 'Creator agencies', 'Social media managers'],
    design:
      'Soft off-white, near-black ink and one orange. Headlines are heavy Inter Tight with one italic serif phrase. The look comes from the platforms themselves: round pills, social badges in the headline, a phone with floating metrics and vertical thumbnails with live-caption highlights.',
    sections: [
      { name: 'Hero', detail: 'Headline with platform badges, a phone with floating metrics, and social proof.' },
      { name: 'Numbers strip', detail: 'A slow strip of headline numbers.' },
      { name: 'Results', detail: 'One case study with a chart, and three smaller ones.' },
      { name: 'Work', detail: 'A wall of drawn video thumbnails with a working filter.' },
      { name: 'Process', detail: 'A dark timeline from footage to posting.' },
      { name: 'Creators', detail: 'One video testimonial and six short quotes.' },
      { name: 'Pricing', detail: 'A comparison table with a billing switch.' },
      { name: 'FAQ', detail: 'Common questions, answered in place.' },
      { name: 'Closing block', detail: 'A final call to book a call.' },
    ],
    customize: [
      { what: 'All copy, links, prices, numbers, FAQ', where: 'site.config.ts' },
      { what: 'Colours', where: 'app/globals.css (@theme)' },
      { what: 'Fonts', where: 'app/layout.tsx' },
      { what: 'Which sections appear, and in what order', where: 'app/page.tsx' },
      { what: 'The drawn video thumbnails', where: 'components/ui/Reel.tsx' },
      { what: 'The platform badges', where: 'components/ui/Icons.tsx' },
    ],
    fonts: ['Inter Tight', 'Inter', 'Playfair Display'],
    dependencies: NEXT_DEPS,
    images: 'None. The video thumbnails are drawn from a colour pair, a shape and a hook.',
    node: '18.18',
    files: 23,
    lines: 1733,
    beforeLaunch:
      'The “Book a call” links point at the closing section: replace them with your calendar link in `site.config.ts`. The creators, handles, numbers and quotes are placeholders, so only publish results you can back up.',
    updated: '2026-10-07',
  },

  kept: {
    name: 'Kept',
    kind: 'Invoicing and fintech landing page template',
    summary:
      'A calm, statement-style landing page for invoicing and tax tools: a hero built as an invoice that was just paid, a twelve-month chart drawn from your own numbers, a dotted-leader feature ledger and a receipt for a price.',
    bestFor: ['Invoicing tools', 'Accounting apps', 'Freelancer finance'],
    design:
      'Warm paper, a deep pine ink and one fresh lime. Headlines are set in a condensed serif with an italic green accent, and every amount uses tabular figures so columns line up. There are no shadows and no gradients: depth comes from hairlines and a slightly lighter sheet colour.',
    sections: [
      { name: 'Hero', detail: 'An invoice that was just paid, split into tax, buffer and spend, with three headline figures.' },
      { name: 'The year', detail: 'A twelve-month chart with tax dates, calculated from your figures.' },
      { name: 'What it does', detail: 'A ledger of six features along dotted leaders.' },
      { name: 'Quotes', detail: 'Customer quotes set as a table.' },
      { name: 'Pricing', detail: 'One plan, laid out as a receipt.' },
      { name: 'FAQ', detail: 'Common questions, answered in place.' },
      { name: 'Closing sign-up', detail: 'A sign-up block on the pine band, with the footer.' },
    ],
    customize: [
      { what: 'All copy, links, prices, figures, FAQ', where: 'site.config.ts' },
      { what: 'Colours', where: 'app/globals.css (@theme)' },
      { what: 'Fonts', where: 'app/layout.tsx' },
      { what: 'Currency and number format', where: 'lib/money.ts' },
      { what: 'Which sections appear, and in what order', where: 'app/page.tsx' },
    ],
    fonts: ['Instrument Serif', 'Geist', 'Geist Mono'],
    dependencies: NEXT_DEPS,
    images: 'None. Every visual is built in code.',
    node: '18.18',
    files: 18,
    lines: 1214,
    beforeLaunch:
      'The form in `components/sections/FinalCta.tsx` only shows a confirmation message, so connect its `onSubmit` to your own sign-up flow. Replace the demo customers, figures and tax details with your own, and have a professional check any tax claims you make.',
    updated: '2026-10-07',
  },

  marlow: {
    name: 'Marlow',
    kind: 'Studio and consultancy landing page template',
    summary:
      'A warm, editorial landing page for studios, consultancies and agencies: serif display type, a highlighted manifesto, a services index, result tiles, a six-week Gantt process and a rate card.',
    bestFor: ['Consultancies', 'Strategy and design studios', 'Agencies'],
    design:
      'Warm paper, a Fraunces display face, one clay accent and five pastel tints. Ten sections, and every word of them lives in one file.',
    sections: [
      { name: 'Hero', detail: 'Headline beside two product-style panels.' },
      { name: 'Client names', detail: 'The teams you have worked with.' },
      { name: 'Approach', detail: 'Your manifesto, with highlighter marks.' },
      { name: 'Services', detail: 'An index of what you offer.' },
      { name: 'Selected work', detail: 'Result tiles for past engagements.' },
      { name: 'Process', detail: 'A six-week Gantt chart.' },
      { name: 'Testimonials', detail: 'Client quotes.' },
      { name: 'Pricing', detail: 'A rate card.' },
      { name: 'FAQ', detail: 'Common questions, answered in place.' },
      { name: 'Closing', detail: 'A call to action with your next open call slots.' },
      { name: 'Footer', detail: 'Links, legal and the wordmark.' },
    ],
    customize: [
      { what: 'All copy, links, prices, FAQ', where: 'site.config.ts' },
      { what: 'Colours (paper, ink, clay, five tints)', where: 'app/globals.css (@theme)' },
      { what: 'Fonts', where: 'app/layout.tsx' },
      { what: 'Which sections appear, and in what order', where: 'app/page.tsx' },
      { what: 'The two hero panels', where: 'components/sections/HeroPanels.tsx' },
    ],
    fonts: ['Fraunces', 'Geist', 'Geist Mono'],
    dependencies: NEXT_DEPS,
    images: 'None. Every visual is built in code.',
    node: '18.18',
    files: 22,
    lines: 1721,
    beforeLaunch: PLACEHOLDERS,
    updated: '2026-10-07',
  },

  parley: {
    name: 'Parley',
    kind: 'AI support agent landing page template',
    summary:
      'A warm, conversational landing page for AI support agents and chatbots: the hero is a chat, the comparison is a transcript you can switch, and even the FAQ is written as a conversation.',
    bestFor: ['AI support agents', 'Chatbots', 'Customer service tools'],
    design:
      'Warm paper, a plum-brown ink and one rose accent. Headlines are set in a soft, round serif with an italic accent phrase. There are no shadows: depth comes from soft tints and spacing.',
    sections: [
      { name: 'Hero', detail: 'A live-looking support chat that ends with a refund issued.' },
      { name: 'Comparison', detail: 'A classic chatbot and your product, as a transcript you can switch.' },
      { name: 'Action log', detail: 'A timeline of what the agent actually did.' },
      { name: 'Results band', detail: 'Headline numbers on a plum band.' },
      { name: 'Quotes', detail: 'Customer quotes.' },
      { name: 'Pricing', detail: 'Plans set out as rows.' },
      { name: 'FAQ', detail: 'Written as a conversation.' },
      { name: 'Closing sign-up', detail: 'Email capture with a confirmation state.' },
    ],
    customize: [
      { what: 'All copy, links, prices, numbers, FAQ', where: 'site.config.ts' },
      { what: 'Colours', where: 'app/globals.css (@theme)' },
      { what: 'Fonts', where: 'app/layout.tsx' },
      { what: 'Which sections appear, and in what order', where: 'app/page.tsx' },
      { what: 'The chat bubbles and the logo mark', where: 'components/ui/Chat.tsx' },
    ],
    fonts: ['Fraunces', 'Figtree', 'Caveat'],
    dependencies: NEXT_DEPS,
    images: 'None. Every visual is built in code.',
    node: '18.18',
    files: 19,
    lines: 1254,
    beforeLaunch:
      'The form in `components/sections/FinalCta.tsx` only shows a confirmation message, so connect its `onSubmit` to your own sign-up flow. The customer names in the hero are text placeholders: swap them for your customers’ marks.',
    updated: '2026-10-07',
  },

  stillform: {
    name: 'Stillform',
    kind: 'Product photography studio landing page template',
    summary:
      'An editorial landing page for product photographers and CGI studios, with original campaign imagery, a filterable portfolio whose studies open in place, and a shoot planner that turns an estimate into a shareable project brief.',
    bestFor: ['Product photographers', 'CGI studios', 'E-commerce creative studios'],
    design:
      'A soft stone background, Instrument Serif headlines and one warm orange, with four original product studies (a fragrance, a skincare set and a pair of headphones) as the imagery.',
    sections: [
      { name: 'Hero', detail: 'Campaign headline, a featured study and industry specialties.' },
      { name: 'Selected work', detail: 'A filterable portfolio; each study opens in place above the grid.' },
      { name: 'Studio', detail: 'Manifesto and working principles.' },
      { name: 'Perspectives', detail: 'A campaign, packshot and detail selector.' },
      { name: 'Services', detail: 'Each service selects the matching shoot format.' },
      { name: 'Process', detail: 'Four production steps with concrete deliverables.' },
      { name: 'Shoot planner', detail: 'Product count, direction and extras, with a live estimate.' },
      { name: 'FAQ', detail: 'Native disclosures for each question.' },
      { name: 'Project brief', detail: 'A form with a review step that turns into an email draft, a copy or a text file.' },
      { name: 'Footer', detail: 'An oversized studio wordmark.' },
    ],
    customize: [
      { what: 'Brand, contact email, copy, projects, prices, FAQ', where: 'site.config.ts' },
      { what: 'Palette, spacing, typography', where: 'styles/base.css and app/globals.css' },
      { what: 'Fonts and metadata', where: 'app/layout.tsx' },
      { what: 'Section order', where: 'app/page.tsx' },
      { what: 'Product images', where: 'public/images/' },
      { what: 'Quote calculation', where: 'lib/quote.ts' },
    ],
    fonts: ['Instrument Sans', 'Instrument Serif', 'Geist Mono'],
    dependencies: ['next', 'react', 'react-dom', 'lucide-react'],
    images: 'Four original WebP product studies, included as demo imagery to replace with your own work.',
    node: '20.9',
    files: 36,
    lines: 3833,
    beforeLaunch:
      'Change `brand.email` in `site.config.ts` before accepting enquiries. The brief form prepares an email draft, a copy or a text file in the browser; to send it to a form provider instead, replace the submit handler in `components/sections/Contact.tsx`. The brands, rates and projects are fictional demo content.',
    updated: '2026-10-08',
  },
  prism: {
    name: 'Prism',
    kind: 'AI creative app landing page template',
    summary: 'A premium launch page for AI creative apps and consumer tools, built around original artwork and an interactive workspace. Three complete themes, two hero compositions and independent sections make it easy to adapt to your own product.',
    bestFor: ['AI image and avatar apps', 'Photo and video tools', 'Design utilities and consumer apps'],
    design: 'Graphite and violet, white and cobalt, or warm stone and coral. Manrope display type, Geist interface type, a custom prism mark, fine borders and layered product surfaces. Six original artworks bring colour to a restrained interface.',
    sections: [
      { name: 'Navigation', detail: 'Anchor navigation, a mobile menu and a working workspace action.' },
      { name: 'Hero', detail: 'Split or centered composition with a React workspace, editable prompts and example presets.' },
      { name: 'Explore', detail: 'Six original artworks with category filters, an in-place idea detail with its prompt and a working copy action.' },
      { name: 'Product', detail: 'Keyboard-accessible Create, Refine and Export tabs, a live colour comparison and real cropped image downloads.' },
      { name: 'Capabilities', detail: 'An asymmetrical bento with visual styles, saved ideas, aspect ratios and a colour control.' },
      { name: 'Workflow', detail: 'Three connected steps from idea to finished visual.' },
      { name: 'Creator stories', detail: 'Three editable sample quotes, labeled as illustrative content.' },
      { name: 'Pricing', detail: 'Three plans with monthly and yearly billing, with plan buttons that go to checkout or your email.' },
      { name: 'FAQ', detail: 'Native disclosures with clear answers about the interactive demonstration.' },
      { name: 'Closing and footer', detail: 'An artwork-backed closing action, footer navigation and theme/layout preview controls.' },
    ],
    customize: [
      { what: 'Brand, copy, links, artwork records, plans and FAQ', where: 'site.config.ts' },
      { what: 'Complete palettes', where: 'styles/themes.css' },
      { what: 'Default theme, hero layout and preview controls', where: 'site.config.ts → appearance' },
      { what: 'Fonts and metadata', where: 'app/layout.tsx' },
      { what: 'Section order', where: 'app/page.tsx' },
      { what: 'Product interactions and visuals', where: 'components/product/' },
      { what: 'Original artwork', where: 'public/images/' },
    ],
    fonts: ['Manrope', 'Geist', 'Geist Mono'],
    dependencies: ['next', 'react', 'react-dom', 'lucide-react'],
    images: 'Six original WebP artworks, each with a smaller thumbnail. Included demo imagery with documented prompts and provenance.',
    node: '20.9',
    files: 39,
    lines: 5753,
    beforeLaunch: 'Set `appUrl`, `email` and each plan’s `href` in `site.config.ts` to connect your real product, contact and checkout. Replace the fictional brand, creator stories, prices and FAQ. The workspace previews existing images; connect your own generation service for live AI. Set `appearance.showControls` to false to remove the template preview controls.',
    updated: '2026-10-08',
  },
  tempo: {
    name: 'Tempo',
    kind: 'Mobile app launch landing page template',
    summary: 'A sophisticated light launch page for mobile apps and everyday consumer tools. A tactile focus dial, interactive phone screens and distinct editorial sections combine warm paper, pale sage and forest green.',
    bestFor: ['Habit and routine apps', 'Journals and reading apps', 'Personal planners and consumer tools'],
    design: 'Warm white and charcoal with sage surfaces and forest-green accents. DM Sans display and interface type, Lora italic accents and Geist Mono details. A coded device frame and physical-looking dial anchor the page; original CSS/SVG illustrations keep every visual editable.',
    sections: [
      { name: 'Navigation', detail: 'Anchor links, a mobile menu and a working app-preview action.' },
      { name: 'Hero', detail: 'A compact editorial headline above a tactile dial and interactive phone. A real timer supports duration selection, pause, resume and reset.' },
      { name: 'Product chapters', detail: 'Plan, Focus and Reflect tabs coordinate the copy and phone screens. Shared routine controls and saved reflections work across previews.' },
      { name: 'Daily timeline', detail: 'A forest-green sequence of original morning, focus and reflection illustrations, vertical on phones.' },
      { name: 'Thoughtful details', detail: 'An interactive sample-week explorer, synchronized pace controls and a quiet leaf composition.' },
      { name: 'Everyday stories', detail: 'Three spacious editable story cards, explicitly labeled as illustrative.' },
      { name: 'Membership', detail: 'Two plans, computed annual savings and plan buttons that go to checkout or your email.' },
      { name: 'FAQ', detail: 'Native disclosures explaining the preview, storage and buyer integrations.' },
      { name: 'Closing and footer', detail: 'An original app icon in concentric rings, app-preview action and footer navigation.' },
    ],
    customize: [
      { what: 'Brand, primary copy, routines, stories, plans, FAQ and destinations', where: 'site.config.ts' },
      { what: 'Drop-in app screenshots', where: 'site.config.ts → screens' },
      { what: 'Palette and shared typography', where: 'styles/base.css' },
      { what: 'Fonts and metadata', where: 'app/layout.tsx' },
      { what: 'Section order', where: 'app/page.tsx' },
      { what: 'Section headlines and microcopy', where: 'components/sections/' },
      { what: 'App interface and local interactions', where: 'components/app/ and lib/' },
    ],
    fonts: ['DM Sans', 'Lora', 'Geist Mono'],
    dependencies: ['next', 'react', 'react-dom', 'lucide-react'],
    images: 'No external photography or image licenses. Device, dial, app screens and illustrations are original HTML/CSS/SVG. App screenshot slots are available.',
    node: '20.9',
    files: 42,
    lines: 4944,
    beforeLaunch: 'Set `links.ios`, `links.android`, optional `links.app`, `links.email` and each plan’s `href` in `site.config.ts`. Replace the fictional brand, stories, membership features and sample data. The timer is local, routines are current-page state and reflections save only in this browser; connect your actual app and checkout separately.',
    updated: '2026-10-08',
  },
  patch: {
    name: 'Patch',
    kind: 'AI builder and developer tool landing page template',
    summary: 'A precise launch page for AI builders, developer tools and small component products. An architectural grid joins a split headline, interactive code-and-output workspace, original product studies, two complete appearances and usable React example exports.',
    bestFor: ['AI coding and builder tools', 'Developer utilities and browser extensions', 'Component products and indie apps'],
    design: 'Chalk, ink and citrus, anchored by a graphite editor. Compact navigation, shared type roles, one badge per main section and continuous rails organize the page. Three joined pricing columns and a bold ink closing action complete the composition. Section rules meet real boundaries; original CSS/SVG studies stay editable without stock imagery.',
    sections: [
      { name: 'Navigation', detail: 'Anchor links, mobile menu, appearance switch and a working example-selector action.' },
      { name: 'Hero', detail: 'A 5/7 split composition with an emphasized headline and real Build, Review and Preview workspace views.' },
      { name: 'Capabilities', detail: 'Four joined cells that explain the building sequence.' },
      { name: 'Workspace', detail: 'Three prepared React examples with independent state, Apply/Undo, code review, clipboard and TSX downloads.' },
      { name: 'Product details', detail: 'An 8/4 and three-column feature matrix with responsive previews, file context, command menu, theme studies and exports.' },
      { name: 'Workflow', detail: 'Three keyboard-accessible steps with distinct request, diff and file compositions.' },
      { name: 'Starting points', detail: 'App, browser extension and component-product studies with coordinated copy and example actions.' },
      { name: 'Pricing', detail: 'Three joined plans with an emphasized Builder tier, a comparison ledger, independent billing destinations and plan buttons that go to checkout or contact.' },
      { name: 'FAQ', detail: 'Native disclosures that explain the local previews and buyer integrations.' },
      { name: 'Closing and footer', detail: 'An ink-colored closing field with two working actions and an original mark, followed by useful navigation and an oversized wordmark.' },
    ],
    customizeIntro: 'Start with `site.config.ts` for the brand, primary copy, links, plans and appearance. Product examples and interface microcopy have their own small files, listed below.',
    customize: [
      { what: 'Brand, metadata, primary copy, links, plans, FAQ and appearance', where: 'site.config.ts' },
      { what: 'Chalk and graphite palettes and shared typography', where: 'styles/base.css' },
      { what: 'Fonts', where: 'app/layout.tsx' },
      { what: 'Section order', where: 'app/page.tsx' },
      { what: 'Full before/after example code and diff excerpts', where: 'data/signup.ts, data/pricing.ts and data/command.ts' },
      { what: 'Rendered product previews and microcopy', where: 'components/product/' },
      { what: 'Product screenshot replacements', where: 'site.config.ts → workspace and useCases.items' },
    ],
    fonts: ['Geist', 'Geist Mono'],
    dependencies: ['next', 'react', 'react-dom', 'lucide-react'],
    images: 'Original HTML/CSS/SVG mark, workspace and product illustrations. No external photography or reference-site assets. Optional product screenshot slots are included.',
    node: '20.9',
    files: 62,
    lines: 5688,
    beforeLaunch: 'Set `links.app`, `links.docs`, `links.email` and both billing destinations for each plan in `site.config.ts`. Replace the fictional brand, product claims and prices. The prepared examples run locally and export standard React components; connect your real app, AI service, email provider and checkout separately.',
    updated: '2026-10-09',
  },
  relay: {
    name: 'Relay',
    kind: 'Personal assistant and AI companion landing page template',
    summary: 'A launch page for personal assistants, browser companions and everyday AI tools. A live example conversation leads into a continuous grid of illustrated features, a working workspace and useful product examples.',
    bestFor: ['Personal AI assistants', 'Browser and desktop companions', 'Research, writing and everyday productivity tools'],
    design: 'Cloud white, ink and cobalt. Continuous vertical rails meet viewport-wide section rules. Navigation stays open at the top and contracts on scroll. One DM Sans typeface carries the conversation hero, border-sharing feature cells and aligned pricing, FAQ and footer. Includes an alternate ink appearance.',
    sections: [
      { name: 'Navigation', detail: 'Open navigation that contracts into a compact floating bar on scroll, with active anchors, appearance control and a keyboard-operable mobile menu.' },
      { name: 'Hero', detail: 'Centered headline above a readable conversation with three selectable examples and a coordinated workspace action.' },
      { name: 'Product details', detail: 'Four joined visual cells, each showing a useful stage of the assistant experience.' },
      { name: 'Assistant workspace', detail: 'Three prepared examples, selectable context, a finite replay with pause/resume/reset, and a useful document with real copy and text exports.' },
      { name: 'Possibilities', detail: 'Three aligned example columns with original product studies, coordinated workspace actions and a persistent Saved filter.' },
      { name: 'Your context', detail: 'Two joined columns explaining selected context, local examples and text exports.' },
      { name: 'Pricing', detail: 'Two plans in a shared ledger, calculated annual savings, separate monthly/yearly destinations and plan buttons that go to checkout or your email.' },
      { name: 'FAQ', detail: 'Native disclosures explaining the preview and buyer integrations.' },
      { name: 'Closing and footer', detail: 'A cobalt closing panel, working workspace action and useful footer links.' },
    ],
    customizeIntro: 'Start with `site.config.ts` for the brand, copy, context labels, plans, links and appearance. Prepared requests, result text and context-dependent behavior live in `data/scenarios.ts`.',
    customize: [
      { what: 'Brand, metadata, copy, links, plans, FAQ and default appearance', where: 'site.config.ts' },
      { what: 'Five shared type roles, palettes and spacing', where: 'styles/base.css' },
      { what: 'Font and metadata rendering', where: 'app/layout.tsx' },
      { what: 'Section order', where: 'app/page.tsx' },
      { what: 'Requests, summaries, output and context behavior', where: 'data/scenarios.ts' },
      { what: 'Assistant state and product rendering', where: 'lib/useAssistant.ts and components/product/' },
      { what: 'Product screenshot replacement', where: 'site.config.ts → workspace.screenshot' },
    ],
    fonts: ['DM Sans'],
    dependencies: ['next', 'react', 'react-dom', 'lucide-react'],
    images: 'Original SVG mark, HTML/CSS workspace, four feature illustrations and three product studies. No external photography or stock artwork. An optional product screenshot slot is included.',
    node: '20.9',
    files: 40,
    lines: 2345,
    beforeLaunch: 'Set `links.app`, `links.docs`, `links.email` and each plan’s monthly/yearly destination. Replace the fictional brand, claims, prices and prepared scenarios. Saved example IDs stay in this browser; exports contain the displayed document. Connect your real AI application, accounts and checkout separately.',
    updated: '2026-10-08',
  },
};

export function getTemplateDetails(slug: string): TemplateDetails | undefined {
  return TEMPLATE_DETAILS[slug];
}

/** "AI writing tool landing page": the kind without the trailing "template", for cards. */
export const shortKind = (d: TemplateDetails) => d.kind.replace(/ template$/, '');
