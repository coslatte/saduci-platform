import "../../setup";
import { render, fireEvent } from "@testing-library/react";
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

  it("renders current route breadcrumb", () => {
    const { container } = render(<Navbar pathname="/simulation" />);
    expect(container.textContent?.includes("Simulación")).toBe(true);
  });

  it("renders custom userName and userRole props", () => {
    const { container } = render(
      <Navbar pathname="/" userName="Dr. House" userRole="Médico" />,
    );
    expect(container.textContent?.includes("Dr. House")).toBe(true);
  });

  it("opens user popover and shows ajustes link when user button is clicked", () => {
    const { container, getByRole } = render(<Navbar pathname="/" />);

    const userBtn = container.querySelector(
      "button[aria-haspopup='dialog']",
    ) as HTMLElement;
    expect(userBtn).toBeTruthy();

    fireEvent.click(userBtn);

    // the breadcrumb also contains the word 'Ajustes' in some renders, so
    // target the link role specifically to find the settings link inside the popover
    expect(getByRole("link", { name: "Ajustes" })).toBeTruthy();
  });

  it("user popover trigger has correct aria attributes", () => {
    const { container } = render(<Navbar pathname="/" />);

    const userBtn = container.querySelector(
      "button[aria-haspopup='dialog']",
    ) as HTMLElement;
    expect(userBtn).toBeTruthy();
    expect(userBtn.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(userBtn);

    expect(userBtn.getAttribute("aria-expanded")).toBe("true");
  });

  it("does not render a notification bell button in the navbar", () => {
    const { queryByTitle } = render(<Navbar pathname="/" />);
    expect(queryByTitle("Notificaciones")).toBeNull();
  });

  it("calls onLogout when logout button is clicked inside popover", () => {
    let logoutCalled = false;
    const { container, getByRole } = render(
      <Navbar
        pathname="/"
        onLogout={() => {
          logoutCalled = true;
        }}
      />,
    );

    const userBtn = container.querySelector(
      "button[aria-haspopup='dialog']",
    ) as HTMLElement;
    fireEvent.click(userBtn);

    fireEvent.click(getByRole("button", { name: "Cerrar sesión" }));

    expect(logoutCalled).toBe(true);
  });
});
