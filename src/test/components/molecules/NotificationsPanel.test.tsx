import "../../setup";
import { render, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { NotificationsPanel } from "@/components/molecules/NotificationsPanel";
import type { NotificationItem } from "@/components/molecules/NotificationsPanel";

describe("NotificationsPanel", () => {
  it("calls onMarkAsRead when clicking 'Marcar leída'", () => {
    let marked!: number;
    const notifications: NotificationItem[] = [
      { id: 1, title: "T1", body: "b", read: false },
    ];

    const { getByText } = render(
      <NotificationsPanel
        notifications={notifications}
        onMarkAsRead={(id) => {
          marked = Number(id);
        }}
      />,
    );

    const btn = getByText("Marcar leída");
    fireEvent.click(btn);
    expect(marked).toBe(1);
  });

  it("calls onMarkAllAsRead when clicking 'Marcar todo'", () => {
    let called = false;
    const notifications: NotificationItem[] = [];

    const { getByText } = render(
      <NotificationsPanel
        notifications={notifications}
        onMarkAllAsRead={() => {
          called = true;
        }}
      />,
    );

    const btn = getByText("Marcar todo");
    fireEvent.click(btn);
    expect(called).toBe(true);
  });

  it("shows empty state message when there are no notifications", () => {
    const { getByText } = render(<NotificationsPanel notifications={[]} />);
    expect(getByText("No hay notificaciones")).toBeTruthy();
  });

  it("does not show 'Marcar leída' button for already-read notifications", () => {
    const notifications: NotificationItem[] = [
      { id: 1, title: "Leída", read: true },
    ];
    const { queryByText } = render(
      <NotificationsPanel
        notifications={notifications}
        onMarkAsRead={() => {}}
      />,
    );
    expect(queryByText("Marcar leída")).toBeNull();
  });

  it("renders notification body text when provided", () => {
    const notifications: NotificationItem[] = [
      { id: 1, title: "Título", body: "Cuerpo del mensaje", read: false },
    ];
    const { getByText } = render(
      <NotificationsPanel notifications={notifications} />,
    );
    expect(getByText("Cuerpo del mensaje")).toBeTruthy();
  });

  it("renders the panel with role dialog", () => {
    const { getByRole } = render(<NotificationsPanel notifications={[]} />);
    expect(getByRole("dialog")).toBeTruthy();
  });

  it("renders the panel heading 'Notificaciones'", () => {
    const { getByText } = render(<NotificationsPanel notifications={[]} />);
    expect(getByText("Notificaciones")).toBeTruthy();
  });
});
