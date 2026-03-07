import "../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import NotFoundPage from "@/app/components/NotFoundPage";
import {
  NOT_FOUND_BACK_BUTTON,
  NOT_FOUND_CODE,
  NOT_FOUND_SUBTITLE,
  NOT_FOUND_TITLE,
} from "@/constants/constants";

describe("NotFoundPage", () => {
  it("renders the not found content and home link", () => {
    const { container, getByRole } = render(<NotFoundPage />);

    expect(container.textContent?.includes(NOT_FOUND_CODE)).toBe(true);
    expect(container.textContent?.includes(NOT_FOUND_TITLE)).toBe(true);
    expect(container.textContent?.includes(NOT_FOUND_SUBTITLE)).toBe(true);

    const homeButton = getByRole("button", {
      name: new RegExp(NOT_FOUND_BACK_BUTTON, "i"),
    });
    expect(homeButton).toBeTruthy();

    const homeLink = container.querySelector('a[href="/"]');
    expect(homeLink).toBeTruthy();
  });
});
