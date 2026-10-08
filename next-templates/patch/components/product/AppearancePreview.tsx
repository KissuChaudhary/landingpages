"use client";
import { Check, Moon, Sun } from "lucide-react";
import { usePatch } from "@/components/PatchProvider";
import { site } from "@/site.config";
export function AppearancePreview() {
  const { theme, setTheme } = usePatch();
  const content = site.features.appearance;
  return (
    <div className="appearance-demo">
      <div className="appearance-art" aria-hidden="true">
        <div className="appearance-card appearance-chalk">
          <span>CHALK</span>
          <div className="appearance-bars">
            <i />
            <i />
            <i />
          </div>
          <b>+</b>
        </div>
        <div className="appearance-card appearance-graphite">
          <span>GRAPHITE</span>
          <div className="appearance-bars">
            <i />
            <i />
            <i />
          </div>
          <b>+</b>
        </div>
      </div>
      <div
        className="appearance-options"
        role="group"
        aria-label="Page appearance"
      >
        <button
          aria-pressed={theme === "light"}
          onClick={() => setTheme("light")}
        >
          <Sun size={13} />
          {content.light}
          {theme === "light" && <Check size={12} />}
        </button>
        <button
          aria-pressed={theme === "dark"}
          onClick={() => setTheme("dark")}
        >
          <Moon size={13} />
          {content.dark}
          {theme === "dark" && <Check size={12} />}
        </button>
      </div>
    </div>
  );
}
