"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { site, type Language } from "@/site.config";
import { usePlayback } from "@/components/motion/hooks";
import { CodeLines, CopyButton, DarkWindow, InstallCommand } from "@/components/ui/Code";
import { Headline, Kicker, Reveal } from "@/components/ui/Reveal";

const STEP_MS = 3800;

export function Developers() {
  const { developers } = site;
  const ref = useRef<HTMLDivElement>(null);
  const { playing } = usePlayback(ref, 0.4);
  const [language, setLanguage] = useState<Language>(developers.languages[0]);
  const [step, setStep] = useState(0);
  // Steps advance on their own until the visitor picks one.
  const [auto, setAuto] = useState(true);
  const snippet = developers.snippets[language];

  useEffect(() => {
    if (!auto || !playing) return;
    const timer = window.setTimeout(() => setStep((current) => (current + 1) % developers.steps.length), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [auto, playing, step, developers.steps.length]);

  const pickStep = (index: number) => {
    setAuto(false);
    setStep(index);
  };

  return (
    <section id="developers" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div ref={ref} className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal y={16}>
            <Kicker className="mb-5">{developers.kicker}</Kicker>
          </Reveal>
          <Reveal y={24} delay={0.08}>
            <Headline lead={developers.lead} accent={developers.accent} />
          </Reveal>
          <Reveal y={24} delay={0.16}>
            <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-body sm:text-[17px]">{developers.description}</p>
          </Reveal>

          <Reveal y={24} delay={0.2} className="mt-8 space-y-2">
            {developers.steps.map((item, index) => {
              const on = step === index;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => pickStep(index)}
                  aria-pressed={on}
                  className={cn(
                    "flex w-full items-start gap-4 rounded-[22px] p-4 text-left transition-all duration-500 ease-mk",
                    on ? "bg-white shadow-[0_16px_40px_-24px_rgba(15,23,42,0.4)] ring-1 ring-black/[0.06]" : "hover:bg-black/[0.03]",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold transition-colors duration-500",
                      on ? "bg-accent text-white" : "bg-black/[0.05] text-neutral-500",
                    )}
                  >
                    {index + 1}
                  </span>
                  <span>
                    <span className={cn("block text-[16px] font-semibold tracking-tight transition-colors", on ? "text-ink" : "text-neutral-600")}>{item.title}</span>
                    <span className={cn("mt-1 block text-[14px] leading-relaxed transition-colors", on ? "text-body" : "text-neutral-400")}>{item.body}</span>
                  </span>
                </button>
              );
            })}
          </Reveal>

          <Reveal y={16} delay={0.24} className="mt-6">
            <InstallCommand command={site.hero.install} />
          </Reveal>
        </div>

        <Reveal y={35} delay={0.12} className="min-w-0 lg:col-span-7 lg:pt-2">
          <DarkWindow
            tabs={
              <div role="tablist" aria-label="Language" className="flex items-center gap-1">
                {developers.languages.map((id) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={language === id}
                    onClick={() => setLanguage(id)}
                    className={cn(
                      "whitespace-nowrap rounded-full px-3 py-1 text-[12.5px] font-semibold transition-colors",
                      language === id ? "bg-white/[0.09] text-code" : "text-code-muted hover:text-code",
                    )}
                  >
                    {developers.snippets[id].label}
                  </button>
                ))}
              </div>
            }
            actions={
              <>
                <span className="hidden font-mono text-[11.5px] text-code-muted sm:inline">{snippet.filename}</span>
                <CopyButton text={snippet.code} tone="dark" label="Copy code" />
              </>
            }
          >
            <div role="tabpanel" aria-label={`${snippet.label} example`}>
              <CodeLines code={snippet.code} language={language} focus={snippet.steps[step]} className="min-h-[360px] sm:min-h-[452px]" />
            </div>
          </DarkWindow>
        </Reveal>
      </div>
    </section>
  );
}
