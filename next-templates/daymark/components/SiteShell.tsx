import { Motion } from "./Motion";
import { Navigation } from "./Navigation";
import { Footer } from "./sections/Footer";
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <Motion>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">{children}</main>
      <Footer />
    </Motion>
  );
}
