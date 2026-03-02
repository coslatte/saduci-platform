"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavBreadcrumbProps {
  brandName: string;
  currentPage: string;
  className?: string;
}

const styles = {
  root: "flex items-center gap-2 text-(length:--font-size-sm) text-slate-500",
  brand:
    "cursor-pointer select-none transition-colors hover:text-slate-800 focus:outline-none focus-visible:underline",
  separator: "text-slate-300",
  page: "font-semibold text-primary-700",
};

export function NavBreadcrumb({
  brandName,
  currentPage,
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
      <span aria-hidden="true" className={styles.separator}>
        /
      </span>
      <span className={styles.page} aria-current="page">
        {currentPage}
      </span>
    </nav>
  );
}
