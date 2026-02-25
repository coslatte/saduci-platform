import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";

describe("AppShell", () => {
  it("renders global chrome and marks active route", async () => {
    mock.module("next/navigation", () => ({
      usePathname: () => "/simulacion",
    }));

    const { AppShell } = await import("@/components/layout/AppShell");

    const { getAllByText, getByText, getByRole } = render(
      <AppShell>
        <h1>Contenido de prueba</h1>
      </AppShell>,
    );

    // "Sadeci" appears in both sidebar logo and navbar breadcrumb
    expect(getAllByText("Sadeci").length).toBeGreaterThanOrEqual(1);
    expect(getByText("Dashboard")).toBeTruthy();
    // "Simulación" appears in both sidebar nav and navbar breadcrumb
    expect(getAllByText("Simulación").length).toBeGreaterThanOrEqual(1);
    expect(getByText("Contenido de prueba")).toBeTruthy();
    expect(getByRole("navigation", { name: "Footer" })).toBeTruthy();

    // The sidebar nav link should have aria-current="page"
    const activeLink = getAllByText("Simulación").find(
      (el) => el.closest("a")?.getAttribute("aria-current") === "page",
    );
    expect(activeLink).toBeTruthy();
  });
});
