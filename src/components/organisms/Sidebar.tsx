"use client";

import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cn, dataDisabledProps } from "@/lib/utils";
import { NavItem } from "@/components/molecules/NavItem";
import type { NavItemType } from "@/lib/types";

interface SidebarSection {
  title?: string;
  items: NavItemType[];
}

interface SidebarProps {
  sections: SidebarSection[];
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
  disabled?: boolean;
}

export function Sidebar({
  sections,
  collapsed = false,
  onToggleCollapse,
  className,
  disabled,
}: SidebarProps) {
  return (
    <aside
      {...dataDisabledProps(disabled)}
      className={cn(
        "relative flex shrink-0 flex-col border-r border-slate-200 bg-white",
        collapsed ? "w-16" : "w-64",
        "transition-[width] duration-200",
        className,
      )}
    >
      {/* ── Collapse tab — sits at the right edge of the sidebar ── */}
      <button
        type="button"
        onClick={onToggleCollapse}
        disabled={disabled}
        className={cn(
          "absolute -right-3.5 top-1/2 z-20 hidden md:flex",
          "-translate-y-1/2",
          "h-8 w-3.5 items-center justify-center",
          "rounded-r-md border border-l-0 border-slate-200 bg-white",
          "text-slate-400 shadow-sm",
          "transition-colors hover:bg-slate-50 hover:text-slate-700",
        )}
        aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
      >
        {collapsed ? (
          <FiChevronRight className="size-3" />
        ) : (
          <FiChevronLeft className="size-3" />
        )}
      </button>

      {/* ── Logo header ── */}
      <div
        className={cn(
          "flex h-16 shrink-0 items-center gap-2 border-b border-slate-200",
          collapsed ? "justify-center px-4" : "px-6",
        )}
      >
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-700 text-lg font-bold text-white shadow-sm">
            S
          </div>
          {!collapsed && (
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Sadeci
            </span>
          )}
        </Link>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <div className="flex flex-col gap-8">
          {sections.map((section, idx) => (
            <div key={idx}>
              {section.title && !collapsed && (
                <p className="mb-2 px-3 text-[length:var(--font-size-xs)] font-semibold uppercase tracking-wider text-slate-400">
                  {section.title}
                </p>
              )}
              <ul className="flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <NavItem
                      href={item.href}
                      label={item.label}
                      icon={item.icon}
                      active={item.active}
                      collapsed={collapsed}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
