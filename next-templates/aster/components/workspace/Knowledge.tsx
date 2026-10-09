"use client";
import { useState } from "react";
import { Search, BookOpen, ArrowUpRight } from "lucide-react";
import { knowledge, searchKnowledge } from "@/data/knowledge";
export function Knowledge() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(knowledge[0].id);
  const results = searchKnowledge(query);
  const article = results.find((a) => a.id === selected) || results[0];
  return (
    <div className="knowledge-workspace">
      <label className="search-field">
        <Search size={17} />
        <input
          aria-label="Search knowledge"
          placeholder="Search your approved knowledge"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div className="knowledge-columns">
        <nav aria-label="Knowledge articles">
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
              No articles match “{query}”. Try a shorter search.
            </p>
          )}
        </nav>
        {article && (
          <article className="knowledge-article">
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
