"use client"

import React from "react"
import { Star, CheckCircle, Heart } from "lucide-react"

const REVIEWS = [
  {
    name: "Elena Rostova",
    role: "Art Therapist",
    stars: 5,
    text: "I recommend this app to patients dealing with daily work stress. The tactile sound effects and zero ads create a truly mindful digital sanctuary.",
  },
  {
    name: "Marcus Chen",
    role: "Father of two",
    stars: 5,
    text: "Finally an Android coloring app that doesn't bombard my kids with accidental subscription popups. Beautiful illustrations and very responsive smart fill.",
  },
  {
    name: "Aria Lindqvist",
    role: "Hobby Illustrator",
    stars: 5,
    text: "The brush textures are surprisingly authentic. The watercolor blend feels alive on my Galaxy Tab S9 with S-Pen support.",
  },
]

export function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-white border-t border-stone-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="size-5 fill-current" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Loved by 50,000+ Colorists
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Read what therapists, parents, and artists say about their daily coloring routine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="rounded-3xl border border-stone-200 bg-stone-50/60 p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex text-amber-400 gap-1 mb-4">
                  {[...Array(r.stars)].map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed italic mb-6">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-stone-200">
                <div className="size-10 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{r.name}</h4>
                  <span className="text-xs text-stone-500">{r.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
