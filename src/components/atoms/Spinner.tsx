import { cn, dataDisabledProps } from "@/lib/utils";
import type { Size } from "@/lib/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface SpinnerProps {
  // we allow the full range of the generic Size type, including xl
  size?: Extract<Size, "xs" | "sm" | "md" | "lg" | "xl">;
  className?: string;
  label?: string;
  disabled?: boolean;
}

const sizeClasses: Record<string, string> = {
  xs: "size-3",
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-10", // extra large spinner
};

export function Spinner({
  size = "md",
  className,
  label = "Loading...",
  disabled,
}: SpinnerProps) {
  return (
    <AiOutlineLoading3Quarters
      {...dataDisabledProps(disabled)}
      className={cn(
        "animate-spin text-primary-600",
        sizeClasses[size],
        className,
      )}
      role="status"
      aria-label={label}
    />
  );
}
