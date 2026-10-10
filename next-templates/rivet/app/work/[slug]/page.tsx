import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectArt } from "@/components/art/ProjectArt";
import { Label, Action } from "@/components/ui/Action";
import { Closing } from "@/components/sections/Closing";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return {
    title: p ? `${p.name} — ${p.title}` : "Project not found",
    description: p?.description,
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <main id="main">
      <section className="page-header project-header section-wrap">
        <Label>
          {p.name} / {p.sector} / {p.year}
        </Label>
        <h1>{p.title}</h1>
        <div className="project-header-bottom">
          <p>{p.description}</p>
          <div className="tags">
            {p.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>
      <div className="case-art section-wrap">
        <ProjectArt kind={p.art} />
      </div>
      <section className="case-body section-wrap">
        <div>
          <Label>A connected collaboration</Label>
          <h2>
            {p.name}
            <span>®</span>
          </h2>
          <ul>
            {p.deliverables.map((d) => (
              <li key={d}>+ {d}</li>
            ))}
          </ul>
        </div>
        <div>
          {[
            { label: "The question", text: p.challenge },
            { label: "The approach", text: p.approach },
            { label: "What we made", text: p.outcome },
          ].map((s) => (
            <article key={s.label} data-reveal>
              <h3>{s.label}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="case-next section-wrap">
        <Label>Another perspective</Label>
        <h2>{next.name}.</h2>
        <Action href={`/work/${next.slug}`} quiet>
          {next.title}
        </Action>
        <Action href="/#work" quiet>
          All selected work
        </Action>
      </section>
      <Closing />
    </main>
  );
}
