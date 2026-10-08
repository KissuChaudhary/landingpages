"use client";
import { createContext, useContext, useState } from "react";
import { useSession } from "@/lib/useSession";
import { useReflection } from "@/lib/useReflection";
import { site, type Plan } from "@/site.config";

type Dialog =
  | { type: "app" }
  | { type: "plan"; plan: Plan; yearly: boolean }
  | null;
type TempoContextValue = {
  session: ReturnType<typeof useSession>;
  reflection: ReturnType<typeof useReflection>;
  completed: string[];
  toggleRoutine: (id: string) => void;
  dialog: Dialog;
  openApp: () => void;
  choosePlan: (plan: Plan, yearly: boolean) => void;
  close: () => void;
};
const TempoContext = createContext<TempoContextValue | null>(null);
export function TempoProvider({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const reflection = useReflection();
  const [dialog, setDialog] = useState<Dialog>(null);
  const [completed, setCompleted] = useState(
    site.routine.filter((item) => item.done).map((item) => item.id),
  );
  function openApp() {
    if (site.links.app) {
      window.location.assign(site.links.app);
      return;
    }
    setDialog({ type: "app" });
  }
  function choosePlan(plan: Plan, yearly: boolean) {
    if (plan.href) {
      window.location.assign(plan.href);
      return;
    }
    setDialog({ type: "plan", plan, yearly });
  }
  return (
    <TempoContext.Provider
      value={{
        session,
        reflection,
        completed,
        dialog,
        openApp,
        choosePlan,
        close: () => setDialog(null),
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
