import "../../setup";
import { act, fireEvent, render, within } from "@testing-library/react";
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
  it("opens user menu with settings and logout actions", async () => {
    const onLogout = mock(() => {});
    const { container } = render(
      <NavbarProfile
        userName="Eva Gómez"
        roleLabel="SESION ACTIVA"
        href="/settings"
        onLogout={onLogout}
      />,
    );

    const scope = within(container);
    const trigger = scope.getByRole("button", {
      name: /ir a ajustes de perfil/i,
    });
    fireEvent.click(trigger);

    await act(async () => {
      fireEvent.mouseEnter(trigger);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const bodyScope = within(document.body);
    const dialog = bodyScope.getByRole("dialog");
    const panel = dialog.querySelector(".surface-backdrop-opaque");
    const settingsAction = bodyScope.getByRole("link", {
      name: /configuraciones/i,
    });
    expect(settingsAction).toBeTruthy();
    expect(settingsAction.getAttribute("href")).toBe("/settings");

    const logoutAction = bodyScope.getByRole("button", {
      name: /cerrar sesión/i,
    });
    fireEvent.click(logoutAction);
    expect(onLogout).toHaveBeenCalledTimes(1);

    expect(panel).toBeTruthy();
    expect(dialog.textContent).toContain("Eva Gómez");
    expect(dialog.textContent).toContain("SESION ACTIVA");
  });
});
