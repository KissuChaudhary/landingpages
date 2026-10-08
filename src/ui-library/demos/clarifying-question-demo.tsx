'use client';

import React, { useState } from 'react';
import { ClarifyingQuestion, type QuestionAnswer } from '../registry/clarifying-question';

const SHOPS = [
  { id: 'main', label: 'Main Street', description: 'The original shop, open since 2009' },
  { id: 'harbour', label: 'Harbour Road', description: 'The new one, opening Saturday' },
  { id: 'both', label: 'Both shops', description: 'One plan, split by location' },
];

const CHANNELS = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'email', label: 'Email list', description: '2,400 subscribers' },
  { id: 'flyers', label: 'Flyers on the street' },
  { id: 'press', label: 'Local press' },
];

export default function ClarifyingQuestionDemo({ tab = 'Single' }: { tab?: string }) {
  const [answer, setAnswer] = useState<QuestionAnswer | null>(null);
  const [skipped, setSkipped] = useState(false);
  const multiple = tab === 'Multiple';
  const reply = answer ? [...answer.labels, answer.other].filter(Boolean).join(', ') : '';

  return (
    <div className="flex w-full max-w-[440px] flex-col gap-3">
      <p className="text-[13.5px] leading-relaxed text-foreground">
        {multiple ? 'I’ll draft the launch posts. Where should they go?' : 'I can draft the opening week plan. One thing first:'}
      </p>
      {tab === 'Answered' ? (
        <ClarifyingQuestion
          question="Which shop is this plan for?"
          options={SHOPS}
          answer={{ ids: ['harbour'], labels: ['Harbour Road'] }}
          onAnswer={() => {}}
        />
      ) : (
        <ClarifyingQuestion
          question={multiple ? 'Which channels should the launch use?' : 'Which shop is this plan for?'}
          detail={multiple ? 'Pick any. I’ll write one version for each.' : undefined}
          options={multiple ? CHANNELS : SHOPS}
          multiple={multiple}
          onAnswer={setAnswer}
          onSkip={() => setSkipped(true)}
        />
      )}
      {(answer || skipped) && (
        <p className="text-[13.5px] leading-relaxed text-muted-foreground animate-[ui-fade-up_320ms_cubic-bezier(0.23,1,0.32,1)_200ms_both]">
          {skipped ? 'Going with all four channels.' : multiple ? `Drafting for ${reply}.` : `Planning for ${reply}.`}
        </p>
      )}
    </div>
  );
}
