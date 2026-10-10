import { site } from "@/site.config";
import { Label, Action } from "../ui/Action";
export function Closing() {
  return (
    <section className="closing section-wrap">
      <div className="closing-top">
        <Label>{site.closing.eyebrow}</Label>
        <span className="closing-coordinate label-type">
          An open invitation / {site.copyrightYear}
        </span>
      </div>
      <h2 className="closing-title" data-sheen data-reveal>
        {site.closing.heading.split("\n").map((line) => (
          <span className="closing-line" key={line}>
            <span className="steel">{line}</span>
          </span>
        ))}
      </h2>
      <div className="closing-bottom">
        <p>{site.closing.text}</p>
        <Action href={site.links.booking || "/contact"}>
          {site.closing.cta}
        </Action>
      </div>
    </section>
  );
}
