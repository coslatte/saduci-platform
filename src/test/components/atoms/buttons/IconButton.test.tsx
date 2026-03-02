import "../../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { IconButton } from "@/components/atoms/Buttons";

describe("IconButton", () => {
  it("renders icon button with aria-label", () => {
    const { container, getByTestId } = render(
      <IconButton
        aria-label="Agregar"
        icon={<svg data-testid="icon-plus" />}
      />,
    );

    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    expect(getByTestId("icon-plus")).toBeTruthy();
  });

  it("applies danger variant and xl size classes", () => {
    const { container } = render(
      <IconButton
        aria-label="Eliminar"
        icon={<svg data-testid="icon-trash" />}
        variant="danger"
        size="xl"
      />,
    );

    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;
    expect(button.className.includes("bg-red-600")).toBe(true);
    expect(button.className.includes("size-12")).toBe(true);
  });

  it("applies success (green) variant for add buttons", () => {
    const { container } = render(
      <IconButton
        aria-label="Agregar"
        icon={<svg data-testid="icon-plus" />}
        variant="success"
      />,
    );

    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;
    expect(button.className.includes("bg-green-600")).toBe(true);
  });

  it("disables when loading", () => {
    const { container } = render(
      <IconButton aria-label="Cargando" icon={<svg />} loading />,
    );

    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;
    expect(button.hasAttribute("disabled")).toBe(true);
    const spinner = container.querySelector("svg[aria-label='Cargando...']");
    expect(spinner).toBeTruthy();
  });

  it("fires onClick when clicked", () => {
    let clicked = false;
    const { container } = render(
      <IconButton
        aria-label="Acción"
        icon={<svg />}
        onClick={() => {
          clicked = true;
        }}
      />,
    );
    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;
    button.click();
    expect(clicked).toBe(true);
  });

  it("applies primary variant classes", () => {
    const { container } = render(
      <IconButton aria-label="Guardar" icon={<svg />} variant="primary" />,
    );
    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;
    expect(button.className.includes("bg-primary-600")).toBe(true);
  });

  it("renders as a round button", () => {
    const { container } = render(
      <IconButton aria-label="Opción" icon={<svg data-testid="i" />} />,
    );
    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;
    expect(button.className.includes("rounded-full")).toBe(true);
  });
});
