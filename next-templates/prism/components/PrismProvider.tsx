"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  artworks,
  site,
  type Artwork,
  type HeroLayout,
  type ThemeName,
} from "@/site.config";

interface PrismContext {
  theme: ThemeName;
  layout: HeroLayout;
  setTheme: (theme: ThemeName) => void;
  setLayout: (layout: HeroLayout) => void;
  // The hero workspace opens in place. `request` tells it which example to
  // load; `workspaceOpen` expands the split hero to show the full controls.
  workspaceOpen: boolean;
  request: { artwork: Artwork; id: number } | null;
  start: (artwork?: Artwork) => void;
  appearanceOpen: boolean;
  setAppearanceOpen: (open: boolean) => void;
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
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [request, setRequest] = useState<PrismContext["request"]>(null);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
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
    setWorkspaceOpen(true);
    setRequest((current) => ({ artwork, id: (current?.id ?? 0) + 1 }));
  }
  return (
    <Context.Provider
      value={{
        theme,
        layout,
        setTheme,
        setLayout,
        workspaceOpen,
        request,
        start,
        appearanceOpen,
        setAppearanceOpen,
      }}
    >
      <div className="prism-site" data-theme={theme} data-hero={layout}>
        {children}
      </div>
    </Context.Provider>
  );
}
