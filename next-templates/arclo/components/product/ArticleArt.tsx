import { CalendarCheck, FileSearch, FileText, Landmark, Scale, Stamp, TrendingUp } from "lucide-react";
export function ArticleArt({ kind }: { kind: string }) {
  return (
    <div className={`article-art art-${kind}`} aria-hidden="true">
      <div className="art-grid" />
      {kind === "orbit" ? (
        <>
          <div className="orbit-ring orbit-outer" />
          <div className="orbit-ring orbit-inner" />
          <div className="art-core">
            <CalendarCheck size={38} />
          </div>
          <span className="art-star star-a">✦</span>
          <span className="art-star star-b">✦</span>
        </>
      ) : kind === "stack" ? (
        <>
          <div className="art-sheet sheet-back" />
          <div className="art-sheet sheet-middle" />
          <div className="art-sheet sheet-front">
            <FileSearch size={32} />
            <span />
            <span />
            <span />
          </div>
        </>
      ) : (
        <>
          <svg viewBox="0 0 320 200">
            <path d="M65 65L160 108L250 55M160 108L255 150M160 108L65 155" />
          </svg>
          <div className="art-app app-one">
            <Landmark size={22} />
          </div>
          <div className="art-app app-two">
            <FileText size={22} />
          </div>
          <div className="art-app app-three">
            <Stamp size={22} />
          </div>
          <div className="art-app app-four">
            <TrendingUp size={22} />
          </div>
          <div className="art-app app-center">
            <Scale size={29} />
          </div>
        </>
      )}
    </div>
  );
}
