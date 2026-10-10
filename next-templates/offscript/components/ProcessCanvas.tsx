import { asset } from "@/lib/links";
export function ProcessCanvas({ step }: { step: number }) {
  return (
    <div className="process-canvas" data-step={step} aria-hidden="true">
      <div className="canvas-register">
        <span>OFFSCRIPT / WORKING WALL</span>
        <span>0{step + 1} — 03</span>
      </div>
      <div className="brief-paper">
        <span>FIRST, A GOOD QUESTION.</span>
        <p>
          What if
          <br />
          we made
          <br />
          <em>room to play?</em>
        </p>
        <div className="brief-rule" />
        <small>A direction worth following.</small>
        <svg viewBox="0 0 230 60" fill="none">
          <path
            d="M10 44C35 9 176 5 216 23s-118 33-191 18"
            stroke="currentColor"
            strokeWidth="3"
          />
        </svg>
      </div>
      <div className="canvas-swatches">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="canvas-photo">
        <img
          src={asset("/images/sidequest.webp")}
          alt=""
          loading="lazy"
          width="1536"
          height="1024"
        />
        <span>COLOR. CHARACTER. A LITTLE CURIOSITY.</span>
      </div>
      <div className="canvas-type">
        Take the
        <br />
        <em>scenic route.</em>
        <span>SIDEQUEST / CONCEPT DIRECTION</span>
      </div>
      <div className="canvas-final">
        <img
          src={asset("/images/sidequest.webp")}
          alt=""
          loading="lazy"
          width="1536"
          height="1024"
        />
        <span>SIDEQUEST</span>
        <p>
          Make room
          <br />
          for play.
        </p>
        <small>GO YOUR OWN WAY ↗</small>
      </div>
      <div className="canvas-stamp">
        A little
        <br />
        off script.
      </div>
    </div>
  );
}
