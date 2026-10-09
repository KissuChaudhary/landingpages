import type { UiItem } from '../registry';

export const stageBars: UiItem = {
  name: 'stage-bars',
  title: 'Stage bars',
  description: 'A funnel you can read at a glance: every stage as a bar against the first, the drop-off between them, and widths that ease when the period changes.',
  summary:
    'Funnels are usually a trapezoid you can’t read numbers off. Here every stage is a bar measured against the first, with its count and share on its row and, between rows, how many carried on to the next stage. The headline is the one number people ask for: how many made it all the way. Switch from this week to last week or the last 30 days and every bar eases to its new width while every count, share and drop-off rolls to its new figure. The first time the card scrolls into view the bars grow from the left one after another. Point at a stage and the others dim. One hue that steps lighter down the funnel, as a magnitude should be drawn.',
  file: 'stage-bars.tsx',
  dependencies: [],
  registryDependencies: ['number-roll'],
  css: [],
  states: [
    { name: 'arrive', description: 'In view for the first time, each bar grows from the left (820ms, 90ms apart) and every count, share and drop-off rolls up from zero.' },
    { name: 'period', description: 'The pill is thrown to the choice (460ms); every bar eases to its new width (820ms) and every figure, including the headline, rolls.' },
    { name: 'focus', description: 'Pointing at a stage dims the others to 40%, leaving that stage and the drop-offs either side of it.' },
  ],
  usage: `import { StageBars } from "@/components/stage-bars";

<StageBars
  title="App orders"
  stages={[{ id: "opened", label: "Opened the app" }, { id: "basket", label: "Added to basket" }, { id: "paid", label: "Paid" }]}
  periods={[{ id: "week", label: "This week", values: [2480, 1164, 611] }]}
/>`,
  recipeTitle: 'From product analytics',
  recipeIntro: 'Count distinct users per step on the server, one array per period in the same stage order.',
  recipe: `import { StageBars } from "@/components/stage-bars";
import { analytics } from "@/lib/analytics";

const STAGES = [
  { id: "opened", label: "Opened the app" },
  { id: "basket", label: "Added to basket" },
  { id: "checkout", label: "Started checkout" },
  { id: "paid", label: "Paid" },
];

export async function CheckoutFunnel() {
  const count = (since: string, until?: string) => analytics.funnel(STAGES.map((s) => s.id), { since, until }); // → number[]
  const [week, last, month] = await Promise.all([count("-7d"), count("-14d", "-7d"), count("-30d")]);
  return (
    <StageBars
      title="App orders"
      stages={STAGES}
      periods={[
        { id: "week", label: "This week", values: week },
        { id: "last", label: "Last week", values: last },
        { id: "month", label: "30 days", values: month },
      ]}
    />
  );
}`,
  props: [
    { name: 'stages', type: 'Stage[]', description: 'In order, each { id, label }.' },
    { name: 'periods', type: 'StagePeriod[]', description: 'Each { id, label, values }, one count per stage; more than one shows a switch.' },
    { name: 'value / defaultValue', type: 'string', default: 'the first period', description: 'The period on show, by id; controlled or not.' },
    { name: 'onValueChange', type: '(id: string) => void', description: 'Called when the period changes.' },
    { name: 'title', type: 'string', default: '"Funnel"', description: 'Above the headline.' },
    { name: 'format', type: 'Intl.NumberFormatOptions', description: 'How counts read.' },
    { name: 'locales', type: 'string | string[]', description: 'For number formatting.' },
  ],
  notes: [
    'An ordered list: every stage’s count and share is printed on its row, so nothing is hidden behind hover.',
    'The period switch is a radio group (arrow keys move).',
    'A visually hidden table gives each stage’s count, its share of the first stage and of the stage before.',
    'One hue (--chart-1) stepping lighter down the funnel: it’s one measure shrinking, not different categories.',
    'Installs Number roll. With reduced motion the bars are simply their width.',
  ],
};
