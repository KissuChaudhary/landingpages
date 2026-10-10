import { notFound } from "next/navigation";
import { notes } from "@/data/notes";
import { route } from "@/lib/urls";
import { Eyebrow, Multiline, Arrow } from "@/components/ui";
export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  return { title: note?.title.replace("\n", " "), description: note?.intro };
}
export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  if (!note) notFound();
  const readingMinutes = Math.max(
    1,
    Math.ceil(
      [note.intro, ...note.paragraphs.map((part) => part.body)]
        .join(" ")
        .split(/\s+/).length / 200,
    ),
  );
  const next = notes[(notes.indexOf(note) + 1) % notes.length];
  return (
    <main id="main" className="note-page">
      <article>
        <header className="editorial-header wrapper">
          <a className="text-link" href={route("/#journal-title")}>
            ← Studio notebook
          </a>
          <Eyebrow>{note.category}</Eyebrow>
          <h1>
            <Multiline text={note.title} />
          </h1>
          <div className="article-byline">
            <span>By the studio</span>
            <time dateTime={note.date}>{note.displayDate}</time>
            <span>{readingMinutes} minute read</span>
          </div>
        </header>
        <div className={`article-banner note-${note.tone}`} aria-hidden="true">
          <span>
            {note.tone === "lime" ? "WHAT IF?" : "A little more you."}
          </span>
          <span className="article-doodle">
            {note.tone === "lime" ? "↗" : ":)"}
          </span>
        </div>
        <div className="article-body">
          <p className="article-lead">{note.intro}</p>
          {note.paragraphs.map((part) => (
            <section key={part.heading}>
              <h2>{part.heading}</h2>
              <p>{part.body}</p>
            </section>
          ))}
        </div>
      </article>
      <a className="next-project wrapper" href={route(`/notes/${next.slug}`)}>
        <div>
          <Eyebrow>Keep reading</Eyebrow>
          <h2>{next.title.replace("\n", " ")}</h2>
        </div>
        <Arrow diagonal />
      </a>
    </main>
  );
}
