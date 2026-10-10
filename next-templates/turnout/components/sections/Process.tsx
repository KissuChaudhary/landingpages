import { site } from "@/site.config";
import { ProcessGlyph } from "@/components/ui/Icons";

// Four steps in a row. Pointing at one (or tabbing to it) widens it to show when it
// happens and what you get; the others make room. On phones every step is open.

export function Process() {
  const { process } = site;
  return (
    <section id="process" className="section process" aria-labelledby="process-title">
      <div className="container">
        <div className="section-head">
          <span className="tag" data-reveal>
            {process.label}
          </span>
          <h2 id="process-title" className="h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            {process.title}
          </h2>
        </div>
        <ol className="process-list">
          {process.steps.map((step, i) => (
            <li key={step.title} className="process-card" data-accent={step.accent} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties} tabIndex={0}>
              <div className="process-top">
                <span className="process-num">{String(i + 1).padStart(2, "0")}</span>
                <ProcessGlyph name={step.icon} />
              </div>
              <div className="process-bottom">
                <span className="process-when label">{step.when}</span>
                <h3 className="h3 process-title">{step.title}</h3>
                <p className="process-text">{step.body}</p>
                <div className="process-more">
                  <ul>
                    {step.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
