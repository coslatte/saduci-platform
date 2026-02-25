"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiBarChart2,
  FiUsers,
  FiSettings,
  FiActivity,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "@/lib/auth";
import { SIDEBAR_SECTIONS } from "@/lib/mockData";
import type { NavItemType } from "@/lib/types";
import { Navbar, Sidebar, Footer } from "@/components/organisms";

interface AppShellProps {
  children: React.ReactNode;
}

function isRouteActive(itemHref: string, pathname: string) {
  if (itemHref === "/") return pathname === "/";
  return pathname === itemHref || pathname.startsWith(`${itemHref}/`);
}

function mapSidebarWithIcons(
  pathname: string,
): Array<{ title: string; items: NavItemType[] }> {
  const iconMap: Record<string, string> = {
    "/": "home",
    "/simulacion": "activity",
    "/reportes": "chart",
    "/usuarios": "users",
    "/ajustes": "settings",
  };

  const icons = {
    home: <FiHome className="size-5" />,
    activity: <FiActivity className="size-5" />,
    chart: <FiBarChart2 className="size-5" />,
    users: <FiUsers className="size-5" />,
    settings: <FiSettings className="size-5" />,
  };

  return SIDEBAR_SECTIONS.map((section) => ({
    title: section.title,
    items: section.items.map((item) => ({
      ...item,
      active: isRouteActive(item.href, pathname) ? true : undefined,
      icon: icons[iconMap[item.href] as keyof typeof icons],
    })),
  }));
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  // If on the login page, render children alone (no shell)
  if (pathname === "/login") {
    return <>{children}</>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Use a small wrapper to trigger the redirect on mount
    return <RedirectToLogin />;
  }

  const sidebarSections = mapSidebarWithIcons(pathname);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sections={sidebarSections}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((s) => !s)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar
          userName={user?.name ?? "Usuario"}
          userRole={user?.role ?? ""}
          pathname={pathname}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-1 sm:p-2 lg:p-4">
          <div className="w-full h-full">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

/** Tiny client component that redirects to /login */
function RedirectToLogin() {
  const router = useRouter();
  // Use useEffect-free approach: trigger redirect immediately
  if (typeof window !== "undefined") {
    router.replace("/login");
  }
  return null;
}
