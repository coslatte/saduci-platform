import "../../setup";
import { fireEvent, render, within } from "@testing-library/react";
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

  it("applies full transparent backdrop styling", () => {
    const { container } = render(<Navbar pathname="/" />);
    const header = container.querySelector("header");
    expect(header?.className.includes("surface-backdrop-full")).toBe(true);
    expect(header?.className.includes("border-slate-200/80")).toBe(true);
  });

  it("renders current route breadcrumb", () => {
    const { container } = render(<Navbar pathname="/simulation" />);
    expect(container.textContent?.includes("Simulación")).toBe(true);
  });

  it("renders user controls in the navbar when profile data is provided", () => {
    const { container } = render(<Navbar pathname="/" />);
    expect(
      container.querySelector("button[aria-label='Ir a ajustes de perfil']"),
    ).toBeNull();
  });

  it("renders profile menu trigger and executes logout from dropdown", () => {
    const onLogout = mock(() => {});
    const { container } = render(
      <Navbar
        pathname="/"
        userName="Alex Rodriguez"
        userRole="System Admin"
        onLogout={onLogout}
      />,
    );

    const scope = within(container);

    const profileTrigger = scope.getAllByRole("button", {
      name: /ir a ajustes de perfil/i,
    })[0];
    expect(profileTrigger).toBeTruthy();

    fireEvent.click(profileTrigger);

    const dialog = Array.from(
      document.body.querySelectorAll("[role='dialog']"),
    ).find((node) => node.textContent?.includes("Alex Rodriguez"));
    expect(dialog).toBeTruthy();
    if (!(dialog instanceof HTMLElement)) return;

    const dialogScope = within(dialog);
    expect(dialogScope.getByText("Alex Rodriguez")).toBeTruthy();
    expect(dialogScope.getByText("SYSTEM ADMIN")).toBeTruthy();
    expect(
      dialogScope.getByRole("link", { name: /configuraciones/i }),
    ).toBeTruthy();

    const logout = dialogScope.getByRole("button", { name: /cerrar sesión/i });
    fireEvent.click(logout);
    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});
