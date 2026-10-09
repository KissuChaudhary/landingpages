import type { UiItem } from '../registry';

export const stepsChart: UiItem = {
  name: 'steps-chart',
  title: 'Steps chart',
  description: 'A week against a daily goal: days that make it fill in, a wave runs the way you step through the weeks, the totals roll.',
  summary:
    'Fitness and habit cards usually redraw the whole week when you go back one. Here the seven days stay put and change: step to last week and each day eases to its new height in a wave that runs the way you went, days that reached the goal turn your primary colour, and the total, the daily average and "goal met on 4 of 7 days" all roll to their new figures while the week’s name morphs between the arrows. The goal is a dashed line across the chart, a day still under way is drawn as an outline holding its fill so far, and the first time the card scrolls into view the days grow out of the baseline one after another. Point at a day and a hairline column follows you with a readout riding its top.',
  file: 'steps-chart.tsx',
  dependencies: [],
  registryDependencies: ['number-roll', 'text-morph'],
  css: [],
  states: [
    { name: 'arrive', description: 'In view for the first time, each day grows from the baseline (620ms, 34ms apart) and the total rolls up from zero.' },
    { name: 'week', description: '‹ and › step through the weeks; the label morphs, rising from below going forward and dropping from above going back. Days ease to their new heights in a wave from the side you moved toward; the total, average and days met roll. The arrows fade at the first and last week.' },
    { name: 'goal', description: 'A dashed line in your primary colour at the goal, with its figure in the scale. Days at or over it are filled with your primary colour; a day still under way is a primary outline with a light fill.' },
    { name: 'hover', description: 'A hairline column glides to the day under the pointer (380ms, slight overshoot) and the readout at its top slides along, the date morphing and the steps rolling. On touch, tap or drag across the days.' },
  ],
  usage: `import { StepsChart } from "@/components/steps-chart";

<StepsChart
  goal={10000}
  weeks={[
    { id: "w40", label: "Last week", days: lastWeek },
    { id: "w41", label: "This week", days: thisWeek }, // { key: "fri", label: "Fri", value: 6180, today: true }
  ]}
/>`,
  recipeTitle: 'From a health or habit API',
  recipeIntro: 'Bucket the samples by day on the server, key each day by its weekday so it keeps its bar from week to week, and mark today as under way.',
  recipe: `import { StepsChart, type StepsWeek } from "@/components/steps-chart";
import { getDailySteps } from "@/lib/health";

const KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export async function StepsCard({ userId }: { userId: string }) {
  const weeks = await getDailySteps(userId, { weeks: 4 }); // [{ start: "2026-10-05", days: [11320, 8760, …] }]
  const today = new Date().toISOString().slice(0, 10);
  const data: StepsWeek[] = weeks.map((w, i) => ({
    id: w.start,
    label: i === weeks.length - 1 ? "This week" : i === weeks.length - 2 ? "Last week" : w.start,
    days: KEYS.map((key, d) => {
      const date = new Date(w.start);
      date.setDate(date.getDate() + d);
      return {
        key,
        label: date.toLocaleDateString("en-GB", { weekday: "short" }),
        title: date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }),
        value: w.days[d] ?? 0,
        today: date.toISOString().slice(0, 10) === today,
      };
    }),
  }));
  return <StepsChart weeks={data} goal={10000} />;
}`,
  props: [
    { name: 'weeks', type: 'StepsWeek[]', description: 'Oldest first, each with id, label and seven days ({ key, label, value, title?, today? }). It opens on the last.' },
    { name: 'goal', type: 'number', default: '10000', description: 'Steps a day; the dashed line and the colour of the days that reach it.' },
    { name: 'value / defaultValue', type: 'string', default: 'the last week', description: 'The week on show, by id; controlled or not.' },
    { name: 'onValueChange', type: '(id: string) => void', description: 'Called when the week changes.' },
    { name: 'title', type: 'string', default: '"Steps"', description: 'Above the total.' },
    { name: 'locales', type: 'string | string[]', description: 'For number formatting.' },
  ],
  notes: [
    'The arrows are buttons labelled "Previous week" and "Next week"; at either end they are aria-disabled, so focus stays on them. The week’s name is announced when it changes.',
    'The plot is one tab stop: arrow keys, Home and End move the readout between days and it is announced politely, saying when the goal was met.',
    'The scale holds still across weeks (set by the busiest one), so a bar’s height means the same in every week.',
    'Every day is in a visually hidden table with the week’s total and the days met in its caption.',
    'Installs Number roll and Text morph. With reduced motion every change happens in place.',
  ],
};
