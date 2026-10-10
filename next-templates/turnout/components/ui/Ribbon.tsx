"use client";

import { useEffect, useId, useRef } from "react";
import { useFrameLoop, useMotion, useScrollVelocity } from "@/components/Motion";

// A lime ribbon with words running along it. The words drift on their own and speed up
// while the page scrolls (in the direction you scroll). It draws itself in on load.

type RibbonProps = {
  words: string[];
  /** The ribbon's curve in a 2200 × 700 box. */
  d?: string;
  className?: string;
};

const DEFAULT_PATH = "M0 540C300 660 700 650 950 480S1350 160 1650 205S2050 390 2200 330";
const SPEED = 0.05; // px per ms at rest

export function Ribbon({ words, d = DEFAULT_PATH, className = "" }: RibbonProps) {
  const id = useId().replace(/:/g, "");
  const { reduced, paused } = useMotion();
  const velocity = useScrollVelocity();
  const textPath = useRef<SVGTextPathElement>(null);
  const measure = useRef<SVGTextElement>(null);
  const unit = useRef(0);
  const offset = useRef(0);
  const phrase = `${words.join("  •  ")}  •  `;

  // The width of one phrase, so the drift can wrap around without a jump.
  useEffect(() => {
    const read = () => {
      if (measure.current) unit.current = measure.current.getComputedTextLength();
    };
    read();
    document.fonts?.ready.then(read);
  }, [phrase]);

  const loop = useFrameLoop<SVGSVGElement>((dt) => {
    const el = textPath.current;
    if (!el || !unit.current) return;
    const boost = Math.max(-2.5, Math.min(2.5, velocity.current)) * 0.9;
    velocity.current *= 0.9;
    offset.current = (offset.current - (SPEED + boost * SPEED * 6) * dt) % unit.current;
    if (offset.current > 0) offset.current -= unit.current;
    el.setAttribute("startOffset", offset.current.toFixed(1));
  }, !reduced && !paused);

  return (
    <svg ref={loop} className={`ribbon ${className}`} viewBox="0 0 2200 700" aria-hidden="true" focusable="false">
      <defs>
        <path id={`ribbon-${id}`} d={d} />
      </defs>
      <path className="ribbon-band" d={d} pathLength={1} />
      <text ref={measure} className="ribbon-measure">{phrase}</text>
      <text className="ribbon-text" dy="0.36em">
        <textPath ref={textPath} href={`#ribbon-${id}`} startOffset="0">
          {phrase.repeat(7)}
        </textPath>
      </text>
    </svg>
  );
}
