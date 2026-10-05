"use client"

import React from "react"
import { Download, QrCode, Smartphone, Sparkles, CheckCircle2 } from "lucide-react"

export function DownloadBanner() {
  return (
    <section id="download" className="py-20 bg-gradient-to-br from-stone-900 via-stone-950 to-neutral-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -right-20 -bottom-20 size-80 rounded-full bg-rose-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 size-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 relative z-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-12 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-rose-400 border border-rose-500/30 mb-4">
              <Sparkles className="size-3" /> Ready for your creative journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Download Coloring for Android Today
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8">
              Available directly as a verified APK release or via the Google Play Store. Works seamlessly on any Android smartphone, foldable, or tablet (Android 8.0+).
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <a
                href="#download"
                className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Download className="size-5" />
                <div className="text-left">
                  <span className="block text-[10px] text-white/80 uppercase">Download Now</span>
                  <span className="text-sm font-bold">Coloring v2.4 (APK)</span>
                </div>
              </a>

              <div className="flex items-center gap-2 text-xs text-stone-400">
                <CheckCircle2 className="size-4 text-emerald-400" />
                <span>VirusTotal Verified • 28MB</span>
              </div>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="shrink-0 flex flex-col items-center p-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md text-center">
            <div className="p-3 bg-white rounded-xl shadow-lg mb-3">
              <QrCode className="size-24 text-stone-900" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-stone-300">
              Scan with Phone Camera
            </span>
            <span className="text-[10px] text-stone-400 mt-0.5">Instant Install Link</span>
          </div>
        </div>
      </div>
    </section>
  )
}
