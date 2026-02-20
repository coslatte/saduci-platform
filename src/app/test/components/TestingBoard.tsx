"use client";

import { ReactNode } from "react";

export interface TestingBoardProps {
  children: ReactNode;
  /**
   * Layout direction of the board. Horizontal is the default.
   */
  direction?: "horizontal" | "vertical";
  className?: string;
}

export function TestingBoard({
  children,
  direction = "horizontal",
  className = "",
}: TestingBoardProps) {
  const flexDir = direction === "vertical" ? "flex-col" : "flex-row";
  return (
    <div className={`flex flex-wrap gap-4 ${flexDir} ${className}`.trim()}>
      {children}
    </div>
  );
}
