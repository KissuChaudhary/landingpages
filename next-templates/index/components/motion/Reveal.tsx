"use client";
import { useEffect, useState } from "react";
import { useMotion } from "./MotionProvider";
import { useVisible } from "./useVisible";
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useVisible<HTMLDivElement>();
  const { enabled } = useMotion();
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (visible) setEntered(true);
  }, [visible]);
  return (
    <div
      ref={ref}
      className={`${className} ${entered && enabled ? "reveal--entered" : ""}`}
    >
      {children}
    </div>
  );
}
