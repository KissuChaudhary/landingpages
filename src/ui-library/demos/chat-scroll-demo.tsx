'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { ChatScroll } from '../registry/chat-scroll';

type Message = { role: 'user' | 'assistant'; text: string };

const HISTORY: Message[] = [
  { role: 'user', text: 'We open the second shop on Saturday. What should the first week look like?' },
];

const ANSWERS = [
  `Treat the first week as a soft launch that builds into the weekend.

Monday and Tuesday: open to neighbours only. Hand flyers to the shops on your street and offer a free kids’ scoop. You get real customers without a queue you can’t handle yet.

Wednesday: invite the local food accounts for a tasting at 4pm, when the light is good and the shop is calm. Give them three flavours, not ten.

Thursday: fix what broke. Every new shop finds two or three problems, usually the till, the freezer layout and the queue path.

Friday: post the opening hours everywhere and pin the menu. Keep it to eight flavours so the counter moves fast.

Saturday: open an hour early, put your fastest scooper on the counter and someone on the door with tasting spoons. Pistachio will sell out first, so churn a double batch on Friday night.

Sunday: count what sold, what ran out and how long the queue got, and plan week two from that.`,
  `Short version: staff for the queue, not the average.

Two people on the counter from 2pm to 6pm, one on prep. Rotate scoopers every hour so nobody slows down, and keep a runner for cones and cups.

If the queue passes ten people, send someone down the line with a tasting tray and the menu so people order the moment they reach the counter.

Close the till at 9pm sharp the first night; you will need the hour to restock for Sunday.`,
];

export default function ChatScrollDemo() {
  const [messages, setMessages] = useState<Message[]>(HISTORY);
  const [streamed, setStreamed] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const asked = messages.filter((m) => m.role === 'user').length;

  // A stand-in for a model: the answer streams in word by word.
  const stream = (answer: string) => {
    const words = answer.split(/(?<=\s)/);
    let i = 0;
    window.clearInterval(timer.current);
    setStreamed('');
    timer.current = window.setInterval(() => {
      i += 1;
      setStreamed(words.slice(0, i).join(''));
      if (i >= words.length) {
        window.clearInterval(timer.current);
        setStreamed(null);
        setMessages((m) => [...m, { role: 'assistant', text: answer }]);
      }
    }, 80);
  };

  useEffect(() => {
    stream(ANSWERS[0]);
    return () => window.clearInterval(timer.current);
  }, []);

  const followUp = () => {
    if (streamed !== null) return;
    setMessages((m) => [...m, { role: 'user', text: 'How many people should be on shift Saturday?' }]);
    stream(ANSWERS[asked % ANSWERS.length]);
  };

  return (
    <div className="flex w-full max-w-[520px] flex-col gap-2">
      <ChatScroll
        streaming={streamed !== null}
        followKey={asked}
        className="h-[300px] rounded-[22px] border border-border bg-background"
        contentClassName="flex flex-col gap-4 px-5 py-5"
      >
        {messages.map((m, i) =>
          m.role === 'user' ? (
            <p key={i} className="ml-auto w-fit max-w-[85%] rounded-[18px] bg-muted px-3.5 py-2 text-[13.5px] leading-relaxed text-foreground">
              {m.text}
            </p>
          ) : (
            <p key={i} className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-foreground">
              {m.text}
            </p>
          )
        )}
        {streamed !== null && (
          <p className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-foreground">
            {streamed}
            <span aria-hidden="true" className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-[ui-blink_1s_steps(1)_infinite] bg-foreground/70" />
          </p>
        )}
      </ChatScroll>
      <div className="flex items-center justify-between px-1">
        <span className="text-[12px] text-muted-foreground">Scroll up while it writes.</span>
        <button
          type="button"
          onClick={followUp}
          disabled={streamed !== null}
          className="flex h-8 items-center gap-1.5 rounded-full bg-primary pl-3 pr-2.5 text-[12.5px] font-medium text-primary-foreground transition-[opacity,transform] active:scale-[0.96] disabled:opacity-35"
        >
          Ask a follow-up
          <ArrowUp className="size-3.5" strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
