import type { UiItem } from '../registry';

export const voiceNote: UiItem = {
  name: 'voice-note',
  title: 'Voice note',
  description: 'A voice message you can scrub and read along with: the waveform fills, the time rolls, and the transcript highlights each word as it’s said.',
  summary:
    'Voice messages are quick to send and slow to receive: you can’t skim them, and you can’t listen in a meeting. This one arrives as a waveform that grows out of a flat line. Play and the triangle splits and squares off into pause, the bars fill as it plays and the time rolls up. Press anywhere on the waveform and drag: the bars under your finger swell like a lens and the time follows, and when you let go it carries on from there. The speed rolls from 1× to 1.5× and 2×. Open the transcript and a highlight glides from word to word as they’re said, the words still to come waiting in grey; tap a word and it plays from there. Only one voice note plays at a time on a page.',
  file: 'voice-note.tsx',
  dependencies: ['lucide-react'],
  registryDependencies: ['number-roll'],
  css: [],
  tabs: ['Chat', 'Voicemail'],
  states: [
    { name: 'arrive', description: 'The bars grow from 3px to their loudness (520ms), 7ms apart from left to right.' },
    { name: 'play / pause', description: 'One icon of two quads: the halves of the triangle slide and square off into the two pause bars (clip-path, 320ms). Bars fill left to right; the time counts up in rolling digits.' },
    { name: 'scrub', description: 'Pressing pauses it; the bars near the pointer scale up to 1.5× with a soft falloff (160ms) and the time shows where you are; releasing seeks there and plays on if it was playing.' },
    { name: 'speed', description: '1× → 1.5× → 2× roll in place; the pitch stays the same.' },
    { name: 'transcript', description: 'Folds open under the note (grid rows, 420ms). The current word’s highlight glides to the next word (260ms); words already said are in ink, the rest in grey. Tapping a word plays from its start.' },
    { name: 'end', description: 'Holds full for 500ms, then the fill runs back to the start (600ms) and the time rolls back to the length.' },
    { name: 'unread', description: 'A small dot by the time; it shrinks away the first time it plays.' },
  ],
  usage: `import { VoiceNote } from "@/components/voice-note";

<VoiceNote
  src="/notes/sam.mp3"
  label="Voice note from Sam"
  unread
  transcript={[{ text: "Hey,", start: 0.1 }, { text: "quick", start: 0.8 }, /* … */]}
/>`,
  recipeTitle: 'With a transcription API',
  recipeIntro: 'Store the word timings your speech-to-text returns next to the file, and the peaks too so the waveform shows before the audio loads.',
  recipe: `"use client";
import { VoiceNote } from "@/components/voice-note";

type Message = {
  audioUrl: string;
  seconds: number;
  peaks: number[]; // e.g. 96 loudness values worked out on upload
  words: { word: string; start: number }[]; // from Whisper, Deepgram, AssemblyAI…
  read: boolean;
};

export function VoiceMessage({ message, from }: { message: Message; from: string }) {
  return (
    <VoiceNote
      src={message.audioUrl}
      duration={message.seconds}
      peaks={message.peaks}
      transcript={message.words.map((w) => ({ text: w.word, start: w.start }))}
      unread={!message.read}
      label={\`Voice note from \${from}\`}
      onPlay={() => markRead(message)}
    />
  );
}`,
  props: [
    { name: 'src', type: 'string', description: 'The audio file.' },
    { name: 'peaks', type: 'number[]', description: 'Loudness from 0 to 1, any length; resampled to the bars that fit. Without them the file is fetched and decoded to work them out.' },
    { name: 'duration', type: 'number', description: 'Seconds, shown until the audio’s own length is known.' },
    { name: 'transcript', type: '{ text: string; start: number }[]', description: 'The words in order with when each is said. Adds the Transcript fold.' },
    { name: 'defaultTranscriptOpen', type: 'boolean', default: 'false', description: 'Start with the transcript open.' },
    { name: 'speeds', type: 'number[]', default: '[1, 1.5, 2]', description: 'What the speed pill steps through.' },
    { name: 'unread', type: 'boolean', default: 'false', description: 'Show the dot until it’s played.' },
    { name: 'label', type: 'string', default: '"Voice note"', description: 'Names the group for assistive tech, e.g. "Voice note from Sam".' },
    { name: 'onPlay / onEnded', type: '() => void', description: 'When it starts playing, and when it reaches the end.' },
  ],
  notes: [
    'The waveform is a slider: arrow keys move two seconds, Home and End go to the ends, and it reads its position as "0:04 of 0:11".',
    'The play button says Play or Pause, the speed pill says its speed, and the transcript is plain text in the page.',
    'Starting one voice note pauses any other on the page.',
    'Peaks given up front avoid downloading the whole file just to draw it; without them the audio is decoded once with Web Audio (the file has to be same-origin or allow CORS).',
    'Installs Number roll. With reduced motion the bars, icon, highlight and fold change in place.',
  ],
};
