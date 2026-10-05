"use client"

import React from "react"
import Image from "next/image"
import { PostProblemModal } from "./post-problem-modal"

export function Footer() {
  return (
    <footer className="w-full font-sans">
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-[#111] px-6 py-14 text-center">
        <div className="relative z-10 flex max-w-2xl flex-col items-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="size-1.5 rounded-full bg-white" />
            <span className="text-[11px] font-medium tracking-wide text-white">Free to post</span>
          </div>
          <h2 className="font-serif text-[38px] leading-[1.05] tracking-[-0.04em] text-white sm:text-[50px] lg:text-[56px]">
            Didn&apos;t find yours?<br />Call it out.
          </h2>
          <p className="mb-8 mt-5 max-w-xl text-[1rem] leading-7 text-white/60">
            Name the software that is failing you and what would make you switch. Others pile on with ME TOO, and alternatives can respond with how they&apos;d fix it.
          </p>
          <PostProblemModal inverted trigger="CALL IT OUT" />
        </div>
      </section>

      {/* As Seen On Badges */}
      <section className="border-t border-[rgba(55,50,47,0.12)] bg-[#fafafa]">
        <div className="border-b border-[rgba(55,50,47,0.12)] px-6 py-3">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#888] text-center">
            As featured across independent tech discovery
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[rgba(55,50,47,0.12)]">
          {["ProductHunt", "Hacker News", "BetaList", "AlternativeTo"].map((brand) => (
            <div key={brand} className="flex h-14 items-center justify-center bg-white p-3 text-center">
              <span className="font-serif text-sm font-semibold tracking-tight text-[#444]">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Branding and copyright */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-[rgba(55,50,47,0.12)] bg-[#f9f8f7] px-8 py-8 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 place-items-center rounded-full border border-[rgba(55,50,47,.08)] bg-[#fafafa]">
            <Image src="/fixthis-logo.webp" alt="FIXTHIS" width={24} height={24} />
          </div>
          <span className="font-serif text-base font-bold text-[#111]">FIXTHIS.LOL</span>
        </div>
        <p className="font-mono text-[10px] tracking-wide text-[#888]">
          © 2026 FIXTHIS Marketplace • Public Software Complaint Board
        </p>
      </div>
    </footer>
  )
}
