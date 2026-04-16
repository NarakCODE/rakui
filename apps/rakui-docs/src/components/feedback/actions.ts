'use server';

import {
  blockFeedback,
  pageFeedback,
  type ActionResponse,
  type BlockFeedback,
  type PageFeedback,
} from './schema';

export async function onPageFeedbackAction(
  feedback: PageFeedback,
): Promise<ActionResponse> {
  pageFeedback.parse(feedback);
  return {};
}

export async function onBlockFeedbackAction(
  feedback: BlockFeedback,
): Promise<ActionResponse> {
  blockFeedback.parse(feedback);
  return {};
}
