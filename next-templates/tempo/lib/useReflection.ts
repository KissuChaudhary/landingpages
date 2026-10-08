"use client";
import { useEffect, useState } from "react";

const storageKey = "tempo-example-reflection-v1";
export function useReflection() {
  const [text, setValue] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    try {
      setValue(localStorage.getItem(storageKey) || "");
    } catch {
      /* Local storage is optional. */
    }
  }, []);
  function setText(value: string) {
    setValue(value);
    setMessage("");
  }
  function save() {
    if (!text.trim()) {
      setMessage("A word or two is enough to begin.");
      return;
    }
    try {
      localStorage.setItem(storageKey, text);
      setMessage("Saved in this browser. A little moment, kept.");
    } catch {
      setMessage(
        "Your browser couldn’t save this note. Keep a copy before leaving.",
      );
    }
  }
  function clear() {
    try {
      localStorage.removeItem(storageKey);
      setValue("");
      setMessage("A fresh little page. Your saved note was cleared.");
    } catch {
      setMessage("Your browser couldn’t clear the saved note.");
    }
  }
  return { text, setText, message, save, clear };
}
