import "../setup";
import { describe, expect, it } from "bun:test";
import {
  getBreadcrumbSegments,
  getRouteNameForPath,
  isRouteActive,
} from "@/lib/navigation";

describe("navigation helpers", () => {
  it("marks nested paths as active", () => {
    expect(isRouteActive("/simulation", "/simulation/resultados")).toBe(true);
    expect(isRouteActive("/statistics", "/simulation/resultados")).toBe(false);
  });

  it("returns the best matching route name for nested paths", () => {
    expect(getRouteNameForPath("/simulation/resultados")).toBe("Simulación");
    expect(getRouteNameForPath("/statistics/detalle")).toBe(
      "Pruebas Estadísticas",
    );
  });

  it("returns breadcrumb segments using closest configured route", () => {
    expect(getBreadcrumbSegments("/statistics/detalle")).toEqual([
      { label: "Simulación", href: "/simulation" },
    ]);
  });
});
