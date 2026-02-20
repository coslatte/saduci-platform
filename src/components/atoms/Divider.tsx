import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface DividerProps extends HTMLAttributes<HTMLHRElement | HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export function Divider({ className, orientation = "horizontal", ...props }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={cn("h-full w-px bg-zinc-200", className)}
        role="separator"
        aria-orientation="vertical"
        {...props}
      />
    );
  }
  return (
    <hr
      className={cn("w-full border-t border-zinc-200", className)}
      role="separator"
      aria-orientation="horizontal"
      {...props}
    />
  );
}
