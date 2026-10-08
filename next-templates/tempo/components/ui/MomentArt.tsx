import { Check, Feather } from "lucide-react";

export function MomentArt({ kind }: { kind: string }) {
  if (kind === "morning")
    return (
      <div className="moment-art morning-art" aria-hidden="true">
        <div className="sun-orb" />
        <div className="sun-horizon" />
        <span className="sun-ray ray-one" />
        <span className="sun-ray ray-two" />
        <span className="sun-ray ray-three" />
        <span className="art-label mono">A FRESH LITTLE START</span>
      </div>
    );
  if (kind === "focus")
    return (
      <div className="moment-art flow-art" aria-hidden="true">
        <svg viewBox="0 0 300 170" fill="none">
          <path
            d="M-20 125C35 125 10 45 70 45s18 95 80 95 35-110 90-110 30 60 100 60"
            stroke="#d9e7b3"
            strokeWidth="2.5"
          />
          <path
            d="M-20 135C35 135 10 55 70 55s18 95 80 95 35-110 90-110 30 60 100 60"
            stroke="#d9e7b3"
            strokeWidth="1"
            opacity=".25"
          />
        </svg>
        <span className="flow-time">
          25<span>min</span>
        </span>
        <span className="art-label mono">IN YOUR OWN GOOD TIME</span>
      </div>
    );
  return (
    <div className="moment-art evening-art" aria-hidden="true">
      <div className="tiny-journal">
        <Feather size={18} />
        <p>
          A little thought,
          <br />
          <em>worth keeping.</em>
        </p>
        <div />
        <div />
        <span>
          <Check size={9} />A moment, kept.
        </span>
      </div>
      <span className="art-label mono">TAKE THE GOOD WITH YOU</span>
    </div>
  );
}
