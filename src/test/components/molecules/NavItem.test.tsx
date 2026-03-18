import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { NavItem } from "@/components/molecules/NavItem";

describe("NavItem", () => {
  it("applies the primary active style to nested tree items", () => {
    const { getByRole } = render(
      <NavItem
        href="/statistics"
        label="Pruebas Estadísticas"
        variant="nested"
        active={true}
        current={true}
      />,
    );

    const link = getByRole("link", { name: /pruebas estadísticas/i });

    expect(link.getAttribute("aria-current")).toBe("page");
    expect(link.className.includes("bg-primary-500/15")).toBe(true);
    expect(link.className.includes("text-primary-700")).toBe(true);
    expect(link.className.includes("border-primary-500/60")).toBe(true);
  });
});
