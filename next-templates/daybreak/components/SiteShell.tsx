"use client";
import type { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./sections/Footer";
import { MotionProvider } from "./Motion";
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <div id="top" className="site-shell">
        <Navigation />
        {children}
        <Footer />
      </div>
    </MotionProvider>
  );
}
