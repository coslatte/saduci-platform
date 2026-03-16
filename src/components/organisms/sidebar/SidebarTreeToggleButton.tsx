import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  SIDEBAR_SECTION_COLLAPSE,
  SIDEBAR_SECTION_EXPAND,
} from "@/constants/constants";

interface SidebarTreeToggleButtonProps {
  expanded: boolean;
  label: string;
  onToggle: () => void;
}

/**
 * Collapse/expand control for sidebar tree items with nested children.
 *
 * @param expanded - Current expanded state of the nested tree item.
 * @param label - Visible label of the parent item used for accessible text.
 * @param onToggle - Callback fired when the user toggles expanded state.
 * Used in X case: expanding child links inside sidebar tree navigation.
 *
 * @example
 * <SidebarTreeToggleButton
 *   expanded={false}
 *   label="Simulación"
 *   onToggle={() => setExpanded((v) => !v)}
 * />
 */
export function SidebarTreeToggleButton({
  expanded,
  label,
  onToggle,
}: SidebarTreeToggleButtonProps) {
  const actionLabel = expanded
    ? SIDEBAR_SECTION_COLLAPSE(label)
    : SIDEBAR_SECTION_EXPAND(label);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-label={actionLabel}
      title={actionLabel}
      className="absolute inline-flex items-center justify-center overflow-hidden transition-colors -translate-y-1/2 border rounded-lg shadow-sm right-3 top-1/2 size-10 border-slate-200/80 bg-white/70 supports-backdrop-filter:bg-white/55 surface-backdrop-opaque surface-noise text-slate-600 hover:bg-white/85 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      {expanded ? (
        <FiChevronUp className="size-4" aria-hidden="true" />
      ) : (
        <FiChevronDown className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}
