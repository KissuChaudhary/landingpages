"use client"

import React, { useState } from "react"
import { Palette, Download, Menu, X, Sparkles } from "lucide-react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-rose-100/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-violet-600 shadow-md shadow-rose-500/20 text-white">
            <Palette className="size-5" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-stone-900 flex items-center gap-1.5">
              Coloring <span className="text-xs px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 font-bold border border-rose-200">App</span>
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-600">
          <a href="#features" className="hover:text-rose-600 transition-colors">Features</a>
          <a href="#canvas" className="hover:text-rose-600 transition-colors">Interactive Demo</a>
          <a href="#gallery" className="hover:text-rose-600 transition-colors">Art Gallery</a>
          <a href="#reviews" className="hover:text-rose-600 transition-colors">Reviews</a>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#download"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-rose-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Download className="size-3.5" />
            <span>Get on Android</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden rounded-lg p-2 text-stone-600 hover:bg-stone-100"
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-rose-100 bg-white px-4 py-4 flex flex-col gap-3">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-sm font-medium text-stone-700 hover:text-rose-600"
          >
            Features
          </a>
          <a
            href="#canvas"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-sm font-medium text-stone-700 hover:text-rose-600"
          >
            Interactive Demo
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-sm font-medium text-stone-700 hover:text-rose-600"
          >
            Art Gallery
          </a>
          <a
            href="#download"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 py-3 text-xs font-bold uppercase text-white shadow-md"
          >
            <Download className="size-4" />
            <span>Download App</span>
          </a>
        </div>
      )}
    </nav>
  )
}
