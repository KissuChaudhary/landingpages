import {
  ArrowUpRight,
  Asterisk,
  Braces,
  Check,
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
          <div>Workspace</div>
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
            <span>Search your workspace</span>
            <kbd>⌘ K</kbd>
          </div>
          {["Saved ideas", "Current project", "Reading list"].map((label) => (
            <div className="extension-command-row" key={label}>
              <FileText size={14} />
              <span>{label}</span>
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
          <span>Components</span>
        </div>
        <div className="component-pieces">
          <div className="piece-buttons">
            <span className="piece-primary">
              New project
              <ArrowUpRight size={13} />
            </span>
            <span className="piece-outline">
              Add component
              <Plus size={13} />
            </span>
          </div>
          <div className="piece-toggle">
            <span>Auto-save</span>
            <i>
              <b />
            </i>
          </div>
          <div className="piece-notification">
            <span className="notification-check">
              <Check size={15} />
            </span>
            <div>
              <strong>Changes saved</strong>
              <p>Your workspace is up to date.</p>
            </div>
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
        <span className="app-count">2 ideas</span>
      </div>
      <div className="app-art-heading">
        <h4>Worth coming back to.</h4>
      </div>
      <div className="app-collection">
        <div className="collection-card collection-citrus">
          <Sparkles size={18} />
          <div>
            <strong>What if the small thing was enough?</strong>
            <p>A first sketch for something new.</p>
          </div>
          <ArrowUpRight size={17} />
        </div>
        <div className="collection-card collection-paper">
          <div className="collection-sketch" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div>
            <strong>An idea, taking shape.</strong>
            <p>Keep the thread. Come back when you're ready.</p>
          </div>
          <ArrowUpRight size={17} />
        </div>
      </div>
    </div>
  );
}
