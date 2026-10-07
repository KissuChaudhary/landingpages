import { useTransform, type MotionValue } from 'framer-motion';
import { clamp } from './math';

/**
 * Map a scroll-progress MotionValue through a range.
 *
 * We deliberately use the *function* form of useTransform. The array form gets hardware-accelerated
 * through ScrollTimeline, which does not hold its end value once you scroll past the range: elements
 * that should stay hidden (or stay moved) pop back to their base style. The function form always clamps.
 */
export function useRange(
  progress: MotionValue<number>,
  input: [number, number],
  output: [number, number],
  ease?: (t: number) => number,
) {
  return useTransform(progress, (v) => {
    const t = clamp((v - input[0]) / (input[1] - input[0]));
    const e = ease ? ease(t) : t;
    return output[0] + (output[1] - output[0]) * e;
  });
}
