import { readFileSync } from 'node:fs';
import path from 'node:path';
import { UI_CSS, UI_ITEMS, UI_NAME, UI_REGISTRY_NAME } from '@/ui-library/registry';
import { absoluteUrl } from '@/data/site';

/**
 * shadcn registry, built from the component sources at build time.
 *   /r/registry.json        the index
 *   /r/<name>.json          one installable item:  npx shadcn@latest add https://…/r/<name>.json
 */

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ name: 'registry.json' }, ...UI_ITEMS.map((item) => ({ name: `${item.name}.json` }))];
}

const source = (file: string) => readFileSync(path.join(process.cwd(), 'src', 'ui-library', 'registry', file), 'utf8');

export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;

  if (name === 'registry.json') {
    return Response.json({
      $schema: 'https://ui.shadcn.com/schema/registry.json',
      name: UI_REGISTRY_NAME,
      homepage: absoluteUrl('/ui'),
      items: UI_ITEMS.map((item) => ({
        name: item.name,
        type: 'registry:component',
        title: item.title,
        description: item.description,
        dependencies: item.dependencies,
        files: [{ path: `registry/${item.file}`, type: 'registry:component' }],
        css: UI_CSS,
      })),
    });
  }

  const item = UI_ITEMS.find((i) => `${i.name}.json` === name);
  if (!item) return new Response('Not found', { status: 404 });

  return Response.json({
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: item.name,
    type: 'registry:component',
    title: item.title,
    description: item.description,
    author: UI_NAME,
    dependencies: item.dependencies,
    files: [{ path: `registry/${item.file}`, type: 'registry:component', content: source(item.file) }],
    css: UI_CSS,
    docs: `Docs and live preview: ${absoluteUrl(`/ui/${item.name}`)}`,
  });
}
