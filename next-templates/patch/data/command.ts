import type { Example } from "./types";
export const command: Example = {
  id: "command",
  label: "Quick navigation",
  file: "QuickNav.tsx",
  request: "Add a search field so these pages are easy to find.",
  summary: "Less searching around. One input, a few useful destinations.",
  removed: ["{pages.map((page) => <p key={page}>{page}</p>)}"],
  added: [
    'const [query, setQuery] = useState("");',
    "const results = pages.filter((page) =>",
    "page.toLowerCase().includes(query.toLowerCase()));",
    '<input aria-label="Find a page" value={query}',
  ],
  output: {
    title: "Find your next step.",
    description: "A few places worth going.",
    action: "Open page",
  },
  before: `const pages = ["Overview", "Components", "Changelog"];
export default function QuickNav() {
  return (
    <div style={{ padding: 32, background: "#f5f5ee" }}>
      <h2>Your pages</h2>
      {pages.map((page) => <p key={page}>{page}</p>)}
    </div>
  );
}`,
  after: `"use client";
import { useState } from "react";
const pages = ["Overview", "Components", "Changelog"];

export default function QuickNav() {
  const [query, setQuery] = useState("");
  const results = pages.filter((page) =>
    page.toLowerCase().includes(query.toLowerCase()));
  return (
    <div style={{ padding: 32, background: "#f5f5ee", color: "#202520" }}>
      <h2>Find your next step.</h2>
      <input aria-label="Find a page" value={query}
        onChange={(event) => setQuery(event.target.value)} />
      {results.map((page) => <p key={page}>{page}</p>)}
      {!results.length && <p role="status">No matching pages.</p>}
    </div>
  );
}`,
};
