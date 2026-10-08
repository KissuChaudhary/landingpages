import type { KeyboardEvent } from "react";
export function moveTab(
  event: KeyboardEvent,
  index: number,
  count: number,
  select: (index: number) => void,
  vertical = false,
) {
  const previous = vertical ? "ArrowUp" : "ArrowLeft",
    next = vertical ? "ArrowDown" : "ArrowRight";
  let target: number;
  if (event.key === previous) target = (index - 1 + count) % count;
  else if (event.key === next) target = (index + 1) % count;
  else if (event.key === "Home") target = 0;
  else if (event.key === "End") target = count - 1;
  else return;
  event.preventDefault();
  select(target);
  const buttons =
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]',
    );
  buttons?.[target]?.focus();
}
