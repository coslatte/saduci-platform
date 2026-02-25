import { cn, dataDisabledProps } from "@/lib/utils";
import type { Size } from "@/lib/types";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: Extract<Size, "xs" | "sm" | "md" | "lg" | "xl">;
  className?: string;
  disabled?: boolean;
}

const sizeClasses: Record<string, string> = {
  xs: "size-6 text-[length:var(--font-size-xs)]",
  sm: "size-8 text-[length:var(--font-size-sm)]",
  md: "size-9 text-[length:var(--font-size-sm)]",
  lg: "size-11 text-[length:var(--font-size-base)]",
  xl: "size-14 text-[length:var(--font-size-lg)]",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function Avatar({
  src,
  alt = "",
  name,
  size = "md",
  className,
  disabled,
}: AvatarProps) {
  const sizeClass = sizeClasses[size];

  if (src) {
    return (
      <div
        {...dataDisabledProps(disabled)}
        className={cn(
          "relative overflow-hidden rounded-full bg-zinc-200",
          sizeClass,
          className,
        )}
      >
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      {...dataDisabledProps(disabled)}
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        "bg-primary-100 font-semibold text-primary-700",
        sizeClass,
        className,
      )}
      aria-label={alt || name}
    >
      {name ? getInitials(name) : "?"}
    </div>
  );
}
