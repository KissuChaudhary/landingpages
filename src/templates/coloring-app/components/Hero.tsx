"use client"

import React from "react"
import { Star, Download, Sparkles, Smartphone, CheckCircle, Heart } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/50 via-white to-amber-50/30 pt-16 pb-20 sm:pt-24 sm:pb-28">
      {/* Decorative Blur Spheres */}
      <div className="absolute -left-20 top-20 size-72 rounded-full bg-rose-300/25 blur-3xl pointer-events-none" />
      <div className="absolute right-0 top-32 size-80 rounded-full bg-amber-300/20 blur-3xl pointer-events-none" />
      <div className="absolute left-1/2 bottom-10 -translate-x-1/2 size-96 rounded-full bg-violet-300/15 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Pill rating */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-sm border border-rose-100 mb-6">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-800">4.9 / 5.0</span>
              <span className="text-xs text-stone-400">•</span>
              <span className="text-xs font-medium text-stone-600">50K+ Android Colorists</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 leading-[1.08] mb-6">
              The Calmest <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">Coloring & Drawing</span> App for Everyone
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Unwind with 1,000+ hand-crafted mandalas, animals, and fantasy pages. Smart color fill, pressure-sensitive brushes, relaxing lo-fi acoustics, and zero intrusive banner ads.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <a
                href="#download"
                className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl bg-stone-900 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-stone-900/20 hover:bg-black hover:scale-105 active:scale-95 transition-all"
              >
                <div className="flex size-6 items-center justify-center rounded-lg bg-rose-500 text-white">
                  <Download className="size-3.5" />
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-[10px] text-stone-300 font-normal uppercase tracking-wider">Direct Download</span>
                  <span className="text-sm font-bold">Android APK (Free)</span>
                </div>
              </a>

              <a
                href="#canvas"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-stone-800 shadow-md border border-stone-200 hover:border-rose-300 hover:bg-rose-50/50 hover:scale-105 active:scale-95 transition-all"
              >
                <Sparkles className="size-4 text-rose-500" />
                <span>Try Interactive Canvas</span>
              </a>
            </div>

            {/* Key Value Props */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-rose-100/80 max-w-md mx-auto lg:mx-0 text-left">
              <div>
                <strong className="block text-xl font-extrabold text-stone-900">1,000+</strong>
                <span className="text-xs text-stone-500">Free Templates</span>
              </div>
              <div>
                <strong className="block text-xl font-extrabold text-stone-900">100%</strong>
                <span className="text-xs text-stone-500">Offline Playable</span>
              </div>
              <div>
                <strong className="block text-xl font-extrabold text-stone-900">Zero</strong>
                <span className="text-xs text-stone-500">Intrusive Ads</span>
              </div>
            </div>
          </div>

          {/* Right Column: Mobile App Device Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] rounded-[42px] border-[10px] border-stone-900 bg-stone-900 p-2.5 shadow-2xl shadow-rose-900/20">
              {/* Phone Camera Notch */}
              <div className="absolute left-1/2 top-4 -translate-x-1/2 h-4 w-28 rounded-full bg-stone-900 z-30 flex items-center justify-center">
                <div className="size-2.5 rounded-full bg-stone-800" />
              </div>

              {/* Screen Content */}
              <div className="relative overflow-hidden rounded-[32px] bg-amber-50/80 p-4 pt-8 text-stone-900 flex flex-col min-h-[560px]">
                {/* App Screen Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-100/70 px-2 py-0.5 rounded-md">
                    Mandala #42
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <Heart className="size-3.5 fill-rose-500 text-rose-500" />
                    <span>2.4k</span>
                  </div>
                </div>

                {/* Mandala Artwork Mockup */}
                <div className="flex-1 flex items-center justify-center p-2">
                  <div className="relative size-60 rounded-full border-4 border-stone-800/10 flex items-center justify-center bg-white shadow-inner">
                    <svg viewBox="0 0 100 100" className="size-52 animate-spin-slow">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
                      <circle cx="50" cy="50" r="35" fill="#fef08a" opacity="0.6" stroke="#e11d48" strokeWidth="2" />
                      <circle cx="50" cy="50" r="25" fill="#fed7aa" opacity="0.8" stroke="#ea580c" strokeWidth="2" />
                      <circle cx="50" cy="50" r="14" fill="#a7f3d0" stroke="#059669" strokeWidth="2" />
                      <circle cx="50" cy="50" r="5" fill="#ec4899" />
                      <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                    </svg>
                  </div>
                </div>

                {/* In-app Color Palette Bar */}
                <div className="mt-auto pt-3 border-t border-stone-200">
                  <p className="text-[10px] font-mono uppercase text-stone-400 mb-2 tracking-wider text-center">
                    Tap swatch to color
                  </p>
                  <div className="flex items-center justify-between px-1">
                    {["#f43f5e", "#fb923c", "#facc15", "#4ade80", "#38bdf8", "#818cf8", "#c084fc"].map((color, i) => (
                      <span
                        key={color}
                        className={`size-6 rounded-full shadow-sm border-2 border-white transition-transform ${
                          i === 0 ? "scale-125 ring-2 ring-rose-500" : ""
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
