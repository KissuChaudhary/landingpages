import { site } from "@/site.config";
import { LogoMark, logos } from "@/components/ui/Logos";

// A slow, endless strip of client logos. It's a CSS animation, so "pause motion" and
// reduced motion stop it without any script.

export function LogoStrip() {
  return (
    <section className="logos" aria-label="Clients">
      <p className="logos-label label" data-reveal="fade">
        {site.logos.label}
      </p>
      <div className="logos-viewport" data-reveal="fade" style={{ "--d": "120ms" } as React.CSSProperties}>
        <ul className="logos-track">
          {[0, 1].map((copy) =>
            logos.map((logo) => (
              <li key={`${copy}-${logo.name}`} aria-hidden={copy === 1}>
                <LogoMark logo={logo} />
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}
