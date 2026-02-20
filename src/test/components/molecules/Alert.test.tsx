import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { Alert } from "@/components/molecules/Alert";

describe("Alert", () => {
  it("renders as role alert with default info variant", () => {
    const { getByRole } = render(<Alert>Info body</Alert>);

    const alert = getByRole("alert");
    expect(alert).toBeTruthy();
    expect(alert.className.includes("bg-blue-50")).toBe(true);
    expect(alert.className.includes("text-blue-900")).toBe(true);
    expect(alert.className.includes("border-blue-200")).toBe(true);
  });

  it("renders title and children", () => {
    const { getByText } = render(
      <Alert title="Warning title">Warning content</Alert>,
    );

    expect(getByText("Warning title")).toBeTruthy();
    expect(getByText("Warning content")).toBeTruthy();
  });

  it("renders icon and applies variant icon color", () => {
    const { getByRole, getByText } = render(
      <Alert variant="success" icon={<span>✓</span>}>
        Done
      </Alert>,
    );

    const alert = getByRole("alert");
    expect(alert.className.includes("bg-green-50")).toBe(true);
    expect(getByText("✓")).toBeTruthy();

    const iconWrapper = getByText("✓").parentElement as HTMLElement | null;
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
      const { getByRole, unmount } = render(
        <Alert variant={variant} className="custom-alert">
          Content
        </Alert>,
      );
      const alert = getByRole("alert");

      expect(alert.className.includes(className)).toBe(true);
      expect(alert.className.includes("custom-alert")).toBe(true);
      unmount();
    });
  });
});
