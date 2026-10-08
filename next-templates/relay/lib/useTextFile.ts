"use client";
import { useEffect, useState } from "react";

export function useTextFile(text: string) {
  const [file, setFile] = useState<{ text: string; url: string } | null>(null);
  useEffect(() => {
    if (!text) {
      setFile(null);
      return;
    }
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    setFile({ text, url });
    return () => URL.revokeObjectURL(url);
  }, [text]);
  return file?.text === text ? file.url : undefined;
}
