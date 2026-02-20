import type { Size, Variant } from "@/lib/types";

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

export const spinnerSizeMap: Record<Size, "xs" | "sm" | "md" | "lg"> = {
  xs: "xs",
  sm: "sm",
  md: "sm",
  lg: "md",
  xl: "md",
};
