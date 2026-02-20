import { render, screen } from "@testing-library/react";
import { TestingBoard } from "../components/TestingBoard";

describe("TestingBoard", () => {
  it("defaults to horizontal layout", () => {
    render(
      <TestingBoard>
        <span data-testid="child">child</span>
      </TestingBoard>,
    );

    const child = screen.getByTestId("child");
    expect(child).toBeInTheDocument();
    const container = child.parentElement;
    expect(container).toHaveClass("flex", "flex-wrap", "flex-row");
  });

  it('accepts direction="vertical"', () => {
    render(
      <TestingBoard direction="vertical">
        <span data-testid="child-2">child</span>
      </TestingBoard>,
    );

    const child = screen.getByTestId("child-2");
    expect(child).toBeInTheDocument();
    const container = child.parentElement;
    expect(container).toHaveClass("flex", "flex-wrap", "flex-col");
  });
});
