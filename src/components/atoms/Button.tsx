import { cn } from "@/lib/utils";
import type { Size, Variant } from "@/lib/types";
import { Spinner } from "./Spinner";
import type { ReactElement } from "react";

export type IconButtonVariant = Exclude<Variant, "circle">;

export const variantClasses: Record<IconButtonVariant, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus-visible:ring-primary-500",
  secondary:
    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:bg-zinc-300 focus-visible:ring-zinc-400",
  outline:
    "border border-zinc-300 bg-transparent text-zinc-700 hover:bg-zinc-50 active:bg-zinc-100 focus-visible:ring-zinc-400",
  ghost:
    "bg-transparent text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200 focus-visible:ring-zinc-400",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500",
};

/** Spinner size for each button size. */
export const spinnerSizeMap: Record<Size, "xs" | "sm" | "md" | "lg"> = {
  xs: "xs",
  sm: "sm",
  md: "sm",
  lg: "md",
  xl: "md",
};

// ─── Button ───────────────────────────────────────────────────────────────────

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const buttonBase =
  "relative inline-flex items-center justify-center overflow-hidden rounded-lg font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const buttonVariantClasses: Record<Variant, string> = {
  ...variantClasses,
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
  loading = false,
  fullWidth = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        buttonBase,
        buttonVariantClasses[variant],
        buttonSizeClasses[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {/* Label — fades out when loading */}
      <span
        className={cn(
          "inline-flex items-center gap-[inherit] transition-all duration-150",
          loading ? "scale-95 opacity-0" : "scale-100 opacity-100",
        )}
      >
        {children}
      </span>

      {/* Spinner overlay — fades in when loading */}
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-150",
          loading ? "scale-100 opacity-100" : "scale-75 opacity-0",
        )}
      >
        <Spinner size={spinnerSizeMap[size]} label="Cargando..." />
      </span>
    </button>
  );
}

// ─── IconButton ───────────────────────────────────────────────────────────────

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Color variant — same palette as Button. Always renders as a circle. */
  variant?: IconButtonVariant;
  size?: Size;
  loading?: boolean;
  /** Icon element to render (e.g. from react-icons). Text children are ignored. */
  icon: ReactElement;
  /** Required for accessibility since the button has no visible text label. */
  "aria-label": string;
}

const iconButtonBase =
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

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
  loading = false,
  disabled,
  className,
  icon,
  ...props
}: IconButtonProps) {
  const { button: buttonSize, icon: iconSize } = iconButtonSizeClasses[size];

  return (
    <button
      disabled={disabled || loading}
      className={cn(iconButtonBase, variantClasses[variant], buttonSize, className)}
      {...props}
    >
      {/* Icon — fades out when loading */}
      <span
        className={cn(
          "inline-flex items-center justify-center transition-all duration-150",
          iconSize,
          loading ? "scale-75 opacity-0" : "scale-100 opacity-100",
        )}
      >
        {icon}
      </span>

      {/* Spinner overlay — fades in when loading */}
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-150",
          loading ? "scale-100 opacity-100" : "scale-75 opacity-0",
        )}
      >
        <Spinner size={spinnerSizeMap[size]} label="Cargando..." />
      </span>
    </button>
  );
}
