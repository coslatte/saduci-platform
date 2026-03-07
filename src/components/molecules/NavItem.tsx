import Link from "next/link";
import { cn, dataDisabledProps } from "@/lib/utils";

/**
 * Props for `NavItem`.
 */
interface NavItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  /** Whether this item represents the active route */
  active?: boolean;
  /** When true render the compact/collapsed variant (icons only) */
  collapsed?: boolean;
  variant?: "default" | "nested";
  className?: string;
  labelClassName?: string;
  iconClassName?: string;
  disabled?: boolean;
}

/**
 * NavItem
 *
 * Navigation link used in the sidebar. Supports an `active` state and a
 * collapsed compact variant which hides the label and centers the icon.
 */
export function NavItem({
  href,
  label,
  icon,
  active = false,
  collapsed = false,
  variant = "default",
  className,
  labelClassName,
  iconClassName,
  disabled,
}: NavItemProps) {
  const isNested = variant === "nested";

  return (
    <Link
      href={href}
      {...dataDisabledProps(disabled)}
      className={cn(
        isNested
          ? "group flex items-center gap-2 rounded-md px-2.5 py-1.5 transition-all duration-200"
          : "flex items-center gap-3 rounded-lg px-3 py-2 text-(length:--font-size-sm) font-medium transition-colors duration-150",
        isNested
          ? active
            ? "text-primary-700 font-medium"
            : "text-slate-500 hover:text-slate-800"
          : active
            ? "bg-primary-50 text-primary-700"
            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
        collapsed && !isNested && "justify-center px-2",
        className,
      )}
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
    >
      {icon && (
        <span
          className={cn(
            isNested
              ? "flex size-4 shrink-0 items-center justify-center mr-2 transition-colors"
              : "flex items-center justify-center shrink-0 size-5",
            iconClassName,
          )}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      {!collapsed && <span className={labelClassName}>{label}</span>}
    </Link>
  );
}
