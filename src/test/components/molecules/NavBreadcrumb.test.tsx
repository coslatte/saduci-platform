import "../../setup";
import { render, fireEvent, within } from "@testing-library/react";
import { describe, expect, it, beforeAll, beforeEach, mock } from "bun:test";
import type { FC } from "react";

const mockBack = mock(() => {});

interface NavBreadcrumbProps {
  brandName: string;
  currentPage: string;
  className?: string;
  onBack?: () => void;
}

describe("NavBreadcrumb", () => {
  let NavBreadcrumb: FC<NavBreadcrumbProps>;

  beforeAll(async () => {
    NavBreadcrumb = (await import("@/components/molecules/NavBreadcrumb"))
      .NavBreadcrumb;
  });

  beforeEach(() => {
    mockBack.mockClear();
  });

  it("renders brand name and current page", () => {
    const { container } = render(
      <NavBreadcrumb brandName="Saduci" currentPage="Simulación" />,
    );
    const nav = container.querySelector<HTMLElement>(
      'nav[aria-label="Breadcrumb"]',
    );
    if (!nav) throw new Error("Breadcrumb nav not found");
    expect(within(nav).getByRole("button", { name: /Saduci/ })).toBeTruthy();
    expect(within(nav).getByText("Simulación")).toBeTruthy();
  });

  it("calls router.back() when brand button is clicked", () => {
    const { container } = render(
      <NavBreadcrumb
        brandName="Saduci"
        currentPage="Dashboard"
        onBack={mockBack}
      />,
    );
    const nav = container.querySelector<HTMLElement>(
      'nav[aria-label="Breadcrumb"]',
    );
    if (!nav) throw new Error("Breadcrumb nav not found");
    const btn = within(nav).getByRole("button", { name: /Saduci/ });
    fireEvent.click(btn);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("brand button has descriptive aria-label", () => {
    const { container } = render(
      <NavBreadcrumb
        brandName="Saduci"
        currentPage="Usuarios"
        onBack={mockBack}
      />,
    );
    const nav = container.querySelector<HTMLElement>(
      'nav[aria-label="Breadcrumb"]',
    );
    if (!nav) throw new Error("Breadcrumb nav not found");
    const btn = within(nav).getByRole("button", { name: /Saduci/ });
    expect(btn.getAttribute("aria-label")).toContain("Saduci");
  });

  it("current page has aria-current='page'", () => {
    const { container } = render(
      <NavBreadcrumb brandName="Saduci" currentPage="Ajustes" />,
    );
    const nav = container.querySelector<HTMLElement>(
      'nav[aria-label="Breadcrumb"]',
    );
    if (!nav) throw new Error("Breadcrumb nav not found");
    expect(within(nav).getByText("Ajustes").getAttribute("aria-current")).toBe(
      "page",
    );
  });

  it("renders nav landmark with breadcrumb label", () => {
    const { container } = render(
      <NavBreadcrumb brandName="Saduci" currentPage="Dashboard" />,
    );
    const nav = container.querySelector<HTMLElement>(
      'nav[aria-label="Breadcrumb"]',
    );
    if (!nav) throw new Error("Breadcrumb nav not found");
    expect(nav.getAttribute("aria-label")).toBe("Breadcrumb");
  });
});
