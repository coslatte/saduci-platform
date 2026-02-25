import "../../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Button } from "@/components/atoms/Buttons";

describe("Button", () => {
  it("applies success variant classes", () => {
    const { container } = render(<Button variant="success">Guardar</Button>);

    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;
    expect(button.className.includes("bg-green-600")).toBe(true);
    expect(button.className.includes("hover:bg-green-700")).toBe(true);
  });

  it("applies danger variant classes", () => {
    const { container } = render(<Button variant="danger">Eliminar</Button>);

    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;
    expect(button.className.includes("bg-red-600")).toBe(true);
  });

  it("applies size and fullWidth classes", () => {
    const { container } = render(
      <Button size="lg" fullWidth>
        Continuar
      </Button>,
    );

    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;
    expect(button.className.includes("h-10")).toBe(true);
    expect(button.className.includes("w-full")).toBe(true);
  });

  it("disables when loading", () => {
    const { container } = render(<Button loading>Procesando</Button>);

    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;
    expect(button.hasAttribute("disabled")).toBe(true);
  });
});
