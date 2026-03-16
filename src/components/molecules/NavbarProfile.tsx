"use client";

import Link from "next/link";
import { Avatar } from "@/components/atoms/Avatar";
import { Text } from "@/components/atoms/Text";
import { NAVBAR_PROFILE_SETTINGS } from "@/constants/constants";
import { cn } from "@/lib/utils";

export interface NavbarProfileProps {
  /** Display name of the current user. */
  userName: string;
  /** Optional avatar image URL for the current user. */
  userAvatar?: string;
  /** Label describing the current user status (e.g. "Sesión activa"). */
  roleLabel: string;
  /** Link destination when clicking on the profile block. */
  href: string;
  /** Optional aria-label for the profile link. */
  ariaLabel?: string;
  /** Optional additional className for the root element. */
  className?: string;
}

/**
 * NavbarProfile
 *
 * UI block used in the top navbar to show the current user avatar, name and
 * status badge.
 *
 * @param props - NavbarProfileProps
 *
 * @example
 * <NavbarProfile
 *   userName="Ana Pérez"
 *   userAvatar="/avatars/ana.png"
 *   roleLabel="Sesión activa"
 *   href="/settings"
 * />
 */
export function NavbarProfile({
  userName,
  userAvatar,
  roleLabel,
  href,
  ariaLabel = NAVBAR_PROFILE_SETTINGS,
  className,
}: NavbarProfileProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "group flex min-w-0 items-center transition-all p-1",
        className,
      )}
    >
      <Avatar
        src={userAvatar}
        name={userName}
        alt={`Perfil de ${userName}`}
        size="sm"
      />
    </Link>
  );
}
