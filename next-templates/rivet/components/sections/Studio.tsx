import { site } from "@/site.config";
import { projects } from "@/data/projects";
import { asset, route } from "@/lib/urls";
import { Label, Action } from "../ui/Action";
export function Trust() {
  return (
    <section className="trust section-wrap" id="intro">
      <div>
        <Label>In good company</Label>
        <p>
          Different ambitions.
          <br />
          <span>A shared belief in better.</span>
        </p>
      </div>
      <div className="client-marks">
        {projects.map((p) => (
          <a
            href={route(`/work/${p.slug}`)}
            key={p.slug}
            aria-label={`Explore ${p.name}`}
          >
            <span className={`client-${p.slug}`}>
              {p.name}
              {p.slug === "counter" ? "↗" : p.slug === "goodwell" ? "✳" : "."}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
export function Philosophy() {
  return (
    <section className="philosophy section-wrap">
      <Label>{site.philosophy.eyebrow}</Label>
      <h2 data-reveal>
        {site.philosophy.heading[0]}
        <br />
        <span>{site.philosophy.heading[1]}</span>
      </h2>
      <p data-reveal>{site.philosophy.text}</p>
      <ol className="philosophy-steps" aria-label="Our working principles">
        {site.philosophy.steps.map((item, i) => (
          <li
            data-reveal
            key={item}
            style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}
          >
            <span className="label-type">0{i + 1}</span>
            {item}
          </li>
        ))}
      </ol>
    </section>
  );
}
export function Studio() {
  return (
    <section className="studio section-wrap" id="studio">
      <div className="studio-photo" data-drift data-reveal>
        <img
          src={asset("/images/studio.webp")}
          alt="A small design and engineering team working in a sunlit studio"
          loading="lazy"
        />
        <span className="label-type">A shared table. A shared standard.</span>
      </div>
      <div className="studio-copy">
        <Label>A deliberately small studio</Label>
        <h2 data-reveal>
          {site.studio.heading[0]}
          <br />
          <span>{site.studio.heading[1]}</span>
        </h2>
        <div className="studio-facts">
          {site.studio.facts.map((f) => (
            <div key={f.label} data-reveal>
              <strong>
                {f.value}
                <span>/</span>
              </strong>
              <span className="label-type">{f.label}</span>
            </div>
          ))}
        </div>
        <p data-reveal>{site.studio.text}</p>
        <Action href="/about" quiet>
          Get to know us
        </Action>
      </div>
    </section>
  );
}
