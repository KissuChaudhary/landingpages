import type { NextConfig } from "next";

// Old template slugs that now live under a new name
const RENAMED_TEMPLATES: Record<string, string> = {
  'unreal-shot': 'stillform',
  'quick-14-studio': 'fourteen',
  'influence-hero': 'influence',
};

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
  eslint: {
    ignoreDuringBuilds: true,
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
