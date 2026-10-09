"use client";
import { useEffect, useRef, useState } from "react";
import { useMotion } from "./MotionProvider";
import { useVisible } from "./useVisible";
export function AccentReveal({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  const { ref, visible } = useVisible<HTMLSpanElement>();
  const { enabled } = useMotion();
  const [run, setRun] = useState(false);
  const lastReplay = useRef(0);
  useEffect(() => {
    if (visible && enabled) setRun(true);
  }, [visible, enabled]);
  const replay = () => {
    if (!enabled || Date.now() - lastReplay.current < 1400) return;
    lastReplay.current = Date.now();
    setRun(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setRun(true)));
  };
  return (
    <span
      ref={ref}
      className={`accent ${dark ? "accent--dark" : ""} ${run && enabled ? "accent--run" : ""}`}
      onPointerEnter={replay}
    >
      <span className="accent__bands" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <i key={i} style={{ "--band": i } as React.CSSProperties} />
        ))}
      </span>
      <span className="accent__text">{children}</span>
    </span>
  );
}
