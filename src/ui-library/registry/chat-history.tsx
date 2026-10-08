"use client";

import * as React from "react";
import { Pencil, Pin, PinOff, Search, SquarePen, Trash2, X } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * CHAT HISTORY: past conversations, findable and tidy
 *
 *   grouped    Pinned, Today, Yesterday, Previous 7 days,
 *              Previous 30 days, then by month
 *   new        a fresh chat shimmers "New chat" until its title
 *              is generated, then the title types itself in
 *   search     filters as you type and marks the match
 *   rename     the row turns into a field in place
 *   delete     the row folds into "Chat deleted · Undo"; it is
 *              only deleted once the undo window passes
 *
 * Rows are buttons; arrow keys move between them.
 * ───────────────────────────────────────────────────────── */

export interface ChatSummary {
  id: string;
  /** Empty while the title is being generated. */
  title?: string;
  updatedAt: number | Date;
  pinned?: boolean;
  /** True while the title is being generated. */
  generating?: boolean;
}

export interface ChatHistoryProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  chats: ChatSummary[];
  activeId?: string;
  onSelect: (id: string) => void;
  onNew?: () => void;
  onRename?: (id: string, title: string) => void;
  /** Called once the undo window has passed. */
  onDelete?: (id: string) => void;
  onPin?: (id: string, pinned: boolean) => void;
  /** How long Undo is offered after deleting (ms). */
  undoWindow?: number;
  searchable?: boolean;
  defaultQuery?: string;
}

const EASE = "cubic-bezier(0.23,1,0.32,1)";
const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";
const ICON = `flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground [&_svg]:size-3.5 ${FOCUS}`;
const SHIMMER =
  "bg-[linear-gradient(90deg,color-mix(in_oklab,var(--muted-foreground)_55%,transparent)_35%,var(--foreground)_50%,color-mix(in_oklab,var(--muted-foreground)_55%,transparent)_65%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[ui-shimmer_1.4s_linear_infinite] motion-reduce:animate-none motion-reduce:bg-none motion-reduce:text-foreground/70";

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const useReducedMotion = () =>
  React.useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => false);

const DAY = 86_400_000;
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

function bucket(date: Date, today: number) {
  const days = Math.round((today - startOfDay(date)) / DAY);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return "Previous 7 days";
  if (days < 30) return "Previous 30 days";
  return date.toLocaleDateString("en-US", { month: "long", year: new Date(today).getFullYear() === date.getFullYear() ? undefined : "numeric" });
}

function Mark({ text, query }: { text: string; query: string }) {
  const i = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-[3px] bg-primary/15 text-foreground">{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  );
}

