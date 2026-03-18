import "../../setup";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { HelpTooltipButton } from "@/components/atoms/HelpTooltipButton";

describe("HelpTooltipButton", () => {
  it("renders the help button and tooltip text", () => {
    const { container } = render(<HelpTooltipButton help="Ayuda contextual" />);

    const helpButton = container.querySelector(
      '[aria-label="Información de ayuda del campo"]',
    ) as HTMLButtonElement;
    const tooltip = container.querySelector('[role="tooltip"]');

    expect(helpButton).toBeTruthy();
    expect(container.textContent?.includes("Ayuda contextual")).toBe(true);
    expect(tooltip?.className.includes("surface-backdrop-opaque")).toBe(true);
  });

  it("shows the expected trigger character", () => {
    const { container } = render(<HelpTooltipButton help="Ayuda" />);

    const helpButton = container.querySelector(
      '[aria-label="Información de ayuda del campo"]',
    ) as HTMLButtonElement;

    fireEvent.mouseOver(helpButton);
    expect(helpButton.textContent).toBe("?");
  });
});
