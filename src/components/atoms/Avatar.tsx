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
 * Used in X case: user identity previews in navbar and sidebar panels.
 */

export function Avatar({
  src,
  alt = "",
  name,
  size = "md",
  className,
  disabled,
}: AvatarProps) {
  const sizeClass =
    size === "xs"
      ? "size-6 text-(length:--font-size-xs)"
      : size === "sm"
        ? "size-8 text-(length:--font-size-sm)"
        : size === "md"
          ? "size-9 text-(length:--font-size-sm)"
          : size === "lg"
            ? "size-11 text-(length:--font-size-base)"
            : "size-14 text-(length:--font-size-lg)";

  if (src) {
    return (
      <div
        {...dataDisabledProps(disabled)}
        className={cn(
          "relative overflow-hidden rounded-full bg-zinc-200 border-2 border-transparent transition-all duration-150 transform group-hover:border-primary-600 group-hover:ring-2 group-hover:ring-primary-100 group-hover:scale-100",
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
        "inline-flex items-center justify-center rounded-full hover:border-primary-800 bg-primary-500 font-semibold  text-primary-950 transition-all duration-250 transform group-hover:scale-110 border-2 border-transparent group-hover:border-primary-900",
        sizeClass,
        className,
      )}
      aria-label={alt || name}
    >
      {name ? getInitials(name) : "?"}
    </div>
  );
}
