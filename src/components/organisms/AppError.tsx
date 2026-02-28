"use client";

import { useEffect } from "react";

interface AppErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * AppError
 *
 * Generic error UI shown inside an Error Boundary. Logs the received error
 * to the console and exposes a `reset` callback that should be wired to the
 * nearest error recovery handler (typically Next.js' reset function).
 *
 * @param error - the caught error object
 * @param reset - callback to attempt recovery
 */
export function AppError({ error, reset }: AppErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const CONTAINER =
    "flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center";
  const TITLE = "text-lg font-semibold text-zinc-900";
  const MESSAGE = "text-sm text-zinc-500";
  const BUTTON =
    "rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors";

  return (
    <div className={CONTAINER}>
      <div className="flex flex-col gap-1">
        <h2 className={TITLE}>Ocurrió un error inesperado</h2>
        <p className={MESSAGE}>
          {error.message || "Inténtalo de nuevo o contacta al administrador."}
        </p>
      </div>
      <button type="button" onClick={reset} className={BUTTON}>
        Reintentar
      </button>
    </div>
  );
}

export default AppError;
