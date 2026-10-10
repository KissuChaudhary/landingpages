import type { ReactNode } from "react";
import { MotionProvider } from "@/components/Motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      {children}
      <Footer />
    </MotionProvider>
  );
}
