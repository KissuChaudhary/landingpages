"use client";
import { useLayoutEffect, useRef } from "react";
import { useMotion } from "@/components/Motion";
export function TextMorph({ children }: { children: string }) {
  const element = useRef<HTMLSpanElement>(null);
  const previous = useRef(children);
  const { paused, reduced } = useMotion();
  useLayoutEffect(() => {
    if (previous.current === children || !element.current) return;
    previous.current = children;
    if (paused || reduced) return;
    const animation = element.current.animate(
      [
        { opacity: 0, transform: "translateY(5px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 280, easing: "cubic-bezier(.16,1,.3,1)" },
    );
    return () => animation.cancel();
  }, [children, paused, reduced]);
  return (
    <span ref={element} className="text-morph">
      {children}
    </span>
  );
}
