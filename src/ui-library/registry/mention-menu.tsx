"use client";

import * as React from "react";

/* ─────────────────────────────────────────────────────────
 * MENTIONS AND COMMANDS: @ for context, / for commands
 *
 *   closed     a plain prompt field
 *   open       type a trigger and a menu grows from the caret
 *   filtering  it narrows as you type; its height follows
 *   loading    async search: "Searching…" (earlier results stay)
 *   empty      "No matches for …"
 *   chip       Enter or Tab turns the typed "@q3-sa" into a chip
 *              right where it was typed
 *
 * A contentEditable field that reads like a textarea. Enter sends
 * (Shift+Enter for a new line); onSubmit gets the text, the
 * mentions and the ordered segments.
 * ───────────────────────────────────────────────────────── */

export interface MentionItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface MentionTrigger {
  /** The character that opens the menu, e.g. "@" or "/". */
  char: string;
  /** The menu's name, e.g. "Context" or "Commands". */
  label: string;
  /** The items, or a search (sync or async) that gets the query. */
  items: MentionItem[] | ((query: string) => MentionItem[] | Promise<MentionItem[]>);
  /** Only at the start of a line, like slash commands. */
  startOnly?: boolean;
  /** How the chip looks: a tinted mention or a mono command. */
  variant?: "mention" | "command";
}

export type MentionSegment = { type: "text"; text: string } | { type: "mention"; trigger: string; id: string; label: string };

export interface MentionValue {
  /** Plain text, with mentions written as "@label". */
  text: string;
  mentions: { trigger: string; id: string; label: string }[];
  segments: MentionSegment[];
}

export interface MentionInputHandle {
  focus: () => void;
  clear: () => void;
}

export interface MentionInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onSubmit" | "defaultValue"> {
  triggers: MentionTrigger[];
  defaultValue?: MentionSegment[];
  onChange?: (value: MentionValue) => void;
  /** Enter sends; Shift+Enter adds a line. Without it, Enter adds a line. */
  onSubmit?: (value: MentionValue) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Open the menu above the caret (composers at the bottom) or below it. */
  side?: "top" | "bottom";
  /** Open clear of this element (e.g. your composer) instead of over it. */
  anchorRef?: React.RefObject<HTMLElement | null>;
  ref?: React.Ref<MentionInputHandle>;
}

type Token = { node: Text; start: number; end: number };
type Menu = { trigger: MentionTrigger; query: string; left: number; top: number; bottom: number; width: number };

const EASE = "cubic-bezier(0.23,1,0.32,1)";
const MENU_WIDTH = 300;
const ROW = 36;
const MAX_ROWS = 5;
const CHIP =
  "mx-px inline-block rounded-md bg-primary/10 px-1 align-baseline font-medium text-primary [&>span]:opacity-55";
const COMMAND_CHIP =
  "mx-px inline-block rounded-md bg-muted px-1 align-baseline font-mono text-[0.92em] text-foreground [&>span]:opacity-45";
const ENTER = "animate-[ui-chip-in_280ms_cubic-bezier(0.23,1,0.32,1)_both] motion-reduce:animate-none";
const SHIMMER =
  "bg-[linear-gradient(90deg,color-mix(in_oklab,var(--muted-foreground)_55%,transparent)_35%,var(--foreground)_50%,color-mix(in_oklab,var(--muted-foreground)_55%,transparent)_65%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[ui-shimmer_1.4s_linear_infinite] motion-reduce:animate-none motion-reduce:bg-none motion-reduce:text-foreground/70";

function makeChip(trigger: MentionTrigger | { char: string; variant?: string }, id: string, label: string, animate: boolean) {
  const chip = document.createElement("span");
  chip.contentEditable = "false";
  chip.dataset.mention = trigger.char;
  chip.dataset.id = id;
  chip.dataset.label = label;
  chip.className = `${trigger.variant === "command" ? COMMAND_CHIP : CHIP}${animate ? ` ${ENTER}` : ""}`;
  const mark = document.createElement("span");
  mark.textContent = trigger.char;
  chip.append(mark, label);
  return chip;
}

/** Read the field back into ordered segments. Handles the <br> and <div> lines browsers insert. */
function serialize(root: HTMLElement): MentionSegment[] {
  const segments: MentionSegment[] = [];
  const text = (t: string) => {
    if (!t) return;
    const last = segments[segments.length - 1];
    if (last?.type === "text") last.text += t;
    else segments.push({ type: "text", text: t });
  };
  const walk = (parent: Node) => {
    parent.childNodes.forEach((node, i) => {
      if (node.nodeType === Node.TEXT_NODE) text((node as Text).data.replace(/ /g, " "));
      else if (node instanceof HTMLElement) {
        if (node.dataset.mention) segments.push({ type: "mention", trigger: node.dataset.mention, id: node.dataset.id ?? "", label: node.dataset.label ?? "" });
        else if (node.tagName === "BR") text("\n");
        else {
          if (i > 0 && (node.tagName === "DIV" || node.tagName === "P")) text("\n");
          walk(node);
        }
      }
    });
  };
  walk(root);
  const last = segments[segments.length - 1];
  if (last?.type === "text") last.text = last.text.replace(/\n$/, "");
  return segments.filter((s) => s.type === "mention" || s.text);
}

