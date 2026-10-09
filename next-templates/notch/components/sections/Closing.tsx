"use client";

import { Smartphone } from "lucide-react";
import { site, signupHref } from "@/site.config";
import { asset } from "@/lib/urls";
import { useScrollProgress } from "../Motion";
import { Curtain } from "../ui/Curtain";
import { ButtonLink } from "../ui/Primitives";

// The closing panel. The light curtain from the hero returns and rises behind it as it scrolls in.
export function Closing() {
  const { closing, links } = site;
  const stage = useScrollProgress<HTMLElement>(
    (p, el) => el.style.setProperty("--p", p.toFixed(3)),
    (_, vh) => ({ start: vh * 0.95, distance: vh * 0.7 }),
  );
  const apps = [
    { label: "App Store", href: links.appStore },
    { label: "Google Play", href: links.playStore },
  ].filter((a) => a.href);

  return (
    <section className="closing" ref={stage} aria-labelledby="closing-title">
      <Curtain variant="closing" />
      <div className="container">
        <div className="closing-panel">
          <div className="closing-copy">
            <div className="closing-app" data-reveal="">
              <span className="closing-app-icon">
                <Smartphone size={22} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span>
                <strong>{closing.app.title}</strong>
                <span>
                  {apps.length
                    ? apps.map((a, i) => (
                        <span key={a.label}>
                          {i > 0 && " · "}
                          <a href={a.href} target="_blank" rel="noreferrer">
                            {a.label}
                          </a>
                        </span>
                      ))
                    : closing.app.text}
                </span>
              </span>
            </div>
            <h2 id="closing-title" data-reveal="" style={{ "--rd": "80ms" } as React.CSSProperties}>
              {closing.heading}
            </h2>
            <p data-reveal="" style={{ "--rd": "140ms" } as React.CSSProperties}>
              {closing.text}
            </p>
            <div data-reveal="" style={{ "--rd": "200ms" } as React.CSSProperties}>
              <ButtonLink to={signupHref()} label={closing.cta} arrow />
            </div>
          </div>
          <div className="closing-shot" data-reveal="" style={{ "--rx": "64px", "--ry": "24px", "--rd": "160ms" } as React.CSSProperties}>
            <img src={asset(closing.image)} width={2720} height={1760} alt="" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
}
