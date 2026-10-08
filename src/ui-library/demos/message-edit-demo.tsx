'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MessageEdit } from '../registry/message-edit';

type Branch = { question: string; answer: string };

const ANSWERS = [
  'Cold scoops, warm welcomes.\nChurned on Main Street every morning.',
  'Small batches, big flavor.\nMade at dawn, gone by dusk.',
  'Real cream, slow churned.\nOne scoop and you’re a regular.',
];

export default function MessageEditDemo() {
  const [branches, setBranches] = useState<Branch[]>([
    { question: 'Write a two-line tagline for our ice cream shop', answer: 'Small batches, big flavor.\nChurned this morning, gone by tonight.' },
  ]);
  const [index, setIndex] = useState(0);
  const [streamed, setStreamed] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearInterval(timer.current), []);

  const branch = branches[index];
  const streaming = streamed !== null;

  // A stand-in for regenerating: the new branch's answer streams in word by word.
  const resend = (question: string) => {
    const answer = ANSWERS[branches.length % ANSWERS.length];
    const words = answer.split(/(?<=\s)/);
    setBranches((b) => [...b, { question, answer }]);
    setIndex(branches.length);
    setStreamed('');
    let i = 0;
    window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      i += 1;
      setStreamed(words.slice(0, i).join(''));
      if (i >= words.length) {
        window.clearInterval(timer.current);
        setStreamed(null);
      }
    }, 70);
  };

  return (
    <div className="flex w-full max-w-[480px] flex-col gap-5">
      <MessageEdit
        text={branch.question}
        onSubmit={resend}
        disabled={streaming}
        versions={{ index, count: branches.length, onIndexChange: (i) => !streaming && setIndex(i) }}
      />
      <p key={index} className="min-h-[3.5rem] whitespace-pre-wrap text-[14px] leading-relaxed text-foreground animate-[ui-fade-in_250ms_ease-out_both]">
        {streaming ? streamed : branch.answer}
        {streaming && <span aria-hidden="true" className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-[ui-blink_1s_steps(1)_infinite] bg-foreground/70" />}
      </p>
    </div>
  );
}
