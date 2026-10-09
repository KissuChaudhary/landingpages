'use client';

import type React from 'react';
import TextMorphDemo from './text-morph-demo';
import StatusButtonDemo from './status-button-demo';
import NumberRollDemo from './number-roll-demo';
import PricingToggleDemo from './pricing-toggle-demo';
import WaitlistFieldDemo from './waitlist-field-demo';
import CodeInputDemo from './code-input-demo';
import MorphingNavDemo from './morphing-nav-demo';
import FeatureTabsDemo from './feature-tabs-demo';
import StatsBandDemo from './stats-band-demo';
import AnnouncementPillDemo from './announcement-pill-demo';
import TestimonialsDemo from './testimonials-demo';
import FaqAccordionDemo from './faq-accordion-demo';
import LogoMarqueeDemo from './logo-marquee-demo';
import CommandPaletteDemo from './command-palette-demo';
import ToastStackDemo from './toast-stack-demo';
import LiveActivityDemo from './live-activity-demo';
import ThemeToggleDemo from './theme-toggle-demo';
import PricingCalculatorDemo from './pricing-calculator-demo';
import ComparisonTableDemo from './comparison-table-demo';
import OnboardingChecklistDemo from './onboarding-checklist-demo';
import ChangelogTimelineDemo from './changelog-timeline-demo';
import ChangelogTraceDemo from './changelog-trace-demo';
import ChangelogScrubberDemo from './changelog-scrubber-demo';
import CookieBannerDemo from './cookie-banner-demo';
import NewsletterFooterDemo from './newsletter-footer-demo';
import PromptComposerDemo from './prompt-composer-demo';
import AgentComposerDemo from './agent-composer-demo';
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
import TaskLogDemo from './task-log-demo';
import StreamingAnswerDemo from './streaming-answer-demo';
import CodeBlockDemo from './code-block-demo';
import CitationDemo from './citation-demo';
import ResponseVersionsDemo from './response-versions-demo';
import SelectionActionsDemo from './selection-actions-demo';
import DiffReviewDemo from './diff-review-demo';
import ActionReceiptDemo from './action-receipt-demo';
import ChatNoticeDemo from './chat-notice-demo';
import UsageMeterDemo from './usage-meter-demo';
import UsageLimitsDemo from './usage-limits-demo';
import ChatScrollDemo from './chat-scroll-demo';
import MessageEditDemo from './message-edit-demo';
import ChatHistoryDemo from './chat-history-demo';
import EarningsChartDemo from './earnings-chart-demo';
import StepsChartDemo from './steps-chart-demo';
import RevenueChartDemo from './revenue-chart-demo';
import AreaChartDemo from './area-chart-demo';
import ComboChartDemo from './combo-chart-demo';
import StageBarsDemo from './stage-bars-demo';
import ActivityRingsDemo from './activity-rings-demo';
import AgentPlaybackDemo from './agent-playback-demo';

/** Live demo for each registry item, keyed by its registry name. Each receives the selected preview tab. */
export const UI_DEMOS: Record<string, React.ComponentType<{ tab?: string }>> = {
  'text-morph': TextMorphDemo,
  'status-button': StatusButtonDemo,
  'number-roll': NumberRollDemo,
  'pricing-toggle': PricingToggleDemo,
  'waitlist-field': WaitlistFieldDemo,
  'code-input': CodeInputDemo,
  'morphing-nav': MorphingNavDemo,
  'feature-tabs': FeatureTabsDemo,
  'stats-band': StatsBandDemo,
  'announcement-pill': AnnouncementPillDemo,
  'testimonials': TestimonialsDemo,
  'faq-accordion': FaqAccordionDemo,
  'logo-marquee': LogoMarqueeDemo,
  'command-palette': CommandPaletteDemo,
  'toast-stack': ToastStackDemo,
  'live-activity': LiveActivityDemo,
  'theme-toggle': ThemeToggleDemo,
  'pricing-calculator': PricingCalculatorDemo,
  'comparison-table': ComparisonTableDemo,
  'onboarding-checklist': OnboardingChecklistDemo,
  'changelog-timeline': ChangelogTimelineDemo,
  'changelog-trace': ChangelogTraceDemo,
  'changelog-scrubber': ChangelogScrubberDemo,
  'cookie-banner': CookieBannerDemo,
  'newsletter-footer': NewsletterFooterDemo,
  'prompt-composer': PromptComposerDemo,
  'agent-composer': AgentComposerDemo,
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
  'task-log': TaskLogDemo,
  'streaming-answer': StreamingAnswerDemo,
  'code-block': CodeBlockDemo,
  'citation': CitationDemo,
  'response-versions': ResponseVersionsDemo,
  'selection-actions': SelectionActionsDemo,
  'diff-review': DiffReviewDemo,
  'action-receipt': ActionReceiptDemo,
  'chat-notice': ChatNoticeDemo,
  'usage-meter': UsageMeterDemo,
  'usage-limits': UsageLimitsDemo,
  'chat-scroll': ChatScrollDemo,
  'message-edit': MessageEditDemo,
  'chat-history': ChatHistoryDemo,
  'earnings-chart': EarningsChartDemo,
  'steps-chart': StepsChartDemo,
  'revenue-chart': RevenueChartDemo,
  'area-chart': AreaChartDemo,
  'combo-chart': ComboChartDemo,
  'stage-bars': StageBarsDemo,
  'activity-rings': ActivityRingsDemo,
  'agent-playback': AgentPlaybackDemo,
};
