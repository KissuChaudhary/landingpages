import type { UiItem } from '../registry';

export const agentComposer: UiItem = {
  name: 'agent-composer',
  title: 'Agent composer',
  description: 'The taller composer for agent surfaces: branch, folder and context on a tab above, permissions and model as pills that grow into their lists.',
  summary:
    'A coding or ops agent needs more around the prompt than a chat box: where it’s working, how much it may do on its own, which model, and how full its memory is. Here a tab hangs off the card’s top edge with the branch, the project folder and a context ring that fills and turns amber past 80%, each morphing when it changes. Under the prompt, the permission pill says how far the agent may go (Auto, Ask first, Plan only, Full access) and grows into a list with a line on each, opening clear of the composer; the model pill on the right does the same, with thinking effort for models that reason. Send blurs into a spinner, then into Stop, and the mic beside it breathes while it listens. Files come in through +, paste or drop.',
  file: 'agent-composer.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['model-picker', 'number-roll', 'text-morph'],
  css: ['@keyframes ui-breathe'],
  states: [
    { name: 'ready', description: 'Type; Enter sends, Shift+Enter adds a line; the field grows to 220px, then scrolls. Send is dim until there’s text.' },
    { name: 'submitted / streaming', description: 'The arrow blurs into a spinner (submitted), then into Stop while streaming if onStop is set (260ms blur, scale 0.6→1).' },
    { name: 'status tab', description: 'Branch and folder morph letter by letter when they change; the context ring eases to its new share (600ms) and its figure rolls, turning amber at 80% and red at 95%.' },
    { name: 'permission / model', description: 'Each pill grows into its list (Model picker’s one-surface morph), opening above the composer and lined up with its left or right edge; choosing morphs the pill’s label.' },
    { name: 'listening', description: 'With onVoice, the mic turns primary and a soft disc breathes behind it until it’s pressed again.' },
  ],
  usage: `import { AgentComposer } from "@/components/agent-composer";

<AgentComposer
  branch="main"
  folder="kept-till"
  context={{ used: 570000, limit: 1000000 }}
  models={models}
  model={model}
  onModelChange={setModel}
  status={status}
  onSubmit={(text) => sendMessage({ text })}
  onStop={stop}
/>`,
  recipe: `"use client";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { AgentComposer } from "@/components/agent-composer";

export function AgentInput({ branch, folder }: { branch: string; folder: string }) {
  const { sendMessage, status, stop, messages } = useChat();
  const [model, setModel] = useState("aurora");
  const [permission, setPermission] = useState("auto");
  const used = messages.reduce((sum, m) => sum + (m.metadata?.tokens ?? 0), 0);

  return (
    <AgentComposer
      branch={branch}
      folder={folder}
      context={{ used, limit: 1_000_000 }}
      models={MODELS}
      model={model}
      onModelChange={setModel}
      permission={permission}
      onPermissionChange={setPermission}
      status={status}
      onSubmit={(text) => sendMessage({ text }, { body: { model, permission } })}
      onStop={stop}
    />
  );
}`,
  props: [
    { name: 'onSubmit', type: '(value: string) => void', description: 'Called with the text on Enter or Send.' },
    { name: 'status', type: '"ready" | "submitted" | "streaming" | "error"', default: '"ready"', description: 'useChat’s status, passed straight through.' },
    { name: 'onStop', type: '() => void', description: 'Turns the spinner into Stop while streaming.' },
    { name: 'branch / folder', type: 'string', description: 'On the tab above the card; they morph when they change.' },
    { name: 'context', type: '{ used: number; limit: number }', description: 'The ring on the tab; amber from 80%, red from 95%.' },
    { name: 'models / model / onModelChange', type: 'ModelOption[] / string / (id) => void', description: 'The model pill (see Model picker); effort and onEffortChange add thinking effort.' },
    { name: 'permissions', type: 'ModelOption[]', default: 'Auto, Ask first, Plan only, Full access', description: 'The permission modes, each with a name, a line and an icon.' },
    { name: 'permission / defaultPermission / onPermissionChange', type: 'string / string / (id) => void', default: '"auto"', description: 'Controlled or not.' },
    { name: 'onFilesSelected / accept / attachments', type: '(files) => void / string / ReactNode', description: 'Enables +, paste and drop; render chips in attachments and they fold open above the prompt.' },
    { name: 'onVoice / listening', type: '() => void / boolean', description: 'Shows the mic and whether it’s listening.' },
    { name: 'placeholder', type: 'string', default: '"What should we build?"', description: 'Also the field’s label.' },
  ],
  notes: [
    'The field is labelled by its placeholder; Send, Stop, Speak and Add files are labelled buttons, and the mic says whether it’s pressed.',
    'Both pickers are listboxes with arrow keys, Home, End and Escape (see Model picker), announced as "Permission: Auto" and "Model: Aurora".',
    'The tab’s branch and folder have visually hidden labels, and the context ring reads as "57% of the context used"; amber and red always come with the figure.',
    'The breathing disc only runs while listening and stops with reduced motion.',
    'Installs Model picker, Number roll and Text morph.',
  ],
};
