"use client";
import type { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./sections/Footer";
import { Experience } from "./Experience";
import { MotionProvider } from "./Motion";
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <Experience>
        <div id="top" className="site-shell">
          <Navigation />
          {children}
          <Footer />
        </div>
      </Experience>
    </MotionProvider>
  );
}
