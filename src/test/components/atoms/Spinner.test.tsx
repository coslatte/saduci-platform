import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Spinner } from "@/components/atoms/Spinner";

describe("Spinner component", () => {
  it("renders with default props", () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector("svg[role='status']");
    expect(svg).toBeTruthy();
  });

  it("accepts different sizes", () => {
    const sizes: Array<"xs" | "sm" | "md" | "lg" | "xl"> = [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
    ];

    const map: Record<string, number> = {
      xs: 3,
      sm: 4,
      md: 6,
      lg: 8,
      xl: 10,
    };

    sizes.forEach((size) => {
      const { container, unmount } = render(<Spinner size={size} />);
      const svg = container.querySelector("svg[role='status']");
      expect(svg).toBeTruthy();
      if (!svg) return;
      expect(svg.className.includes(`size-${map[size]}`)).toBe(true);
      unmount();
    });
  });

  it("allows overriding className and label", () => {
    const { container } = render(
      <Spinner className="text-red-500" label="Cargando" />,
    );
    const svg = container.querySelector("svg[role='status']");
    expect(svg).toBeTruthy();
    if (!svg) return;
    expect(svg.className.includes("text-red-500")).toBe(true);
    expect(svg.getAttribute("aria-label")).toBe("Cargando");
  });

  it("uses Loading... as default aria-label", () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector("svg[role='status']");
    expect(svg).toBeTruthy();
    if (!svg) return;
    expect(svg.getAttribute("aria-label")).toBe("Loading...");
  });

  it("applies animate-spin class", () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector("svg[role='status']");
    expect(svg).toBeTruthy();
    if (!svg) return;
    expect(svg.className.includes("animate-spin")).toBe(true);
  });
});
