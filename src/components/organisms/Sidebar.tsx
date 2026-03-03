"use client";

import Link from "next/link";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiUsers,
  FiSettings,
  FiActivity,
  FiBarChart2,
} from "react-icons/fi";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  SIDEBAR_BRAND_FULL,
  SIDEBAR_COLLAPSE_COLLAPSE,
  SIDEBAR_COLLAPSE_EXPAND,
} from "@/constants/constants";
import { SIDEBAR_SECTIONS } from "@/lib/mockData";
import type { NavItemType } from "@/lib/types";

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

/**
 * Sidebar
 *
 * Primary application sidebar that renders brand, navigation sections and a
 * collapse control. Styling constants are defined here to make later
 * extraction into a design token module easier.
 */
const SIDEBAR_BASE =
  "relative flex h-full flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out";
const SIDEBAR_WIDTH_COLLAPSED = "w-20";
const SIDEBAR_WIDTH_EXPANDED = "w-64";
const BRAND_AREA =
  "flex h-16 shrink-0 items-center border-b border-slate-100 px-6";
const BRAND_WRAPPER = "flex items-center gap-3 overflow-hidden";
const BRAND_ICON =
  "flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm";
const NAV_WRAPPER = "flex-1 overflow-y-auto overflow-x-hidden p-4";
const SECTION_TITLE =
  "px-2 text-[length:var(--font-size-xs)] font-bold uppercase tracking-widest text-slate-400";
const LINK_BASE =
  "group flex items-center gap-3 rounded-lg px-2.5 py-2 transition-all duration-200";
const LINK_ACTIVE =
  "bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-100";
const LINK_INACTIVE = "text-slate-600 hover:bg-slate-50 hover:text-slate-900";
const ICON_CLASS =
  "flex size-5 shrink-0 items-center justify-center transition-colors";
const SUB_LINK_BASE =
  "group flex items-center gap-2 rounded-md px-2.5 py-1.5 transition-all duration-200";
const SUB_LINK_ACTIVE = "text-primary-700 font-medium";
const SUB_LINK_INACTIVE = "text-slate-500 hover:text-slate-800";
const COLLAPSE_BTN =
  "absolute -right-4 top-1/2 z-50 flex h-8 w-4 -translate-y-1/2 items-center justify-center rounded-r-md border border-l-0 border-slate-200 bg-white text-slate-400 shadow-sm transition-all hover:border-primary-300 hover:text-primary-600 focus:outline-none";

export function Sidebar({
  collapsed = false,
  onToggleCollapse,
  className,
}: SidebarProps) {
  const pathname = usePathname() ?? "/";

  function isRouteActive(itemHref: string, pathnameStr: string) {
    if (itemHref === "/") return pathnameStr === "/";
    return pathnameStr === itemHref || pathnameStr.startsWith(`${itemHref}/`);
  }

  const iconMap: Record<string, string> = {
    "/": "home",
    "/simulation": "activity",
    "/statistics": "barchart",
    "/usuarios": "users",
    "/settings": "settings",
  };

  const icons = {
    home: <FiHome className="size-5" />,
    activity: <FiActivity className="size-5" />,
    barchart: <FiBarChart2 className="size-5" />,
    users: <FiUsers className="size-5" />,
    settings: <FiSettings className="size-5" />,
  };

  const sections = SIDEBAR_SECTIONS.map((section) => ({
    title: section.title,
    items: section.items.map(
      (item) =>
        ({
          ...item,
          active: isRouteActive(item.href, pathname) ? true : undefined,
          icon: icons[iconMap[item.href] as keyof typeof icons],
          children: item.children?.map((child) => ({
            ...child,
            active: isRouteActive(child.href, pathname) ? true : undefined,
            icon: icons[iconMap[child.href] as keyof typeof icons],
          })),
        }) as NavItemType,
    ),
  }));

  return (
    <aside
      className={cn(
        SIDEBAR_BASE,
        collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
        className,
      )}
    >
      {/* Brand area */}
      <div className={BRAND_AREA}>
        <div className={BRAND_WRAPPER}>
          <div className={BRAND_ICON}>
            <span className="font-bold">S</span>
          </div>
          {!collapsed && (
            <span className="truncate font-semibold tracking-tight text-slate-900">
              {SIDEBAR_BRAND_FULL}
            </span>
          )}
        </div>
      </div>

      {/* Nav sections */}
      <nav className={NAV_WRAPPER}>
        <div className="flex flex-col gap-8">
          {sections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              {!collapsed && <p className={SECTION_TITLE}>{section.title}</p>}
              <ul className="flex flex-col gap-1">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      href={item.href}
                      aria-current={item.active ? "page" : undefined}
                      className={cn(
                        LINK_BASE,
                        item.active ? LINK_ACTIVE : LINK_INACTIVE,
                        collapsed && "justify-center px-0",
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <div
                        className={cn(
                          ICON_CLASS,
                          item.active
                            ? "text-primary-600"
                            : "text-slate-400 group-hover:text-slate-600",
                        )}
                      >
                        {item.icon}
                      </div>
                      {!collapsed && (
                        <span className="truncate text-[length:var(--font-size-sm)] font-medium">
                          {item.label}
                        </span>
                      )}
                    </Link>
                    {!collapsed &&
                      item.children &&
                      item.children.length > 0 && (
                        <ul className="mt-0.5 flex flex-col gap-0.5 pl-9">
                          {item.children.map((child, childIdx) => (
                            <li key={childIdx}>
                              <Link
                                href={child.href}
                                aria-current={child.active ? "page" : undefined}
                                className={cn(
                                  SUB_LINK_BASE,
                                  child.active
                                    ? SUB_LINK_ACTIVE
                                    : SUB_LINK_INACTIVE,
                                )}
                              >
                                <span className="truncate text-[length:var(--font-size-xs)]">
                                  {child.label}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* "Tab-like" collapse button - positioned on the right edge border */}
      <button
        type="button"
        onClick={onToggleCollapse}
        className={cn(COLLAPSE_BTN, collapsed && "ring-2 ring-primary-50")}
        aria-label={
          collapsed ? SIDEBAR_COLLAPSE_EXPAND : SIDEBAR_COLLAPSE_COLLAPSE
        }
      >
        {collapsed ? (
          <FiChevronRight className="size-3" />
        ) : (
          <FiChevronLeft className="size-3" />
        )}
      </button>
    </aside>
  );
}
