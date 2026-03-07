import "../setup";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import GlobalErrorPage from "@/app/components/GlobalErrorPage";
import {
  ERROR_PAGE_BACK_BUTTON,
  ERROR_PAGE_RETRY_BUTTON,
  ERROR_PAGE_TITLE,
} from "@/constants/constants";

describe("GlobalErrorPage", () => {
  it("renders the error state and digest", () => {
    const consoleError = mock(() => {});
    const originalConsoleError = console.error;
    console.error = consoleError as typeof console.error;

    const { container } = render(
      <GlobalErrorPage
        error={Object.assign(new Error("Boom"), { digest: "abc123" })}
        reset={() => {}}
      />,
    );

    expect(container.textContent?.includes(ERROR_PAGE_TITLE)).toBe(true);
    expect(container.textContent?.includes("Referencia: abc123")).toBe(true);
    expect(container.textContent?.includes("500")).toBe(true);
    expect(consoleError).toHaveBeenCalled();

    console.error = originalConsoleError;
  });

  it("calls reset when retry button is clicked", () => {
    const reset = mock(() => {});
    const consoleError = mock(() => {});
    const originalConsoleError = console.error;
    console.error = consoleError as typeof console.error;

    const { getByRole } = render(
      <GlobalErrorPage error={new Error("Boom")} reset={reset} />,
    );

    fireEvent.click(
      getByRole("button", {
        name: new RegExp(ERROR_PAGE_RETRY_BUTTON, "i"),
      }),
    );

    expect(reset).toHaveBeenCalledTimes(1);
    expect(
      getByRole("button", {
        name: new RegExp(ERROR_PAGE_BACK_BUTTON, "i"),
      }),
    ).toBeTruthy();

    console.error = originalConsoleError;
  });
});
