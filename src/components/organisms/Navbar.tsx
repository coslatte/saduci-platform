"use client";

import { cn, dataDisabledProps } from "@/lib/utils";
import { Avatar } from "@/components/atoms/Avatar";
import { SearchBar } from "@/components/molecules/SearchBar";

const ROUTE_NAMES: Record<string, string> = {
  "/": "Dashboard",
  "/simulacion": "Simulación",
  "/reportes": "Reportes",
  "/usuarios": "Usuarios",
  "/ajustes": "Ajustes",
};

interface NavbarProps {
  className?: string;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  disabled?: boolean;
  pathname?: string;
}

export function Navbar({
  className,
  userName = "Usuario",
  userRole = "Admin",
  userAvatar,
  disabled,
  pathname = "/",
}: NavbarProps) {
  const currentPage = ROUTE_NAMES[pathname] ?? "Sadeci";

  return (
    <header
      {...dataDisabledProps(disabled)}
      className={cn(
        "flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-8 z-10",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span className="cursor-pointer hover:text-slate-800">Sadeci</span>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-primary-700">{currentPage}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block w-64">
          <SearchBar placeholder="Buscar..." disabled={disabled} />
        </div>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <Avatar src={userAvatar} name={userName} size="xs" />
          <div className="hidden lg:flex flex-col leading-none">
            <span className="text-sm font-medium text-slate-900">
              {userName}
            </span>
            <span className="text-xs text-slate-500">{userRole}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
