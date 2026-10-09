"use client";
import { Check } from "lucide-react";
import type { HeroLayout, ThemeName } from "@/site.config";
import { usePrism } from "@/components/PrismProvider";

const themes: {
  id: ThemeName;
  name: string;
  description: string;
  colours: string[];
}[] = [
  {
    id: "graphite",
    name: "Graphite",
    description: "Dark surfaces. Electric violet.",
    colours: ["#101015", "#292832", "#b29aff"],
  },
  {
    id: "paper",
    name: "Paper",
    description: "Clean white. Clear cobalt.",
    colours: ["#f8f9fc", "#dce3f4", "#345bd8"],
  },
  {
    id: "studio",
    name: "Studio",
    description: "Warm stone. Confident coral.",
    colours: ["#f5f1ea", "#e1d9ce", "#bf492d"],
  },
];
const layouts: { id: HeroLayout; name: string }[] = [
  { id: "centered", name: "Centered launch" },
  { id: "split", name: "Split editorial" },
];

export function Appearance() {
  const { theme, layout, setTheme, setLayout } = usePrism();
  return (
    <div className="appearance-panel">
      <div className="appearance-intro">
        <h2>A different point of view.</h2>
        <p>Three complete palettes. Two ways to make an entrance.</p>
      </div>
      <div className="appearance-choices">
        <div>
          <h3>Visual theme</h3>
          <div className="theme-options" role="group" aria-label="Visual theme">
            {themes.map((option) => (
              <button
                type="button"
                key={option.id}
                aria-pressed={theme === option.id}
                onClick={() => setTheme(option.id)}
              >
                <span className="theme-swatch">
                  {option.colours.map((colour) => (
                    <i key={colour} style={{ background: colour }} />
                  ))}
                </span>
                <span>
                  <strong>{option.name}</strong>
                  <span>{option.description}</span>
                </span>
                {theme === option.id && <Check size={17} />}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3>Hero composition</h3>
          <div
            className="layout-options"
            role="group"
            aria-label="Hero composition"
          >
            {layouts.map((option) => (
              <button
                type="button"
                key={option.id}
                aria-pressed={layout === option.id}
                onClick={() => setLayout(option.id)}
              >
                <span
                  className={`layout-drawing layout-${option.id}`}
                  aria-hidden="true"
                >
                  <i />
                  <i />
                  <i />
                </span>
                {option.name}
                {layout === option.id && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="appearance-note">
        Preferences stay in this browser. Every section follows the selected
        palette.
      </p>
    </div>
  );
}
