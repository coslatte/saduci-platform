import "../../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { BaseButton } from "@/components/atoms/Buttons";

describe("BaseButton", () => {
  it("renders children and stays enabled by default", () => {
    const { container } = render(<BaseButton>Guardar</BaseButton>);

    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;
    expect(button.textContent?.includes("Guardar")).toBe(true);
    expect(button.hasAttribute("disabled")).toBe(false);
  });

  it("disables button and shows loading spinner when loading=true", () => {
    const { container } = render(<BaseButton loading>Guardar</BaseButton>);

    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;
    expect(button.hasAttribute("disabled")).toBe(true);
    const spinner = container.querySelector("svg[aria-label='Cargando...']");
    expect(spinner).toBeTruthy();
  });

  it("allows custom spinner override", () => {
    const { getByTestId } = render(
      <BaseButton loading spinner={<span data-testid="custom-spinner" />}>
        Guardar
      </BaseButton>,
    );

    expect(getByTestId("custom-spinner")).toBeTruthy();
  });

  it("fires onClick when clicked", () => {
    let clicked = false;
    const { container } = render(
      <BaseButton
        onClick={() => {
          clicked = true;
        }}
      >
        Guardar
      </BaseButton>,
    );
    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;
    button.click();
    expect(clicked).toBe(true);
  });

  it("does not fire onClick when disabled", () => {
    let clicked = false;
    const { container } = render(
      <BaseButton
        disabled
        onClick={() => {
          clicked = true;
        }}
      >
        Guardar
      </BaseButton>,
    );
    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;
    button.click();
    expect(clicked).toBe(false);
  });

  it("disables button when disabled prop is true", () => {
    const { container } = render(<BaseButton disabled>Guardar</BaseButton>);
    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    if (!button) return;
    expect(button.hasAttribute("disabled")).toBe(true);
  });
});
