import { site } from "@/site.config";
import { Label, Mark, Title } from "../ui";
export function Context() {
  return (
    <section className="context section-shell section-space">
      <div className="context-visual" data-reveal aria-hidden="true">
        <div className="context-grid" />
        <div className="context-core">
          <Mark />
          <span>{site.name}</span>
        </div>
        <svg viewBox="0 0 620 370" fill="none" className="context-paths">
          <path
            d="M145 65h65q45 0 45 45v75h55M480 65H400q-35 0-35 35v85h-55M115 185h195m200 0H310M150 300h60q45 0 45-45v-70h55M470 300h-65q-40 0-40-40v-75h-55"
            stroke="#454552"
            strokeWidth="1"
          />
        </svg>
        {site.context.inputs.map((input, index) => (
          <span className={`context-input input-${index}`} key={input}>
            <i>{["↗", "≋", "⌘", "▤", "✳", "↻"][index]}</i>
            {input}
          </span>
        ))}
      </div>
      <div className="context-copy">
        <Label>{site.context.eyebrow}</Label>
        <Title lines={site.context.title} />
        <p className="section-description">{site.context.description}</p>
        <p className="context-footnote">
          Good context travels with the decision.
        </p>
      </div>
    </section>
  );
}