/** Types a freshly generated title in, once; titles that were already there just show. */
function useArrivingTitle(title: string | undefined, generating: boolean, reduced: boolean) {
  const [shown, setShown] = React.useState(title ?? "");
  const waited = React.useRef(generating || !title);
  React.useEffect(() => {
    if (generating || !title) {
      waited.current = true;
      return;
    }
    if (!waited.current || reduced) {
      setShown(title);
      return;
    }
    waited.current = false;
    let i = 0;
    let frame = 0;
    const step = () => {
      i = Math.min(title.length, i + 1);
      setShown(title.slice(0, i));
      if (i < title.length) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [title, generating, reduced]);
  return shown;
}

function Row({
  chat,
  active,
  query,
  reduced,
  deleted,
  onSelect,
  onRename,
  onPin,
  onDelete,
  onUndo,
}: {
  chat: ChatSummary;
  active: boolean;
  query: string;
  reduced: boolean;
  deleted: boolean;
  onSelect: () => void;
  onRename?: (title: string) => void;
  onPin?: () => void;
  onDelete?: () => void;
  onUndo: () => void;
}) {
  const generating = Boolean(chat.generating || !chat.title);
  const title = useArrivingTitle(chat.title, generating, reduced);
  const [renaming, setRenaming] = React.useState(false);
  const [draft, setDraft] = React.useState("");
  const fieldRef = React.useRef<HTMLInputElement>(null);
  const rowRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!renaming) return;
    fieldRef.current?.focus();
    fieldRef.current?.select();
  }, [renaming]);

  const save = () => {
    const next = draft.trim();
    setRenaming(false);
    if (next && next !== chat.title) onRename?.(next);
    requestAnimationFrame(() => rowRef.current?.focus({ preventScroll: true }));
  };

  if (deleted) {
    return (
      <div className="flex h-9 items-center justify-between gap-2 rounded-xl px-3 text-[12.5px] text-muted-foreground animate-[ui-fade-in_200ms_ease-out_both]">
        <span role="status" className="truncate">
          Chat deleted
        </span>
        <button type="button" onClick={onUndo} className={`rounded font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground ${FOCUS}`}>
          Undo
        </button>
      </div>
    );
  }

  if (renaming) {
    return (
      <div className="flex h-9 items-center rounded-xl bg-background px-1 shadow-[0_0_0_1px_var(--border)] animate-[ui-fade-in_160ms_ease-out_both]">
        <input
          ref={fieldRef}
          value={draft}
          aria-label="Chat title"
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return;
            if (e.key === "Enter") {
              e.preventDefault();
              save();
            } else if (e.key === "Escape") {
              e.preventDefault();
              setDraft(chat.title ?? "");
              setRenaming(false);
              requestAnimationFrame(() => rowRef.current?.focus({ preventScroll: true }));
            }
          }}
          className="h-7 min-w-0 flex-1 rounded-lg bg-transparent px-2 text-[13px] text-foreground outline-none"
        />
      </div>
    );
  }

  return (
    <div className={`group/row relative flex h-9 items-center rounded-xl transition-colors ${active ? "bg-accent" : "hover:bg-accent/70 focus-within:bg-accent/70"}`}>
      <button
        ref={rowRef}
        type="button"
        data-chat=""
        aria-current={active ? "page" : undefined}
        onClick={onSelect}
        className={`flex h-9 min-w-0 flex-1 items-center rounded-xl pl-3 pr-2 text-left text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-ring/40 ${active ? "font-medium text-foreground" : "text-foreground/80"}`}
      >
        <span className="min-w-0 flex-1 truncate group-focus-within/row:[mask-image:linear-gradient(to_right,#000_calc(100%_-_4.5rem),transparent)] group-hover/row:[mask-image:linear-gradient(to_right,#000_calc(100%_-_4.5rem),transparent)]">
          {generating ? <span className={SHIMMER}>New chat</span> : <Mark text={title} query={query} />}
        </span>
      </button>
      {!generating && (onPin || onRename || onDelete) && (
        <span className="absolute right-1.5 flex items-center gap-0.5 opacity-0 transition-opacity duration-150 group-focus-within/row:opacity-100 group-hover/row:opacity-100 [@media(hover:none)]:opacity-100">
          {onPin && (
            <button type="button" aria-label={chat.pinned ? `Unpin ${chat.title}` : `Pin ${chat.title}`} onClick={onPin} className={ICON}>
              {chat.pinned ? <PinOff /> : <Pin />}
            </button>
          )}
          {onRename && (
            <button
              type="button"
              aria-label={`Rename ${chat.title}`}
              onClick={() => {
                setDraft(chat.title ?? "");
                setRenaming(true);
              }}
              className={ICON}
            >
              <Pencil />
            </button>
          )}
          {onDelete && (
            <button type="button" aria-label={`Delete ${chat.title}`} onClick={onDelete} className={`${ICON} hover:text-red-600`}>
              <Trash2 />
            </button>
          )}
        </span>
      )}
    </div>
  );
}

