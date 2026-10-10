import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, articleDate } from "@/data/articles";
import { Label, Action } from "@/components/ui/Action";
import { ProjectArt } from "@/components/art/ProjectArt";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return { title: a?.title || "Note not found", description: a?.excerpt };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  return (
    <main id="main">
      <article>
        <header className="page-header article-header section-wrap">
          <Label>
            {a.category} / {articleDate(a.date)} / {a.read}
          </Label>
          <h1>{a.title}</h1>
          <p>{a.excerpt}</p>
        </header>
        <div className="article-cover section-wrap">
          <ProjectArt kind={a.art} />
        </div>
        <div className="article-body">
          {a.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <Action href="/journal" quiet>
            Back to field notes
          </Action>
        </div>
      </article>
    </main>
  );
}
