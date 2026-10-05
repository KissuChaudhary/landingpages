"use client"

import React, { useState } from "react"
import { Sparkles, Layers, Image as ImageIcon } from "lucide-react"

const CATEGORIES = [
  { id: "all", label: "All Pages" },
  { id: "mandala", label: "Zen Mandalas" },
  { id: "wildlife", label: "Wildlife & Pets" },
  { id: "floral", label: "Botanical Florals" },
  { id: "fantasy", label: "Fantasy & Whimsical" },
]

const ARTWORKS = [
  { title: "Sacred Lotus Mandala", category: "mandala", count: "84 pieces", color: "from-rose-400 to-pink-500", complexity: "Intermediate" },
  { title: "Majestic Forest Stag", category: "wildlife", count: "62 pieces", color: "from-amber-400 to-orange-500", complexity: "Advanced" },
  { title: "Midnight Peony Bloom", category: "floral", count: "95 pieces", color: "from-violet-400 to-purple-600", complexity: "Easy" },
  { title: "Celestial Moon Dragon", category: "fantasy", count: "110 pieces", color: "from-cyan-400 to-blue-500", complexity: "Advanced" },
  { title: "Sunburst Symmetry", category: "mandala", count: "73 pieces", color: "from-emerald-400 to-teal-600", complexity: "Intermediate" },
  { title: "Tropical Hummingbird", category: "wildlife", count: "58 pieces", color: "from-rose-500 to-amber-500", complexity: "Easy" },
]

export function ArtworkShowcase() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filtered = activeCategory === "all" ? ARTWORKS : ARTWORKS.filter((a) => a.category === activeCategory)

  return (
    <section id="gallery" className="py-24 bg-stone-50 border-t border-stone-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-rose-500 font-bold">
              Over 1,000+ Templates
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Explore Our Curated Art Collections
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base">
              New hand-illustrated line drawings added every week by professional artists.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategory(c.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  c.id === activeCategory
                    ? "bg-stone-900 text-white shadow-md"
                    : "bg-white text-stone-600 border border-stone-200 hover:border-stone-400"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-3xl bg-white border border-stone-200 shadow-sm transition-all hover:shadow-xl hover:border-rose-300"
            >
              {/* Simulated Artwork Canvas Header */}
              <div className={`h-48 bg-gradient-to-br ${item.color} p-6 flex flex-col justify-between text-white relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 backdrop-blur-3xs" />
                <div className="relative z-10 flex justify-between items-center">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase backdrop-blur-md">
                    {item.complexity}
                  </span>
                  <Sparkles className="size-4 text-white/80" />
                </div>
                <div className="relative z-10 flex items-center justify-center py-4">
                  <div className="size-20 rounded-full border-2 border-white/40 flex items-center justify-center bg-white/10 group-hover:scale-110 transition-transform">
                    <ImageIcon className="size-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-1">
                  <span>{item.count}</span>
                  <span className="capitalize">{item.category}</span>
                </div>
                <h3 className="text-base font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
