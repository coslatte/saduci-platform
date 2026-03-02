import "../../setup";
import { render, fireEvent, within } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { NotificationsPanel } from "@/components/molecules/NotificationsPanel";
import type { NotificationItem } from "@/components/molecules/NotificationsPanel";

describe("NotificationsPanel", () => {
  it("calls onMarkAsRead when clicking 'Marcar leída'", () => {
    let marked!: number;
    const notifications: NotificationItem[] = [
      { id: 1, title: "T1", body: "b", read: false },
    ];

    const { container } = render(
      <NotificationsPanel
        notifications={notifications}
        onMarkAsRead={(id) => {
          marked = Number(id);
        }}
      />,
    );

    const btn = within(container).getByText("Marcar leída");
    fireEvent.click(btn);
    expect(marked).toBe(1);
  });

  it("calls onMarkAllAsRead when clicking 'Marcar todo'", () => {
    let called = false;
    const notifications: NotificationItem[] = [];

    const { container } = render(
      <NotificationsPanel
        notifications={notifications}
        onMarkAllAsRead={() => {
          called = true;
        }}
      />,
    );

    const btn = within(container).getByText("Marcar todo");
    fireEvent.click(btn);
    expect(called).toBe(true);
  });

  it("shows empty state message when there are no notifications", () => {
    const { container } = render(<NotificationsPanel notifications={[]} />);
    const matches = within(container).getAllByText("No hay notificaciones");
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it("does not show 'Marcar leída' button for already-read notifications", () => {
    const notifications: NotificationItem[] = [
      { id: 1, title: "Leída", read: true },
    ];
    const { container } = render(
      <NotificationsPanel
        notifications={notifications}
        onMarkAsRead={() => {}}
      />,
    );
    const button = within(container).queryByText("Marcar leída");
    expect(button).toBeNull();
  });

  it("renders notification body text when provided", () => {
    const notifications: NotificationItem[] = [
      { id: 1, title: "Título", body: "Cuerpo del mensaje", read: false },
    ];
    const { container } = render(
      <NotificationsPanel notifications={notifications} />,
    );
    expect(within(container).getByText("Cuerpo del mensaje")).toBeTruthy();
  });

  it("renders the panel with role dialog", () => {
    const { container } = render(<NotificationsPanel notifications={[]} />);
    expect(container.querySelector("[role='dialog']")).toBeTruthy();
  });

  it("renders the panel heading 'Notificaciones'", () => {
    const { container } = render(<NotificationsPanel notifications={[]} />);
    expect(within(container).getByText("Notificaciones")).toBeTruthy();
  });

  it("shows success icon class for type success notification", () => {
    const notifications: NotificationItem[] = [
      { id: 1, title: "OK", read: false, type: "success" },
    ];
    const { container } = render(
      <NotificationsPanel notifications={notifications} />,
    );
    expect(container.querySelector(".text-emerald-700")).toBeTruthy();
  });

  it("shows failure icon class for type failure notification", () => {
    const notifications: NotificationItem[] = [
      { id: 1, title: "Error crítico", read: false, type: "failure" },
    ];
    const { container } = render(
      <NotificationsPanel notifications={notifications} />,
    );
    expect(container.querySelector(".text-rose-700")).toBeTruthy();
  });

  it("falls back to info style when type is not provided", () => {
    const notifications: NotificationItem[] = [
      { id: 1, title: "Sin tipo", read: false },
    ];
    const { container } = render(
      <NotificationsPanel notifications={notifications} />,
    );
    expect(container.querySelector(".text-slate-900")).toBeTruthy();
  });
});
