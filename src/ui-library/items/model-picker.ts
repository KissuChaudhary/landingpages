import type { UiItem } from '../registry';

export const modelPicker: UiItem = {
  name: 'model-picker',
  title: 'Model picker',
  description: 'The model pill in your composer grows into the menu: what each model is for, speed, smarts and thinking effort.',
  summary:
    'Choosing a model shouldn’t mean reading a spec sheet in a dropdown. The pill in the composer toolbar shows the model and its thinking effort. Click it and the same surface lifts out of the composer and grows into the menu above it, never over your prompt: its size and corners ease from pill to panel while the label cross-fades into the list. Each model gets a line on what it’s for and small speed and smarts meters. Reasoning models add a Thinking control, and the panel’s height follows. Paid models show "Pro" and hand off to your upgrade flow.',
  file: 'model-picker.tsx',
  dependencies: ['lucide-react'],
  css: ['@keyframes ui-fade-in'],
  states: [
    { name: 'closed', description: 'A quiet pill: icon, model name, and the effort for reasoning models, e.g. "Aurora Think Medium".' },
    { name: 'open', description: 'The pill lifts clear of the composer and grows into a 340px panel above it, lined up with its edge. The current model is checked and a highlight slides with the pointer or arrow keys.' },
    { name: 'effort', description: 'For reasoning models, a Thinking control (Low, Medium, High) with a sliding thumb. The panel grows to fit it.' },
    { name: 'locked', description: '"Pro" instead of a check. Choosing it calls onLockedSelect, e.g. to open pricing, and keeps the current model.' },
    { name: 'closing', description: 'The panel folds back into the pill; focus returns to it.' },
  ],
  usage: `import { ModelPicker } from "@/components/model-picker";

<ModelPicker
  models={[
    { id: "openai/gpt-5-mini", name: "GPT-5 mini", description: "Fast, everyday questions", speed: 3, intelligence: 2 },
    { id: "openai/gpt-5", name: "GPT-5", description: "Reasons before it answers", speed: 1, intelligence: 3, reasoning: true },
  ]}
  value={model}
  onValueChange={setModel}
  effort={effort}
  onEffortChange={setEffort}
  align="end" // beside Send, growing from the right edge
  anchorRef={composerRef} // opens above the composer, never over it
/>`,
  recipe: `"use client";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { ModelPicker } from "@/components/model-picker";

export function Composer() {
  const [model, setModel] = useState("openai/gpt-5-mini");
  const [effort, setEffort] = useState("Medium");
  const { sendMessage } = useChat();
  // …your input; when it sends:
  const send = (text: string) => sendMessage({ text }, { body: { model, effort: effort.toLowerCase() } });

  return <ModelPicker models={MODELS} value={model} onValueChange={setModel} effort={effort} onEffortChange={setEffort} />;
}

// app/api/chat/route.ts: model ids go straight to the AI Gateway
import { convertToModelMessages, streamText } from "ai";

const ALLOWED = new Set(MODELS.filter((m) => !m.locked).map((m) => m.id));

export async function POST(req: Request) {
  const { messages, model, effort } = await req.json();
  if (!ALLOWED.has(model)) return new Response("Unknown model", { status: 400 });
  const result = streamText({
    model,
    messages: convertToModelMessages(messages),
    providerOptions: { openai: { reasoningEffort: effort } },
  });
  return result.toUIMessageStreamResponse();
}`,
  props: [
    { name: 'models', type: '{ id; name; description?; icon?; speed?; intelligence?; reasoning?; locked? }[]', description: 'speed and intelligence are 1 to 3. reasoning adds the Thinking control; locked shows "Pro".' },
    { name: 'value / onValueChange', type: 'string / (id: string) => void', description: 'The selected model.' },
    { name: 'effort / onEffortChange', type: 'string / (effort: string) => void', description: 'Thinking effort for reasoning models; the control appears when onEffortChange is set.' },
    { name: 'efforts', type: 'string[]', default: '["Low", "Medium", "High"]', description: 'The effort levels.' },
    { name: 'onLockedSelect', type: '(model) => void', description: 'Called instead of selecting a locked model. Without it, locked models are disabled.' },
    { name: 'side / align', type: '"top" | "bottom" / "start" | "end"', default: '"top" / "start"', description: 'Grow upward or downward, from the pill’s left or right edge.' },
    { name: 'anchorRef', type: 'RefObject<HTMLElement>', description: 'Open clear of this element, e.g. your composer, lined up with its edge, instead of over it. Without it, the panel opens just above the pill.' },
    { name: 'collisionPadding', type: 'number', default: '16', description: 'Space kept from the screen edges. On narrow screens the panel narrows and shifts to stay fully visible.' },
  ],
  notes: [
    'Put it beside Send with align="end": the model is a setting on how the message goes out, and the panel then lines up with the composer’s right edge.',
    'The pill is a button with aria-haspopup="listbox"; the list takes focus when open, and the active row is announced through aria-activedescendant.',
    'Arrow keys, Home and End move; Enter or Space picks; Escape closes and returns focus to the pill. Tab reaches the Thinking control, a radio group you move through with the arrow keys.',
    'Meters have text for screen readers ("Speed 2 of 3"), so they don’t rely on the dots alone.',
    'Always check the model id on the server; the picker only offers choices.',
    'With reduced motion, it opens and closes instantly.',
  ],
};
