export function ServiceArt({ kind }: { kind: string }) {
  return (
    <div className={`service-art service-${kind}`} aria-hidden="true">
      <span className="service-art-label">
        {kind === "direction"
          ? "A point of view"
          : kind === "product"
            ? "A connected experience"
            : kind === "build"
              ? "Made to work"
              : "Room to grow"}
      </span>
      {kind === "direction" ? (
        <div className="direction-art">
          <i />
          <i />
          <i />
          <span>
            r<span>®</span>
          </span>
          <div>Purpose → Expression</div>
        </div>
      ) : kind === "product" ? (
        <div className="product-art">
          <div>
            <span>One less step.</span>
            <strong>
              Everything,
              <br />
              in its place.
            </strong>
            <i />
            <i />
            <i />
          </div>
          <span>↗</span>
        </div>
      ) : kind === "build" ? (
        <div className="build-art">
          <div>
            <i />
            <i />
            <i />
            <span>product.tsx</span>
          </div>
          <pre>
            <span>const</span> experience = &#123;
            <br /> clarity: <b>true</b>,<br /> care: <b>"every detail"</b>,
            <br /> ready: <b>true</b>
            <br />
            &#125;;
          </pre>
          <span className="build-status">● Build complete</span>
        </div>
      ) : (
        <div className="partner-art">
          <span>Discover</span>
          <i>↗</i>
          <span>Make</span>
          <i>↘</i>
          <span>Learn</span>
          <i>↙</i>
          <span>Refine</span>
          <i>↖</i>
          <b>One shared rhythm.</b>
        </div>
      )}
    </div>
  );
}
