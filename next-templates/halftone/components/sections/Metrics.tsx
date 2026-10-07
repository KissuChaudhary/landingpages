"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { site } from "@/site.config";
import { Reveal } from "@/components/ui/Reveal";

/** Splits "99.99%", "2.1B" or "4,000+" into a number to count up to and the text around it. */
function parse(value: string) {
  const match = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;
  return { prefix, suffix, target: Number(digits.replace(/,/g, "")), decimals, grouped: digits.includes(",") };
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Same trigger as the card's Reveal, so the count starts while the card fades in.
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduced = useReducedMotion();
  const parts = parse(value);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const target = parse(value)?.target;
    if (target === undefined || !inView || reduced) return;
    const controls = animate(0, target, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: setCurrent });
    return () => controls.stop();
  }, [inView, reduced, value]);

  if (!parts) return <span ref={ref}>{value}</span>;
  const number = inView && !reduced ? current : parts.target;
  const text = parts.grouped
    ? Math.round(number).toLocaleString("en-US")
    : number.toFixed(parts.decimals);

  return (
    <span ref={ref} className="tabular-nums">
      {parts.prefix}
      {text}
      {parts.suffix}
    </span>
  );
}

export function Metrics() {
  return (
    <section aria-label={`${site.brand.name} in numbers`} className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal y={24} className="surface overflow-hidden rounded-[36px]">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {site.metrics.map((metric, index) => (
              <div
                key={metric.label}
                className={cn(
                  "flex flex-col-reverse justify-end px-6 py-9 sm:px-8 sm:py-12",
                  index % 2 === 1 && "border-l border-black/[0.06]",
                  index >= 2 && "border-t border-black/[0.06] lg:border-t-0",
                  index === 2 && "lg:border-l",
                )}
              >
                <dt className="mt-3 max-w-[180px] text-[13.5px] leading-snug text-body">{metric.label}</dt>
                <dd className="text-[34px] font-semibold leading-none tracking-[-0.04em] text-ink sm:text-[46px]">
                  <CountUp value={metric.value} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
