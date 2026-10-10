import { projects } from "@/data/projects";
import { site } from "@/site.config";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { Arrow } from "../ui/Arrow";
import { href } from "@/lib/urls";
export function Work() {
  return (
    <section
      className="work container section-space"
      id="work"
      aria-labelledby="work-title"
    >
      <SectionHeading
        id="work-title"
        label="Selected work / 2025—2026"
        title={site.work.title}
        description={site.work.description}
        centered
      />
      <div className="project-stack">
        {projects.map((project) => (
          <ProjectCard project={project} stack key={project.slug} />
        ))}
      </div>
      <div className="work-bottom">
        <span>A selection of good collaborations.</span>
        <a className="text-link" href={href("/work")}>
          All projects <Arrow />
        </a>
      </div>
    </section>
  );
}
