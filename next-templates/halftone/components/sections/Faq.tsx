"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { site } from "@/site.config";
import { EASE } from "@/components/motion/hooks";
import { Button } from "@/components/ui/Button";
import { Headline, Kicker, Reveal } from "@/components/ui/Reveal";

/** Heading and a contact card on the left; one card of questions on the right. */
export function Faq() {
  const { faq } = site;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal y={16}>
              <Kicker className="mb-5">{faq.kicker}</Kicker>
            </Reveal>
            <Reveal y={24} delay={0.08}>
              <Headline lead={faq.lead} accent={faq.accent} />
            </Reveal>
            <Reveal y={24} delay={0.16}>
              <p className="mt-4 max-w-md text-base leading-relaxed text-body sm:text-[17px]">{faq.description}</p>
            </Reveal>

            <Reveal y={24} delay={0.22} className="surface mt-8 max-w-md rounded-[26px] p-6">
              <p className="text-[16px] font-semibold tracking-tight text-ink">{faq.contact.title}</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-body">{faq.contact.body}</p>
              <Button href={faq.contact.href} variant="secondary" size="sm" className="mt-5 bg-white hover:bg-white/70">
                {faq.contact.label}
              </Button>
            </Reveal>
          </div>
        </div>

        <Reveal y={30} delay={0.1} className="lg:col-span-7">
          <div className="surface rounded-[30px] px-2 py-2">
            {faq.items.map((item, index) => {
              const isOpen = open === index;
              return (
                <div
                  key={item.question}
                  className={cn("rounded-[22px] transition-colors duration-300", isOpen ? "bg-white ring-1 ring-black/[0.05]" : "")}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-[18px]"
                    >
                      <span className="text-base font-medium tracking-tight text-ink sm:text-[17px]">{item.question}</span>
                      <span
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-mk",
                          isOpen ? "rotate-45 bg-accent text-white" : "bg-white text-neutral-500",
                        )}
                      >
                        <Plus className="size-3.5" strokeWidth={2.25} />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl px-5 pb-5 text-[15px] leading-relaxed text-neutral-500 sm:px-6 sm:pb-6">{item.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
