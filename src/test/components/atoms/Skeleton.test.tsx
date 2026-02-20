import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Skeleton } from "@/components/atoms/Skeleton";

describe("Skeleton", () => {
  it("renders with base skeleton classes", () => {
    const { container } = render(<Skeleton data-testid="skeleton" />);

    const node = container.querySelector("[data-testid='skeleton']");
    expect(node).toBeTruthy();
    if (!node) return;

    expect(node.className.includes("animate-pulse")).toBe(true);
    expect(node.className.includes("rounded-md")).toBe(true);
    expect(node.className.includes("bg-zinc-200/80")).toBe(true);
  });

  it("merges custom className and forwards attributes", () => {
    const { container } = render(
      <Skeleton className="h-6 w-20 rounded-full" aria-label="loading line" />,
    );

    const node = container.querySelector("[aria-label='loading line']");
    expect(node).toBeTruthy();
    if (!node) return;

    expect(node.className.includes("h-6")).toBe(true);
    expect(node.className.includes("w-20")).toBe(true);
    expect(node.className.includes("rounded-full")).toBe(true);
  });
});
