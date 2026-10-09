"use client";
import { useEffect, useState, type ReactNode } from "react";
import { ExperienceContext } from "./Experience";
import { Navigation } from "./Navigation";
import { Footer } from "./sections/Footer";
import { Motion } from "./Motion";
import { site, type Plan } from "@/site.config";
import { href, route } from "@/lib/urls";
export function SiteShell({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    try {
      setPaused(localStorage.getItem("arclo-motion") === "paused");
    } catch {}
  }, []);
  const toggleMotion = () =>
    setPaused((value) => {
      try {
        localStorage.setItem("arclo-motion", value ? "on" : "paused");
      } catch {}
      return !value;
    });
  // "Run a sample close" goes to your app when it's set, otherwise to the close canvas in the hero.
  const openWorkspace = (workflow = "match") => {
    if (site.links.app) return window.location.assign(site.links.app);
    const canvas = document.getElementById("close-canvas");
    if (!canvas) return window.location.assign(href("/#close-canvas"));
    canvas.scrollIntoView({ behavior: paused ? "auto" : "smooth", block: "start" });
    window.dispatchEvent(new CustomEvent("arclo:workbench", { detail: workflow }));
  };
  // Plans go to their checkout link, or to the contact page until one is set.
  const choosePlan = (plan: Plan, annual: boolean) => {
    window.location.assign((annual ? plan.annualHref : plan.monthlyHref) || route("/contact"));
  };
  return (
    <ExperienceContext.Provider
      value={{ openWorkspace, choosePlan, paused, toggleMotion }}
    >
      <div className={`site ${paused ? "motion-paused" : ""}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        {children}
        <Footer />
        <Motion paused={paused} />
      </div>
    </ExperienceContext.Provider>
  );
}
