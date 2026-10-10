"use client";

import * as React from "react";
import { site } from "@/site.config";
import { Label } from "@/components/ui/Label";
import { useMotion } from "@/components/motion/MotionProvider";

/*
 * STATEMENT: one sentence that fills in as you read it.
 *   scroll   each word's ink follows the scroll position, word by word, so
 *            the sentence is fully dark when it reaches the middle of the
 *            screen and dims back if you scroll up
 *   reduced  the sentence is simply dark
 */

export function Statement() {
  const { statement } = site;
  const { reduced } = useMotion();
  const ref = React.useRef<HTMLParagraphElement>(null);
  const words = statement.text.split(" ");

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
    if (reduced) {
      spans.forEach((s) => s.style.setProperty("--lit", "1"));
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the paragraph's top is at 85% of the screen, 1 when its bottom reaches 45%.
      const p = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (vh * 0.4 + rect.height)));
      const n = spans.length;
      spans.forEach((s, i) => s.style.setProperty("--lit", Math.min(1, Math.max(0, p * (n + 4) - i)).toFixed(3)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <section className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 md:py-36" aria-label={statement.label}>
      <Label>{statement.label}</Label>
      <p ref={ref} className="mt-8 max-w-[22ch] text-[34px] font-[560] leading-[1.08] tracking-[-0.025em] sm:text-[48px] lg:text-[64px]" style={{ fontVariationSettings: '"wdth" 88' }}>
        {words.map((word, i) => (
          <React.Fragment key={i}>
            <span data-word className="lit-word">
              {word}
            </span>{" "}
          </React.Fragment>
        ))}
      </p>
    </section>
  );
}
