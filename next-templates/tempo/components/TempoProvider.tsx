"use client";
import { createContext, useContext, useState } from "react";
import { useSession } from "@/lib/useSession";
import { useReflection } from "@/lib/useReflection";
import { site, type Plan } from "@/site.config";

type TempoContextValue = {
  session: ReturnType<typeof useSession>;
  reflection: ReturnType<typeof useReflection>;
  completed: string[];
  toggleRoutine: (id: string) => void;
  openApp: () => void;
  choosePlan: (plan: Plan, yearly: boolean) => void;
};
const TempoContext = createContext<TempoContextValue | null>(null);
export function TempoProvider({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const reflection = useReflection();
  const [completed, setCompleted] = useState(
    site.routine.filter((item) => item.done).map((item) => item.id),
  );
  // "Get the app" goes to your web app when it's set, otherwise to the
  // download links at the end of the page.
  function openApp() {
    if (site.links.app) return window.location.assign(site.links.app);
    document.getElementById("get-tempo")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "center",
    });
  }
  // A plan goes to its checkout link. Until one is set, the free plan points
  // to the app and paid plans start an email to your team.
  function choosePlan(plan: Plan, yearly: boolean) {
    if (plan.href) return window.location.assign(plan.href);
    if (plan.monthly === 0) return openApp();
    window.location.assign(
      `mailto:${site.links.email}?subject=${encodeURIComponent(
        `${plan.name} membership, billed ${yearly ? "yearly" : "monthly"}`,
      )}`,
    );
  }
  return (
    <TempoContext.Provider
      value={{
        session,
        reflection,
        completed,
        openApp,
        choosePlan,
        toggleRoutine: (id) =>
          setCompleted((current) =>
            current.includes(id)
              ? current.filter((item) => item !== id)
              : [...current, id],
          ),
      }}
    >
      {children}
    </TempoContext.Provider>
  );
}
export function useTempo() {
  const value = useContext(TempoContext);
  if (!value) throw new Error("Tempo components require TempoProvider.");
  return value;
}
