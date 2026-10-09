"use client";

import * as React from "react";
import { useMotion } from "./MotionProvider";
import { useInView, usePageVisible } from "./useInView";

/*
 * The headline's moving word.
 *   leaving   each letter is squeezed to Mona Sans' narrowest width, leans
 *             forward and blurs away, left to right
 *   arriving  the next word's letters come in from the widest cut, leaning
 *             back, and settle to normal width one after another
 *   width     the space for the word eases to the next word's measured
 *             width, so the line re-centres in the same motion
 * It waits while off screen, in a background tab, paused or with reduced
 * motion. Screen readers get the sentence once, with the first word.
 */

const EASE = "cubic-bezier(0.16,1,0.3,1)";

type Props = {
  words: string[];
  /** Time each word stays, in ms. */
  interval?: number;
  className?: string;
  /** Called with the new word's index each time it changes. */
  onChange?: (index: number) => void;
};

export function RotatingWord({ words, interval = 2800, className = "", onChange }: Props) {
  const { still, reduced } = useMotion();
  const visible = usePageVisible();
  const [ref, inView] = useInView<HTMLSpanElement>({ once: false, rootMargin: "0px" });
  const [index, setIndex] = React.useState(0);
  const [leaving, setLeaving] = React.useState<{ word: string; key: number } | null>(null);
  const [widths, setWidths] = React.useState<number[]>([]);
  const measureRef = React.useRef<HTMLSpanElement>(null);
  const currentRef = React.useRef<HTMLSpanElement>(null);
  const leavingRef = React.useRef<HTMLSpanElement>(null);
  const first = React.useRef(true);

  // Every word's width, measured from hidden copies, so the space can ease between exact numbers.
  React.useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const measure = () => {
      const next = Array.from(el.children).map((child) => (child as HTMLElement).offsetWidth);
      setWidths((prev) => (prev.length === next.length && prev.every((w, i) => w === next[i]) ? prev : next));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [words]);

  // Advance while it can be seen and motion is allowed.
  React.useEffect(() => {
    if (still || !visible || !inView || words.length < 2) return;
    const timer = window.setTimeout(() => {
      setLeaving({ word: words[index], key: Date.now() });
      const next = (index + 1) % words.length;
      setIndex(next);
      onChange?.(next);
    }, interval);
    return () => window.clearTimeout(timer);
  }, [still, visible, inView, index, interval, words, onChange]);

  // Letters of the new word arrive; the first word arrives with the hero.
  React.useLayoutEffect(() => {
    const el = currentRef.current;
    if (!el || reduced) return;
    const isFirst = first.current;
    first.current = false;
    Array.from(el.children).forEach((letter, i) => {
      (letter as HTMLElement).animate(
        [
          { opacity: 0, filter: "blur(12px)", transform: "translateY(0.2em) skewX(-16deg)", fontVariationSettings: '"wdth" 125' },
          { opacity: 1, filter: "blur(0px)", transform: "none", fontVariationSettings: '"wdth" 100' },
        ],
        { duration: 860, delay: (isFirst ? 520 : 300) + i * 30, easing: EASE, fill: "backwards" },
      );
    });
  }, [index, reduced]);

  // Letters of the old word leave, then the copy is removed.
  React.useLayoutEffect(() => {
    const el = leavingRef.current;
    if (!el || !leaving) return;
    if (reduced) {
      setLeaving(null);
      return;
    }
    const letters = Array.from(el.children) as HTMLElement[];
    const animations = letters.map((letter, i) =>
      letter.animate(
        [
          { opacity: 1, filter: "blur(0px)", transform: "none", fontVariationSettings: '"wdth" 100' },
          { opacity: 0, filter: "blur(10px)", transform: "translateY(-0.16em) skewX(18deg)", fontVariationSettings: '"wdth" 75' },
        ],
        { duration: 380, delay: i * 18, easing: "cubic-bezier(0.55,0,0.75,0.2)", fill: "forwards" },
      ),
    );
    const done = animations[animations.length - 1]?.finished;
    let cancelled = false;
    done?.then(() => !cancelled && setLeaving((l) => (l?.key === leaving.key ? null : l))).catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [leaving, reduced]);

  const width = widths[index];
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`relative inline-block whitespace-nowrap align-baseline ${className}`}
      style={{ width: width || undefined, transition: reduced ? "none" : `width 720ms ${EASE}` }}
    >
      {leaving && (
        <span key={leaving.key} ref={leavingRef} className="pointer-events-none absolute left-0 top-0">
          {leaving.word.split("").map((ch, i) => (
            <span key={i} className="inline-block origin-[0%_70%]">
              {ch}
            </span>
          ))}
        </span>
      )}
      <span key={index} ref={currentRef} className="inline-block">
        {words[index].split("").map((ch, i) => (
          <span key={i} className="inline-block origin-[0%_70%]">
            {ch}
          </span>
        ))}
      </span>
      <span ref={measureRef} className="invisible absolute left-0 top-0 flex">
        {words.map((word) => (
          <span key={word} className="absolute whitespace-nowrap">
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
