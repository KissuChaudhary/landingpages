import { site } from "@/site.config";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { MomentArt } from "@/components/ui/MomentArt";

export function Moments() {
  return (
    <section className="moments-section" aria-label="A day with Tempo">
      <div className="container section">
        <div className="moments-heading">
          <SectionIntro
            label="Made for life in between"
            title={
              <>
                A little rhythm.
                <br />
                Throughout <em>your day.</em>
              </>
            }
          />
          <p>
            Not every moment needs a plan.
            <br />
            But a few deserve a little space.
          </p>
        </div>
        <div className="moment-timeline">
          {site.moments.map((moment, index) => (
            <article className="moment" key={moment.kind}>
              <div className="moment-time">
                <span className="moment-node" />
                <span className="mono">{moment.time}</span>
                <span className="mono">0{index + 1}</span>
              </div>
              <MomentArt kind={moment.kind} />
              <h3>{moment.title}</h3>
              <p>{moment.description}</p>
            </article>
          ))}
        </div>
        <div className="moments-foot">
          <span className="mono">THE LITTLE THINGS ADD UP.</span>
          <span aria-hidden="true">✳</span>
          <span>At your pace. In your own way.</span>
        </div>
      </div>
    </section>
  );
}
