"use client";
import { useState } from "react";
import { Search, BookOpen, ArrowUpRight } from "lucide-react";
import { briefs, searchBriefs } from "@/data/briefs";
export function BriefLibrary() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(briefs[0].id);
  const results = searchBriefs(query);
  const article = results.find((a) => a.id === selected) || results[0];
  return (
    <div className="briefs-workspace">
      <label className="search-field">
        <Search size={17} />
        <input
          aria-label="Search briefs"
          placeholder="Search projects, direction or deliverables"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div className="briefs-columns">
        <nav aria-label="Project briefs">
          {results.map((a) => (
            <button
              key={a.id}
              className={article?.id === a.id ? "selected" : ""}
              onClick={() => setSelected(a.id)}
            >
              <BookOpen size={18} />
              <span>
                <strong>{a.title}</strong>
                <small>{a.category}</small>
              </span>
              <ArrowUpRight size={15} />
            </button>
          ))}
          {!results.length && (
            <p className="small-note">
              No briefs match “{query}”. Try a shorter search.
            </p>
          )}
        </nav>
        {article && (
          <article className="briefs-article">
            <p className="eyebrow">
              {article.category} · Reviewed {article.updated}
            </p>
            <h2>{article.title}</h2>
            <p className="article-summary">{article.summary}</p>
            <p>{article.body}</p>
            <div className="article-tags">
              {article.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
