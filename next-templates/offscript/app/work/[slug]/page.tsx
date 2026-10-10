import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { asset, contact, home, pageHref } from "@/lib/links";
import { Navigation } from "@/components/Navigation";
import { Motion } from "@/components/Motion";
import { Arrow, Label } from "@/components/ui";
import { Footer } from "@/components/sections/Closing";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return {
    title: project
      ? `${project.name} — Offscript creative study`
      : "Creative study — Offscript",
    description: project?.intro,
  };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];
  return (
    <div id="top">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Motion />
      <Navigation inner />
      <main id="main" className="case-page">
        <div className="case-intro wrap">
          <a href={`${home()}#work`} className="back-link">
            ← Back to the work
          </a>
          <Label>OS—{project.number} / Self-initiated creative study</Label>
          <h1>{project.name}</h1>
          <div className="case-deck">
            <h2>{project.descriptor}</h2>
            <p>{project.intro}</p>
          </div>
          <ul className="case-tags">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        <figure className={`case-image case-${project.color} wrap`}>
          <img
            src={asset(project.image)}
            alt={project.alt}
            fetchPriority="high"
            width={project.slug === "sidequest" ? 1536 : 1024}
            height={project.slug === "sidequest" ? 1024 : 1536}
          />
          <figcaption>
            Original illustrative campaign direction. Fictional brand,
            independently explored.
          </figcaption>
        </figure>
        <div className="case-story wrap">
          {[
            { title: "The question", copy: project.question },
            { title: "The direction", copy: project.direction },
            { title: "The making", copy: project.making },
            { title: "The point of view", copy: project.takeaway },
          ].map((chapter, i) => (
            <section key={chapter.title} data-reveal>
              <span>0{i + 1}</span>
              <h2>{chapter.title}</h2>
              <p>{chapter.copy}</p>
            </section>
          ))}
        </div>
        <div className="case-outro wrap">
          <p>Have a world of your own in mind?</p>
          <a
            className="text-link"
            href={contact(`A creative direction for our brand`)}
          >
            Let’s find your angle
            <Arrow diagonal size={18} />
          </a>
        </div>
        <a className="next-project wrap" href={pageHref(`/work/${next.slug}`)}>
          <span>Next creative world</span>
          <strong>{next.name.toLowerCase()}</strong>
          <Arrow diagonal size={42} />
        </a>
      </main>
      <Footer inner />
    </div>
  );
}
