'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChatHistory, type ChatSummary } from '../registry/chat-history';

const HOUR = 3_600_000;
const DAY = 24 * HOUR;

const seed = (now: number): ChatSummary[] => [
  { id: 'c1', title: 'Autumn menu launch plan', updatedAt: now - 0.5 * HOUR, pinned: true },
  { id: 'c2', title: 'Pistachio supplier prices', updatedAt: now - 2 * HOUR },
  { id: 'c3', title: 'Opening week Instagram posts', updatedAt: now - 5 * HOUR },
  { id: 'c4', title: 'Rewrite the loyalty card copy', updatedAt: now - 1.1 * DAY },
  { id: 'c5', title: 'Queue layout for weekends', updatedAt: now - 1.4 * DAY },
  { id: 'c6', title: 'Staff rota for August', updatedAt: now - 3 * DAY },
  { id: 'c7', title: 'Dairy-free flavour ideas', updatedAt: now - 5 * DAY },
  { id: 'c8', title: 'Harbour Road lease questions', updatedAt: now - 12 * DAY },
  { id: 'c9', title: 'Launch budget spreadsheet', updatedAt: now - 20 * DAY },
];

const TITLES = ['Saturday staffing plan', 'Tasting event guest list', 'Price list for the new shop'];

export default function ChatHistoryDemo({ tab = 'Live' }: { tab?: string }) {
  const [chats, setChats] = useState<ChatSummary[]>(() => seed(Date.now()));
  const [active, setActive] = useState('c2');
  const count = useRef(0);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  // A stand-in for title generation: a new chat gets its title a moment after the first message.
  const newChat = () => {
    const id = `new-${count.current}`;
    const title = TITLES[count.current++ % TITLES.length];
    setChats((c) => [{ id, updatedAt: Date.now(), generating: true }, ...c]);
    setActive(id);
    timers.current.push(window.setTimeout(() => setChats((c) => c.map((x) => (x.id === id ? { ...x, title, generating: false } : x))), 1600));
  };

  useEffect(() => {
    if (tab !== 'Live') return;
    timers.current.push(window.setTimeout(newChat, 900));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <div className="h-[340px] w-full max-w-[300px] rounded-[20px] border border-border bg-background p-2">
      <ChatHistory
        className="h-full"
        chats={chats}
        activeId={active}
        defaultQuery={tab === 'Search' ? 'launch' : ''}
        onSelect={setActive}
        onNew={newChat}
        onRename={(id, title) => setChats((c) => c.map((x) => (x.id === id ? { ...x, title } : x)))}
        onPin={(id, pinned) => setChats((c) => c.map((x) => (x.id === id ? { ...x, pinned } : x)))}
        onDelete={(id) => setChats((c) => c.filter((x) => x.id !== id))}
      />
    </div>
  );
}
