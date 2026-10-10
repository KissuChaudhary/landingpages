import { site } from "@/site.config";
import { process } from "@/data/services";
import { Label } from "../ui/Action";
export function Process() {
  return (
    <section className="process section-wrap" id="process">
      <div className="process-intro">
        <Label>{site.process.eyebrow}</Label>
        <h2 data-reveal>
          {site.process.heading.split("\n").map((line, i) => (
            <span key={line}>
              {i === 1 ? <mark>{line}</mark> : line}
              <br />
            </span>
          ))}
        </h2>
        <p>{site.process.text}</p>
        <div className="process-seal" aria-hidden="true">
          <svg viewBox="0 0 140 140">
            <circle
              cx="70"
              cy="70"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 7"
            />
            <path
              d="M48 48h44v44H48zM26 70h88M70 26v88"
              fill="none"
              stroke="currentColor"
            />
          </svg>
          <span>
            Made
            <br />
            together.
          </span>
        </div>
      </div>
      <ol className="process-steps">
        {process.map((s, i) => (
          <li key={s.title} data-reveal>
            <span className="process-dot" />
            <span className="label-type">
              0{i + 1} / {s.detail}
            </span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