function toValue(segments: MentionSegment[]): MentionValue {
  return {
    segments,
    text: segments.map((s) => (s.type === "text" ? s.text : `${s.trigger}${s.label}`)).join(""),
    mentions: segments.flatMap((s) => (s.type === "mention" ? [{ trigger: s.trigger, id: s.id, label: s.label }] : [])),
  };
}

/** Best matches first: label starts with the query, then a word in it does, then it appears anywhere. */
function rank(items: MentionItem[], query: string) {
  const q = query.toLowerCase();
  if (!q) return items;
  const score = (item: MentionItem) => {
    const label = item.label.toLowerCase();
    if (label.startsWith(q)) return 0;
    if (label.split(/[\s\-_./]+/).some((w) => w.startsWith(q))) return 1;
    if (label.includes(q)) return 2;
    if (item.description?.toLowerCase().includes(q)) return 3;
    return -1;
  };
  return items
    .map((item) => ({ item, s: score(item) }))
    .filter((x) => x.s >= 0)
    .sort((a, b) => a.s - b.s)
    .map((x) => x.item);
}

function Highlight({ text, query }: { text: string; query: string }) {
  const i = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="font-semibold text-foreground">{text.slice(i, i + query.length)}</span>
      {text.slice(i + query.length)}
    </>
  );
}

