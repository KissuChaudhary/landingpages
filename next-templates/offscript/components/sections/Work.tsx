import { site } from "@/site.config";
import { projects } from "@/data/projects";
import { asset, pageHref } from "@/lib/links";
import { Arrow, Label, Title } from "../ui";
export function Work() {
  return (
    <section
      id="work"
      className="work wrap section-pad"
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <div>
          <Label>{site.work.eyebrow}</Label>
          <Title lines={site.work.title} id="work-title" />
        </div>
        <p>{site.work.description}</p>
      </div>
      <div className="work-grid">
        {projects.map((project, index) => (
          <a
            href={pageHref(`/work/${project.slug}`)}
            key={project.slug}
            className={`project project-${index} project-${project.color}`}
            data-reveal
          >
            <div className="project-image">
              <img
                src={asset(project.image)}
                alt={project.alt}
                loading="lazy"
                width={index === 0 ? 1536 : 1024}
                height={index === 0 ? 1024 : 1536}
              />
              <div className="project-topline">
                <span>Self-initiated concept</span>
                <span>OS—{project.number}</span>
              </div>
              <span className="project-wordmark">{project.name}</span>
              <span className="project-open">
                <Arrow diagonal size={23} />
              </span>
            </div>
            <div className="project-caption">
              <span className="project-number">{project.number}</span>
              <div>
                <h3>{project.descriptor}</h3>
                <p>{project.type}</p>
              </div>
              <Arrow diagonal size={19} />
            </div>
          </a>
        ))}
      </div>
      <div className="work-footnote">
        <span>Different worlds. One way of thinking.</span>
        <span>Ideas from our studio, for a little inspiration.</span>
      </div>
    </section>
  );
}
