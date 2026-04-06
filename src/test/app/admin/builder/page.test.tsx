import "../../../setup";
import { describe, expect, it, mock } from "bun:test";

function restoreNavigationMock() {
  mock.module("next/navigation", () => ({
    useRouter: () => ({
      back: () => {},
      push: () => {},
      replace: () => {},
    }),
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(),
    redirect: () => {},
  }));
}

describe("Admin builder route", () => {
  it("redirects to the admin dashboard", async () => {
    const redirect = mock(() => {});

    mock.module("next/navigation", () => ({
      usePathname: () => "/admin/builder/test",
      useRouter: () => ({ back: () => {}, push: () => {}, replace: () => {} }),
      useSearchParams: () => new URLSearchParams(),
      redirect,
    }));

    const { default: BuilderPage } =
      await import("@/app/admin/builder/[pageId]/page");

    BuilderPage();

    expect(redirect).toHaveBeenCalledWith("/admin");

    restoreNavigationMock();
  });
});
