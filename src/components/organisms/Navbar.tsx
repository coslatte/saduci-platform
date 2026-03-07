"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn, dataDisabledProps } from "@/lib/utils";
import { NAV_BRAND_SHORT } from "@/constants/constants";
import { Avatar } from "@/components/atoms/Avatar";
import { Text } from "@/components/atoms/Text";
import { NavBreadcrumb } from "@/components/molecules/NavBreadcrumb";
import { Popover } from "@/components/molecules/Popover";
import { getBreadcrumbSegments, getRouteNameForPath } from "@/lib/navigation";

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
  const pathnameFromHook = usePathname();
  const detectedPath = pathname ?? pathnameFromHook ?? "/";
  const router = useRouter();
  const currentPage = getRouteNameForPath(detectedPath) ?? NAV_BRAND_SHORT;
  const breadcrumbSegments = getBreadcrumbSegments(detectedPath);

  return (
    <header
      {...dataDisabledProps(disabled)}
      className={cn(
        "flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-8 z-10",
        className,
      )}
    >
      <NavBreadcrumb
        brandName={NAV_BRAND_SHORT}
        currentPage={currentPage}
        segments={breadcrumbSegments}
        onBack={() => router.back()}
      />

      <div className="flex items-center gap-4">
        <Popover
          align="right"
          trigger={
            <button
              type="button"
              className="flex items-center gap-3 px-3 py-2 no-underline transition-all duration-150 bg-white border border-transparent rounded-lg group hover:border-slate-200 hover:shadow-sm focus:outline-none focus:shadow-sm"
              aria-label={`Usuario ${userName}`}
              title={userName}
            >
              <Avatar src={userAvatar} name={userName} size="xs" />
              <div className="flex-col hidden leading-none lg:flex">
                <Text
                  as="span"
                  size="sm"
                  weight="medium"
                  className="text-slate-900"
                >
                  {userName}
                </Text>
                <Text as="span" size="xs" muted>
                  {userRole}
                </Text>
              </div>
            </button>
          }
        >
          <ul className="flex flex-col w-40 p-1 rounded-xl bg-white border border-slate-200 shadow-lg">
            <li>
              <Link
                href="/settings"
                className="block rounded border border-transparent px-3 py-2 hover:border-slate-200 hover:bg-slate-50"
              >
                <Text as="span" size="sm" className="text-slate-700">
                  Ajustes
                </Text>
              </Link>
            </li>
            {onLogout && (
              <li>
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full rounded border border-transparent px-3 py-2 text-left hover:border-slate-200 hover:bg-slate-50"
                >
                  <Text as="span" size="sm" className="text-slate-700">
                    Cerrar sesión
                  </Text>
                </button>
              </li>
            )}
          </ul>
        </Popover>
      </div>
    </header>
  );
}
