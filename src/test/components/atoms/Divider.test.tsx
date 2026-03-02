import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Divider } from "@/components/atoms/Divider";

describe("Divider", () => {
  it("renders horizontal separator by default", () => {
    const { container } = render(<Divider data-testid="divider" />);

    const separator = container.querySelector("[role='separator']") as HTMLElement | null;
    expect(separator).toBeTruthy();
    if (!separator) return;
    expect(separator.tagName).toBe("HR");
    expect(separator.getAttribute("aria-orientation")).toBe("horizontal");
    expect(separator.className.includes("w-full")).toBe(true);
    expect(separator.getAttribute("data-testid")).toBe("divider");
  });

  it("renders vertical separator when orientation is vertical", () => {
    const { container } = render(
      <div className="h-10">
        <Divider orientation="vertical" className="custom-v" />
      </div>,
    );

    const separator = container.querySelector("[role='separator']") as HTMLElement | null;
    expect(separator).toBeTruthy();
    if (!separator) return;
    expect(separator.tagName).toBe("DIV");
    expect(separator.getAttribute("aria-orientation")).toBe("vertical");
    expect(separator.className.includes("h-full")).toBe(true);
    expect(separator.className.includes("w-px")).toBe(true);
    expect(separator.className.includes("custom-v")).toBe(true);
  });

  it("merges custom className on horizontal variant", () => {
    const { container } = render(<Divider className="my-4" />);
    const separator = container.querySelector("[role='separator']") as HTMLElement | null;
    expect(separator).toBeTruthy();
    if (!separator) return;
    expect(separator.className.includes("my-4")).toBe(true);
    expect(separator.className.includes("w-full")).toBe(true);
  });

  it("sets data-disabled attribute when disabled", () => {
    const { container } = render(<Divider disabled />);
    const separator = container.querySelector("[role='separator']") as HTMLElement | null;
    expect(separator).toBeTruthy();
    if (!separator) return;
    expect(separator.getAttribute("data-disabled")).toBe("true");
  });
});
