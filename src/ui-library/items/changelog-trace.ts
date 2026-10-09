import type { UiItem } from '../registry';

export const changelogTrace: UiItem = {
  name: 'changelog-trace',
  title: 'Changelog trace',
  description: 'What shipped, routed like a circuit: the line steps aside between releases, and a bead runs down it as you read.',
  summary:
    'The straight rail is the changelog everyone has. Here the line is a trace: it runs straight through each release and steps aside in the space between, with rounded bends, like a track on a circuit board. As you scroll, a bead runs down it a beat behind the page, takes every bend, and fills each release’s dot as it gets there. Filter to New, Improved or Fixed and the releases that don’t match fold away while the trace re-routes around them, each step flattening as its gap closes. Entries rise out of a light blur the first time they come into view, older releases wait behind "Show 3 older", and every release has an anchor you can link to.',
  file: 'changelog-trace.tsx',
  dependencies: [],
  registryDependencies: ['number-roll', 'text-morph'],
  css: [],
  states: [
    { name: 'read', description: 'The drawn part of the trace follows a point 55% of the way down the screen, easing toward it (120ms time constant) so it trails your scroll slightly instead of being nailed to it.' },
    { name: 'bead', description: 'A 5px bead rides the tip of the drawn line through every 45° bend; a dot’s centre fills (420ms, slight overshoot) and its ring darkens when the bead reaches it. The bead fades out at either end of the trace.' },
    { name: 'filter', description: 'The pill is thrown to the chosen tag (460ms); releases without it fold to nothing (480ms) and the trace is re-laid every frame of the fold, so its steps shrink and the bends close up with them. The count rolls.' },
    { name: 'arrive', description: 'Each release rises 14px out of a 4px blur (700ms) the first time it scrolls into view.' },
    { name: 'older', description: 'Beyond initialCount, releases fold open on "Show 3 older", whose label morphs to "Show fewer"; the trace grows down into them.' },
  ],
  usage: `import { ChangelogTrace } from "@/components/changelog-trace";

<ChangelogTrace
  entries={[
    { id: "shift-planner", date: "2026-10-06", version: "v2.8", title: "Shift planner", tags: ["new"], body: <p>Drag shifts onto the week…</p> },
    { id: "receipt-fix", date: "2026-09-15", version: "v2.6.4", title: "Receipts print the right shop name", tags: ["fixed"] },
  ]}
/>`,
  recipeTitle: 'From Markdown files',
  recipeIntro: 'Keep one file per release and render them into the trace on a /changelog page.',
  recipe: `import { ChangelogTrace } from "@/components/changelog-trace";
import { getReleases } from "@/lib/releases"; // reads content/changelog/*.mdx

export default async function ChangelogPage() {
  const releases = await getReleases();
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="mb-12 text-5xl font-medium tracking-[-0.04em]">Changelog</h1>
      <ChangelogTrace
        initialCount={8}
        entries={releases.map((r) => ({ id: r.slug, date: r.date, version: r.version, title: r.title, tags: r.tags, body: <r.Content /> }))}
      />
    </main>
  );
}`,
  props: [
    { name: 'entries', type: 'ChangelogEntry[]', description: 'Newest first: id (its anchor), date, title, and any of version, tags, body, media.' },
    { name: 'initialCount', type: 'number', default: '4', description: 'How many show before "Show older".' },
    { name: 'filters', type: '{ tag; label }[]', description: 'The switch’s options; by default the tags found in the entries (new, improved and fixed get their own labels and tints).' },
    { name: 'locales', type: 'string | string[]', default: '"en-GB"', description: 'How dates read.' },
  ],
  notes: [
    'An ordered list of articles with real <time> elements; each title links to its own anchor. The trace and bead are decoration and hidden from assistive tech.',
    'The filter is a radio group (arrow keys move); the count of updates is announced politely when it changes.',
    'Folded releases are inert and hidden from assistive tech.',
    'The trace is one SVG path laid out from where the dots sit. Scrolling writes its dash offset and the bead’s position straight to the SVG, once a frame, only while the timeline is on screen and only until the bead catches up; React re-renders only when a dot lights.',
    'Installs Number roll and Text morph. With reduced motion the line keeps pace with the scroll exactly and nothing slides.',
  ],
};
