import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { notes } from "@/data/notes";
import { href } from "@/lib/links";
import { Eyebrow, Title } from "@/components/ui";
export const dynamicParams = false;
export function generateStaticParams() {
  return notes.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find((note) => note.slug === slug);
  return { title: note?.title, description: note?.intro };
}
export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = notes.find((note) => note.slug === slug);
  if (!note) notFound();
  return (
    <article className="note-page section light">
      <a className="back-link mono" href={href("/#main")}>
        ← BACK TO THE STUDIO
      </a>
      <Eyebrow>
        {note.category} / {note.time}
      </Eyebrow>
      <Title as="h1" lines={[note.title]} />
      <p className="note-intro">{note.intro}</p>
      <div
        className={`note-page-art note-art tone-${note.color}`}
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="note-prose">
        {note.sections.map((section) => (
          <section className="prose-section" key={section.title} data-reveal>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
