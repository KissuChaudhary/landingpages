import type { UiItem } from '../registry';

export const attachmentChip: UiItem = {
  name: 'attachment-chip',
  title: 'Attachment chip',
  description: 'A file on its way into a prompt: uploading, being read, ready or failed.',
  summary:
    'Shows a file’s whole journey in one small chip. A ring fills around the icon while it uploads, "Reading" shimmers while the model processes it, and when ready it shows type and size. Images show a thumbnail, failures say why with a Retry, and the remove button appears on hover or focus (always on touch screens).',
  file: 'attachment-chip.tsx',
  dependencies: ['lucide-react'],
  css: ['@keyframes ui-shimmer', '@keyframes ui-fade-up'],
  tabs: ['Live', 'Image', 'Error'],
  states: [
    { name: 'uploading', description: 'A progress ring around the icon and "Uploading 42%".' },
    { name: 'processing', description: 'Uploaded; "Reading" shimmers while the model takes it in.' },
    { name: 'ready', description: 'File type and size, e.g. "PDF · 2.4 MB".' },
    { name: 'error', description: 'A red border, the reason and a Retry link.' },
  ],
  usage: `import { AttachmentChip } from "@/components/attachment-chip";

<AttachmentChip name="q3-sales.pdf" type="application/pdf" size={2_400_000} status="uploading" progress={0.42} onRemove={remove} />`,
  recipe: `import type { UIMessage } from "ai";
import { AttachmentChip } from "@/components/attachment-chip";

// Files a user sent arrive as "file" parts on their message.
function SentFiles({ message }: { message: UIMessage }) {
  return message.parts.map((part, i) =>
    part.type === "file" ? (
      <AttachmentChip
        key={i}
        name={part.filename ?? "Attachment"}
        type={part.mediaType}
        previewUrl={part.mediaType.startsWith("image/") ? part.url : undefined}
      />
    ) : null
  );
}`,
  props: [
    { name: 'name / size / type', type: 'string / number / string', description: 'File name, size in bytes and MIME type (picks the icon).' },
    { name: 'previewUrl', type: 'string', description: 'Thumbnail for images, e.g. URL.createObjectURL(file).' },
    { name: 'status', type: '"uploading" | "processing" | "ready" | "error"', default: '"ready"', description: 'Where the file is.' },
    { name: 'progress', type: 'number', description: 'Upload progress from 0 to 1.' },
    { name: 'error / onRetry', type: 'string / () => void', description: 'Why it failed, and a Retry link.' },
    { name: 'onRemove', type: '() => void', description: 'Shows the remove button.' },
  ],
  notes: [
    'The status line is announced politely, so progress and failures reach screen readers.',
    'The remove button is labelled with the file name, e.g. "Remove q3-sales.pdf".',
    'Long names truncate; the chip never grows past 260px.',
  ],
};
