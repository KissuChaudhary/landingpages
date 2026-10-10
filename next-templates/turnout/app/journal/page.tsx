import type { Metadata } from "next";
import { site } from "@/site.config";
import { articles } from "@/data/articles";
import { ArticleCard } from "@/components/sections/Journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from the floor: guest lists, the 48-hour edit, community programs and what fills a room.",
};

export default function JournalPage() {
  return (
    <>
      <section className="container page-head">
        <span className="tag" data-reveal>
          {site.journal.label}
        </span>
        <h1 className="h1" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          {site.journal.title}
        </h1>
        <p className="lead" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
          What we have learned from running more than 300 events, written by the people who ran them.
        </p>
      </section>
      <section className="container page-body">
        <div className="posts">
          {articles.map((article, i) => (
            <ArticleCard key={article.slug} article={article} delay={(i % 3) * 110} />
          ))}
        </div>
      </section>
    </>
  );
}
