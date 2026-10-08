'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AnswerActions, FollowUps, StreamingText, type AnswerSegment, type AnswerStatus } from '../registry/streaming-answer';

const ANSWER: AnswerSegment[] = [
  'Pistachio is your fastest-growing flavor: sales are up 23% this month and margins beat vanilla by 8 points.',
  { type: 'citation', label: 'scoopdata.io' },
  '\n\nStone-fruit flavors are trending in the same range, so a peach special would land well next weekend.',
];

const SOURCES = Array.from({ length: 10 }, (_, i) => ({ name: `Source ${i + 1}` }));

type Token = { text: string } | { citation: Extract<AnswerSegment, object> };

function tokenize(segments: AnswerSegment[]): Token[] {
  return segments.flatMap((s): Token[] => (typeof s === 'string' ? s.split(/(?<=\s)/).map((text) => ({ text })) : [{ citation: s }]));
}

/** Replays the answer a word at a time, the way a model stream would deliver it, stopping early if asked. */
function useFakeStream(segments: AnswerSegment[], run: number, stopAfter?: number, interval = 45) {
  const tokens = useMemo(() => tokenize(segments), [segments]);
  const limit = stopAfter ?? tokens.length;
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    const timer = window.setInterval(() => setCount((c) => Math.min(c + 1, limit)), interval);
    return () => window.clearInterval(timer);
  }, [tokens, run, limit, interval]);

  const content = useMemo(() => {
    const out: AnswerSegment[] = [];
    for (const token of tokens.slice(0, count)) {
      if ('citation' in token) out.push(token.citation);
      else if (typeof out[out.length - 1] === 'string') out[out.length - 1] += token.text;
      else out.push(token.text);
    }
    return out;
  }, [tokens, count]);

  return { content, finished: count >= limit };
}

export default function StreamingAnswerDemo({ tab = 'Streaming' }: { tab?: string }) {
  const [run, setRun] = useState(0);
  const cut = tab === 'Streaming' ? undefined : 16;
  const { content, finished } = useFakeStream(ANSWER, run, cut);
  const again = () => setRun((r) => r + 1);

  const status: AnswerStatus = !finished ? 'streaming' : tab === 'Stopped' ? 'stopped' : tab === 'Error' ? 'error' : 'done';

  return (
    <div className="w-full max-w-[400px] text-left">
      <StreamingText content={content} status={status} onRetry={again} />
      <AnswerActions
        className="mt-4"
        disabled={status === 'streaming'}
        copyText="Pistachio is your fastest-growing flavor: sales are up 23% this month and margins beat vanilla by 8 points (scoopdata.io)."
        onRegenerate={again}
        sources={SOURCES}
      />
      <FollowUps className="mt-4" items={['Which flavors sell best in winter', 'Compare gelato and soft serve margins']} onSelect={again} />
    </div>
  );
}
