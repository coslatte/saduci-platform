"use client";

import { useEffect, useState } from "react";
import { Text } from "@/components/atoms/Text";
import { NavItem } from "@/components/molecules/NavItem";
import { SidebarTreeToggleButton } from "@/components/organisms/sidebar/SidebarTreeToggleButton";
import type { NavItemType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SidebarSectionProps {
  title: string;
  items: NavItemType[];
  collapsed: boolean;
  suppressLayoutAnimations?: boolean;
}

interface TreeItemProps {
  item: NavItemType;
  depth: number;
  collapsed: boolean;
  manualExpanded?: Record<string, boolean>;
  onToggleManual?: (href: string) => void;
  suppressLayoutAnimations?: boolean;
}

function getInitialManualExpandedState(): Record<string, boolean> {
  try {
    const raw = sessionStorage.getItem("saduci.sidebar.manualExpanded");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function TreeItem({
  item,
  depth,
  collapsed,
  manualExpanded,
  onToggleManual,
  // When true avoid layout/height/transform animations; only allow fade
  // transitions so collapsing the whole sidebar doesn't trigger many
  // simultaneous geometry animations.
  suppressLayoutAnimations,
}: TreeItemProps) {
  const hasChildren = !!item.children?.length;
  const isRoot = depth === 0;
  const variant = isRoot ? "default" : "nested";
  // Auto-expand when the item itself is the current route or any descendant
  // is exactly the current route. We intentionally avoid using `item.active`
  // because `active` may be true for parents if we previously marked them
  // due to descendant activity. Relying on `current` keeps visual active
  // styles separate from expansion behavior.
  function hasCurrentDescendant(it: typeof item): boolean {
    if (!it.children) return false;
    return it.children.some(
      (c) => c.current === true || hasCurrentDescendant(c),
    );
  }

  const shouldAutoExpand = item.current === true || hasCurrentDescendant(item);
  const [localManuallySet, setLocalManuallySet] = useState<boolean | null>(
    null,
  );
  const manualValue = manualExpanded ? manualExpanded[item.href] : undefined;
  const manuallySet =
    manualValue !== undefined ? manualValue : localManuallySet;
  const expanded =
    manuallySet !== null && manuallySet !== undefined
      ? manuallySet
      : shouldAutoExpand;

  const showChildren = hasChildren && !collapsed && expanded;

  return (
    <li className="relative">
      <div className="relative overflow-visible">
        <NavItem
          href={item.href}
          label={item.label}
          icon={item.icon}
          active={item.active}
          current={item.current}
          collapsed={collapsed && isRoot}
          variant={variant}
          disableIconHoverScale={true}
          className={cn(
            depth > 0 && "min-h-10",
            collapsed && isRoot ? "mx-auto flex-none" : "flex-1 min-w-0",
            hasChildren && !collapsed && "pr-11",
          )}
          labelClassName={cn(depth > 0 && "text-sm font-medium")}
          suppressLayoutAnimations={suppressLayoutAnimations}
        />

        {hasChildren && !collapsed && (
          <div className="absolute -translate-y-1/2 right-3 top-1/2">
            <SidebarTreeToggleButton
              expanded={expanded}
              label={item.label}
              onToggle={() => {
                if (onToggleManual) {
                  onToggleManual(item.href);
                } else {
                  setLocalManuallySet(!expanded);
                }
              }}
            />
          </div>
        )}
      </div>

      {hasChildren && (
        <div
          aria-hidden={!showChildren}
          className={cn(
            "ml-7 overflow-hidden border-l border-slate-200/80 pl-4 pr-1",
            depth > 0 && "ml-5",
            // Use only opacity transition when suppression requested,
            // otherwise animate max-height and related layout properties.
            suppressLayoutAnimations
              ? "transition-opacity duration-200"
              : "transition-[max-height,opacity,margin,padding] duration-300",
            showChildren ? "mt-1 py-1" : "mt-0 py-0",
            showChildren
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none",
          )}
        >
          <ul className="flex flex-col gap-2">
            {item.children!.map((child) => (
              <TreeItem
                key={child.href}
                item={child}
                depth={depth + 1}
                collapsed={collapsed}
                manualExpanded={manualExpanded}
                onToggleManual={onToggleManual}
                suppressLayoutAnimations={suppressLayoutAnimations}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

/**
 * Renders a titled sidebar section with nested navigation items.
 * Used in X case: grouping links inside the left app navigation.
 */
export function SidebarSection({
  title,
  items,
  collapsed,
  suppressLayoutAnimations,
}: SidebarSectionProps) {
  const [manualExpanded, setManualExpanded] = useState<Record<string, boolean>>(
    getInitialManualExpandedState,
  );

  useEffect(() => {
    try {
      sessionStorage.setItem(
        "saduci.sidebar.manualExpanded",
        JSON.stringify(manualExpanded),
      );
    } catch {
      // ignore storage errors
    }
  }, [manualExpanded]);

  function handleToggleManual(href: string) {
    setManualExpanded((s) => ({ ...s, [href]: !s[href] }));
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "overflow-hidden",
          suppressLayoutAnimations
            ? "transition-opacity duration-200"
            : "transition-[max-height,opacity] duration-300",
          collapsed ? "max-h-0 opacity-0" : "max-h-8 opacity-100",
        )}
      >
        <Text
          as="p"
          size="xs"
          weight="bold"
          uppercase
          tracking="widest"
          className="px-3 text-slate-400"
        >
          {title}
        </Text>
      </div>

      <ul className="flex flex-col gap-1.5">
        {items.map((item) => (
          <TreeItem
            key={item.href}
            item={item}
            depth={0}
            collapsed={collapsed}
            manualExpanded={manualExpanded}
            onToggleManual={handleToggleManual}
            suppressLayoutAnimations={suppressLayoutAnimations}
          />
        ))}
      </ul>
    </div>
  );
}
