"use client";

import * as React from "react";
import { Check, ChevronDown, Copy, CornerDownLeft, WrapText } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * CODE BLOCK: code in an answer, as it streams and after
 *
 *   streaming  lines arrive with a caret, already highlighted
 *   complete   language and file name, Copy and wrap
 *   copied     Copy turns into "Copied" for a moment
 *   folded     long code shows its start and "Show 42 more
 *              lines"; it opens smoothly
 *   apply      optional: Apply runs your action, then "Applied"
 *
 * A light highlighter is built in (keywords, strings, comments,
 * numbers, calls) so it works mid-stream with no dependencies.
 * ───────────────────────────────────────────────────────── */

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  /** e.g. "ts", "python", "bash"; shown in the header and used for comments. */
  language?: string;
  filename?: string;
  /** True while the code is still arriving. */
  streaming?: boolean;
  lineNumbers?: boolean;
  /** Fold code longer than this many lines (0 never folds). */
  collapseAfter?: number;
  /** Shows Apply; return a promise to show progress. */
  onApply?: () => void | Promise<void>;
  applyLabel?: string;
  /** Turn the built-in highlighting off, e.g. for plain output. */
  highlight?: boolean;
}

const LINE = 21;
const PAD = 12;
const EASE = "cubic-bezier(0.23,1,0.32,1)";
const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";
const ACTION = `inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-3.5 ${FOCUS}`;

// A GitHub-like palette for light and dark themes.
const TONE = {
  keyword: "text-[#cf222e] dark:text-[#ff7b72]",
  string: "text-[#0a3069] dark:text-[#a5d6ff]",
  comment: "italic text-[#6e7781] dark:text-[#8b949e]",
  number: "text-[#0550ae] dark:text-[#79c0ff]",
  call: "text-[#8250df] dark:text-[#d2a8ff]",
};

const KEYWORDS =
  "const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|import|from|export|default|async|await|new|class|extends|implements|type|interface|enum|true|false|null|undefined|this|try|catch|finally|throw|yield|in|of|typeof|instanceof|as|def|elif|lambda|None|True|False|pass|with|raise|except|and|or|not|is|self|fn|pub|use|mut|impl|struct|match|func|package|go|echo|then|fi|done|esac|local|public|private|protected|static|void|int|string|bool|select|where|insert|update|delete|create|table";
const HASH_COMMENTS = /^(py|python|sh|bash|shell|zsh|yaml|yml|rb|ruby|toml|dockerfile|r|perl)$/i;

function tokenize(line: string, hashComments: boolean): React.ReactNode[] {
  const comment = hashComments ? String.raw`#.*$|\/\/.*$` : String.raw`\/\/.*$|\/\*.*?\*\/|<!--.*?-->`;
  const re = new RegExp(
    String.raw`(${comment})|("(?:[^"\\]|\\.)*"?|'(?:[^'\\]|\\.)*'?|` + "`(?:[^`\\\\]|\\\\.)*`?" + String.raw`)|(\b\d[\d_]*(?:\.\d+)?\b)|\b(${KEYWORDS})\b|([A-Za-z_$][\w$]*)(?=\()`,
    "g"
  );
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index));
    const tone = m[1] ? TONE.comment : m[2] ? TONE.string : m[3] ? TONE.number : m[4] ? TONE.keyword : TONE.call;
    out.push(
      <span key={m.index} className={tone}>
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
    if (m[0].length === 0) re.lastIndex++;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const useReducedMotion = () =>
  React.useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => false);

