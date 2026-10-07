"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Language } from "@/site.config";

/* ------------------------------------------------------------------ highlighting */

type Kind = "plain" | "comment" | "string" | "keyword" | "function" | "number" | "variable" | "flag" | "punct";

const KEYWORDS: Record<Language, Set<string>> = {
  node: new Set(["import", "from", "const", "let", "await", "async", "new", "return", "export", "function", "true", "false", "null"]),
  python: new Set(["import", "from", "def", "return", "True", "False", "None", "as", "with"]),
  go: new Set(["func", "package", "import", "return", "map", "any", "string", "var", "type", "struct", "ctx"]),
  curl: new Set(["export", "curl"]),
};

const COMMENT_MARK: Record<Language, string> = { node: "//", python: "#", go: "//", curl: "#" };

const KIND_CLASS: Record<Kind, string> = {
  plain: "text-code",
  comment: "italic text-code-muted",
  string: "text-code-string",
  keyword: "text-code-keyword",
  function: "text-code-function",
  number: "text-code-number",
  variable: "text-code-variable",
  flag: "text-code-function",
  punct: "text-[#a3abba]",
};

// strings | $variables | numbers | function calls | identifiers | shell flags | punctuation
const TOKEN =
  /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\$[A-Za-z_]\w*)|(\b\d[\d_]*(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)(?=\()|([A-Za-z_][\w]*)|((?<=\s)-{1,2}[A-Za-z][\w-]*)|([{}()[\],.:;=<>+*&|!?\\])/g;

/** A deliberately small highlighter: enough for short, hand-written samples, with no dependency. */
function tokenize(line: string, language: Language): { text: string; kind: Kind }[] {
  if (line.trimStart().startsWith(COMMENT_MARK[language])) return [{ text: line, kind: "comment" }];

  const tokens: { text: string; kind: Kind }[] = [];
  let last = 0;
  for (const match of line.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) tokens.push({ text: line.slice(last, index), kind: "plain" });
    const [text, string, variable, number, call, word, flag] = match;
    let kind: Kind = "punct";
    if (string) kind = "string";
    else if (variable) kind = "variable";
    else if (number) kind = "number";
    else if (call) kind = KEYWORDS[language].has(call) ? "keyword" : "function";
    else if (word) kind = KEYWORDS[language].has(word) ? "keyword" : "plain";
    else if (flag) kind = "flag";
    tokens.push({ text, kind });
    last = index + text.length;
  }
  if (last < line.length) tokens.push({ text: line.slice(last), kind: "plain" });
  return tokens;
}

/**
 * Highlighted code with line numbers. When `focus` is set, lines outside that range dim and the
 * range gets a soft band with an accent edge.
 */
export function CodeLines({
  code,
  language,
  focus,
  className,
}: {
  code: string;
  language: Language;
  focus?: [number, number] | null;
  className?: string;
}) {
  const lines = code.split("\n");
  return (
    <pre className={cn("overflow-x-auto py-4 font-mono text-[12.5px] leading-[1.75] sm:text-[13px]", className)}>
      <code className="block min-w-max">
        {lines.map((line, index) => {
          const number = index + 1;
          const inFocus = !focus || (number >= focus[0] && number <= focus[1]);
          return (
            <span
              key={index}
              className={cn(
                "relative flex pr-6 transition-[opacity,background-color] duration-500 ease-mk",
                focus && inFocus ? "bg-white/[0.045]" : "",
                inFocus ? "opacity-100" : "opacity-35",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-0 left-0 w-[2px] transition-colors duration-500",
                  focus && inFocus ? "bg-code-keyword" : "bg-transparent",
                )}
              />
              <span aria-hidden="true" className="w-11 shrink-0 select-none pr-4 text-right text-code-muted/70">
                {number}
              </span>
              <span className="whitespace-pre">
                {line.length === 0
                  ? " "
                  : tokenize(line, language).map((token, tokenIndex) => (
                      <span key={tokenIndex} className={KIND_CLASS[token.kind]}>
                        {token.text}
                      </span>
                    ))}
              </span>
            </span>
          );
        })}
      </code>
    </pre>
  );
}

/* ------------------------------------------------------------------ copying */

export function CopyButton({ text, className, tone = "light", label = "Copy" }: { text: string; className?: string; tone?: "light" | "dark"; label?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access can be blocked (insecure origin, iframe policy). The text stays selectable.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors",
        tone === "light" ? "text-neutral-500 hover:bg-black/[0.05] hover:text-ink" : "text-code-muted hover:bg-white/[0.06] hover:text-code",
        className,
      )}
    >
      {copied ? <Check className={cn("size-4", tone === "light" ? "text-ok" : "text-code-string")} /> : <Copy className="size-[15px]" />}
    </button>
  );
}

/** The install command beside the primary button: a quiet pill with a one-click copy. */
export function InstallCommand({ command, className }: { command: string; className?: string }) {
  return (
    <div className={cn("surface inline-flex h-11 min-w-0 items-center gap-1 rounded-full border border-black/[0.04] pl-4 pr-1.5", className)}>
      <span aria-hidden="true" className="font-mono text-[13px] text-neutral-400">
        $
      </span>
      <code className="truncate font-mono text-[13px] text-ink">{command}</code>
      <CopyButton text={command} label={`Copy “${command}”`} className="ml-1 size-8" />
    </div>
  );
}

/* ------------------------------------------------------------------ windows */

/** The dark window used for code and terminals. */
export function DarkWindow({
  title,
  tabs,
  actions,
  children,
  className,
}: {
  title?: ReactNode;
  tabs?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-[22px] bg-night shadow-[0_40px_80px_-40px_rgba(15,23,42,0.6)] ring-1 ring-black/10", className)}>
      <div className="flex h-12 items-center gap-3 border-b border-white/[0.06] px-4">
        <span aria-hidden="true" className="flex shrink-0 gap-1.5">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="size-2.5 rounded-full bg-white/[0.12]" />
          ))}
        </span>
        {tabs ? <div className="hide-scrollbar flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">{tabs}</div> : null}
        {title ? <span className="min-w-0 flex-1 truncate text-center font-mono text-xs text-code-muted">{title}</span> : null}
        {actions ? <div className="ml-auto flex shrink-0 items-center gap-1">{actions}</div> : null}
      </div>
      {children}
    </div>
  );
}
