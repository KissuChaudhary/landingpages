import { site } from "@/site.config";
import { systems } from "@/data/systems";
import { href } from "@/lib/links";
import { Arrow, Eyebrow, Title } from "@/components/ui";
import { Sculpture } from "@/components/art/Sculpture";
export function Systems() {
  return (
    <section className="systems section dark" id="systems">
      <div className="section-heading">
        <div>
          <Eyebrow>{site.systems.eyebrow}</Eyebrow>
          <Title lines={site.systems.title} />
        </div>
        <p data-reveal>{site.systems.description}</p>
      </div>
      <div className="system-cards">
        {systems.map((system, i) => (
          <a
            className={`system-card tone-${system.color}`}
            href={href(`/systems/${system.slug}`)}
            key={system.slug}
            data-reveal
          >
            <div className="system-card-art" data-scene>
              <span className="mono">T / {system.number}</span>
              <Sculpture variant={i} compact />
              <span className="system-card-arrow">
                <Arrow diagonal />
              </span>
            </div>
            <div className="system-card-copy">
              <span className="mono">{system.category}</span>
              <h3>{system.title}</h3>
              <p>{system.summary}</p>
              <span className="case-link">
                Explore the system <Arrow />
              </span>
            </div>
          </a>
        ))}
      </div>
      <p className="example-note mono">
        THREE EXAMPLE ARCHITECTURES / DESIGNED AROUND EVERYDAY WORK
      </p>
    </section>
  );
}
