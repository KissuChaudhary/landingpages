'use client';

import React from 'react';
import { TextMorph } from '@/ui-library/registry/text-morph';
import MeasuredText from '@/components/home/MeasuredText';

/* The headline's changing word: Text morph keeps the letters two words share and eases the width, so the line re-centres
 * in the same motion. It only cycles while the headline is on screen, and holds still with reduced motion. */

const reducedQuery = '(prefers-reduced-motion: reduce)';
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const useReducedMotion = () => React.useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => false);

export default function HeroWord({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!visible || reduced) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearTimeout(timer);
  }, [visible, reduced, index, interval, words.length]);

  return (
    <span
      ref={ref}
      className="mx-auto mt-6 block w-fit lg:mx-0 lg:mt-0 lg:inline-block"
    >
      <MeasuredText>
        <span className="inline-block bg-[radial-gradient(circle,rgba(24,25,37,0.22)_1.4px,transparent_1.9px)] bg-[length:11px_7px] bg-bottom bg-repeat-x pb-[0.1em]">
          <TextMorph duration={520}>{words[index]}</TextMorph>
        </span>
      </MeasuredText>
    </span>
  );
}
