import { BookOpen, ArrowUpRight } from "lucide-react";
import { articles } from "@/data/articles";
import { route } from "@/lib/urls";
import { Section, SectionHead, Button } from "../ui/Primitives";
import { ArticleArt } from "../product/ArticleArt";
import { Portrait } from "../ui/Portrait";
export function Journal({ full = false }: { full?: boolean }) {
  return (
    <Section id="journal">
      <SectionHead
        label="The journal"
        icon={BookOpen}
        title="Notes from month end."
        description="Practical guides for a faster, calmer and better-documented close."
      />
      <div className="three-grid journal-grid">
        {articles.map((article) => (
          <a
            href={route(`/blog/${article.slug}`)}
            key={article.slug}
            className="surface journal-card reveal"
          >
            <div className="journal-art">
              <ArticleArt kind={article.art} />
              <span className="journal-hover">
                Read the story <ArrowUpRight size={16} />
              </span>
            </div>
            <span className="article-category">{article.category}</span>
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
            <div className="article-meta">
              <span>
                <Portrait person={article.person} />
                {article.author}
              </span>
              <span>{article.read}</span>
            </div>
          </a>
        ))}
      </div>
      {!full && (
        <div className="section-action">
          <Button secondary href={route("/blog")}>
            Visit the journal
          </Button>
        </div>
      )}
    </Section>
  );
}
