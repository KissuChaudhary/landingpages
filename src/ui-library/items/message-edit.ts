import type { UiItem } from '../registry';

export const messageEdit: UiItem = {
  name: 'message-edit',
  title: 'Edit and resend',
  description: 'Fix a sent message where it sits. The bubble grows into an editor, then folds back and branches the reply.',
  summary:
    'People rephrase constantly, and scrolling down to retype a question breaks their flow. Hover a sent message for Copy and Edit. Editing grows the bubble into a field right where it sits, widening from its right edge to fit, with the text ready to change. Enter sends and folds it back; Escape cancels. When the message has branches, "2 / 2" steps between them, so the earlier question and its answer are never lost.',
  group: 'chat',
  file: 'message-edit.tsx',
  dependencies: ['lucide-react'],
  css: ['@keyframes ui-fade-in', '@keyframes ui-pop-in'],
  states: [
    { name: 'sent', description: 'The message bubble. Copy and Edit appear on hover or focus (always on touch screens).' },
    { name: 'editing', description: 'The bubble grows into a field in place, caret at the end. Send stays disabled until the text changes.' },
    { name: 'versions', description: 'With more than one branch, a "2 / 2" pager steps between them.' },
    { name: 'disabled', description: 'While an answer streams, Edit is dimmed and says why on hover.' },
  ],
  usage: `import { MessageEdit } from "@/components/message-edit";

<MessageEdit text={message.text} onSubmit={(text) => resend(message.id, text)} disabled={busy} />`,
  recipe: `"use client";
import { useChat } from "@ai-sdk/react";
import { MessageEdit } from "@/components/message-edit";

export function UserMessages() {
  const { messages, sendMessage, status } = useChat();
  const busy = status === "submitted" || status === "streaming";

  return messages
    .filter((m) => m.role === "user")
    .map((m) => {
      const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
      return (
        <MessageEdit
          key={m.id}
          text={text}
          disabled={busy}
          // Replaces this message, drops everything after it and asks again.
          onSubmit={(next) => sendMessage({ text: next, messageId: m.id })}
        />
      );
    });
}`,
  props: [
    { name: 'text', type: 'string', description: 'The message as sent; the editor starts from it.' },
    { name: 'onSubmit', type: '(text: string) => void', description: 'Called with the edited text. Replace the message and regenerate from it.' },
    { name: 'disabled / disabledReason', type: 'boolean / string', default: 'false / "Wait for the answer to finish"', description: 'Pause editing, e.g. while an answer streams.' },
    { name: 'versions', type: '{ index; count; onIndexChange }', description: 'Branches of this message, shown as "2 / 3" when there is more than one.' },
    { name: 'children', type: 'ReactNode', description: 'How the sent message renders (mentions, attachments); defaults to the text.' },
  ],
  notes: [
    'Enter sends and Shift+Enter adds a line, like the composer; Escape cancels. IME composition never sends early.',
    'Focus moves into the field on edit and back to the Edit button after sending or cancelling.',
    'The version counter is announced politely; the pager arrows are real buttons, disabled at either end.',
    'The morph uses the Web Animations API and is skipped with reduced motion.',
  ],
};
