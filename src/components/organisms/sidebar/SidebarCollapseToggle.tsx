import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cn } from "@/lib/utils";
import {
  SIDEBAR_COLLAPSE_COLLAPSE,
  SIDEBAR_COLLAPSE_EXPAND,
} from "@/constants/constants";

interface SidebarCollapseToggleProps {
  collapsed: boolean;
  onToggleCollapse?: () => void;
}

export function SidebarCollapseToggle({
  collapsed,
  onToggleCollapse,
}: SidebarCollapseToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggleCollapse}
      className={cn(
        "absolute -right-4 top-1/2 z-50 flex h-8 w-4 -translate-y-1/2 items-center justify-center rounded-r-md border border-l-0 border-slate-200 bg-white text-slate-400 transition-all hover:border-primary-400 hover:text-primary-400 hover:text-shadow-primary-700 hover:text-shadow-md hover:shadow-current/30 hover:shadow-sm focus:outline-none",
        collapsed && "ring-0 ring-primary-50",
      )}
      aria-label={
        collapsed ? SIDEBAR_COLLAPSE_EXPAND : SIDEBAR_COLLAPSE_COLLAPSE
      }
    >
      {collapsed ? (
        <FiChevronRight className="size-3" />
      ) : (
        <FiChevronLeft className="size-3" />
      )}
    </button>
  );
}
