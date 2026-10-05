"use client"

import React from "react"

export function CategoryFilter({
  categories,
  selected,
  onSelect,
}: {
  categories: string[]
  selected: string
  onSelect: (cat: string) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 py-1">
      {categories.map((cat) => {
        const active = cat === selected
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelect(cat)}
            className={`rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.06em] transition-all cursor-pointer ${
              active
                ? "bg-[#111] text-white shadow-xs"
                : "border border-[rgba(55,50,47,0.12)] bg-white text-[#666] hover:border-[#111] hover:text-[#111]"
            }`}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