export function CodeBlock({
  code,
  language,
  filename,
  streaming = false,
  lineNumbers = true,
  collapseAfter = 18,
  onApply,
  applyLabel = "Apply",
  highlight = true,
  className = "",
  ...props
}: CodeBlockProps) {
  const reduced = useReducedMotion();
  const [copied, setCopied] = React.useState(false);
  const [wrap, setWrap] = React.useState(false);
  // Code you watched stream in stays open; only code that arrives complete (e.g. history) starts folded.
  const [expanded, setExpanded] = React.useState(streaming);
  const [apply, setApply] = React.useState<"idle" | "applying" | "applied">("idle");
  const [fullHeight, setFullHeight] = React.useState(0);
  const bodyRef = React.useRef<HTMLDivElement>(null);

  const lines = React.useMemo(() => code.replace(/\n$/, "").split("\n"), [code]);
  const hash = HASH_COMMENTS.test(language ?? "");
  const rendered = React.useMemo(
    () => lines.map((line) => (highlight ? tokenize(line, hash) : [line])),
    [lines, highlight, hash]
  );

  const foldable = !streaming && collapseAfter > 0 && lines.length > collapseAfter + 3;
  const folded = foldable && !expanded;
  const hidden = lines.length - collapseAfter;

  React.useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const measure = () => setFullHeight((h) => (h === body.scrollHeight ? h : body.scrollHeight));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(body.firstElementChild as Element);
    return () => observer.disconnect();
  }, [wrap]);

  React.useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      // Clipboard blocked; nothing to show.
    }
  };

  const runApply = async () => {
    if (!onApply || apply !== "idle") return;
    setApply("applying");
    try {
      await onApply();
      setApply("applied");
    } catch {
      setApply("idle");
    }
  };

  const gutter = String(lines.length).length;

  return (
    <div className={`w-full overflow-hidden rounded-[16px] border border-border bg-background ${className}`} {...props}>
      <div className="flex h-10 items-center gap-2 border-b border-border/70 pl-3.5 pr-1.5">
        <span className="min-w-0 flex-1 truncate font-mono text-[11.5px] text-muted-foreground">
          {filename ? (
            <>
              <span className="text-foreground/80">{filename}</span>
              {language && <span className="ml-2 opacity-70">{language}</span>}
            </>
          ) : (
            language ?? "code"
          )}
        </span>
        <button type="button" aria-label="Wrap lines" aria-pressed={wrap} onClick={() => setWrap((w) => !w)} className={`${ACTION} ${wrap ? "bg-accent text-foreground" : ""} w-7 justify-center px-0`}>
          <WrapText />
        </button>
        <button type="button" onClick={copy} aria-label={copied ? "Copied" : "Copy code"} className={ACTION}>
          <span className="relative flex size-3.5 items-center justify-center">
            <Copy className={`absolute transition-[opacity,transform] duration-200 ${copied ? "scale-50 opacity-0" : "opacity-100"}`} />
            <Check className={`absolute text-foreground transition-[opacity,transform] duration-200 ${copied ? "opacity-100" : "scale-50 opacity-0"}`} />
          </span>
          <span className="grid">
            <span className={`col-start-1 row-start-1 transition-opacity duration-200 ${copied ? "opacity-0" : ""}`}>Copy</span>
            <span className={`col-start-1 row-start-1 text-foreground transition-opacity duration-200 ${copied ? "" : "opacity-0"}`}>Copied</span>
          </span>
        </button>
        {onApply && (
          <button
            type="button"
            onClick={runApply}
            disabled={streaming || apply === "applying"}
            className={`inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-[12px] font-medium transition-[background-color,color,opacity,transform] duration-200 active:scale-[0.96] disabled:opacity-60 [&_svg]:size-3.5 ${FOCUS} ${
              apply === "applied" ? "bg-accent text-foreground" : "bg-primary text-primary-foreground"
            }`}
          >
            {apply === "applying" ? (
              <span aria-hidden="true" className="size-3 animate-spin rounded-full border-[1.5px] border-primary-foreground/40 border-t-primary-foreground motion-reduce:animate-none" />
            ) : apply === "applied" ? (
              <Check className="animate-[ui-pop-in_200ms_ease-out_both]" />
            ) : (
              <CornerDownLeft />
            )}
            {apply === "applied" ? "Applied" : apply === "applying" ? "Applying" : applyLabel}
          </button>
        )}
      </div>

      <div className="relative">
        <div
          ref={bodyRef}
          className="overflow-hidden"
          style={{
            // Only foldable code gets a height cap (animated between its start and its full height).
            maxHeight: foldable ? (folded ? PAD + collapseAfter * LINE : fullHeight || undefined) : undefined,
            transition: reduced ? "none" : `max-height 460ms ${EASE}`,
          }}
        >
          <pre
            className={`py-3 font-mono text-[12.5px] leading-[21px] text-foreground/90 [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin] ${wrap ? "whitespace-pre-wrap break-words" : "overflow-x-auto"}`}
            tabIndex={wrap ? undefined : 0}
            aria-label={`${language ?? "Code"}${filename ? `, ${filename}` : ""}`}
          >
            <code className="block min-w-fit">
              {rendered.map((tokens, i) => (
                <span key={i} className="flex">
                  {lineNumbers && (
                    <span
                      aria-hidden="true"
                      className="sticky left-0 shrink-0 select-none bg-background pl-3.5 pr-4 text-right tabular-nums text-muted-foreground/50"
                      style={{ width: `calc(${gutter}ch + 2.25rem)` }}
                    >
                      {i + 1}
                    </span>
                  )}
                  <span className={`min-w-0 ${lineNumbers ? "pr-4" : "px-4"} ${wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"}`}>
                    {tokens.length ? tokens : " "}
                    {streaming && i === rendered.length - 1 && (
                      <span aria-hidden="true" className="ml-px inline-block h-[15px] w-[7px] translate-y-[3px] bg-foreground/60 animate-[ui-blink_1s_steps(1)_infinite]" />
                    )}
                  </span>
                </span>
              ))}
            </code>
          </pre>
        </div>

        {foldable && (
          <div className={`flex justify-center ${folded ? "absolute inset-x-0 bottom-0 bg-gradient-to-t from-background from-30% to-transparent pb-2.5 pt-12" : "border-t border-border/60 py-1.5"}`}>
            <button type="button" onClick={() => setExpanded((e) => !e)} aria-expanded={expanded} className={ACTION}>
              <ChevronDown className="transition-transform duration-300" style={{ transform: expanded ? "rotate(180deg)" : "none", transitionTimingFunction: EASE }} />
              {expanded ? "Show less" : `Show ${hidden} more line${hidden === 1 ? "" : "s"}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
