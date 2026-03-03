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

// Class name building blocks used by the component. Extracted to constants
// to make it straightforward to centralize or reuse styles later.
// No visual border/shadow by default. On hover (ancestor with `group`), show a
// subtle colored border + outer ring and a gentle scale for a "nice" effect.
const AVATAR_IMG_BASE =
  "relative overflow-hidden rounded-full bg-zinc-200 border-2 border-transparent transition-all duration-150 transform group-hover:border-primary-600 group-hover:ring-2 group-hover:ring-primary-100 group-hover:scale-105";
const AVATAR_FALLBACK_BASE =
  "inline-flex items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-700 border-2 border-transparent transition-all duration-150 transform group-hover:border-primary-600 group-hover:ring-2 group-hover:ring-primary-100 group-hover:scale-105";

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/**
 * Avatar
 *
 * Small avatar UI used across the app. It supports an `src` image or a
 * fallback that renders initials derived from `name`.
 *
 * @param props.src - optional image URL to render inside a rounded container
 * @param props.alt - alt text for the image; used as accessible label when no name
 * @param props.name - user's display name; used to compute initials when `src` is absent
 * @param props.size - visual size token (xs, sm, md, lg, xl)
 * @param props.className - optional className to merge with the component root
 * @param props.disabled - when true attaches `data-disabled` for styling/testing
 */

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
        className={cn(AVATAR_IMG_BASE, sizeClass, className)}
      >
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      {...dataDisabledProps(disabled)}
      className={cn(AVATAR_FALLBACK_BASE, sizeClass, className)}
      aria-label={alt || name}
    >
      {name ? getInitials(name) : "?"}
    </div>
  );
}
