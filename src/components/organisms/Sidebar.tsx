"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SidebarBrand } from "@/components/organisms/sidebar/SidebarBrand";
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
 */

export function Sidebar({
  sections: sectionConfigs = APP_NAVIGATION_SECTIONS,
  collapsed = false,
  onToggleCollapse,
  className,
}: SidebarProps) {
  const pathname = usePathname() ?? "/";
  const sections = resolveSidebarSections(pathname, sectionConfigs);

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64",
        className,
      )}
    >
      <SidebarBrand collapsed={collapsed} />

      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4">
        <div className="flex flex-col gap-8">
          {sections.map((section) => (
            <SidebarSection
              key={section.title}
              title={section.title}
              items={section.items}
              collapsed={collapsed}
            />
          ))}
        </div>
      </nav>

      <SidebarCollapseToggle
        collapsed={collapsed}
        onToggleCollapse={onToggleCollapse}
      />
    </aside>
  );
}
