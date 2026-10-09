import type { UiItem } from '../registry';

export const toastStack: UiItem = {
  name: 'toast-stack',
  title: 'Toast stack',
  description: 'Notifications that stack, fan out on hover, follow a promise in one toast, and swipe away.',
  summary:
    'Toasts usually pile up or pop over each other. Here a new one rises in from the edge through a blur and the ones before it step back into a hairline stack, three rims peeking out behind the newest. Hover or focus and they fan out into a list at their real heights. A hairline along the bottom drains the time left and pauses while you read or while the tab is hidden. toast.promise keeps one toast from start to finish: a spinner while the work runs, then its words morph and a check draws itself, or an alert appears and it gives a small shake. Swipe one away, or press Alt+T to reach them from the keyboard.',
  file: 'toast-stack.tsx',
  dependencies: [],
  registryDependencies: ['text-morph'],
  css: ['@keyframes ui-progress'],
  states: [
    { name: 'arrive', description: 'Rises from 24px past the edge through a 4px blur with a slight overshoot (520ms); the toasts behind it scale down 5% each and step back 10px.' },
    { name: 'stacked', description: 'Up to three peek behind the newest at its height, their contents hidden; more wait out of sight.' },
    { name: 'fanned', description: 'Hover or keyboard focus spreads them into a list at their measured heights with 10px gaps; the stack’s hit area grows with it.' },
    { name: 'timer', description: 'A 1px line drains along the bottom over duration (4s by default), paused while hovered, focused or in a hidden tab; it restarts when a toast is updated.' },
    { name: 'promise', description: 'The spinner blurs into a check that draws itself (or an alert, with a 380ms shake) while the title morphs, keeping the letters the two messages share.' },
    { name: 'dismiss', description: 'Swipe past 90px (or flick) and it carries on off the edge; the close button or Escape lifts it out through a blur. The rest close up.' },
  ],
  usage: `import { Toaster, toast } from "@/components/toast-stack";

// Once, near the root of your app:
<Toaster position="bottom-right" />

// Anywhere:
toast("Order archived", { action: { label: "Undo", onClick: restore } });
toast.success("Invite sent");
toast.promise(save(), { loading: "Saving changes", success: "Changes saved", error: "Couldn't save" });`,
  recipeTitle: 'With a server action',
  recipeIntro: 'One toast follows the request from start to finish, so people see it land without a second notification.',
  recipe: `"use client";
import { toast } from "@/components/toast-stack";
import { updateHours } from "./actions";

export function SaveHours({ hours }: { hours: Hours }) {
  return (
    <button
      onClick={() =>
        toast.promise(updateHours(hours), {
          loading: "Saving opening hours",
          success: "Opening hours saved",
          error: (e) => (e instanceof Error ? e.message : "Couldn't save"),
        })
      }
    >
      Save
    </button>
  );
}`,
  props: [
    { name: 'toast(title, options)', type: 'function', description: 'Shows a toast and returns its id. Options: description, type, duration, action { label, onClick }, id (to update one in place).' },
    { name: 'toast.success / error / info / loading', type: 'function', description: 'The same with a type, and its icon.' },
    { name: 'toast.promise(promise, messages)', type: 'function', description: 'One toast that morphs from loading to success or error. Messages can be functions of the result or error.' },
    { name: 'toast.dismiss(id?)', type: 'function', description: 'Dismiss one toast, or all of them.' },
    { name: 'Toaster position', type: '"bottom-right" | "bottom-center" | "bottom-left" | "top-right" | "top-center" | "top-left"', default: '"bottom-right"', description: 'Which corner; the stack grows away from that edge.' },
    { name: 'Toaster visible / hotkey', type: 'number / string', default: '3 / "t"', description: 'How many show in the stack, and the letter that, with Alt, moves focus to the newest toast.' },
  ],
  notes: [
    'Each toast is a polite status (errors are alerts), announced once as it arrives or changes. The region is labelled "Notifications (Alt+T)".',
    'Hovering, keyboard focus or a hidden tab pauses every timer, so nothing disappears while someone is reading it.',
    'Swiping works with mouse, pen and touch; vertical scrolling still passes through.',
    'Render one Toaster; toast() can be called from anywhere, including outside React.',
    'Installs Text morph. With reduced motion the toasts sit as a list and change in place.',
  ],
};
