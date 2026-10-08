'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { VoiceInput, type VoiceStatus } from '../registry/voice-input';

const WORDS = 'Summarise the three biggest risks in this launch plan and suggest one fix for each'.split(' ');

export default function VoiceInputDemo({ tab = 'Live' }: { tab?: string }) {
  const [status, setStatus] = useState<VoiceStatus>(tab === 'Blocked' ? 'blocked' : tab === 'Error' ? 'error' : 'idle');
  const [level, setLevel] = useState(0);
  const [words, setWords] = useState(0);
  const [startedAt, setStartedAt] = useState<number>();
  const [sent, setSent] = useState('');
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearInterval(t));
    timers.current = [];
  };
  useEffect(() => clear, []);

  // A stand-in for a real microphone: a level that rises and falls like speech, and words arriving.
  const start = () => {
    clear();
    setSent('');
    setWords(0);
    setStartedAt(Date.now());
    setStatus('listening');
    let t = 0;
    timers.current.push(
      window.setInterval(() => {
        t += 1;
        const syllable = Math.abs(Math.sin(t * 0.9)) * (0.55 + 0.45 * Math.abs(Math.sin(t * 0.23)));
        setLevel(t % 17 < 3 ? 0.05 : syllable);
      }, 80),
      window.setInterval(() => setWords((w) => Math.min(WORDS.length, w + 1)), 260)
    );
  };

  const stop = () => {
    clear();
    setStatus('transcribing');
    timers.current.push(
      window.setTimeout(() => {
        setSent(WORDS.join(' '));
        setStatus('idle');
      }, 1300)
    );
  };

  const cancel = () => {
    clear();
    setStatus('idle');
  };

  const retry = () => (tab === 'Live' || tab === 'In a composer' ? start() : setStatus(tab === 'Blocked' ? 'blocked' : 'error'));
  const transcript = status === 'listening' ? WORDS.slice(0, words).join(' ') : undefined;

  // The real-world case: a mic beside Send. The bar grows leftwards across the field while you talk.
  if (tab === 'In a composer') {
    return (
      <div className="flex w-full max-w-[460px] flex-col gap-3">
        <div className="relative flex min-h-[52px] items-end gap-1.5 rounded-[26px] border border-border bg-background p-1.5">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 truncate text-[14px] text-muted-foreground transition-opacity duration-300"
            style={{ opacity: status === 'idle' ? 1 : 0, maxWidth: 'calc(100% - 7rem)' }}
          >
            {sent ? `“${sent}”` : 'Ask anything'}
          </span>
          <VoiceInput
            align="end"
            status={status}
            level={level}
            transcript={transcript}
            startedAt={startedAt}
            onStart={start}
            onStop={stop}
            onCancel={cancel}
            className="min-w-0 flex-1 [&>div:first-child_p]:px-2.5 [&>div:first-child_p]:pt-1.5"
          />
          <button
            type="button"
            aria-label="Send"
            disabled={!sent || status !== 'idle'}
            onClick={() => setSent('')}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity duration-300 disabled:opacity-35"
          >
            <ArrowUp className="size-4" strokeWidth={2.4} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-[420px] flex-col gap-3">
      <VoiceInput
        status={status}
        level={level}
        transcript={transcript}
        startedAt={startedAt}
        onStart={retry}
        onStop={stop}
        onCancel={cancel}
        className="w-full"
      />
      {status === 'idle' && (
        <p className="text-[12.5px] text-muted-foreground animate-[ui-fade-in_300ms_ease-out_both] motion-reduce:animate-none">{sent ? `“${sent}”` : 'Press the mic to dictate.'}</p>
      )}
    </div>
  );
}
