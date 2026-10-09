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
const Context = createContext<{
  motion: boolean;
  toggleMotion: () => void;
}>({ motion: true, toggleMotion: () => {} });
export const useSite = () => useContext(Context);
export function SiteShell({ children }: { children: ReactNode }) {
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
    <Context.Provider value={{ motion, toggleMotion }}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">{children}</main>
      <Footer />
    </Context.Provider>
  );
}
