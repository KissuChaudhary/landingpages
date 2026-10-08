'use client';

import React, { useState } from 'react';
import { MessageCircleQuestion, Scissors, Smile, Sparkles, SpellCheck } from 'lucide-react';
import { SelectionActions, type SelectionRequest } from '../registry/selection-actions';

const START =
  'Pistachio holds the top slot all weekend. Churn it first thing Saturday so the batch has time to firm up before the afternoon rush. Honestly the strawberry is really good too, but we basically need to make sure there is enough cones for the queue, which gets very long after 3pm.';

type Swap = [RegExp, string];
const swap = (s: string, pairs: Swap[]) => pairs.reduce((out, [from, to]) => out.replace(from, to), s);
const tidy = (s: string) =>
  s
    .replace(/\b(honestly|really|basically|very|just|actually)\s+/gi, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/(^|[.!?]\s+)([a-z])/g, (_, lead: string, c: string) => lead + c.toUpperCase());

const improve = (s: string) =>
  swap(tidy(s), [
    [/firm up/, 'fully firm'],
    [/is good too/, 'is selling well too'],
    [/make sure there is enough/, 'ensure there are enough'],
    [/which gets long after 3pm\.?/, 'which stretches out after 3 p.m.'],
  ]);

const REWRITES: Record<string, (s: string) => string> = {
  improve,
  custom: improve,
  shorten: (s) =>
    swap(tidy(s), [
      [/ holds the top slot all weekend/, ' leads all weekend'],
      [/ first thing Saturday so the batch has time to firm up before the afternoon rush/, ' early Saturday so it sets before the rush'],
      [/but we need to make sure there is enough cones for the queue, which gets long after 3pm/, 'stock extra cones for the after-3 p.m. queue'],
    ]),
  tone: (s) =>
    swap(improve(s), [
      [/^Churn it/, 'Let’s churn it'],
      [/but we need to ensure/, 'so let’s make sure'],
      [/\.$/, '!'],
    ]),
  grammar: (s) =>
    swap(s, [
      [/Honestly the/, 'Honestly, the'],
      [/there is enough cones/, 'there are enough cones'],
      [/3pm\.?/, '3 p.m.'],
    ]),
};

const wait = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(resolve, ms);
    signal.addEventListener('abort', () => (window.clearTimeout(timer), reject(signal.reason)), { once: true });
  });

// A stand-in for a model: a short think, then the rewrite streamed word by word.
async function* rewrite({ id, text, signal }: SelectionRequest) {
  await wait(650, signal);
  for (const word of (REWRITES[id] ?? improve)(text).match(/\S+\s*/g) ?? []) {
    await wait(30 + Math.random() * 40, signal);
    yield word;
  }
}

export default function SelectionActionsDemo() {
  const [value, setValue] = useState(START);
  const [asked, setAsked] = useState('');

  return (
    <div className="w-full max-w-[460px]">
      <SelectionActions
        value={value}
        onValueChange={setValue}
        actions={[
          { id: 'explain', label: 'Explain', icon: <MessageCircleQuestion /> },
          { id: 'improve', label: 'Improve', icon: <Sparkles />, pendingLabel: 'Improving' },
        ]}
        more={[
          { id: 'shorten', label: 'Shorten', icon: <Scissors />, pendingLabel: 'Shortening' },
          { id: 'tone', label: 'Tone', icon: <Smile />, pendingLabel: 'Changing tone' },
          { id: 'grammar', label: 'Grammar', icon: <SpellCheck />, pendingLabel: 'Fixing grammar' },
        ]}
        onAction={(request) => {
          if (request.id !== 'explain') return rewrite(request);
          setAsked(request.text); // handled elsewhere: in your app, this would open the chat
        }}
        className="text-[14px] leading-7 text-foreground"
      />
      <p className="mt-14 text-[12px] text-muted-foreground">
        {asked ? (
          <>Explain hands “{asked.length > 48 ? `${asked.slice(0, 48)}…` : asked}” to your chat.</>
        ) : value === START ? (
          'Select part of the note.'
        ) : (
          <button type="button" onClick={() => setValue(START)} className="underline decoration-border underline-offset-4 hover:text-foreground">
            Reset the note
          </button>
        )}
      </p>
    </div>
  );
}
