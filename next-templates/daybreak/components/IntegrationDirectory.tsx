"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { integrations } from "@/data/integrations";
import { IntegrationMark } from "./product/IntegrationMark";
import { Frame, SectionHead } from "./ui/Primitives";
export function IntegrationDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(integrations.map((i) => i.category))];
  const results = integrations.filter(
    (i) =>
      (category === "All" || i.category === category) &&
      `${i.name} ${i.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <Frame className="directory-section">
      <div className="section-inner">
        <SectionHead
          level={1}
          label="Keep the tools you love"
          title="A little more connected."
          text="Your sources, side by side, with the data each example connection would bring in."
        />
        <div className="directory-toolbar">
          <div className="directory-search">
            <Search size={18} />
            <label className="sr-only" htmlFor="integration-search">
              Search integrations
            </label>
            <input
              id="integration-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a connection"
            />
            {query && (
              <button
                className="icon-button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
              >
                <X size={16} />
              </button>
            )}
          </div>
          <label className="sr-only" htmlFor="integration-category">
            Integration category
          </label>
          <select
            id="integration-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <p className="directory-count" role="status">
          {results.length} example{" "}
          {results.length === 1 ? "connection" : "connections"}
        </p>
        <div className="directory-grid">
          {results.map((i) => (
            <article className="directory-card" key={i.id} id={i.id}>
              <IntegrationMark mark={i.mark} color={i.color} />
              <span className="directory-category">{i.category}</span>
              <h2>{i.name}</h2>
              <p>{i.description}</p>
              <ul className="directory-scope" aria-label={`${i.name} data`}>
                {i.fields.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        {!results.length && (
          <div className="empty-results">
            <h2>No connection found.</h2>
            <p>Try another name or reset the category.</p>
            <button
              className="button button-dark"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Show all connections
            </button>
          </div>
        )}
      </div>
    </Frame>
  );
}
