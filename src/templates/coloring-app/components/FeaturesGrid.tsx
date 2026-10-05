"use client"

import React from "react"
import { PaintBucket, Brush, Eraser, Music, WifiOff, Printer } from "lucide-react"

const FEATURES = [
  {
    icon: PaintBucket,
    title: "Zero-Bleed Smart Fill",
    desc: "Tap once to fill complex geometry without color spilling outside contour lines. Powered by our sub-pixel edge detector.",
    badge: "Vector Engine",
  },
  {
    icon: Brush,
    title: "12 Realistic Art Brushes",
    desc: "Switch between watercolor glaze, soft pastel, airbrush glow, textured crayon, and sharp fine-line calligraphy pens.",
    badge: "Stylus & Touch",
  },
  {
    icon: Eraser,
    title: "Layered Precision Eraser",
    desc: "Undo any stroke with unlimited history or selectively erase highlights to create organic depth and highlights.",
    badge: "Non-Destructive",
  },
  {
    icon: Music,
    title: "Calming Ambient Audio",
    desc: "Immerse yourself in gentle rainfall, crackling hearth fire, and ambient lo-fi soundscapes designed for focus and sleep.",
    badge: "Relaxation",
  },
  {
    icon: WifiOff,
    title: "100% Offline Capability",
    desc: "Color on road trips, airplane flights, or off-grid retreats without needing cellular data or a WiFi connection.",
    badge: "No WiFi Needed",
  },
  {
    icon: Printer,
    title: "4K Print & PDF Export",
    desc: "Export completed artwork as high-resolution printable cards, framing posters, or share directly to social feeds.",
    badge: "Ultra HD",
  },
]

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-rose-500 font-bold">
            Built for Android Phones & Tablets
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Everything you need for an immersive coloring session
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Carefully crafted touch controls and responsive vector rendering so you never feel restricted by tiny phone screens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="group relative rounded-3xl border border-stone-200/80 bg-stone-50/50 p-8 transition-all hover:bg-white hover:border-rose-300 hover:shadow-xl hover:shadow-rose-500/5 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-white border border-stone-200 text-rose-500 shadow-xs group-hover:bg-rose-500 group-hover:text-white transition-colors">
                    <Icon className="size-6" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                    {f.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{f.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
