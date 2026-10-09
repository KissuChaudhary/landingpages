"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./sections/Footer";
import { Overlay, type OverlayValue } from "./ui/Overlay";
const Context = createContext<{
  open: (value: OverlayValue) => void;
  motion: boolean;
  toggleMotion: () => void;
}>({ open: () => {}, motion: true, toggleMotion: () => {} });
export const useSite = () => useContext(Context);
export function SiteShell({ children }: { children: ReactNode }) {
  const [overlay, setOverlay] = useState<OverlayValue | null>(null);
  const [motion, setMotion] = useState(true);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("conduit-motion");
    } catch {}
    setMotion(saved ? saved === "on" : !preference.matches);
    const change = () => {
      try {
        if (!localStorage.getItem("conduit-motion"))
          setMotion(!preference.matches);
      } catch {
        setMotion(!preference.matches);
      }
    };
    preference.addEventListener("change", change);
    return () => preference.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = motion ? "on" : "off";
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [motion]);
  const toggleMotion = () =>
    setMotion((value) => {
      try {
        localStorage.setItem("conduit-motion", value ? "off" : "on");
      } catch {}
      return !value;
    });
  return (
    <Context.Provider value={{ open: setOverlay, motion, toggleMotion }}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">{children}</main>
      <Footer />
      <Overlay value={overlay} close={() => setOverlay(null)} />
    </Context.Provider>
  );
}
