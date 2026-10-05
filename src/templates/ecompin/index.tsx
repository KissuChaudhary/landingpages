"use client"

import React, { useState } from "react"
import { MarketplaceFrame, FramedSection } from "./components/frame"
import { Header } from "./components/header"
import { Hero } from "./components/hero"
import { MarketplaceHome } from "./components/marketplace-home"
import { HowItWorks } from "./components/how-it-works"
import { Footer } from "./components/footer"
import { MOCK_PROBLEMS, MOCK_TRAFFIC } from "./lib/mock-problems"
import { buildProblemSections } from "./lib/sections"
import type { ProblemSummary } from "./lib/types"

export default function EcompinTemplate() {
  const [problems, setProblems] = useState<ProblemSummary[]>(MOCK_PROBLEMS)
  const sections = buildProblemSections(problems)

  const handleAddProblem = ({
    product,
    statement,
    category,
  }: {
    product: string
    statement: string
    category: string
  }) => {
    const newEntry: ProblemSummary = {
      id: `p-${Date.now()}`,
      slug: statement.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40),
      statement,
      target_product_name: product,
      switch_condition: "Zero downtime migration, modern interface, and honest flat pricing.",
      category,
      origin: "user",
      support_count: 1,
      answer_count: 0,
      supports_24h: 1,
      trending_score: 99,
      answers: [],
      created_at: new Date().toISOString(),
    }
    setProblems((prev) => [newEntry, ...prev])
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#fafafa] font-sans text-[#111] antialiased">
      <div className="flex min-h-screen flex-col items-center">
        <MarketplaceFrame>
          <Header />
          <main className="relative z-10 mt-24 sm:mt-28 flex w-full flex-col items-center">
            <Hero traffic={MOCK_TRAFFIC} onProblemAdded={handleAddProblem} />

            <FramedSection contentClassName="pt-10">
              <MarketplaceHome problems={problems} sections={sections} />
            </FramedSection>

            <FramedSection contentClassName="pb-16">
              <HowItWorks />
            </FramedSection>

            <FramedSection>
              <Footer />
            </FramedSection>
          </main>
        </MarketplaceFrame>
      </div>
    </div>
  )
}
