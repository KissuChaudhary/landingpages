import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { Action, planHref } from "@/components/ui/Action";

// The last ask: a dark panel with a looping line that draws itself, and a wide photo.

export function Closing() {
  const { closing } = site;
  return (
    <section className="section closing" aria-labelledby="closing-title">
      <div className="container closing-grid">
        <div className="closing-card on-dark js-draw" data-reveal>
          <svg className="closing-loop" viewBox="0 0 300 120" fill="none" aria-hidden="true">
            <path className="draw" pathLength={1} d="M-10 100C40 104 70 92 86 70 104 44 92 14 70 18 46 22 50 62 84 74 130 90 190 70 290 48" />
          </svg>
          <span className="closing-note">
            <span className="closing-dot" aria-hidden="true" />
            {closing.note}
          </span>
          <h2 id="closing-title" className="h1 closing-title">
            {closing.title}
          </h2>
          <p className="lead closing-body">{closing.body}</p>
          <Action to={planHref()} label={site.cta} tone="light" size="lg" />
        </div>
        <figure className="closing-media" data-reveal="mask" style={{ "--d": "120ms" } as React.CSSProperties}>
          <img src={asset(closing.image)} alt={closing.alt} width={944} height={704} loading="lazy" />
        </figure>
      </div>
    </section>
  );
}
