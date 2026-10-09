import type { UiItem } from '../registry';

export const changelogScrubber: UiItem = {
  name: 'changelog-scrubber',
  title: 'Changelog scrubber',
  description: 'Your release history on a ruler you scrub: drag the playhead, or press play and watch the product ship.',
  summary:
    'A changelog is a timeline, so this one works like a video editor’s. Releases sit on a hairline ruler of days, oldest on the left, and the playhead carries the version it’s on. Drag it and the ticks swell under it like a lens, the version morphs from v2.7 to v2.7.2 to v2.8, and the card below changes to the nearest release: the date and tag morph, the count rolls, and the release slides in from the side you dragged toward while the card eases to its new height. Let go, click anywhere on the ruler or press an arrow key and the playhead is thrown onto a release. Press play and the history plays back at the pace it actually shipped. Nothing listens to the page’s scroll, and a frame of scrubbing is a single style write, so it stays smooth on a phone.',
  file: 'changelog-scrubber.tsx',
  dependencies: [],
  registryDependencies: ['number-roll', 'text-morph'],
  css: [],
  states: [
    { name: 'scrub', description: 'The playhead follows the pointer exactly. Ticks within 7% of the ruler either side swell up to 2.6× (release marks 1.45×) on a smooth falloff, and the card switches to the nearest release as you cross the midpoint between two.' },
    { name: 'settle', description: 'On release, a click or an arrow key, the playhead is thrown onto the release (520ms, slight overshoot) and its mark darkens.' },
    { name: 'change', description: 'The version on the playhead, the date and the tag morph letter by letter, "3 of 7" rolls, and the release slides 24px in from the side the playhead moved toward through a 6px blur (460ms) while the old one leaves the other way. The card’s height eases to the new release (460ms).' },
    { name: 'play', description: 'The playhead runs from where it is to the latest release at one speed (1.2s a release on average), so a busy week flicks past and a quiet month takes its time. Play from the end starts again at the first release. The icon blurs between play and pause.' },
    { name: 'hover', description: 'With a mouse, a faint line shows where a click would land.' },
  ],
  usage: `import { ChangelogScrubber } from "@/components/changelog-scrubber";

<ChangelogScrubber
  entries={[
    { id: "shift-planner", date: "2026-10-06", version: "v2.8", title: "Shift planner", tags: ["new"], body: <p>Drag shifts onto the week…</p> },
    { id: "receipt-fix", date: "2026-09-15", version: "v2.6.4", title: "Receipts print the right shop name", tags: ["fixed"] },
  ]}
/>`,
  recipeTitle: 'As a "What’s new" section',
  recipeIntro: 'Put the last few releases on the landing page, opened on the latest, and link through to the full changelog.',
  recipe: `import { ChangelogScrubber } from "@/components/changelog-scrubber";
import { getReleases } from "@/lib/releases"; // reads content/changelog/*.mdx

export async function WhatsNew() {
  const releases = await getReleases();
  return (
    <section className="mx-auto max-w-2xl px-6 py-24">
      <h2 className="mb-10 text-4xl font-medium tracking-[-0.04em]">What’s new</h2>
      <ChangelogScrubber
        entries={releases.slice(0, 12).map((r) => ({ id: r.slug, date: r.date, version: r.version, title: r.title, tags: r.tags, body: <r.Summary /> }))}
      />
      <a href="/changelog" className="mt-6 inline-block text-sm text-muted-foreground hover:text-foreground">
        Full changelog
      </a>
    </section>
  );
}`,
  props: [
    { name: 'entries', type: 'ChangelogEntry[]', description: 'Newest first: id, date, title, and any of version, tags, body, media. The ruler spaces them by date.' },
    { name: 'value', type: 'string', description: 'The release on show, by id (controlled).' },
    { name: 'defaultValue', type: 'string', default: 'the newest', description: 'Where it opens when uncontrolled. A link to #<id> opens on that release.' },
    { name: 'onValueChange', type: '(id: string) => void', description: 'Called as the release changes, including while scrubbing and playing.' },
    { name: 'playDuration', type: 'number', default: '1200 × releases', description: 'How long play takes from the first release to the latest, in ms.' },
    { name: 'locales', type: 'string | string[]', default: '"en-GB"', description: 'How dates and month names read.' },
  ],
  notes: [
    'The ruler is a slider: arrow keys step between releases, Home and End jump to the first and the latest, and its value reads as the version, title and date.',
    'Play is a real button whose label changes between "Play the releases" and "Pause"; dragging, clicking or a key pauses it.',
    'Vertical swipes still scroll the page on touch; only sideways drags scrub.',
    'The lens is CSS: each tick reads the playhead’s position from one custom property and works out its own height, so a frame of scrubbing is one style write and no layout. Frames run only while the playhead moves.',
    'Installs Number roll and Text morph. Uses container query units (cqw), in every current browser. With reduced motion the playhead jumps instead of gliding and play steps from release to release.',
  ],
};
