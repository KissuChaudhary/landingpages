'use client';

import React, { useState } from 'react';
import { ChatNotice } from '../registry/chat-notice';

export default function ChatNoticeDemo({ tab = 'Error' }: { tab?: string }) {
  const [retrying, setRetrying] = useState(false);
  const [resetAt] = useState(() => Date.now() + (4 * 60 + 59) * 1000);

  const retry = () => {
    setRetrying(true);
    window.setTimeout(() => setRetrying(false), 1800);
  };

  return (
    <div className="w-full max-w-[460px]">
      {tab === 'Error' && <ChatNotice kind="error" details="504 Gateway Timeout · req_8f2k1c" onRetry={retry} retrying={retrying} />}
      {tab === 'Offline' && <ChatNotice kind="offline" onRetry={retry} retrying />}
      {tab === 'Rate limit' && <ChatNotice kind="rate-limit" resetAt={resetAt} onUpgrade={() => {}} upgradeLabel="Upgrade to Pro" />}
      {tab === 'Long chat' && <ChatNotice kind="context" onNewChat={() => {}} onSummarize={() => {}} />}
    </div>
  );
}
