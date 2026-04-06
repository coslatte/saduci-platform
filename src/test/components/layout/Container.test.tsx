import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Container } from "@/components/layout/Container";

describe("Container", () => {
  it("uses lg size by default", () => {
    const { container } = render(<Container>Content</Container>);
    const node = container.firstElementChild as HTMLElement | null;

    expect(node).toBeTruthy();
    if (!node) return;
    expect(node.className.includes("max-w-7xl")).toBe(true);
  });

  it("applies all size mappings", () => {
    const mappings = [
      { size: "sm" as const, className: "max-w-3xl" },
      { size: "md" as const, className: "max-w-5xl" },
      { size: "lg" as const, className: "max-w-7xl" },
      { size: "xl" as const, className: "max-w-384" },
      { size: "full" as const, className: "max-w-full" },
    ];

    mappings.forEach(({ size, className }) => {
      const { container, unmount } = render(
        <Container size={size}>X</Container>,
      );
      const node = container.firstElementChild as HTMLElement | null;

      expect(node).toBeTruthy();
      if (!node) return;
      expect(node.className.includes(className)).toBe(true);
      expect(node.className.includes("mx-auto")).toBe(true);
      expect(node.className.includes("w-full")).toBe(true);
      unmount();
    });
  });

  it("merges className and forwards props", () => {
    const { container } = render(
      <Container className="bg-white" data-testid="container-test">
        Y
      </Container>,
    );

    const node = container.querySelector("[data-testid='container-test']");
    expect(node).toBeTruthy();
    if (!node) return;
    expect(node.className.includes("bg-white")).toBe(true);
  });
});
