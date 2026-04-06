import "../../setup";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import type { ReactNode } from "react";

describe("AdminPage", () => {
  it("does not render the builder entry anymore", async () => {
    const replace = mock(() => {});
    const deletePage = mock(async () => {});

    mock.module("next/navigation", () => ({
      useRouter: () => ({
        push: mock(() => {}),
        replace,
      }),
    }));

    mock.module("@/lib/auth", () => ({
      useAuth: () => ({
        user: {
          id: "admin-1",
          name: "Admin",
          email: "admin@saduci.com",
          role: "Administrador",
        },
        isAuthenticated: true,
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
    render(<AdminPage />);

    expect(screen.queryByRole("link", { name: /builder/i })).toBeNull();
    expect(screen.getByText("Mi página")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Ver" })).toBeTruthy();
  });
});
