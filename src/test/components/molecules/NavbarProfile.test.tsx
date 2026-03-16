import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

// Mock next/link since it's not available in the pure test environment
mock.module("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: ComponentPropsWithoutRef<"a"> & {
    href: string;
    children?: ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import { NavbarProfile } from "@/components/molecules/NavbarProfile";

describe("NavbarProfile", () => {
  it("renders user info and navigates to given href", () => {
    const { container, getByRole } = render(
      <NavbarProfile
        userName="Eva Gómez"
        roleLabel="SESION ACTIVA"
        href="/settings"
      />,
    );

    const link = getByRole("link", { name: /ir a ajustes de perfil/i });
    expect(link).toBeTruthy();
    expect(link.getAttribute("href")).toBe("/settings");

    expect(container.textContent).toContain("Eva Gómez");
    expect(container.textContent).toContain("SESION ACTIVA");
    expect(
      container.querySelector("[data-slot='navbar-user-online-indicator']"),
    ).toBeTruthy();
  });
});
