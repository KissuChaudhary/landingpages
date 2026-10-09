"use client";
import { useState } from "react";
import {
  Search,
  Mail,
  MessageCircle,
  BookOpen,
  ShoppingBag,
  Users,
  Workflow,
} from "lucide-react";
import { integrations } from "@/data/integrations";
const icons = {
  mail: Mail,
  chat: MessageCircle,
  book: BookOpen,
  bag: ShoppingBag,
  people: Users,
  workflow: Workflow,
};
export function IntegrationDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const visible = integrations.filter(
    (i) =>
      (category === "All" || i.category === category) &&
      `${i.name} ${i.text}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <section className="directory">
      <div className="directory-controls">
        <label className="search-field">
          <Search size={17} />
          <input
            aria-label="Search connections"
            placeholder="Find a connection"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="directory-category">
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {["All", ...new Set(integrations.map((i) => i.category))].map(
              (c) => (
                <option key={c}>{c}</option>
              ),
            )}
          </select>
        </label>
      </div>
      <p className="directory-count" aria-live="polite">
        {visible.length} connection guides
      </p>
      <div className="directory-grid">
        {visible.map((i) => {
          const Icon = icons[i.icon as keyof typeof icons];
          return (
            <article key={i.id} id={i.id} className="connection-card">
              <Icon size={26} />
              <span className="connection-category">{i.category}</span>
              <h2>{i.name}</h2>
              <p>{i.text}</p>
              <ul className="connection-scope" aria-label={`${i.name} data`}>
                {i.fields.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <p className="connection-note">{i.scope}</p>
            </article>
          );
        })}
      </div>
      {!visible.length && (
        <div className="empty-state">
          <h3>No connections match this search.</h3>
          <button
            className="button button-light"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
