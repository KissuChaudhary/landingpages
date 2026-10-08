import { FileCode2 } from "lucide-react";
function Tokens({ line }: { line: string }) {
  return (
    <>
      {line
        .split(
          /("[^"]*"|'[^']*'|\b(?:export|default|function|return|const|import|from|true|false)\b)/g,
        )
        .map((token, index) => (
          <span
            key={index}
            className={
              /^["']/.test(token)
                ? "code-string"
                : /^(export|default|function|return|const|import|from|true|false)$/.test(
                      token,
                    )
                  ? "code-keyword"
                  : undefined
            }
          >
            {token}
          </span>
        ))}
    </>
  );
}
export function CodeView({
  code,
  file,
  compact = false,
}: {
  code: string;
  file: string;
  compact?: boolean;
}) {
  const all = code.split("\n");
  const lines = compact ? all.slice(0, 10) : all;
  return (
    <div className="code-view">
      <div className="code-heading">
        <FileCode2 size={13} />
        <span>{file}</span>
        <span className="code-language">TSX</span>
      </div>
      <pre aria-label={`${file} ${compact ? "excerpt" : "source code"}`}>
        <code>
          {lines.map((line, index) => (
            <span className="code-line" key={index}>
              <span className="line-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <Tokens line={line} />
              </span>
            </span>
          ))}
        </code>
      </pre>
      {compact && all.length > 10 && (
        <div className="code-excerpt-note">
          EXCERPT / COPY OR EXPORT THE FULL FILE
        </div>
      )}
    </div>
  );
}
