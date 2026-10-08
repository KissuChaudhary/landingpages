"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { site, type Plan, type Theme, type ExampleId } from "@/site.config";
import { useExample, type ExampleState } from "@/lib/useExample";
type Dialog =
  | { type: "app" }
  | { type: "plan"; plan: Plan; yearly: boolean }
  | { type: "command" }
  | null;
type ContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  hero: ExampleState;
  dialog: Dialog;
  close: () => void;
  start: () => void;
  openCommand: () => void;
  choosePlan: (plan: Plan, yearly: boolean) => void;
  explore: (id: ExampleId) => void;
};
const Context = createContext<ContextValue | null>(null);
export function PatchProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(site.appearance.defaultTheme);
  const [dialog, setDialog] = useState<Dialog>(null);
  const hero = useExample();
  useEffect(() => {
    const value = document.documentElement.dataset.theme;
    if (value === "light" || value === "dark") setThemeState(value);
  }, []);
  useEffect(() => {
    function keyboard(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setDialog((current) =>
          current?.type === "command" ? null : { type: "command" },
        );
      }
    }
    window.addEventListener("keydown", keyboard);
    return () => window.removeEventListener("keydown", keyboard);
  }, []);
  function setTheme(value: Theme) {
    document.documentElement.dataset.theme = value;
    setThemeState(value);
    try {
      localStorage.setItem(site.appearance.storageKey, value);
    } catch {
      /* Appearance remains usable without storage. */
    }
  }
  function start() {
    if (site.links.app) window.location.assign(site.links.app);
    else setDialog({ type: "app" });
  }
  function choosePlan(plan: Plan, yearly: boolean) {
    const href = yearly ? plan.href.yearly : plan.href.monthly;
    if (href) window.location.assign(href);
    else setDialog({ type: "plan", plan, yearly });
  }
  function explore(id: ExampleId) {
    hero.choose(id);
    hero.setView("build");
    setDialog(null);
    window.setTimeout(() => {
      const target = document.getElementById("hero-workspace");
      target?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "center",
      });
      target?.focus({ preventScroll: true });
    }, 30);
  }
  return (
    <Context.Provider
      value={{
        theme,
        setTheme,
        hero,
        dialog,
        close: () => setDialog(null),
        start,
        openCommand: () => setDialog({ type: "command" }),
        choosePlan,
        explore,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function usePatch() {
  const value = useContext(Context);
  if (!value) throw new Error("PatchProvider is required.");
  return value;
}
