"use client"

import React, { useState } from "react"
import { ArrowUpRight, Flame, Check, ExternalLink } from "lucide-react"
import type { ProblemSummary } from "../lib/types"

export function ProblemCard({ problem, index }: { problem: ProblemSummary; index: number }) {
  const isFirst = index === 0
  const [supported, setSupported] = useState(false)
  const [supportCount, setSupportCount] = useState(problem.support_count)
  const [showAnswers, setShowAnswers] = useState(false)

  const handleSupport = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!supported) {
      setSupported(true)
      setSupportCount((c) => c + 1)
    } else {
      setSupported(false)
      setSupportCount((c) => c - 1)
    }
  }

  return (
    <article
      className={`group relative flex h-full min-h-[190px] flex-col overflow-hidden border border-[rgba(55,50,47,0.12)] p-5 sm:p-6 transition-all duration-200 ${
        isFirst
          ? "bg-[#fff6f2] hover:shadow-[0_4px_20px_rgba(233,79,61,0.08)]"
          : "bg-[#fafafa] hover:bg-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
      }`}
    >
      {/* Meta header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`font-mono text-[10px] font-bold tabular-nums px-2 py-0.5 rounded-md ${
              isFirst ? "bg-[#e94f3d] text-white" : "bg-stone-200/80 text-[#555]"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="truncate font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#e94f3d]">
            {problem.target_product_name || "General Software"}
          </span>
          <span className="text-[11px] text-[#999]">•</span>
          <span className="font-mono text-[10px] uppercase tracking-wide text-[#777]">
            {problem.category}
          </span>
        </div>

        {isFirst && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#e94f3d]/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#e94f3d]">
            <Flame className="size-3 fill-current" /> Hot
          </span>
        )}
      </div>

      {/* Complaint Statement */}
      <h3 className="font-serif text-[18px] sm:text-[20px] leading-[1.3] text-[#111] mb-2 font-medium">
        &ldquo;{problem.statement}&rdquo;
      </h3>

      {/* Switch condition */}
      {problem.switch_condition && (
        <p className="text-[12px] sm:text-[13px] text-[#666] leading-relaxed mb-4">
          <strong className="text-[#333] font-semibold">What would make them switch: </strong>
          {problem.switch_condition}
        </p>
      )}

      {/* Action footer */}
      <div className="mt-auto pt-4 border-t border-[rgba(55,50,47,0.08)] flex flex-wrap items-center justify-between gap-3">
        {/* Support ME TOO Button */}
        <button
          type="button"
          onClick={handleSupport}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
            supported
              ? "bg-[#e94f3d] text-white shadow-xs"
              : "border border-[rgba(55,50,47,0.2)] bg-white text-[#111] hover:border-[#e94f3d] hover:text-[#e94f3d]"
          }`}
        >
          {supported ? <Check className="size-3 stroke-[3]" /> : null}
          <span>ME TOO ({supportCount})</span>
        </button>

        {/* Answers pill */}
        {problem.answer_count > 0 ? (
          <button
            type="button"
            onClick={() => setShowAnswers(!showAnswers)}
            className="flex items-center gap-1 font-mono text-[11px] font-medium text-[#555] hover:text-[#111] transition-colors cursor-pointer"
          >
            <span className="text-[#e94f3d] font-bold">{problem.answer_count}</span>
            <span>{problem.answer_count === 1 ? "answer" : "answers"}</span>
            <ArrowUpRight className="size-3" />
          </button>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-wide text-[#999]">
            Awaiting answers
          </span>
        )}
      </div>

      {/* Expanded Answers Box */}
      {showAnswers && problem.answers.length > 0 && (
        <div className="mt-4 pt-3 border-t border-dashed border-stone-200 flex flex-col gap-2 animate-in fade-in duration-200">
          <p className="font-mono text-[9px] uppercase tracking-wider text-[#888]">
            Alternative solutions:
          </p>
          {problem.answers.map((ans) => (
            <div
              key={ans.offer_id}
              className="p-3 rounded-xl bg-white border border-stone-200 shadow-xs flex flex-col gap-1 text-left"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#111]">{ans.name}</span>
                <a
                  href={ans.destination_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#e94f3d] hover:underline flex items-center gap-0.5 font-mono"
                >
                  Visit <ExternalLink className="size-2.5" />
                </a>
              </div>
              <p className="text-xs text-[#555]">{ans.solves_text}</p>
              {ans.switch_incentive && (
                <div className="mt-1 inline-flex text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  🎁 {ans.switch_incentive}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </article>
  )
}
