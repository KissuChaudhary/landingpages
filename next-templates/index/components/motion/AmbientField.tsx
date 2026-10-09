"use client";
import { useEffect, useState } from "react";
import { useMotion } from "./MotionProvider";
import { useVisible } from "./useVisible";
export function AmbientField({
  variant = "light",
}: {
  variant?: "light" | "dark" | "accent";
}) {
  const { ref, visible } = useVisible<HTMLDivElement>();
  const { enabled } = useMotion();
  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const update = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    update();
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    const field = ref.current;
    const parent = field?.parentElement;
    if (!field || !parent || !enabled || !visible || !tabVisible) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = parent.getBoundingClientRect();
        field.style.setProperty(
          "--field-x",
          `${((event.clientX - bounds.left) / bounds.width - 0.5) * 8}px`,
        );
        field.style.setProperty(
          "--field-y",
          `${((event.clientY - bounds.top) / bounds.height - 0.5) * 8}px`,
        );
      });
    };
    const reset = () => {
      field.style.removeProperty("--field-x");
      field.style.removeProperty("--field-y");
    };
    parent.addEventListener("pointermove", move);
    parent.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", reset);
      reset();
    };
  }, [enabled, visible, tabVisible, ref]);
  return (
    <div
      ref={ref}
      className={`ambient ambient--${variant}`}
      data-running={visible && enabled && tabVisible}
      aria-hidden="true"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <i
          key={i}
          style={{ "--cell": i, "--row": i % 4 } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
