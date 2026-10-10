import { Navigation } from "./Navigation";
import { MotionProvider } from "./MotionProvider";
import { Footer } from "./sections/Footer";
import { asset } from "@/lib/urls";
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <div
        id="page-content"
        style={
          {
            "--steel": `url(${asset("/images/hero.webp")})`,
          } as React.CSSProperties
        }
      >
        {children}
        <Footer />
      </div>
    </MotionProvider>
  );
}
