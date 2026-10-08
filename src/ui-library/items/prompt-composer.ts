import type { UiItem } from '../registry';

export const promptComposer: UiItem = {
  name: 'prompt-composer',
  title: 'Prompt composer',
  description: 'The input that starts it all: grows as you type, takes files, and turns Send into Stop while answering.',
  summary:
    'A composer that takes useChat’s status as is. Send morphs into Stop while the answer streams and shows a spinner while waiting for the first token. It grows with the text, sends on Enter (Shift+Enter for a new line, safe for IME input), and takes files from the paperclip, paste or drag and drop. Slots hold attachment chips and a toolbar, and it can be disabled with a reason.',
  group: 'before',
  file: 'prompt-composer.tsx',
  dependencies: ['lucide-react'],
  css: ['@keyframes ui-fade-in'],
  tabs: ['Live', 'With files', 'Rate limited'],
  states: [
    { name: 'ready', description: 'Type; Send is enabled once there’s text (or files, with allowEmpty).' },
    { name: 'submitted', description: 'Sent and waiting for the first token: the button shows a spinner.' },
    { name: 'streaming', description: 'The button becomes Stop and calls onStop.' },
    { name: 'error', description: 'Back to ready so the user can resend.' },
    { name: 'disabled', description: 'Input locked, with your reason shown above it.' },
    { name: 'dragging', description: 'A dashed border and "Drop files to attach" while files are dragged over.' },
  ],
  usage: `import { PromptComposer } from "@/components/prompt-composer";

<PromptComposer
  status={status}
  onSubmit={(text) => send(text)}
  onStop={stop}
  onFilesSelected={(files) => addFiles(files)}
  toolbar={<ModeSwitcher modes={modes} />}
  maxLength={4000}
/>`,
  recipe: `import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { PromptComposer } from "@/components/prompt-composer";
import { AttachmentChip } from "@/components/attachment-chip";

function Composer() {
  const { sendMessage, status, stop } = useChat();
  const [files, setFiles] = useState<File[]>([]);

  const send = (text: string) => {
    const list = new DataTransfer();
    files.forEach((file) => list.items.add(file));
    sendMessage({ text, files: list.files });
    setFiles([]);
  };

  return (
    <PromptComposer
      status={status}
      onSubmit={send}
      onStop={stop}
      allowEmpty={files.length > 0}
      onFilesSelected={(added) => setFiles((prev) => [...prev, ...added])}
      attachments={
        files.length > 0 &&
        files.map((file, i) => (
          <AttachmentChip
            key={file.name + i}
            name={file.name}
            size={file.size}
            type={file.type}
            onRemove={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
          />
        ))
      }
    />
  );
}`,
  props: [
    { name: 'onSubmit / onStop', type: '(text) => void / () => void', description: 'Send the prompt; stop the answer while streaming.' },
    { name: 'status', type: '"ready" | "submitted" | "streaming" | "error"', default: '"ready"', description: 'useChat’s status, passed straight through.' },
    { name: 'value / defaultValue / onValueChange', type: 'string', description: 'Controlled or uncontrolled text. Uncontrolled clears itself after sending.' },
    { name: 'placeholder', type: 'string', default: '"Ask anything"', description: 'Also used as the input’s accessible label.' },
    { name: 'disabled / disabledReason', type: 'boolean / ReactNode', description: 'Lock the input and say why.' },
    { name: 'onFilesSelected / accept', type: '(files: File[]) => void / string', description: 'Enables the paperclip, paste and drag and drop.' },
    { name: 'attachments / toolbar', type: 'ReactNode', description: 'Chips above the text; controls at the bottom left.' },
    { name: 'maxLength / allowEmpty', type: 'number / boolean', description: 'A counter appears near the limit; allow sending files without text.' },
  ],
  notes: [
    'Enter sends only when not composing with an IME, so Chinese, Japanese and Korean input works.',
    'The send button’s label changes with its job: Send, Sending or Stop.',
    'The text grows to 200px, then scrolls.',
    'Paste with files attaches them; paste with text still pastes the text.',
  ],
};
