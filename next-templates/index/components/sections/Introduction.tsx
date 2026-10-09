import { site } from "@/site.config";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { AccentReveal } from "@/components/motion/AccentReveal";
import { ArrowRight, BookOpen, FileText, StickyNote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
export function Introduction() {
  return (
    <section
      className="introduction container section"
      aria-labelledby="intro-heading"
    >
      <div>
        <SectionBadge>{site.intro.badge}</SectionBadge>
        <h2 id="intro-heading">
          {site.intro.first}
          <br />
          <AccentReveal>{site.intro.accent}</AccentReveal>
        </h2>
      </div>
      <Reveal className="introduction__body">
        <p>{site.intro.description}</p>
        <div
          className="source-trail"
          aria-label="Articles, notes and documents become connected ideas"
        >
          <BookOpen size={22} />
          <span>Articles</span>
          <StickyNote size={22} />
          <span>Notes</span>
          <FileText size={22} />
          <span>Documents</span>
          <ArrowRight size={20} />
        </div>
      </Reveal>
    </section>
  );
}
