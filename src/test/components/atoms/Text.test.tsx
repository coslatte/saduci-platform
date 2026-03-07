import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Text } from "@/components/atoms/Text";

describe("Text", () => {
  it("renders as <p> by default", () => {
    const { container } = render(<Text>Hello</Text>);
    const el = container.querySelector("p");
    expect(el).toBeTruthy();
    expect(el?.textContent).toBe("Hello");
  });

  it("renders the correct HTML element via `as` prop", () => {
    const tags = ["h1", "h2", "h3", "h4", "h5", "h6", "span"] as const;
    for (const tag of tags) {
      const { container } = render(<Text as={tag}>Test</Text>);
      expect(container.querySelector(tag)).toBeTruthy();
    }
  });

  it("applies base text color by default", () => {
    const { container } = render(<Text>Default</Text>);
    const el = container.querySelector("p") as HTMLElement;
    expect(el.className.includes("text-zinc-900")).toBe(true);
  });

  it("applies muted color when muted=true", () => {
    const { container } = render(<Text muted>Muted</Text>);
    const el = container.querySelector("p") as HTMLElement;
    expect(el.className.includes("text-slate-500")).toBe(true);
    expect(el.className.includes("text-zinc-900")).toBe(false);
  });

  it("applies correct weight class", () => {
    const cases: Array<[Parameters<typeof Text>[0]["weight"], string]> = [
      ["normal", "font-normal"],
      ["medium", "font-medium"],
      ["semibold", "font-semibold"],
      ["bold", "font-bold"],
    ];
    for (const [weight, expected] of cases) {
      const { container } = render(<Text weight={weight}>W</Text>);
      const el = container.querySelector("p") as HTMLElement;
      expect(el.className.includes(expected)).toBe(true);
    }
  });

  it("applies uppercase when uppercase=true", () => {
    const { container } = render(<Text uppercase>UP</Text>);
    const el = container.querySelector("p") as HTMLElement;
    expect(el.className.includes("uppercase")).toBe(true);
  });

  it("does not apply uppercase by default", () => {
    const { container } = render(<Text>Normal</Text>);
    const el = container.querySelector("p") as HTMLElement;
    expect(el.className.includes("uppercase")).toBe(false);
  });

  it("applies mono font when mono=true", () => {
    const { container } = render(<Text mono>Code</Text>);
    const el = container.querySelector("p") as HTMLElement;
    expect(el.className.includes("font-mono")).toBe(true);
  });

  it("applies separator styles when separator=true", () => {
    const { container } = render(<Text separator>Section</Text>);
    const el = container.querySelector("p") as HTMLElement;
    expect(el.className.includes("border-b")).toBe(true);
    expect(el.className.includes("pb-3")).toBe(true);
  });

  it("does not apply separator styles by default", () => {
    const { container } = render(<Text>Plain</Text>);
    const el = container.querySelector("p") as HTMLElement;
    expect(el.className.includes("border-b")).toBe(false);
  });

  it("applies tracking class correctly", () => {
    const cases: Array<[Parameters<typeof Text>[0]["tracking"], string]> = [
      ["tight", "tracking-tight"],
      ["wide", "tracking-wide"],
      ["widest", "tracking-widest"],
    ];
    for (const [tracking, expected] of cases) {
      const { container } = render(<Text tracking={tracking}>T</Text>);
      const el = container.querySelector("p") as HTMLElement;
      expect(el.className.includes(expected)).toBe(true);
    }
  });

  it("merges custom className", () => {
    const { container } = render(<Text className="custom-class">Merge</Text>);
    const el = container.querySelector("p") as HTMLElement;
    expect(el.className.includes("custom-class")).toBe(true);
  });

  it("forwards additional HTML attributes", () => {
    const { container } = render(
      <Text id="my-text" data-testid="txt">
        Attr
      </Text>,
    );
    const el = container.querySelector("p") as HTMLElement;
    expect(el.getAttribute("id")).toBe("my-text");
    expect(el.getAttribute("data-testid")).toBe("txt");
  });

  it("applies secondary family class when requested", () => {
    const { container } = render(<Text family="secondary">Heading</Text>);
    const el = container.querySelector("p") as HTMLElement;
    expect(el.className.includes("font-secondary")).toBe(true);
  });
});
