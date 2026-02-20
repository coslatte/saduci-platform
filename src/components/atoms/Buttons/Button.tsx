import { BaseButton, BaseButtonProps } from "./BaseButton";
import { cn } from "@/lib/utils";
import type { Size, Variant } from "@/lib/types";
import { variantClasses } from "./constants";
import React from "react";

export interface ButtonProps extends Omit<BaseButtonProps, "className"> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

const buttonVariantClasses: Record<Variant, string> = {
  ...variantClasses,
  success:
    "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus-visible:ring-green-500",
  circle:
    "rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200 active:bg-zinc-300 focus-visible:ring-zinc-400",
};

const buttonSizeClasses: Record<Size, string> = {
  xs: "h-7 px-2.5 text-xs gap-1",
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-9 px-4 text-sm gap-2",
  lg: "h-10 px-5 text-base gap-2",
  xl: "h-12 px-6 text-base gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      size={size}
      className={cn(
        "rounded-xl",
        buttonVariantClasses[variant],
        buttonSizeClasses[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    />
  );
}
