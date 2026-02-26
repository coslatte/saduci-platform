import {
  TIME_VARIABLE_LABELS,
  type SimulationResponse,
} from "@/lib/simulation";

export function downloadSimulationCSV(
  result: SimulationResponse,
  patientId: string,
): void {
  const sim = result.simulation;
  const keys = Object.keys(sim) as (keyof typeof sim)[];
  const header = ["Estadístico", ...keys.map((k) => TIME_VARIABLE_LABELS[k])];
  const statsRows = [
    ["Promedio", ...keys.map((k) => sim[k].mean.toFixed(2))],
    ["Desviación Estándar", ...keys.map((k) => sim[k].std.toFixed(2))],
    ["Límite Inf.", ...keys.map((k) => sim[k].ci_lower.toFixed(2))],
    ["Límite Sup.", ...keys.map((k) => sim[k].ci_upper.toFixed(2))],
  ];

  const csv = [header, ...statsRows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `simulacion-paciente-${patientId}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
