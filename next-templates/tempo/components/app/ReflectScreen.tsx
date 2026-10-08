"use client";
import { useId } from "react";
import { Check, CornerDownLeft, Flower2, Trash2 } from "lucide-react";
import { useTempo } from "@/components/TempoProvider";

export function ReflectScreen() {
  const id = useId();
  const { text, setText, message, save, clear } = useTempo().reflection;
  return (
    <div className="app-screen reflect-screen">
      <p className="app-kicker">A MOMENT TO YOURSELF</p>
      <h3>
        Keep the good<span>.</span>
      </h3>
      <p className="app-subtitle">A few words about today.</p>
      <div className="journal-note">
        <Flower2 size={22} strokeWidth={1.3} />
        <label htmlFor={`${id}-reflection`}>What felt good today?</label>
        <textarea
          id={`${id}-reflection`}
          maxLength={300}
          value={text}
          placeholder="The morning light. An idea that clicked. A little time for myself…"
          onChange={(event) => setText(event.target.value)}
        />
        <span className="mono">{text.length} / 300</span>
      </div>
      <div className="reflection-actions">
        <button className="phone-action" onClick={save}>
          {message.startsWith("Saved") ? (
            <Check size={14} />
          ) : (
            <CornerDownLeft size={14} />
          )}
          Keep this moment
        </button>
        <button
          className="reflection-clear"
          aria-label="Clear saved reflection"
          onClick={clear}
        >
          <Trash2 size={13} />
        </button>
      </div>
      <p className="app-bottom-note" role="status">
        {message || "Your sample note stays in this browser."}
      </p>
    </div>
  );
}
