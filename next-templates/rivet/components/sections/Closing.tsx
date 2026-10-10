import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { Label, Action } from "../ui/Action";
export function Closing() {
  return (
    <section className="closing">
      <img src={asset("/images/hero.webp")} alt="" loading="lazy" />
      <div className="closing-frame">
        <Label>{site.closing.eyebrow}</Label>
        <h2 data-reveal>
          {site.closing.heading.split("\n").map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </h2>
        <div className="closing-bottom">
          <p>{site.closing.text}</p>
          <Action href={site.links.booking || "/contact"}>
            {site.closing.cta}
          </Action>
        </div>
        <span className="closing-coordinate label-type">
          An open invitation / {site.copyrightYear}
        </span>
      </div>
    </section>
  );
}
