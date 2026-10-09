import { UI_ITEMS } from '@/ui-library/registry';
import { USED_IN } from '@/ui-library/used-in';
import { TEMPLATES } from '@/data/templates';
import { TEMPLATE_DETAILS, shortKind } from '@/data/template-details';

/** Built on the server and handed to the header, sidebar and search as plain data, so the client never loads the docs. */

export type NavComponent = { name: string; title: string; description: string; isNew: boolean; templates: number };
export type SearchEntry = { id: string; label: string; group: string; href: string; description?: string; keywords?: string[] };

/** Components that carry a "New" badge in the sidebar and on the index. */
export const NEW_COMPONENTS = ['changelog-trace', 'changelog-scrubber'];

export const navComponents = (): NavComponent[] =>
  UI_ITEMS.map((i) => ({
    name: i.name,
    title: i.title,
    description: i.description,
    isNew: NEW_COMPONENTS.includes(i.name),
    templates: USED_IN[i.name]?.length ?? 0,
  }));

export const searchEntries = (): SearchEntry[] => [
  { id: 'page-components', label: 'All components', group: 'Pages', href: '/ui', description: `${UI_ITEMS.length} free React components` },
  { id: 'page-templates', label: 'All templates', group: 'Pages', href: '/#catalog', description: `${TEMPLATES.length} Next.js templates` },
  { id: 'page-pricing', label: 'Pricing', group: 'Pages', href: '/#pricing', keywords: ['all-access', 'buy', 'license'] },
  { id: 'page-faq', label: 'FAQ', group: 'Pages', href: '/#faq', keywords: ['questions', 'help'] },
  ...UI_ITEMS.map((i) => ({
    id: `component-${i.name}`,
    label: i.title,
    group: 'Components',
    href: `/ui/${i.name}`,
    keywords: [i.name.replace(/-/g, ' ')],
  })),
  ...TEMPLATES.flatMap((t) => {
    const d = TEMPLATE_DETAILS[t.slug];
    return d ? [{ id: `template-${t.slug}`, label: d.name, group: 'Templates', href: t.detailUrl, description: shortKind(d), keywords: t.tags }] : [];
  }),
];
