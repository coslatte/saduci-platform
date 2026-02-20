"use client";

import { TestingBoard, TestingBoardProps } from "./TestingBoard";

// wrapper provided for backwards compatibility; directs to the unified component
export function TestingBoardVertical(
  props: Omit<TestingBoardProps, "direction">,
) {
  return <TestingBoard direction="vertical" {...props} />;
}
