import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Flex } from "@/components/layout/Flex";

describe("Flex", () => {
  it("renders defaults for direction and wrap", () => {
    const { container } = render(<Flex>Item</Flex>);
    const node = container.firstElementChild as HTMLElement | null;

    expect(node).toBeTruthy();
    if (!node) return;
    expect(node.className.includes("flex")).toBe(true);
    expect(node.className.includes("flex-row")).toBe(true);
    expect(node.className.includes("flex-nowrap")).toBe(true);
  });

  it("applies direction, align, justify and wrap props", () => {
    const { container } = render(
      <Flex direction="col" align="center" justify="between" wrap="wrap">
        Item
      </Flex>,
    );
    const node = container.firstElementChild as HTMLElement | null;

    expect(node).toBeTruthy();
    if (!node) return;
    expect(node.className.includes("flex-col")).toBe(true);
    expect(node.className.includes("items-center")).toBe(true);
    expect(node.className.includes("justify-between")).toBe(true);
    expect(node.className.includes("flex-wrap")).toBe(true);
  });

  it("normalizes gap values and merges custom className", () => {
    const { container } = render(
      <>
        <Flex data-testid="gap-number" gap={4} />
        <Flex data-testid="gap-prefixed" gap="gap-6" />
        <Flex data-testid="gap-plain" gap="8" className="custom-flex" />
      </>,
    );

    const numberNode = container.querySelector(
      "[data-testid='gap-number']",
    ) as HTMLElement | null;
    const prefixedNode = container.querySelector(
      "[data-testid='gap-prefixed']",
    ) as HTMLElement | null;
    const plainNode = container.querySelector(
      "[data-testid='gap-plain']",
    ) as HTMLElement | null;

    expect(numberNode).toBeTruthy();
    expect(prefixedNode).toBeTruthy();
    expect(plainNode).toBeTruthy();
    if (!numberNode || !prefixedNode || !plainNode) return;

    expect(numberNode.className.includes("gap-4")).toBe(true);
    expect(prefixedNode.className.includes("gap-6")).toBe(true);
    expect(plainNode.className.includes("gap-8")).toBe(true);
    expect(plainNode.className.includes("custom-flex")).toBe(true);
  });
});
