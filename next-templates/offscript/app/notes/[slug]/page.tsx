import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { notes } from "@/data/notes";
import { home, pageHref } from "@/lib/links";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Closing";
import { Arrow, Label } from "@/components/ui";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find((item) => item.slug === slug);
  return {
    title: note ? `${note.title} — Offscript notebook` : "Offscript notebook",
    description: note?.intro,
  };
}
export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = notes.find((item) => item.slug === slug);
  if (!note) notFound();
  const next =
    notes[(notes.findIndex((item) => item.slug === slug) + 1) % notes.length];
  return (
    <div id="top">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation inner />
      <main id="main" className="note-page wrap">
        <a className="back-link" href={home()}>
          ← Back to the studio
        </a>
        <header>
          <Label>
            {note.category} / {note.read}
          </Label>
          <h1>{note.title}</h1>
          <p>{note.intro}</p>
          <span>From the Offscript studio notebook</span>
        </header>
        <article>
          {note.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>
        <a className="next-note" href={pageHref(`/notes/${next.slug}`)}>
          <span>A little more from the notebook</span>
          <strong>{next.title}</strong>
          <Arrow diagonal size={28} />
        </a>
      </main>
      <Footer inner />
    </div>
  );
}
