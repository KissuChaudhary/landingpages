"use client";
import { useEffect, useRef, useState } from "react";
import { useMotion } from "@/components/Motion";

/** Place-keyed digit columns; actual formatted text remains available to assistive tech. */
export function NumberRoll({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  countIn = false,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  countIn?: boolean;
}) {
  const { reduced } = useMotion();
  const root = useRef<HTMLSpanElement>(null);
  const [entered, setEntered] = useState(!countIn);
  useEffect(() => {
    const element = root.current;
    if (!element || !countIn) return;
    if (reduced) {
      setEntered(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [countIn, reduced]);
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
  let place = 0;
  const chars = [...formatted]
    .reverse()
    .map((char) => ({
      char,
      key: /\d/.test(char) ? `digit-${place++}` : `symbol-${place}-${char}`,
    }))
    .reverse();
  return (
    <span ref={root} className="number-roll">
      <span className="sr-only">
        {prefix}
        {formatted}
        {suffix}
      </span>
      <span aria-hidden="true" className="number-display">
        {prefix}
        {chars.map(({ char, key }) =>
          /\d/.test(char) ? (
            <span className="number-place" key={key}>
              <span className="number-sizer">{char}</span>
              <span
                className="number-strip"
                style={{
                  transform: `translateY(-${(entered ? Number(char) : 0) * 10}%)`,
                }}
              >
                {Array.from({ length: 10 }, (_, index) => (
                  <span key={index}>{index}</span>
                ))}
              </span>
            </span>
          ) : (
            <span key={key}>{char}</span>
          ),
        )}
        {suffix}
      </span>
    </span>
  );
}
