import type { UiItem } from '../registry';

export const mentionMenu: UiItem = {
  name: 'mention-menu',
  title: 'Mentions and commands',
  description: 'Type @ to pull in context or / for a command. The menu grows from the caret and your text becomes a chip.',
  summary:
    'Agents work better when people can point at what they mean. This prompt field opens a small menu right at the caret when you type a trigger: @ for files, people and pages, / for commands. It narrows as you type, its height follows the results, and a highlight slides between rows. Enter or Tab turns the typed "@q3-sa" into a chip in place. Searches can be async, and earlier results stay up while the next ones load.',
  file: 'mention-menu.tsx',
  dependencies: [],
  css: ['@keyframes ui-shimmer', '@keyframes ui-pop-in', '@keyframes ui-chip-in'],
  tabs: ['Try it', 'With context'],
  states: [
    { name: 'closed', description: 'A plain prompt field with a placeholder. Enter sends, Shift+Enter adds a line.' },
    { name: 'open', description: 'A trigger after a space (or at a line’s start, for commands) grows the menu from the caret.' },
    { name: 'filtering', description: 'Results narrow and rank as you type, matching text is bold, and the menu’s height animates to fit.' },
    { name: 'loading', description: 'An async search shows "Searching" until results arrive; on later keystrokes the old results stay with a small spinner.' },
    { name: 'empty', description: '"No matches for “xyz”". Escape closes the menu and leaves your text alone.' },
    { name: 'chip', description: 'The typed token becomes a tinted chip (or a mono command chip) where it was typed. Backspace removes it whole.' },
  ],
  usage: `import { MentionInput } from "@/components/mention-menu";

<MentionInput
  triggers={[
    { char: "@", label: "Context", items: files },
    { char: "/", label: "Commands", items: commands, startOnly: true, variant: "command" },
  ]}
  onSubmit={({ text, mentions }) => send(text, mentions)}
/>`,
  recipe: `"use client";
import { useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { MentionInput, type MentionInputHandle } from "@/components/mention-menu";

export function Composer() {
  const { sendMessage } = useChat();
  const input = useRef<MentionInputHandle>(null);
  return (
    <MentionInput
      ref={input}
      triggers={[
        { char: "@", label: "Context", items: (q) => fetch(\`/api/search?q=\${encodeURIComponent(q)}\`).then((r) => r.json()) },
        { char: "/", label: "Commands", items: COMMANDS, startOnly: true, variant: "command" },
      ]}
      onSubmit={({ text, mentions }) => {
        sendMessage(
          { text },
          {
            body: {
              context: mentions.filter((m) => m.trigger === "@").map((m) => m.id),
              command: mentions.find((m) => m.trigger === "/")?.id,
            },
          }
        );
        input.current?.clear();
      }}
    />
  );
}

// app/api/chat/route.ts: load what was mentioned into the prompt
import { convertToModelMessages, streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { messages, context = [], command } = await req.json();
  const docs = await Promise.all(context.map(loadDocument)); // your storage
  const result = streamText({
    model: openai("gpt-4.1"),
    system: [command && COMMAND_PROMPTS[command], ...docs.map((d) => \`<doc name="\${d.name}">\\n\${d.text}\\n</doc>\`)]
      .filter(Boolean)
      .join("\\n\\n"),
    messages: convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}`,
  props: [
    { name: 'triggers', type: '{ char; label; items; startOnly?; variant? }[]', description: 'Each opening character, its menu name, and its items or a search (sync or async) that gets the query.' },
    { name: 'onSubmit', type: '(value: { text; mentions; segments }) => void', description: 'Enter sends. text writes mentions as "@label"; segments keep the order for rendering.' },
    { name: 'onChange', type: '(value) => void', description: 'Called on every edit, e.g. to enable a send button.' },
    { name: 'defaultValue', type: 'MentionSegment[]', description: 'Starting text and chips, e.g. a draft.' },
    { name: 'placeholder', type: 'string', default: '"Ask anything"', description: 'Shown while the field is empty; also its label.' },
    { name: 'side', type: '"top" | "bottom"', default: '"top"', description: 'Open above the caret (composers at the bottom of the screen) or below it.' },
    { name: 'anchorRef', type: 'RefObject<HTMLElement>', description: 'Open clear of this element, e.g. your composer, so the menu never covers it.' },
    { name: 'ref', type: '{ focus(); clear() }', description: 'Focus the field, or clear it after sending.' },
  ],
  notes: [
    'The field is a combobox: the open menu is a listbox and the active row is announced through aria-activedescendant.',
    'Arrow keys move, Enter or Tab picks, Escape closes; clicking a row keeps the caret in the field.',
    'Typing in an IME (Japanese, Chinese, Korean) never opens or submits mid-composition, and pasting always inserts plain text.',
    '@ only opens after a space or at the start, so email addresses don’t open the menu.',
  ],
};
