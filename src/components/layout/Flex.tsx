import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  wrap?: "nowrap" | "wrap";
  gap?: string | number;
}

export function Flex({
  className,
  direction = "row",
  align,
  justify,
  wrap = "nowrap",
  gap,
  ...props
}: FlexProps) {
  const gapClass =
    gap === undefined
      ? undefined
      : typeof gap === "number"
        ? `gap-${gap}`
        : gap.startsWith("gap-")
          ? gap
          : `gap-${gap}`;

  return (
    <div
      className={cn(
        "flex",
        direction === "row" && "flex-row",
        direction === "col" && "flex-col",
        align === "start" && "items-start",
        align === "center" && "items-center",
        align === "end" && "items-end",
        align === "stretch" && "items-stretch",
        justify === "start" && "justify-start",
        justify === "center" && "justify-center",
        justify === "end" && "justify-end",
        justify === "between" && "justify-between",
        wrap === "nowrap" && "flex-nowrap",
        wrap === "wrap" && "flex-wrap",
        gapClass,
        className
      )}
      {...props}
    />
  );
}
