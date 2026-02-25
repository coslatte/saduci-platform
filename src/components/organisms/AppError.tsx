"use client";

import { useEffect } from "react";

interface AppErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function AppError({ error, reset }: AppErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-zinc-900">
          Ocurrió un error inesperado
        </h2>
        <p className="text-sm text-zinc-500">
          {error.message || "Inténtalo de nuevo o contacta al administrador."}
        </p>
      </div>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
      >
        Reintentar
      </button>
    </div>
  );
}

export default AppError;
