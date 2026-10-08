"use client";
import { CircleDot, Flower2, Leaf } from "lucide-react";
import { useTempo } from "@/components/TempoProvider";
import { site } from "@/site.config";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { WeekPreview } from "@/components/app/WeekPreview";

export function Details() {
  const { session } = useTempo();
  return (
    <section
      className="container section details-section"
      id="details"
      aria-label="The thoughtful little details"
    >
      <SectionIntro
        label="Thoughtful, down to the little things"
        title={
          <>
            Small details.
            <br />
            <em>A softer everyday.</em>
          </>
        }
      />
      <div className="details-grid">
        <article className="detail-card weekly-card">
          <div className="detail-heading">
            <span className="mono">01 / A LITTLE PERSPECTIVE</span>
            <Flower2 size={19} strokeWidth={1.3} />
          </div>
          <h3>See your little progress.</h3>
          <p>
            A few good moments make a good week.
            <br />
            Let the small things count.
          </p>
          <WeekPreview />
        </article>
        <article className="detail-card pace-card">
          <div className="detail-heading">
            <span className="mono">02 / AT YOUR PACE</span>
            <CircleDot size={19} strokeWidth={1.3} />
          </div>
          <h3>Find your own tempo.</h3>
          <p>
            A short pause or a longer stretch.
            <br />
            There’s room for both.
          </p>
          <div className="pace-art">
            <div className="pace-rings" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>✳</span>
            </div>
            <div
              className="pace-options"
              role="group"
              aria-label="Choose your pace"
            >
              {site.session.durations.map((minutes) => (
                <button
                  key={minutes}
                  onClick={() => session.choose(minutes)}
                  aria-pressed={session.minutes === minutes}
                  disabled={session.running}
                >
                  {minutes}
                  <span> min</span>
                </button>
              ))}
            </div>
            <span className="mono pace-current">
              {session.minutes} MINUTES. JUST FOR YOU.
            </span>
          </div>
        </article>
        <article className="detail-card quiet-card">
          <div className="detail-heading">
            <span className="mono">03 / A LITTLE LESS NOISE</span>
            <Leaf size={19} strokeWidth={1.3} />
          </div>
          <div className="quiet-symbol" aria-hidden="true">
            <svg viewBox="0 0 100 100" fill="none">
              <path
                d="M50 80V24M50 57C23 54 19 34 22 20c22 1 30 15 28 37ZM50 68c24-4 32-23 29-38-21 2-30 16-29 38Z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </div>
          <div>
            <h3>Space to just be.</h3>
            <p>
              A thoughtful interface. Room to breathe.
              <br />
              The good things, given a little more space.
            </p>
          </div>
          <span className="quiet-foot mono">LESS RUSH. MORE RHYTHM.</span>
        </article>
      </div>
    </section>
  );
}
