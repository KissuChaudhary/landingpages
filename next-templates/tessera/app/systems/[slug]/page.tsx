import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { systems } from "@/data/systems";
import { site } from "@/site.config";
import { href } from "@/lib/links";
import { Button, Eyebrow, Title } from "@/components/ui";
import { SystemDiagram } from "@/components/art/SystemDiagram";
export const dynamicParams = false;
export function generateStaticParams() {
  return systems.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = systems.find((system) => system.slug === slug);
  return { title: item?.title, description: item?.summary };
}
export default async function SystemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = systems.find((system) => system.slug === slug);
  if (!item) notFound();
  const next = systems[(systems.indexOf(item) + 1) % systems.length];
  return (
    <>
      <section className="story-header section light">
        <a className="back-link mono" href={href("/#systems")}>
          ← ALL SYSTEM STUDIES
        </a>
        <Eyebrow>{item.category} / EXAMPLE SYSTEM</Eyebrow>
        <Title as="h1" lines={[item.title]} />
        <p>{item.summary}</p>
        <SystemDiagram nodes={item.nodes} color={item.color} />
      </section>
      <section className="story-body section light">
        <aside>
          <p className="mono">THE SHAPE OF THE SYSTEM</p>
          <ul>
            {item.scope.map((scope) => (
              <li key={scope}>{scope}</li>
            ))}
          </ul>
          <p className="story-example">
            Illustrative system architecture. Every project begins with the
            team’s actual workflow and access requirements.
          </p>
        </aside>
        <div>
          <div className="before-after">
            <article>
              <span className="mono">THE FRICTION</span>
              <p>{item.before}</p>
            </article>
            <article className={`tone-${item.color}`}>
              <span className="mono">THE INTENDED CHANGE</span>
              <p>{item.after}</p>
            </article>
          </div>
          {item.sections.map((section) => (
            <article className="prose-section" key={section.title} data-reveal>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
          <Button to={site.links.booking}>Discuss a system like this</Button>
        </div>
      </section>
      <a href={href(`/systems/${next.slug}`)} className="next-story section">
        <span className="mono">NEXT SYSTEM / {next.category}</span>
        <h2>
          {next.title} <span>↗</span>
        </h2>
      </a>
    </>
  );
}
