import { Navigation } from "./Navigation";
import { Footer } from "./sections/Footer";
import { MotionProvider } from "./Motion";
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <div id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        {children}
        <Footer />
      </div>
    </MotionProvider>
  );
}
