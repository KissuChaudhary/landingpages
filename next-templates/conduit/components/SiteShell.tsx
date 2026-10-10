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
}>({ motion: true });
export const useSite = () => useContext(Context);
export function SiteShell({ children }: { children: ReactNode }) {
  const [motion, setMotion] = useState(true);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setMotion(!preference.matches);
    change();
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
  return (
    <Context.Provider value={{ motion }}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">{children}</main>
      <Footer />
    </Context.Provider>
  );
}
