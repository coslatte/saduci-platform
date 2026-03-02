import "../../setup";
import { render, fireEvent, waitFor, act, cleanup } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";

describe("UserSettingsPage", () => {
  it("renders mock user when toggle is enabled and submits change-password", async () => {
    mock.module("@/lib/auth", () => ({
      useAuth: () => ({
        user: null,
        isAuthenticated: false,
        login: async () => {},
        logout: () => {},
      }),
    }));

    // mock fetch and track calls
    let called = false;
    // cast to typeof fetch to satisfy bun's global fetch typing (includes extra helpers)
    globalThis.fetch = (async () => {
      called = true;
      return {
        ok: true,
        json: async () => ({ message: "Contraseña actualizada (mock)." }),
      };
    }) as unknown as typeof fetch;

    const { default: Page } = await import("@/app/settings/page");

    const { getByText, getByLabelText, getByPlaceholderText, container } =
      render(<Page />);

    // Enable mock toggle (wrap in act to ensure state updates are flushed)
    const toggle = getByLabelText("Usar datos mock");
    await act(async () => {
      fireEvent.click(toggle);
    });

    expect(getByText("Juan Pérez")).toBeTruthy();

    // Fill passwords and submit (use placeholders)
    const newPwd = getByPlaceholderText("Nueva contraseña");
    const confirmPwd = getByPlaceholderText("Confirmar nueva contraseña");
    const currentPwd = getByPlaceholderText("Contraseña actual");

    await act(async () => {
      // assign values directly and dispatch native input events to ensure controlled components update
      (currentPwd as HTMLInputElement).value = "oldpass";
      currentPwd.dispatchEvent(new Event("input", { bubbles: true }));

      (newPwd as HTMLInputElement).value = "newpassword";
      newPwd.dispatchEvent(new Event("input", { bubbles: true }));

      (confirmPwd as HTMLInputElement).value = "newpassword";
      confirmPwd.dispatchEvent(new Event("input", { bubbles: true }));
    });

    // wait for React state to reflect the input changes before submitting
    await waitFor(() => {
      expect((currentPwd as HTMLInputElement).value).toBe("oldpass");
      expect((newPwd as HTMLInputElement).value).toBe("newpassword");
      expect((confirmPwd as HTMLInputElement).value).toBe("newpassword");
    });

    // submit the form — some DOM environments trigger submit reliably via
    // fireEvent.submit instead of clicking the button
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

    // Wait for the full async response to be processed (state settled, no pending renders)
    await waitFor(() => {
      expect(getByText("Contraseña actualizada (mock).")).toBeTruthy();
    });

    // Eagerly unmount and clear DOM so no async React re-render leaks into
    // subsequent tests (the success Alert would otherwise persist in the body).
    globalThis.fetch = undefined as unknown as typeof fetch;
    cleanup();
    document.body.innerHTML = "";
  });
});
