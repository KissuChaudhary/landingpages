import { arcloTemplate } from './template-catalog/arclo';
import { asterTemplate } from './template-catalog/aster';
import { notchTemplate } from './template-catalog/notch';

export interface TemplateItem {
  slug: string;
  title: string;
  category: 'Landing Pages' | 'Dashboards' | 'Hero & Motion' | 'Bento Grids' | 'Pricing Pages';
  defaultTheme: 'dark' | 'light';
  badge: string;
  description: string;
  tags: string[];
  features: string[];
  accentColor: string;
  previewUrl: string;
  /** Optional standalone export, used directly by the responsive demo. */
  standaloneUrl?: string;
  demoUrl: string;
  detailUrl: string;
  thumbnailUrl?: string;
}

export const CATEGORIES = [
  'All',
  'Landing Pages',
  'Dashboards',
  'Hero & Motion',
  'Bento Grids',
  'Pricing Pages',
] as const;

export type CategoryType = (typeof CATEGORIES)[number];

export const TEMPLATES: TemplateItem[] = [
    notchTemplate,
    asterTemplate,
    arcloTemplate,
    {
      slug: 'daybreak',
      title: 'Daybreak: AI Marketing Workspace',
      category: 'Landing Pages',
      defaultTheme: 'light',
      badge: 'Marketing & Analytics',
      description: 'A calm marketing platform launch with original painted landscapes, restrained Inter typography and precise dashed frames. Working campaign reviews, a week of mornings on a sun-path arc, a calm-by-design access panel, an integration directory, pricing, contact and editorial pages complete the experience.',
      tags: ['AI Marketing', 'Analytics', 'Original Illustrations', 'Light Theme', 'Next.js 15'],
      features: [
        'Landscape-led hero, pill controls and aligned dashed section frames',
        'Campaign questions, source context, channel filters and matching CSV exports',
        'A week of mornings, a calm-by-design access panel and a searchable integration directory',
        'Expanding portrait stories, three plans, contact briefs and editorial routes',
      ],
      accentColor: 'from-sky-300 to-amber-400',
      previewUrl: '/preview/daybreak',
      standaloneUrl: '/demos/daybreak/index.html',
      demoUrl: '/demo/daybreak',
      detailUrl: '/template/daybreak',
      thumbnailUrl: '/previews/card/daybreak.webp',
    },
    {
      slug: 'conduit',
      title: 'Conduit: AI Agent & Workflow Platform',
      category: 'Landing Pages',
      defaultTheme: 'light',
      badge: 'AI Agents & Workflows',
      description: 'Light serif typography, original cobalt glass imagery and precise white-to-black chapters. A complete agent platform launch template with working product demonstrations, workflow stories, pricing and contact pages.',
      tags: ['AI Agents', 'Workflow Platform', 'Serif', 'Original Imagery', 'Next.js 15'],
      features: [
        'Centered serif hero, two-part visual and original optimized cobalt artwork',
        'Editable agent blueprints, workflow execution and real JSON run exports',
        'Interactive capability diagrams and keyboard-accessible workflow stories',
        'Separate pricing and contact pages, correct billing and local brief exports',
      ],
      accentColor: 'from-blue-400 to-blue-700',
      previewUrl: '/preview/conduit',
      standaloneUrl: '/demos/conduit/index.html',
      demoUrl: '/demo/conduit',
      detailUrl: '/template/conduit',
      thumbnailUrl: '/previews/card/conduit.webp',
    },
    {
      "slug": "index",
      "title": "Index: AI Research & Knowledge Workspace",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "Research & Knowledge",
      "description": "An editorial launch page in warm paper, ink and persimmon. Segmented heading accents, a wide research scene, scroll-led product chapters and working source-linked examples give knowledge and AI products a distinct identity.",
      "tags": ["AI Research", "Knowledge App", "Scroll Motion", "Light Theme", "Next.js 15"],
      "features": [
        "Segmented heading accents, brief label decoding and responsive ambient fields",
        "Three coordinated research examples with source passages that open in place beside each citation",
        "Scroll-led product story, keyboard example selection and complete brief exports",
        "Three aligned plans, plan buttons that go to your checkout links"
      ],
      "accentColor": "from-orange-300 to-orange-600",
      "previewUrl": "/preview/index",
      "standaloneUrl": "/demos/index/index.html",
      "demoUrl": "/demo/index",
      "detailUrl": "/template/index",
      "thumbnailUrl": "/previews/card/index.webp"
    },
    {
      "slug": "footnote",
      "title": "Footnote: AI Writing Tool Landing Page",
      "category": "Landing Pages",
      "defaultTheme": "dark",
      "badge": "AI Writing",
      "description": "A dark, editorial landing page for AI writing and research products. A before-and-after draft with footnotes, an annotated method, three engine sections, a proof ledger and a plain-text FAQ, all driven from one config file.",
      "tags": [
        "AI Writing",
        "SaaS",
        "Tailwind v4",
        "Next.js 15"
      ],
      "features": [
        "Before and after draft with real footnote markers",
        "Annotated method with margin notes",
        "Grid frame with + marks only where lines meet",
        "One config file and one colour palette"
      ],
      "accentColor": "from-blue-400 to-indigo-500",
      "previewUrl": "/preview/footnote",
      "demoUrl": "/demo/footnote",
      "detailUrl": "/template/footnote",
      "thumbnailUrl": "/previews/card/footnote.webp"
    },
    {
      "slug": "cutroom",
      "title": "Cutroom: Video Editing Studio Landing Page",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "Creator Studio",
      "description": "A landing page for video editing studios and creator agencies. Timeline-style hero, service selector, retention chart, edit-decision-list process, pricing calculator and pinned comments, all driven from one config file.",
      "tags": [
        "Video Studio",
        "Creator Agency",
        "Tailwind v4",
        "Next.js 15"
      ],
      "features": [
        "Editor-style hero with timeline and playhead",
        "Retention chart with numbered markers",
        "Pricing calculator with volume discounts",
        "One config file and one colour palette"
      ],
      "accentColor": "from-orange-500 to-red-500",
      "previewUrl": "/preview/cutroom",
      "demoUrl": "/demo/cutroom",
      "detailUrl": "/template/cutroom",
      "thumbnailUrl": "/previews/card/cutroom.webp"
    },
    {
      "slug": "halftone",
      "title": "Halftone: Developer API Landing Page",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "Dev Tools",
      "description": "A clean, light landing page for developer tools and API products. Live delivery log hero, animated pipeline, six product panels, tabbed code samples and a usage-based pricing calculator, all driven from one config file.",
      "tags": [
        "Developer Tools",
        "API Product",
        "Light Mode",
        "Tailwind v4",
        "Next.js 15"
      ],
      "features": [
        "Live delivery log hero with a retry that recovers",
        "Animated pipeline and six coded product panels",
        "Code window with language tabs and step highlights",
        "Usage-based pricing slider that prices every plan"
      ],
      "accentColor": "from-blue-600 to-indigo-600",
      "previewUrl": "/preview/halftone",
      "demoUrl": "/demo/halftone",
      "detailUrl": "/template/halftone",
      "thumbnailUrl": "/previews/card/halftone.webp"
    },
    {
      "slug": "emberline",
      "title": "Emberline: AI SaaS Landing Page",
      "category": "Landing Pages",
      "defaultTheme": "dark",
      "badge": "Next.js 15",
      "description": "A dark, grid-framed landing page for AI and SaaS products. Hero, bento features, comparison table, pricing toggle, FAQ and footer, all driven from one config file.",
      "tags": [
        "AI SaaS",
        "Dark Mode",
        "Tailwind v4",
        "Next.js 15"
      ],
      "features": [
        "Grid-framed hero with animated energy lines",
        "Bento features with inline illustrations",
        "Monthly and yearly pricing toggle",
        "One config file and one colour ramp"
      ],
      "accentColor": "from-orange-300 to-orange-500",
      "previewUrl": "/preview/emberline",
      "demoUrl": "/demo/emberline",
      "detailUrl": "/template/emberline",
      "thumbnailUrl": "/previews/card/emberline.webp"
    },
    {
      "slug": "influence",
      "title": "Influence: Short-Form Video Studio Landing Page",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "Creator Agency",
      "description": "A high-energy landing page for short-form video studios and creator agencies. Platform badges in the headline, a phone with floating metrics, drawn video thumbnails with a working filter, case-study charts, a dark process timeline and a comparison-table price with a billing switch. No photos to license.",
      "tags": [
        "Creator Agency",
        "Short-Form Video",
        "Tailwind v4",
        "Next.js 15"
      ],
      "features": [
        "Phone hero with floating, counting metrics",
        "Filterable wall of drawn video thumbnails",
        "Case-study charts drawn from your numbers",
        "Comparison pricing with a billing switch"
      ],
      "accentColor": "from-orange-400 to-amber-500",
      "previewUrl": "/preview/influence",
      "demoUrl": "/demo/influence",
      "detailUrl": "/template/influence",
      "thumbnailUrl": "/previews/card/influence.webp"
    },
    {
      "slug": "marlow",
      "title": "Marlow: Studio & Consultancy Landing Page",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "Editorial",
      "description": "A warm, editorial landing page for studios, consultancies and agencies. Serif display type, highlighter manifesto, services index, result tiles, Gantt process, rate card and FAQ, all driven from one config file.",
      "tags": [
        "Studio",
        "Consultancy",
        "Editorial",
        "Next.js 15"
      ],
      "features": [
        "Manifesto with highlighter marks",
        "Services index and result tiles",
        "Six-week Gantt process chart",
        "One config file and one colour palette"
      ],
      "accentColor": "from-amber-200 to-orange-300",
      "previewUrl": "/preview/marlow",
      "demoUrl": "/demo/marlow",
      "detailUrl": "/template/marlow",
      "thumbnailUrl": "/previews/card/marlow.webp"
    },
    {
      "slug": "parley",
      "title": "Parley: AI Support Agent Landing Page",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "AI Support",
      "description": "A warm, conversational landing page for AI support agents and chatbots. A hero chat, a switchable chatbot comparison, an action log, a results band, row-style pricing and an FAQ written as a conversation, all driven from one config file.",
      "tags": [
        "AI Support",
        "Chatbot",
        "Tailwind v4",
        "Next.js 15"
      ],
      "features": [
        "Hero built as a live-looking support chat",
        "Switchable transcript: classic bot vs your product",
        "Action log timeline and plum results band",
        "One config file and one colour palette"
      ],
      "accentColor": "from-pink-400 to-rose-500",
      "previewUrl": "/preview/parley",
      "demoUrl": "/demo/parley",
      "detailUrl": "/template/parley",
      "thumbnailUrl": "/previews/card/parley.webp"
    },
    {
      "slug": "fourteen",
      "title": "Fourteen: Done-for-You Outbound Landing Page",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "Full Kit",
      "description": "A complete, warm landing page for done-for-you services and productised B2B offers. Hatched page frame, peach-and-lilac ringed cards, a strip of sample emails, drawn feature illustrations, handwritten notes, one-plan pricing, FAQ and a founder's note, all driven from one config file.",
      "tags": [
        "Agency",
        "Full Landing",
        "Conversion Focused",
        "Next.js 15"
      ],
      "features": [
        "Hatched frame and ringed cards",
        "Eight drawn feature illustrations",
        "Problem, solution and three-step system",
        "One-plan pricing and founder's note"
      ],
      "accentColor": "from-orange-300 to-orange-500",
      "previewUrl": "/preview/fourteen",
      "demoUrl": "/demo/fourteen",
      "detailUrl": "/template/fourteen",
      "thumbnailUrl": "/previews/card/fourteen.webp"
    },
    {
      "slug": "kept",
      "title": "Kept: Freelancer Invoicing Landing Page",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "Fintech",
      "description": "A calm, statement-style landing page for invoicing and tax tools for freelancers. A paid-invoice hero, a twelve-month chart that draws itself from your numbers, a dotted-leader feature ledger, a receipt-style price and native FAQ rows, all driven from one config file.",
      "tags": [
        "Fintech",
        "Invoicing",
        "Tailwind v4",
        "Next.js 15"
      ],
      "features": [
        "Hero built as an invoice that was just paid",
        "Year chart calculated from your own figures",
        "Dotted-leader ledger and receipt-style pricing",
        "One config file and one colour palette"
      ],
      "accentColor": "from-lime-300 to-emerald-700",
      "previewUrl": "/preview/kept",
      "demoUrl": "/demo/kept",
      "detailUrl": "/template/kept",
      "thumbnailUrl": "/previews/card/kept.webp"
    },
    {
      "slug": "stillform",
      "title": "Stillform: Product Photography & CGI Studio",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "Product Studio",
      "description": "An editorial landing page for product photographers and CGI studios. Original campaign imagery, a filterable portfolio with project lightboxes, campaign and packshot perspectives, and a shoot planner that carries its estimate into a shareable project brief.",
      "tags": [
        "Product Photography",
        "CGI Studio",
        "E-commerce",
        "Editorial",
        "Next.js 15"
      ],
      "features": [
        "Original campaign imagery and project lightboxes",
        "Keyboard-operable campaign and packshot selector",
        "Shoot planner with products, formats and extras",
        "Shareable enquiry brief with your selected estimate"
      ],
      "accentColor": "from-orange-400 to-red-500",
      "previewUrl": "/preview/stillform",
      "demoUrl": "/demo/stillform",
      "detailUrl": "/template/stillform",
      "thumbnailUrl": "/previews/card/stillform.webp"
    },
    {
      "slug": "prism",
      "title": "Prism: AI Creative App Launch",
      "category": "Landing Pages",
      "defaultTheme": "dark",
      "badge": "Creative App",
      "description": "A premium creative-app launch page with three complete themes, two hero compositions, original artwork, and an interactive product workspace.",
      "tags": ["AI Creative App", "Consumer App", "Three Themes", "Interactive UI", "Next.js 15"],
      "features": [
        "Graphite, Paper and Studio themes with two hero layouts",
        "Filterable artwork gallery with an in-place detail that loads each prompt into the workspace",
        "Colour comparison, canvas crops and real example image exports",
        "Modular sections, typed content config and original artwork"
      ],
      "accentColor": "from-violet-400 to-indigo-500",
      "previewUrl": "/preview/prism",
      "demoUrl": "/demo/prism",
      "detailUrl": "/template/prism",
      "thumbnailUrl": "/previews/card/prism.webp"
    },
    {
      "slug": "tempo",
      "title": "Tempo: Everyday App Launch",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "Mobile App",
      "description": "A considered light launch page for mobile apps and personal tools. A working focus dial, interactive phone screens and thoughtful editorial sections in paper, sage and forest green.",
      "tags": ["Mobile App", "Consumer App", "Light Theme", "Interactive UI", "Next.js 15"],
      "features": [
        "Real focus timer synchronized with the phone preview",
        "Plan, Focus and Reflect screens with screenshot replacements",
        "Saved reflections, routine controls and a sample-week explorer",
        "Paper-and-sage design with configurable content and pricing"
      ],
      "accentColor": "from-lime-200 to-emerald-700",
      "previewUrl": "/preview/tempo",
      "demoUrl": "/demo/tempo",
      "detailUrl": "/template/tempo",
      "thumbnailUrl": "/previews/card/tempo.webp"
    },
    {
      "slug": "patch",
      "title": "Patch: AI Builder & Developer Tool Launch",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "AI Builder",
      "description": "A precise grid-framed launch page in chalk, citrus and graphite. A working code-and-output workspace, original product studies, two complete appearances and real React example exports.",
      "tags": ["AI Builder", "Developer Tool", "Grid Layout", "Two Themes", "Next.js 15"],
      "features": [
        "Three component examples with Apply, Undo and code review",
        "Chalk and graphite appearances with a shared page grid",
        "Keyboard command menu, responsive previews and real TSX exports",
        "Modular sections, typed content config and screenshot replacements"
      ],
      "accentColor": "from-lime-200 to-emerald-800",
      "previewUrl": "/preview/patch",
      "standaloneUrl": "/demos/patch/index.html",
      "demoUrl": "/demo/patch",
      "detailUrl": "/template/patch",
      "thumbnailUrl": "/previews/card/patch.webp"
    },
    {
      "slug": "relay",
      "title": "Relay: Personal Assistant & AI Companion",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "Personal Assistant",
      "description": "A light-theme launch page for personal assistants with continuous page rails, an interactive conversation hero, expansive feature illustrations and a working assistant workspace.",
      "tags": ["Personal Assistant", "AI Companion", "Light Theme", "Feature Grid", "Next.js 15"],
      "features": [
        "Centered hero, floating navigation and interactive workspace",
        "Three examples with selected context, pause, resume and reset",
        "Saved example library, clipboard and real text exports",
        "Illustrated feature grid, two appearances and typed config"
      ],
      "accentColor": "from-blue-200 to-blue-600",
      "previewUrl": "/preview/relay",
      "standaloneUrl": "/demos/relay/index.html",
      "demoUrl": "/demo/relay",
      "detailUrl": "/template/relay",
      "thumbnailUrl": "/previews/card/relay.webp"
    }
];

export function getTemplateBySlug(slug: string): TemplateItem | undefined {
  return TEMPLATES.find((t) => t.slug === slug);
}
