import type { UiItem } from '../registry';

export const modeSwitcher: UiItem = {
  name: 'mode-switcher',
  title: 'Mode switcher',
  description: 'Fast, Thinking, Research: a segmented switch with a sliding pill and locked paid modes.',
  summary:
    'Lets people choose how the model should work. A pill is thrown to the chosen mode with a little give, an optional line underneath morphs to say what that mode does, and paid modes stay visible with a lock so people can see what an upgrade unlocks. It’s a real radio group: arrow keys move between modes.',
  file: 'mode-switcher.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['text-morph'],
  css: [],
  states: [
    { name: 'selected', description: 'The pill is thrown to the chosen mode with a slight overshoot (460ms) while its width eases; the description below, if enabled, morphs into the new mode’s line, keeping the words they share.' },
    { name: 'locked', description: 'Visible with a lock; choosing it calls onLockedSelect (e.g. open pricing) instead of switching.' },
  ],
  usage: `import { ModeSwitcher } from "@/components/mode-switcher";
import { Zap, Brain, Telescope } from "lucide-react";

<ModeSwitcher
  modes={[
    { value: "fast", label: "Fast", icon: <Zap />, description: "Quick answers for everyday questions." },
    { value: "thinking", label: "Thinking", icon: <Brain />, description: "Takes a moment to reason first." },
    { value: "research", label: "Research", icon: <Telescope />, locked: true },
  ]}
  defaultValue="fast"
  onValueChange={setMode}
  onLockedSelect={openPricing}
  showDescription
/>`,
  recipe: `import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { ModeSwitcher } from "@/components/mode-switcher";

const { sendMessage } = useChat();
const [mode, setMode] = useState("fast");

<ModeSwitcher modes={modes} value={mode} onValueChange={setMode} />

// Send the mode with each message, and pick the model from it on the server.
sendMessage({ text }, { body: { mode } });

// app/api/chat/route.ts
const { messages, mode } = await req.json();
const result = streamText({ model: mode === "thinking" ? reasoningModel : fastModel, messages: convertToModelMessages(messages) });`,
  props: [
    { name: 'modes', type: '{ value; label; description?; icon?; locked? }[]', description: 'The modes, in order.' },
    { name: 'value / defaultValue / onValueChange', type: 'string', description: 'Controlled or uncontrolled selection.' },
    { name: 'onLockedSelect', type: '(mode) => void', description: 'Called when someone picks a locked mode.' },
    { name: 'showDescription', type: 'boolean', default: 'false', description: 'Show the chosen mode’s description underneath.' },
    { name: 'label', type: 'string', default: '"Mode"', description: 'Accessible name of the radio group.' },
  ],
  notes: [
    'role="radiogroup" with roving focus: Tab lands on the chosen mode, arrow keys move and skip locked modes.',
    'Locked modes are aria-disabled but still focusable and explained in their title.',
    'The pill re-measures on resize and its first placement never animates. Installs Text morph; with reduced motion the pill jumps and the description changes in place.',
  ],
};
