import { describe, expect, it } from "bun:test";
import "../../setup";
import { render } from "@testing-library/react";
import { TestingBoard } from "@/test/components/TestingBoard";

describe("TestingBoard", () => {
  it("defaults to horizontal layout", () => {
    const { container } = render(
      <TestingBoard>
        <span data-testid="child">child</span>
      </TestingBoard>,
    );

    const child = container.querySelector("[data-testid='child']");
    expect(child).toBeTruthy();
    const wrapper = child?.parentElement;
    expect(wrapper).toBeTruthy();
    if (!wrapper) return;
    expect(wrapper.className.includes("flex")).toBe(true);
    expect(wrapper.className.includes("flex-wrap")).toBe(true);
    expect(wrapper.className.includes("flex-row")).toBe(true);
  });

  it('accepts direction="vertical"', () => {
    const { container } = render(
      <TestingBoard direction="vertical">
        <span data-testid="child-2">child</span>
      </TestingBoard>,
    );

    const child = container.querySelector("[data-testid='child-2']");
    expect(child).toBeTruthy();
    const wrapper = child?.parentElement;
    expect(wrapper).toBeTruthy();
    if (!wrapper) return;
    expect(wrapper.className.includes("flex")).toBe(true);
    expect(wrapper.className.includes("flex-wrap")).toBe(true);
    expect(wrapper.className.includes("flex-col")).toBe(true);
  });
});
