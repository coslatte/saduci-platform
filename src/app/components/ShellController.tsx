"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/lib/auth";
import { routes } from "@/lib/routes";

interface Props {
  children: ReactNode;
}

/**
 * Wraps protected routes with auth redirects and the shared app shell.
 * Used in X case: gating non-login routes behind authenticated session checks.
 */
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

  // NOTE: admin UI removed from sidebar per request; admin source files remain untouched
  const extraSections = undefined;

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
