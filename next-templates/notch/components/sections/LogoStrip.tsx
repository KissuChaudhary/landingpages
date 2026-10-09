import { site } from "@/site.config";
import { CustomerLogo } from "../ui/Logos";

// A slow marquee of customer marks. It pauses on hover, with the footer's
// "Pause motion" control, and stands still with reduced motion.
export function LogoStrip() {
  const { logos } = site;
  return (
    <section className="logos" aria-label="Customers">
      <p className="logos-label" data-reveal="">{logos.label}</p>
      <div className="marquee" data-reveal="" style={{ "--rd": "120ms" } as React.CSSProperties}>
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul className="marquee-set" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {logos.names.map((name) => (
                <li key={name}>
                  <CustomerLogo name={name} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
