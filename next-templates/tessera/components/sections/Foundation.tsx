import { site } from "@/site.config";
import { Eyebrow, Title } from "@/components/ui";
export function Foundation() {
  const data = site.foundation;
  return (
    <section className="foundation section dark">
      <Eyebrow>{data.eyebrow}</Eyebrow>
      <div className="foundation-intro">
        <Title lines={[data.title]} />
        <p data-reveal>{data.body}</p>
      </div>
      <div className="foundation-grid">
        {data.items.map((item) => (
          <article key={item.number} data-reveal>
            <span className="foundation-number">{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
      <div className="tools-row" data-reveal>
        <span className="mono">BUILT AROUND</span>
        {data.tools.map((tool) => (
          <span key={tool}>
            {tool}
            <i aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  );
}
