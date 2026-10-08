import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/data/site';

export default function robots(): MetadataRoute.Robots {
  return {
    // Demo exports are made-up brands (Ferry, Cinder...) and the demo viewer is a frame around them:
    // keep them out of the index so search lands on the template pages instead.
    rules: { userAgent: '*', allow: '/', disallow: ['/demos/', '/demo/', '/preview/'] },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
