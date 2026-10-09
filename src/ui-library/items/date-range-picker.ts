import type { UiItem } from '../registry';

export const dateRangePicker: UiItem = {
  name: 'date-range-picker',
  title: 'Date range picker',
  description: 'A range is one liquid band: it follows your pointer between days, presets flow it to their span, and the dates morph as it moves.',
  summary:
    'Most date range pickers light up cells one at a time and leave you guessing what you’ve picked until you press Apply. Here the range is one band. Tap a day and a dot drops on it; move toward the day you’d end on and the band stretches after you, week by week, while a second dot glides along and the footer’s dates morph and its day count rolls. Tap again and it’s set. Presets on the side ("Last 30 days", "This month") slide their highlight over and flow the band to their span, switching month if they need to. ‹ and › slide the next month in from the side you went. The panel unfolds out of the pill, folds back into it on Cancel or Escape, and on Apply the pill’s label morphs to the new range. It works for analytics (days, nothing after today) and for stays (nights, nothing before today, at least one night).',
  file: 'date-range-picker.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['number-roll', 'text-morph'],
  css: [],
  tabs: ['Analytics', 'Stay'],
  states: [
    { name: 'open / close', description: 'The panel’s clip eases from a pill-sized strip under the trigger to its full size (440ms) while it fades in; Cancel, Escape or a tap outside folds it back (240ms) and focus returns to the pill.' },
    { name: 'first day', description: 'A dot pops onto the day (scale 0.5→1, 300ms, a slight overshoot); the band shows lighter while the range is open.' },
    { name: 'preview', description: 'Each week row is one band that eases its left edge and width to the days in range (340ms), rounding fully where the range starts or ends; the end dot glides day to day and the footer’s range morphs and its count rolls.' },
    { name: 'presets', description: 'The highlight slides to the preset (380ms) and the band flows to its span; a custom range fades the highlight out where it was. In a narrow panel the presets become a row of chips that scrolls the chosen one into view.' },
    { name: 'month', description: '‹ and ›, Page Up/Down, or arrowing past the edge slide the days in 20px from that side out of a 4px blur (380ms); the title morphs.' },
    { name: 'apply', description: 'The pill’s label morphs to the new range as the panel folds back into it.' },
  ],
  usage: `import { DateRangePicker } from "@/components/date-range-picker";

const today = new Date();
const [range, setRange] = useState({ start: addDays(today, -29), end: today });

<DateRangePicker value={range} onValueChange={setRange} max={today} align="end" />`,
  recipeTitle: 'For a booking',
  recipeIntro: 'Count nights, rule out the past and give it presets of your own; anything with a range(today) works.',
  recipe: `"use client";
import { useState } from "react";
import { DateRangePicker, type DateRange, type DateRangePreset } from "@/components/date-range-picker";

const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const friday = (t: Date) => addDays(t, (5 - t.getDay() + 7) % 7);

const presets: DateRangePreset[] = [
  { label: "This weekend", range: (t) => ({ start: friday(t), end: addDays(friday(t), 2) }) },
  { label: "Next weekend", range: (t) => ({ start: addDays(friday(t), 7), end: addDays(friday(t), 9) }) },
];

export function StayDates({ onChange }: { onChange: (range: DateRange) => void }) {
  const [range, setRange] = useState<DateRange | null>(null);
  return (
    <DateRangePicker
      value={range}
      onValueChange={(r) => {
        setRange(r);
        onChange(r);
      }}
      min={new Date()}
      unit="nights"
      presets={presets}
      placeholder="Add dates"
    />
  );
}`,
  props: [
    { name: 'value / defaultValue / onValueChange', type: '{ start: Date; end: Date } | null', description: 'The applied range, controlled or not. onValueChange runs on Apply.' },
    { name: 'presets', type: '{ label, range: (today) => DateRange }[]', default: 'DATE_RANGE_PRESETS', description: 'Today, Last 7 days, Last 30 days, This month, Last month, This year. Pass [] for a calendar on its own.' },
    { name: 'min / max', type: 'Date', description: 'Days outside them are dimmed and can’t be picked; the month arrows stop at them.' },
    { name: 'unit', type: '"days" | "nights"', default: '"days"', description: 'What the footer counts. Nights need at least one, so the same day twice doesn’t end a range.' },
    { name: 'weekStartsOn', type: '0 | 1', default: '1', description: 'Sunday or Monday first.' },
    { name: 'locales', type: 'string | string[]', default: '"en-GB"', description: 'For the dates, the month and the weekday letters.' },
    { name: 'align', type: '"start" | "end"', default: '"start"', description: 'Line the panel up with the pill’s left or right edge; it shifts to stay on screen either way.' },
    { name: 'open / defaultOpen / onOpenChange', type: 'boolean / boolean / (open) => void', description: 'Whether the panel is open; controlled or not.' },
    { name: 'placeholder', type: 'string', default: '"Pick dates"', description: 'The pill’s label before a range is set.' },
  ],
  notes: [
    'The pill is a button with aria-haspopup="dialog"; the days are a grid of gridcells with full spoken dates, aria-selected for the range and aria-current for today.',
    'Arrows move a day or a week, Home and End go to the week’s ends, Page Up and Page Down change month, Enter or Space picks; Escape closes and returns focus to the pill.',
    'Choosing a range announces it through a polite status region; the rolling count is hidden from assistive tech.',
    'The panel is a popover inside the component (no portal), so give its container room or let it overflow; it nudges itself sideways to stay 12px inside the viewport.',
    'Installs Number roll and Text morph. With reduced motion the band, the dots and the panel change in place.',
  ],
};
