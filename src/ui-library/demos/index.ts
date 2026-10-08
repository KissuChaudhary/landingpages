'use client';

import type React from 'react';
import PromptComposerDemo from './prompt-composer-demo';
import AttachmentChipDemo from './attachment-chip-demo';
import ModeSwitcherDemo from './mode-switcher-demo';
import VoiceInputDemo from './voice-input-demo';
import ThinkingIndicatorDemo from './thinking-indicator-demo';
import ThinkingTraceDemo from './thinking-trace-demo';
import ToolCallDemo from './tool-call-demo';
import ApprovalCardDemo from './approval-card-demo';
import PlanDemo from './plan-demo';
import TaskProgressDemo from './task-progress-demo';
import StreamingAnswerDemo from './streaming-answer-demo';
import CitationDemo from './citation-demo';
import ResponseVersionsDemo from './response-versions-demo';
import SelectionActionsDemo from './selection-actions-demo';
import DiffReviewDemo from './diff-review-demo';
import ChatNoticeDemo from './chat-notice-demo';
import UsageMeterDemo from './usage-meter-demo';

/** Live demo for each registry item, keyed by its registry name. Each receives the selected preview tab. */
export const UI_DEMOS: Record<string, React.ComponentType<{ tab?: string }>> = {
  'prompt-composer': PromptComposerDemo,
  'attachment-chip': AttachmentChipDemo,
  'mode-switcher': ModeSwitcherDemo,
  'voice-input': VoiceInputDemo,
  'thinking-indicator': ThinkingIndicatorDemo,
  'thinking-trace': ThinkingTraceDemo,
  'tool-call': ToolCallDemo,
  'approval-card': ApprovalCardDemo,
  'plan': PlanDemo,
  'task-progress': TaskProgressDemo,
  'streaming-answer': StreamingAnswerDemo,
  'citation': CitationDemo,
  'response-versions': ResponseVersionsDemo,
  'selection-actions': SelectionActionsDemo,
  'diff-review': DiffReviewDemo,
  'chat-notice': ChatNoticeDemo,
  'usage-meter': UsageMeterDemo,
};
