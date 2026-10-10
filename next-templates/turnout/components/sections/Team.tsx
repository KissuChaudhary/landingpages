import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { Action, planHref } from "@/components/ui/Action";
import { Thread } from "@/components/ui/Thread";

// The crew, pinned along a thread. Pointing at a portrait straightens it, lifts it and
// slides the name tag out from under it. On phones they sit in a row you can swipe.

const pose = [
  { r: -6, y: 18 },
  { r: 5, y: 48 },
  { r: -3, y: 0 },
  { r: 6, y: 40 },
  { r: -5, y: 6 },
  { r: 4, y: 30 },
];

export function Team() {
  const { team } = site;
  return (
    <section className="section team" aria-labelledby="team-title">
      <div className="container">
        <div className="section-head center">
          <span className="tag" data-reveal>
            {team.label}
          </span>
          <h2 id="team-title" className="h2" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            {team.title}
          </h2>
        </div>
      </div>
      <div className="team-stage">
        <Thread className="team-thread" viewBox="0 0 1600 300" width={9} d="M-40 250C120 260 200 120 330 110 470 100 520 230 650 200 790 168 780 60 900 70 1020 80 1040 210 1170 190 1300 170 1330 60 1460 70 1560 78 1600 150 1660 170" />
        <ul className="team-row">
          {team.people.map((person, i) => (
            <li key={person.name} className="person" style={{ "--r": `${pose[i % pose.length].r}deg`, "--y": `${pose[i % pose.length].y}px`, "--d": `${i * 70}ms` } as React.CSSProperties} tabIndex={0}>
              <span className="person-photo" data-reveal="scale" style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
                <img src={asset(person.image)} alt="" width={537} height={720} loading="lazy" />
              </span>
              <span className="person-tag">
                <strong>{person.name}</strong>
                <span>{person.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="container team-foot" data-reveal>
        <p className="lead">{team.body}</p>
        <Action to={planHref()} label={site.cta} />
      </div>
    </section>
  );
}
