"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/site.config";

export function useSession() {
  const [minutes, setMinutes] = useState<number>(site.session.defaultMinutes);
  const [remaining, setRemaining] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const deadline = useRef(0);
  useEffect(() => {
    if (!running) return;
    const update = () => {
      const seconds = Math.max(
        0,
        Math.ceil((deadline.current - Date.now()) / 1000),
      );
      setRemaining(seconds);
      if (seconds === 0) setRunning(false);
    };
    update();
    const interval = window.setInterval(update, 250);
    return () => window.clearInterval(interval);
  }, [running]);
  function toggle() {
    if (running) {
      setRemaining(
        Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000)),
      );
      setRunning(false);
    } else {
      const seconds = remaining || minutes * 60;
      setRemaining(seconds);
      deadline.current = Date.now() + seconds * 1000;
      setRunning(true);
    }
  }
  function reset() {
    setRunning(false);
    setRemaining(minutes * 60);
  }
  function choose(value: number) {
    if (running || !site.session.durations.includes(value)) return;
    setMinutes(value);
    setRemaining(value * 60);
  }
  return {
    minutes,
    remaining,
    running,
    toggle,
    reset,
    choose,
    complete: remaining === 0,
    progress: 1 - remaining / (minutes * 60),
    display: `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`,
  };
}
