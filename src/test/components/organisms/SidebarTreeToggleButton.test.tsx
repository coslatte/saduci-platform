import "../../setup";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import { SidebarTreeToggleButton } from "@/components/organisms/sidebar/SidebarTreeToggleButton";

describe("SidebarTreeToggleButton", () => {
  it("renders expand label and calls onToggle", () => {
    const onToggle = mock(() => {});

    const { getByRole } = render(
      <SidebarTreeToggleButton
        expanded={false}
        label="Simulación"
        onToggle={onToggle}
      />,
    );

    const button = getByRole("button", {
      name: /expandir sección simulación/i,
    });

    fireEvent.click(button);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("renders collapse label when expanded", () => {
    const { getByRole } = render(
      <SidebarTreeToggleButton
        expanded={true}
        label="Simulación"
        onToggle={() => {}}
      />,
    );

    const button = getByRole("button", {
      name: /contraer sección simulación/i,
    });

    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(button.className.includes("surface-backdrop-opaque")).toBe(true);
  });
});
