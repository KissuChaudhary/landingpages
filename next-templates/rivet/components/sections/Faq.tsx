import { site } from "@/site.config";
import { Label, Action } from "../ui/Action";
export function Faq() {
  return (
    <section className="faq section-wrap">
      <div>
        <Label>Before we begin</Label>
        <h2 data-reveal>
          A few good
          <br />
          questions.
        </h2>
        <p>
          Wondering where to start?
          <br />
          You’re in the right place.
        </p>
        <Action href="/contact" quiet>
          Ask us something
        </Action>
      </div>
      <div className="faq-list">
        {site.faq.map((f, i) => (
          <details key={f.q} open={i === 0}>
            <summary>
              <span className="label-type">0{i + 1}</span>
              <h3>{f.q}</h3>
              <span className="disclosure-sign" />
            </summary>
            <div>
              <p>{f.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
