import type { CSSProperties, ElementType } from "react";

/**
 * Renders a heading from config text, setting the [bracketed] phrase in a tile. The host
 * gets data-reveal, so the tile drops into the line when the heading scrolls into view.
 * Pass an array to break the heading into lines.
 */
export function TileWords({
  text,
  as: Tag = "h2",
  className = "",
  tone,
  delay,
  id,
}: {
  text: string | string[];
  as?: ElementType;
  className?: string;
  /** Tile colour: ultra (default), ink, line, citrine or white. */
  tone?: "ink" | "line" | "citrine" | "white";
  delay?: number;
  id?: string;
}) {
  const lines = Array.isArray(text) ? text : [text];
  return (
    <Tag id={id} className={`tw-host ${className}`} data-reveal="none" data-tw={tone} style={delay ? ({ "--tw-d": `${delay}ms` } as CSSProperties) : undefined}>
      {lines.map((line, i) => (
        <span key={i} className={lines.length > 1 ? "tw-line" : undefined}>
          {split(line)}
          {i < lines.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

/** "Get paid by [@handle]." → text, tile, text. */
export function split(line: string) {
  const parts = line.split(/(\[[^\]]+\])/);
  return parts.map((part, i) =>
    part.startsWith("[") && part.endsWith("]") ? (
      <span key={i} className="tw">
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    ),
  );
}

/** The heading as plain text, without brackets (for alt text, labels and metadata). */
export const plain = (text: string | string[]) => (Array.isArray(text) ? text.join(" ") : text).replace(/[[\]]/g, "");
