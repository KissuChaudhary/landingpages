import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { Action, planHref } from "@/components/ui/Action";

// Last call: the crowd fills the panel, the headline sits over it and a lime loop draws
// itself across the top. The photo settles in as the panel opens.

export function Closing() {
  const { closing } = site;
  return (
    <section className="section closing" aria-labelledby="closing-title">
      <div className="container">
        <div className="closing-panel on-dark js-draw" data-reveal="mask" style={{ "--mask-bg": "var(--paper)" } as React.CSSProperties}>
          <img className="closing-photo" src={asset(closing.image)} alt={closing.alt} width={1600} height={900} loading="lazy" />
          <svg className="closing-loop" viewBox="0 0 300 120" fill="none" aria-hidden="true">
            <path className="draw" pathLength={1} d="M-10 100C40 104 70 92 86 70 104 44 92 14 70 18 46 22 50 62 84 74 130 90 190 70 290 48" />
          </svg>
          <div className="closing-copy">
            <span className="closing-note">
              <span className="closing-dot" aria-hidden="true" />
              {closing.note}
            </span>
            <h2 id="closing-title" className="display closing-title">
              {closing.title}
            </h2>
            <div className="closing-row">
              <p className="lead closing-body">{closing.body}</p>
              <Action to={planHref()} label={site.cta} tone="lime" size="lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
