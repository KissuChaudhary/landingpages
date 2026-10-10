"use client";
import { site } from "@/site.config";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { NumberRoll } from "@/components/hairline/number-roll";
import { useInView } from "@/components/motion/useInView";
import { Reveal } from "@/components/motion/Reveal";

export function Manifesto() {
  const [ref, seen] = useInView<HTMLDivElement>();
  const m = site.manifesto;
  return (
    <section
      id="manifesto"
      className="manifesto section container"
      aria-labelledby="manifesto-title"
    >
      <SectionIntro
        id="manifesto-title"
        eyebrow={m.eyebrow}
        title={m.title}
        description={m.description}
        center
      />
      <div ref={ref} className="manifesto-stats">
        {m.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="stat-number">
              <NumberRoll
                className="js-stat"
                value={seen ? s.value : 0}
                locales={site.locale}
                suffix={s.suffix}
                duration={1100}
              />
              <noscript><span>{s.value}{s.suffix}</span></noscript>
            </div>
            <p>{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
