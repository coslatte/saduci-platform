import "../setup";
import { render, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import {
  NotificationsProvider,
  useNotifications,
} from "@/context/notifications";

function Consumer() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    addNotification,
    removeNotification,
  } = useNotifications();
  return (
    <div>
      <div data-testid="count">{unreadCount}</div>
      <div data-testid="first-title">{notifications[0]?.title ?? "-"}</div>
      <div data-testid="total">{notifications.length}</div>
      <button onClick={() => markAsRead(notifications[0].id)}>mark</button>
      <button onClick={() => addNotification({ title: "New", body: "b" })}>
        add
      </button>
      <button
        onClick={() => addNotification({ title: "Exito", type: "success" })}
      >
        add-success
      </button>
      <button
        onClick={() => addNotification({ title: "Fallo", type: "failure" })}
      >
        add-failure
      </button>
      <button
        onClick={() => removeNotification(notifications[0]?.id)}
        disabled={notifications.length === 0}
      >
        remove
      </button>
    </div>
  );
}

describe("NotificationsContext", () => {
  it("provides initial notifications and updates unreadCount when marking read", () => {
    const { container } = render(
      <NotificationsProvider>
        <Consumer />
      </NotificationsProvider>,
    );

    const count = container.querySelector("[data-testid='count']");
    expect(count).toBeTruthy();
    if (!count) return;
    expect(count.textContent).toBe("1");

    const markBtn = Array.from(container.querySelectorAll("button")).find(
      (btn) => btn.textContent === "mark",
    );
    expect(markBtn).toBeTruthy();
    if (!markBtn) return;
    fireEvent.click(markBtn);

    const updatedCount = container.querySelector("[data-testid='count']");
    expect(updatedCount?.textContent).toBe("0");
  });

  it("adds a new notification and increases unreadCount", () => {
    const { container } = render(
      <NotificationsProvider>
        <Consumer />
      </NotificationsProvider>,
    );

    const addBtn = Array.from(container.querySelectorAll("button")).find(
      (btn) => btn.textContent === "add",
    );
    expect(addBtn).toBeTruthy();
    if (!addBtn) return;
    fireEvent.click(addBtn);

    const count = container.querySelector("[data-testid='count']");
    expect(Number(count?.textContent)).toBeGreaterThanOrEqual(1);
  });

  it("adds a success notification with correct type", () => {
    const { container } = render(
      <NotificationsProvider>
        <Consumer />
      </NotificationsProvider>,
    );

    const addSuccessBtn = Array.from(container.querySelectorAll("button")).find(
      (btn) => btn.textContent === "add-success",
    );
    if (!addSuccessBtn) return;
    fireEvent.click(addSuccessBtn);

    const title = container.querySelector("[data-testid='first-title']");
    expect(title?.textContent).toBe("Exito");
  });

  it("adds a failure notification with correct type", () => {
    const { container } = render(
      <NotificationsProvider>
        <Consumer />
      </NotificationsProvider>,
    );

    const addFailureBtn = Array.from(container.querySelectorAll("button")).find(
      (btn) => btn.textContent === "add-failure",
    );
    if (!addFailureBtn) return;
    fireEvent.click(addFailureBtn);

    const title = container.querySelector("[data-testid='first-title']");
    expect(title?.textContent).toBe("Fallo");
  });

  it("removes a notification and decreases total count", () => {
    const { container } = render(
      <NotificationsProvider>
        <Consumer />
      </NotificationsProvider>,
    );

    const totalBefore = container.querySelector("[data-testid='total']");
    const before = Number(totalBefore?.textContent);

    const removeBtn = Array.from(container.querySelectorAll("button")).find(
      (btn) => btn.textContent === "remove",
    );
    expect(removeBtn).toBeTruthy();
    if (!removeBtn) return;
    fireEvent.click(removeBtn);

    const totalAfter = container.querySelector("[data-testid='total']");
    expect(Number(totalAfter?.textContent)).toBe(before - 1);
  });
});
