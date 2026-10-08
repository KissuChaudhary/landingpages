"use client";
import { Moon, Sun } from "lucide-react";
import { usePatch } from "@/components/PatchProvider";
import { site } from "@/site.config";
export function ThemeSwitch() {
  const { theme, setTheme } = usePatch();
  if (!site.appearance.showControl) return null;
  return (
    <button
      className="icon-button theme-switch"
      aria-label={`Switch to ${theme === "light" ? "graphite" : "chalk"} theme`}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}
