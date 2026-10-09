export const SITE_NAME = 'Hairline UI';

/**
 * Absolute origin for canonical URLs, Open Graph images, the sitemap and structured data.
 * Set by NEXT_PUBLIC_SITE_URL at build time: on Cloudflare it's a build variable of the Worker (the build fails
 * without it, see next.config.ts). Vercel's production URL is the fallback while the site is still there too.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '');

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
