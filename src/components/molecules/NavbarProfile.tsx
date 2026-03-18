"use client";

import Link from "next/link";
import { Avatar } from "@/components/atoms/Avatar";
import { Text } from "@/components/atoms/Text";
import {
  NAVBAR_MENU_LOGOUT,
  NAVBAR_MENU_SETTINGS,
  NAVBAR_PROFILE_SETTINGS,
} from "@/constants/constants";
import { cn } from "@/lib/utils";
import { Popover } from "./Popover";

export interface NavbarProfileProps {
  /** Display name of the current user. */
  userName: string;
  /** Optional avatar image URL for the current user. */
  userAvatar?: string;
  /** Label describing the current user status (e.g. "Sesión activa"). */
  roleLabel: string;
  /** Link destination for the settings action. */
  href: string;
  /** Optional callback for logout action. */
  onLogout?: () => void;
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
  onLogout,
  ariaLabel = NAVBAR_PROFILE_SETTINGS,
  className,
}: NavbarProfileProps) {
  return (
    <Popover
      align="right"
      openOnHover
      trigger={
        <button
          type="button"
          aria-label={ariaLabel}
          className={cn(
            "group flex min-w-0 items-center rounded-full p-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
            className,
          )}
        >
          <Avatar
            src={userAvatar}
            name={userName}
            alt={`Perfil de ${userName}`}
            size="sm"
          />
        </button>
      }
    >
      <div className="w-64 p-2 bg-white border shadow-lg rounded-xl border-slate-200">
        <div className="px-3 py-2 border-b border-slate-200">
          <Text as="p" size="sm" weight="semibold" className="text-slate-900">
            {userName}
          </Text>
          <Text as="p" size="xs" className="text-slate-500">
            {roleLabel}
          </Text>
        </div>

        <div className="flex flex-col gap-1 px-1 py-2">
          <Link
            href={href}
            className="w-full px-3 py-2 text-sm font-medium text-left transition-colors rounded-md text-slate-700 hover:bg-slate-100"
          >
            {NAVBAR_MENU_SETTINGS}
          </Link>

          <button
            type="button"
            onClick={onLogout}
            className="w-full px-3 py-2 text-sm font-medium text-left text-red-600 transition-colors rounded-md hover:bg-red-50"
          >
            {NAVBAR_MENU_LOGOUT}
          </button>
        </div>
      </div>
    </Popover>
  );
}
