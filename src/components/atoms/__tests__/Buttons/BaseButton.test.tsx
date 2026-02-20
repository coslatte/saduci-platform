import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { BaseButton } from "../../Buttons/BaseButton";

describe("BaseButton", () => {
  it("renders children and stays enabled by default", () => {
    const { getByRole, getByText } = render(<BaseButton>Guardar</BaseButton>);

    const button = getByRole("button");
    const label = getByText("Guardar");
    expect(button).toBeTruthy();
    expect(label).toBeTruthy();
    expect(button.hasAttribute("disabled")).toBe(false);
  });

  it("disables button and shows loading spinner when loading=true", () => {
    const { getByRole, getByLabelText } = render(
      <BaseButton loading>Guardar</BaseButton>,
    );

    const button = getByRole("button");
    expect(button.hasAttribute("disabled")).toBe(true);
    expect(getByLabelText("Cargando...")).toBeTruthy();
  });

  it("allows custom spinner override", () => {
    const { getByTestId } = render(
      <BaseButton loading spinner={<span data-testid="custom-spinner" />}>
        Guardar
      </BaseButton>,
    );

    expect(getByTestId("custom-spinner")).toBeTruthy();
  });
});
