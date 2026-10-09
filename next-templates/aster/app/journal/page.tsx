import { ArrowUpRight } from "lucide-react";
import { SectionHead, Art } from "@/components/ui/Primitives";
import { articles } from "@/data/pages";
import { href } from "@/lib/urls";
export const metadata = { title: "Journal" };
export default function JournalPage() {
  return (
    <main id="main" className="container journal-page">
      <SectionHead
        label="Notes for a better support day"
        lines={["A little perspective.", "A useful next step."]}
        primary
      />
      <div className="journal-grid">
        {articles.map((article) => (
          <a
            key={article.slug}
            className="journal-card"
            href={href(`/${article.slug}`)}
          >
            <div className="journal-art">
              <Art name={article.art} />
            </div>
            <p className="eyebrow">{article.label}</p>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <span className="text-link">
              Read the note
              <ArrowUpRight size={15} />
            </span>
          </a>
        ))}
      </div>
    </main>
  );
}
