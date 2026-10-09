import { site } from "@/site.config";
import { teams } from "@/data/teams";
import { reviews, reviewMetrics } from "@/data/reviews";
import { SectionHead, Avatar, Art } from "../ui/Primitives";
import { TeamMark } from "../ui/Brand";
export function Story() {
  const metrics = reviewMetrics(reviews);
  return (
    <section className="story section container" id="reviewer-story">
      <SectionHead label={site.story.label} lines={site.story.heading} />
      <div className="story-layout">
        <div className="story-art">
          <Art name="petal" />
          <div className="story-wordmark">
            <TeamMark type={teams[0].mark} />
            {teams[0].name}
          </div>
        </div>
        <div className="story-quote">
          <blockquote>“{site.story.quote}”</blockquote>
          <div className="quote-person">
            <Avatar
              initials="NS"
              portrait="nina"
              name="Nina Shah, a fictional team member"
            />
            <span>
              {site.story.person}
              <small>{site.story.role}</small>
            </span>
          </div>
          <div className="story-stats">
            {[
              [`${metrics.rate}%`, "Approved in the example"],
              [String(metrics.projects), "Creative projects"],
              [String(metrics.total), "Project reviews"],
            ].map(([number, label]) => (
              <div key={label}>
                <strong>{number}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="small-note">{site.story.note}</p>
    </section>
  );
}
export function Perspectives() {
  return (
    <section className="perspectives section container">
      <SectionHead
        label={site.perspectives.label}
        lines={site.perspectives.heading}
        center
      />
      <div className="perspective-grid">
        {teams.map((team, i) => (
          <figure
            key={team.name}
            data-reveal
            style={{ "--delay": `${i * 65}ms` } as React.CSSProperties}
          >
            <TeamMark type={team.mark} />
            <blockquote>“{team.quote}”</blockquote>
            <figcaption>
              <Avatar
                initials={team.person
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
                portrait={team.portrait}
                name={`${team.person}, a fictional team member`}
              />
              <span>
                {team.person}
                <small>
                  {team.role} at {team.name}
                </small>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="small-note">{site.perspectives.note}</p>
    </section>
  );
}
