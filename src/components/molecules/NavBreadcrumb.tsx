"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
}

const styles = {
  root: "flex items-center gap-2 text-(length:--font-size-sm) text-slate-500",
  brand:
    "cursor-pointer select-none transition-colors hover:text-slate-800 focus:outline-none focus-visible:underline",
  separator: "text-slate-300",
  segment: "transition-colors hover:text-slate-800",
  page: "font-semibold text-primary-700",
};

export function NavBreadcrumb({
  brandName,
  currentPage,
  segments,
  className,
}: NavBreadcrumbProps) {
  const router = useRouter();

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(styles.root, className)}
    >
      <button
        type="button"
        className={styles.brand}
        onClick={() => router.back()}
        aria-label={`Volver a la página anterior — ${brandName}`}
      >
        {brandName}
      </button>
      {segments?.map((seg) => (
        <span key={seg.href} className="contents">
          <span aria-hidden="true" className={styles.separator}>/</span>
          <Link href={seg.href} className={styles.segment}>
            {seg.label}
          </Link>
        </span>
      ))}
      <span aria-hidden="true" className={styles.separator}>
        /
      </span>
      <span className={styles.page} aria-current="page">
        {currentPage}
      </span>
    </nav>
  );
}
