"use client";

import { usePathname } from "next/navigation";
import { cn, dataDisabledProps } from "@/lib/utils";
import {
  NAV_BRAND_SHORT,
  NAVBAR_PROFILE_SETTINGS,
  SIDEBAR_LOGOUT,
  SIDEBAR_USER_STATUS,
} from "@/constants/constants";
import { NavBreadcrumb, NavbarProfile } from "@/components/molecules";
import { getBreadcrumbSegments, getRouteNameForPath } from "@/lib/navigation";
import { routes } from "@/lib/routes";

/**
 * Props for the `Navbar` component.
 *
 * The navbar renders the brand and a breadcrumb for the current route.
 */
interface NavbarProps {
  className?: string;
  disabled?: boolean;
  pathname?: string;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

/**
 * Navbar
 *
 * Top-level application navigation header. Shows brand and current route name.
 * When used inside the app shell it will read pathname from
 * `next/navigation` if a `pathname` prop is not provided.
 *
 * @param props - NavbarProps
 * Used in X case: top header navigation inside authenticated pages.
 */
export function Navbar({
  className,
  disabled,
  pathname,
  userName,
  userRole,
  userAvatar,
  onLogout,
}: NavbarProps) {
  const pathnameFromHook = usePathname();
  const detectedPath = pathname ?? pathnameFromHook ?? "/";
  const currentPage = getRouteNameForPath(detectedPath) ?? NAV_BRAND_SHORT;
  const breadcrumbSegments = getBreadcrumbSegments(detectedPath);
  const showProfile = typeof userName === "string" && userName.length > 0;
  const roleLabel = (userRole || SIDEBAR_USER_STATUS).toUpperCase();

  return (
    <header
      {...dataDisabledProps(disabled)}
      className={cn(
        "sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/75 supports-backdrop-filter:bg-white/60 surface-backdrop-opaque px-8",
        className,
      )}
    >
      <NavBreadcrumb
        brandName={NAV_BRAND_SHORT}
        currentPage={currentPage}
        segments={breadcrumbSegments}
      />

      {showProfile && (
        <div className="flex items-center min-w-0 gap-2 ml-4">
          <NavbarProfile
            userName={userName}
            userAvatar={userAvatar}
            roleLabel={roleLabel}
            href={routes.settings}
            ariaLabel={NAVBAR_PROFILE_SETTINGS}
          />
        </div>
      )}
    </header>
  );
}
