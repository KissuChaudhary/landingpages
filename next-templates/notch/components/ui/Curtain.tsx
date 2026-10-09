"use client";

import { forwardRef, useImperativeHandle, useRef, type CSSProperties } from "react";

// The light curtain: vertical bars of fluted blue light. In the hero a white bowl opens
// over them on load; in the closing section they rise with scroll. Bars near the pointer
// catch a little extra light.

export type CurtainHandle = { light: (clientX: number | null) => void };

const COUNT = 22;

export const Curtain = forwardRef<CurtainHandle, { variant: "hero" | "closing" }>(function Curtain({ variant }, ref) {
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  useImperativeHandle(
    ref,
    () => ({
      light(clientX) {
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
          const el = root.current;
          if (!el) return;
          const bars = Array.from(el.querySelectorAll<HTMLElement>(".bar")).filter((b) => b.offsetWidth > 0);
          if (clientX === null) {
            bars.forEach((b) => b.style.setProperty("--lit", "0"));
            return;
          }
          const rect = el.getBoundingClientRect();
          const pos = ((clientX - rect.left) / rect.width) * bars.length - 0.5;
          bars.forEach((b, i) => {
            const d = Math.abs(i - pos);
            b.style.setProperty("--lit", d < 2.4 ? (1 - d / 2.4).toFixed(2) : "0");
          });
        });
      },
    }),
    [],
  );

  return (
    <div ref={root} className={`curtain curtain-${variant}`} aria-hidden="true">
      <div className="curtain-bars">
        {Array.from({ length: COUNT }, (_, i) => (
          <i className="bar" key={i} style={{ "--edge": Math.min(i, COUNT - 1 - i) } as CSSProperties} />
        ))}
      </div>
      {variant === "hero" && <div className="curtain-bowl" />}
    </div>
  );
});
