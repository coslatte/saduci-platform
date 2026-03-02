import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Sidebar } from "@/components/organisms/Sidebar";
import { SIDEBAR_BRAND_FULL } from "@/constants/constants";

const sections = [
  {
    title: "Principal",
    items: [{ label: "Dashboard", href: "/", active: true }],
  },
];

describe("Sidebar", () => {
  it("renders section items", () => {
    const { container } = render(<Sidebar sections={sections} />);
    expect(container.textContent?.includes("Dashboard")).toBe(true);
  });

  it("hides labels when collapsed", () => {
    const { container } = render(
      <Sidebar sections={sections} collapsed={true} />,
    );
    expect(container.textContent?.includes("Dashboard")).toBe(false);
  });

  it("renders section title when not collapsed", () => {
    const { container } = render(<Sidebar sections={sections} />);
    expect(container.textContent?.includes("Principal")).toBe(true);
  });

  it("hides section title when collapsed", () => {
    const { container } = render(
      <Sidebar sections={sections} collapsed={true} />,
    );
    expect(container.textContent?.includes("Principal")).toBe(false);
  });

  it("renders brand full name when not collapsed", () => {
    const { container } = render(<Sidebar sections={sections} />);
    expect(container.textContent?.includes(SIDEBAR_BRAND_FULL)).toBe(true);
  });

  it("marks the active route link with aria-current", () => {
    const { container } = render(<Sidebar sections={sections} />);
    const activeLink = container.querySelector("a[aria-current='page']");
    expect(activeLink).toBeTruthy();
  });

  it("applies narrow width when collapsed", () => {
    const { container } = render(
      <Sidebar sections={sections} collapsed={true} />,
    );
    const aside = container.querySelector("aside");
    expect(aside).toBeTruthy();
    if (!aside) return;
    expect(aside.className.includes("w-20")).toBe(true);
  });

  it("applies full width when not collapsed", () => {
    const { container } = render(<Sidebar sections={sections} />);
    const aside = container.querySelector("aside");
    expect(aside).toBeTruthy();
    if (!aside) return;
    expect(aside.className.includes("w-64")).toBe(true);
  });
});
