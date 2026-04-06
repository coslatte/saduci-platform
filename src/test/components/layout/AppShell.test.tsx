import "../../setup";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import {
  APP_SHELL_CLOSE_NAVIGATION,
  NAVBAR_OPEN_NAVIGATION,
  NAV_BRAND_SHORT,
  SIDEBAR_BRAND_FULL,
} from "@/constants/constants";

mock.module("sileo", () => ({
  Toaster: () => null,
  sileo: {
    success: () => {},
    error: () => {},
  },
}));

mock.module("@/lib/auth", () => ({
  useAuth: () => ({
    user: {
      id: "1",
      username: "test",
      name: "Test",
      email: "t@test",
      role: "Administrador",
      isSuperuser: true,
    },
    token: "test-token",
    isAuthenticated: true,
    isLoading: false,
    login: async () => {},
    logout: () => {},
  }),
}));

import { AppShell } from "@/components/layout/AppShell";

describe("AppShell", () => {
  it("renders global chrome and marks active route", () => {
    const { container } = render(
      <AppShell>
        <h1>Contenido de prueba</h1>
      </AppShell>,
    );

    // Navbar shows brand short and sidebar shows full brand
    expect(container.textContent?.includes(NAV_BRAND_SHORT)).toBe(true);
    expect(container.textContent?.includes(SIDEBAR_BRAND_FULL)).toBe(true);
    // Sidebar contains Dashboard link
    expect(container.textContent?.includes("Dashboard")).toBe(true);
    // "Simulación" appears in both sidebar nav and navbar breadcrumb
    expect(
      (container.textContent?.match(/Simulación/g) ?? []).length,
    ).toBeGreaterThanOrEqual(1);
    expect(container.textContent?.includes("Contenido de prueba")).toBe(true);
    // Footer is rendered as a <footer> element (role=contentinfo)
    const footer = container.querySelector("footer");
    expect(footer).toBeTruthy();
    expect(footer?.className.includes("surface-backdrop-opaque")).toBe(true);

    // The sidebar nav link should have aria-current="page"
    const activeLink = container.querySelector("a[aria-current='page']");
    expect(activeLink).toBeTruthy();
  });

  it("opens and closes the mobile sidebar drawer", () => {
    const { container } = render(
      <AppShell>
        <h1>Contenido de prueba</h1>
      </AppShell>,
    );

    const openSidebarButton = container.querySelector(
      `button[aria-label='${NAVBAR_OPEN_NAVIGATION}']`,
    ) as HTMLButtonElement | null;

    expect(openSidebarButton).toBeTruthy();
    if (!openSidebarButton) return;

    const mobileSidebar = container.querySelector(
      "#app-shell-sidebar-mobile",
    ) as HTMLDivElement | null;

    expect(mobileSidebar).toBeTruthy();
    expect(mobileSidebar?.className.includes("-translate-x-full")).toBe(true);

    fireEvent.click(openSidebarButton);

    expect(mobileSidebar?.className.includes("translate-x-0")).toBe(true);

    const closeSidebarButton = container.querySelector(
      `button[aria-label='${APP_SHELL_CLOSE_NAVIGATION}']`,
    ) as HTMLButtonElement | null;

    expect(closeSidebarButton).toBeTruthy();
    if (!closeSidebarButton) return;

    fireEvent.click(closeSidebarButton);

    expect(mobileSidebar?.className.includes("-translate-x-full")).toBe(true);
  });
});
