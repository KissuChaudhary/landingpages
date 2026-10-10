import { site } from "@/site.config";
import { articles, formatDate, type Article } from "@/data/articles";
import { asset } from "@/lib/urls";
import { Action, SmartLink } from "@/components/ui/Action";

export function ArticleCard({ article, delay = 0 }: { article: Article; delay?: number }) {
  return (
    <SmartLink to={`/journal/${article.slug}`} className="post" data-reveal style={{ "--d": `${delay}ms` } as React.CSSProperties}>
      <span className="post-media">
        <img src={asset(article.image)} alt={article.alt} width={944} height={704} loading="lazy" />
      </span>
      <time className="post-date label" dateTime={article.date}>
        {formatDate(article.date)}
      </time>
      <span className="post-title">{article.title}</span>
      <span className="post-author">
        <img src={asset(article.author.image)} alt="" width={64} height={64} loading="lazy" />
        By {article.author.name}
      </span>
    </SmartLink>
  );
}

export function Journal() {
  return (
    <section className="section journal" aria-labelledby="journal-title">
      <div className="container">
        <div className="section-head split">
          <div className="journal-titles">
            <span className="tag" data-reveal>
              {site.journal.label}
            </span>
            <h2 id="journal-title" className="h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
              {site.journal.title}
            </h2>
          </div>
          <div data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
            <Action to="/journal" label={site.journal.all} />
          </div>
        </div>
        <div className="posts">
          {articles.slice(0, 3).map((article, i) => (
            <ArticleCard key={article.slug} article={article} delay={i * 110} />
          ))}
        </div>
      </div>
    </section>
  );
}
