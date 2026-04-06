import "../../../setup";
import { describe, expect, it, mock } from "bun:test";

describe("Admin builder route", () => {
  it("redirects to the admin dashboard", async () => {
    const redirect = mock(() => {});

    mock.module("next/navigation", () => ({
      redirect,
    }));

    const { default: BuilderPage } =
      await import("@/app/admin/builder/[pageId]/page");

    BuilderPage();

    expect(redirect).toHaveBeenCalledWith("/admin");
  });
});
