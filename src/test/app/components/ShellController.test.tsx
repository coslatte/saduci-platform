import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";

mock.module("sileo", () => ({
  Toaster: () => null,
  sileo: {
    success: () => {},
    error: () => {},
  },
}));

mock.module("@/lib/auth", () => ({
  useAuth: () => ({
    user: { id: "1", name: "Admin", email: "a@a", role: "Admin" },
    isAuthenticated: true,
    login: async () => {},
    logout: () => {},
  }),
}));

import ShellController from "@/app/components/ShellController";
import { routes } from "@/lib/routes";

describe("ShellController sidebar behavior", () => {
  it("does not render admin section in the sidebar even for admin users", () => {
    const { container } = render(
      <ShellController>
        <div>Contenido de prueba</div>
      </ShellController>,
    );

    // The admin section title should not be present
    expect(container.textContent?.includes("Administración")).toBe(false);

    // There should be no link to the admin route
    const adminLink = container.querySelector(`a[href="${routes.admin}"]`);
    expect(adminLink).toBeNull();
  });
});
