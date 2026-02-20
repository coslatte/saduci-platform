import { Spinner } from "../Spinner";
import type { Size } from "@/lib/types";
import { cn } from "@/lib/utils";
import { spinnerSizeMap } from "./constants";
import React from "react";

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  size?: Size;
  spinner?: React.ReactNode;
}

export const baseButtonStyles =
  "relative inline-flex items-center justify-center overflow-hidden font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

export function BaseButton({
  loading = false,
  size = "md",
  disabled,
  className,
  children,
  spinner,
  ...props
}: BaseButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(baseButtonStyles, className)}
      {...props}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center gap-[inherit] transition-all duration-150 w-full h-full",
          loading ? "scale-95 opacity-0" : "scale-100 opacity-100",
        )}
      >
        {children}
      </span>

      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-150 pointer-events-none",
          loading ? "scale-100 opacity-100" : "scale-75 opacity-0",
        )}
      >
        {spinner || <Spinner size={spinnerSizeMap[size]} label="Cargando..." />}
      </span>
    </button>
  );
}
