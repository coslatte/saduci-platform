"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarCollapseToggle } from "@/components/organisms/sidebar/SidebarCollapseToggle";
import { SidebarSection } from "@/components/organisms/sidebar/SidebarSection";
import {
  APP_NAVIGATION_SECTIONS,
  resolveSidebarSections,
  type NavigationSectionConfig,
} from "@/lib/navigation";

interface SidebarProps {
  sections?: NavigationSectionConfig[];
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

/**
 * Sidebar
 *
 * Primary application sidebar that renders brand, navigation sections and a
 * collapse control.
 * Used in X case: main authenticated app shell layout.
 */
export function Sidebar({
  sections: sectionConfigs = APP_NAVIGATION_SECTIONS,
  collapsed = false,
  onToggleCollapse,
  className,
}: SidebarProps) {
  const pathname = usePathname() ?? "/";
  const sections = resolveSidebarSections(pathname, sectionConfigs);

  // Support uncontrolled usage: if parent doesn't provide an onToggleCollapse
  // handler, manage collapsed state internally so the toggle button is
  // interactive by default.
  const [internalCollapsed, setInternalCollapsed] =
    useState<boolean>(collapsed);

  const isControlled = typeof onToggleCollapse === "function";
  const effectiveCollapsed = isControlled ? collapsed : internalCollapsed;
  const suppressLayoutAnimations = effectiveCollapsed;

  function handleToggle() {
    if (isControlled) {
      onToggleCollapse?.();
    } else {
      setInternalCollapsed((s) => !s);
    }
  }

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col bg-slate-50/90 transition-[width] duration-300 ease-out",
        effectiveCollapsed
          ? "w-0 overflow-visible border-r-0"
          : "w-72 border-r border-slate-200/80",
        className,
      )}
    >
      <nav
        className={cn(
          "flex-1 overflow-x-hidden overflow-y-auto p-3 no-underline transition-opacity duration-300 ease-out",
          effectiveCollapsed && "opacity-0 pointer-events-none",
        )}
        aria-label="Sidebar navigation"
      >
        <div className="flex flex-col gap-6">
          {sections.map((section) => (
            <SidebarSection
              key={section.title}
              title={section.title}
              items={section.items}
              collapsed={effectiveCollapsed}
              suppressLayoutAnimations={suppressLayoutAnimations}
            />
          ))}
        </div>
      </nav>

      <SidebarCollapseToggle
        collapsed={effectiveCollapsed}
        onToggleCollapse={handleToggle}
      />
    </aside>
  );
}
