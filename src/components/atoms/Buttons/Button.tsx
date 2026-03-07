import { BaseButton, BaseButtonProps } from "./BaseButton";
import { cn } from "@/lib/utils";
import type { Size, Variant } from "@/lib/types";
import React from "react";

export interface ButtonProps extends Omit<BaseButtonProps, "className"> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Button
 *
 * High-level button component exposing `variant` and `size` tokens used by the
 * design system. It composes `BaseButton` and applies variant/size utility
 * classes.
 */
export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus-visible:ring-primary-500"
      : variant === "secondary"
        ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:bg-zinc-300 focus-visible:ring-zinc-400"
        : variant === "outline"
          ? "border border-zinc-300 bg-transparent text-zinc-700 hover:bg-zinc-50 active:bg-zinc-100 focus-visible:ring-zinc-400"
          : variant === "ghost"
            ? "bg-transparent text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200 focus-visible:ring-zinc-400"
            : variant === "danger"
              ? "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500"
              : variant === "success"
                ? "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus-visible:ring-green-500"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 active:bg-zinc-300 focus-visible:ring-zinc-400";

  const sizeClass =
    size === "xs"
      ? "h-7 px-2.5 text-(length:--font-size-xs) gap-1"
      : size === "sm"
        ? "h-8 px-3 text-(length:--font-size-sm) gap-1.5"
        : size === "md"
          ? "h-9 px-4 text-(length:--font-size-sm) gap-2"
          : size === "lg"
            ? "h-10 px-5 text-(length:--font-size-base) gap-2"
            : "h-12 px-6 text-(length:--font-size-base) gap-2.5";

  return (
    <BaseButton
      size={size}
      className={cn(
        variant === "circle" ? "rounded-full" : "rounded-xl",
        variantClass,
        sizeClass,
        fullWidth && "w-full",
        className,
      )}
      {...props}
    />
  );
}
