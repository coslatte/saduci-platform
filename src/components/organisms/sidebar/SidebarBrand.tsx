import { Text } from "@/components/atoms/Text";
import { SIDEBAR_BRAND_FULL } from "@/constants/constants";

interface SidebarBrandProps {
  collapsed: boolean;
}

export function SidebarBrand({ collapsed }: SidebarBrandProps) {
  return (
    <div className="flex h-16 shrink-0 items-center border-b border-slate-100 px-6">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm">
          <Text as="span" weight="bold" className="text-white">
            S
          </Text>
        </div>
        {!collapsed && (
          <Text
            as="span"
            weight="semibold"
            family="secondary"
            tracking="tight"
            className="truncate text-slate-900"
          >
            {SIDEBAR_BRAND_FULL}
          </Text>
        )}
      </div>
    </div>
  );
}
