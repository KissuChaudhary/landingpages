import React from "react"

export function HowItWorks() {
  const steps = [
    [
      "01",
      "Call it out",
      "Name the software that is failing you, what it costs you, and what would make you switch.",
    ],
    [
      "02",
      "People pile on",
      "Everyone who hits ME TOO is one more customer for whoever fixes it. The count is the proof.",
    ],
    [
      "03",
      "Alternatives answer",
      "Competing products say how they solve that exact complaint, and what they will do for someone switching. Free to answer, and nobody can pay to rank.",
    ],
  ]

  return (
    <section id="how-it-works" className="w-full">
      <header className="flex flex-col gap-1.5 border-y border-[rgba(55,50,47,0.12)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8 bg-white">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <p className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.16em] text-[#999]">
            How it works
          </p>
          <h2 className="font-serif text-[19px] leading-tight text-[#111] sm:text-xl">
            Call it out. Pile on. Make them answer.
          </h2>
        </div>
        <p className="text-[11px] text-[#777]">Free for users and founders.</p>
      </header>
      <div className="grid border-y border-[rgba(55,50,47,0.12)] bg-[rgba(55,50,47,0.12)] md:grid-cols-3 md:gap-px">
        {steps.map(([number, title, body], index) => (
          <article
            key={number}
            className={`bg-[#fafafa] p-7 transition-colors hover:bg-white ${
              index ? "border-t border-[rgba(55,50,47,0.12)] md:border-t-0" : ""
            }`}
          >
            <p className="font-mono text-[10px] tracking-[0.16em] text-[#e94f3d] font-bold">
              {number}
            </p>
            <h3 className="mt-4 font-serif text-xl text-[#111] font-semibold">{title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[#666]">{body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
