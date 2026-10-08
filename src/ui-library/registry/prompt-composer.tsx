"use client";

import * as React from "react";
import { ArrowUp, Paperclip, Square } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * PROMPT COMPOSER: where the conversation starts
 *
 *   ready      type; Enter sends, Shift+Enter adds a line
 *   submitted  sent, waiting for the first token
 *   streaming  the send button becomes Stop
 *   error      ready to try again
 *   disabled   with a reason, e.g. a rate limit
 *
 * status takes useChat's status as is. Files come in through the
 * paperclip, paste or drag and drop; render them as chips in the
 * attachments slot. The toolbar slot fits a mode switcher.
 * ───────────────────────────────────────────────────────── */

export type ComposerStatus = "ready" | "submitted" | "streaming" | "error";

export interface PromptComposerProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit" | "defaultValue"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSubmit: (value: string) => void;
  onStop?: () => void;
  /** Pass useChat's status straight through. */
  status?: ComposerStatus;
  placeholder?: string;
  disabled?: boolean;
  /** Shown above the input while disabled, e.g. "You've reached today's limit." */
  disabledReason?: React.ReactNode;
  /** Enables the paperclip, paste and drop. */
  onFilesSelected?: (files: File[]) => void;
  accept?: string;
  /** Attachment chips, shown above the text. */
  attachments?: React.ReactNode;
  /** Controls at the bottom left, e.g. a mode switcher. */
  toolbar?: React.ReactNode;
  maxLength?: number;
  /** Allow sending with no text, e.g. when files are attached. */
  allowEmpty?: boolean;
  autoFocus?: boolean;
}

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

export function PromptComposer({
  value,
  defaultValue = "",
  onValueChange,
  onSubmit,
  onStop,
  status = "ready",
  placeholder = "Ask anything",
  disabled = false,
  disabledReason,
  onFilesSelected,
  accept,
  attachments,
  toolbar,
  maxLength,
  allowEmpty = false,
  autoFocus,
  className = "",
  ...props
}: PromptComposerProps) {
  const [own, setOwn] = React.useState(defaultValue);
  const [dragging, setDragging] = React.useState(false);
  const text = value ?? own;
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const busy = status === "submitted" || status === "streaming";
  const canSend = !disabled && !busy && (allowEmpty || text.trim().length > 0) && (maxLength === undefined || text.length <= maxLength);

  const setText = (next: string) => {
    if (value === undefined) setOwn(next);
    onValueChange?.(next);
  };

  // Grow with the text, up to a scrolling maximum.
  React.useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [text]);

  const submit = () => {
    if (!canSend) return;
    onSubmit(text);
    if (value === undefined) setOwn("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit();
    }
  };

  const takeFiles = (list: FileList | null) => {
    if (!list || list.length === 0 || !onFilesSelected) return false;
    onFilesSelected(Array.from(list));
    return true;
  };

  const action = busy ? (status === "streaming" && onStop ? "stop" : "wait") : "send";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      onDragOver={(e) => {
        if (!onFilesSelected || !e.dataTransfer.types.includes("Files")) return;
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragging(false);
      }}
      onDrop={(e) => {
        if (!onFilesSelected) return;
        e.preventDefault();
        setDragging(false);
        takeFiles(e.dataTransfer.files);
      }}
      className={`relative rounded-2xl border bg-background transition-colors focus-within:border-foreground/25 ${
        dragging ? "border-dashed border-foreground/40" : "border-border"
      } ${className}`}
      {...props}
    >
      {disabled && disabledReason && (
        <div className="border-b border-border px-3.5 py-2 text-[12px] text-muted-foreground animate-[ui-fade-in_250ms_ease-out_both]">{disabledReason}</div>
      )}

      {attachments && <div className="flex flex-wrap gap-2 px-3 pt-3">{attachments}</div>}

      <textarea
        ref={textareaRef}
        rows={1}
        value={text}
        autoFocus={autoFocus}
        disabled={disabled}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        onPaste={(e) => {
          if (takeFiles(e.clipboardData.files) && !e.clipboardData.getData("text")) e.preventDefault();
        }}
        className="block max-h-[200px] w-full resize-none overflow-y-auto bg-transparent px-3.5 pb-1 pt-3 text-[14px] leading-6 text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-60"
      />

      <div className="flex items-center gap-1.5 px-2 pb-2 pt-1">
        {onFilesSelected && (
          <>
            <button
              type="button"
              aria-label="Attach files"
              disabled={disabled}
              onClick={() => fileRef.current?.click()}
              className={`flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-40 ${FOCUS}`}
            >
              <Paperclip className="size-4" />
            </button>
            <input
              ref={fileRef}
              type="file"
              multiple
              accept={accept}
              className="hidden"
              onChange={(e) => {
                takeFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </>
        )}
        {toolbar}

        <div className="ml-auto flex items-center gap-2.5">
          {maxLength !== undefined && text.length > maxLength * 0.8 && (
            <span className={`font-mono text-[11px] tabular-nums ${text.length > maxLength ? "text-red-500" : "text-muted-foreground"}`}>
              {text.length}/{maxLength}
            </span>
          )}
          <button
            type={action === "send" ? "submit" : "button"}
            aria-label={action === "stop" ? "Stop" : action === "wait" ? "Sending" : "Send"}
            disabled={action === "send" ? !canSend : action === "wait"}
            onClick={action === "stop" ? onStop : undefined}
            className={`relative flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-[opacity,transform] duration-200 active:scale-95 disabled:opacity-35 ${FOCUS}`}
          >
            <ArrowUp
              aria-hidden="true"
              className={`absolute size-4 transition-[opacity,transform] duration-200 ${action === "send" ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
            />
            <Square
              aria-hidden="true"
              fill="currentColor"
              className={`absolute size-3 transition-[opacity,transform] duration-200 ${action === "stop" ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
            />
            <span
              aria-hidden="true"
              className={`absolute size-3.5 rounded-full border-[1.5px] border-current/35 border-t-current transition-opacity duration-200 ${
                action === "wait" ? "animate-spin opacity-100 motion-reduce:animate-none" : "opacity-0"
              }`}
            />
          </button>
        </div>
      </div>

      {dragging && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-background/85 text-[13px] font-medium text-foreground">
          Drop files to attach
        </div>
      )}
    </form>
  );
}
