'use client';

import React from 'react';
import { DiffReview, type DiffChange } from '../registry/diff-review';

const TEXT: DiffChange[] = [
  {
    id: 'intro',
    label: 'Paragraph 1',
    before: 'Our onboarding is honestly really good, but a lot of new users just don’t make it past the first screen.',
    after: 'Our onboarding is strong, but many new users never get past the first screen.',
  },
  {
    id: 'plan',
    label: 'Paragraph 2',
    before: 'In order to fix that, we basically need to make sure the first prompt actually does something useful.',
    after: 'To fix that, the first prompt has to do something useful within seconds.',
  },
  {
    id: 'close',
    label: 'Closing line',
    before: 'Let me know what you think about this.',
    after: 'Thoughts by Friday?',
  },
];

const CODE: DiffChange[] = [
  {
    id: 'fetch',
    label: 'lib/answers.ts',
    before: `export async function getAnswer(id: string) {
  const res = await fetch(\`/api/answers/\${id}\`);
  return res.json();
}`,
    after: `export async function getAnswer(id: string) {
  const res = await fetch(\`/api/answers/\${id}\`);
  if (!res.ok) throw new Error(\`Answer \${id}: \${res.status}\`);
  return res.json();
}`,
  },
  {
    id: 'retry',
    label: 'lib/retry.ts',
    before: `const DELAY = 1000;
const TRIES = 5;`,
    after: `const DELAY = 500;
const TRIES = 3;`,
  },
];

export default function DiffReviewDemo({ tab = 'Text' }: { tab?: string }) {
  return (
    <div className="w-full max-w-[520px]">
      {tab === 'Code' ? <DiffReview key="code" mode="lines" changes={CODE} title="Suggested fixes" /> : <DiffReview key="text" changes={TEXT} />}
    </div>
  );
}
