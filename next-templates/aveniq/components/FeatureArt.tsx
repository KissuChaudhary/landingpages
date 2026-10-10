import { Mark } from "./ui";
export function SignalArt() {
  return (
    <div className="signal-art" aria-hidden="true">
      <div className="signal-source source-one">
        <span className="source-icon">↗</span>
        <span>
          Customer conversations<small>What we’re hearing</small>
        </span>
      </div>
      <div className="signal-source source-two">
        <span className="source-icon">≋</span>
        <span>
          Product feedback<small>What we’re learning</small>
        </span>
      </div>
      <div className="signal-source source-three">
        <span className="source-icon">⌘</span>
        <span>
          Team context<small>What we’re thinking</small>
        </span>
      </div>
      <svg className="signal-lines" viewBox="0 0 600 230" fill="none">
        <path
          d="M165 50h65q50 0 50 50v15h100M165 115h215M165 180h65q50 0 50-50v-15"
          stroke="url(#signal-gradient)"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient id="signal-gradient">
            <stop stopColor="#494850" />
            <stop offset="1" stopColor="#b3adf4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="signal-hub">
        <Mark />
        <span>The shared picture</span>
        <i>Context, connected.</i>
      </div>
    </div>
  );
}
export function ReasonArt() {
  return (
    <div className="reason-art" aria-hidden="true">
      <div className="reason-dot" />
      <div className="reason-line" />
      <div className="reason-note">
        <span>Evidence</span>
        <i />
        <i />
        <i />
      </div>
      <div className="reason-branch" />
      <div className="reason-note last">
        <span>Direction</span>
        <i />
        <i />
      </div>
    </div>
  );
}
export function MoveArt() {
  return (
    <div className="move-art" aria-hidden="true">
      <div className="move-row">
        <span>Next decision</span>
        <span>↗</span>
      </div>
      <div className="move-line" />
      <div className="move-row bottom">
        <span>
          <i />
          Ready for the team
        </span>
        <span className="move-avatars">PD</span>
      </div>
    </div>
  );
}
