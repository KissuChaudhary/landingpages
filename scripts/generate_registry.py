import os
import json

ROOT_DIR = os.path.abspath("e:/tutorial/founderdada")
DATA_DIR = os.path.join(ROOT_DIR, "src", "data")
os.makedirs(DATA_DIR, exist_ok=True)

with open(os.path.join(ROOT_DIR, "extracted_summary.json"), "r", encoding="utf-8") as f:
    raw_summary = json.load(f)

# High-converting marketing copy & categorization for each template
CURATED_DETAILS = {
    "agenwrite-geo": {
        "title": "AgenWrite GEO Infrastructure",
        "category": "Landing Pages",
        "badge": "Infrastructure",
        "description": "High-tech terminal & bento infrastructure landing page engineered for AI devtools and distributed cloud platforms.",
        "tags": ["DevTools", "Bento Grid", "Terminal UI", "Dark Mode"],
        "features": ["Live Terminal Emulation", "Interactive Bento Grid", "Comparison Matrix", "Performance Charts"],
        "accentColor": "from-emerald-500 to-cyan-500"
    },
    "ai-agency": {
        "title": "Aura AI Web Design Agency",
        "category": "Landing Pages",
        "badge": "Agency",
        "description": "Sleek creative agency showcase with dark mode aesthetic, smooth case study carousels, and conversion funnel.",
        "tags": ["Creative Agency", "Portfolio", "Next.js 15", "Tailwind v4"],
        "features": ["Case Study Showcase", "Service Offerings", "Interactive Testimonials", "Lead Capture Form"],
        "accentColor": "from-purple-500 to-indigo-500"
    },
    "magnetic-grid": {
        "title": "Magnetic Grid Interactive Hero",
        "category": "Hero & Motion",
        "badge": "Component",
        "description": "Mesmerizing interactive background grid with cursor-tracking magnetic physics and dynamic ambient illumination.",
        "tags": ["Hero Component", "Interactive Canvas", "Motion", "Tailwind"],
        "features": ["Cursor Magnetic Physics", "Dynamic Ambient Lighting", "Zero-Lag Frameloop", "Responsive Breakpoints"],
        "accentColor": "from-blue-500 to-indigo-600"
    },
    "clearnotes-hero": {
        "title": "ClearNotes Minimalist Hero",
        "category": "Hero & Motion",
        "badge": "Hero",
        "description": "Refined distraction-free hero section for modern productivity apps, note taking tools, and AI copilot software.",
        "tags": ["Productivity", "Minimalist", "Hero Section", "Next.js"],
        "features": ["Clean Typography Hierarchy", "Subtle Border Shimmers", "Floating Floating UI Badges", "Mobile Optimized"],
        "accentColor": "from-amber-500 to-orange-500"
    },
    "agentwrite-growth": {
        "title": "AgentWrite Conversion Engine",
        "category": "Landing Pages",
        "badge": "High-Converting",
        "description": "Persuasive sales copywriting SaaS landing page featuring pain-point breakdowns and sniffing test comparisons.",
        "tags": ["Marketing SaaS", "Copywriting", "Sales Funnel", "Conversion"],
        "features": ["Pain Point Highlighter", "Sniff Test Engine", "Feature Deep Dive", "Trust Metrics"],
        "accentColor": "from-rose-500 to-pink-500"
    },
    "agenwrite-enterprise": {
        "title": "AgenWrite Enterprise GEO",
        "category": "Landing Pages",
        "badge": "Enterprise",
        "description": "Enterprise-grade landing page with virtual team collaboration views, SEO architecture graphs, and scaling benchmarks.",
        "tags": ["Enterprise", "B2B SaaS", "Scalability", "Architecture"],
        "features": ["Virtual Team Topology", "SEO Engine Visualizer", "Global Scale Metrics", "Interactive Architecture"],
        "accentColor": "from-teal-500 to-emerald-600"
    },
    "create-studio": {
        "title": "Create Studio Media Landing",
        "category": "Landing Pages",
        "badge": "Creative",
        "description": "Vibrant and punchy landing page built for digital creators, podcasters, and video production studios.",
        "tags": ["Media", "Creators", "Video Studio", "Modern"],
        "features": ["Creator Portfolio Grid", "Audio/Video Showreel", "Tiered Membership", "Social Integrations"],
        "accentColor": "from-violet-500 to-fuchsia-500"
    },
    "creatorflow": {
        "title": "CreatorFlow Studio Platform",
        "category": "Landing Pages",
        "badge": "Workflow",
        "description": "Streamlined creator automation workflow landing page with dynamic timeline previews and multi-channel sync.",
        "tags": ["Automation", "Workflow", "Creator Economy", "SaaS"],
        "features": ["Timeline Automation Flow", "Channel Sync Metrics", "Integrations Grid", "Dark Neumorphism"],
        "accentColor": "from-blue-600 to-cyan-500"
    },
    "drawgle": {
        "title": "Drawgle Infinite Canvas",
        "category": "Landing Pages",
        "badge": "Collaborative",
        "description": "Collaborative digital whiteboard SaaS landing page with floating navigation, glassmorphic menus, and feature pins.",
        "tags": ["Whiteboard", "Collaboration", "Canvas", "Next.js"],
        "features": ["Floating Pill Navigation", "Interactive Canvas Preview", "Pain Point Comparison", "Realtime Sync Badges"],
        "accentColor": "from-yellow-400 to-orange-500"
    },
    "ecompin": {
        "title": "EcomPin Publishing Engine",
        "category": "Landing Pages",
        "badge": "E-Commerce",
        "description": "Aesthetic automated publishing engine for modern DTC brands, shopify stores, and visual merchandising teams.",
        "tags": ["E-Commerce", "Publishing", "Visual Merch", "Next.js 15"],
        "features": ["Automated Pin Scheduler", "Visual Catalog Generator", "Conversion Attribution", "Brand Presets"],
        "accentColor": "from-pink-500 to-rose-600"
    },
    "aligno-landing": {
        "title": "Aligno Team Alignment SaaS",
        "category": "Landing Pages",
        "badge": "Teamwork",
        "description": "Executive team alignment and OKR tracking platform with glowing cards, timeline milestones, and team pulse checks.",
        "tags": ["B2B SaaS", "OKRs", "Leadership", "Alignment"],
        "features": ["OKR Milestone Tracker", "Team Pulse Visualizer", "Executive Dashboard Preview", "Integration Matrix"],
        "accentColor": "from-indigo-500 to-violet-600"
    },
    "founder-pricing": {
        "title": "Metallic Founder Pricing Page",
        "category": "Pricing Pages",
        "badge": "Luxury UI",
        "description": "Stunning brushed-metal and iridescent luxury pricing cards with interactive billing toggles and tier comparisons.",
        "tags": ["Pricing Table", "Luxury Aesthetics", "Skeuomorphism", "Motion"],
        "features": ["Brushed Metal Gradient Cards", "Annual/Monthly Switcher", "Feature Comparison Matrix", "Interactive CTAs"],
        "accentColor": "from-slate-400 to-zinc-600"
    },
    "fundora-dashboard": {
        "title": "Fundora Investment Dashboard",
        "category": "Dashboards",
        "badge": "Fintech",
        "description": "Complete investment management dashboard with portfolio allocation graphs, dividend tracking, and asset breakdown.",
        "tags": ["Fintech", "Analytics", "Recharts", "Next.js 15"],
        "features": ["Interactive Portfolio Graphs", "Asset Allocation Donut", "Transaction History Table", "Quick Deposit Flow"],
        "accentColor": "from-emerald-500 to-teal-600"
    },
    "agenwrite-growth-engine": {
        "title": "AgenWrite Growth Engine",
        "category": "Landing Pages",
        "badge": "Growth SaaS",
        "description": "Comprehensive SaaS growth platform featuring ticker feeds, product showcase tabs, live examples, and winning systems.",
        "tags": ["Growth", "Viral Waitlist", "Showcase Tabs", "Interactive"],
        "features": ["Winning System Engine", "Live Customer Ticker", "Tabbed Product Walkthrough", "Viral Waitlist Component"],
        "accentColor": "from-blue-500 to-cyan-500"
    },
    "influence-hero": {
        "title": "Influence Brand Ambassador Hero",
        "category": "Hero & Motion",
        "badge": "Hero",
        "description": "High-energy influencer marketing hero section with floating social metric bubbles and creator verification pills.",
        "tags": ["Influencer", "Social Media", "Hero UI", "Motion"],
        "features": ["Floating Follower Badges", "Dynamic Brand Counter", "Micro-Interactions", "Mobile Stack Layout"],
        "accentColor": "from-purple-500 to-pink-500"
    },
    "intelligent-systems": {
        "title": "Intelligent Systems Autonomous AI",
        "category": "Landing Pages",
        "badge": "Autonomous AI",
        "description": "Cutting-edge autonomous agent infrastructure landing page with reactive neural nodes and real-time processing cards.",
        "tags": ["AI Agents", "Deep Tech", "Next.js 15", "Futuristic"],
        "features": ["Neural Node Grid", "Autonomous Execution Steps", "Telemetry Monitoring", "API Docs Snippet"],
        "accentColor": "from-cyan-400 to-blue-600"
    },
    "kinetik": {
        "title": "Kinetik Motion Typography SaaS",
        "category": "Landing Pages",
        "badge": "Design Tool",
        "description": "Dynamic landing page for web typography and kinetic animation software with bold type effects and sound-wave cues.",
        "tags": ["Typography", "Motion Design", "Creative SaaS", "Animation"],
        "features": ["Kinetic Type Effects", "Animation Presets Showcase", "Realtime Keyframe Timeline", "Export Options"],
        "accentColor": "from-red-500 to-rose-600"
    },
    "loomauth": {
        "title": "LoomAuth Next-Gen Auth Platform",
        "category": "Landing Pages",
        "badge": "Security",
        "description": "Developer-first authentication infrastructure landing page with biometric login previews, passkey flows, and SDK tabs.",
        "tags": ["Auth", "Cybersecurity", "Developer Tools", "Passkeys"],
        "features": ["Biometric Passkey Demo", "Multi-Language SDK Tabs", "Session Token Inspector", "Security Compliance Badges"],
        "accentColor": "from-emerald-400 to-green-600"
    },
    "lucid-ledger": {
        "title": "Lucid Ledger Crypto & Asset Dashboard",
        "category": "Dashboards",
        "badge": "Web3 / Finance",
        "description": "Dark-mode decentralized asset intelligence dashboard with live candlestick charts, liquidity metrics, and balance heatmaps.",
        "tags": ["Crypto", "DeFi Dashboard", "Recharts", "Next.js 15"],
        "features": ["Multi-Chain Liquidity Map", "Interactive Candlestick Chart", "Yield Aggregation Card", "Gas Tracker Widget"],
        "accentColor": "from-purple-500 to-cyan-500"
    },
    "minto-dashboard": {
        "title": "Minto Financial Ledger",
        "category": "Dashboards",
        "badge": "Fintech",
        "description": "Minimalist Scandinavian fintech dashboard with monthly spending projections, revenue run-rates, and invoice managers.",
        "tags": ["Fintech", "Expense Management", "Next.js", "Clean UI"],
        "features": ["Run-Rate Analytics", "Invoice Tracker Table", "Cash Flow Projections", "Clean Minimalist Theme"],
        "accentColor": "from-sky-500 to-blue-600"
    },
    "stripdo": {
        "title": "Stripdo Developer Payments Platform",
        "category": "Landing Pages",
        "badge": "Payments",
        "description": "Stripe-inspired developer billing and checkout orchestration platform with floating payment cards and code snippets.",
        "tags": ["Payments", "API Platform", "Fintech", "SaaS"],
        "features": ["Floating Credit Card Previews", "Interactive Terminal API", "Multi-Currency Matrix", "Fraud Shield Section"],
        "accentColor": "from-indigo-600 to-purple-600"
    },
    "nousu-saas": {
        "title": "Nousu Soft Gradient SaaS",
        "category": "Landing Pages",
        "badge": "Modern SaaS",
        "description": "Airy, soft aesthetic SaaS hero and features section with giant pink gradient containers and 3D typography styling.",
        "tags": ["SaaS Landing", "Soft Gradient", "3D Typography", "Next.js 15"],
        "features": ["Giant Gradient Card Container", "Overlapping Chat Mockup", "3D Typography Ribbon Logo", "Customer Social Proof"],
        "accentColor": "from-pink-400 to-rose-400"
    },
    "portfolio-hero": {
        "title": "Dynamic Developer Portfolio Hero",
        "category": "Hero & Motion",
        "badge": "Portfolio",
        "description": "Interactive personal portfolio hero with live digital clock, floating project card deck, and ambient lighting.",
        "tags": ["Portfolio", "Project Deck", "Motion", "Next.js 15"],
        "features": ["Live Local Time Clock", "3D Project Deck Card Flip", "Status Pill Indicators", "Keyboard Shortcuts"],
        "accentColor": "from-amber-400 to-orange-600"
    },
    "premium-bento": {
        "title": "Aura Premium Bento Grid",
        "category": "Bento Grids",
        "badge": "Bento Grid",
        "description": "Modern bento grid showcase with dynamic hover cards, glow borders, and integrated analytics micro-widgets.",
        "tags": ["Bento Grid", "UI Components", "Next.js 15", "Dark Mode"],
        "features": ["Responsive Bento Layout", "Glow-on-Hover Borders", "Embedded Micro-Charts", "Custom Icon Badges"],
        "accentColor": "from-violet-500 to-indigo-600"
    },
    "apex-dashboard": {
        "title": "Apex Analytics Command Center",
        "category": "Dashboards",
        "badge": "Analytics",
        "description": "High-performance enterprise analytics command center with interactive revenue charts, conversion funnels, and system telemetry.",
        "tags": ["Enterprise", "Analytics", "Command Center", "Next.js 15"],
        "features": ["Top Metrics KPI Strip", "Multi-Series Performance Chart", "Realtime Conversion Funnel", "User Activity Feed"],
        "accentColor": "from-blue-500 to-indigo-700"
    },
    "motion-bento": {
        "title": "HyperMotion Bento Grid Showcase",
        "category": "Bento Grids",
        "badge": "Motion",
        "description": "High-end bento grid featuring fluid Framer Motion animations, expanding modal cards, and interactive sliders.",
        "tags": ["Motion Bento", "Framer Motion", "Interactive", "Next.js 15"],
        "features": ["Fluid Card Stagger Transitions", "Expanding Detail Drawers", "Micro-Interactions", "Subtle Grain Texture"],
        "accentColor": "from-fuchsia-500 to-purple-600"
    },
    "quick-14-studio": {
        "title": "Quick 14 High-Converting Studio",
        "category": "Landing Pages",
        "badge": "Full Kit",
        "description": "Complete agency landing page with grid background, problem-solution sections, tiered pricing, and FAQ accordion.",
        "tags": ["Agency", "Full Landing", "Conversion Focused", "Tailwind"],
        "features": ["Geometric Grid Background", "Problem vs Solution Section", "Comprehensive Pricing Tiers", "Collapsible FAQ"],
        "accentColor": "from-emerald-500 to-green-600"
    },
    "refind-ai": {
        "title": "Refind Document AI Copilot",
        "category": "Landing Pages",
        "badge": "AI Copilot",
        "description": "Smart document workspace and AI reading copilot landing page with rich text highlights, markdown preview, and chat sidebar.",
        "tags": ["Document AI", "Knowledge Base", "Motion", "Productivity"],
        "features": ["Interactive Document Editor", "Live AI Summary Sidebar", "Format Toolbar Controls", "Speed Reading Metrics"],
        "accentColor": "from-blue-400 to-cyan-500"
    },
    "pfp-ai": {
        "title": "PFP AI Studio & Avatar Engine",
        "category": "Landing Pages",
        "badge": "Consumer AI",
        "description": "Modern photo generator and AI avatar maker landing page with before-and-after photo comparisons and prompt pills.",
        "tags": ["Avatar AI", "Photo Studio", "Consumer App", "React"],
        "features": ["Before / After Photo Slider", "Style Preset Selector", "One-Click Generation Demo", "High-Resolution Export"],
        "accentColor": "from-purple-500 to-pink-500"
    },
    "scale-ai-hero": {
        "title": "Scale AI Foundation Hero UI",
        "category": "Hero & Motion",
        "badge": "Enterprise AI",
        "description": "Grand enterprise hero section featuring smooth parallax scrolling, high-fidelity imagery, and interactive mobile drawer.",
        "tags": ["Enterprise AI", "Hero Section", "Smooth Scroll", "Vite"],
        "features": ["High-Res Hero Mockup", "Slide-in Mobile Navigation", "Interactive Callout Badges", "Custom Typography"],
        "accentColor": "from-blue-600 to-indigo-700"
    },
    "sequence-dashboard": {
        "title": "Sequence Studio Outreach Dashboard",
        "category": "Dashboards",
        "badge": "Sales SaaS",
        "description": "Calm, matte-designed sales outreach dashboard for managing automated email cadences, reply tracking, and lead stages.",
        "tags": ["Sales SaaS", "Outreach", "Email Sequences", "Next.js 15"],
        "features": ["Cadence Pipeline Stages", "Open & Reply Rate Tracker", "Matte Glassmorphic Cards", "Quick Lead Action Bar"],
        "accentColor": "from-amber-500 to-yellow-600"
    },
    "skywrite-ai": {
        "title": "SkyWrite AI SEO Copywriter",
        "category": "Landing Pages",
        "badge": "Content AI",
        "description": "AI-powered blog & article writer landing page optimized for search engines with live generation sandbox and process stepper.",
        "tags": ["SEO Content", "Copywriting", "AI Generator", "SaaS"],
        "features": ["Live Prompt Sandbox Demo", "3-Step Workflow Stepper", "SEO Readiness Checklist", "Transparent Pricing"],
        "accentColor": "from-sky-400 to-indigo-600"
    },
    "thinking-orbs": {
        "title": "Thinking Orbs AI State Visualizer",
        "category": "Hero & Motion",
        "badge": "Interactive",
        "description": "Animated thinking orb loading indicators and agent states with multiple hand-tuned orbits, sizes, and theme toggles.",
        "tags": ["AI Visualizer", "Canvas Animation", "Orb Physics", "Component"],
        "features": ["Working / Searching / Solving States", "Dynamic Orb Physics", "Dark & Light Theme Support", "Custom Size Controls"],
        "accentColor": "from-cyan-400 to-fuchsia-500"
    },
    "retro-camera": {
        "title": "Polaroid Retro AI Studio",
        "category": "Landing Pages",
        "badge": "Creative AI",
        "description": "Playful vintage AI camera landing page with Polaroid frames, masking tape skeuomorphism, and retro photo effects.",
        "tags": ["Retro Skeuomorphism", "Polaroid", "Photography", "Creative"],
        "features": ["Skeuomorphic Tape & Polaroid", "Retro Filter Presets", "Photo Transformation Showcase", "Playful Audio Cues"],
        "accentColor": "from-amber-600 to-rose-600"
    },
    "vertical-motion": {
        "title": "Velocity Vertical Parallax SaaS",
        "category": "Landing Pages",
        "badge": "Parallax",
        "description": "Immersive vertical scroll landing page with multi-layer parallax depths, sticky feature cards, and motion reveals.",
        "tags": ["Parallax Motion", "Sticky Scroll", "Animation", "Modern"],
        "features": ["Vertical Parallax Sections", "Sticky Scroll Container", "Smooth Spring Transitions", "Performance Optimized"],
        "accentColor": "from-violet-600 to-purple-800"
    }
}

