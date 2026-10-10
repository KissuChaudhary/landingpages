import { Navigation } from "./Navigation";
import { MotionProvider } from "./MotionProvider";
import { Footer } from "./sections/Footer";
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <div id="page-content">
        {children}
        <Footer />
      </div>
    </MotionProvider>
  );
}
