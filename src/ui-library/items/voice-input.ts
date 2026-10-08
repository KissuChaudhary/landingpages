import type { UiItem } from '../registry';

export const voiceInput: UiItem = {
  name: 'voice-input',
  title: 'Voice input',
  description: 'Dictate a prompt: a waveform from your real mic level, a timer, then transcribing.',
  summary:
    'Speaking is faster than typing, if you can tell the app is listening. The bars are drawn from your microphone’s level, so they react to your voice rather than looping. A timer runs, words appear as they’re recognised, and Stop sends it off to be transcribed. If the browser blocks the mic, it says how to fix that instead of failing silently.',
  file: 'voice-input.tsx',
  dependencies: ['lucide-react'],
  css: ['@keyframes ui-shimmer', '@keyframes ui-fade-in', '@keyframes ui-wave'],
  tabs: ['Live', 'Blocked', 'Error'],
  states: [
    { name: 'idle', description: 'A mic button labelled "Dictate".' },
    { name: 'listening', description: 'Stop, a scrolling waveform from level, the timer, Cancel, and the transcript so far.' },
    { name: 'transcribing', description: 'A spinner and "Transcribing" while the audio becomes text.' },
    { name: 'blocked', description: 'Microphone permission was denied; tells you where to allow it, with Try again.' },
    { name: 'error', description: 'Nothing usable was heard; Try again.' },
  ],
  usage: `import { VoiceInput } from "@/components/voice-input";

<VoiceInput status={status} level={level} startedAt={startedAt} onStart={start} onStop={stop} onCancel={cancel} />`,
  recipe: `// app/api/transcribe/route.ts
import { experimental_transcribe as transcribe } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const audio = new Uint8Array(await req.arrayBuffer());
  const { text } = await transcribe({ model: openai.transcription("whisper-1"), audio });
  return Response.json({ text });
}

// The client: record, measure the level, send the audio
"use client";
import { useRef, useState } from "react";
import { VoiceInput, type VoiceStatus } from "@/components/voice-input";

export function Dictate({ onText }: { onText: (text: string) => void }) {
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [level, setLevel] = useState(0);
  const [startedAt, setStartedAt] = useState<number>();
  const finish = useRef<(send: boolean) => void>(undefined);

  async function start() {
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      return setStatus("blocked");
    }
    const audio = new AudioContext();
    const analyser = audio.createAnalyser();
    audio.createMediaStreamSource(stream).connect(analyser);
    const samples = new Uint8Array(analyser.fftSize);
    const meter = setInterval(() => {
      analyser.getByteTimeDomainData(samples);
      setLevel(Math.max(...samples.map((v) => Math.abs(v - 128))) / 128);
    }, 80);

    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.start();
    setStartedAt(Date.now());
    setStatus("listening");

    finish.current = (send) => {
      clearInterval(meter);
      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        audio.close();
        if (!send) return setStatus("idle");
        setStatus("transcribing");
        try {
          const res = await fetch("/api/transcribe", { method: "POST", body: new Blob(chunks) });
          if (!res.ok) throw new Error(res.statusText);
          onText((await res.json()).text);
          setStatus("idle");
        } catch {
          setStatus("error");
        }
      };
      recorder.stop();
    };
  }

  return (
    <VoiceInput
      status={status}
      level={level}
      startedAt={startedAt}
      onStart={start}
      onStop={() => finish.current?.(true)}
      onCancel={() => finish.current?.(false)}
    />
  );
}`,
  props: [
    { name: 'status', type: '"idle" | "listening" | "transcribing" | "blocked" | "error"', description: 'Where dictation is.' },
    { name: 'level', type: 'number', description: 'Current mic level, 0 to 1. Each change adds a bar; without it the bars move in a gentle wave.' },
    { name: 'transcript', type: 'string', description: 'Words recognised so far, e.g. from the Web Speech API.' },
    { name: 'startedAt', type: 'number', description: 'When listening started (ms); shows the timer.' },
    { name: 'onStart / onStop / onCancel', type: '() => void', description: 'Mic button and Try again; Stop and transcribe; Cancel.' },
    { name: 'errorText', type: 'string', description: 'Overrides the blocked or error explanation.' },
  ],
  notes: [
    'Buttons are labelled "Dictate", "Stop and transcribe" and "Cancel"; listening and transcribing are announced as status.',
    'The waveform is decorative (aria-hidden); the timer and transcript carry the information.',
    'Blocked and error use role="alert". With reduced motion the fallback wave holds still.',
  ],
};
