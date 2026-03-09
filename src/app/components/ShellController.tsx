"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/lib/auth";
import { isAdmin } from "@/lib/adminGuard";
import { routes } from "@/lib/routes";
import type { NavigationSectionConfig } from "@/lib/navigation";

interface Props {
  children: ReactNode;
}

export default function ShellController({ children }: Props) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/login") {
      router.replace("/login");
    }
  }, [isAuthenticated, pathname, router]);

  if (pathname === "/login") {
    return <>{children}</>;
  }

  if (!isAuthenticated) return null;

  function handleLogout() {
    logout();
    router.push("/login");
  }

  const extraSections: NavigationSectionConfig[] | undefined = isAdmin(user)
    ? [
        {
          title: "Administración",
          items: [{ label: "Admin", href: routes.admin, iconKey: "admin" }],
        },
      ]
    : undefined;

  return (
    <AppShell
      userName={user?.name}
      userRole={user?.role}
      userAvatar={user?.avatar}
      onLogout={handleLogout}
      extraSections={extraSections}
    >
      {children}
    </AppShell>
  );
}
