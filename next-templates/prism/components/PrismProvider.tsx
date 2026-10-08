"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  artworks,
  site,
  type Artwork,
  type HeroLayout,
  type Plan,
  type ThemeName,
} from "@/site.config";
import { Dialogs } from "@/components/Dialogs";

export type DialogState =
  | { kind: "workspace" | "gallery"; artwork: Artwork }
  | { kind: "plan"; plan: Plan; annual: boolean }
  | { kind: "settings" }
  | null;
interface PrismContext {
  theme: ThemeName;
  layout: HeroLayout;
  setTheme: (theme: ThemeName) => void;
  setLayout: (layout: HeroLayout) => void;
  dialog: DialogState;
  setDialog: (dialog: DialogState) => void;
  start: (artwork?: Artwork) => void;
}
const Context = createContext<PrismContext | null>(null);
export function usePrism() {
  const context = useContext(Context);
  if (!context) throw new Error("PrismProvider is required.");
  return context;
}

export function PrismProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(
    site.appearance.defaultTheme,
  );
  const [layout, setLayoutState] = useState<HeroLayout>(
    site.appearance.defaultHero,
  );
  const [dialog, setDialog] = useState<DialogState>(null);
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(site.appearance.storageKey) || "null",
      );
      if (["graphite", "paper", "studio"].includes(saved?.theme))
        setThemeState(saved.theme);
      if (["centered", "split"].includes(saved?.layout))
        setLayoutState(saved.layout);
    } catch {
      /* Preferences are optional when storage is unavailable. */
    }
  }, []);
  function persist(nextTheme: ThemeName, nextLayout: HeroLayout) {
    try {
      localStorage.setItem(
        site.appearance.storageKey,
        JSON.stringify({ theme: nextTheme, layout: nextLayout }),
      );
    } catch {
      /* The current page still updates. */
    }
  }
  function setTheme(value: ThemeName) {
    setThemeState(value);
    persist(value, layout);
  }
  function setLayout(value: HeroLayout) {
    setLayoutState(value);
    persist(theme, value);
  }
  function start(artwork = artworks[0]) {
    if (site.appUrl) {
      window.location.assign(site.appUrl);
      return;
    }
    setDialog({ kind: "workspace", artwork });
  }
  return (
    <Context.Provider
      value={{ theme, layout, setTheme, setLayout, dialog, setDialog, start }}
    >
      <div className="prism-site" data-theme={theme} data-hero={layout}>
        {children}
        <Dialogs />
      </div>
    </Context.Provider>
  );
}
