import { site } from "@/site.config";
import { projects } from "@/data/projects";
import { route } from "@/lib/urls";
import { Label } from "../ui/Action";
import { Arrow } from "../ui/Mark";
import { ProjectArt } from "../art/ProjectArt";
export function Work() {
  return (
    <section className="work section-wrap" id="work">
      <div className="section-heading">
        <Label>{site.work.eyebrow}</Label>
        <div>
          <h2 data-reveal>{site.work.heading}</h2>
          <p data-reveal>{site.work.text}</p>
        </div>
      </div>
      <div className="work-grid">
        {projects.map((p, i) => (
          <a
            className="project-card"
            data-reveal
            key={p.slug}
            href={route(`/work/${p.slug}`)}
            aria-label={`${p.name}: ${p.title}`}
          >
            <div className="project-visual">
              <ProjectArt kind={p.art} />
              <span className="project-open">
                <Arrow diagonal />
              </span>
              <span className="project-number label-type">
                0{i + 1} / {p.year}
              </span>
            </div>
            <div className="project-info">
              <div>
                <h3>
                  {p.name}
                  <span>®</span>
                </h3>
                <p>{p.description}</p>
              </div>
              <div className="tags">
                {p.tags.slice(0, 2).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
