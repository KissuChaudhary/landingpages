import { asset } from "@/lib/urls";
import { Mark } from "../ui";
export function ProcessArt({
  mode,
}: {
  mode: "direction" | "making" | "learning";
}) {
  if (mode === "direction")
    return (
      <div className="process-art art-direction" aria-hidden="true">
        <div className="direction-title">
          Find your
          <br />
          <em>feeling.</em>
        </div>
        <div className="art-swatches">
          <span />
          <span />
          <span />
        </div>
        <div className="art-photo art-photo-one">
          <img
            src={asset("/images/creator.webp")}
            alt=""
            width="1024"
            height="1536"
            loading="lazy"
          />
        </div>
        <div className="art-scribble">
          <svg viewBox="0 0 160 80" fill="none">
            <path
              d="M10 46C38 0 116 0 144 44c21 41-111 30-108 2s125-27 112 15"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="art-label">A point of view worth sharing.</span>
      </div>
    );
  if (mode === "making")
    return (
      <div className="process-art art-making" aria-hidden="true">
        <div className="art-photo art-photo-two">
          <img
            src={asset("/images/sip.webp")}
            alt=""
            loading="lazy"
            width="1024"
            height="1536"
          />
        </div>
        <div className="making-type">
          Real
          <br />
          people.
          <br />
          <em>Real feel.</em>
        </div>
        <span className="making-tag">The idea, brought to life ↗</span>
        <Mark className="making-mark" />
      </div>
    );
  return (
    <div className="process-art art-learning" aria-hidden="true">
      <div className="learning-orbit orbit-one" />
      <div className="learning-orbit orbit-two" />
      <div className="learning-orbit orbit-three" />
      <div className="learning-center">
        <Mark />
        <span>
          Make.
          <br />
          Listen.
          <br />
          Repeat.
        </span>
      </div>
      <span className="learning-label label-one">The idea</span>
      <span className="learning-label label-two">The response</span>
      <span className="learning-label label-three">The next round</span>
      <span className="art-label">Every round starts somewhere better.</span>
    </div>
  );
}
