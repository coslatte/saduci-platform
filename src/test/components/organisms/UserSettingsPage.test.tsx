import "../../setup";
import {
  render,
  fireEvent,
  waitFor,
  act,
  cleanup,
} from "@testing-library/react";
import { describe, expect, it } from "bun:test";

describe("UserSettingsPage", () => {
  it("renders the authenticated user and submits change-password with a bearer token", async () => {
    const user = {
      id: "1",
      username: "admin",
      name: "Admin",
      email: "admin@saduci.com",
      role: "Administrador",
      isSuperuser: true,
    };

    let called = false;
    let requestInit: RequestInit | undefined;
    globalThis.fetch = (async (url: string | URL, init?: RequestInit) => {
      const target = typeof url === "string" ? url : url.toString();

      if (target.endsWith("/api/user/change-password")) {
        called = true;
        requestInit = init;
        return new Response(
          JSON.stringify({ message: "Contraseña actualizada correctamente." }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      throw new Error(`Unexpected fetch: ${target}`);
    }) as unknown as typeof fetch;

    const { UserSettingsPageContent } = await import("@/app/settings/page");

    const { getByText, getByPlaceholderText, container } = render(
      <UserSettingsPageContent user={user} token="test-token" />,
    );

    expect(getByText("admin@saduci.com")).toBeTruthy();

    const newPwd = getByPlaceholderText("Nueva contraseña");
    const confirmPwd = getByPlaceholderText("Confirmar nueva contraseña");
    const currentPwd = getByPlaceholderText("Contraseña actual");

    await act(async () => {
      fireEvent.input(currentPwd, { target: { value: "oldpass123" } });
      fireEvent.input(newPwd, { target: { value: "newpassword" } });
      fireEvent.input(confirmPwd, { target: { value: "newpassword" } });
    });

    await waitFor(() => {
      expect((currentPwd as HTMLInputElement).value).toBe("oldpass123");
      expect((newPwd as HTMLInputElement).value).toBe("newpassword");
      expect((confirmPwd as HTMLInputElement).value).toBe("newpassword");
    });

    const form = container.querySelector("form") as HTMLFormElement;
    if (form) {
      await act(async () => {
        fireEvent.submit(form);
      });
    } else {
      const btn = getByText("Guardar cambios");
      await act(async () => {
        fireEvent.click(btn);
      });
    }

    await waitFor(() => {
      expect(called).toBe(true);
    });

    expect(
      (requestInit?.headers as Record<string, string | undefined>)
        ?.Authorization,
    ).toBe("Bearer test-token");

    expect(
      requestInit?.body ? JSON.parse(requestInit.body as string) : null,
    ).toEqual({
      currentPassword: "oldpass123",
      newPassword: "newpassword",
    });

    await waitFor(() => {
      expect(getByText("Contraseña actualizada correctamente.")).toBeTruthy();
    });

    globalThis.fetch = undefined as unknown as typeof fetch;
    cleanup();
    document.body.innerHTML = "";
  });
});
