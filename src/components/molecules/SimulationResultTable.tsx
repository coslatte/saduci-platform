"use client";

import { TIME_VARIABLE_LABELS } from "@/lib/simulation";
import type { SimulationResponse } from "@/lib/simulation";
import { dataDisabledProps } from "@/lib/utils";

export interface SimulationResultTableProps {
  result: SimulationResponse["simulation"];
  disabled?: boolean;
}

export function SimulationResultTable({
  result,
  disabled,
}: SimulationResultTableProps) {
  // allow disabling visual display via data-disabled on wrapper
  // (component remains read-only)
  const keys = Object.keys(result) as (keyof typeof result)[];
  const rows = [
    { label: "Promedio", key: "mean" as const },
    { label: "Desviación Estándar", key: "std" as const },
    { label: "Límite Inf.", key: "ci_lower" as const },
    { label: "Límite Sup.", key: "ci_upper" as const },
  ];

  return (
    <div className="overflow-x-auto" {...dataDisabledProps(disabled)}>
      <table className="w-full text-sm" aria-label="Resultados de simulación">
        <thead>
          <tr className="border-b border-zinc-200">
            <th className="py-2 pr-4 text-left font-medium text-zinc-500">
              Estadístico
            </th>
            {keys.map((k) => (
              <th
                key={k}
                className="py-2 px-3 text-right font-medium text-zinc-700"
              >
                {TIME_VARIABLE_LABELS[k]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, key }) => (
            <tr key={key} className="border-b border-zinc-100 last:border-0">
              <td className="py-2 pr-4 text-zinc-500">{label}</td>
              {keys.map((k) => (
                <td key={k} className="py-2 px-3 text-right tabular-nums">
                  {result[k][key].toFixed(2)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
