import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Button } from "@/components/atoms/Buttons/Button";

describe("Button (centralized)", () => {
  it("applies success variant classes", () => {
    const { container } = render(<Button variant="success">Guardar</Button>);

    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;

    expect(button.className.includes("bg-green-600")).toBe(true);
    expect(button.className.includes("hover:bg-green-700")).toBe(true);
  });
});
