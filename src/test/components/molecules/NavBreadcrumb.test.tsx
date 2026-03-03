import "../../setup";
import { render, fireEvent } from "@testing-library/react";
import { describe, expect, it, mock, beforeAll, beforeEach } from "bun:test";
import type { FC } from "react";

const mockBack = mock(() => {});

mock.module("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ back: mockBack }),
  useSearchParams: () => new URLSearchParams(),
}));

interface NavBreadcrumbProps {
  brandName: string;
  currentPage: string;
  className?: string;
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
    const { getByText } = render(
      <NavBreadcrumb brandName="Saduci" currentPage="Simulación" />,
    );
    expect(getByText("Saduci")).toBeTruthy();
    expect(getByText("Simulación")).toBeTruthy();
  });

  it("calls router.back() when brand button is clicked", () => {
    const { getByRole } = render(
      <NavBreadcrumb brandName="Saduci" currentPage="Dashboard" />,
    );
    fireEvent.click(getByRole("button"));
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("brand button has descriptive aria-label", () => {
    const { getByRole } = render(
      <NavBreadcrumb brandName="Saduci" currentPage="Usuarios" />,
    );
    expect(getByRole("button").getAttribute("aria-label")).toContain("Saduci");
  });

  it("current page has aria-current='page'", () => {
    const { getByText } = render(
      <NavBreadcrumb brandName="Saduci" currentPage="Ajustes" />,
    );
    expect(getByText("Ajustes").getAttribute("aria-current")).toBe("page");
  });

  it("renders nav landmark with breadcrumb label", () => {
    const { getByRole } = render(
      <NavBreadcrumb brandName="Saduci" currentPage="Dashboard" />,
    );
    expect(getByRole("navigation").getAttribute("aria-label")).toBe(
      "Breadcrumb",
    );
  });
});
