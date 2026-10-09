'use client';

import React from 'react';
import { Phone } from 'lucide-react';
import { VoiceNote, type VoiceNoteWord } from '../registry/voice-note';

const words = (list: [string, number][]): VoiceNoteWord[] => list.map(([text, start]) => ({ text, start }));

// Both notes were spoken by the system's text-to-speech voices; the timings came with them.
const PRICING = {
  src: '/ui-assets/voice-note/pricing.mp3',
  duration: 11.8,
  peaks: [0.03, 0.59, 0.65, 0.22, 0, 0, 0.21, 0.69, 0.14, 0.89, 0.49, 0.19, 0, 0, 0, 0, 0, 0, 0.55, 1, 0.92, 0.34, 0.92, 0.51, 0.83, 0.7, 0.77, 0.44, 0.62, 0.16, 0.77, 0.76, 0.74, 0.72, 0.8, 0.07, 0.52, 0.55, 0.1, 0.01, 0, 0, 0.48, 0.46, 0.51, 0.86, 0.68, 0.65, 0.75, 0.56, 0.62, 0.78, 0.69, 0.5, 0.75, 0.44, 0.15, 0, 0, 0, 0, 0, 0, 0.5, 0.58, 0.96, 0.69, 0.65, 0.77, 0.69, 0.31, 0.34, 0.87, 0.29, 0.84, 0.74, 0.67, 0.22, 0, 0, 0, 0, 0, 0, 0.05, 0.63, 0.71, 0.47, 0.13, 0.1, 0.01, 0, 0, 0, 0, 0],
  transcript: words([
    ['Hey,', 0.1], ['quick', 0.805], ['one.', 1.075], ['The', 2.255], ['new', 2.335], ['pricing', 2.555], ['page', 3.04], ['looks', 3.38], ['great', 3.645], ['on', 3.94], ['desktop,', 4.105],
    ['but', 5.18], ['the', 5.335], ['toggle', 5.435], ['jumps', 5.855], ['on', 6.19], ['my', 6.325], ['phone.', 6.495], ['Could', 7.77], ['you', 7.955], ['take', 8.075], ['a', 8.33], ['look', 8.405],
    ['before', 8.65], ['Friday?', 8.98], ['Thanks.', 10.35],
  ]),
};

const MAYA = {
  src: '/ui-assets/voice-note/maya.mp3',
  duration: 12.2,
  peaks: [0.02, 0.21, 0.59, 0.26, 0.02, 0.59, 0.2, 0.79, 0.64, 0.41, 0.09, 0.02, 0, 0, 0, 0, 0.01, 0.65, 0.62, 0.99, 0.56, 0.58, 0.41, 0.83, 0.66, 0.49, 0.66, 0.67, 0.67, 0.52, 0.71, 0.19, 0.8, 0.41, 0.62, 0.52, 0.71, 0.51, 0.06, 0.37, 0.73, 0.38, 0.6, 0.66, 0.38, 0.32, 0.61, 0.45, 0.03, 0, 0, 0, 0, 0, 0.01, 0.1, 0.51, 0.13, 0.51, 0.69, 0.75, 0.59, 0.66, 1, 0.78, 0.53, 0.59, 0.21, 0.67, 0.74, 0.69, 0.55, 0.62, 0.69, 0.81, 0.63, 0.09, 0.05, 0.02, 0, 0, 0, 0, 0, 0.03, 0.32, 0.73, 0.25, 0.54, 0.36, 0.03, 0, 0, 0, 0, 0],
  transcript: words([
    ['Hi,', 0.1], ['it’s', 0.655], ['Maya.', 0.86], ['My', 2.18], ['order', 2.385], ['was', 2.695], ['meant', 2.87], ['to', 3.155], ['arrive', 3.3], ['on', 3.755], ['Thursday', 3.93], ['and', 4.535],
    ['it', 4.725], ['still', 4.86], ['hasn’t', 5.23], ['come.', 5.695], ['Could', 6.98], ['someone', 7.295], ['call', 7.825], ['me', 8.155], ['back', 8.325], ['when', 8.635], ['you', 8.875], ['get', 9.02],
    ['a', 9.285], ['minute?', 9.35], ['Thank', 10.705], ['you.', 11.13],
  ]),
};

function Chat() {
  return (
    <div className="flex w-full max-w-[360px] flex-col gap-2">
      <p className="ml-auto max-w-[80%] rounded-[18px] rounded-br-[6px] bg-primary px-3 py-2 text-[13px] leading-snug text-primary-foreground">
        Did you get a chance to look at the new pricing page?
      </p>
      <div className="flex items-end gap-2">
        <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-[11px] font-medium text-foreground">
          S
        </span>
        <VoiceNote {...PRICING} unread label="Voice note from Sam" className="rounded-bl-[6px]" />
      </div>
      <p className="pl-9 text-[11px] text-muted-foreground">Sam · just now</p>
    </div>
  );
}

function Voicemail() {
  return (
    <div className="w-full max-w-[380px] rounded-[20px] border border-border bg-card p-3">
      <div className="mb-3 flex items-center gap-2.5">
        <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full border border-border bg-muted text-[11px] font-medium text-foreground">
          MC
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-foreground">Maya Chen</p>
          <p className="text-[11.5px] text-muted-foreground">Voicemail · 2 min ago</p>
        </div>
        <button type="button" className="inline-flex h-8 items-center gap-1.5 rounded-full bg-primary px-3 text-[12.5px] font-medium text-primary-foreground">
          <Phone aria-hidden="true" className="size-3.5" />
          Call back
        </button>
      </div>
      <VoiceNote {...MAYA} defaultTranscriptOpen label="Voicemail from Maya Chen" className="bg-background" />
    </div>
  );
}

export default function VoiceNoteDemo({ tab = 'Chat' }: { tab?: string }) {
  return (
    <div className="flex min-h-[260px] w-full flex-col items-center justify-center">
      {tab === 'Voicemail' ? <Voicemail /> : <Chat />}
    </div>
  );
}
