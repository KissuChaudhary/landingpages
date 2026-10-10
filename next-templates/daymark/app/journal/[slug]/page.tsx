import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { notes } from "@/data/journal";
import { site } from "@/site.config";
import { TextLink } from "@/components/ui/Button";
export const dynamicParams = false;
export const generateStaticParams = () =>
  notes.map((note) => ({ slug: note.slug }));
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find((item) => item.slug === slug);
  return { title: note?.title.replace("\n", " "), description: note?.intro };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = notes.find((item) => item.slug === slug);
  if (!note) notFound();
  return (
    <article className="article">
      <p className="eyebrow">
        <span />
        {note.category} / Studio notes
      </p>
      <h1>{note.title}</h1>
      <p className="article-intro">{note.intro}</p>
      <div className="article-meta">
        <span>{site.brand} studio</span>
        <span>{note.readTime}</span>
      </div>
      {note.sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
        </section>
      ))}
      <div className="article-back">
        <TextLink to="/journal">Back to the journal</TextLink>
      </div>
    </article>
  );
}
