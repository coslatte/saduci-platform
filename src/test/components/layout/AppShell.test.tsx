import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import { NAV_BRAND_SHORT, SIDEBAR_BRAND_FULL } from "@/constants/constants";

mock.module("sileo", () => ({
  Toaster: () => null,
  sileo: {
    success: () => {},
    error: () => {},
  },
}));

mock.module("@/lib/auth", () => ({
  useAuth: () => ({
    user: { id: "1", name: "Test", email: "t@test", role: "Admin" },
    isAuthenticated: true,
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
});
