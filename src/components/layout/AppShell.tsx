"use client";

import { useState } from "react";
import { Toaster } from "sileo";
import type { ReactNode } from "react";
import { Navbar, Sidebar, Footer } from "@/components/organisms";
import { NotificationsProvider } from "@/context/notifications";
import {
  APP_NAVIGATION_SECTIONS,
  type NavigationSectionConfig,
} from "@/lib/navigation";

/**
 * Props for `AppShell`.
 */
interface AppShellProps {
  children: ReactNode;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  onLogout?: () => void;
  /** Extra sidebar sections appended after the default ones (e.g. admin section) */
  extraSections?: NavigationSectionConfig[];
}

/**
 * Composes sidebar, navbar, content area, footer, and global notifications.
 * Used in X case: base layout wrapper for authenticated application routes.
 */
export function AppShell({
  children,
  userName = "Usuario",
  userRole = "",
  userAvatar,
  onLogout,
  extraSections,
}: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sidebarSections: NavigationSectionConfig[] = extraSections
    ? [...APP_NAVIGATION_SECTIONS, ...extraSections]
    : APP_NAVIGATION_SECTIONS;

  return (
    <NotificationsProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((s) => !s)}
          sections={sidebarSections}
        />
        {/* Global Toaster for notifications */}
        <Toaster position="bottom-right" />
        <div className="flex flex-col flex-1 overflow-y-auto bg-slate-100/60">
          <Navbar
            userName={userName}
            userRole={userRole}
            userAvatar={userAvatar}
            onLogout={onLogout}
          />
          <main className="flex-1 px-8 py-8 bg-white/70">{children}</main>
          <Footer />
        </div>
      </div>
    </NotificationsProvider>
  );
}
