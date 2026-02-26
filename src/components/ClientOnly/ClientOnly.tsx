"use client";

import { useEffect, useState, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  fallback?: ReactNode;
};

/**
 * ClientOnly - prevents rendering children on the server to avoid hydration mismatches.
 * Renders `fallback` during SSR and until the client has mounted.
 */
export default function ClientOnly({ children, fallback = null }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{fallback}</>;
  return <>{children}</>;
}
