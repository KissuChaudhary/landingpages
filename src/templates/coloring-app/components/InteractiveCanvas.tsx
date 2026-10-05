"use client"

import React, { useState } from "react"
import { Paintbrush, RotateCcw, Sparkles, Check } from "lucide-react"

const PALETTE = [
  { name: "Coral Rose", hex: "#f43f5e" },
  { name: "Sunset Orange", hex: "#fb923c" },
  { name: "Golden Sun", hex: "#facc15" },
  { name: "Emerald Mint", hex: "#34d399" },
  { name: "Sky Aqua", hex: "#38bdf8" },
  { name: "Lavender", hex: "#a78bfa" },
  { name: "Berry Pink", hex: "#f472b6" },
  { name: "Midnight", hex: "#1e293b" },
]

export function InteractiveCanvas() {
  const [selectedColor, setSelectedColor] = useState(PALETTE[0].hex)
  const [rings, setRings] = useState<Record<string, string>>({
    ringOuter: "#fee2e2",
    ringMid: "#fef3c7",
    ringInner: "#dcfce7",
    core: "#f43f5e",
    petalTop: "#fed7aa",
    petalBottom: "#fed7aa",
    petalLeft: "#e0e7ff",
    petalRight: "#e0e7ff",
  })

  const handleFill = (key: string) => {
    setRings((prev) => ({ ...prev, [key]: selectedColor }))
  }

  const handleReset = () => {
    setRings({
      ringOuter: "#ffffff",
      ringMid: "#ffffff",
      ringInner: "#ffffff",
      core: "#ffffff",
      petalTop: "#ffffff",
      petalBottom: "#ffffff",
      petalLeft: "#ffffff",
      petalRight: "#ffffff",
    })
  }

  return (
    <section id="canvas" className="py-20 bg-stone-50 border-y border-stone-200">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-rose-700 mb-3">
          <Sparkles className="size-3.5" /> Interactive Color Studio
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
          Try the Smart Fill Right in Your Browser
        </h2>
        <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto mb-10">
          Pick a color from your artist palette and click any part of the mandala below. Experience the smooth vector fill engine designed for Android.
        </p>

        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-stone-200">
          {/* Palette Selector Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pb-6 border-b border-stone-100">
            {PALETTE.map((p) => {
              const active = p.hex === selectedColor
              return (
                <button
                  key={p.hex}
                  type="button"
                  onClick={() => setSelectedColor(p.hex)}
                  title={p.name}
                  className={`group relative size-10 rounded-full transition-transform cursor-pointer shadow-sm ${
                    active ? "scale-115 ring-4 ring-rose-500/30" : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: p.hex }}
                >
                  {active && <Check className="absolute inset-0 m-auto size-4 text-white stroke-[3]" />}
                </button>
              )
            })}
          </div>

          {/* Interactive SVG Canvas */}
          <div className="py-8 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="size-64 sm:size-72 select-none cursor-pointer filter drop-shadow-sm">
              {/* Outer Ring */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill={rings.ringOuter}
                stroke="#1e293b"
                strokeWidth="3"
                onClick={() => handleFill("ringOuter")}
                className="transition-colors duration-200 hover:opacity-85"
              />

              {/* Petal Quadrants */}
              <path
                d="M100 10 Q145 55 100 100 Q55 55 100 10 Z"
                fill={rings.petalTop}
                stroke="#1e293b"
                strokeWidth="2.5"
                onClick={() => handleFill("petalTop")}
                className="transition-colors duration-200 hover:opacity-85"
              />
              <path
                d="M100 100 Q145 145 100 190 Q55 145 100 100 Z"
                fill={rings.petalBottom}
                stroke="#1e293b"
                strokeWidth="2.5"
                onClick={() => handleFill("petalBottom")}
                className="transition-colors duration-200 hover:opacity-85"
              />
              <path
                d="M10 100 Q55 55 100 100 Q55 145 10 100 Z"
                fill={rings.petalLeft}
                stroke="#1e293b"
                strokeWidth="2.5"
                onClick={() => handleFill("petalLeft")}
                className="transition-colors duration-200 hover:opacity-85"
              />
              <path
                d="M100 100 Q145 55 190 100 Q145 145 100 100 Z"
                fill={rings.petalRight}
                stroke="#1e293b"
                strokeWidth="2.5"
                onClick={() => handleFill("petalRight")}
                className="transition-colors duration-200 hover:opacity-85"
              />

              {/* Middle Ring */}
              <circle
                cx="100"
                cy="100"
                r="50"
                fill={rings.ringMid}
                stroke="#1e293b"
                strokeWidth="2.5"
                onClick={() => handleFill("ringMid")}
                className="transition-colors duration-200 hover:opacity-85"
              />

              {/* Inner Ring */}
              <circle
                cx="100"
                cy="100"
                r="30"
                fill={rings.ringInner}
                stroke="#1e293b"
                strokeWidth="2"
                onClick={() => handleFill("ringInner")}
                className="transition-colors duration-200 hover:opacity-85"
              />

              {/* Core Star */}
              <circle
                cx="100"
                cy="100"
                r="14"
                fill={rings.core}
                stroke="#1e293b"
                strokeWidth="2"
                onClick={() => handleFill("core")}
                className="transition-colors duration-200 hover:opacity-85"
              />
            </svg>
          </div>

          {/* Reset & Status bar */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs text-stone-500 font-mono">
            <span className="flex items-center gap-1.5">
              <Paintbrush className="size-3.5 text-rose-500" />
              <span>Click any area to apply color</span>
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 text-stone-600 hover:text-stone-900 underline cursor-pointer"
            >
              <RotateCcw className="size-3" /> Reset Canvas
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
