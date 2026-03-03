"use client";

import { FiBell } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { Popover } from "@/components/molecules/Popover";
import { NotificationsPanel } from "@/components/molecules/NotificationsPanel";
import { useNotifications } from "@/context/notifications";

const FOOTER_BASE =
  "flex h-12 shrink-0 items-center justify-between border-t border-slate-200 bg-white px-8 transition-colors";
const FOOTER_DISABLED = "opacity-50 grayscale pointer-events-none";
const COPYRIGHT =
  "text-[length:var(--font-size-xs)] font-medium text-slate-400";
const BELL_BTN =
  "relative p-2 rounded-md text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200";
const BADGE =
  "absolute -top-0.5 -right-0.5 inline-flex items-center justify-center rounded-full bg-rose-600 text-white text-[10px] px-1.5 py-0.5";
const STATUS_DOT = "size-1.5 rounded-full bg-emerald-500 animate-pulse";

interface FooterProps {
  className?: string;
  disabled?: boolean;
}

export function Footer({ className, disabled }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();

  return (
    <footer className={cn(FOOTER_BASE, disabled && FOOTER_DISABLED, className)}>
      <p className={COPYRIGHT}>&copy; {currentYear} Saduci Platform</p>

      <div className="flex items-center gap-4">
        <Popover
          align="right"
          trigger={
            <button
              type="button"
              className={BELL_BTN}
              title="Notificaciones"
              aria-label="Notificaciones"
            >
              <FiBell className="w-5 h-5" />
              {unreadCount > 0 && <span className={BADGE}>{unreadCount}</span>}
            </button>
          }
        >
          <NotificationsPanel
            notifications={notifications}
            onMarkAsRead={markAsRead}
            onMarkAllAsRead={markAllAsRead}
          />
        </Popover>

        <div className={STATUS_DOT} />
      </div>
    </footer>
  );
}
