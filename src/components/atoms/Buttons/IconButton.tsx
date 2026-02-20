import { BaseButton, BaseButtonProps } from "./BaseButton";
import { cn } from "@/lib/utils";
import type { Size } from "@/lib/types";
import { variantClasses, IconButtonVariant } from "./constants";
import { ReactElement } from "react";

export interface IconButtonProps extends Omit<BaseButtonProps, "className"> {
  variant?: IconButtonVariant;
  size?: Size;
  icon: ReactElement;
  "aria-label": string;
  className?: string;
}

const iconButtonSizeClasses: Record<Size, { button: string; icon: string }> = {
  xs: { button: "size-7", icon: "text-xs" },
  sm: { button: "size-8", icon: "text-sm" },
  md: { button: "size-9", icon: "text-base" },
  lg: { button: "size-10", icon: "text-lg" },
  xl: { button: "size-12", icon: "text-xl" },
};

export function IconButton({
  variant = "secondary",
  size = "md",
  className,
  icon,
  ...props
}: IconButtonProps) {
  const { button: buttonSize, icon: iconSize } = iconButtonSizeClasses[size];

  return (
    <BaseButton
      size={size}
      className={cn(
        "rounded-full shrink-0",
        variantClasses[variant],
        buttonSize,
        className,
      )}
      {...props}
    >
      <span className={cn("inline-flex items-center justify-center", iconSize)}>
        {icon}
      </span>
    </BaseButton>
  );
}
