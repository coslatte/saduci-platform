import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Grid } from "@/components/layout/Grid";

describe("Grid", () => {
  it("always renders with grid base class", () => {
    const { container } = render(<Grid>Item</Grid>);
    const node = container.firstElementChild as HTMLElement | null;

    expect(node).toBeTruthy();
    if (!node) return;
    expect(node.className.includes("grid")).toBe(true);
  });

  it("applies cols mapping classes", () => {
    const mappings = [1, 2, 3, 4, 5, 6, 12] as const;

    mappings.forEach((cols) => {
      const { container, unmount } = render(<Grid cols={cols}>Item</Grid>);
      const node = container.firstElementChild as HTMLElement | null;

      expect(node).toBeTruthy();
      if (!node) return;
      expect(node.className.includes(`grid-cols-${cols}`)).toBe(true);
      unmount();
    });
  });

  it("does not inject grid-cols class when cols is undefined", () => {
    const { container } = render(<Grid data-testid="grid-no-cols">Item</Grid>);
    const node = container.querySelector(
      "[data-testid='grid-no-cols']",
    ) as HTMLElement | null;

    expect(node).toBeTruthy();
    if (!node) return;
    expect(/grid-cols-\d+/.test(node.className)).toBe(false);
  });

  it("merges custom className and forwards props", () => {
    const { container } = render(
      <Grid className="gap-4" aria-label="grid-root">
        Item
      </Grid>,
    );

    const node = container.querySelector(
      "[aria-label='grid-root']",
    ) as HTMLElement | null;
    expect(node).toBeTruthy();
    if (!node) return;
    expect(node.className.includes("gap-4")).toBe(true);
  });
});
