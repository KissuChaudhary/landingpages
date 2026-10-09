import type { UiItem } from '../registry';

export const activityRings: UiItem = {
  name: 'activity-rings',
  title: 'Activity rings',
  description: 'Three daily goals as concentric rings beside a tight legend, with the week underneath: pick a day and the rings sweep to it.',
  summary:
    'Rings are the quickest way to see whether today’s goals are done, and most versions are a static picture. These sweep round from the top the first time they’re seen, outer first, while the legend beside them rolls up each figure against its goal and its share. Underneath, the week sits as seven small rings: pick a day and the big rings sweep to it, the day’s name morphs above them and every figure rolls. A goal beaten carries on round for a second lap with a dot marking how far it got, the way a watch shows it. Point at a ring or its row and the other two step back. Days still to come are quiet and can’t be picked.',
  file: 'activity-rings.tsx',
  dependencies: [],
  registryDependencies: ['number-roll', 'text-morph'],
  css: [],
  states: [
    { name: 'arrive', description: 'In view for the first time, each ring sweeps from the top (1100ms, 120ms apart, outer first), the week’s small rings follow 40ms apart, and every figure rolls up from zero.' },
    { name: 'day', description: 'Picking a day sweeps the big rings to its shares, morphs the title to its name and rolls the figures. Days after the last one with data are dimmed and aria-disabled.' },
    { name: 'past', description: 'Over 100%, a second lap draws over the first and a dot ringed in the surface colour marks its lead, fading in as the lap lands.' },
    { name: 'focus', description: 'Pointing at a ring’s row dims the other rings to 30% and the other rows to 45%.' },
  ],
  usage: `import { ActivityRings } from "@/components/activity-rings";

<ActivityRings
  goals={[
    { id: "orders", label: "Orders", goal: 120 },
    { id: "revenue", label: "Revenue", goal: 1200, format: { style: "currency", currency: "USD" } },
    { id: "regulars", label: "Regulars back", goal: 15 },
  ]}
  days={week} // [{ key: "2026-10-09", label: "F", title: "Friday 9 October", values: [93, 940, 12] }, …]
/>`,
  recipeTitle: 'From your own numbers',
  recipeIntro: 'Build the week on the server with one value per goal per day, and null for the days still to come.',
  recipe: `import { ActivityRings, type RingDay } from "@/components/activity-rings";
import { db } from "@/lib/db";

export async function TodayGoals() {
  const monday = startOfWeek(new Date());
  const rows = await db.dailyTotals({ from: monday, days: 7 }); // [{ day, orders, revenue, regulars } | null]
  const days: RingDay[] = rows.map((r, i) => {
    const d = new Date(monday);
    d.setDate(d.getDate() + i);
    return {
      key: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-GB", { weekday: "narrow" }),
      title: d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }),
      values: r ? [r.orders, r.revenue, r.regulars] : [null, null, null],
    };
  });
  return <ActivityRings goals={GOALS} days={days} />;
}`,
  props: [
    { name: 'goals', type: 'RingGoal[]', description: 'Up to three, outermost first: { id, label, goal, format? }.' },
    { name: 'days', type: 'RingDay[]', description: 'The week, oldest first: { key, label, title?, values } with null values for days to come.' },
    { name: 'value / defaultValue', type: 'string', default: 'the last day with data', description: 'The day on show, by key; controlled or not.' },
    { name: 'onValueChange', type: '(key: string) => void', description: 'Called when the day changes.' },
    { name: 'locales', type: 'string | string[]', description: 'For number formatting.' },
  ],
  notes: [
    'The legend is real text: each goal’s figure, target and share, so the rings never carry meaning on their own.',
    'The week is a radio group: arrow keys, Home and End move between days with data, and each day’s name and shares are its label.',
    'Colours are --chart-1 to --chart-3 from your theme; each ring’s track is a light step of its own colour.',
    'It sizes to its own width: below about 450px the rings, type and spacing step down.',
    'Installs Number roll and Text morph. With reduced motion the rings are simply filled.',
  ],
};
