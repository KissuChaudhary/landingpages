"use client"

import React from "react"
import { PostProblemModal } from "./post-problem-modal"
import type { PublicTrafficStats } from "../lib/types"

export function Hero({
  traffic,
  onProblemAdded,
}: {
  traffic: PublicTrafficStats
  onProblemAdded?: (p: { product: string; statement: string; category: string }) => void
}) {
  return (
    <section className="relative flex w-full flex-col items-center border-b border-[rgba(55,50,47,0.12)] pb-9 pt-3 text-center">
      <div className="z-10 flex w-full max-w-3xl flex-col items-center px-5 sm:px-6">
        {traffic.total_visitors > 0 ? (
          <p
            className="mb-5 inline-flex items-center gap-2"
            aria-label={`${traffic.total_visitors.toLocaleString("en-US")} visitors in ${traffic.total_days} days`}
          >
            <span aria-hidden="true" className="h-px w-1.5 bg-[#ef654f]/40" />
            <strong className="font-sans text-[24px] font-bold leading-none tracking-[-0.04em] text-[#e94f3d]">
              {traffic.total_visitors.toLocaleString("en-US")}
            </strong>
            <span className="font-sans text-[12px] font-semibold tracking-tight text-[#555]">
              visitors / {traffic.total_days} days
            </span>
          </p>
        ) : null}

        <h1 className="font-serif text-[36px] leading-[1.06] tracking-[-0.04em] text-[#111] sm:text-[46px] lg:text-[60px] lg:leading-[1.02]">
          What software is pissing you off?
        </h1>
        <p className="mt-4 max-w-2xl text-[14px] font-normal leading-[1.6] tracking-tight text-[#555] sm:text-[15px] lg:text-[1rem]">
          Say what sucks about the software you pay for, and what would make you leave it. See who else is stuck with the same thing. Then let the alternatives answer.
        </p>
      </div>

      <div className="absolute bottom-0 z-20 flex w-full translate-y-1/2 justify-center">
        <PostProblemModal trigger="CALL IT OUT" onProblemAdded={onProblemAdded} />
      </div>
    </section>
  )
}
