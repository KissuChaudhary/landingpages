'use client';

import type React from 'react';
import PromptComposerDemo from './prompt-composer-demo';
import MentionMenuDemo from './mention-menu-demo';
import AttachmentChipDemo from './attachment-chip-demo';
import ModeSwitcherDemo from './mode-switcher-demo';
import ModelPickerDemo from './model-picker-demo';
import VoiceInputDemo from './voice-input-demo';
import ThinkingIndicatorDemo from './thinking-indicator-demo';
import ThinkingTraceDemo from './thinking-trace-demo';
import ToolCallDemo from './tool-call-demo';
import ClarifyingQuestionDemo from './clarifying-question-demo';
import ApprovalCardDemo from './approval-card-demo';
import PlanDemo from './plan-demo';
import WebResearchDemo from './web-research-demo';
import CommandOutputDemo from './command-output-demo';
import TaskProgressDemo from './task-progress-demo';
import StreamingAnswerDemo from './streaming-answer-demo';
import CodeBlockDemo from './code-block-demo';
import CitationDemo from './citation-demo';
import ResponseVersionsDemo from './response-versions-demo';
import SelectionActionsDemo from './selection-actions-demo';
import DiffReviewDemo from './diff-review-demo';
import ActionReceiptDemo from './action-receipt-demo';
import ChatNoticeDemo from './chat-notice-demo';
import UsageMeterDemo from './usage-meter-demo';
import ChatScrollDemo from './chat-scroll-demo';
import MessageEditDemo from './message-edit-demo';
import ChatHistoryDemo from './chat-history-demo';

/** Live demo for each registry item, keyed by its registry name. Each receives the selected preview tab. */
export const UI_DEMOS: Record<string, React.ComponentType<{ tab?: string }>> = {
  'prompt-composer': PromptComposerDemo,
  'mention-menu': MentionMenuDemo,
  'attachment-chip': AttachmentChipDemo,
  'mode-switcher': ModeSwitcherDemo,
  'model-picker': ModelPickerDemo,
  'voice-input': VoiceInputDemo,
  'thinking-indicator': ThinkingIndicatorDemo,
  'thinking-trace': ThinkingTraceDemo,
  'tool-call': ToolCallDemo,
  'clarifying-question': ClarifyingQuestionDemo,
  'approval-card': ApprovalCardDemo,
  'plan': PlanDemo,
  'web-research': WebResearchDemo,
  'command-output': CommandOutputDemo,
  'task-progress': TaskProgressDemo,
  'streaming-answer': StreamingAnswerDemo,
  'code-block': CodeBlockDemo,
  'citation': CitationDemo,
  'response-versions': ResponseVersionsDemo,
  'selection-actions': SelectionActionsDemo,
  'diff-review': DiffReviewDemo,
  'action-receipt': ActionReceiptDemo,
  'chat-notice': ChatNoticeDemo,
  'usage-meter': UsageMeterDemo,
  'chat-scroll': ChatScrollDemo,
  'message-edit': MessageEditDemo,
  'chat-history': ChatHistoryDemo,
};
