import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { TestingBoard } from "../components/TestingBoard";

describe("TestingBoard", () => {
  it("defaults to horizontal layout", () => {
    const { getByTestId } = render(
      <TestingBoard>
        <span data-testid="child">child</span>
      </TestingBoard>,
    );

    const child = getByTestId("child");
    expect(child).toBeTruthy();
    const container = child.parentElement;
    expect(container).toBeTruthy();
    if (!container) return;
    expect(container.className.includes("flex")).toBe(true);
    expect(container.className.includes("flex-wrap")).toBe(true);
    expect(container.className.includes("flex-row")).toBe(true);
  });

  it('accepts direction="vertical"', () => {
    const { getByTestId } = render(
      <TestingBoard direction="vertical">
        <span data-testid="child-2">child</span>
      </TestingBoard>,
    );

    const child = getByTestId("child-2");
    expect(child).toBeTruthy();
    const container = child.parentElement;
    expect(container).toBeTruthy();
    if (!container) return;
    expect(container.className.includes("flex")).toBe(true);
    expect(container.className.includes("flex-wrap")).toBe(true);
    expect(container.className.includes("flex-col")).toBe(true);
  });
});
