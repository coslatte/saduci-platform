import Link from "next/link";
import { cn, dataDisabledProps } from "@/lib/utils";

interface NavItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  collapsed?: boolean;
  className?: string;
  disabled?: boolean;
}

export function NavItem({
  href,
  label,
  icon,
  active = false,
  collapsed = false,
  className,
  disabled,
}: NavItemProps) {
  return (
    <Link
      href={href}
      {...dataDisabledProps(disabled)}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-[length:var(--font-size-sm)] font-medium",
        "transition-colors duration-150",
        active
          ? "bg-primary-50 text-primary-700"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
        collapsed && "justify-center px-2",
        className,
      )}
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
    >
      {icon && (
        <span
          className="shrink-0 size-5 flex items-center justify-center"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
