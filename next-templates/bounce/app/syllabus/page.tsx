import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { site, enrollHref, cohortDate } from "@/site.config";
import { ButtonLink, Title } from "@/components/ui/Primitives";

export const metadata: Metadata = {
  title: "Syllabus",
  description: `Every lesson, live session and assignment in ${site.brand}, week by week.`,
};

export default function SyllabusPage() {
  const { weeks, cohort } = site;
  const lessons = weeks.items.reduce((sum, w) => sum + w.lessons.length, 0);
  return (
    <section className="page syllabus">
      <div className="container">
        <div className="section-head">
          <Title as="h1" lines={["The full syllabus", `${weeks.items.length} weeks, ${lessons} lessons.`]} />
          <div className="syllabus-cta" data-reveal="">
            <p>
              {cohort.name} starts {cohortDate()}.
            </p>
            <ButtonLink to={enrollHref()} label="Enroll" />
          </div>
        </div>
        <ol className="syllabus-weeks">
          {weeks.items.map((w, i) => (
            <li key={w.title} className={`syllabus-week c-${w.color}`} data-reveal="" style={{ "--rd": `${(i % 2) * 80}ms` } as CSSProperties}>
              <div className="syllabus-week-head">
                <span className="week-num">Week {String(i + 1).padStart(2, "0")}</span>
                <h2>{w.title}</h2>
                <p>{w.subtitle}</p>
              </div>
              <ol className="week-lessons">
                {w.lessons.map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ol>
              <dl className="week-facts">
                <div>
                  <dt>Live session</dt>
                  <dd>{w.live}</dd>
                </div>
                <div>
                  <dt>You&apos;ll finish</dt>
                  <dd>{w.assignment}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
