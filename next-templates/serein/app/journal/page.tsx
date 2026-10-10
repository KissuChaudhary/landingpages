import type { Metadata } from "next";
import { articles } from "@/data/journal";
import { asset, href } from "@/lib/urls";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Arrow } from "@/components/ui/Arrow";
export const metadata: Metadata = {
  title: "Studio journal",
  description:
    "Notes on identity, digital craft and the ideas behind the work.",
};
export default function JournalPage() {
  return (
    <main id="main" className="container journal-page">
      <div className="page-intro">
        <SectionHeading
          as="h1"
          label="The journal"
          title={"A few things\nwe're thinking about."}
        />
      </div>
      <div className="journal-grid">
        {articles.map((article) => (
          <a
            className="journal-card"
            href={href(`/journal/${article.slug}`)}
            key={article.slug}
          >
            <figure>
              <img
                src={asset(article.image)}
                alt=""
                width="600"
                height="400"
                loading="lazy"
              />
            </figure>
            <div className="journal-meta">
              <span>{article.category}</span>
              <span>{article.date}</span>
            </div>
            <h2>{article.title}</h2>
            <p>{article.excerpt}</p>
            <span className="text-link">
              Read the story
              <Arrow />
            </span>
          </a>
        ))}
      </div>
    </main>
  );
}
