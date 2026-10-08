import type { MetadataRoute } from 'next';
import { TEMPLATES } from '@/data/templates';
import { TEMPLATE_DETAILS } from '@/data/template-details';
import { absoluteUrl } from '@/data/site';
import { UI_ITEMS } from '@/ui-library/registry';

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
    { url: absoluteUrl('/ui'), changeFrequency: 'weekly', priority: 0.8 },
    ...UI_ITEMS.map((item) => ({ url: absoluteUrl(`/ui/${item.name}`), changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
