import "../../../setup";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import type { ReactNode } from "react";

describe("CreatePage", () => {
  it("creates a page and returns to admin without opening the builder", async () => {
    const push = mock(() => {});
    const replace = mock(() => {});
    const createPage = mock(async () => ({
      id: "page-1",
      slug: "mi-pagina",
      title: "Mi pagina",
      blocks: [],
    }));

    mock.module("next/navigation", () => ({
      useRouter: () => ({
        push,
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
        createPage,
        pages: [],
        loading: false,
        deletePage: async () => {},
      }),
    }));

    const { default: CreatePage } = await import("@/app/admin/create/page");
    render(<CreatePage />);

    expect(screen.getByRole("button", { name: "Crear página" })).toBeTruthy();

    fireEvent.change(screen.getByLabelText("Titulo"), {
      target: { value: "Mi pagina" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Crear página" }));

    await waitFor(() => expect(createPage).toHaveBeenCalledTimes(1));
    expect(createPage).toHaveBeenCalledWith({
      title: "Mi pagina",
      slug: "mi-pagina",
      description: "",
      showInSidebar: true,
    });
    expect(push).toHaveBeenCalledWith("/admin");
  });
});
