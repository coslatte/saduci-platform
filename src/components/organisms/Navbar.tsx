"use client";

import React from "react";

import Link from "next/link";
import { cn, dataDisabledProps } from "@/lib/utils";
import { NAV_BRAND_SHORT, ROUTE_NAMES_MAP } from "@/constants/constants";
import { Avatar } from "@/components/atoms/Avatar";

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

  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  function toggleUserMenu() {
    setUserMenuOpen((s) => !s);
  }

  return (
    <header
      {...dataDisabledProps(disabled)}
      className={cn(
        "flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-8 z-10",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-(length:--font-size-sm) text-slate-500">
        <span className="cursor-pointer hover:text-slate-800">
          {NAV_BRAND_SHORT}
        </span>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-primary-700">{currentPage}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex items-center gap-3 border-l border-slate-200 pl-4">
          <button
            type="button"
            onClick={toggleUserMenu}
            className="flex items-center gap-3 no-underline rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm hover:shadow-md hover:border-slate-300 transition-shadow duration-150 focus:outline-none focus:ring-2 focus:ring-primary-100"
            aria-haspopup="true"
            aria-expanded={userMenuOpen}
            aria-label={`Usuario ${userName}`}
            title={userName}
          >
            <Avatar src={userAvatar} name={userName} size="xs" />
            <div className="hidden lg:flex flex-col leading-none">
              <span className="text-(length:--font-size-sm) font-medium text-slate-900">
                {userName}
              </span>
              <span className="text-(length:--font-size-xs) text-slate-500">
                {userRole}
              </span>
            </div>
          </button>

          {/* Simple user panel dropdown */}
          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-md border bg-white shadow-lg">
              <ul className="flex flex-col p-2">
                <li>
                  <Link
                      href="/settings"
                    className="block rounded px-3 py-2 text-sm text-slate-700 border border-transparent hover:border-slate-200 hover:bg-slate-50"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Ajustes
                  </Link>
                </li>
                {onLogout && (
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left rounded px-3 py-2 text-sm text-slate-700 border border-transparent hover:border-slate-200 hover:bg-slate-50"
                    >
                      Cerrar sesión
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
