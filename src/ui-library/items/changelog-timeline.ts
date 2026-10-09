import type { UiItem } from '../registry';

export const changelogTimeline: UiItem = {
  name: 'changelog-timeline',
  title: 'Changelog timeline',
  description: 'What shipped, drawn as you read: a rail that fills, dots that light, filters that fold the rest away.',
  summary:
    'A changelog is proof that a product is alive, and most read like a log file. Here a hairline rail runs down the page and fills as you scroll, and each release’s dot fills as the line reaches it, so reading feels like moving through time. Entries rise out of a light blur the first time they come into view. All, New, Improved and Fixed sit in a switch whose pill is thrown to the choice; releases that don’t match fold away and the count rolls. Older releases wait behind "Show 6 older", which folds them open and morphs to "Show fewer". Every release has an anchor, so you can link to it.',
  file: 'changelog-timeline.tsx',
  dependencies: [],
  registryDependencies: ['number-roll', 'text-morph'],
  css: [],
  states: [
    { name: 'read', description: 'The line fills the rail to 55% of the way down the screen as you scroll; a dot’s centre fills (420ms, slight overshoot) and its ring darkens as the line passes it. It only listens while the timeline is on screen.' },
    { name: 'arrive', description: 'Each release rises 14px out of a 4px blur (700ms) the first time it scrolls into view.' },
    { name: 'filter', description: 'The pill is thrown to the chosen tag (460ms); releases without it fold to nothing (480ms) and the count rolls.' },
    { name: 'older', description: 'Beyond initialCount, releases fold open on "Show 6 older", whose label morphs to "Show fewer".' },
  ],
  usage: `import { ChangelogTimeline } from "@/components/changelog-timeline";

<ChangelogTimeline
  entries={[
    { id: "shift-planner", date: "2026-10-06", version: "v2.8", title: "Shift planner", tags: ["new"], body: <p>Drag shifts onto the week…</p> },
    { id: "receipt-fix", date: "2026-09-15", version: "v2.6.4", title: "Receipts print the right shop name", tags: ["fixed"] },
  ]}
/>`,
  recipeTitle: 'From Markdown files',
  recipeIntro: 'Keep one file per release and render them into the timeline on a /changelog page.',
  recipe: `import { ChangelogTimeline } from "@/components/changelog-timeline";
import { getReleases } from "@/lib/releases"; // reads content/changelog/*.mdx

export default async function ChangelogPage() {
  const releases = await getReleases();
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="mb-12 text-5xl font-medium tracking-[-0.04em]">Changelog</h1>
      <ChangelogTimeline
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
    'An ordered list of articles with real <time> elements; each title links to its own anchor.',
    'The filter is a radio group (arrow keys move); the count of updates is announced politely when it changes.',
    'Folded releases are inert and hidden from assistive tech.',
    'The scroll listener is passive, throttled to one update a frame and only active while the timeline is on screen.',
    'Installs Number roll and Text morph. With reduced motion, releases are simply there and nothing slides.',
  ],
};
