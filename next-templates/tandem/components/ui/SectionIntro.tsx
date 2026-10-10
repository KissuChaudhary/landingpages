import { Reveal, RevealText } from "@/components/motion/Reveal";
export function SectionIntro({
  eyebrow,
  title,
  description,
  id,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  id: string;
  center?: boolean;
}) {
  return (
    <div className={`section-intro ${center ? "intro-center" : ""}`}>
      <Reveal>
        <p className="eyebrow">
          <span />
          {eyebrow}
        </p>
      </Reveal>
      <RevealText text={title} id={id} className="section-title" />
      {description && (
        <Reveal delay={120}>
          <p className="section-description">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
