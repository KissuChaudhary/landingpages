import type { UiItem } from '../registry';

export const voiceInput: UiItem = {
  name: 'voice-input',
  title: 'Voice input',
  description: 'Dictate a prompt: a waveform from your real mic level, a timer, then transcribing.',
  summary:
    'Speaking is faster than typing, if you can tell the app is listening. It’s one surface from start to finish: the mic button stretches into the listening bar as the mic blurs into Stop. The bars are drawn from your microphone’s level, so they react to your voice rather than looping; the timer’s seconds roll, and words appear above as they’re recognised. Stop settles the waveform flat as "Transcribing" rises over it, then the bar shrinks back into the mic. If the browser blocks the mic, the icon crosses out and how to fix it opens beside it instead of failing silently.',
  file: 'voice-input.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['number-roll', 'text-morph'],
  css: ['@keyframes ui-sheen', '@keyframes ui-wave'],
  tabs: ['Live', 'In a composer', 'Blocked', 'Error'],
  states: [
    { name: 'idle', description: 'A mic button labelled "Dictate".' },
    { name: 'listening', description: 'The button stretches into a 44px bar over 520ms while the mic blurs into Stop; the waveform, a timer whose seconds roll and Cancel fade in once there’s room. The transcript so far opens above.' },
    { name: 'transcribing', description: 'Stop blurs into a spinner, the waveform settles flat and fades as "Transcribing" rises under a sweep of light; afterwards the bar shrinks back into the mic.' },
    { name: 'blocked', description: 'Microphone permission was denied: the mic blurs into a crossed-out one and where to allow it opens beside it, with Try again.' },
    { name: 'error', description: 'Nothing usable was heard; the title morphs to "Didn’t catch that", with Try again.' },
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
    { name: 'align', type: '"start" | "end"', default: '"start"', description: 'Which side the mic sits on; the bar grows from there. Use "end" for a mic beside Send.' },
  ],
  notes: [
    'Buttons are labelled "Dictate", "Stop and transcribe" and "Cancel"; listening and transcribing are announced as status.',
    'The waveform is decorative (aria-hidden); the timer and transcript carry the information.',
    'Blocked and error use role="alert". Give the component the width the bar should fill; the mic stretches across it from its own side: align="start" (default) grows rightwards, align="end" puts the mic beside Send and grows leftwards, mirroring the bar and the error line.',
    'Installs Number roll and Text morph. With reduced motion the bar changes size in place and the fallback wave holds still.',
  ],
};
