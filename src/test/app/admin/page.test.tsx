import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import type { ReactNode } from "react";

function restoreNavigationMock() {
  mock.module("next/navigation", () => ({
    useRouter: () => ({
      push: () => {},
      replace: () => {},
    }),
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(),
    redirect: () => {},
  }));
}

describe("AdminPage", () => {
  it("does not render the builder entry anymore", async () => {
    const replace = mock(() => {});
    const deletePage = mock(async () => {});

    mock.module("next/navigation", () => ({
      useRouter: () => ({
        push: mock(() => {}),
        replace,
      }),
      usePathname: () => "/admin",
      useSearchParams: () => new URLSearchParams(),
      redirect: () => {},
    }));

    mock.module("@/lib/auth", () => ({
      useAuth: () => ({
        user: {
          id: "admin-1",
          username: "admin",
          name: "Admin",
          email: "admin@saduci.local",
          role: "Administrador",
          isSuperuser: true,
        },
        token: "test-token",
        isAuthenticated: true,
        isLoading: false,
        login: async () => {},
        logout: () => {},
      }),
    }));

    mock.module("@/context/pageBuilder", () => ({
      PageBuilderProvider: ({ children }: { children: ReactNode }) => (
        <>{children}</>
      ),
      usePageBuilder: () => ({
        pages: [
          {
            id: "page-1",
            slug: "mi-pagina",
            title: "Mi página",
            blocks: [{ id: "block-1", type: "text", order: 0 }],
            showInSidebar: true,
          },
        ],
        loading: false,
        deletePage,
      }),
    }));

    const { default: AdminPage } = await import("@/app/admin/page");
    const { container } = render(<AdminPage />);

    expect(container.querySelector("a[href*='/admin/builder/']")).toBeNull();
    expect(container.textContent?.includes("Mi página")).toBe(true);
    expect(container.querySelector('a[href="/pages/mi-pagina"]')).toBeTruthy();

    restoreNavigationMock();
  });
});
