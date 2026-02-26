"use client";

import { FiLogOut } from "react-icons/fi";
import { cn, dataDisabledProps } from "@/lib/utils";
import {
  NAV_BRAND_SHORT,
  SEARCH_PLACEHOLDER,
  ROUTE_NAMES_MAP,
} from "@/constants/constants";
import { Avatar } from "@/components/atoms/Avatar";
import { SearchBar } from "@/components/molecules/SearchBar";

interface NavbarProps {
  className?: string;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  disabled?: boolean;
  pathname?: string;
  onLogout?: () => void;
}

export function Navbar({
  className,
  userName = "Usuario",
  userRole = "Admin",
  userAvatar,
  disabled,
  pathname = "/",
  onLogout,
}: NavbarProps) {
  const currentPage = ROUTE_NAMES_MAP[pathname] ?? NAV_BRAND_SHORT;

  return (
    <header
      {...dataDisabledProps(disabled)}
      className={cn(
        "flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-8 z-10",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-[length:var(--font-size-sm)] text-slate-500">
        <span className="cursor-pointer hover:text-slate-800">
          {NAV_BRAND_SHORT}
        </span>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-primary-700">{currentPage}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block w-64">
          <SearchBar placeholder={SEARCH_PLACEHOLDER} disabled={disabled} />
        </div>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <Avatar src={userAvatar} name={userName} size="xs" />
          <div className="hidden lg:flex flex-col leading-none">
            <span className="text-[length:var(--font-size-sm)] font-medium text-slate-900">
              {userName}
            </span>
            <span className="text-[length:var(--font-size-xs)] text-slate-500">
              {userRole}
            </span>
          </div>
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="ml-1 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <FiLogOut className="size-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
