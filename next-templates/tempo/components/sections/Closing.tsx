"use client";
import { ArrowUpRight, Monitor, Smartphone } from "lucide-react";
import { site } from "@/site.config";
import { TempoMark } from "@/components/ui/Brand";
import { useTempo } from "@/components/TempoProvider";

const stores = [
  { name: "App Store", href: site.links.ios, label: "For iPhone", icon: Smartphone },
  { name: "Google Play", href: site.links.android, label: "For Android", icon: Smartphone },
  { name: "Web app", href: site.links.app, label: "In your browser", icon: Monitor },
];

export function Closing() {
  const { session } = useTempo();
  const tryHere = () => {
    if (!session.running) session.toggle();
    document.getElementById("focus-demo")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "center",
    });
  };
  return (
    <section
      className="closing-section container"
      id="get-tempo"
      aria-labelledby="closing-title"
    >
      <div className="closing-orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="closing-app-icon">
        <TempoMark />
      </div>
      <p className="eyebrow">A LITTLE SPACE FOR YOURSELF</p>
      <h2 id="closing-title">
        Good things take
        <br />
        <em>a little time.</em>
      </h2>
      <p className="closing-description">Give yourself a little of it.</p>
      <div className="store-links">
        {stores.map(({ name, href, label, icon: Icon }) => {
          const inner = (
            <>
              <Icon size={20} />
              <span>
                <small>{label}</small>
                <strong>{name}</strong>
              </span>
              {href ? <ArrowUpRight size={15} /> : <span className="store-soon">Soon</span>}
            </>
          );
          return href ? (
            <a className="store-link" key={name} href={href}>
              {inner}
            </a>
          ) : (
            <div className="store-link unavailable" key={name}>
              {inner}
            </div>
          );
        })}
      </div>
      <button className="text-link closing-try" onClick={tryHere}>
        Or try a {session.minutes}-minute focus session here
        <ArrowUpRight size={14} />
      </button>
      <span className="closing-foot">
        Plan a little. Focus a little. Keep the good.
      </span>
    </section>
  );
}
