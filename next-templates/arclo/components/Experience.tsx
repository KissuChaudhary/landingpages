"use client";
import { createContext, useContext } from "react";
import type { Plan } from "@/site.config";
export type Experience = {
  openWorkspace: (workflow?: string) => void;
  choosePlan: (plan: Plan, annual: boolean) => void;
  paused: boolean;
  toggleMotion: () => void;
};
export const ExperienceContext = createContext<Experience | null>(null);
export function useExperience() {
  const experience = useContext(ExperienceContext);
  if (!experience) throw new Error("Place this component inside SiteShell.");
  return experience;
}