templates_list = []

for item in raw_summary:
    slug = item["slug"]
    curated = CURATED_DETAILS.get(slug, {})
    
    title = curated.get("title") or item["title"]
    category = curated.get("category") or item["category"]
    badge = curated.get("badge") or "Template"
    description = curated.get("description") or item["description"]
    tags = curated.get("tags") or ["Next.js", "Tailwind CSS", "React"]
    features = curated.get("features") or ["Fully Responsive", "Clean Code", "Modern Design"]
    accent_color = curated.get("accentColor") or "from-indigo-500 to-purple-600"

    DARK_SLUGS = [
        "agenwrite-geo", "agenwrite-enterprise", "agenwrite-growth-engine", "agentwrite-growth",
        "ai-agency", "aligno-landing", "apex-dashboard", "create-studio", "creatorflow",
        "intelligent-systems", "kinetik", "loomauth", "lucid-ledger", "magnetic-grid",
        "minto-dashboard", "motion-bento", "pfp-ai", "portfolio-hero", "premium-bento",
        "scale-ai-hero", "sequence-dashboard", "stripdo", "thinking-orbs", "vertical-motion"
    ]
    default_theme = "dark" if slug in DARK_SLUGS else "light"

    templates_list.append({
        "slug": slug,
        "title": title,
        "category": category,
        "defaultTheme": default_theme,
        "badge": badge,
        "description": description,
        "tags": tags,
        "features": features,
        "accentColor": accent_color,
        "downloadUrl": f"/downloads/{slug}.zip",
        "previewUrl": f"/preview/{slug}",
        "demoUrl": f"/demo/{slug}",
        "detailUrl": f"/template/{slug}"
    })

# Write src/data/templates.ts
ts_code = f"""export interface TemplateItem {{
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
}}

export const CATEGORIES = [
  'All',
  'Landing Pages',
  'Dashboards',
  'Hero & Motion',
  'Bento Grids',
  'Pricing Pages',
] as const;

export type CategoryType = (typeof CATEGORIES)[number];

export const TEMPLATES: TemplateItem[] = {json.dumps(templates_list, indent=2)};

export function getTemplateBySlug(slug: string): TemplateItem | undefined {{
  return TEMPLATES.find((t) => t.slug === slug);
}}
"""

with open(os.path.join(DATA_DIR, "templates.ts"), "w", encoding="utf-8") as f:
    f.write(ts_code)

print(f"Generated src/data/templates.ts with {len(templates_list)} templates!")
