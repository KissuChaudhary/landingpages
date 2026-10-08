'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AnswerActions, FollowUps, StreamingText, type AnswerSegment } from '../registry/streaming-answer';

const ANSWER: AnswerSegment[] = [
  'Pistachio is your fastest-growing flavor: sales are up 23% this month and margins beat vanilla by 8 points.',
  { type: 'citation', label: 'scoopdata.io' },
  ' Stone-fruit flavors are trending in the same range.',
];

const SOURCES = Array.from({ length: 10 }, (_, i) => ({ name: `Source ${i + 1}` }));

type Token = { text: string } | { citation: Extract<AnswerSegment, object> };

function tokenize(segments: AnswerSegment[]): Token[] {
  return segments.flatMap((s): Token[] =>
    typeof s === 'string' ? s.split(/(?<=\s)/).map((text) => ({ text })) : [{ citation: s }]
  );
}

/** Replays the answer a word at a time, the way a model stream would deliver it. */
function useFakeStream(segments: AnswerSegment[], run: number, interval = 45) {
  const tokens = useMemo(() => tokenize(segments), [segments]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    const timer = window.setInterval(() => {
      setCount((c) => {
        if (c >= tokens.length) {
          window.clearInterval(timer);
          return c;
        }
        return c + 1;
      });
    }, interval);
    return () => window.clearInterval(timer);
  }, [tokens, run, interval]);

  const content = useMemo(() => {
    const out: AnswerSegment[] = [];
    for (const token of tokens.slice(0, count)) {
      if ('citation' in token) out.push(token.citation);
      else if (typeof out[out.length - 1] === 'string') out[out.length - 1] += token.text;
      else out.push(token.text);
    }
    return out;
  }, [tokens, count]);

  return { content, streaming: count < tokens.length };
}

export default function StreamingAnswerDemo() {
  const [run, setRun] = useState(0);
  const { content, streaming } = useFakeStream(ANSWER, run);
  const again = () => setRun((r) => r + 1);

  return (
    <div className="w-full max-w-[380px] text-left">
      <StreamingText content={content} streaming={streaming} />
      <AnswerActions
        className="mt-4"
        copyText="Pistachio is your fastest-growing flavor: sales are up 23% this month and margins beat vanilla by 8 points (scoopdata.io). Stone-fruit flavors are trending in the same range."
        onRegenerate={again}
        sources={SOURCES}
      />
      <FollowUps className="mt-4" items={['Which flavors sell best in winter', 'Compare gelato and soft serve margins']} onSelect={again} />
    </div>
  );
}
