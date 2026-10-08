'use client';

import type React from 'react';
import ThinkingTraceDemo from './thinking-trace-demo';
import StreamingAnswerDemo from './streaming-answer-demo';

/** Live demo for each registry item, keyed by its registry name. */
export const UI_DEMOS: Record<string, React.ComponentType<{ variant?: string }>> = {
  'thinking-trace': ThinkingTraceDemo,
  'streaming-answer': StreamingAnswerDemo,
};
