import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import { NAV_BRAND_SHORT, SIDEBAR_BRAND_FULL } from "@/constants/constants";

describe("AppShell", () => {
  it("renders global chrome and marks active route", async () => {
    // next/navigation is already mocked by Navbar.test.tsx module-level mock.
    // Re-declaring it here triggers Bun to re-validate the real file → error.

    // Mock sileo toaster to avoid rendering issues during tests
    mock.module("sileo", () => ({
      Toaster: () => null,
      sileo: {
        success: () => {},
        error: () => {},
      },
    }));

    // Provide a mocked authenticated user so AppShell renders normally
    mock.module("@/lib/auth", () => ({
      useAuth: () => ({
        user: { id: "1", name: "Test", email: "t@test", role: "Admin" },
        isAuthenticated: true,
        login: async () => {},
        logout: () => {},
      }),
    }));

    const { AppShell } = await import("@/components/layout/AppShell");

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
    expect((container.textContent?.match(/Simulación/g) ?? []).length).toBeGreaterThanOrEqual(1);
    expect(container.textContent?.includes("Contenido de prueba")).toBe(true);
    // Footer is rendered as a <footer> element (role=contentinfo)
    expect(container.querySelector("footer")).toBeTruthy();

    // The sidebar nav link should have aria-current="page"
    const activeLink = container.querySelector("a[aria-current='page']");
    expect(activeLink).toBeTruthy();
  });
});
