"use client"

import React from "react"
import { Palette, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-400 to-rose-500 text-white">
            <Palette className="size-4" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-white">
            Coloring Android App
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Android Permissions</a>
          <a href="#" className="hover:text-white transition-colors">Sponsorships</a>
        </div>

        <p className="text-xs text-stone-500">
          © {new Date().getFullYear()} Coloring App. Designed for mindful creativity.
        </p>
      </div>
    </footer>
  )
}
