import { site } from "@/site.config";
import { projects, type Project } from "@/data/projects";
import { asset, route } from "@/lib/urls";
import { Arrow, Eyebrow, Multiline } from "../ui";
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <a
      data-reveal
      className={`project-card project-card-${index} tone-${project.tone}`}
      href={route(`/work/${project.slug}`)}
    >
      <div className="project-image">
        <img
          src={asset(project.image)}
          alt={project.alt}
          loading="lazy"
          width="1024"
          height="1536"
        />
        <span className="project-code">
          {String(index + 1).padStart(2, "0")} / {project.year}
        </span>
        <span className="project-logo">
          {project.name}
          <sup>®</sup>
        </span>
        <span className="project-open">
          <Arrow diagonal />
          <span>See the story</span>
        </span>
      </div>
      <div className="project-caption">
        <h3>{project.name}</h3>
        <p>{project.category}</p>
        <Arrow diagonal />
      </div>
    </a>
  );
}
export function Work() {
  return (
    <section
      className="work wrapper section-pad"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="section-intro">
        <div>
          <Eyebrow>{site.work.eyebrow}</Eyebrow>
          <h2 id="work-title" data-reveal>
            <Multiline text={site.work.title} />
          </h2>
        </div>
        <p>{site.work.description}</p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