export function MentionInput({
  triggers,
  defaultValue,
  onChange,
  onSubmit,
  placeholder = "Ask anything",
  disabled = false,
  side = "top",
  anchorRef,
  className = "",
  ref,
  ...props
}: MentionInputProps) {
  const id = React.useId();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const editorRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const rowRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const tokenRef = React.useRef<Token | null>(null);
  const dismissedRef = React.useRef<{ node: Text; start: number } | null>(null);
  const composingRef = React.useRef(false);

  const [menu, setMenu] = React.useState<Menu | null>(null);
  const [results, setResults] = React.useState<MentionItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const [height, setHeight] = React.useState<number | null>(null);
  const [highlight, setHighlight] = React.useState<{ top: number; ready: boolean }>({ top: 0, ready: false });

  const emit = React.useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const segments = serialize(editor);
    // Browsers leave a stray <br> behind when everything is deleted.
    if (!segments.length && editor.childNodes.length) editor.replaceChildren();
    onChange?.(toValue(segments));
  }, [onChange]);

  const closeMenu = React.useCallback(() => {
    tokenRef.current = null;
    setMenu(null);
  }, []);

  // Write the starting value once; after that the browser owns the field.
  React.useLayoutEffect(() => {
    const editor = editorRef.current;
    if (!editor || !defaultValue?.length) return;
    editor.replaceChildren(
      ...defaultValue.map((s) =>
        s.type === "text"
          ? document.createTextNode(s.text)
          : makeChip(triggers.find((t) => t.char === s.trigger) ?? { char: s.trigger }, s.id, s.label, false)
      )
    );
    emit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Is the caret just after a trigger and a query? Then open (or update) the menu at the trigger. */
  const detect = React.useCallback(() => {
    const editor = editorRef.current;
    const root = rootRef.current;
    const selection = window.getSelection();
    if (!editor || !root || !selection || !selection.rangeCount || !selection.isCollapsed || composingRef.current) return closeMenu();
    const node = selection.anchorNode;
    if (!node || node.nodeType !== Node.TEXT_NODE || !editor.contains(node)) return closeMenu();
    const textNode = node as Text;
    const before = textNode.data.slice(0, selection.anchorOffset);

    let found: { trigger: MentionTrigger; at: number } | null = null;
    for (const trigger of triggers) {
      const at = before.lastIndexOf(trigger.char);
      if (at < 0 || (found && at < found.at)) continue;
      const query = before.slice(at + 1);
      if (/\s/.test(query) || query.length > 48) continue;
      const previous = at > 0 ? before[at - 1] : null;
      const sibling = textNode.previousSibling;
      const lineStart = previous === "\n" || (at === 0 && (!sibling || (sibling instanceof HTMLElement && sibling.tagName === "BR")));
      const boundary = lineStart || (previous !== null ? /\s/.test(previous) : true);
      if (trigger.startOnly ? !lineStart : !boundary) continue;
      found = { trigger, at };
    }

    const dismissed = dismissedRef.current;
    if (!found || (dismissed && dismissed.node === textNode && dismissed.start === found.at)) return closeMenu();
    dismissedRef.current = null;

    tokenRef.current = { node: textNode, start: found.at, end: selection.anchorOffset };
    const range = document.createRange();
    range.setStart(textNode, found.at);
    range.setEnd(textNode, found.at + 1);
    const rect = range.getBoundingClientRect();
    const box = root.getBoundingClientRect();
    // Never wider than the field, and kept inside it.
    const width = Math.min(MENU_WIDTH, box.width);
    const left = Math.max(0, Math.min(rect.left - box.left - 10, box.width - width));
    const { trigger, at } = found;
    const edge = anchorRef?.current?.getBoundingClientRect();
    const query = before.slice(at + 1);
    setMenu((m) =>
      m && m.trigger === trigger && m.query === query && m.left === left && m.width === width
        ? m
        : {
            trigger,
            query,
            left,
            width,
            // Clear of the anchor when there is one (so it never covers the composer), else of the caret's line.
            top: (edge ? edge.bottom : rect.bottom) - box.top + 6,
            bottom: box.bottom - (edge ? edge.top : rect.top) + 6,
          }
    );
  }, [triggers, closeMenu, anchorRef]);

  // Results for the current trigger and query; stale async answers are dropped.
  const trigger = menu?.trigger;
  const query = menu?.query ?? "";
  React.useEffect(() => {
    if (!trigger) {
      setResults([]);
      setLoading(false);
      return;
    }
    let current = true;
    const source = trigger.items;
    const out = typeof source === "function" ? source(query) : rank(source, query);
    if (out instanceof Promise) {
      setLoading(true);
      out.then(
        (items) => current && (setResults(items), setLoading(false)),
        () => current && (setResults([]), setLoading(false))
      );
    } else {
      setResults(out);
      setLoading(false);
    }
    return () => {
      current = false;
    };
  }, [trigger, query]);

  React.useEffect(() => setActive(0), [results]);

  // The list's height follows its content.
  React.useLayoutEffect(() => {
    const inner = innerRef.current;
    if (!menu || !inner) {
      setHeight(null);
      return;
    }
    const measure = () => setHeight(inner.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(inner);
    return () => observer.disconnect();
  }, [menu !== null]); // eslint-disable-line react-hooks/exhaustive-deps

  // The highlight slides to the active row, and the row stays in view.
  React.useLayoutEffect(() => {
    const row = rowRefs.current[active];
    const list = listRef.current;
    if (!row || !list) return;
    const top = row.offsetTop;
    setHighlight((h) => (h.top === top && h.ready ? h : { top, ready: h.ready || results.length > 0 }));
    if (row.offsetTop < list.scrollTop) list.scrollTop = row.offsetTop - 4;
    else if (row.offsetTop + row.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = row.offsetTop + row.offsetHeight - list.clientHeight + 4;
  }, [active, results]);

  React.useEffect(() => {
    if (!menu) setHighlight({ top: 0, ready: false });
  }, [menu]);

  // Follow the caret while the field has focus.
  React.useEffect(() => {
    const onSelection = () => {
      if (document.activeElement === editorRef.current) detect();
    };
    document.addEventListener("selectionchange", onSelection);
    return () => document.removeEventListener("selectionchange", onSelection);
  }, [detect]);

  const select = (item: MentionItem) => {
    const token = tokenRef.current;
    const editor = editorRef.current;
    if (!token || !menu || !editor) return;
    const { node, start } = token;
    const range = document.createRange();
    range.setStart(node, start);
    range.setEnd(node, Math.min(token.end, node.length));
    range.deleteContents();
    const space = document.createTextNode(" ");
    range.insertNode(space);
    range.insertNode(makeChip(menu.trigger, item.id, item.label, true));
    const caret = document.createRange();
    caret.setStart(space, 1);
    caret.collapse(true);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(caret);
    closeMenu();
    emit();
  };

  const submit = () => {
    const editor = editorRef.current;
    if (!editor || !onSubmit) return;
    const segments = serialize(editor);
    if (!segments.length) return;
    onSubmit(toValue(segments));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.nativeEvent.isComposing || composingRef.current) return;
    if (menu) {
      const count = results.length;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (count) setActive((a) => (a + (e.key === "ArrowDown" ? 1 : -1) + count) % count);
        return;
      }
      if ((e.key === "Enter" || e.key === "Tab") && count) {
        e.preventDefault();
        select(results[active]);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        if (tokenRef.current) dismissedRef.current = { node: tokenRef.current.node, start: tokenRef.current.start };
        closeMenu();
        return;
      }
    }
    if (e.key === "Enter" && !e.shiftKey && onSubmit) {
      e.preventDefault();
      submit();
    }
  };

  React.useImperativeHandle(
    ref,
    () => ({
      focus: () => editorRef.current?.focus(),
      clear: () => {
        editorRef.current?.replaceChildren();
        closeMenu();
        emit();
      },
    }),
    [closeMenu, emit]
  );

  const listId = `${id}-list`;
  const optionId = (i: number) => `${id}-option-${i}`;
  const command = menu?.trigger.variant === "command";

  return (
    <div ref={rootRef} className={`relative ${className}`} {...props}>
      <div
        ref={editorRef}
        role="combobox"
        aria-label={placeholder}
        aria-expanded={menu !== null}
        aria-controls={menu ? listId : undefined}
        aria-activedescendant={menu && results.length ? optionId(active) : undefined}
        aria-autocomplete="list"
        aria-disabled={disabled || undefined}
        data-placeholder={placeholder}
        contentEditable={!disabled}
        suppressContentEditableWarning
        spellCheck
        onInput={() => {
          emit();
          detect();
        }}
        onKeyDown={onKeyDown}
        onBlur={closeMenu}
        onCompositionStart={() => (composingRef.current = true)}
        onCompositionEnd={() => {
          composingRef.current = false;
          detect();
        }}
        onPaste={(e) => {
          e.preventDefault();
          document.execCommand("insertText", false, e.clipboardData.getData("text/plain"));
        }}
        className="max-h-52 min-h-6 overflow-y-auto whitespace-pre-wrap outline-none [overflow-wrap:anywhere] empty:before:pointer-events-none empty:before:float-left empty:before:h-0 empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]"
      />

      {menu && (
        <div
          className="absolute z-50 overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-[0_0_0_1px_var(--border)] animate-[ui-pop-in_200ms_cubic-bezier(0.23,1,0.32,1)_both] motion-reduce:animate-none"
          style={{
            left: menu.left,
            width: menu.width,
            ...(side === "top" ? { bottom: menu.bottom, transformOrigin: "bottom left" } : { top: menu.top, transformOrigin: "top left" }),
            height: height ?? undefined,
            transition: `height 220ms ${EASE}`,
          }}
          // Keep the caret in the field while clicking the menu.
          onPointerDown={(e) => e.preventDefault()}
        >
          <div ref={innerRef} className="p-1">
            <div className="flex h-7 items-center justify-between px-2.5 text-[11.5px] text-muted-foreground">
              <span>{menu.trigger.label}</span>
              {loading && results.length > 0 && (
                <span aria-hidden="true" className="size-3 animate-spin rounded-full border-[1.5px] border-border border-t-muted-foreground motion-reduce:animate-none" />
              )}
            </div>
            <div
              ref={listRef}
              id={listId}
              role="listbox"
              aria-label={menu.trigger.label}
              className="relative overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ maxHeight: ROW * MAX_ROWS }}
            >
              {results.length > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-9 rounded-xl bg-accent"
                  style={{
                    transform: `translateY(${highlight.top}px)`,
                    transition: highlight.ready ? `transform 180ms ${EASE}` : "none",
                  }}
                />
              )}
              {results.map((item, i) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  id={optionId(i)}
                  role="option"
                  aria-selected={i === active}
                  onPointerMove={() => i !== active && setActive(i)}
                  onClick={() => select(item)}
                  className="relative flex h-9 cursor-pointer items-center gap-2.5 rounded-xl px-2.5 text-[13px]"
                >
                  {item.icon && (
                    <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-4 [&_svg]:stroke-[1.8]">
                      {item.icon}
                    </span>
                  )}
                  <span className={`max-w-[65%] shrink-0 truncate text-foreground/85 ${command ? "font-mono text-[12.5px]" : ""}`}>
                    {command && <span className="text-muted-foreground">{menu.trigger.char}</span>}
                    <Highlight text={item.label} query={menu.query} />
                  </span>
                  {item.description && <span className="min-w-0 flex-1 truncate text-[12px] text-muted-foreground">{item.description}</span>}
                </div>
              ))}
              {results.length === 0 && (
                <div role="status" className="flex h-9 items-center gap-2 px-2.5 text-[12.5px] text-muted-foreground">
                  {loading ? (
                    <>
                      <span aria-hidden="true" className="size-3 animate-spin rounded-full border-[1.5px] border-border border-t-muted-foreground motion-reduce:animate-none" />
                      <span className={SHIMMER}>Searching</span>
                    </>
                  ) : (
                    <span className="truncate">{menu.query ? `No matches for “${menu.query}”` : "Nothing here yet"}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
