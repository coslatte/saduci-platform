"use client";

import { useEffect, useRef } from "react";
import { FiBell } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { Popover } from "@/components/molecules/Popover";
import { NotificationsPanel } from "@/components/molecules/NotificationsPanel";

interface FooterProps {
  className?: string;
  disabled?: boolean;
}

/**
 * Footer
 *
 * Site footer rendered in the app shell. Shows copyright and a small status
 * area. For convenience the component also contains a small notifications
 * demo (used by tests) — in the app this will normally be provided by the
 * global `Notifications` context and a dedicated panel.
 *
 * @param props.className - optional className to merge into the root
 * @param props.disabled - when true applies a muted/disabled visual state
 */
export function Footer({ className, disabled }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const ref = useRef<HTMLDivElement | null>(null);

  const notifications = [
    {
      id: 1,
      title: "Nueva tarea asignada",
      body: "Tienes una nueva tarea.",
      read: false,
    },
    {
      id: 2,
      title: "Informe listo",
      body: "El informe semanal está disponible.",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Footer delegates open state to Popover; keep ref for layout if needed in the future
  useEffect(() => {
    // noop for now - kept for parity with earlier implementation
  }, []);

  return (
    <footer
      className={cn(
        "flex h-12 shrink-0 items-center justify-between border-t border-slate-200 bg-white px-8 transition-colors",
        disabled && "opacity-50 grayscale pointer-events-none",
        className,
      )}
    >
      <div className="flex items-center gap-6">
        <p className="text-(length:--font-size-xs) font-medium text-slate-400">
          &copy; {currentYear} Sadeci Platform
        </p>
      </div>

      <div className="flex items-center gap-4" ref={ref}>
        <div className="relative">
          <Popover
            align="right"
            trigger={
              <button
                type="button"
                className="relative p-2 rounded-md text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
                title="Notificaciones"
                aria-label="Notificaciones"
              >
                <FiBell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center rounded-full bg-rose-600 text-white text-[10px] px-1.5 py-0.5">
                    {unreadCount}
                  </span>
                )}
              </button>
            }
          >
            <NotificationsPanel
              notifications={notifications}
              onMarkAsRead={(id) => {
                console.log("mark as read footer", id);
              }}
              onMarkAllAsRead={() =>
                console.log("mark all as read from footer")
              }
            />
          </Popover>
        </div>

        <div className="flex items-center gap-2">
          <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>
    </footer>
  );
}
