import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Alert } from "@/components/molecules/Alert";

describe("Alert", () => {
  it("renders as role alert with default info variant", () => {
    const { container } = render(<Alert>Info body</Alert>);

    const alert = container.querySelector("[role='alert']") as HTMLElement | null;
    expect(alert).toBeTruthy();
    if (!alert) return;
    expect(alert.className.includes("bg-blue-50")).toBe(true);
    expect(alert.className.includes("text-blue-900")).toBe(true);
    expect(alert.className.includes("border-blue-200")).toBe(true);
  });

  it("renders title and children", () => {
    const { container } = render(
      <Alert title="Warning title">Warning content</Alert>,
    );

    expect(container.textContent?.includes("Warning title")).toBe(true);
    expect(container.textContent?.includes("Warning content")).toBe(true);
  });

  it("renders icon and applies variant icon color", () => {
    const { container } = render(
      <Alert variant="success" icon={<span>✓</span>}>
        Done
      </Alert>,
    );

    const alert = container.querySelector("[role='alert']") as HTMLElement | null;
    expect(alert).toBeTruthy();
    if (!alert) return;
    expect(alert.className.includes("bg-green-50")).toBe(true);
    expect(container.textContent?.includes("✓")).toBe(true);

    const iconEl = container.querySelector("span");
    const iconWrapper = iconEl?.parentElement as HTMLElement | null;
    expect(iconWrapper).toBeTruthy();
    if (!iconWrapper) return;
    expect(iconWrapper.className.includes("text-green-500")).toBe(true);
  });

  it("supports all semantic variants and custom className", () => {
    const variants = [
      { variant: "warning" as const, className: "bg-yellow-50" },
      { variant: "danger" as const, className: "bg-red-50" },
    ];

    variants.forEach(({ variant, className }) => {
      const { container, unmount } = render(
        <Alert variant={variant} className="custom-alert">
          Content
        </Alert>,
      );
      const alert = container.querySelector("[role='alert']") as HTMLElement | null;
      expect(alert).toBeTruthy();
      if (!alert) return;

      expect(alert.className.includes(className)).toBe(true);
      expect(alert.className.includes("custom-alert")).toBe(true);
      unmount();
    });
  });

  it("applies correct text color for warning variant", () => {
    const { container } = render(<Alert variant="warning">Aviso</Alert>);
    const alert = container.querySelector("[role='alert']") as HTMLElement | null;
    expect(alert).toBeTruthy();
    if (!alert) return;
    expect(alert.className.includes("text-yellow-900")).toBe(true);
    expect(alert.className.includes("border-yellow-200")).toBe(true);
  });

  it("applies correct text color for danger variant", () => {
    const { container } = render(<Alert variant="danger">Error</Alert>);
    const alert = container.querySelector("[role='alert']") as HTMLElement | null;
    expect(alert).toBeTruthy();
    if (!alert) return;
    expect(alert.className.includes("text-red-900")).toBe(true);
    expect(alert.className.includes("border-red-200")).toBe(true);
  });

  it("does not render title element when title prop is absent", () => {
    const { container } = render(<Alert>Sin título</Alert>);
    expect(container.querySelector("h2, h3, h4, h5, h6")).toBeNull();
  });

  it("sets data-disabled when disabled", () => {
    const { container } = render(<Alert disabled>Bloqueado</Alert>);
    const alert = container.querySelector("[role='alert']") as HTMLElement | null;
    expect(alert).toBeTruthy();
    if (!alert) return;
    expect(alert.getAttribute("data-disabled")).toBe("true");
  });
});
