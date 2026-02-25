import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Stack } from "@/components/layout/Stack";

describe("Stack", () => {
  it("uses md spacing by default", () => {
    const { container } = render(<Stack>Item</Stack>);
    const node = container.firstElementChild as HTMLElement | null;

    expect(node).toBeTruthy();
    if (!node) return;
    expect(node.className.includes("flex")).toBe(true);
    expect(node.className.includes("flex-col")).toBe(true);
    expect(node.className.includes("gap-4")).toBe(true);
  });

  it("applies all spacing mappings", () => {
    const mappings = [
      { space: "sm" as const, className: "gap-2" },
      { space: "md" as const, className: "gap-4" },
      { space: "lg" as const, className: "gap-6" },
      { space: "xl" as const, className: "gap-8" },
    ];

    mappings.forEach(({ space, className }) => {
      const { container, unmount } = render(<Stack space={space}>Item</Stack>);
      const node = container.firstElementChild as HTMLElement | null;

      expect(node).toBeTruthy();
      if (!node) return;
      expect(node.className.includes(className)).toBe(true);
      unmount();
    });
  });

  it("merges custom className and forwards props", () => {
    const { container } = render(
      <Stack className="bg-white" data-testid="stack-root">
        Item
      </Stack>,
    );

    const node = container.querySelector(
      "[data-testid='stack-root']",
    ) as HTMLElement | null;
    expect(node).toBeTruthy();
    if (!node) return;
    expect(node.className.includes("bg-white")).toBe(true);
  });
});
