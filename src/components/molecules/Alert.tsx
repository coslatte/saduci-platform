import { cn, dataDisabledProps } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "danger";
  title?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export function Alert({
  className,
  variant = "info",
  title,
  icon,
  children,
  disabled,
  ...props
}: AlertProps) {
  const variantClasses = {
    info: "bg-blue-50 text-blue-900 border-blue-200",
    success: "bg-green-50 text-green-900 border-green-200",
    warning: "bg-yellow-50 text-yellow-900 border-yellow-200",
    danger: "bg-red-50 text-red-900 border-red-200",
  };

  const iconColors = {
    info: "text-blue-500",
    success: "text-green-500",
    warning: "text-yellow-500",
    danger: "text-red-500",
  };

  return (
    <div
      {...dataDisabledProps(disabled)}
      className={cn(
        "rounded-lg border p-4 flex gap-3",
        variantClasses[variant],
        className,
      )}
      role="alert"
      {...props}
    >
      {icon && (
        <div className={cn("shrink-0 mt-0.5", iconColors[variant])}>{icon}</div>
      )}
      <div className="flex-1">
        {title && (
          <h5 className="mb-1 font-medium leading-none tracking-tight text-[length:var(--font-size-base)]">
            {title}
          </h5>
        )}
        <div className="text-[length:var(--font-size-sm)] opacity-90">
          {children}
        </div>
      </div>
    </div>
  );
}
