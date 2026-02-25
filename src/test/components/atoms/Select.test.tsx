import { render, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Select } from "@/components/atoms/Select";
import "../../setup";

describe("Select", () => {
  it("renders with base styles", () => {
    const { container } = render(
      <Select>
        <option value="0">Vacío</option>
        <option value="1">Opción 1</option>
      </Select>,
    );

    const select = container.querySelector("select");
    expect(select).toBeTruthy();
    if (!select) return;
    expect(select.className.includes("rounded-lg")).toBe(true);
    expect(select.className.includes("border-zinc-300")).toBe(true);
  });

  it("applies error styles when error prop is true", () => {
    const { container } = render(
      <Select error>
        <option value="0">Vacío</option>
      </Select>,
    );

    const select = container.querySelector("select");
    expect(select).toBeTruthy();
    if (!select) return;
    expect(select.className.includes("border-red-400")).toBe(true);
  });

  it("applies fullWidth class when fullWidth is true", () => {
    const { container } = render(
      <Select fullWidth>
        <option value="0">Vacío</option>
      </Select>,
    );

    const select = container.querySelector("select");
    expect(select).toBeTruthy();
    if (!select) return;
    expect(select.className.includes("w-full")).toBe(true);
  });

  it("calls onChange when value changes", () => {
    let changed = false;
    const { container } = render(
      <Select
        onChange={() => {
          changed = true;
        }}
      >
        <option value="0">Vacío</option>
        <option value="1">Opción 1</option>
      </Select>,
    );

    const select = container.querySelector("select");
    expect(select).toBeTruthy();
    if (!select) return;
    fireEvent.change(select, { target: { value: "1" } });
    expect(changed).toBe(true);
  });

  it("renders children options", () => {
    const { getByText } = render(
      <Select>
        <option value="1">Sepsis grave</option>
        <option value="2">Coma</option>
      </Select>,
    );

    expect(getByText("Sepsis grave")).toBeTruthy();
    expect(getByText("Coma")).toBeTruthy();
  });
});
