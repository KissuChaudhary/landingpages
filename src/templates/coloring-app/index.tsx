"use client"

import React from "react"
import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { InteractiveCanvas } from "./components/InteractiveCanvas"
import { FeaturesGrid } from "./components/FeaturesGrid"
import { ArtworkShowcase } from "./components/ArtworkShowcase"
import { Reviews } from "./components/Reviews"
import { DownloadBanner } from "./components/DownloadBanner"
import { Footer } from "./components/Footer"

export default function ColoringAppTemplate() {
  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-rose-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <InteractiveCanvas />
        <FeaturesGrid />
        <ArtworkShowcase />
        <Reviews />
        <DownloadBanner />
      </main>
      <Footer />
    </div>
  )
}