export function ChatHistory({
  chats,
  activeId,
  onSelect,
  onNew,
  onRename,
  onDelete,
  onPin,
  undoWindow = 5000,
  searchable = true,
  defaultQuery = "",
  className = "",
  ...props
}: ChatHistoryProps) {
  const reduced = useReducedMotion();
  const [query, setQuery] = React.useState(defaultQuery);
  const [deleted, setDeleted] = React.useState<Set<string>>(() => new Set());
  const [gone, setGone] = React.useState<Set<string>>(() => new Set());
  const timers = React.useRef(new Map<string, number>());
  const listRef = React.useRef<HTMLDivElement>(null);
  const [today, setToday] = React.useState(() => startOfDay(new Date()));

  React.useEffect(() => {
    const all = timers.current;
    return () => all.forEach((t) => window.clearTimeout(t));
  }, []);

  // Regroup at midnight.
  React.useEffect(() => {
    const timer = window.setTimeout(() => setToday(startOfDay(new Date())), today + DAY - Date.now() + 1000);
    return () => window.clearTimeout(timer);
  }, [today]);

  const remove = (id: string) => {
    setDeleted((d) => new Set(d).add(id));
    timers.current.set(
      id,
      window.setTimeout(() => {
        timers.current.delete(id);
        setGone((g) => new Set(g).add(id));
        // Let the row fold away before the parent drops it.
        window.setTimeout(() => onDelete?.(id), reduced ? 0 : 360);
      }, undoWindow)
    );
  };

  const undo = (id: string) => {
    window.clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setDeleted((d) => {
      const next = new Set(d);
      next.delete(id);
      return next;
    });
  };

  const q = query.trim().toLowerCase();
  const visible = chats.filter((c) => !q || (c.title ?? "").toLowerCase().includes(q));
  const groups = new Map<string, ChatSummary[]>();
  for (const chat of [...visible].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))) {
    const name = chat.pinned ? "Pinned" : bucket(new Date(chat.updatedAt), today);
    groups.set(name, [...(groups.get(name) ?? []), chat]);
  }
  const ordered = [...groups.entries()].sort(([a], [b]) => (a === "Pinned" ? -1 : b === "Pinned" ? 1 : 0));

  // Up and down move between chats.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    if (e.target instanceof HTMLInputElement && e.key === "ArrowUp") return;
    const rows = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>("[data-chat]") ?? []);
    if (!rows.length) return;
    e.preventDefault();
    const i = rows.indexOf(document.activeElement as HTMLButtonElement);
    const next = e.key === "ArrowDown" ? (i < 0 ? 0 : Math.min(rows.length - 1, i + 1)) : Math.max(0, i - 1);
    rows[next]?.focus();
  };

  return (
    <nav aria-label="Chat history" onKeyDown={onKeyDown} className={`flex min-h-0 flex-col ${className}`} {...props}>
      {(searchable || onNew) && (
        <div className="flex items-center gap-1.5 pb-2">
          {searchable && (
            <label className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-xl border border-border px-3 transition-colors focus-within:border-foreground/25">
              <Search aria-hidden="true" className="size-3.5 shrink-0 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && setQuery("")}
                placeholder="Search chats"
                aria-label="Search chats"
                className="h-full min-w-0 flex-1 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className={`-mr-1.5 ${ICON}`}>
                  <X />
                </button>
              )}
            </label>
          )}
          {onNew && (
            <button
              type="button"
              aria-label="New chat"
              onClick={onNew}
              className={`flex size-9 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground [&_svg]:size-4 ${FOCUS}`}
            >
              <SquarePen />
            </button>
          )}
        </div>
      )}

      <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin]">
        {ordered.length === 0 && (
          <p role="status" className="px-3 py-6 text-center text-[12.5px] text-muted-foreground">
            {q ? `No chats match “${query.trim()}”` : "No chats yet"}
          </p>
        )}
        {ordered.map(([name, items]) => (
          <section key={name} aria-label={name} className="pb-2">
            <h3 className="px-3 pb-1 pt-2 text-[11.5px] font-medium text-muted-foreground">{name}</h3>
            <ul>
              {items.map((chat) => (
                <li
                  key={chat.id}
                  className="grid"
                  style={{
                    gridTemplateRows: gone.has(chat.id) ? "0fr" : "1fr",
                    opacity: gone.has(chat.id) ? 0 : 1,
                    transition: reduced ? "none" : `grid-template-rows 340ms ${EASE}, opacity 240ms ease-out`,
                  }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="animate-[ui-fade-up_280ms_cubic-bezier(0.23,1,0.32,1)_both] motion-reduce:animate-none">
                      <Row
                        chat={chat}
                        active={chat.id === activeId}
                        query={q}
                        reduced={reduced}
                        deleted={deleted.has(chat.id)}
                        onSelect={() => onSelect(chat.id)}
                        onRename={onRename ? (title) => onRename(chat.id, title) : undefined}
                        onPin={onPin ? () => onPin(chat.id, !chat.pinned) : undefined}
                        onDelete={onDelete ? () => remove(chat.id) : undefined}
                        onUndo={() => undo(chat.id)}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </nav>
  );
}
