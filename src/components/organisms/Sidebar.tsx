"use client";

import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cn } from "@/lib/utils";
import type { NavItemType } from "@/lib/types";
import {
  SIDEBAR_BRAND_FULL,
  SIDEBAR_COLLAPSE_COLLAPSE,
  SIDEBAR_COLLAPSE_EXPAND,
} from "@/constants/constants";

interface SidebarProps {
  sections: Array<{ title: string; items: NavItemType[] }>;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

export function Sidebar({
  sections,
  collapsed = false,
  onToggleCollapse,
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64",
        className,
      )}
    >
      {/* Brand area */}
      <div className="flex h-16 shrink-0 items-center border-b border-slate-100 px-6">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm">
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
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4">
        <div className="flex flex-col gap-8">
          {sections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              {!collapsed && (
                <p className="px-2 text-[length:var(--font-size-xs)] font-bold uppercase tracking-widest text-slate-400">
                  {section.title}
                </p>
              )}
              <ul className="flex flex-col gap-1">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      href={item.href}
                      aria-current={item.active ? "page" : undefined}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-2.5 py-2 transition-all duration-200",
                        item.active
                          ? "bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-100"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                        collapsed && "justify-center px-0",
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <div
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center transition-colors",
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
        className={cn(
          "absolute -right-4 top-1/2 z-50 flex h-8 w-4 -translate-y-1/2 items-center justify-center rounded-r-md border border-l-0 border-slate-200 bg-white text-slate-400 shadow-sm transition-all hover:border-primary-300 hover:text-primary-600 focus:outline-none",
          collapsed && "ring-2 ring-primary-50",
        )}
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
