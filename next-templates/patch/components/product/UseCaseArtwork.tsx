import {
  ArrowUpRight,
  Asterisk,
  Braces,
  Check,
  Code2,
  Command,
  FileText,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
export function UseCaseArtwork({ id }: { id: string }) {
  if (id === "extension")
    return (
      <div
        className="extension-art"
        aria-label="An example browser extension command surface"
      >
        <div className="extension-browser">
          <span />
          <span />
          <span />
          <div>your-everyday / a-good-shortcut</div>
        </div>
        <div className="extension-lines" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="extension-command">
          <div className="extension-search">
            <Search size={15} />
            <span>A thought worth finding</span>
            <kbd>⌘ K</kbd>
          </div>
          <span className="art-caption">A FEW GOOD PLACES TO GO</span>
          {[
            "Your saved ideas",
            "The work in progress",
            "Something for later",
          ].map((label, index) => (
            <div className="extension-command-row" key={label}>
              <FileText size={14} />
              <span>{label}</span>
              <span>0{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    );
  if (id === "components")
    return (
      <div
        className="component-art"
        aria-label="A collection of original interface component examples"
      >
        <div className="component-art-heading">
          <Braces size={18} />
          <span>GOOD PARTS / BROUGHT TOGETHER</span>
        </div>
        <div className="component-pieces">
          <div className="piece-buttons">
            <span className="piece-primary">
              Make something
              <ArrowUpRight size={13} />
            </span>
            <span className="piece-outline">
              A small beginning
              <Plus size={13} />
            </span>
          </div>
          <div className="piece-toggle">
            <span>Keep the good parts</span>
            <i>
              <b />
            </i>
          </div>
          <div className="piece-notification">
            <span className="notification-check">
              <Check size={15} />
            </span>
            <div>
              <strong>A good first step.</strong>
              <p>Something worth building on.</p>
            </div>
          </div>
          <div className="piece-code">
            <Code2 size={16} />
            <span>
              Yours to arrange.
              <br />
              Yours to make your own.
            </span>
            <Command size={14} />
          </div>
        </div>
      </div>
    );
  return (
    <div
      className="app-art"
      aria-label="An original example app for collecting ideas"
    >
      <div className="app-art-top">
        <span>
          <Asterisk size={17} />
          collected.
        </span>
        <span className="app-avatar">Y</span>
      </div>
      <div className="app-art-heading">
        <span className="art-caption">A PLACE FOR YOUR GOOD IDEAS</span>
        <h4>Worth coming back to.</h4>
        <p>A few thoughts. A little perspective.</p>
      </div>
      <div className="app-collection">
        <div className="collection-card collection-citrus">
          <Sparkles size={18} />
          <span>001 / A BEGINNING</span>
          <strong>
            What if the small
            <br />
            thing was enough?
          </strong>
          <ArrowUpRight size={17} />
        </div>
        <div className="collection-card collection-paper">
          <div className="collection-sketch" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span>002 / A POSSIBILITY</span>
          <strong>
            An idea,
            <br />
            taking shape.
          </strong>
          <ArrowUpRight size={17} />
        </div>
      </div>
      <div className="app-art-footer">
        <span>2 THOUGHTS, KEPT.</span>
        <span>+ ADD A LITTLE MORE</span>
      </div>
    </div>
  );
}
