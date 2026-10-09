import type { UiItem } from '../registry';

export const liveActivity: UiItem = {
  name: 'live-activity',
  title: 'Live activity',
  description: 'One pill for whatever is happening now: it updates in place, tap it and it grows into a panel, done blurs into a check.',
  summary:
    'Background work in web apps usually means a toast that vanishes or a spinner nobody notices. This is one pill for whatever is happening now, the way a phone shows a call or a timer at the top. It opens out of nothing when work starts; while it runs, its label morphs letter by letter ("Planning the change" becomes "Editing 3 files"), its ring fills and its figure rolls; a different activity blurs in over the last while the pill reshapes to fit it. Tap it and the pill itself grows into a panel, size and corners easing together: a title, a progress bar, steps that tick themselves off, and actions. When it’s done the spinner blurs into a check that draws itself, and once you clear it the pill folds away.',
  file: 'live-activity.tsx',
  dependencies: [],
  registryDependencies: ['number-roll', 'text-morph'],
  css: [],
  tabs: ['Agent', 'Upload'],
  states: [
    { name: 'arrive / leave', description: 'Setting an activity opens the pill from nothing (width, opacity, scale 0.85→1, 480ms); setting null folds it away, keeping its last content while it goes.' },
    { name: 'update', description: 'Same id: the label morphs, the 16px ring eases to the new progress (500ms) and count rolls.' },
    { name: 'switch', description: 'A new id: the pill’s face rises in out of a 5px blur (360ms) while its width eases to the new label.' },
    { name: 'expand', description: 'Tap: width, height and corners ease from the pill to the panel (480ms) while the pill’s face blurs out and the panel’s fades in after it. Escape (focus returns to the pill) or a tap outside folds it back.' },
    { name: 'done / error', description: 'The spinner blurs into a check that draws itself (420ms), or an alert; the bar turns emerald or red; steps tick as they finish.' },
  ],
  usage: `import { LiveActivity } from "@/components/live-activity";

<LiveActivity
  activity={{
    id: "export",
    label: "Editing 3 files",
    progress: 0.52,
    steps: [{ label: "Plan the change", done: true }, { label: "Edit 3 files" }, { label: "Run the tests" }],
  }}
/>`,
  recipeTitle: 'For an agent running in the background',
  recipeIntro: 'Map the run’s status onto one activity; clear it a few seconds after it finishes.',
  recipe: `"use client";
import { useEffect, useState } from "react";
import { LiveActivity, type LiveActivityData } from "@/components/live-activity";
import { useRun } from "@/lib/runs";

export function RunPill({ runId }: { runId: string }) {
  const run = useRun(runId); // { phase, progress, steps, filesChanged, status }
  const [cleared, setCleared] = useState(false);
  useEffect(() => {
    if (run.status !== "done") return;
    const t = setTimeout(() => setCleared(true), 4000);
    return () => clearTimeout(t);
  }, [run.status]);

  const activity: LiveActivityData | null = cleared
    ? null
    : {
        id: runId,
        label: run.status === "done" ? \`\${run.filesChanged} files changed\` : run.phase,
        status: run.status,
        progress: run.progress,
        steps: run.steps,
        actions: run.status === "done" ? [{ label: "View changes", primary: true, onClick: () => open(run.diffUrl) }] : undefined,
      };
  return <LiveActivity activity={activity} className="fixed left-1/2 top-3 -translate-x-1/2" />;
}`,
  props: [
    { name: 'activity', type: 'LiveActivityData | null', description: '{ id, label, status?, progress?, count?, icon?, title?, detail?, steps?, actions? }; null folds the pill away.' },
    { name: 'expanded / defaultExpanded / onExpandedChange', type: 'boolean / boolean / (open) => void', description: 'Whether the panel is open; controlled or not.' },
    { name: 'panelWidth', type: 'number', default: '320', description: 'The panel’s width.' },
  ],
  notes: [
    'The pill is a button with aria-expanded controlling the panel, a labelled group; Escape returns focus to the pill.',
    'A polite status region announces the label and when it’s done or failed, never the progress or the rolling figure.',
    'The spinner only spins while an activity runs; green and red always come with a check or an alert and words.',
    'Installs Number roll and Text morph. With reduced motion the pill changes size and content in place.',
  ],
};
