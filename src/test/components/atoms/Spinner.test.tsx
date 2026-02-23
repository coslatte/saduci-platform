import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Spinner } from "@/components/atoms/Spinner";

describe("Spinner component", () => {
  it("renders with default props", () => {
    const { getByRole } = render(<Spinner />);
    const svg = getByRole("status");
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
      const { getByRole, unmount } = render(<Spinner size={size} />);
      const svg = getByRole("status");
      expect(svg.className.includes(`size-${map[size]}`)).toBe(true);
      unmount();
    });
  });

  it("allows overriding className and label", () => {
    const { getByRole } = render(
      <Spinner className="text-red-500" label="Cargando" />,
    );
    const svg = getByRole("status");
    expect(svg.className.includes("text-red-500")).toBe(true);
    expect(svg.getAttribute("aria-label")).toBe("Cargando");
  });
});
