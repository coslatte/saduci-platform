"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, dataDisabledProps } from "@/lib/utils";
import {
  NAV_BRAND_SHORT,
  ROUTE_NAMES_MAP,
  ROUTE_BREADCRUMB_SEGMENTS,
} from "@/constants/constants";
import { Avatar } from "@/components/atoms/Avatar";
import { NavBreadcrumb } from "@/components/molecules/NavBreadcrumb";
import { Popover } from "@/components/molecules/Popover";

/**
 * Props for the `Navbar` component.
 *
 * The navbar renders the brand, a breadcrumb for the current route and the
 * user controls (avatar + menu). It also exposes a notifications bell that
 * reads from the `Notifications` context when available.
 */
interface NavbarProps {
  className?: string;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  disabled?: boolean;
  pathname?: string;
  onLogout?: () => void;
}

/**
 * Navbar
 *
 * Top-level application navigation header. Shows brand, current route name and
 * user controls. When used inside the app shell it will read pathname from
 * `next/navigation` if a `pathname` prop is not provided.
 *
 * @param props - NavbarProps
 */
export function Navbar({
  className,
  userName = "Usuario",
  userRole = "Admin",
  userAvatar,
  disabled,
  pathname,
  onLogout,
}: NavbarProps) {
  const detectedPath = pathname ?? usePathname() ?? "/";
  const currentPage = ROUTE_NAMES_MAP[detectedPath] ?? NAV_BRAND_SHORT;
  const breadcrumbSegments = ROUTE_BREADCRUMB_SEGMENTS[detectedPath];

  const styles = {
    header:
      "flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-8 z-10",
    triggerButton:
      "flex items-center gap-3 px-3 py-2 no-underline transition-all duration-150 bg-white border border-transparent rounded-lg group hover:border-slate-200 hover:shadow-sm focus:outline-none focus:shadow-sm",
    userInfo: "flex-col hidden leading-none lg:flex",
    userName: "text-[length:var(--font-size-sm)] font-medium text-slate-900",
    userRole: "text-[length:var(--font-size-xs)] text-slate-500",
    menu: "flex flex-col w-40 p-1 rounded-xl bg-white border border-slate-200 shadow-lg",
    menuItem:
      "block px-3 py-2 text-sm border border-transparent rounded text-slate-700 hover:border-slate-200 hover:bg-slate-50",
    menuItemButton:
      "w-full px-3 py-2 text-sm text-left border border-transparent rounded text-slate-700 hover:border-slate-200 hover:bg-slate-50",
  };

  return (
    <header
      {...dataDisabledProps(disabled)}
      className={cn(styles.header, className)}
    >
      <NavBreadcrumb
        brandName={NAV_BRAND_SHORT}
        currentPage={currentPage}
        segments={breadcrumbSegments}
      />

      <div className="flex items-center gap-4">
        <Popover
          align="right"
          trigger={
            <button
              type="button"
              className={styles.triggerButton}
              aria-label={`Usuario ${userName}`}
              title={userName}
            >
              <Avatar src={userAvatar} name={userName} size="xs" />
              <div className={styles.userInfo}>
                <span className={styles.userName}>{userName}</span>
                <span className={styles.userRole}>{userRole}</span>
              </div>
            </button>
          }
        >
          <ul className={styles.menu}>
            <li>
              <Link href="/settings" className={styles.menuItem}>
                Ajustes
              </Link>
            </li>
            {onLogout && (
              <li>
                <button
                  type="button"
                  onClick={onLogout}
                  className={styles.menuItemButton}
                >
                  Cerrar sesión
                </button>
              </li>
            )}
          </ul>
        </Popover>
      </div>
    </header>
  );
}
