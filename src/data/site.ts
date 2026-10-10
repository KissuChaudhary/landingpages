export const SITE_NAME = 'Hairline UI';

/**
 * Absolute origin for canonical URLs, Open Graph images, the sitemap and structured data.
 * Set by NEXT_PUBLIC_SITE_URL at build time: on Cloudflare it's a build variable of the Worker (the build fails
 * without it, see next.config.ts). Defaults to the public site outside that build environment.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hairlineui.com';

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
