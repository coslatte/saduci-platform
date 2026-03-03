"use client";

import React from "react";
import { FiBell, FiCheckCircle, FiXCircle, FiInfo } from "react-icons/fi";
import { cn } from "@/lib/utils";
import type { NotificationItem } from "@/context/notifications";

export type { NotificationItem };

const PANEL_BASE =
  "w-80 rounded-xl bg-white border border-slate-200 shadow-lg z-20 overflow-hidden";
const HEADER_BASE =
  "p-3 border-b border-slate-100 flex items-center justify-between";
const MARK_ALL_BTN = "text-sm text-slate-500 hover:text-slate-700";
const LIST_BASE = "max-h-60 overflow-auto divide-y divide-slate-100";
const ITEM_BASE =
  "px-4 py-3 hover:bg-slate-50 flex justify-between items-start";
const ITEM_UNREAD = "bg-slate-50";
const ACTION_BTN = "text-sm text-blue-600 hover:underline";
const EMPTY_BASE = "p-6 text-center text-sm text-slate-500";
const EMPTY_ICON =
  "mx-auto mb-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-600";

const TYPE_ICON: Record<string, React.ReactNode> = {
  success: <FiCheckCircle className="w-4 h-4 text-emerald-500" />,
  failure: <FiXCircle className="w-4 h-4 text-rose-500" />,
  info: <FiInfo className="w-4 h-4 text-blue-500" />,
};

const TYPE_TITLE: Record<string, string> = {
  success: "text-emerald-700",
  failure: "text-rose-700",
  info: "text-slate-900",
};

interface NotificationsPanelProps {
  notifications: NotificationItem[];
  className?: string;
  onMarkAsRead?: (id: NotificationItem["id"]) => void;
  onMarkAllAsRead?: () => void;
}

export function NotificationsPanel({
  notifications,
  className,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationsPanelProps) {
  return (
    <div className={cn(PANEL_BASE, className)} role="dialog">
      <div className={HEADER_BASE}>
        <h4 className="text-sm font-semibold text-slate-800">Notificaciones</h4>
        {onMarkAllAsRead && (
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className={MARK_ALL_BTN}
          >
            Marcar todo
          </button>
        )}
      </div>
      <div className={LIST_BASE}>
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div key={n.id} className={cn(ITEM_BASE, !n.read && ITEM_UNREAD)}>
              <div className="flex items-start gap-2">
                <div className="mt-0.5 shrink-0">
                  {TYPE_ICON[n.type ?? "info"] ?? TYPE_ICON.info}
                </div>
                <div>
                  <div
                    className={cn(
                      "text-sm font-medium",
                      TYPE_TITLE[n.type ?? "info"] ?? TYPE_TITLE.info,
                    )}
                  >
                    {n.title}
                  </div>
                  {n.body && (
                    <div className="text-sm text-slate-600">{n.body}</div>
                  )}
                </div>
              </div>
              {!n.read && onMarkAsRead && (
                <div className="pl-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => onMarkAsRead(n.id)}
                    className={ACTION_BTN}
                  >
                    Marcar leída
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className={EMPTY_BASE}>
            <div className={EMPTY_ICON}>
              <FiBell className="w-4 h-4" />
            </div>
            <div>No hay notificaciones</div>
            <div className="mt-2 text-[12px] text-slate-400">
              No hay notificaciones recientes. Te avisaremos cuando haya
              novedades.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationsPanel;
