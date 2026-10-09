"use client";
import { createContext, useContext, useEffect, useState } from "react";
const MotionContext = createContext({
  enabled: false,
  systemReduced: false,
  toggle: () => {},
});
export const useMotion = () => useContext(MotionContext);
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [systemReduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(true);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    try {
      setPaused(localStorage.getItem("index-motion") === "paused");
    } catch {
      setPaused(false);
    }
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  const enabled = !systemReduced && !paused;
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
  }, [enabled]);
  const toggle = () => {
    if (systemReduced) return;
    setPaused((value) => {
      const next = !value;
      try {
        localStorage.setItem("index-motion", next ? "paused" : "on");
      } catch {
        /* Motion remains usable without storage. */
      }
      return next;
    });
  };
  return (
    <MotionContext.Provider value={{ enabled, systemReduced, toggle }}>
      {children}
    </MotionContext.Provider>
  );
}
