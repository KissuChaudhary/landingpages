"use client";
import { useEffect, useState } from "react";
import { useMotion } from "./MotionProvider";
import { useVisible } from "./useVisible";
export function LabelDecode({ children }: { children: string }) {
  const { ref, visible } = useVisible<HTMLSpanElement>();
  const { enabled } = useMotion();
  const [display, setDisplay] = useState(children);
  useEffect(() => {
    if (!visible || !enabled) {
      setDisplay(children);
      return;
    }
    let frame = 0;
    let previous = -1;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 300, 1);
      const step = Math.floor(progress * 9);
      if (step !== previous) {
        previous = step;
        setDisplay(
          [...children]
            .map((char, i) =>
              i < progress * children.length || char === " "
                ? char
                : "01/·"[(i + step) % 4],
            )
            .join(""),
        );
      }
      if (progress < 1 && !document.hidden) frame = requestAnimationFrame(tick);
      else setDisplay(children);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [children, visible, enabled]);
  return (
    <span ref={ref}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
