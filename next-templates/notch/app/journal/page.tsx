import type { Metadata } from "next";
import { articles } from "@/data/articles";
import { ArticleCard } from "@/components/sections/Journal";
import { SectionTitle } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on time, budgets, pricing and running a studio.",
};

export default function JournalPage() {
  return (
    <section className="page page-journal">
      <div className="container">
        <SectionTitle as="h1" lines={["The journal", "Notes for people who run studios."]} className="page-title" />
        <div className="posts posts-index">
          {articles.map((a, i) => (
            <ArticleCard article={a} index={i} key={a.slug} wide={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
