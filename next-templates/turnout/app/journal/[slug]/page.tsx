import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/site.config";
import { articles, formatDate, getArticle, readingTime } from "@/data/articles";
import { asset } from "@/lib/urls";
import { SmartLink } from "@/components/ui/Action";
import { ArrowLeft } from "@/components/ui/Icons";
import { ArticleCard } from "@/components/sections/Journal";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt, openGraph: { type: "article", ...(site.url ? { images: [article.image] } : {}) } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <article className="article">
      <header className="container article-head">
        <SmartLink to="/journal" className="back-link">
          <ArrowLeft size={16} /> Journal
        </SmartLink>
        <p className="article-meta label" data-reveal>
          <time dateTime={article.date}>{formatDate(article.date)}</time> · {readingTime(article)} min read
        </p>
        <h1 className="h1 article-title" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          {article.title}
        </h1>
        <p className="lead" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
          {article.excerpt}
        </p>
        <p className="article-author" data-reveal style={{ "--d": "220ms" } as React.CSSProperties}>
          <img src={asset(article.author.image)} alt="" width={96} height={96} />
          <span>
            <strong>{article.author.name}</strong>
            <span>{article.author.role}</span>
          </span>
        </p>
      </header>
      <figure className="container article-hero">
        <span data-reveal="mask">
          <img src={asset(article.image)} alt={article.alt} width={944} height={704} />
        </span>
      </figure>
      <div className="container article-body">
        {article.body.map((block, i) =>
          block.type === "h2" ? (
            <h2 key={i} className="h3">
              {block.text}
            </h2>
          ) : block.type === "quote" ? (
            <blockquote key={i} className="article-quote">
              {block.text}
            </blockquote>
          ) : (
            <p key={i}>{block.text}</p>
          ),
        )}
      </div>
      <section className="container article-more" aria-labelledby="more-title">
        <h2 id="more-title" className="h3">
          More from the journal
        </h2>
        <div className="posts posts-two">
          {more.map((a, i) => (
            <ArticleCard key={a.slug} article={a} delay={i * 110} />
          ))}
        </div>
      </section>
    </article>
  );
}
