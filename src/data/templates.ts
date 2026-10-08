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
  downloadUrl: string;
  previewUrl: string;
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
      "downloadUrl": "",
      "previewUrl": "/preview/footnote",
      "demoUrl": "/demo/footnote",
      "detailUrl": "/template/footnote"
    },
    {
      "slug": "clearnotes-hero",
      "title": "ClearNotes Minimalist Hero",
      "category": "Hero & Motion",
      "defaultTheme": "light",
      "badge": "Hero",
      "description": "Refined distraction-free hero section for modern productivity apps, note taking tools, and AI copilot software.",
      "tags": [
        "Productivity",
        "Minimalist",
        "Hero Section",
        "Next.js"
      ],
      "features": [
        "Clean Typography Hierarchy",
        "Subtle Border Shimmers",
        "Floating Floating UI Badges",
        "Mobile Optimized"
      ],
      "accentColor": "from-amber-500 to-orange-500",
      "downloadUrl": "/downloads/clearnotes-hero.zip",
      "previewUrl": "/preview/clearnotes-hero",
      "demoUrl": "/demo/clearnotes-hero",
      "detailUrl": "/template/clearnotes-hero"
    },
    {
      "slug": "create-studio",
      "title": "Create Studio Media Landing",
      "category": "Landing Pages",
      "defaultTheme": "dark",
      "badge": "Creative",
      "description": "Vibrant and punchy landing page built for digital creators, podcasters, and video production studios.",
      "tags": [
        "Media",
        "Creators",
        "Video Studio",
        "Modern"
      ],
      "features": [
        "Creator Portfolio Grid",
        "Audio/Video Showreel",
        "Tiered Membership",
        "Social Integrations"
      ],
      "accentColor": "from-violet-500 to-fuchsia-500",
      "downloadUrl": "/downloads/create-studio.zip",
      "previewUrl": "/preview/create-studio",
      "demoUrl": "/demo/create-studio",
      "detailUrl": "/template/create-studio"
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
      "downloadUrl": "",
      "previewUrl": "/preview/cutroom",
      "demoUrl": "/demo/cutroom",
      "detailUrl": "/template/cutroom"
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
      "downloadUrl": "",
      "previewUrl": "/preview/halftone",
      "demoUrl": "/demo/halftone",
      "detailUrl": "/template/halftone"
    },
    {
      "slug": "ecompin",
      "title": "FIXTHIS - Software Problem Marketplace",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "Marketplace",
      "description": "Editorial serif-and-mono community board where software users call out pain points, vote ME TOO, and SaaS alternatives answer.",
      "tags": [
        "Marketplace",
        "Editorial",
        "Serif & Mono",
        "Community Board",
        "Light Mode"
      ],
      "features": [
        "Public Problem Board",
        "Interactive ME TOO Upvoting",
        "Competitor Solution Matcher",
        "Curated Category Shelves"
      ],
      "accentColor": "from-red-500 to-orange-600",
      "downloadUrl": "/downloads/ecompin.zip",
      "previewUrl": "/preview/ecompin",
      "demoUrl": "/demo/ecompin",
      "detailUrl": "/template/ecompin"
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
      "downloadUrl": "",
      "previewUrl": "/preview/emberline",
      "demoUrl": "/demo/emberline",
      "detailUrl": "/template/emberline"
    },
    {
      "slug": "founder-pricing",
      "title": "Metallic Founder Pricing Page",
      "category": "Pricing Pages",
      "defaultTheme": "light",
      "badge": "Luxury UI",
      "description": "Stunning brushed-metal and iridescent luxury pricing cards with interactive billing toggles and tier comparisons.",
      "tags": [
        "Pricing Table",
        "Luxury Aesthetics",
        "Skeuomorphism",
        "Motion"
      ],
      "features": [
        "Brushed Metal Gradient Cards",
        "Annual/Monthly Switcher",
        "Feature Comparison Matrix",
        "Interactive CTAs"
      ],
      "accentColor": "from-slate-400 to-zinc-600",
      "downloadUrl": "/downloads/founder-pricing.zip",
      "previewUrl": "/preview/founder-pricing",
      "demoUrl": "/demo/founder-pricing",
      "detailUrl": "/template/founder-pricing"
    },
    {
      "slug": "agenwrite-growth-engine",
      "title": "AgenWrite Growth Engine",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "Growth SaaS",
      "description": "Comprehensive SaaS growth platform featuring ticker feeds, product showcase tabs, live examples, and winning systems.",
      "tags": [
        "Growth",
        "Viral Waitlist",
        "Showcase Tabs",
        "Interactive"
      ],
      "features": [
        "Winning System Engine",
        "Live Customer Ticker",
        "Tabbed Product Walkthrough",
        "Viral Waitlist Component"
      ],
      "accentColor": "from-blue-500 to-cyan-500",
      "downloadUrl": "/downloads/agenwrite-growth-engine.zip",
      "previewUrl": "/preview/agenwrite-growth-engine",
      "demoUrl": "/demo/agenwrite-growth-engine",
      "detailUrl": "/template/agenwrite-growth-engine"
    },
    {
      "slug": "influence-hero",
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
      "downloadUrl": "",
      "previewUrl": "/preview/influence-hero",
      "demoUrl": "/demo/influence-hero",
      "detailUrl": "/template/influence-hero"
    },
    {
      "slug": "intelligent-systems",
      "title": "Intelligent Systems Autonomous AI",
      "category": "Landing Pages",
      "defaultTheme": "dark",
      "badge": "Autonomous AI",
      "description": "Cutting-edge autonomous agent infrastructure landing page with reactive neural nodes and real-time processing cards.",
      "tags": [
        "AI Agents",
        "Deep Tech",
        "Next.js 15",
        "Futuristic"
      ],
      "features": [
        "Neural Node Grid",
        "Autonomous Execution Steps",
        "Telemetry Monitoring",
        "API Docs Snippet"
      ],
      "accentColor": "from-cyan-400 to-blue-600",
      "downloadUrl": "/downloads/intelligent-systems.zip",
      "previewUrl": "/preview/intelligent-systems",
      "demoUrl": "/demo/intelligent-systems",
      "detailUrl": "/template/intelligent-systems"
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
      "downloadUrl": "",
      "previewUrl": "/preview/marlow",
      "demoUrl": "/demo/marlow",
      "detailUrl": "/template/marlow"
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
      "downloadUrl": "",
      "previewUrl": "/preview/parley",
      "demoUrl": "/demo/parley",
      "detailUrl": "/template/parley"
    },
    {
      "slug": "quick-14-studio",
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
      "downloadUrl": "",
      "previewUrl": "/preview/quick-14-studio",
      "demoUrl": "/demo/quick-14-studio",
      "detailUrl": "/template/quick-14-studio"
    },
    {
      "slug": "refind-ai",
      "title": "Refind Document AI Copilot",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "AI Copilot",
      "description": "Smart document workspace and AI reading copilot landing page with rich text highlights, markdown preview, and chat sidebar.",
      "tags": [
        "Document AI",
        "Knowledge Base",
        "Motion",
        "Productivity"
      ],
      "features": [
        "Interactive Document Editor",
        "Live AI Summary Sidebar",
        "Format Toolbar Controls",
        "Speed Reading Metrics"
      ],
      "accentColor": "from-blue-400 to-cyan-500",
      "downloadUrl": "/downloads/refind-ai.zip",
      "previewUrl": "/preview/refind-ai",
      "demoUrl": "/demo/refind-ai",
      "detailUrl": "/template/refind-ai"
    },
    {
      "slug": "pfp-ai",
      "title": "PFP AI Studio & Avatar Engine",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "Consumer AI",
      "description": "Modern photo generator and AI avatar maker landing page with before-and-after photo comparisons and prompt pills.",
      "tags": [
        "Avatar AI",
        "Photo Studio",
        "Consumer App",
        "React"
      ],
      "features": [
        "Before / After Photo Slider",
        "Style Preset Selector",
        "One-Click Generation Demo",
        "High-Resolution Export"
      ],
      "accentColor": "from-purple-500 to-pink-500",
      "downloadUrl": "/downloads/pfp-ai.zip",
      "previewUrl": "/preview/pfp-ai",
      "demoUrl": "/demo/pfp-ai",
      "detailUrl": "/template/pfp-ai"
    },
    {
      "slug": "scale-ai-hero",
      "title": "Scale AI Foundation Hero UI",
      "category": "Hero & Motion",
      "defaultTheme": "dark",
      "badge": "Enterprise AI",
      "description": "Grand enterprise hero section featuring smooth parallax scrolling, high-fidelity imagery, and interactive mobile drawer.",
      "tags": [
        "Enterprise AI",
        "Hero Section",
        "Smooth Scroll",
        "Vite"
      ],
      "features": [
        "High-Res Hero Mockup",
        "Slide-in Mobile Navigation",
        "Interactive Callout Badges",
        "Custom Typography"
      ],
      "accentColor": "from-blue-600 to-indigo-700",
      "downloadUrl": "/downloads/scale-ai-hero.zip",
      "previewUrl": "/preview/scale-ai-hero",
      "demoUrl": "/demo/scale-ai-hero",
      "detailUrl": "/template/scale-ai-hero"
    },
    {
      "slug": "skywrite-ai",
      "title": "SkyWrite AI SEO Copywriter",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "Content AI",
      "description": "AI-powered blog & article writer landing page optimized for search engines with live generation sandbox and process stepper.",
      "tags": [
        "SEO Content",
        "Copywriting",
        "AI Generator",
        "SaaS"
      ],
      "features": [
        "Live Prompt Sandbox Demo",
        "3-Step Workflow Stepper",
        "SEO Readiness Checklist",
        "Transparent Pricing"
      ],
      "accentColor": "from-sky-400 to-indigo-600",
      "downloadUrl": "/downloads/skywrite-ai.zip",
      "previewUrl": "/preview/skywrite-ai",
      "demoUrl": "/demo/skywrite-ai",
      "detailUrl": "/template/skywrite-ai"
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
      "downloadUrl": "",
      "previewUrl": "/preview/kept",
      "demoUrl": "/demo/kept",
      "detailUrl": "/template/kept"
    },
    {
      "slug": "dating-pfp",
      "title": "DatingPFP - AI Dating Photoshoot SaaS",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "AI Photoshoot",
      "description": "High-converting brutalist photo generation landing page with bold typography, live proof galleries, and before/after comparisons.",
      "tags": [
        "AI Avatars",
        "Dating Photos",
        "Neo-Brutalism",
        "High Conversion",
        "Light Mode"
      ],
      "features": [
        "Before & After Photo Slider",
        "Social Proof Wall",
        "Comparison Matrix",
        "Pill CTA Funnel"
      ],
      "accentColor": "from-rose-500 to-pink-600",
      "downloadUrl": "/downloads/dating-pfp.zip",
      "previewUrl": "/preview/dating-pfp",
      "demoUrl": "/demo/dating-pfp",
      "detailUrl": "/template/dating-pfp"
    },
    {
      "slug": "seo-writer",
      "title": "BringBack SEO - Organic AI Engine",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "Organic Growth",
      "description": "Technical editorial landing page featuring geometric grid lines, corner squares, live ranking proof counters, and citations grid.",
      "tags": [
        "SEO SaaS",
        "Editorial",
        "Technical Grid",
        "Organic Growth",
        "Light Mode"
      ],
      "features": [
        "Real-time Google Ranking Proof",
        "AI Citation Metrics",
        "Grid Pattern Boundary Accents",
        "Editorial Content Showcase"
      ],
      "accentColor": "from-emerald-600 to-teal-700",
      "downloadUrl": "/downloads/seo-writer.zip",
      "previewUrl": "/preview/seo-writer",
      "demoUrl": "/demo/seo-writer",
      "detailUrl": "/template/seo-writer"
    },
    {
      "slug": "passport-studio",
      "title": "PassportStudio - Biometric ID Photo Maker",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "Biometric AI",
      "description": "Strict compliance biometric photo creator with country passport guideline selector, instant preview stage, and satisfaction guarantees.",
      "tags": [
        "Passport Photo",
        "Biometric AI",
        "Clean Light",
        "Compliance",
        "Light Mode"
      ],
      "features": [
        "Multi-Country Compliance Picker",
        "Photo Upload & Crop Preview",
        "Requirements Checklist",
        "Print & Digital Deliverables"
      ],
      "accentColor": "from-blue-600 to-indigo-700",
      "downloadUrl": "/downloads/passport-studio.zip",
      "previewUrl": "/preview/passport-studio",
      "demoUrl": "/demo/passport-studio",
      "detailUrl": "/template/passport-studio"
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
      "downloadUrl": "",
      "previewUrl": "/preview/stillform",
      "demoUrl": "/demo/stillform",
      "detailUrl": "/template/stillform",
      "thumbnailUrl": "/previews/stillform.webp"
    },
    {
      "slug": "ai-imagetools",
      "title": "PicShot - Complete AI Image Editing Suite",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "Creative Suite",
      "description": "Multi-tool creative landing page showcasing background removal, image upscaling, object eraser, and prompt-to-image capabilities.",
      "tags": [
        "Image Editor",
        "AI Tools",
        "Multi-Feature",
        "Product Suite",
        "Light Mode"
      ],
      "features": [
        "Tool Switcher Grid",
        "Interactive Comparison Viewer",
        "Client-Side Localization Hook",
        "Feature Deep Dives"
      ],
      "accentColor": "from-cyan-500 to-blue-600",
      "downloadUrl": "/downloads/ai-imagetools.zip",
      "previewUrl": "/preview/ai-imagetools",
      "demoUrl": "/demo/ai-imagetools",
      "detailUrl": "/template/ai-imagetools"
    },
    {
      "slug": "cvfolio",
      "title": "CVFolio - Interactive Resume & Career Portfolio",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "Portfolio & Resume",
      "description": "Polished personal branding and executive resume landing page with interactive timeline, achievement metrics, and project showcases.",
      "tags": [
        "Resume",
        "Portfolio",
        "Career Branding",
        "Minimalist Clean",
        "Light Mode"
      ],
      "features": [
        "Executive Hero Intro",
        "Interactive Experience Timeline",
        "Skills Radar & Tags",
        "Live Contact & Calendly Modal"
      ],
      "accentColor": "from-blue-500 to-slate-800",
      "downloadUrl": "/downloads/cvfolio.zip",
      "previewUrl": "/preview/cvfolio",
      "demoUrl": "/demo/cvfolio",
      "detailUrl": "/template/cvfolio"
    },
    {
      "slug": "coloring-app",
      "title": "Coloring - Android Drawing & Art Studio",
      "category": "Landing Pages",
      "defaultTheme": "light",
      "badge": "Mobile App",
      "description": "Mindful coloring book mobile app landing page featuring interactive browser canvas, smart fill showcase, and APK download.",
      "tags": [
        "Mobile App",
        "Android",
        "Interactive Canvas",
        "Art & Drawing",
        "Light Mode"
      ],
      "features": [
        "Interactive SVG Color Palette",
        "Smart Contour Flood Fill",
        "Offline Mode Capability",
        "Direct APK Download & QR Code"
      ],
      "accentColor": "from-rose-500 to-amber-500",
      "downloadUrl": "/downloads/coloring-app.zip",
      "previewUrl": "/preview/coloring-app",
      "demoUrl": "/demo/coloring-app",
      "detailUrl": "/template/coloring-app"
    }
];

export function getTemplateBySlug(slug: string): TemplateItem | undefined {
  const canonicalSlug = slug === 'unreal-shot' ? 'stillform' : slug;
  return TEMPLATES.find((t) => t.slug === canonicalSlug);
}
