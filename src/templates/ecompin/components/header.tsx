"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { PostProblemModal } from "./post-problem-modal"

export function Header() {
  return (
    <nav aria-label="Primary navigation" className="absolute top-5 z-40 flex w-full flex-col items-center gap-2 sm:top-8">
      <div className="absolute left-0 top-4 -z-10 h-px w-full bg-[rgba(55,50,47,0.12)]" />

      <div className="flex w-[calc(100%-40px)] max-w-[380px] items-center justify-between rounded-full border border-black/5 bg-[#efefef]/85 py-2 pl-[13px] pr-[9px] backdrop-blur-md sm:w-auto sm:max-w-[calc(100%-14px)] sm:justify-start sm:pr-[13px] shadow-xs">
        <Link
          href="#problems"
          aria-label="FIXTHIS home"
          className="group flex size-8 shrink-0 items-center justify-center rounded-full border border-[rgba(55,50,47,0.08)] bg-[#fafafa] text-[#111] transition-transform hover:scale-105 sm:mr-3"
        >
          <Image src="/fixthis-logo.webp" alt="FIXTHIS logo" width={25} height={25} priority />
        </Link>
        <span className="hidden pr-3 text-[13px] font-extrabold tracking-[-0.04em] text-[#111] sm:block">
          FIXTHIS
        </span>
        <div className="hidden items-center px-1 text-[13px] font-medium text-[#555] sm:flex sm:gap-3 md:gap-6 md:px-3">
          <a href="#problems" className="transition-colors hover:text-[#111]">Problems</a>
          <a href="#how-it-works" className="hidden transition-colors hover:text-[#111] md:block">How it works</a>
        </div>
        <div className="mx-2 hidden h-4 w-px bg-[rgba(55,50,47,0.12)] sm:block" />
        <PostProblemModal compact trigger="POST PROBLEM" />
      </div>
    </nav>
  )
}
