import "../../../setup";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import type { ReactNode } from "react";
import { ADMIN_CREATE_PAGE_SUBMIT_BUTTON } from "@/constants/constants";

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
      usePathname: () => "/admin/create",
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
        createPage,
        pages: [],
        loading: false,
        deletePage: async () => {},
      }),
    }));

    const { default: CreatePage } = await import("@/app/admin/create/page");
    const { getByRole, getByLabelText } = render(<CreatePage />);

    expect(
      getByRole("button", {
        name: new RegExp(ADMIN_CREATE_PAGE_SUBMIT_BUTTON, "i"),
      }),
    ).toBeTruthy();

    const titleInput = getByLabelText("Titulo") as HTMLInputElement;
    await act(async () => {
      titleInput.value = "Mi pagina";
      fireEvent.input(titleInput, {
        target: { value: "Mi pagina" },
      });
    });

    await waitFor(() => {
      expect((getByLabelText("Slug (URL)") as HTMLInputElement).value).toBe(
        "mi-pagina",
      );
    });

    fireEvent.click(
      getByRole("button", {
        name: new RegExp(ADMIN_CREATE_PAGE_SUBMIT_BUTTON, "i"),
      }),
    );

    await waitFor(() => expect(createPage).toHaveBeenCalledTimes(1));
    expect(createPage).toHaveBeenCalledWith({
      title: "Mi pagina",
      slug: "mi-pagina",
      description: "",
      showInSidebar: true,
    });
    await waitFor(() => expect(push).toHaveBeenCalledWith("/admin"));

    restoreNavigationMock();
  });
});
