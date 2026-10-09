import { Navigation } from "./Navigation";
import { Footer } from "./sections/Footer";
import { ExperienceProvider } from "./Experience";
import { MotionProvider } from "./Motion";
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <ExperienceProvider>
        <div id="top">
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Navigation />
          {children}
          <Footer />
        </div>
      </ExperienceProvider>
    </MotionProvider>
  );
}
