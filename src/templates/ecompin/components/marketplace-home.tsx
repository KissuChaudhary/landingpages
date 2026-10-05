"use client"

import React, { useMemo, useState } from "react"
import { Search, X } from "lucide-react"
import { CategoryFilter } from "./category-filter"
import { ProblemCard } from "./problem-card"
import type { ProblemSection, ProblemSectionId, ProblemSummary } from "../lib/types"

const SECTION_TABS: { id: ProblemSectionId; mark: string; label: string }[] = [
  { id: "trending", mark: "01", label: "Trending" },
  { id: "answered", mark: "02", label: "Answered" },
  { id: "fresh", mark: "03", label: "New pains" },
  { id: "unanswered", mark: "04", label: "No answer yet" },
]

export function MarketplaceHome({
  problems,
  sections,
}: {
  problems: ProblemSummary[]
  sections: ProblemSection[]
}) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [activeTab, setActiveTab] = useState<ProblemSectionId>("trending")

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(problems.map((p) => p.category))).sort()],
    [problems]
  )

  const query = search.trim().toLowerCase()
  const filtering = Boolean(query) || category !== "All"

  const filteredProblems = useMemo(() => {
    if (!filtering) {
      const sec = sections.find((s) => s.id === activeTab)
      return sec ? sec.problems : problems
    }
    return problems.filter((p) => {
      const matchCat = category === "All" || p.category === category
      const matchSearch =
        !query ||
        `${p.statement} ${p.target_product_name || ""} ${p.category}`.toLowerCase().includes(query)
      return matchCat && matchSearch
    })
  }, [activeTab, category, filtering, problems, query, sections])

  return (
    <div id="problems" className="w-full">
      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-4 border-b border-[rgba(55,50,47,0.12)] p-4 sm:p-6 bg-[#fafafa]">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#888]" />
            <input
              type="text"
              placeholder="Search software (e.g. Jira, Salesforce)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-[rgba(55,50,47,0.16)] bg-white py-2 pl-10 pr-9 text-xs sm:text-sm text-[#111] placeholder:text-[#888] outline-none focus:border-[#e94f3d] focus:ring-1 focus:ring-[#e94f3d] shadow-2xs"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#111]"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Section Tabs */}
          {!filtering && (
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {SECTION_TABS.map((tab) => {
                const active = tab.id === activeTab
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      active
                        ? "bg-[#111] text-white shadow-xs"
                        : "text-[#666] hover:bg-stone-200/60 hover:text-[#111]"
                    }`}
                  >
                    <span className="text-[#e94f3d]">{tab.mark}</span>
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Category Pills */}
        <CategoryFilter
          categories={categories}
          selected={category}
          onSelect={setCategory}
        />
      </div>

      {/* Grid of Problem Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(55,50,47,0.12)]">
        {filteredProblems.map((problem, idx) => (
          <ProblemCard key={problem.id} problem={problem} index={idx} />
        ))}
      </div>

      {filteredProblems.length === 0 && (
        <div className="p-12 text-center bg-white">
          <p className="font-serif text-xl text-[#111]">No complaints match this search.</p>
          <p className="mt-1 text-xs text-[#777]">Try clearing filters or search another tool.</p>
        </div>
      )}
    </div>
  )
}
