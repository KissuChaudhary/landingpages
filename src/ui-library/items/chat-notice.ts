import type { UiItem } from '../registry';

export const chatNotice: UiItem = {
  name: 'chat-notice',
  title: 'Error and limit states',
  description: 'Calm, specific notices for failed answers, being offline, rate limits and chats that grow too long.',
  summary:
    'Every AI product hits these, and most show a red box with "Error". Each notice says what happened, what happens next and offers the one action that helps: Retry, a live countdown to when the limit resets, or starting fresh with a summary. Technical details fold away behind "Show details".',
  group: 'answer',
  file: 'chat-notice.tsx',
  dependencies: ['lucide-react'],
  css: ['@keyframes ui-fade-up', '@keyframes ui-breathe'],
  tabs: ['Error', 'Offline', 'Rate limit', 'Long chat'],
  states: [
    { name: 'error', description: '"Something went wrong", reassurance that the message is safe, and Retry (with a spinner while retrying).' },
    { name: 'offline', description: 'Explains it will pick up when the connection is back; a soft "Reconnecting" pulse while retrying.' },
    { name: 'rate-limit', description: 'A live countdown to the reset and an Upgrade action; flips to "You can send messages again" on time.' },
    { name: 'context', description: 'Offers a new chat, or continuing with a summary of this one.' },
  ],
  usage: `import { ChatNotice } from "@/components/chat-notice";

<ChatNotice kind="rate-limit" resetAt={resetAt} onUpgrade={openPricing} />
<ChatNotice kind="error" details="504 · req_8f2k1" onRetry={retry} />`,
  recipe: `import { useChat } from "@ai-sdk/react";
import { useSyncExternalStore } from "react";
import { ChatNotice } from "@/components/chat-notice";

const useOnline = () =>
  useSyncExternalStore(
    (cb) => (addEventListener("online", cb), addEventListener("offline", cb), () => (removeEventListener("online", cb), removeEventListener("offline", cb))),
    () => navigator.onLine,
    () => true
  );

function ChatErrors() {
  const { status, error, regenerate, clearError } = useChat();
  const online = useOnline();
  if (!online) return <ChatNotice kind="offline" />;
  if (status !== "error") return null;
  return (
    <ChatNotice
      kind={error?.message.includes("rate limit") ? "rate-limit" : "error"}
      details={error?.message}
      onRetry={() => {
        clearError();
        regenerate();
      }}
    />
  );
}`,
  props: [
    { name: 'kind', type: '"error" | "offline" | "rate-limit" | "context"', description: 'Picks the icon, wording and actions.' },
    { name: 'title / description', type: 'string', description: 'Override the default wording.' },
    { name: 'resetAt / onReset', type: 'number / () => void', description: 'Rate limit: when sending is allowed again, with a live countdown.' },
    { name: 'onRetry / retrying', type: '() => void / boolean', description: 'Retry button, with a spinner (or "Reconnecting" when offline) while it runs.' },
    { name: 'onUpgrade / upgradeLabel', type: '() => void / string', default: '"Upgrade"', description: 'Rate limit: the way out.' },
    { name: 'onSummarize / onNewChat', type: '() => void', description: 'Context: continue with a summary, or start over.' },
    { name: 'details', type: 'string', description: 'Technical details behind "Show details".' },
  ],
  notes: [
    'Errors use role="alert"; the other kinds use role="status", so screen readers hear them without interruption.',
    'The countdown cleans up its timer and calls onReset once when the limit resets.',
    'Actions wrap under the text on narrow screens.',
  ],
};
