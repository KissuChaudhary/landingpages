import type { MetadataRoute } from 'next';
import { TEMPLATES } from '@/data/templates';
import { TEMPLATE_DETAILS } from '@/data/template-details';
import { absoluteUrl } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const updates = TEMPLATES.map((t) => TEMPLATE_DETAILS[t.slug]?.updated).filter(Boolean).sort();
  const latest = updates[updates.length - 1];

  return [
    { url: absoluteUrl('/'), lastModified: latest, changeFrequency: 'weekly', priority: 1 },
    ...TEMPLATES.map((t) => ({
      url: absoluteUrl(t.detailUrl),
      lastModified: TEMPLATE_DETAILS[t.slug]?.updated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [absoluteUrl(`/og/${t.slug}.jpg`)],
    })),
  ];
}
