import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { asset, href } from "@/lib/urls";
import { Arrow } from "@/components/ui/Arrow";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Closing } from "@/components/sections/Closing";

export const dynamicParams = false;
export const generateStaticParams = () =>
  projects.map((project) => ({ slug: project.slug }));
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return { title: project?.name, description: project?.summary };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return (
    <main id="main">
      <div className="container project-page-intro">
        <a className="back-link" href={href("/work")}>
          <Arrow className="arrow-back" diagonal={false} />
          All projects
        </a>
        <div className="project-page-title">
          <div>
            <Eyebrow>
              {project.category} / {project.year}
            </Eyebrow>
            <h1>{project.name}</h1>
          </div>
          <p>{project.summary}</p>
        </div>
      </div>
      <figure className="container project-page-image">
        <img
          src={asset(project.image)}
          alt={project.alt}
          width="1536"
          height="1024"
          fetchPriority="high"
        />
      </figure>
      <section className="container project-story">
        <aside>
          <Eyebrow>The collaboration</Eyebrow>
          <ul>
            {project.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
        <div>
          {[
            { title: "The challenge", copy: project.challenge },
            { title: "The approach", copy: project.approach },
            { title: "The outcome", copy: project.outcome },
          ].map((item) => (
            <article key={item.title} data-reveal>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <div className="container">
        <div
          className={`brand-study ${project.light ? "" : "brand-study-dark"}`}
          style={{ background: project.color }}
        >
          <span className="study-label">
            The identity / In its simplest form
          </span>
          <span className={`study-wordmark wordmark-${project.slug}`}>
            {project.name.toLowerCase()}
          </span>
          <span className="study-baseline">
            A distinct point of view.<span>{project.year}</span>
          </span>
        </div>
      </div>
      <section className="container next-project">
        <Eyebrow>Next collaboration</Eyebrow>
        <ProjectCard project={next} />
      </section>
      <Closing />
    </main>
  );
}
