import { createElement } from "react";
import {
  NAV_BRAND_SHORT,
  ROUTE_BREADCRUMB_SEGMENTS,
  ROUTE_NAMES_MAP,
} from "@/constants/constants";
import {
  NAVIGATION_ICON_REGISTRY,
  type NavigationIconKey,
} from "@/constants/navigationIcons";
import { SIDEBAR_SECTIONS } from "@/lib/mockData";
import type { NavItemType } from "@/lib/types";

type NavigationLeaf = {
  href: string;
  label: string;
};

export interface NavigationItemConfig {
  label: string;
  href: string;
  active?: boolean;
  iconKey?: NavigationIconKey;
  children?: NavigationItemConfig[];
}

export interface NavigationSectionConfig {
  title: string;
  items: NavigationItemConfig[];
}

export const APP_NAVIGATION_SECTIONS: NavigationSectionConfig[] =
  SIDEBAR_SECTIONS.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      iconKey: getDefaultNavigationIconKey(item.href),
      children: item.children?.map((child) => ({
        ...child,
        iconKey: getDefaultNavigationIconKey(child.href),
      })),
    })),
  }));

export function isRouteActive(itemHref: string, pathname: string) {
  if (itemHref === "/") return pathname === "/";
  return pathname === itemHref || pathname.startsWith(`${itemHref}/`);
}

export function getRouteNameForPath(pathname: string) {
  if (ROUTE_NAMES_MAP[pathname]) {
    return ROUTE_NAMES_MAP[pathname];
  }

  const bestMatch = flattenNavigation(APP_NAVIGATION_SECTIONS)
    .filter((item) => isRouteActive(item.href, pathname))
    .sort((left, right) => right.href.length - left.href.length)[0];

  return bestMatch?.label ?? NAV_BRAND_SHORT;
}

export function getBreadcrumbSegments(pathname: string) {
  if (ROUTE_BREADCRUMB_SEGMENTS[pathname]) {
    return ROUTE_BREADCRUMB_SEGMENTS[pathname];
  }

  const matchingSegment = Object.entries(ROUTE_BREADCRUMB_SEGMENTS)
    .filter(([route]) => isRouteActive(route, pathname))
    .sort(([left], [right]) => right.length - left.length)[0];

  return matchingSegment?.[1];
}

export function resolveSidebarSections(
  pathname: string,
  sections: NavigationSectionConfig[] = APP_NAVIGATION_SECTIONS,
) {
  return sections.map((section) => ({
    title: section.title,
    items: section.items.map((item) => mapNavigationItem(item, pathname)),
  }));
}

export function getNavigationIcon(iconKey?: NavigationIconKey) {
  if (!iconKey) {
    return undefined;
  }

  const Icon = NAVIGATION_ICON_REGISTRY[iconKey];
  return Icon ? createElement(Icon, { className: "size-5" }) : undefined;
}

function mapNavigationItem(
  item: NavigationItemConfig,
  pathname: string,
): NavItemType {
  return {
    ...item,
    active: isRouteActive(item.href, pathname) ? true : undefined,
    icon: getNavigationIcon(item.iconKey),
    children: item.children?.map((child) => ({
      ...child,
      active: isRouteActive(child.href, pathname) ? true : undefined,
      icon: getNavigationIcon(child.iconKey),
    })),
  };
}

function flattenNavigation(
  sections: NavigationSectionConfig[],
): NavigationLeaf[] {
  return sections.flatMap((section) =>
    section.items.flatMap((item) => [
      { href: item.href, label: item.label },
      ...(item.children?.map((child) => ({
        href: child.href,
        label: child.label,
      })) ?? []),
    ]),
  );
}

function getDefaultNavigationIconKey(
  href: string,
): NavigationIconKey | undefined {
  const iconMap: Record<string, NavigationIconKey> = {
    "/": "home",
    "/simulation": "activity",
    "/statistics": "barchart",
    "/usuarios": "users",
    "/settings": "settings",
  };

  return iconMap[href];
}
