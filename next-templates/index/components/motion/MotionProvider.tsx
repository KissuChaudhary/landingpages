"use client";
import { createContext, useContext, useEffect, useState } from "react";
const MotionContext = createContext({
  enabled: false,
  systemReduced: false,
});
export const useMotion = () => useContext(MotionContext);
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [systemReduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    setReady(true);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  const enabled = ready && !systemReduced;
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
  }, [enabled]);
  return (
    <MotionContext.Provider value={{ enabled, systemReduced }}>
      {children}
    </MotionContext.Provider>
  );
}
