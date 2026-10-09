"use client";
import { useId, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { site } from "@/site.config";
import { usePatch } from "./PatchProvider";
export function CommandMenu() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const uid = useId();
  const { close } = usePatch();
  const content = site.dialogs.command;
  const entries = [
    ...site.navigation,
    { label: "Questions", href: "#questions" },
    { label: "Back to the beginning", href: "#top" },
  ].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  function go(index: number) {
    const item = entries[index];
    if (!item) return;
    close();
    window.setTimeout(() => {
      const target = document.querySelector<HTMLElement>(item.href);
      target?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
      const focus = target?.querySelector<HTMLElement>(
        'button,a[href],input,[tabindex="0"]',
      );
      focus?.focus({ preventScroll: true });
    }, 30);
  }
  return (
    <div className="command-menu">
      <label className="command-search">
        <Search size={18} />
        <span className="sr-only">{content.title}</span>
        <input
          data-autofocus
          placeholder={content.placeholder}
          value={query}
          role="combobox"
          aria-expanded="true"
          aria-controls={`${uid}-results`}
          aria-activedescendant={
            entries[selected] ? `${uid}-${selected}` : undefined
          }
          onChange={(event) => {
            setQuery(event.target.value);
            setSelected(0);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              setSelected((value) =>
                entries.length
                  ? (value +
                      (event.key === "ArrowDown" ? 1 : -1) +
                      entries.length) %
                    entries.length
                  : 0,
              );
            } else if (event.key === "Enter") {
              event.preventDefault();
              go(selected);
            }
          }}
        />
      </label>
      <div
        className="command-results"
        id={`${uid}-results`}
        role="listbox"
        aria-label="Page sections"
      >
        {entries.map((item, index) => (
          <button
            role="option"
            tabIndex={-1}
            aria-selected={selected === index}
            id={`${uid}-${index}`}
            key={item.href}
            onClick={() => go(index)}
          >
            <span>{item.label}</span>
            <ArrowUpRight size={15} />
          </button>
        ))}
        {!entries.length && <p role="status">{content.empty}</p>}
      </div>
      <p className="command-hint">{content.note}</p>
    </div>
  );
}
