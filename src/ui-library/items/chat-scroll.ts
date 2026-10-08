import type { UiItem } from '../registry';

export const chatScroll: UiItem = {
  name: 'chat-scroll',
  title: 'Jump to latest',
  description: 'A chat that follows the answer as it streams, lets go the moment you scroll up, and brings you back.',
  summary:
    'Every chat needs this, and most get it wrong: they drag you back down while you read, or leave you stranded mid-answer. This scroll area stays pinned to the bottom while text streams in, and lets go the instant you reach for the wheel, trackpad, touch or keyboard. While you’re away a round ↓ button waits; when new text lands below, it widens into "● Writing" under a sweep of light, and when the answer ends the words morph into "New reply" as the pill eases to fit. Click it and the chat glides down, chasing the moving bottom, and starts following again.',
  file: 'chat-scroll.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['text-morph'],
  css: ['@keyframes ui-sheen', '@keyframes ui-ping'],
  states: [
    { name: 'following', description: 'At the bottom: new content keeps the latest line in view, with no visible jumps.' },
    { name: 'away', description: 'You scrolled up: it stops following immediately and a round ↓ button fades up.' },
    { name: 'new below', description: 'Content arrived while you were away: the button widens (380ms) into a pulsing "Writing" while streaming; when it ends, "Writing" morphs into "New reply" and the pulse settles.' },
    { name: 'back', description: 'The button glides to the bottom, re-reading it each frame, and following resumes. Changing followKey does the same.' },
  ],
  usage: `import { ChatScroll } from "@/components/chat-scroll";

<ChatScroll streaming={busy} followKey={lastUserMessageId} className="flex-1" contentClassName="mx-auto max-w-2xl px-4 py-6">
  {messages.map(renderMessage)}
</ChatScroll>`,
  recipe: `"use client";
import { useChat } from "@ai-sdk/react";
import { ChatScroll } from "@/components/chat-scroll";

export function Conversation() {
  const { messages, status } = useChat();
  const lastUser = messages.findLast((m) => m.role === "user");

  return (
    <ChatScroll
      streaming={status === "streaming"}
      followKey={lastUser?.id} // sending a message brings the person back down
      className="h-full"
      contentClassName="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-6"
    >
      {messages.map((m) => (
        <Message key={m.id} message={m} />
      ))}
    </ChatScroll>
  );
}`,
  props: [
    { name: 'children', type: 'ReactNode', description: 'The messages.' },
    { name: 'streaming', type: 'boolean', default: 'false', description: 'While true, the button says "Writing" with a pulsing dot.' },
    { name: 'followKey', type: 'string | number', description: 'Change it, e.g. to the latest user message id, to glide back to the bottom.' },
    { name: 'threshold', type: 'number', default: '48', description: 'How close to the bottom (px) still counts as at the bottom.' },
    { name: 'className / contentClassName', type: 'string', description: 'Give the area a height (or flex-1); style the inner column.' },
  ],
  notes: [
    'It lets go on the first upward wheel, touch drag, Page Up, Up arrow or Home, before the next frame of text can pull the reader back.',
    'The area is focusable, so the keyboard can scroll it; the button names what is waiting ("Still writing below. Jump to latest").',
    'Following uses a ResizeObserver on the content, so images and code blocks that load late are handled too.',
    'Installs Text morph. With reduced motion, the jump is instant and the button and its words simply change.',
  ],
};
