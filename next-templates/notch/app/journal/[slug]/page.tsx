import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { articles, findArticle, formatDate } from "@/data/articles";
import { asset, href } from "@/lib/urls";
import { ArticleCard } from "@/components/sections/Journal";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = findArticle((await params).slug);
  return article ? { title: article.title, description: article.excerpt } : {};
}

export default async function ArticlePage({ params }: Props) {
  const article = findArticle((await params).slug);
  if (!article) notFound();
  const next = articles.filter((a) => a.slug !== article.slug).slice(0, 2);
  return (
    <article className="page page-article">
      <div className="container article-head">
        <a className="back-link" href={href("/journal")}>
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
          Journal
        </a>
        <div className="post-tags">
          {article.tags.map((t, i) => (
            <span key={t} className={i === 0 ? "tag is-primary" : "tag"}>
              {t}
            </span>
          ))}
        </div>
        <h1>{article.title}</h1>
        <p className="article-dek">{article.excerpt}</p>
        <p className="article-meta">
          <strong>{article.author.name}</strong>, {article.author.role} · {formatDate(article.date)} · {article.readTime}
        </p>
      </div>
      <div className="container">
        <img className="article-cover" src={asset(article.cover)} width={1024} height={768} alt={article.coverAlt} />
      </div>
      <div className="container article-body">
        {article.body.map((block, i) => {
          if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
          if (block.type === "quote")
            return (
              <blockquote key={i}>
                <p>{block.text}</p>
              </blockquote>
            );
          if (block.type === "list")
            return (
              <ul key={i}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          return <p key={i}>{block.text}</p>;
        })}
      </div>
      <div className="container article-more">
        <p className="article-more-title">Keep reading</p>
        <div className="posts">
          {next.map((a, i) => (
            <ArticleCard article={a} index={i} key={a.slug} />
          ))}
        </div>
      </div>
    </article>
  );
}
