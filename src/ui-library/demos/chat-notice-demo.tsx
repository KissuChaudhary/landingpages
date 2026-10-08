'use client';

import React, { useEffect, useState } from 'react';
import { ChatNotice } from '../registry/chat-notice';

export default function ChatNoticeDemo({ tab = 'Error' }: { tab?: string }) {
  // Offline starts mid-reconnect; the others wait for a click.
  const [retrying, setRetrying] = useState(tab === 'Offline');
  // A short limit, so you can watch it roll down and reset.
  const [resetAt] = useState(() => Date.now() + 12 * 1000);

  useEffect(() => {
    if (!retrying) return;
    const timer = window.setTimeout(() => setRetrying(false), tab === 'Offline' ? 2600 : 1800);
    return () => window.clearTimeout(timer);
  }, [retrying, tab]);

  const retry = () => setRetrying(true);

  return (
    <div className="w-full max-w-[460px]">
      {tab === 'Error' && <ChatNotice kind="error" details="504 Gateway Timeout · req_8f2k1c" onRetry={retry} retrying={retrying} />}
      {tab === 'Offline' && <ChatNotice kind="offline" onRetry={retry} retrying={retrying} />}
      {tab === 'Rate limit' && <ChatNotice kind="rate-limit" resetAt={resetAt} onUpgrade={() => {}} upgradeLabel="Upgrade to Pro" />}
      {tab === 'Long chat' && <ChatNotice kind="context" onNewChat={() => {}} onSummarize={() => {}} />}
    </div>
  );
}
