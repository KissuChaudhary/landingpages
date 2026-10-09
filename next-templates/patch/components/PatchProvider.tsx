"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { site, type Plan, type Theme, type ExampleId } from "@/site.config";
import { useExample, type ExampleState } from "@/lib/useExample";
type ContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  hero: ExampleState;
  start: () => void;
  command: boolean;
  openCommand: () => void;
  closeCommand: () => void;
  choosePlan: (plan: Plan, yearly: boolean) => void;
  explore: (id: ExampleId) => void;
};
const Context = createContext<ContextValue | null>(null);
function reveal(id: string, focus = false) {
  window.setTimeout(() => {
    const target = document.getElementById(id);
    target?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "center",
    });
    if (focus) target?.focus({ preventScroll: true });
  }, 30);
}
export function PatchProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(site.appearance.defaultTheme);
  const [command, setCommand] = useState(false);
  const hero = useExample();
  useEffect(() => {
    const value = document.documentElement.dataset.theme;
    if (value === "light" || value === "dark") setThemeState(value);
  }, []);
  useEffect(() => {
    function keyboard(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommand((open) => {
          if (!open) reveal("command-menu");
          return !open;
        });
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
  // "Get started" goes to your app when it's set, otherwise to the hero workspace.
  function start() {
    if (site.links.app) window.location.assign(site.links.app);
    else reveal("hero-workspace", true);
  }
  // A plan goes to its checkout link. Until one is set, the free plan opens
  // the workspace and paid plans start an email to your team.
  function choosePlan(plan: Plan, yearly: boolean) {
    const href = yearly ? plan.href.yearly : plan.href.monthly;
    if (href) window.location.assign(href);
    else if (plan.monthly === 0) start();
    else
      window.location.assign(
        `mailto:${site.links.email}?subject=${encodeURIComponent(
          `${plan.name} plan, billed ${yearly ? "yearly" : "monthly"}`,
        )}`,
      );
  }
  function explore(id: ExampleId) {
    hero.choose(id);
    hero.setView("build");
    reveal("hero-workspace", true);
  }
  function openCommand() {
    setCommand(true);
    reveal("command-menu");
  }
  return (
    <Context.Provider
      value={{
        theme,
        setTheme,
        hero,
        start,
        command,
        openCommand,
        closeCommand: () => setCommand(false),
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
