import { site } from "@/site.config";
import { asset } from "@/lib/links";
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
          <div id="work-title">
            <Title lines={site.work.title} />
          </div>
        </div>
        <p>{site.work.description}</p>
      </div>
      <div className="work-grid">
        {site.work.projects.map((project, index) => {
          const content = (
            <>
              <div className="project-image">
                <img
                  src={asset(project.image)}
                  alt={project.alt}
                  loading="lazy"
                />
                <div className="project-topline">
                  <span>{project.concept}</span>
                  <span>OL / {project.number}</span>
                </div>
                <span className="project-wordmark">
                  {project.name}
                  <i>✳</i>
                </span>
                <span className="project-type">{project.type}</span>
                {project.url && (
                  <span className="project-open">
                    <Arrow diagonal />
                  </span>
                )}
              </div>
              <div className="project-caption">
                <div>
                  <span className="project-number">{project.number}</span>
                  <h3>{project.descriptor}</h3>
                </div>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </>
          );
          return project.url ? (
            <a
              href={project.url}
              key={project.name}
              className={`project project-${index}`}
              data-reveal
            >
              {content}
            </a>
          ) : (
            <article
              key={project.name}
              className={`project project-${index}`}
              data-reveal
            >
              {content}
            </article>
          );
        })}
      </div>
      <div className="work-footnote">
        <span>A point of view, in every frame.</span>
        <span>Independent brands. Collective imagination.</span>
      </div>
    </section>
  );
}
