import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { site } from "@/site.config";
import { articles, formatDate, type Article } from "@/data/articles";
import { asset, href } from "@/lib/urls";
import { SectionTitle } from "../ui/Primitives";

export function ArticleCard({ article, index, wide }: { article: Article; index: number; wide?: boolean }) {
  return (
    <article className={`post${wide ? " is-wide" : ""}`} data-reveal="" style={{ "--ry": "40px", "--rd": `${index * 100}ms` } as CSSProperties}>
      <a href={href(`/journal/${article.slug}`)} className="post-link">
        <span className="post-media">
          <img src={asset(article.cover)} width={1024} height={768} alt={article.coverAlt} loading="lazy" decoding="async" />
        </span>
        <span className="post-tags">
          {article.tags.map((t, i) => (
            <span key={t} className={i === 0 ? "tag is-primary" : "tag"}>
              {t}
            </span>
          ))}
        </span>
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <span className="post-meta">
          {formatDate(article.date)} · {article.readTime}
        </span>
      </a>
    </article>
  );
}

export function Journal() {
  return (
    <section className="section journal-section" id="journal">
      <div className="container">
        <SectionTitle lines={site.journal.heading} />
        <div className="posts">
          {articles.slice(0, 2).map((a, i) => (
            <ArticleCard article={a} index={i} wide={i === 0} key={a.slug} />
          ))}
        </div>
        <a className="text-link" href={href("/journal")} data-reveal="">
          {site.journal.more}
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
