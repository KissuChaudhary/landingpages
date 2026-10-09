// Regenerates src/ui-library/items/index.ts and src/ui-library/demos/index.ts in the order /ui shows components,
// and src/ui-library/used-in.ts from the templates that ship and import components (see the end of this file).
//
//   node scripts/ui-library/register.mjs        (run from the repo root)
//
// A component is registered once all three of its files exist:
//   src/ui-library/registry/<name>.tsx   the installable component
//   src/ui-library/items/<name>.ts       its docs entry (export name = camelCase of <name>)
//   src/ui-library/demos/<name>-demo.tsx its live demo (default export, receives { tab })
// To add one, put its name in ORDER where it should appear on /ui, then run this.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const ORDER = [
  // Landing interactions and the shared primitives they use
  'text-morph', 'status-button', 'number-roll', 'pricing-toggle', 'waitlist-field', 'morphing-nav',
  'feature-tabs', 'stats-band', 'announcement-pill', 'testimonials', 'faq-accordion', 'logo-marquee',
  'command-palette', 'toast-stack', 'theme-toggle', 'pricing-calculator', 'comparison-table', 'onboarding-checklist',
  'changelog-timeline', 'changelog-trace', 'changelog-scrubber', 'cookie-banner', 'newsletter-footer',
  // Product UI: asking
  'prompt-composer', 'agent-composer', 'mention-menu', 'attachment-chip', 'mode-switcher', 'model-picker', 'voice-input',
  // Product UI: while the agent works
  'thinking-indicator', 'thinking-trace', 'tool-call', 'clarifying-question', 'approval-card', 'plan',
  'web-research', 'command-output', 'task-progress', 'task-log',
  // Product UI: the answer and after
  'streaming-answer', 'code-block', 'citation', 'response-versions', 'selection-actions', 'diff-review',
  'action-receipt', 'chat-notice', 'usage-meter', 'usage-limits',
  // Product UI: around the chat
  'chat-scroll', 'message-edit', 'chat-history',
  // Dashboard: charts and cards
  'earnings-chart', 'steps-chart', 'revenue-chart', 'area-chart', 'combo-chart', 'stage-bars', 'activity-rings',
  // Playback: the product components, playing on their own
  'agent-playback',
];

const root = path.join(process.cwd(), 'src', 'ui-library');
const camel = (n) => n.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const pascal = (n) => camel(n).replace(/^./, (c) => c.toUpperCase());

const ready = ORDER.filter((n) =>
  [`registry/${n}.tsx`, `items/${n}.ts`, `demos/${n}-demo.tsx`].every((f) => existsSync(path.join(root, f)))
);
const missing = ORDER.filter((n) => !ready.includes(n));

writeFileSync(
  path.join(root, 'items', 'index.ts'),
  `import type { UiItem } from '../registry';
${ready.map((n) => `import { ${camel(n)} } from './${n}';`).join('\n')}

/** Order within each group is the order on /ui. */
export const items: UiItem[] = [${ready.map(camel).join(', ')}];
`
);

writeFileSync(
  path.join(root, 'demos', 'index.ts'),
  `'use client';

import type React from 'react';
${ready.map((n) => `import ${pascal(n)}Demo from './${n}-demo';`).join('\n')}

/** Live demo for each registry item, keyed by its registry name. Each receives the selected preview tab. */
export const UI_DEMOS: Record<string, React.ComponentType<{ tab?: string }>> = {
${ready.map((n) => `  '${n}': ${pascal(n)}Demo,`).join('\n')}
};
`
);

// Which templates use which component, and where. A template uses a component when it ships the file in
// next-templates/<template>/components/hairline/ and a section imports it; the section's file name says where.
const templatesDir = path.join(process.cwd(), 'next-templates');
const WHERE = { FinalCta: 'Sign-up', PricingPlans: 'Pricing', Membership: 'Pricing', ShotSelector: 'Shot selector' };
const where = (file) => WHERE[file] ?? file.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/ (\w)/g, (_, c) => ` ${c.toLowerCase()}`);
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (['node_modules', '.next', 'out', 'hairline'].includes(e.name)) return [];
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full) : e.name.endsWith('.tsx') ? [full] : [];
  });
const usedIn = {};
for (const template of existsSync(templatesDir) ? readdirSync(templatesDir).sort() : []) {
  const shipped = path.join(templatesDir, template, 'components', 'hairline');
  if (!existsSync(shipped)) continue;
  const names = readdirSync(shipped).filter((f) => f.endsWith('.tsx')).map((f) => f.replace(/\.tsx$/, ''));
  for (const file of walk(path.join(templatesDir, template))) {
    const text = readFileSync(file, 'utf8');
    for (const name of names) {
      if (!text.includes(`components/hairline/${name}"`)) continue;
      const entry = { template, where: where(path.basename(file, '.tsx')) };
      usedIn[name] ??= [];
      if (!usedIn[name].some((u) => u.template === entry.template && u.where === entry.where)) usedIn[name].push(entry);
    }
  }
}

const usedInLines = Object.entries(usedIn).flatMap(([name, uses]) => [
  `  '${name}': [`,
  ...uses.map((u) => `    { template: '${u.template}', where: '${u.where}' },`),
  '  ],',
]);
writeFileSync(
  path.join(root, 'used-in.ts'),
  `// Generated by scripts/ui-library/register.mjs from next-templates/*/components/hairline: do not edit.

/** The templates that use each component, and the section it's in. */
export const USED_IN: Record<string, { template: string; where: string }[]> = {
${usedInLines.join('\n')}
};
`
);

console.log(`registered ${ready.length}${missing.length ? ` (not yet complete: ${missing.join(', ')})` : ''}`);
console.log(`in templates: ${Object.entries(usedIn).map(([n, u]) => `${n} ×${u.length}`).join(', ') || 'none'}`);
