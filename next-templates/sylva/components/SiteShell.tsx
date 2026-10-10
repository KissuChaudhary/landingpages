import { MotionProvider } from "./Motion";
import { Navigation } from "./Navigation";
import { Footer } from "./sections/Footer";
export function SiteShell({ children }: { children: React.ReactNode }) {
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
