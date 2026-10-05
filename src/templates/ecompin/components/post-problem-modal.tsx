"use client"

import React, { useState } from "react"
import { X, ArrowRight, CheckCircle2 } from "lucide-react"

export function PostProblemModal({
  compact = false,
  trigger = "POST A PROBLEM",
  inverted = false,
  onProblemAdded,
}: {
  compact?: boolean
  trigger?: string
  inverted?: boolean
  onProblemAdded?: (problem: { product: string; statement: string; category: string }) => void
}) {
  const [open, setOpen] = useState(false)
  const [product, setProduct] = useState("")
  const [statement, setStatement] = useState("")
  const [category, setCategory] = useState("SaaS & Cloud")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!statement.trim()) return
    setSubmitted(true)
    if (onProblemAdded) {
      onProblemAdded({ product: product.trim() || "Software", statement: statement.trim(), category })
    }
    setTimeout(() => {
      setSubmitted(false)
      setOpen(false)
      setProduct("")
      setStatement("")
    }, 1800)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          compact
            ? "flex h-8 items-center rounded-full bg-[#e94f3d] px-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-all hover:bg-[#d43e2d] hover:shadow-md cursor-pointer"
            : inverted
            ? "group flex h-11 items-center gap-2 rounded-full bg-white px-6 font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-[#111] transition-all hover:bg-[#fafafa] hover:scale-105 shadow-md cursor-pointer"
            : "group flex h-11 items-center gap-2 rounded-full bg-[#e94f3d] px-6 font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-all hover:bg-[#d43e2d] hover:scale-105 shadow-lg shadow-[#e94f3d]/25 cursor-pointer"
        }
      >
        <span>{trigger}</span>
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-[rgba(55,50,47,0.12)]">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="size-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center flex flex-col items-center">
                <CheckCircle2 className="size-12 text-[#e94f3d] mb-4 animate-bounce" />
                <h3 className="font-serif text-2xl text-[#111] font-bold">Complaint Logged!</h3>
                <p className="mt-2 text-sm text-[#666] max-w-xs">
                  Your complaint has been posted to the board. Alternatives can now review and answer.
                </p>
              </div>
            ) : (
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#e94f3d] font-bold">
                  Public Board Submission
                </span>
                <h2 className="mt-1 font-serif text-2xl sm:text-3xl text-[#111]">
                  What software is failing you?
                </h2>
                <p className="mt-1 text-xs text-[#666]">
                  State the tool, what sucks about it, and what would make you leave it.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4 text-left">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wide text-[#777] mb-1">
                      Software Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Salesforce, Jira, HubSpot"
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                      className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#e94f3d] focus:ring-1 focus:ring-[#e94f3d]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wide text-[#777] mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#e94f3d] bg-white text-stone-800"
                    >
                      <option>CRM & Sales</option>
                      <option>Project Management</option>
                      <option>Marketing Automation</option>
                      <option>Cloud Infrastructure</option>
                      <option>Customer Support</option>
                      <option>Accounting & Finance</option>
                      <option>Developer Tools</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wide text-[#777] mb-1">
                      The Exact Problem / Frustration *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g. 20% surprise fee increases, 4-second load times, locking exports..."
                      value={statement}
                      onChange={(e) => setStatement(e.target.value)}
                      className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-sm outline-none focus:border-[#e94f3d] focus:ring-1 focus:ring-[#e94f3d]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full rounded-full bg-[#e94f3d] py-3 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-[#d43e2d] transition-all shadow-md cursor-pointer"
                  >
                    Post to Public Board
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
