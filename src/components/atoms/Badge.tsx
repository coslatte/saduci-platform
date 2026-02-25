import { cn, dataDisabledProps } from "@/lib/utils";
import type { Status } from "@/lib/types";

interface BadgeProps {
  status?: Status;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const statusClasses: Record<Status, string> = {
  default: "bg-zinc-100 text-zinc-700",
  info: "bg-secondary-50 text-secondary-700",
  success: "bg-primary-50 text-primary-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-700",
};

export function Badge({
  status = "default",
  className,
  children,
  disabled,
}: BadgeProps) {
  return (
    <span
      {...dataDisabledProps(disabled)}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[length:var(--font-size-xs)] font-medium",
        statusClasses[status],
        className,
      )}
    >
      {children}
    </span>
  );
}
