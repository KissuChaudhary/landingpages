export const SITE_NAME = 'Hairline UI';

/**
 * Absolute origin for canonical URLs, Open Graph images, the sitemap and structured data.
 * Set NEXT_PUBLIC_SITE_URL once you have a custom domain; until then Vercel's production URL is used.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '');

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
