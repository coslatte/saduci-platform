import { cn, dataDisabledProps } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Container({
  className,
  size = "lg",
  disabled,
  ...props
}: ContainerProps & { disabled?: boolean }) {
  return (
    <div
      {...dataDisabledProps(disabled)}
      className={cn(
        "mx-auto w-full px-8 sm:px-12 lg:px-16",
        size === "sm"
          ? "max-w-3xl"
          : size === "md"
            ? "max-w-5xl"
            : size === "lg"
              ? "max-w-7xl"
              : size === "xl"
                ? "max-w-[96rem]"
                : "max-w-full",
        className,
      )}
      {...props}
    />
  );
}
