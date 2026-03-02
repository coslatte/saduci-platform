"use client";

import { useState } from "react";
import { Toaster } from "sileo";
import type { ReactNode } from "react";
import { Navbar, Sidebar, Footer } from "@/components/organisms";
import { NotificationsProvider } from "@/context/notifications";

/**
 * Props for `AppShell`.
 */
interface AppShellProps {
  children: ReactNode;
  /**
   * Lightweight user info passed from the controller to keep this component
   * rendering stable across route changes.
   */
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

/**
 * AppShell
 *
 * Top-level layout wrapper for authenticated pages. It composes the
 * `Sidebar`, `Navbar`, and `Footer` and provides a `NotificationsProvider`.
 * Keep this component presentation-focused: route content should be rendered
 * as children.
 */
export function AppShell({
  children,
  userName = "Usuario",
  userRole = "",
  userAvatar,
  onLogout,
}: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <NotificationsProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((s) => !s)}
          sections={[]}
        />
        {/* Global Toaster for notifications */}
        <Toaster position="bottom-right" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar
            userName={userName}
            userRole={userRole}
            userAvatar={userAvatar}
            onLogout={onLogout}
          />
          <main className="flex-1 overflow-y-auto bg-white px-8 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </NotificationsProvider>
  );
}
