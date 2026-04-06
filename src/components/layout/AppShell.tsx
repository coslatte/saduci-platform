"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "sileo";
import type { ReactNode } from "react";
import { Navbar, Sidebar, Footer } from "@/components/organisms";
import { NotificationsProvider } from "@/context/notifications";
import { APP_SHELL_CLOSE_NAVIGATION } from "@/constants/constants";
import { cn } from "@/lib/utils";
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
  const pathname = usePathname() ?? "/";
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpenPath, setMobileSidebarOpenPath] = useState<
    string | null
  >(null);
  const mobileSidebarOpen = mobileSidebarOpenPath === pathname;

  const sidebarSections: NavigationSectionConfig[] = extraSections
    ? [...APP_NAVIGATION_SECTIONS, ...extraSections]
    : APP_NAVIGATION_SECTIONS;

  function handleOpenMobileSidebar() {
    setMobileSidebarOpenPath(pathname);
  }

  function handleCloseMobileSidebar() {
    setMobileSidebarOpenPath(null);
  }

  useEffect(() => {
    if (!mobileSidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileSidebarOpen]);

  useEffect(() => {
    if (!mobileSidebarOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileSidebarOpenPath(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileSidebarOpen]);

  return (
    <NotificationsProvider>
      <div className="flex min-h-dvh overflow-hidden">
        <Sidebar
          className="hidden lg:flex"
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((s) => !s)}
          sections={sidebarSections}
        />

        <button
          type="button"
          aria-label={APP_SHELL_CLOSE_NAVIGATION}
          aria-hidden={!mobileSidebarOpen}
          tabIndex={mobileSidebarOpen ? 0 : -1}
          onClick={handleCloseMobileSidebar}
          className={cn(
            "fixed inset-0 z-30 bg-slate-900/40 transition-opacity duration-300 lg:hidden",
            mobileSidebarOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          )}
        />

        <div
          id="app-shell-sidebar-mobile"
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 max-w-[85vw] transition-transform duration-300 ease-out lg:hidden",
            mobileSidebarOpen
              ? "translate-x-0 pointer-events-auto"
              : "-translate-x-full pointer-events-none",
          )}
        >
          <Sidebar
            sections={sidebarSections}
            className="h-full shadow-2xl [&>button]:hidden"
          />
        </div>

        {/* Global Toaster for notifications */}
        <Toaster position="bottom-right" />

        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto bg-slate-100/60">
          <Navbar
            userName={userName}
            userRole={userRole}
            userAvatar={userAvatar}
            onLogout={onLogout}
            showSidebarTrigger
            sidebarOpen={mobileSidebarOpen}
            onOpenSidebar={handleOpenMobileSidebar}
          />
          <main className="flex-1 min-w-0 bg-white/70 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </NotificationsProvider>
  );
}
