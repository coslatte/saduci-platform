"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface BreadcrumbSegment {
  label: string;
  href: string;
}

interface NavBreadcrumbProps {
  brandName: string;
  currentPage: string;
  segments?: BreadcrumbSegment[];
  className?: string;
  onBack?: () => void;
}

export function NavBreadcrumb({
  brandName,
  currentPage,
  segments,
  className,
  onBack,
}: NavBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center gap-2 text-(length:--font-size-sm) text-slate-500",
        className,
      )}
    >
      <button
        type="button"
        className="cursor-pointer select-none transition-colors hover:text-slate-800 focus:outline-none focus-visible:underline"
        onClick={onBack}
        aria-label={`Volver a la página anterior — ${brandName}`}
      >
        {brandName}
      </button>
      {segments?.map((seg) => (
        <span key={seg.href} className="contents">
          <span aria-hidden="true" className="text-slate-300">
            /
          </span>
          <Link
            href={seg.href}
            className="transition-colors hover:text-slate-800"
          >
            {seg.label}
          </Link>
        </span>
      ))}
      <span aria-hidden="true" className="text-slate-300">
        /
      </span>
      <span className="font-semibold text-primary-700" aria-current="page">
        {currentPage}
      </span>
    </nav>
  );
}
