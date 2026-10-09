import { Bot, FileText, Sparkles, Mail, MessageSquare } from "lucide-react";
export function ArticleArt({ kind }: { kind: string }) {
  return (
    <div className={`article-art art-${kind}`} aria-hidden="true">
      <div className="art-grid" />
      {kind === "orbit" ? (
        <>
          <div className="orbit-ring orbit-outer" />
          <div className="orbit-ring orbit-inner" />
          <div className="art-core">
            <Sparkles size={38} />
          </div>
          <span className="art-star star-a">✦</span>
          <span className="art-star star-b">✦</span>
        </>
      ) : kind === "stack" ? (
        <>
          <div className="art-sheet sheet-back" />
          <div className="art-sheet sheet-middle" />
          <div className="art-sheet sheet-front">
            <Bot size={32} />
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
            <Mail size={22} />
          </div>
          <div className="art-app app-two">
            <FileText size={22} />
          </div>
          <div className="art-app app-three">
            <MessageSquare size={22} />
          </div>
          <div className="art-app app-four">
            <Sparkles size={22} />
          </div>
          <div className="art-app app-center">
            <Bot size={29} />
          </div>
        </>
      )}
    </div>
  );
}
