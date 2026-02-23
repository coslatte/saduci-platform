"use client";

import { cn } from "@/lib/utils";
import { NavItem } from "@/components/molecules/NavItem";
import type { NavItemType } from "@/lib/types";
import { routes } from "@/lib/routes";
import { FiCode } from "react-icons/fi";

interface SidebarSection {
  title?: string;
  items: NavItemType[];
}

interface SidebarProps {
  sections: SidebarSection[];
  collapsed?: boolean;
  className?: string;
}

export function Sidebar({
  sections,
  collapsed = false,
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "sticky top-16 flex h-[calc(100vh-4rem)] flex-col gap-6 overflow-y-auto border-r border-zinc-200 bg-white px-3 py-5",
        collapsed ? "w-16" : "w-60",
        "transition-[width] duration-200",
        className,
      )}
    >
      {sections.map((section, idx) => (
        <nav key={idx} aria-label={section.title}>
          {section.title && !collapsed && (
            <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
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
        </nav>
      ))}
      <div className="mt-auto">
        <NavItem
          href={routes.test}
          label="Página de pruebas"
          icon={<FiCode className="size-5" />}
          collapsed={collapsed}
        />
      </div>
    </aside>
  );
}
