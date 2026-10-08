import type { UiItem } from '../registry';

export const statsBand: UiItem = {
  name: 'stats-band',
  title: 'Stats band',
  description: 'Numbers that arrive when you do: hairlines draw themselves, then each figure rolls up from zero in turn.',
  summary:
    'A row of big numbers is proof, but a static one gets scrolled past. This band waits until it is on screen. Then the hairlines between the stats draw themselves from the middle out, and each figure rolls up from zero a beat after the last, digit by digit, as its label rises in. Any format works: compact ("12.5K+"), decimals ("99.98%"), prefixes and suffixes. Screen readers get the real figures straight away.',
  file: 'stats-band.tsx',
  dependencies: [],
  registryDependencies: ['number-roll'],
  css: [],
  states: [
    { name: 'waiting', description: 'Off screen: quiet zeros and undrawn lines, so nothing has already happened by the time you arrive.' },
    { name: 'arriving', description: 'At half visible, the dividers draw over 700ms, then each stat rolls up from 0 (1.2s), 140ms after the one before.' },
    { name: 'done', description: 'The real numbers. Change a value later and only its changed digits roll.' },
  ],
  usage: `import { StatsBand } from "@/components/stats-band";

<StatsBand
  stats={[
    { value: 12480, label: "Teams shipping", format: { notation: "compact" }, suffix: "+" },
    { value: 99.98, label: "Uptime", suffix: "%" },
  ]}
/>`,
  recipeTitle: 'In a proof section',
  recipeIntro: 'Fetch the numbers on the server; the band animates them when the visitor gets there.',
  recipe: `import { StatsBand } from "@/components/stats-band";

export default async function Proof() {
  const { teams, uptime, rating } = await getPublicStats(); // your data, cached

  return (
    <section className="mx-auto max-w-5xl border-y">
      <StatsBand
        stats={[
          { value: teams, label: "Teams shipping on Relay", format: { notation: "compact", maximumFractionDigits: 1 }, suffix: "+" },
          { value: uptime, label: "Uptime this year", format: { maximumFractionDigits: 2 }, suffix: "%" },
          { value: rating, label: "Average review", format: { minimumFractionDigits: 1 }, suffix: " / 5" },
        ]}
      />
    </section>
  );
}`,
  props: [
    { name: 'stats', type: '{ value; label; format?; prefix?; suffix? }[]', description: 'Each figure and its label. format takes Intl.NumberFormat options.' },
    { name: 'stagger', type: 'number', default: '140', description: 'Time between one stat starting and the next (ms).' },
    { name: 'numberClassName', type: 'string', description: 'Size and weight of the figures.' },
  ],
  notes: [
    'A description list: each label is a dt and its figure a dd, with the real number as text for screen readers and search.',
    'It runs once, the first time half the band is visible, using an IntersectionObserver; no scroll listeners.',
    'Installs Number roll alongside it.',
    'With reduced motion the numbers and lines are simply there.',
  ],
};
