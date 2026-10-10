import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { site } from "@/site.config";
import { asset, route } from "@/lib/urls";
import { Arrow, ButtonLink, Eyebrow, Multiline } from "@/components/ui";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project?.name || "Project",
    description: project?.description,
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <main id="main" className="project-page">
      <header className="editorial-header wrapper">
        <a className="text-link" href={route("/#work")}>
          ← Selected work
        </a>
        <Eyebrow>
          {project.name} / {project.year}
        </Eyebrow>
        <h1>
          <Multiline text={project.headline} />
        </h1>
        <div className="project-summary">
          <p>{project.description}</p>
          <span>{project.category}</span>
        </div>
      </header>
      <div className={`case-hero wrapper tone-${project.tone}`}>
        <img
          src={asset(project.image)}
          alt={project.alt}
          width="1536"
          height="1536"
          fetchPriority="high"
        />
        <span>
          {project.name}
          <sup>®</sup>
        </span>
      </div>
      <div className="case-body wrapper">
        <aside>
          <Eyebrow>The collaboration</Eyebrow>
          <h2>{project.name}</h2>
          <ul>
            {project.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <ButtonLink href={site.contactHref}>
            Make something with us
          </ButtonLink>
        </aside>
        <div>
          {[
            {
              label: "01 / The starting point",
              title: "A clear creative challenge.",
              body: project.challenge,
            },
            {
              label: "02 / The idea",
              title: "Find a feeling to build on.",
              body: project.idea,
            },
            {
              label: "03 / The output",
              title: "A world worth spending time in.",
              body: project.outcome,
            },
          ].map((section) => (
            <section key={section.label} data-reveal>
              <p className="eyebrow">{section.label}</p>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </div>
      <a className="next-project wrapper" href={route(`/work/${next.slug}`)}>
        <div>
          <Eyebrow>Next collaboration</Eyebrow>
          <h2>{next.name}</h2>
        </div>
        <Arrow diagonal />
      </a>
    </main>
  );
}
