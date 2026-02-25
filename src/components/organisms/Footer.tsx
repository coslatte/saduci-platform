"use client";

import { cn } from "@/lib/utils";
import { Spinner } from "@/components/atoms/Spinner";

type StatusBarStatus = "idle" | "loading" | "simulating" | "success" | "error";

interface StatusBarProps {
  status?: StatusBarStatus;
  message?: string;
  className?: string;
}

const STATUS_LABELS: Record<StatusBarStatus, string> = {
  idle: "Listo",
  loading: "Cargando…",
  simulating: "Simulando…",
  success: "Completado",
  error: "Error",
};

const STATUS_COLORS: Record<StatusBarStatus, string> = {
  idle: "text-slate-400",
  loading: "text-secondary-600",
  simulating: "text-primary-600",
  success: "text-emerald-600",
  error: "text-red-500",
};

export function Footer({
  status = "idle",
  message,
  className,
}: StatusBarProps) {
  const showSpinner = status === "loading" || status === "simulating";

  return (
    <footer
      className={cn(
        "flex h-8 shrink-0 items-center justify-between border-t border-slate-200 bg-white px-4",
        className,
      )}
    >
      {/* Left — status indicator */}
      <div className="flex items-center gap-2">
        {showSpinner && <Spinner size="xs" />}
        <span
          className={cn(
            "text-[length:var(--font-size-xs)] font-medium",
            STATUS_COLORS[status],
          )}
        >
          {STATUS_LABELS[status]}
        </span>
      </div>

      {/* Center — optional message */}
      {message && (
        <span className="hidden text-[length:var(--font-size-xs)] text-slate-500 sm:inline">
          {message}
        </span>
      )}

      {/* Right — version tag */}
      <span className="text-[length:var(--font-size-xs)] font-mono text-slate-300">
        v0.1.0
      </span>
    </footer>
  );
}
