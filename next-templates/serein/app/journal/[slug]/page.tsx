import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/data/journal";
import { asset, href } from "@/lib/urls";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Arrow } from "@/components/ui/Arrow";
export const dynamicParams = false;
export const generateStaticParams = () =>
  articles.map((article) => ({ slug: article.slug }));
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return { title: article?.title, description: article?.excerpt };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  return (
    <main id="main" className="container article-page">
      <a className="back-link" href={href("/journal")}>
        <Arrow diagonal={false} className="arrow-back" />
        The journal
      </a>
      <div className="article-heading">
        <Eyebrow>
          {article.category} / {article.date}
        </Eyebrow>
        <h1>{article.title}</h1>
        <p>{article.excerpt}</p>
      </div>
      <img
        className="article-image"
        src={asset(article.image)}
        alt=""
        width="1536"
        height="1024"
      />
      <article className="article-copy">
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 35)}>{paragraph}</p>
        ))}
        <a className="text-link" href={href("/contact")}>
          Continue the conversation
          <Arrow />
        </a>
      </article>
    </main>
  );
}
