import "../../setup";
import { render, fireEvent, act } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Popover } from "@/components/molecules/Popover";

const ANIMATION_MS = 300;

describe("Popover", () => {
  it("toggles content when trigger is clicked", async () => {
    const { container, queryByText } = render(
      <Popover trigger={<span>Open</span>}>
        <div>Contenido</div>
      </Popover>,
    );

    expect(queryByText("Contenido")).toBeNull();

    const btn = container.querySelector("button");
    expect(btn).toBeTruthy();
    if (!btn) return;

    fireEvent.click(btn);
    expect(queryByText("Contenido")).toBeTruthy();

    fireEvent.click(btn);
    await act(async () => {
      await new Promise((r) => setTimeout(r, ANIMATION_MS));
    });
    expect(queryByText("Contenido")).toBeNull();
  });

  it("closes when clicking outside", async () => {
    const { container, queryByText } = render(
      <div>
        <Popover trigger={<span>Toggle</span>}>
          <div>Outside test</div>
        </Popover>
        <button>OutsideButton</button>
      </div>,
    );

    const toggle = container.querySelectorAll("button")[0];
    expect(toggle).toBeTruthy();
    if (!toggle) return;

    fireEvent.click(toggle);
    expect(queryByText("Outside test")).toBeTruthy();

    const outside = container.querySelectorAll("button")[1];
    expect(outside).toBeTruthy();
    if (!outside) return;

    fireEvent.mouseDown(outside);
    await act(async () => {
      await new Promise((r) => setTimeout(r, ANIMATION_MS));
    });
    expect(queryByText("Outside test")).toBeNull();
  });

  it("closes on Escape key", async () => {
    const { container, queryByText } = render(
      <Popover trigger={<span>Esc</span>}>
        <div>EscapeContent</div>
      </Popover>,
    );

    const btn = container.querySelector("button");
    if (!btn) return;
    fireEvent.click(btn);
    expect(queryByText("EscapeContent")).toBeTruthy();

    fireEvent.keyDown(document, { key: "Escape" });
    await act(async () => {
      await new Promise((r) => setTimeout(r, ANIMATION_MS));
    });
    expect(queryByText("EscapeContent")).toBeNull();
  });

  it("renders trigger button with aria attributes", () => {
    const { container } = render(
      <Popover trigger={<span>Info</span>}>
        <div>Panel</div>
      </Popover>,
    );
    const btn = container.querySelector("button");
    expect(btn).toBeTruthy();
    if (!btn) return;
    expect(btn.getAttribute("aria-haspopup")).toBe("dialog");
    expect(btn.getAttribute("aria-expanded")).toBe("false");
  });

  it("sets aria-expanded to true when open", () => {
    const { container } = render(
      <Popover trigger={<span>Open</span>}>
        <div>Panel</div>
      </Popover>,
    );
    const btn = container.querySelector("button")!;
    fireEvent.click(btn);
    expect(btn.getAttribute("aria-expanded")).toBe("true");
  });

  it("does not close when mousedown happens inside portal content", () => {
    const { queryByText, container } = render(
      <Popover trigger={<span>Open</span>}>
        <div>
          <button type="button">PanelAction</button>
        </div>
      </Popover>,
    );

    const trigger = container.querySelector("[aria-haspopup]") as HTMLElement;
    fireEvent.click(trigger);

    const panelBtn = queryByText("PanelAction");
    expect(panelBtn).toBeTruthy();

    fireEvent.mouseDown(panelBtn!);

    expect(queryByText("PanelAction")).toBeTruthy();
  });
});
