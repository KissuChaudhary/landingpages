import type { UiItem } from '../registry';
import { promptComposer } from './prompt-composer';
import { attachmentChip } from './attachment-chip';
import { modeSwitcher } from './mode-switcher';
import { voiceInput } from './voice-input';
import { thinkingIndicator } from './thinking-indicator';
import { thinkingTrace } from './thinking-trace';
import { toolCall } from './tool-call';
import { approvalCard } from './approval-card';
import { plan } from './plan';
import { taskProgress } from './task-progress';
import { streamingAnswer } from './streaming-answer';
import { citation } from './citation';
import { responseVersions } from './response-versions';
import { selectionActions } from './selection-actions';
import { diffReview } from './diff-review';
import { chatNotice } from './chat-notice';
import { usageMeter } from './usage-meter';

/** Order within each group is the order on /ui. */
export const items: UiItem[] = [promptComposer, attachmentChip, modeSwitcher, voiceInput, thinkingIndicator, thinkingTrace, toolCall, approvalCard, plan, taskProgress, streamingAnswer, citation, responseVersions, selectionActions, diffReview, chatNotice, usageMeter];
