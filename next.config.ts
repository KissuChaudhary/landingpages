import type { NextConfig } from "next";

// Old template slugs that now live under a new name
const RENAMED_TEMPLATES: Record<string, string> = {
  'unreal-shot': 'stillform',
  'quick-14-studio': 'fourteen',
  'influence-hero': 'influence',
};

// Cloudflare's builds have no production URL of their own: without this, canonical links, the sitemap and the
// install commands on /ui would all point at localhost.
if (process.env.WORKERS_CI && !process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error("Set NEXT_PUBLIC_SITE_URL in the Worker's build variables (Settings > Build > Variables and secrets).");
}

const nextConfig: NextConfig = {
  // lets a second dev server run side by side without sharing (and corrupting) .next
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      { source: '/demos/vela', destination: '/demos/vela/index.html' },
      { source: '/demos/vela/contact', destination: '/demos/vela/contact.html' },
    ];
  },
  async redirects() {
    return Object.entries(RENAMED_TEMPLATES).flatMap(([from, to]) =>
      ['template', 'demo', 'preview'].map((route) => ({
        source: `/${route}/${from}`,
        destination: `/${route}/${to}`,
        permanent: true,
      }))
    );
  },
};

export default nextConfig;
