import { Text } from "@/components/atoms/Text";
import { NavItem } from "@/components/molecules/NavItem";
import { cn } from "@/lib/utils";
import type { NavItemType } from "@/lib/types";

interface SidebarSectionProps {
  title: string;
  items: NavItemType[];
  collapsed: boolean;
}

export function SidebarSection({
  title,
  items,
  collapsed,
}: SidebarSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      {!collapsed && (
        <Text
          as="p"
          size="xs"
          weight="bold"
          uppercase
          tracking="widest"
          className="px-2 text-slate-400"
        >
          {title}
        </Text>
      )}

      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.href}>
            <NavItem
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              collapsed={collapsed}
              className={cn(
                "group px-2.5 py-2 transition-all duration-200",
                item.active
                  ? "shadow-sm ring-1 ring-primary-100"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                collapsed && "px-0",
              )}
              iconClassName={cn(
                "transition-colors",
                item.active
                  ? "text-primary-600"
                  : "text-slate-400 group-hover:text-slate-600",
              )}
              labelClassName="truncate text-(length:--font-size-sm) font-medium"
            />

            {!collapsed && item.children && item.children.length > 0 && (
              <ul className="mt-0.5 flex flex-col gap-0.5 pl-9">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <NavItem
                      href={child.href}
                      label={child.label}
                      icon={child.icon}
                      active={child.active}
                      variant="nested"
                      className={cn(
                        child.active
                          ? ""
                          : "text-slate-500 hover:text-slate-800",
                      )}
                      iconClassName={cn(
                        child.active
                          ? "text-primary-600"
                          : "text-slate-400 group-hover:text-slate-600",
                      )}
                      labelClassName="truncate text-(length:--font-size-xs)"
                    />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
