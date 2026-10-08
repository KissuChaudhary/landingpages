// Regenerates src/ui-library/items/index.ts and src/ui-library/demos/index.ts in the order /ui shows components.
//
//   node scripts/ui-library/register.mjs        (run from the repo root)
//
// A component is registered once all three of its files exist:
//   src/ui-library/registry/<name>.tsx   the installable component
//   src/ui-library/items/<name>.ts       its docs entry (export name = camelCase of <name>)
//   src/ui-library/demos/<name>-demo.tsx its live demo (default export, receives { tab })
// To add one, put its name in ORDER where it should appear on /ui, then run this.
import { existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const ORDER = [
  // Landing interactions and the shared primitives they use
  'text-morph', 'status-button', 'number-roll', 'pricing-toggle', 'waitlist-field', 'morphing-nav',
  'feature-tabs', 'stats-band', 'announcement-pill', 'testimonials', 'faq-accordion', 'logo-marquee',
  // Product UI: asking
  'prompt-composer', 'mention-menu', 'attachment-chip', 'mode-switcher', 'model-picker', 'voice-input',
  // Product UI: while the agent works
  'thinking-indicator', 'thinking-trace', 'tool-call', 'clarifying-question', 'approval-card', 'plan',
  'web-research', 'command-output', 'task-progress',
  // Product UI: the answer and after
  'streaming-answer', 'code-block', 'citation', 'response-versions', 'selection-actions', 'diff-review',
  'action-receipt', 'chat-notice', 'usage-meter',
  // Product UI: around the chat
  'chat-scroll', 'message-edit', 'chat-history',
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

console.log(`registered ${ready.length}${missing.length ? ` (not yet complete: ${missing.join(', ')})` : ''}`);
