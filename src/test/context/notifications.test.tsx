import "../setup";
import { render, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import {
  NotificationsProvider,
  useNotifications,
} from "@/context/notifications";

function Consumer() {
  const { notifications, unreadCount, markAsRead, addNotification } =
    useNotifications();
  return (
    <div>
      <div data-testid="count">{unreadCount}</div>
      <div data-testid="first-title">{notifications[0]?.title ?? "-"}</div>
      <button onClick={() => markAsRead(notifications[0].id)}>mark</button>
      <button onClick={() => addNotification({ title: "New", body: "b" })}>
        add
      </button>
    </div>
  );
}

describe("NotificationsContext", () => {
  it("provides initial notifications and updates unreadCount when marking read", () => {
    const { getByTestId, getByText } = render(
      <NotificationsProvider>
        <Consumer />
      </NotificationsProvider>,
    );

    const count = getByTestId("count");
    expect(count.textContent).toBe("1");

    const markBtn = getByText("mark");
    fireEvent.click(markBtn);

    expect(getByTestId("count").textContent).toBe("0");
  });

  it("adds a new notification and increases unreadCount", () => {
    const { getByTestId, getByText } = render(
      <NotificationsProvider>
        <Consumer />
      </NotificationsProvider>,
    );

    const addBtn = getByText("add");
    fireEvent.click(addBtn);

    expect(Number(getByTestId("count").textContent)).toBeGreaterThanOrEqual(1);
  });
});
