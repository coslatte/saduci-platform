import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import { NAV_BRAND_SHORT } from "@/constants/constants";

// Provide navigation stubs before the static Navbar import is resolved.
// Without this, NavBreadcrumb's useRouter() would throw in the test env.
mock.module("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ back: () => {}, push: () => {}, replace: () => {} }),
  useSearchParams: () => new URLSearchParams(),
}));

import { Navbar } from "@/components/organisms/Navbar";

describe("Navbar", () => {
  it("renders brand short name", () => {
    const { container } = render(<Navbar pathname="/" />);
    expect(container.textContent?.includes(NAV_BRAND_SHORT)).toBe(true);
  });

  it("applies opaque transparent backdrop styling", () => {
    const { container } = render(<Navbar pathname="/" />);
    const header = container.querySelector("header");
    expect(header?.className.includes("surface-backdrop-opaque")).toBe(true);
    expect(header?.className.includes("border-slate-200/80")).toBe(true);
  });

  it("renders current route breadcrumb", () => {
    const { container } = render(<Navbar pathname="/simulation" />);
    expect(container.textContent?.includes("Simulación")).toBe(true);
  });

  it("renders user controls in the navbar when profile data is provided", () => {
    const { container } = render(<Navbar pathname="/" />);
    expect(
      container.querySelector("button[aria-label='Cerrar sesión']"),
    ).toBeNull();
  });

  it("renders profile and logout controls when props are provided", () => {
    const onLogout = mock(() => {});
    const { container, getByRole } = render(
      <Navbar
        pathname="/"
        userName="Alex Rodriguez"
        userRole="System Admin"
        onLogout={onLogout}
      />,
    );

    expect(
      container.querySelector("a[aria-label='Ir a ajustes de perfil']"),
    ).toBeTruthy();
    expect(container.textContent?.includes("Alex Rodriguez")).toBe(true);
    expect(container.textContent?.includes("SYSTEM ADMIN")).toBe(true);
    expect(
      container.querySelector("[data-slot='navbar-user-online-indicator']"),
    ).toBeTruthy();

    const logout = getByRole("button", { name: /cerrar sesión/i });
    logout.click();
    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});
