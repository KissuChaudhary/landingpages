"use client";
import type { ReactNode } from "react";
import { ExperienceContext } from "./Experience";
import { Navigation } from "./Navigation";
import { Footer } from "./sections/Footer";
import { Motion } from "./Motion";
import { site, type Plan } from "@/site.config";
import { href, route } from "@/lib/urls";
export function SiteShell({ children }: { children: ReactNode }) {
  // "Run a sample close" goes to your app when it's set, otherwise to the close canvas in the hero.
  const openWorkspace = (workflow = "match") => {
    if (site.links.app) return window.location.assign(site.links.app);
    const canvas = document.getElementById("close-canvas");
    if (!canvas) return window.location.assign(href("/#close-canvas"));
    canvas.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
    window.dispatchEvent(new CustomEvent("arclo:workbench", { detail: workflow }));
  };
  // Plans go to their checkout link, or to the contact page until one is set.
  const choosePlan = (plan: Plan, annual: boolean) => {
    window.location.assign((annual ? plan.annualHref : plan.monthlyHref) || route("/contact"));
  };
  return (
    <ExperienceContext.Provider
      value={{ openWorkspace, choosePlan }}
    >
      <div className="site">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        {children}
        <Footer />
        <Motion />
      </div>
    </ExperienceContext.Provider>
  );
}
