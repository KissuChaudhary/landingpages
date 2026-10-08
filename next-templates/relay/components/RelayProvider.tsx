"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { site, type Plan, type Theme, type ScenarioId } from "@/site.config";
import { useAssistant, type AssistantState } from "@/lib/useAssistant";
type ContextValue = {
  assistant: AssistantState;
  theme: Theme;
  changeTheme: () => void;
  start: () => void;
  explore: (id: ScenarioId) => void;
  selectedPlan: { plan: Plan; yearly: boolean } | null;
  choosePlan: (plan: Plan, yearly: boolean) => void;
  closePlan: () => void;
};
const Context = createContext<ContextValue | null>(null);
export function RelayProvider({ children }: { children: React.ReactNode }) {
  const assistant = useAssistant();
  const [theme, setTheme] = useState<Theme>(site.appearance.defaultTheme);
  const [selectedPlan, setSelectedPlan] =
    useState<ContextValue["selectedPlan"]>(null);
  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current === "light" || current === "dark") setTheme(current);
  }, []);
  function changeTheme() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem(site.appearance.storageKey, next);
    } catch {
      /* Storage is optional. */
    }
  }
  function focusWorkspace() {
    document
      .getElementById("workspace")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
    document.getElementById("relay-request")?.focus({ preventScroll: true });
  }
  function start() {
    if (site.links.app) window.location.assign(site.links.app);
    else focusWorkspace();
  }
  function explore(id: ScenarioId) {
    assistant.choose(id);
    focusWorkspace();
  }
  function choosePlan(plan: Plan, yearly: boolean) {
    const href = yearly ? plan.href.yearly : plan.href.monthly;
    if (href) window.location.assign(href);
    else setSelectedPlan({ plan, yearly });
  }
  return (
    <Context.Provider
      value={{
        assistant,
        theme,
        changeTheme,
        start,
        explore,
        selectedPlan,
        choosePlan,
        closePlan: () => setSelectedPlan(null),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useRelay() {
  const value = useContext(Context);
  if (!value) throw new Error("RelayProvider is required");
  return value;
}
