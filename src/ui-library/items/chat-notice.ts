import type { UiItem } from '../registry';

export const chatNotice: UiItem = {
  name: 'chat-notice',
  title: 'Error and limit states',
  description: 'Calm, specific notices for failed answers, being offline, rate limits and chats that grow too long.',
  summary:
    'Every AI product hits these, and most show a red box with "Error". Each notice says what happened, what happens next and offers the one action that helps: Retry, which opens a spinner and morphs to "Retrying" while it runs; a countdown that rolls down to when the limit resets, then turns the hourglass into a check that draws itself as the words morph to "You can send messages again"; or starting fresh with a summary. Technical details fold away behind "Show details".',
  file: 'chat-notice.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['number-roll', 'status-button', 'text-morph'],
  css: ['@keyframes ui-fade-up', '@keyframes ui-breathe'],
  tabs: ['Error', 'Offline', 'Rate limit', 'Long chat'],
  states: [
    { name: 'error', description: '"Something went wrong", reassurance that the message is safe, and Retry: a Status button whose spinner opens in as it morphs to "Retrying". Details fold open (420ms) as "Show details" morphs to "Hide details".' },
    { name: 'offline', description: 'Explains it will pick up when the connection is back; "Reconnecting" opens in with a soft pulse while retrying, and "Try now" spins while it tries.' },
    { name: 'rate-limit', description: 'The countdown rolls down a second at a time (00 rolls back to 59). At zero the hourglass blurs into a check that draws itself, the title and description morph to "You can send messages again" / "Your limit has reset." and Upgrade folds away.' },
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
    'Errors use role="alert"; the other kinds use role="status", so screen readers hear them without interruption. The ticking digits are hidden from them (they hear the time it resets instead), so the countdown never chatters.',
    'The countdown starts once mounted, cleans up its timer and calls onReset once when the limit resets.',
    'Installs Number roll, Status button and Text morph. With reduced motion, states change in place.',
    'Actions wrap under the text on narrow screens.',
  ],
};
