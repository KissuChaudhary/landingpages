import { ArrowLeft, ArrowRight } from "lucide-react";
import { articles } from "@/data/articles";
import { route } from "@/lib/urls";
import { ArticleArt } from "./product/ArticleArt";
import { Portrait } from "./ui/Portrait";
export function ArticlePage({
  article,
}: {
  article: (typeof articles)[number];
}) {
  const next = articles[(articles.indexOf(article) + 1) % articles.length];
  return (
    <main id="main" className="frame article-page">
      <div className="article-header">
        <a className="text-link" href={route("/blog")}>
          <ArrowLeft size={15} /> Back to the journal
        </a>
        <span className="eyebrow">{article.category}</span>
        <h1>{article.title}</h1>
        <p>{article.excerpt}</p>
        <div className="article-byline">
          <Portrait person={article.person} />
          <span>
            {article.author}
            <small>{article.read} · Arclo journal</small>
          </span>
        </div>
      </div>
      <div className="article-cover">
        <ArticleArt kind={article.art} />
      </div>
      <div className="article-body">
        <aside>
          <span>In this story</span>
          {article.sections.map((section, i) => (
            <a key={section.heading} href={`#chapter-${i}`}>
              {section.heading}
            </a>
          ))}
        </aside>
        <div>
          {article.sections.map((section, i) => (
            <section key={section.heading} id={`chapter-${i}`}>
              <h2>{section.heading}</h2>
              <p>{section.text}</p>
            </section>
          ))}
          <a className="next-article" href={route(`/blog/${next.slug}`)}>
            <span>
              Keep exploring<strong>{next.title}</strong>
            </span>
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </main>
  );
}
